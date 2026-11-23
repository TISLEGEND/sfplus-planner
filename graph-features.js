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
function candidates(d,item){return d.recipes.filter(r=>r.products.some(p=>p.item===item&&p.amount>0)&&r.seconds>0&&r.durationVerified!==false&&d.buildings[r.machines[0]]&&!r.modularMiner).sort((a,b)=>Number(!!a.alternate)-Number(!!b.alternate)||a.id.localeCompare(b.id));}
function selected(d,item,choices){const all=candidates(d,item);if(choices[item]&&!all.some(r=>r.id===choices[item]))throw Error('선택한 레시피를 사용할 수 없습니다: '+item);return all.find(r=>r.id===choices[item])||all[0];}
function reachable(d,item,choices={}){const seen=new Set(),rows=[];function walk(id){if(seen.has(id)||d.items[id]?.resource)return;seen.add(id);const options=candidates(d,id),r=selected(d,id,choices);rows.push({item:id,options,recipe:r?.id});r?.ingredients.forEach(p=>walk(p.item));}walk(item);return rows;}
function expand(d,item,amount,choices={},G,E){
 if(!d.items[item]||!Number.isFinite(amount)||amount<=0||amount>1e6)throw Error('목표량은 0 초과 1,000,000 이하로 입력하세요.');
 const nodes=[],edges=[],warnings=[],R=E.R,levels=new Map();
 function edge(from,to,item){edges.push({id:'auto-e'+edges.length,from,to,item});}
 function walk(item,rate,path){
  if(nodes.length>=499||path.length>100)throw Error('자동 전개 크기 제한 (노드 500개 / 깊이 100). 목표나 레시피를 바꾸세요.');
  if(path.includes(item))throw Error('순환 레시피 감지: '+[...path,item].map(i=>d.items[i]?.name||i).join(' → ')+' · 다른 레시피를 선택하세요.');
  const id='auto-n'+nodes.length,n={id,x:0,y:0,clock:100,showPpm:false};nodes.push(n);let level=0;
  if(d.items[item].resource){Object.assign(n,{type:'resource',item,max:+rate,maxExact:rate.toString()});}
  else {
   const r=selected(d,item,choices);if(!r)throw Error('채굴 자원까지 이어지는 검증된 제작 경로 없음: '+d.items[item].name);
   const ports=G.ports({type:'recipe',recipe:r.id,clock:100},d),product=r.products.find(p=>p.item===item),speed=d.buildings[r.machines[0]].speed;
   const perMinute=p=>R.of(p.exact??p.amount).mul(60).div(r.exactSeconds??r.seconds).mul(speed);
   const count=rate.div(perMinute(product));Object.assign(n,{type:'recipe',recipe:r.id,max:+count,maxExact:count.toString()});
   if(r.alternate&&!choices[item])warnings.push(d.items[item].name+': 기본 레시피 없음, 대체 레시피 '+r.name+' 사용');
   for(const p of r.ingredients){const child=walk(p.item,perMinute(p).mul(count),[...path,item]);edge(child.id,id,p.item);level=Math.max(level,levels.get(child.id)+1);}
   if(!ports.valid)throw Error('계산 불가 레시피: '+r.name);
  }
  if(!Number.isFinite(n.max)||n.max>1e6)throw Error('필요량이 노드 상한 1,000,000을 초과합니다.');
  levels.set(id,level);return n;
 }
 const source=walk(item,R.of(amount),[]),sink={id:'auto-target',type:'sink',item,max:amount,clock:100,x:0,y:0,title:d.items[item].name+' · 목표 '+amount+' /분'};nodes.push(sink);levels.set(sink.id,levels.get(source.id)+1);edge(source.id,sink.id,item);
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
 const payload=hash.slice(9);if(!/^[A-Za-z0-9_-]+$/.test(payload))throw Error('공유 링크 인코딩 오류');
 const binary=atob(payload.replaceAll('-','+').replaceAll('_','/')),bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
 return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(await transform(bytes,false)));
}
const api={generationSpec,compatibleFuels,generators,cleanGenerator,generation,generatorPorts,decoratePower,candidates,reachable,expand,encode,decode,MAX_URL};
if(typeof module!=='undefined')module.exports=api;else root.GraphFeatures=api;
})(typeof window==='undefined'?globalThis:window);
