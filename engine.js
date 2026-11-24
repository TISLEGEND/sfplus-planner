(function(root){
'use strict';
const MM=typeof module!=='undefined'?require('./modular-miner'):root.SFModularMiner;
const U=typeof module!=='undefined'?require('./unlocks'):root.SFUnlocks;
function calculate(data,target,rate,choices={},clock=100){
 const original=data;data=U?.filtered(data)||data;const blockedReasons=new Set();
 if(!Number.isFinite(rate)||rate<=0||rate>1e9)throw Error('생산량은 0 초과 10억 이하로 입력하세요.');
 if(!Number.isFinite(clock)||clock<1||clock>250)throw Error('클럭은 1~250%로 입력하세요.');
 if(!data.items[target])throw Error('알 수 없는 아이템입니다.');
 const raw={},byproducts={},rows=[],warnings=new Set();let power=0,visits=0;
 const index=new Map();for(const r of data.recipes)if(r.machines.length&&(r.seconds>0||r.modularMiner))for(const p of r.products){if(!index.has(p.item))index.set(p.item,[]);index.get(p.item).push(r);}
 const candidates=id=>index.get(id)||[];
 const memo=new Map();
 const penalty=r=>[Number(!!r.alternate||/alternate/i.test(r.name)),Number(r.machines.some(m=>/converter/i.test(m+' '+data.buildings[m]?.name))),Number(!!r.modularMiner)];
 const compare=(a,b)=>{for(let i=0;i<a.length;i++)if(a[i]!==b[i])return a[i]-b[i];return 0;};
 // Estimate per unit of requested output; reject any path that returns to an ancestor.
 function resolve(id,path=[]){
  if(path.includes(id)||path.length>60)return null;
  const available=candidates(id),chosen=choices[id];
  if(U?.get().enabled&&chosen!=='raw'&&!data.items[id]?.resource&&!available.length){const msg=U.missing(original,id);if(msg){blockedReasons.add(msg);return null;}}
  if(chosen==='raw'||(!chosen&&data.items[id]?.resource)||!available.length)return {raw:{[id]:1},deps:new Set([id])};
  const cached=memo.get(id);if(cached&&!path.some(x=>cached.deps.has(x)))return cached;
  const explicit=available.find(r=>r.id===chosen);let best=null,bestScore;
  const ordered=(explicit?[explicit]:available).slice().sort((a,b)=>compare([Number(a.products[0].item!==id),...penalty(a)],[Number(b.products[0].item!==id),...penalty(b)])||a.id.localeCompare(b.id));
  for(const r of ordered){
   const rank=[Number(r.products[0].item!==id),...penalty(r)];
   if(best&&compare(rank,bestScore.slice(0,4))>0)break;
   const output=r.products.find(p=>p.item===id).amount,raw={},deps=new Set([id]);let valid=true;
   for(const p of r.ingredients){const sub=resolve(p.item,[...path,id]);if(!sub){valid=false;break;}for(const d of sub.deps)deps.add(d);for(const [key,n]of Object.entries(sub.raw))raw[key]=(raw[key]||0)+n*p.amount/output;}
   if(!valid)continue;
   const entries=Object.entries(raw),rare=entries.reduce((n,[key,v])=>n+(/sam|callanite|auro v|slug|dark.?matter|uranium/i.test(key+' '+data.items[key]?.name)?v:0),0);
   const score=[...rank,entries.length,rare,entries.reduce((n,[,v])=>n+v,0)];
   if(!best||compare(score,bestScore)<0){best={recipe:r,raw,deps};bestScore=score;}
  }
  if(best)memo.set(id,best);return best;
 }
 function walk(id,amount,path){
  if(++visits>3000)throw Error('계산 트리가 너무 큽니다. 대체 레시피를 바꾸세요.');
  const available=candidates(id), chosen=choices[id];
  if(U?.get().enabled&&!data.items[id]?.resource&&chosen!=='raw'&&!available.length){const msg=U.missing(original,id);if(msg)throw Error(msg);}
  if(chosen==='raw'||(!chosen&&data.items[id]?.resource)||!available.length){if(!available.length&&!data.items[id]?.resource&&data.meta?.calculationEnabled)warnings.add('제작 경로 미확인 · 외부 공급: '+(data.items[id]?.name||id));raw[id]=(raw[id]||0)+amount;return {id,amount,raw:true,children:[]};}
  if(path.includes(id)){warnings.add('순환 레시피: '+id+' — 외부 공급으로 처리');raw[id]=(raw[id]||0)+amount;return {id,amount,raw:true,cycle:true,children:[]};}
  const recipe=available.find(r=>r.id===chosen)||(data.meta?.calculationEnabled||U?.get().enabled?resolve(id,path)?.recipe:available.find(r=>!r.alternate)||available[0]);
  if(!recipe){if(U?.get().enabled&&blockedReasons.size)throw Error([...blockedReasons].join(' / '));warnings.add('순환 없는 제작 경로 없음 · 외부 공급: '+id);raw[id]=(raw[id]||0)+amount;return {id,amount,raw:true,children:[]};}
  if(recipe.modularMiner){const result=MM.evaluate(recipe,choices.modular?.[recipe.id],clock);if(result.valid){const output=result.output.find(p=>p.item===id),count=amount/output.amount,mw=count*result.power;power+=mw;const node={id,amount,recipe:recipe.id,machine:recipe.machines[0],count,power:mw,children:[]};rows.push(node);for(const p of result.output)if(p.item!==id)byproducts[p.item]=(byproducts[p.item]||0)+p.amount*count;for(const p of result.input)node.children.push(walk(p.item,p.amount*count,[...path,id]));warnings.add('모듈형 채굴기: 기본 T'+(recipe.modularMiner.minTier||1)+' / 보통 순도 (설정 없을 때), 전력은 기본 위상 MW, 클럭 상한 100%');return node;}warnings.add(recipe.name+': 채굴기 총산출·변환 수율·최종 전력 미확인, 계산 제외');const node={id,amount,recipe:recipe.id,machine:recipe.machines[0],count:null,power:null,unknown:true,children:[]};rows.push(node);return node;}
  const product=recipe.products.find(p=>p.item===id);if(!(product.amount>0))throw Error('제품 수량 오류');
  const machine=data.buildings[recipe.machines[0]], cycles=amount/product.amount;
  const count=cycles*recipe.seconds/(60*machine.speed*(clock/100));
  let mw=machine.power*Math.pow(clock/100,machine.exponent)*count;
  if(data.meta?.calculationEnabled&&clock!==100&&machine.defaultExponent)warnings.add(machine.name+': 클럭 전력 지수 기본값 사용');
  if(recipe.variablePower){warnings.add(recipe.name+': 가변 전력 제외');mw=0;}
  power+=mw;
  const node={id,amount,recipe:recipe.id,machine:machine.id,count,power:mw,children:[]};rows.push(node);
  for(const p of recipe.products)if(p.item!==id)byproducts[p.item]=(byproducts[p.item]||0)+p.amount*cycles;
  for(const p of recipe.ingredients)node.children.push(walk(p.item,p.amount*cycles,[...path,id]));
  return node;
 }
 const tree=walk(target,rate,[]);return {tree,rows,raw,byproducts,power:rows.some(r=>r.unknown)?null:power,hasUnknown:rows.some(r=>r.unknown),warnings:[...warnings]};
}
function validateMarkers(value){
 if(!value||value.version!==1||!Array.isArray(value.markers)||value.markers.length>2000)throw Error('지원하지 않는 마커 파일입니다.');
 return value.markers.map((m,i)=>{if(!Number.isFinite(m.x)||!Number.isFinite(m.y)||m.x<0||m.x>1||m.y<0||m.y>1||typeof m.name!=='string'||m.name.length>100||typeof m.note!=='string'||m.note.length>2000)throw Error('잘못된 마커: '+(i+1));return {id:'marker-'+i+'-'+Date.now(),x:m.x,y:m.y,name:m.name,note:m.note};});
}
function project(x,y){return {x:(x+324700)/750000,y:(y+375000)/750000};}
const api={calculate,validateMarkers,project};if(typeof module!=='undefined')module.exports=api;else root.SFEngine=api;
})(typeof window==='undefined'?globalThis:window);
