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
const WIRE_WORDS=['id','type','x','y','max','maxExact','clock','clockExact','recipe','item','parent','center','title','showPpm','autoRound','unlimited','originalIndex','originalName','inputOrder','outputOrder','visualMax','from','to','fromPort','toPort','waypoints','version','calculationVersion','dataMode','solver','view','snap','dark','numbers','activeGroup','display','digits','round','warnings','diagramEdges','Decimal','Nearest','Full','sfplus','vanilla','resource','sink','recipe','logistics','generator','c','g','v','p','s','t','a','o','u'];
const WIRE_DEFAULTS={center:false,title:'',showPpm:false,autoRound:false,unlimited:false,originalIndex:null,originalName:'',inputOrder:[],outputOrder:[],visualMax:'',parent:null,clock:100,fromPort:0,toPort:0,waypoints:[]};
// Wire constants are part of v2: keep existing positions and defaults unchanged.
// Column tables omit repeated defaults while preserving absent versus explicit fields.
// IDs live inside the link, never in a mutable site-data index.
function compact(graph){
 const strings=new Set(),frequency=new Map();function scan(v){if(typeof v==='string'){frequency.set(v,(frequency.get(v)||0)+1);if(/^(Recipe_|Desc_).+_C$/.test(v))strings.add(v);}else if(v&&typeof v==='object')Object.values(v).forEach(scan);}scan(graph);for(const [s,n]of frequency)if(n>1&&!s.includes('auto-n')&&!s.includes('auto-e')&&!s.includes('auto-target'))strings.add(s);
 const ids=[],lookup=new Map();
 const intern=s=>{if(!lookup.has(s)){lookup.set(s,ids.length);ids.push(s.startsWith('Recipe_')&&s.endsWith('_C')?['r',s.slice(7,-2)]:s.startsWith('Desc_')&&s.endsWith('_C')?['d',s.slice(5,-2)]:s);}return lookup.get(s);};
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
function restore(p){
 if(!Array.isArray(p)||p.length!==4||!Array.isArray(p[0]))throw Error('공유 v2 구조 오류');
 let previous='';const ids=p[0].map(([i,tail])=>{previous=previous.slice(0,i)+tail;const s=JSON.parse(previous);return Array.isArray(s)?(s[0]==='r'?'Recipe_':'Desc_')+s[1]+'_C':s;});
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
function binaryPack(value){
 const bytes=[],utf8=new TextEncoder(),push=n=>bytes.push(n),uint=n=>{do{const b=n%128;n=Math.floor(n/128);push(b+(n?128:0));}while(n);};
 function write(v){if(v===null){push(0);return;}if(v===false||v===true){push(v?2:1);return;}if(typeof v==='number'){
  if(Number.isSafeInteger(v)&&Math.abs(v)<2**51){push(3);uint(v<0?-v*2-1:v*2);}else{push(4);const a=new Uint8Array(8);new DataView(a.buffer).setFloat64(0,v,true);bytes.push(...a);}return;}
  if(typeof v==='string'){const word=WIRE_WORDS.indexOf(v);if(word>=0){push(7);uint(word);return;}push(5);const a=utf8.encode(v);uint(a.length);for(const b of a)push(b);return;}
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
async function encode(graph,base){
 graph=JSON.parse(JSON.stringify(graph));
 if(new TextEncoder().encode(JSON.stringify(graph)).length>MAX_JSON)throw Error('공유 데이터 2MB 초과. 파일로 내보내세요.');
 const raw=binaryPack(compact(graph));if(raw.length>MAX_JSON)throw Error('공유 데이터 2MB 초과. 파일로 내보내세요.');let bytes,mode;
 try{new CompressionStream('deflate-raw');new DecompressionStream('deflate-raw');mode='d';}catch{mode='g';}
 bytes=await transform(raw,true,mode==='d'?'deflate-raw':'gzip');let binary='';for(const byte of bytes)binary+=String.fromCharCode(byte);
 const hash='#riri-v2='+mode+btoa(binary).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');const url=base.split('#')[0]+hash;
 if(url.length>MAX_URL)throw Error('공유 주소가 24,000자를 초과합니다. 링크 대신 그래프 파일로 내보내세요.');return url;
}
async function decode(hash){
 if(!/^#riri-v[12]=/.test(hash)||hash.length>MAX_URL)throw Error('지원하지 않는 공유 링크 또는 크기 초과');
 const v2=hash.startsWith('#riri-v2=');let payload=hash.slice(9).split('&')[0],format='gzip';
 if(v2){const mode=payload[0];if(!['d','g'].includes(mode))throw Error('공유 압축 형식 오류');format=mode==='d'?'deflate-raw':'gzip';payload=payload.slice(1);}
 if(!/^[A-Za-z0-9_-]+$/.test(payload))throw Error('공유 링크 인코딩 오류');
 const binary=atob(payload.replaceAll('-','+').replaceAll('_','/')),bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
 const raw=await transform(bytes,false,format),parsed=v2?binaryRead(raw):JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw)),graph=v2?restore(parsed):parsed;
 if(new TextEncoder().encode(JSON.stringify(graph)).length>MAX_JSON)throw Error('공유 그래프 데이터가 2MB를 초과합니다.');return graph;
}
const api={generationSpec,compatibleFuels,generators,cleanGenerator,generation,generatorPorts,decoratePower,candidates,reachable,expand,encode,decode,MAX_URL};
if(typeof module!=='undefined')module.exports=api;else root.GraphFeatures=api;
})(typeof window==='undefined'?globalThis:window);
