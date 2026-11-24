/* Pure machine projection: preserve solver flows; derive physical clocks, shards and power. */
(function(root){'use strict';
function clocks(total,mode='overclock',limit=250){
 if(!(total>0))return [0];
 let count=mode==='underclock'?Math.ceil(total-1e-9):Math.max(1,Math.floor(total+1e-9));
 if(Math.ceil(total-1e-9)>5000)throw Error('기계별 표시 한도 5,000개 초과');
 if(mode==='remainder'&&limit<100)mode='underclock';
 if(mode==='remainder')return Array.from({length:Math.ceil(total-1e-9)},(_,i)=>Math.min(1,total-i)*100);
 while(total/count*100>limit+1e-8)count++;
 if(count>5000)throw Error('기계별 표시 한도 5,000개 초과');
 return Array(count).fill(total/count*100);
}
function build(g,result,d,capacity){
 if(g.expandMachines===false)return {nodes:g.nodes,edges:result.edges,result};
 const rows=new Map(result.nodes.map(n=>[n.id,n])),parts=new Map(),nodes=[],outRows=[];
 let serial=0;const ids=new Set(g.nodes.map(n=>n.id));const uid=()=>{let id;do{id='machine-view-'+serial++;}while(ids.has(id));ids.add(id);return id;};
 // Consumers are visited before their suppliers, including disconnected components and cycles.
 const order=[],seen=new Set(),visit=n=>{if(seen.has(n.id))return;seen.add(n.id);order.push(n);for(const e of g.edges.filter(e=>e.to===n.id)){const p=g.nodes.find(n=>n.id===e.from);if(p)visit(p);}};
 g.nodes.filter(n=>!g.edges.some(e=>e.from===n.id)).forEach(visit);g.nodes.forEach(visit);
 for(const n of order){const r=rows.get(n.id);let total=n.type==='recipe'&&r?.valid&&!r.unbounded?r.used:null;
 let unit=1,resourceMachine=null;
 const recipe=d.recipes.find(a=>a.id===n.recipe),machine=d.buildings[recipe?.machines?.[0]];
 if(n.type==='resource'&&r?.valid&&Number.isFinite(r.used)&&r.used>0){
  const water=/water/i.test(n.item),oil=/oil/i.test(n.item),fluid=/LIQUID|GAS/.test(d.items[n.item]?.form);
  const id=n.extractor||(water?'Build_WaterPump_C':oil?'Build_OilPump_C':'Build_MinerMk1_C');
  resourceMachine=d.buildings[id];unit=n.extractionRate>0?n.extractionRate:water||oil?120:fluid?60:60;
  total=r.used/unit;
 }
 const baseClock=n.type==='recipe'?(recipe?.modularMiner?Math.min(n.clock||100,100):(n.clock||100)):100;
 const cs=total!==null&&Number.isFinite(total)&&total>=0?clocks(total*baseClock/100,g.machineClockMode,recipe?.modularMiner?100:250):[baseClock];
 const count=cs.length;
 if(nodes.length+count>5000)throw Error('기계별 표시 한도 5,000개를 초과했습니다. 토글을 꺼서 합친 그래프를 보세요.');
 const list=[];for(let i=0;i<count;i++){const value=total===null?null:(total===0?0:cs[i]/baseClock),weight=total>0?value/total:1/count,id=i===0?n.id:uid(),p={...n,id,sourceId:n.id,part:i,parts:count};
 if(total!==null){p.max=total===0?0:1;p.clock=cs[i];p.shards=Math.max(0,Math.ceil((cs[i]-100-1e-8)/50));p.machineClock=cs[i];p.maxExact=undefined;p.autoRound=false;p.showPpm=n.type==='resource';p.machineFraction=total===0?0:1;if(resourceMachine)p.extractionMachineName=resourceMachine.name;p.supplyRate=n.type==='resource'?value*unit:undefined;if(n.type==='resource')p.max=p.supplyRate;}
 const row=r?{...r,id,used:total!==null?(n.type==='resource'?value*unit:value):r.used,input:r.input.map(a=>scale(a,weight)),output:r.output.map(a=>scale(a,weight)),power:r.power*weight,exactUsed:undefined}:null;
 if(row&&total!==null){const b=machine||resourceMachine,ex=b?.exponent??1.321928;row.power=total===0?0:b&&n.type==='resource'?b.power*Math.pow(cs[i]/100,ex):r.power*weight*Math.pow(cs[i]/baseClock,ex-1);}
 if(row)outRows.push(row);nodes.push(p);list.push({node:p,row,weight});}parts.set(n.id,list);
 }

 const edges=[];
 for(const e of result.edges){const a=parts.get(e.from),b=parts.get(e.to);if(!a||!b)continue;
 if(!Number.isFinite(e.flow)||e.flow<=0){edges.push({...e,from:a[0].node.id,to:b[0].node.id,sourceEdge:e.id});continue;}
 // Intersect source and consumer flow intervals: sparse links, exact aggregate flow, no all-to-all multiplication.
 let i=0,j=0,leftA=e.flow*a[0].weight,leftB=e.flow*b[0].weight,remaining=e.flow;
 while(i<a.length&&j<b.length&&remaining>1e-10){const flow=Math.min(leftA,leftB,remaining);if(flow>1e-10)edges.push({...e,id:uid(),sourceEdge:e.id,from:a[i].node.id,to:b[j].node.id,flow,exactFlow:undefined,waypoints:[]});leftA-=flow;leftB-=flow;remaining-=flow;if(leftA<1e-9&&++i<a.length)leftA=e.flow*a[i].weight;if(leftB<1e-9&&++j<b.length)leftB=e.flow*b[j].weight;}
 }
 // Longest upstream distance from final consumers. Cycle back-edges do not recurse forever.
 const depth=new Map(),active=new Set(),by=new Map(g.nodes.map(n=>[n.id,n]));
 function level(id){if(depth.has(id))return depth.get(id);if(active.has(id))return 0;active.add(id);let v=0;for(const e of g.edges.filter(e=>e.from===id))if(by.has(e.to)&&!active.has(e.to))v=Math.max(v,level(e.to)+1);active.delete(id);depth.set(id,v);return v;}
 g.nodes.forEach(n=>level(n.id));const lanes=new Map(),placed=[];
 for(const n of nodes){if(n.type==='group')continue;const key=(n.parent||'')+'|'+depth.get(n.sourceId),r=outRows.find(r=>r.id===n.id),h=Math.max(44,(r?.input.length||0)*24,(r?.output.length||0)*24)+180;const base=by.get(n.sourceId);n.x=base.x;n.y=Math.max(base.y,lanes.get(key)||0);n.center=false;for(let k=0;k<=placed.length;k++){const hit=placed.find(p=>p.parent===(n.parent||null)&&n.x<p.x+260&&n.x+260>p.x&&n.y<p.y+p.h&&n.y+h>p.y);if(!hit)break;n.y=hit.y+hit.h;}placed.push({x:n.x,y:n.y,h,parent:n.parent||null});lanes.set(key,n.y+h);if(base)n.title=base.title;}
 const summary={...result.summary,warnings:[...result.summary.warnings],shards:nodes.reduce((s,n)=>s+(n.shards||0),0)};
 summary.machines=nodes.filter(n=>n.machineClock>0).length;
 summary.power=outRows.reduce((s,r)=>s+(r.power||0),0);summary.netPower=summary.generatedPower==null?null:summary.generatedPower-summary.power;
 const U=typeof module!=='undefined'?require('./unlocks'):root.SFUnlocks,profile=U?.get()?.profile;
 const catalog=typeof module!=='undefined'?require('./data/unlock-catalog'):root.SFUnlockCatalog;
 const unlocked=profile&&[...profile.schematics,...profile.recipes,...Object.keys(profile.recipeOverrides||{}).filter(k=>profile.recipeOverrides[k])].some(id=>/overclock|power.?shard/i.test(id+' '+(catalog?.schematics[id]?.name||'')));
 if((g.machineClockMode||'overclock')==='overclock'&&!unlocked)summary.warnings.push('오버클럭/파워 샤드 해금 정보 없음: 사용 전 해금을 확인하세요.');
 if(nodes.some(n=>n.type==='resource'&&n.machineClock!==undefined))summary.warnings.push('원료 공급: 기본 Miner Mk.1 보통 순도 60/분, 물·원유 추출기 120/분 기준 (기존 공급 노드에 채굴 티어·순도 정보 없음).');
 return {nodes,edges,result:{...result,summary,nodes:outRows,edges}};
}
function scale(p,w){const out={...p};for(const k of ['amount','flow','shortage','surplus'])if(typeof out[k]==='number')out[k]*=w;for(const k of Object.keys(out))if(k.startsWith('exact'))delete out[k];return out;}
const api={build,clocks};if(typeof module!=='undefined')module.exports=api;else root.MachineView=api;
})(typeof window==='undefined'?globalThis:window);
