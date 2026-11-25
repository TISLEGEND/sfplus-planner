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
const U=typeof module!=='undefined'?require('./unlocks'):root.SFUnlocks;
const usable=(d,r)=>(U?.allowed(r)??true)&&r.seconds>0&&r.durationVerified!==false&&d.buildings[r.machines[0]]&&!r.modularMiner;
// 원자재까지 이어지는 단계 수(작을수록 가까움). 이어지지 않는 아이템은 없음. 이 단계가 줄어드는 레시피만 고르면 순환 없이 끝난다.
const levelCache=new WeakMap();
function levels(d){if(!U?.get().enabled&&levelCache.has(d))return levelCache.get(d);const L=new Map();for(const [id,i]of Object.entries(d.items))if(i.resource)L.set(id,0);
 const rs=d.recipes.filter(r=>usable(d,r));for(let round=1,changed=true;changed&&round<200;round++){changed=false;const add=[];for(const r of rs)if(r.ingredients.every(p=>L.has(p.item)&&L.get(p.item)<round))for(const p of r.products)if(p.amount>0&&!L.has(p.item))add.push(p.item);for(const id of add)if(!L.has(id)){L.set(id,round);changed=true;}}
 if(!U?.get().enabled)levelCache.set(d,L);return L;}
const recipeLevel=(d,r)=>{const L=levels(d);let m=0;for(const p of r.ingredients){if(!L.has(p.item))return Infinity;m=Math.max(m,L.get(p.item));}return m+1;};
// 원자재까지 이어지는 레시피 → 기본 레시피 → 짧은 경로 순.
function candidates(d,item){const lv=new Map(),f=r=>{if(!lv.has(r))lv.set(r,recipeLevel(d,r));return lv.get(r);};
 return d.recipes.filter(r=>r.products.some(p=>p.item===item&&p.amount>0)&&usable(d,r)).sort((a,b)=>Number(f(a)===Infinity)-Number(f(b)===Infinity)||Number(!!a.alternate)-Number(!!b.alternate)||f(a)-f(b)||a.id.localeCompare(b.id));}
// 순환을 만들 때 대신 쓰는, 원자재 쪽으로 반드시 한 단계 가까워지는 레시피.
function shortest(d,item){const L=levels(d),own=L.has(item)?L.get(item):Infinity;return candidates(d,item).filter(r=>recipeLevel(d,r)<=own).sort((a,b)=>Number(!!a.alternate)-Number(!!b.alternate)||recipeLevel(d,a)-recipeLevel(d,b)||a.id.localeCompare(b.id))[0];}
function selected(d,item,choices){const all=candidates(d,item);if(choices[item])U?.assertRecipe(d.recipes.find(r=>r.id===choices[item]));if(choices[item]&&!all.some(r=>r.id===choices[item]))throw Error('선택한 레시피를 사용할 수 없습니다: '+item);return all.find(r=>r.id===choices[item])||all[0];}
// 제작 레시피가 없는 아이템(예: 슬러그·생물 산출물)은 공급 노드로 끝낸다.
const external=(d,item,choices={})=>d.items[item]?.resource||!candidates(d,item).length||(!levels(d).has(item)&&!choices[item]);
function reachable(d,item,choices={}){const seen=new Set(),rows=[];function walk(id){if(seen.has(id)||d.items[id]?.resource)return;seen.add(id);const options=candidates(d,id),r=selected(d,id,choices);rows.push({item:id,options,recipe:r?.id});r?.ingredients.forEach(p=>walk(p.item));}walk(item);return rows;}
const levelsForUnlock=(d,id)=>levels(d).has(id);
function expand(d,item,amount,choices={},G,E,targets=null,supplies=new Map()){
 if(!d.items[item]||!Number.isFinite(amount)||amount<=0||amount>1e6)throw Error('목표량은 0 초과 1,000,000 이하로 입력하세요.');
 const nodes=[],edges=[],warnings=[],R=E.R,levels=new Map(),plan=new Map(),order=[],state=new Map(),blocked=new Map();
 // 같은 아이템은 노드 하나로 합친다: 아이템별 레시피를 정하고(순환 검사), 위상 순서로 필요량을 모은다.
 function visit(id,path){
  // With supplies, defer unlock errors until the remaining demand is known.
  if(supplies.size&&U?.get().enabled){const msg=!d.items[id]?.resource&&!candidates(d,id).length?U.missing(d,id):null;if(msg){blocked.set(id,msg);plan.set(id,null);state.set(id,2);if(!order.includes(id))order.push(id);return;}}
  if(supplies.has(id)&&!candidates(d,id).length&&!d.items[id].resource){plan.set(id,null);state.set(id,2);if(!order.includes(id))order.push(id);return;}
  if(U?.get().enabled&&!d.items[id]?.resource&&!candidates(d,id).length){const msg=U.missing(d,id);if(msg)throw Error(msg);}
  if(state.get(id)===2)return;if(state.get(id)===1)throw Error('순환 레시피 감지: '+[...path.slice(path.indexOf(id)),id].map(i=>d.items[i]?.name||i).join(' → ')+' · 다른 레시피를 선택하세요.');
  if(path.length>100||plan.size>=499)throw Error('자동 전개 크기 제한 (노드 500개 / 깊이 100). 목표나 레시피를 바꾸세요.');
  if(!path.length&&!d.items[id].resource&&!candidates(d,id).length)throw Error('만들 수 있는 제작 경로 없음: '+d.items[id].name);
  state.set(id,1);
  if(!supplies.size&&U?.get().enabled&&!levelsForUnlock(d,id)){const msg=U.blocked(d,id);if(msg)throw Error(msg);}
  const supply=supplies.size?d.items[id].resource||!candidates(d,id).length:path.length?external(d,id,choices):d.items[id].resource||!candidates(d,id).length;
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
 const goals=targets||[{item,amount}];
 for(const goal of goals)visit(goal.item,[]);
 const need=new Map(goals.map(g=>[g.item,R.of(g.amount)])),node=new Map(),supplyNodes=new Map();
 for(const id of [...order].reverse()){
  let rate=need.get(id)||R.of(0);const available=supplies.get(id)||R.of(0),used=+rate<+available?rate:available;rate=rate.sub(used);
  if(+used>0){const source={id:"auto-supply-"+nodes.length,type:"resource",item:id,max:+used,maxExact:used.toString(),clock:100,x:0,y:0,title:d.items[id].name+" · 기존 공급"};nodes.push(source);supplyNodes.set(id,source);levels.set(source.id,0);}
  if(supplies.size&&+rate===0)continue;
  if(blocked.has(id))throw Error(blocked.get(id));
  if(supplies.has(id)&&!d.items[id].resource&&!plan.get(id)&&+rate>0)throw Error("기존 공급 부족 · 제작 경로 없음 또는 미해금: "+d.items[id].name);
  const r=plan.get(id),n={id:'auto-n'+nodes.length,x:0,y:0,clock:100,showPpm:false};nodes.push(n);node.set(id,n);
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
 const sources=id=>[node.get(id),supplyNodes.get(id)].filter(Boolean);
 for(const id of order){const r=plan.get(id),n=node.get(id);if(!n)continue;let level=0;if(r)for(const p of r.ingredients)for(const c of sources(p.item)){if(!edges.some(e=>e.from===c.id&&e.to===n.id&&e.item===p.item))edges.push({id:'auto-e'+edges.length,from:c.id,to:n.id,item:p.item});level=Math.max(level,levels.get(c.id)+1);}levels.set(n.id,level);}
 for(const [index,{item,amount}]of goals.entries()){
 const sink={id:index?'auto-target-'+index:'auto-target',type:'sink',item,max:amount,clock:100,x:0,y:0,title:d.items[item].name+' · 목표 '+amount+' /분'};nodes.push(sink);levels.set(sink.id,Math.max(...sources(item).map(n=>levels.get(n.id)))+1);for(const source of sources(item))edges.push({id:'auto-e'+edges.length,from:source.id,to:sink.id,item});
 }
 for(const [id,available]of supplies){const used=supplyNodes.get(id)?.max||0,unused=available.sub(R.of(supplyNodes.get(id)?.maxExact||0));if(+unused>0)warnings.push(d.items[id].name+' · 기존 공급 '+(+available)+' /분 중 사용 '+used+' /분 · 초과 공급 '+(+unused)+' /분 남음');}
 if(nodes.length>500||edges.length>1500)throw Error('자동 전개 크기 제한 (노드 500개 / 연결 1500개)');
 const y=new Map();for(const n of nodes){const level=levels.get(n.id),p=G.ports(n,d),h=Math.max(44,p.input.length*24,p.output.length*24)+180;n.x=level*380;n.y=y.get(level)||0;y.set(level,n.y+h);}
 return {version:1,calculationVersion:1,dataMode:d.mode==='vanilla'?'vanilla':'sfplus',solver:'Full',nodes,edges,view:{zoom:1,x:60,y:140},numbers:{display:'Decimal',digits:2},dark:true,warnings};
}
// Validate every row before merging; invalid rows must never disappear into a sum.
function expandMany(d,targets,choices={},G,E,supplyRows=[]){
 if(!Array.isArray(supplyRows))throw Error("기존 공급 목록 오류");
 const supplies=new Map();for(const t of supplyRows){if(!t||!d.items[t.item]||!Number.isFinite(t.amount)||t.amount<0||t.amount>1e6)throw Error("기존 공급량은 0 이상 1,000,000 이하로 입력하세요.");const n=(supplies.get(t.item)||E.R.of(0)).add(E.R.of(t.amount));if(+n>1e6)throw Error("합산 기존 공급량 상한 초과");if(+n>0)supplies.set(t.item,n);}
 if(!Array.isArray(targets)||!targets.length)throw Error('목표를 하나 이상 추가하세요.');
 const sums=new Map();
 for(const t of targets){
  if(!t||!d.items[t.item]||!Number.isFinite(t.amount)||t.amount<=0||t.amount>1e6)throw Error('목표량은 0 초과 1,000,000 이하로 입력하세요.');
  sums.set(t.item,(sums.get(t.item)||E.R.of(0)).add(E.R.of(t.amount)));
 }
 const goals=[...sums].map(([item,n])=>({item,amount:+n}));
 if(goals.some(t=>t.amount>1e6))throw Error('합산 목표량은 1,000,000 이하여야 합니다.');
 for(const t of goals)if(!supplies.has(t.item)&&!d.items[t.item].resource&&!candidates(d,t.item).length)throw Error('만들 수 있는 제작 경로 없음: '+d.items[t.item].name);
 return expand(d,goals[0].item,goals[0].amount,choices,G,E,goals.length===1?null:goals,supplies);
}
const MAX_URL=24000,MAX_JSON=2*1024*1024;
const WIRE_WORDS=['id','type','x','y','max','maxExact','clock','clockExact','recipe','item','parent','center','title','showPpm','autoRound','unlimited','originalIndex','originalName','inputOrder','outputOrder','visualMax','from','to','fromPort','toPort','waypoints','version','calculationVersion','dataMode','solver','view','snap','dark','numbers','activeGroup','display','digits','round','warnings','diagramEdges','Decimal','Nearest','Full','sfplus','vanilla','resource','sink','recipe','logistics','generator','c','g','v','p','s','t','a','o','u'];
const WIRE_DEFAULTS={center:false,title:'',showPpm:false,autoRound:false,unlimited:false,originalIndex:null,originalName:'',inputOrder:[],outputOrder:[],visualMax:'',parent:null,clock:100,fromPort:0,toPort:0,waypoints:[]};
// Wire constants are part of v2: keep existing positions and defaults unchanged.
// Column tables omit repeated defaults while preserving absent versus explicit fields.
// IDs live inside the link, never in a mutable site-data index.
function compact(graph,v3=false){
 const strings=new Set(),frequency=new Map();function scan(v){if(typeof v==='string'){frequency.set(v,(frequency.get(v)||0)+1);if(/^(Recipe_|Desc_).+_C$/.test(v)||(v3&&V3_INDEX.has(v)))strings.add(v);}else if(v&&typeof v==='object')Object.values(v).forEach(scan);}scan(graph);for(const [s,n]of frequency)if(n>1&&!s.includes('auto-n')&&!s.includes('auto-e')&&!s.includes('auto-target'))strings.add(s);
 const ids=[],lookup=new Map();
 const intern=s=>{if(!lookup.has(s)){lookup.set(s,ids.length);ids.push(v3&&V3_INDEX.has(s)?V3_INDEX.get(s):s.startsWith('Recipe_')&&s.endsWith('_C')?['r',s.slice(7,-2)]:s.startsWith('Desc_')&&s.endsWith('_C')?['d',s.slice(5,-2)]:s);}return lookup.get(s);};
 for(const str of [...strings].sort())intern(str);
 const value=v=>typeof v==='string'?(lookup.has(v)?['s',lookup.get(v)]:['t',v]):Array.isArray(v)?['a',v.map(value)]:v&&typeof v==='object'?['o',Object.entries(v).map(([k,v])=>[k,value(v)])]:v;
 function table(rows){
  const keys=[...new Set(rows.flatMap(Object.keys))];
  return [rows.length,keys.map(k=>{
   if(Object.hasOwn(WIRE_DEFAULTS,k)&&rows.length&&rows.every(r=>Object.hasOwn(r,k)&&JSON.stringify(r[k])===JSON.stringify(WIRE_DEFAULTS[k])))return [k];
   const vals=rows.map(r=>Object.hasOwn(r,k)?value(r[k]):['u']);
   // Exact integer grid deltas only; non-grid/floating coordinates retain original numbers.
   if(['x','y','from','to'].includes(k)&&rows.length&&rows.every((r,i)=>Number.isSafeInteger(r[k])&&Number.isSafeInteger(r[k]-(i?rows[i-1][k]:0)))){
    let last=0;return [k,'g',1,vals.map(v=>{const d=v-last;last=v;return d;})];
   }
   if(k==='id'&&rows.length>0&&rows.every(r=>typeof r[k]==='string'&&/\d/.test(r[k])&&[...r[k].matchAll(/\d+/g)].every(m=>String(Number(m[0]))===m[0]&&Number.isSafeInteger(Number(m[0]))))){
    const templates=[],codes=rows.map(r=>{const parts=r[k].split(/\d+/),key=JSON.stringify(parts);let i=templates.findIndex(t=>JSON.stringify(t)===key);if(i<0){i=templates.length;templates.push(parts);}return [i,...r[k].match(/\d+/g).map(Number)];});
    if(templates.length<rows.length/2&&codes.every(c=>c.length===codes[0].length))return [k,'p',templates,Array.from({length:codes[0].length},(_,i)=>codes.map(c=>c[i]??null))];
   }
   const counts=new Map();for(const v of vals){const t=JSON.stringify(v);counts.set(t,(counts.get(t)||0)+1);}
   const def=[...counts].sort((a,b)=>b[1]-a[1])[0]?.[0]||'null',changes=[];
   vals.forEach((v,i)=>{if(JSON.stringify(v)!==def)changes.push(i,v);});return changes.length>rows.length/2?[k,'v',vals]:[k,'c',JSON.parse(def),changes];
  })];
 }
 const {nodes,edges,...meta}=graph;
 const n=Array.isArray(nodes)?table(nodes):null,e=Array.isArray(edges)?table(edges.map(edge=>{
  const row={...edge};for(const k of ['from','to']){const i=nodes?.findIndex(n=>n.id===edge[k]);if(i>=0)row[k]=i;}return row;
 })):null;
 let previous='';const dictionary=ids.map(v=>{const text=JSON.stringify(v);let i=0;while(i<previous.length&&i<text.length&&previous[i]===text[i])i++;const entry=[i,text.slice(i)];previous=text;return entry;});
 return [dictionary,value(meta),n,e];
}
function restore(p,v3=false){
 if(!Array.isArray(p)||p.length!==4||!Array.isArray(p[0]))throw Error('공유 v2 구조 오류');
 let previous='';const ids=p[0].map(([i,tail])=>{previous=previous.slice(0,i)+tail;const s=JSON.parse(previous);if(v3&&Number.isInteger(s)){if(!V3_REGISTRY.ids[s])throw Error('공유 ID 번호 오류');return V3_REGISTRY.ids[s];}return Array.isArray(s)?(s[0]==='r'?'Recipe_':'Desc_')+s[1]+'_C':s;});
 const value=v=>Array.isArray(v)?v[0]==='s'?ids[v[1]]:v[0]==='t'?v[1]:v[0]==='a'?v[1].map(value):v[0]==='o'?Object.fromEntries(v[1].map(([k,v])=>[k,value(v)])):undefined:v;
 function table(t){if(!t)return undefined;if(!Number.isInteger(t[0])||t[0]<0||t[0]>100000||!Array.isArray(t[1])||t[0]*t[1].length>MAX_JSON/4)throw Error('공유 노드 수 오류');const rows=Array.from({length:t[0]},()=>({}));
  for(const [k,mode,def,changes]of t[1]){if(mode===undefined){if(!Object.hasOwn(WIRE_DEFAULTS,k))throw Error('공유 기본 필드 오류');rows.forEach(r=>Object.defineProperty(r,k,{value:structuredClone(WIRE_DEFAULTS[k]),enumerable:true,writable:true,configurable:true}));continue;}if(mode==='p'){rows.forEach((r,i)=>{const t=changes[0][i],ns=changes.slice(1).map(c=>c[i]);Object.defineProperty(r,k,{value:def[t].map((part,j)=>part+(j<ns.length?ns[j]:'')).join(''),enumerable:true,writable:true,configurable:true});});continue;}if(mode==='g'){let n=0;changes.forEach((d,i)=>{n+=d;Object.defineProperty(rows[i],k,{value:n*def,enumerable:true,writable:true,configurable:true});});continue;}
   const vals=mode==='v'?def:Array(t[0]).fill(def);if(mode!=='v')for(let i=0;i<changes.length;i+=2)vals[changes[i]]=changes[i+1];
   vals.forEach((v,i)=>{if(!(Array.isArray(v)&&v[0]==='u'))Object.defineProperty(rows[i],k,{value:value(v),enumerable:true,writable:true,configurable:true});});
  }return rows;
 }
 const graph=value(p[1]),nodes=table(p[2]),edges=table(p[3]);if(nodes)graph.nodes=nodes;if(edges){graph.edges=edges;for(const e of edges)for(const k of ['from','to'])if(typeof e[k]==='number'){if(!nodes?.[e[k]])throw Error('공유 연결 오류');e[k]=nodes[e[k]].id;}}
 return graph;
}
// Typed binary values avoid JSON punctuation and decimal index overhead.
function binaryPack(value,v3=false){
 const bytes=[],utf8=new TextEncoder(),push=n=>bytes.push(n),uint=n=>{do{const b=n%128;n=Math.floor(n/128);push(b+(n?128:0));}while(n);};
 function write(v){if(v===null){push(0);return;}if(v===false||v===true){push(v?2:1);return;}if(typeof v==='number'){
  if(Number.isSafeInteger(v)&&Math.abs(v)<2**51){push(3);uint(v<0?-v*2-1:v*2);}else{if(v3)for(let precision=1;precision<=6;precision++){const scaled=Math.round(v*10**precision);if(Number.isSafeInteger(scaled)&&Math.abs(scaled)<2**35&&scaled/10**precision===v){push(11);push(precision);uint(scaled<0?-scaled*2-1:scaled*2);return;}}push(4);const a=new Uint8Array(8);new DataView(a.buffer).setFloat64(0,v,true);bytes.push(...a);}return;}
  if(typeof v==='string'){if(v3&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(v)){push(10);for(const h of v.replaceAll('-','').match(/../g))push(parseInt(h,16));return;}const word=WIRE_WORDS.indexOf(v);if(word>=0){push(7);uint(word);return;}push(5);const a=utf8.encode(v);uint(a.length);for(const b of a)push(b);return;}
  if(Array.isArray(v)){
   if(v.length>=8&&v.every(Number.isSafeInteger)){for(let p=1;p<=Math.min(256,Math.floor(v.length/2));p++){const step=v[p]-v[0];if(Number.isSafeInteger(step)&&v.every((n,i)=>n===v[i%p]+Math.floor(i/p)*step)){push(8);uint(v.length);write(step);write(v.slice(0,p));return;}}}
   // Repeated column values (including exact fractions and interned IDs) share one pattern.
   if(v.length>=8){const keys=v.map(x=>JSON.stringify(x));for(let p=1;p<=Math.min(256,Math.floor(v.length/2));p++)if(keys.every((k,i)=>k===keys[i%p])){push(9);uint(v.length);write(v.slice(0,p));return;}}
   push(6);uint(v.length);v.forEach(write);return;}throw Error('공유 값 형식 오류');
 }write(value);return new Uint8Array(bytes);
}
function binaryRead(bytes){let pos=0,budget=MAX_JSON;const decoder=new TextDecoder('utf-8',{fatal:true});
 const byte=()=>{if(pos>=bytes.length)throw Error('공유 데이터 잘림');return bytes[pos++];};
 const uint=()=>{let n=0,p=1;for(let i=0;i<8;i++){const b=byte();n+=(b&127)*p;if(b<128){if(!Number.isSafeInteger(n))throw Error('공유 정수 오류');return n;}p*=128;}throw Error('공유 정수 오류');};
 function read(depth=0){if(depth>150||--budget<0)throw Error('공유 구조 제한');switch(byte()){
 case 11:{const p=byte(),n=uint();if(p<1||p>6)throw Error('공유 소수 정밀도 오류');return (n%2?-(n+1)/2:n/2)/10**p;}
 case 10:{let s='';for(let i=0;i<16;i++)s+=byte().toString(16).padStart(2,'0');return s.slice(0,8)+'-'+s.slice(8,12)+'-'+s.slice(12,16)+'-'+s.slice(16,20)+'-'+s.slice(20);}
 case 7:{const word=uint();if(word>=WIRE_WORDS.length)throw Error('공유 단어 오류');return WIRE_WORDS[word];}case 0:return null;case 1:return false;case 2:return true;case 3:{const n=uint();return n%2?-(n+1)/2:n/2;}
 case 4:{if(pos+8>bytes.length)throw Error('공유 실수 오류');const n=new DataView(bytes.buffer,bytes.byteOffset+pos,8).getFloat64(0,true);pos+=8;return n;}
 case 5:{const n=uint();if(n>MAX_JSON||pos+n>bytes.length)throw Error('공유 문자열 오류');const s=decoder.decode(bytes.subarray(pos,pos+n));pos+=n;return s;}
 case 9:{const n=uint(),pattern=read(depth+1);if(n>MAX_JSON||n>budget||!Array.isArray(pattern)||!pattern.length||pattern.length>n)throw Error('공유 반복 오류');budget-=n;return Array.from({length:n},(_,i)=>pattern[i%pattern.length]);}
 case 8:{const n=uint(),step=read(depth+1),pattern=read(depth+1);if(n>MAX_JSON||n>budget||!Array.isArray(pattern)||!pattern.length||typeof step!=='number')throw Error('공유 반복 오류');budget-=n;return Array.from({length:n},(_,i)=>pattern[i%pattern.length]+Math.floor(i/pattern.length)*step);}case 6:{const n=uint();if(n>MAX_JSON||n>budget)throw Error('공유 배열 오류');return Array.from({length:n},()=>read(depth+1));}
 default:throw Error('공유 바이너리 오류');}}
 const result=read();if(pos!==bytes.length)throw Error('공유 데이터 꼬리 오류');return result;
}
async function transform(bytes,compress,format='gzip'){
 const stream=new Blob([bytes]).stream().pipeThrough(compress?new CompressionStream(format):new DecompressionStream(format));
 const reader=stream.getReader(),chunks=[];let length=0;
 for(;;){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>MAX_JSON){await reader.cancel();throw Error('공유 그래프 데이터가 2MB를 초과합니다.');}chunks.push(value);}
 const out=new Uint8Array(length);let offset=0;for(const chunk of chunks){out.set(chunk,offset);offset+=chunk.length;}return out;
}
async function encodeV2(graph,base,options={}){
 graph=JSON.parse(JSON.stringify(graph));
 if(options.includeNotes!==true){delete graph.planNotes;for(const n of graph.nodes||[])delete n.constructionNotes;}
 if(new TextEncoder().encode(JSON.stringify(graph)).length>MAX_JSON)throw Error('공유 데이터 2MB 초과. 파일로 내보내세요.');
 const raw=binaryPack(compact(graph));if(raw.length>MAX_JSON)throw Error('공유 데이터 2MB 초과. 파일로 내보내세요.');let bytes,mode;
 try{new CompressionStream('deflate-raw');new DecompressionStream('deflate-raw');mode='d';}catch{mode='g';}
 bytes=await transform(raw,true,mode==='d'?'deflate-raw':'gzip');let binary='';for(const byte of bytes)binary+=String.fromCharCode(byte);
 const hash='#riri-v2='+mode+btoa(binary).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');const url=base.split('#')[0]+hash;
 if(url.length>MAX_URL)throw Error('공유 주소가 24,000자를 초과합니다. 링크 대신 그래프 파일로 내보내세요.');return url;
}
async function decode(hash){
 if(hash.startsWith('#riri-v3='))return decodeV3(hash);
 if(!/^#riri-v[12]=/.test(hash)||hash.length>MAX_URL)throw Error('지원하지 않는 공유 링크 또는 크기 초과');
 const v2=hash.startsWith('#riri-v2=');let payload=hash.slice(9).split('&')[0],format='gzip';
 if(v2){const mode=payload[0];if(!['d','g'].includes(mode))throw Error('공유 압축 형식 오류');format=mode==='d'?'deflate-raw':'gzip';payload=payload.slice(1);}
 if(!/^[A-Za-z0-9_-]+$/.test(payload))throw Error('공유 링크 인코딩 오류');
 const binary=atob(payload.replaceAll('-','+').replaceAll('_','/')),bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
 const raw=await transform(bytes,false,format),parsed=v2?binaryRead(raw):JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw)),graph=v2?restore(parsed):parsed;
 if(new TextEncoder().encode(JSON.stringify(graph)).length>MAX_JSON)throw Error('공유 그래프 데이터가 2MB를 초과합니다.');return graph;
}

// Registry and preset are frozen wire assets, independent of the current game data.
const V3_REGISTRY=typeof module!=='undefined'?require('./share-v3/registry'):root.RiriShareRegistry;
const V3_INDEX=new Map((V3_REGISTRY?.ids||[]).map((s,i)=>[s,i]));
const V3_PAKO=typeof module!=='undefined'?require('./share-v3/pako.min'):root.pako;
const V3_DICT=new TextEncoder().encode(JSON.stringify(WIRE_WORDS)+JSON.stringify(WIRE_DEFAULTS)+JSON.stringify(V3_REGISTRY?.ids||[]).slice(-24000));
// A fixed topology/port-count layout can be replayed without solving or selecting recipes.
function sharePositions(graph){
 const nodes=graph.nodes||[],index=new Map(nodes.map((n,i)=>[n.id,i])),incoming=nodes.map(()=>[]),levels=nodes.map(()=>0),state=nodes.map(()=>0);
 for(const e of graph.edges||[]){const a=index.get(e.from),b=index.get(e.to);if(a!==undefined&&b!==undefined)incoming[b].push(a);}
 function visit(i,depth=0){if(state[i]===2)return levels[i];if(state[i]===1||depth>100)return 0;state[i]=1;for(const a of incoming[i])levels[i]=Math.max(levels[i],visit(a,depth+1)+1);state[i]=2;return levels[i];}
 const ys=new Map();return nodes.map((n,i)=>{const level=visit(i),shape=V3_REGISTRY?.shapes[n.recipe]||[1,1],y=ys.get(level)||0;ys.set(level,y+Math.max(44,shape[0]*24,shape[1]*24)+180);return [level*380,y];});
}
function prepareV3(graph,lossless=false,layout=1){
 const g=structuredClone(graph),positions=sharePositions(g),missing=[];
 (g.nodes||[]).forEach((n,i)=>{for(const [j,k]of ['x','y'].entries()){
  if(!Object.hasOwn(n,k)){missing.push(i*2+j);continue;}
  const v=n[k];if(typeof v!=='number'||!Number.isFinite(v)){missing.push(-i*2-j-1);continue;}
  const q=!lossless&&Math.abs(v)<2**40?Math.round(v):v;if(layout!==1){n[k]=q;continue;}
  if(!Number.isSafeInteger(q)||!Number.isSafeInteger(q-positions[i][j])){n[k]=q;missing.push(-i*2-j-1);continue;}n[k]=q-positions[i][j];if(n[k]===0)delete n[k];
 }});
 return [layout,compact(g,layout!==3),layout===1?missing:[]];
}
function restoreV3(p){
 if(!Array.isArray(p)||p.length!==3||![1,2,3].includes(p[0])||!Array.isArray(p[2]))throw Error('공유 v3 레지스트리/구조 오류');
 const g=restore(p[1],p[0]!==3);if(p[0]!==1)return g;const positions=sharePositions(g),missing=new Set(p[2]);
 (g.nodes||[]).forEach((n,i)=>{for(const [j,k]of ['x','y'].entries())if(!missing.has(i*2+j)&&!missing.has(-i*2-j-1))n[k]=(n[k]??0)+positions[i][j];});return g;
}
const b64=bytes=>{let s='';for(const b of bytes)s+=String.fromCharCode(b);return btoa(s).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');};
// RFC3986 fragment characters, excluding delimiters #, &, %; 80 symbols.
// Seven bytes fit in nine characters, versus base64url's ten characters.
const B80="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$'()*+,/:;?@=";
const B80_LENGTHS=[0,2,3,4,6,7,8,9];
function base80(bytes){let out='';for(let i=0;i<bytes.length;i+=7){const n=Math.min(7,bytes.length-i);let v=0n;for(let j=0;j<n;j++)v=(v<<8n)+BigInt(bytes[i+j]);let s='';do{s=B80[Number(v%80n)]+s;v/=80n;}while(v);out+=s.padStart(B80_LENGTHS[n],B80[0]);}return out;}
function unbase80(s){const a=[];for(let i=0;i<s.length;i+=9){const chunk=s.slice(i,i+9),n=B80_LENGTHS.indexOf(chunk.length);if(n<1)throw Error('공유 base80 길이 오류');let v=0n;for(const c of chunk){const k=B80.indexOf(c);if(k<0)throw Error('공유 base80 문자 오류');v=v*80n+BigInt(k);}if(v>=(1n<<BigInt(n*8)))throw Error('공유 base80 범위 오류');const b=Array(n);for(let j=n-1;j>=0;j--){b[j]=Number(v&255n);v>>=8n;}a.push(...b);}return Uint8Array.from(a);}

function inflateV3(bytes,dictionary){
 const inf=new V3_PAKO.Inflate({raw:true,...(dictionary?{dictionary:V3_DICT}:{})}),chunks=[];let size=0;
 inf.onData=chunk=>{size+=chunk.length;if(size>MAX_JSON)throw Error('공유 그래프 데이터가 2MB를 초과합니다.');chunks.push(chunk);};
 inf.push(bytes,true);if(inf.err||!inf.ended)throw Error('공유 v3 압축 오류');const out=new Uint8Array(size);let pos=0;for(const c of chunks){out.set(c,pos);pos+=c.length;}return out;
}
async function shareV3Metrics(graph,options={}){
 const candidates=[];
 for(const layout of [1,2,3]){
 const raw=binaryPack(prepareV3(graph,options.lossless===true,layout),true);if(raw.length>MAX_JSON)throw Error('공유 데이터 2MB 초과. 파일로 내보내세요.');
 const plain=V3_PAKO.deflateRaw(raw,{level:9}),preset=V3_PAKO.deflateRaw(raw,{level:9,dictionary:V3_DICT});
 // Measure serialized fragment length, not the unescaped alphabet length.
 for(const [mode,bytes]of [['d',plain],['p',preset],['n',raw]])for(const [encoding,encodeBytes]of [['6',b64],['8',base80]]){
  const payload=mode+encoding+encodeBytes(bytes),serialized=new URL('https://r.invalid/#riri-v3='+payload).hash.slice(9);candidates.push({layout,mode,encoding,payload:serialized,length:serialized.length,bytes:bytes.length,raw:raw.length});
 }}
 candidates.sort((a,b)=>a.length-b.length);return {raw:candidates[0].raw,candidates,best:candidates[0]};
}
async function shareV3Breakdown(graph){
 const metrics=await shareV3Metrics(graph),p=prepareV3(graph,false,metrics.best.layout),parts=[];
 const add=(field,value)=>parts.push({field,bytes:binaryPack(value,true).length});
 add('dictionary',p[1][0]);add('meta',p[1][1]);
 for(const [name,t]of [['nodes',p[1][2]],['edges',p[1][3]]])if(t)for(const col of t[1])add(name+'.'+col[0],col);
 add('coordinateExceptions',p[2]);
 parts.push({field:'structure',bytes:metrics.raw-parts.reduce((s,p)=>s+p.bytes,0)});
 return {layout:metrics.best.layout,raw:metrics.raw,parts};
}
async function encodeV3(graph,base,options={}){
 graph=JSON.parse(JSON.stringify(graph));if(options.includeNotes!==true){delete graph.planNotes;for(const n of graph.nodes||[])delete n.constructionNotes;}
 if(new TextEncoder().encode(JSON.stringify(graph)).length>MAX_JSON)throw Error('공유 데이터 2MB 초과. 파일로 내보내세요.');
 const {best}=await shareV3Metrics(graph,options),url=base.split('#')[0]+'#riri-v3='+best.payload;
 if(url.length>MAX_URL)throw Error('공유 주소가 24,000자를 초과합니다. 링크 대신 그래프 파일로 내보내세요.');return url;
}
async function decodeV3(hash){
 if(hash.length>MAX_URL)throw Error('지원하지 않는 공유 링크 또는 크기 초과');
 const payload=decodeURIComponent(hash.slice(9).split('&')[0]),mode=payload[0],encoding=payload[1],s=payload.slice(2);
 if(!['d','p','n'].includes(mode)||!['6','8'].includes(encoding)||!s)throw Error('공유 v3 형식 오류');
 let bytes;if(encoding==='8')bytes=unbase80(s);else{if(!/^[A-Za-z0-9_-]+$/.test(s))throw Error('공유 링크 인코딩 오류');bytes=Uint8Array.from(atob(s.replaceAll('-','+').replaceAll('_','/')),c=>c.charCodeAt(0));}
 const parsed=binaryRead(mode==='n'?bytes:inflateV3(bytes,mode==='p'));
 const graph=parsed?.[0]===4?V4.unpack(parsed):restoreV3(parsed);if(new TextEncoder().encode(JSON.stringify(graph)).length>MAX_JSON)throw Error('공유 그래프 데이터가 2MB를 초과합니다.');return graph;
}

// v4 is a new self-identifying payload inside the established v3 URL envelope.
// All previously issued v1/v2/v3 payloads keep their original decoder.
const V4=typeof module!=='undefined'?require('./share-v4'):root.RiriShareV4;
async function shareV4Metrics(graph,options={}){
 graph=JSON.parse(JSON.stringify(graph));
 if(new TextEncoder().encode(JSON.stringify(graph)).length>MAX_JSON)throw Error('공유 데이터 2MB 초과. 파일로 내보내세요.');
 if(options.includeNotes!==true){delete graph.planNotes;for(const n of graph.nodes||[])delete n.constructionNotes;}
 const packed=V4.pack(graph),raw=binaryPack(packed,true),candidates=[];
 if(raw.length>MAX_JSON)throw Error('공유 데이터 2MB 초과. 파일로 내보내세요.');
 for(const [mode,bytes]of [['d',V3_PAKO.deflateRaw(raw,{level:9})],['p',V3_PAKO.deflateRaw(raw,{level:9,dictionary:V3_DICT})],['n',raw]])for(const [encoding,encoder]of [['6',b64],['8',base80]]){
  const payload=new URL('https://r.invalid/#riri-v3='+mode+encoding+encoder(bytes)).hash.slice(9);candidates.push({mode,encoding,payload,length:payload.length,bytes:bytes.length,raw:raw.length});
 }
 candidates.sort((a,b)=>a.length-b.length);
 return {raw:raw.length,sections:{header:binaryPack(4,true).length,nodes:binaryPack(packed[1],true).length,edges:binaryPack(packed[2],true).length,settings:binaryPack(packed[3],true).length,envelope:2},candidates,best:candidates[0]};
}
async function encode(graph,base,options={}){
 const {best}=await shareV4Metrics(graph,options),url=base.split('#')[0]+'#riri-v3='+best.payload;
 if(url.length>MAX_URL)throw Error('공유 주소가 24,000자를 초과합니다. 링크 대신 그래프 파일로 내보내세요.');return url;
}
function shareV4Breakdown(graph){
 const p=V4.pack(JSON.parse(JSON.stringify(graph))),totals={};
 const add=(k,v)=>totals[k]=(totals[k]||0)+binaryPack(v,true).length;
 for(const r of p[1]){add('node.type',r[0]);add('node.recipe/item',r[1]);add('node.coordinates',r[2]);add('node.coordinates',r[3]);if(r.length>4)add('node.max/slot',r[4]);if(r[5])add('node.extra',r[5]);}
 for(const r of p[2]){add('edge.topology',r[0]);add('edge.topology',r[1]);if(r.length>2)add('edge.item/slot',r[2]);if(r[3])add('edge.extra',r[3]);}
 add('settings/custom',p[3]);add('version',p[0]);
 const raw=binaryPack(p,true).length;totals.structure=raw-Object.values(totals).reduce((a,b)=>a+b,0);return {raw,parts:Object.entries(totals).map(([field,bytes])=>({field,bytes}))};
}

const api={generationSpec,compatibleFuels,generators,cleanGenerator,generation,generatorPorts,decoratePower,candidates,reachable,expand,expandMany,encode,encodeV2,encodeV3,decode,MAX_URL,shareV3Metrics,shareV3Breakdown,shareV4Metrics,shareV4Breakdown};
if(typeof module!=='undefined')module.exports=api;else root.GraphFeatures=api;
})(typeof window==='undefined'?globalThis:window);
