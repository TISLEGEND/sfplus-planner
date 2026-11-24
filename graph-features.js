/* Local graph extensions. No network, remote libraries or inferred game constants. */
(function(root){'use strict';
const generators=d=>Object.values(d.buildings).filter(b=>/Generator|PowerPlant/i.test(b.id));
function cleanGenerator(n,d){
 if(!generators(d).some(b=>b.id===n.generator)||!d.items[n.item])throw Error('발전기 또는 연료 아이템 오류');
 return {generator:n.generator,item:n.item};
}
// SF+ 2026.3.489 pak 추출값(data/generator-data.js, tools/build-generator-data.py)을 우선 사용한다.
const generationSpec=b=>b.generation||root.SFP_GENERATION?.[b.id]||null;
const compatibleFuels=(b,d)=>{const s=generationSpec(b);return s?Object.keys(s.fuels).filter(id=>d.items[id]):null;};
// Optional verified schema: building.generation={mw, fuels:{[item]:{perMinute,inputs,outputs}},evidence}.
// Current SF+ bundles do NOT contain it. Never substitute vanilla or guessed constants.
function generation(n,d){
 cleanGenerator(n,d);const b=d.buildings[n.generator],spec=generationSpec(b),f=spec?.fuels?.[n.item];
 const valid=!!(spec?.evidence&&Number.isFinite(spec.mw)&&spec.mw>0&&f&&Number.isFinite(f.perMinute)&&f.perMinute>0&&Array.isArray(f.inputs)&&Array.isArray(f.outputs)&&[...f.inputs,...f.outputs].every(p=>d.items[p.item]&&Number.isFinite(p.amount)&&p.amount>=0));
 return {valid,b,spec,f};
}
function generatorPorts(n,d){
 const a=generation(n,d),factor=n.clock/100;
 // Used is fuel flow (/min), so full engines constrain this node with normal item edges.
 return {valid:true,generationKnown:a.valid,input:[{item:n.item,amount:1},...(a.valid?a.f.inputs.map(p=>({...p,amount:p.amount/a.f.perMinute})):[])],output:a.valid?a.f.outputs.map(p=>({...p,amount:p.amount/a.f.perMinute})):[],generatorInfo:a,factor};
}
function decoratePower(out,g,d){
 let generated=0,unknown=false;
 for(const n of g.nodes.filter(n=>n.type==='recipe')){const r=d.recipes.find(r=>r.id===n.recipe);if(r?.variablePower&&!r.modularMiner)out.summary.powerUnknown=true;}

 for(const n of g.nodes.filter(n=>n.type==='generator')){
  const r=out.nodes.find(r=>r.id===n.id),a=generation(n,d);if(!r)continue;
  r.fuelFlow=r.used;r.generatorCount=a.valid?r.used/(a.f.perMinute*n.clock/100):null;
  r.generatedMW=a.valid?r.used*a.spec.mw/a.f.perMinute:null;r.generationKnown=a.valid;
  if(a.valid){generated+=r.generatedMW;out.summary.machines+=r.generatorCount;}
  else {unknown=true;out.summary.machinesUnknown=true;out.summary.warnings.push(a.b.name+': 발전량·연료 호환성/소비량·부산물 데이터 없음. 전력 수지 미확인');}
 }
 out.summary.generatedPower=unknown?null:generated;
 out.summary.knownGeneratedPower=generated;
 out.summary.netPower=unknown||out.summary.powerUnknown?null:generated-out.summary.power;
}
const usable=(d,r)=>r.seconds>0&&r.durationVerified!==false&&d.buildings[r.machines[0]]&&!r.modularMiner;
// 원자재까지 이어지는 단계 수(작을수록 가까움). 이어지지 않는 아이템은 없음. 이 단계가 줄어드는 레시피만 고르면 순환 없이 끝난다.
const levelCache=new WeakMap();
function levels(d){if(levelCache.has(d))return levelCache.get(d);const L=new Map();for(const [id,i]of Object.entries(d.items))if(i.resource)L.set(id,0);
 const rs=d.recipes.filter(r=>usable(d,r));for(let round=1,changed=true;changed&&round<200;round++){changed=false;const add=[];for(const r of rs)if(r.ingredients.every(p=>L.has(p.item)&&L.get(p.item)<round))for(const p of r.products)if(p.amount>0&&!L.has(p.item))add.push(p.item);for(const id of add)if(!L.has(id)){L.set(id,round);changed=true;}}
 levelCache.set(d,L);return L;}
const recipeLevel=(d,r)=>{const L=levels(d);let m=0;for(const p of r.ingredients){if(!L.has(p.item))return Infinity;m=Math.max(m,L.get(p.item));}return m+1;};
// 원자재까지 이어지는 레시피 → 기본 레시피 → 짧은 경로 순.
function candidates(d,item){const lv=new Map(),f=r=>{if(!lv.has(r))lv.set(r,recipeLevel(d,r));return lv.get(r);};
 return d.recipes.filter(r=>r.products.some(p=>p.item===item&&p.amount>0)&&usable(d,r)).sort((a,b)=>Number(f(a)===Infinity)-Number(f(b)===Infinity)||Number(!!a.alternate)-Number(!!b.alternate)||f(a)-f(b)||a.id.localeCompare(b.id));}
// 순환을 만들 때 대신 쓰는, 원자재 쪽으로 반드시 한 단계 가까워지는 레시피.
function shortest(d,item){const L=levels(d),own=L.has(item)?L.get(item):Infinity;return candidates(d,item).filter(r=>recipeLevel(d,r)<=own).sort((a,b)=>Number(!!a.alternate)-Number(!!b.alternate)||recipeLevel(d,a)-recipeLevel(d,b)||a.id.localeCompare(b.id))[0];}
function selected(d,item,choices){const all=candidates(d,item);if(choices[item]&&!all.some(r=>r.id===choices[item]))throw Error('선택한 레시피를 사용할 수 없습니다: '+item);return all.find(r=>r.id===choices[item])||all[0];}
// 제작 레시피가 없는 아이템(예: 슬러그·생물 산출물)은 공급 노드로 끝낸다.
const external=(d,item,choices={})=>d.items[item]?.resource||!candidates(d,item).length||(!levels(d).has(item)&&!choices[item]);
function reachable(d,item,choices={}){const seen=new Set(),rows=[];function walk(id){if(seen.has(id)||d.items[id]?.resource)return;seen.add(id);const options=candidates(d,id),r=selected(d,id,choices);rows.push({item:id,options,recipe:r?.id});r?.ingredients.forEach(p=>walk(p.item));}walk(item);return rows;}
function expand(d,item,amount,choices={},G,E){
 if(!d.items[item]||!Number.isFinite(amount)||amount<=0||amount>1e6)throw Error('목표량은 0 초과 1,000,000 이하로 입력하세요.');
 const nodes=[],edges=[],warnings=[],R=E.R,levels=new Map(),plan=new Map(),order=[],state=new Map();
 // 같은 아이템은 노드 하나로 합친다: 아이템별 레시피를 정하고(순환 검사), 위상 순서로 필요량을 모은다.
 function visit(id,path){
  if(state.get(id)===2)return;if(state.get(id)===1)throw Error('순환 레시피 감지: '+[...path.slice(path.indexOf(id)),id].map(i=>d.items[i]?.name||i).join(' → ')+' · 다른 레시피를 선택하세요.');
  if(path.length>100||plan.size>=499)throw Error('자동 전개 크기 제한 (노드 500개 / 깊이 100). 목표나 레시피를 바꾸세요.');
  if(!path.length&&!d.items[id].resource&&!candidates(d,id).length)throw Error('만들 수 있는 제작 경로 없음: '+d.items[id].name);
  state.set(id,1);
  const supply=path.length?external(d,id,choices):d.items[id].resource||!candidates(d,id).length;
  if(supply){plan.set(id,null);if(!d.items[id].resource)warnings.push(d.items[id].name+': 원자재까지 이어지는 레시피가 없어 공급 노드로 처리');}
  else {
   const use=r=>{plan.set(id,r);if(r.alternate&&!choices[id])warnings.push(d.items[id].name+': 기본 레시피 없음, 대체 레시피 '+r.name+' 사용');for(const p of r.ingredients)visit(p.item,[...path,id]);};
   const first=selected(d,id,choices),safe=!choices[id]&&shortest(d,id);
   if(!safe||safe===first)use(first);
   else {const keep={plan:new Map(plan),state:new Map(state),order:order.length,warnings:warnings.length};
    try{use(first);}catch(e){if(!/^순환/.test(e.message))throw e;plan.clear();keep.plan.forEach((v,k)=>plan.set(k,v));state.clear();keep.state.forEach((v,k)=>state.set(k,v));order.length=keep.order;warnings.length=keep.warnings;use(safe);}}
  }
  state.set(id,2);order.push(id);
 }
 visit(item,[]);
 const need=new Map([[item,R.of(amount)]]),node=new Map();
 for(const id of [...order].reverse()){
  const rate=need.get(id)||R.of(0),r=plan.get(id),n={id:'auto-n'+nodes.length,x:0,y:0,clock:100,showPpm:false};nodes.push(n);node.set(id,n);
  if(!r){Object.assign(n,{type:'resource',item:id,max:+rate,maxExact:rate.toString()});}
  else {
   const ports=G.ports({type:'recipe',recipe:r.id,clock:100},d);if(!ports.valid)throw Error('계산 불가 레시피: '+r.name);
   const product=r.products.find(p=>p.item===id),speed=d.buildings[r.machines[0]].speed;
   const perMinute=p=>R.of(p.exact??p.amount).mul(60).div(r.exactSeconds??r.seconds).mul(speed);
   const count=rate.div(perMinute(product));Object.assign(n,{type:'recipe',recipe:r.id,max:+count,maxExact:count.toString()});
   for(const p of r.ingredients)need.set(p.item,(need.get(p.item)||R.of(0)).add(perMinute(p).mul(count)));
  }
  if(!Number.isFinite(n.max)||n.max>1e6)throw Error('필요량이 노드 상한 1,000,000을 초과합니다.');
 }
 for(const id of order){const r=plan.get(id),n=node.get(id);let level=0;if(r)for(const p of r.ingredients){const c=node.get(p.item);if(!edges.some(e=>e.from===c.id&&e.to===n.id&&e.item===p.item))edges.push({id:'auto-e'+edges.length,from:c.id,to:n.id,item:p.item});level=Math.max(level,levels.get(c.id)+1);}levels.set(n.id,level);}
 const source=node.get(item),sink={id:'auto-target',type:'sink',item,max:amount,clock:100,x:0,y:0,title:d.items[item].name+' · 목표 '+amount+' /분'};nodes.push(sink);levels.set(sink.id,levels.get(source.id)+1);edges.push({id:'auto-e'+edges.length,from:source.id,to:sink.id,item});
 const y=new Map();for(const n of nodes){const level=levels.get(n.id),p=G.ports(n,d),h=Math.max(44,p.input.length*24,p.output.length*24)+180;n.x=level*380;n.y=y.get(level)||0;y.set(level,n.y+h);}
 return {version:1,calculationVersion:1,dataMode:d.mode==='vanilla'?'vanilla':'sfplus',solver:'Full',nodes,edges,view:{zoom:1,x:60,y:140},numbers:{display:'Decimal',digits:2},dark:true,warnings};
}
const MAX_URL=24000,MAX_JSON=2*1024*1024;
async function transform(bytes,compress){
 const stream=new Blob([bytes]).stream().pipeThrough(compress?new CompressionStream('gzip'):new DecompressionStream('gzip'));
 const reader=stream.getReader(),chunks=[];let length=0;
 for(;;){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>MAX_JSON){await reader.cancel();throw Error('공유 그래프 데이터가 2MB를 초과합니다.');}chunks.push(value);}
 const out=new Uint8Array(length);let offset=0;for(const chunk of chunks){out.set(chunk,offset);offset+=chunk.length;}return out;
}
async function encode(graph,base){
 const raw=new TextEncoder().encode(JSON.stringify(graph));if(raw.length>MAX_JSON)throw Error('공유 데이터 2MB 초과. 파일로 내보내세요.');
 const bytes=await transform(raw,true);let binary='';for(const byte of bytes)binary+=String.fromCharCode(byte);
 const hash='#riri-v1='+btoa(binary).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');const url=base.split('#')[0]+hash;
 if(url.length>MAX_URL)throw Error('공유 주소가 24,000자를 초과합니다. 링크 대신 그래프 파일로 내보내세요.');return url;
}
async function decode(hash){
 if(!hash.startsWith('#riri-v1=')||hash.length>MAX_URL)throw Error('지원하지 않는 공유 링크 또는 크기 초과');
 const payload=hash.slice(9).split('&')[0];if(!/^[A-Za-z0-9_-]+$/.test(payload))throw Error('공유 링크 인코딩 오류');
 const binary=atob(payload.replaceAll('-','+').replaceAll('_','/')),bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
 return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(await transform(bytes,false)));
}
const api={generationSpec,compatibleFuels,generators,cleanGenerator,generation,generatorPorts,decoratePower,candidates,reachable,expand,encode,decode,MAX_URL};
if(typeof module!=='undefined')module.exports=api;else root.GraphFeatures=api;
})(typeof window==='undefined'?globalThis:window);
