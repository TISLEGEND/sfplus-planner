/* Snapshot comparison: no network and no mutation until explicit adoption. */
(function(root){'use strict';
const clone=v=>JSON.parse(JSON.stringify(v));
function create(original,d,{M,F,G,E,C}){
 const A=clone(original);let B=clone(A),choices={},changed=false;
 const goals=A.nodes.filter(n=>n.type==='sink').map(n=>({item:n.item,amount:n.max}));
 if(!goals.length)throw Error('비교하려면 분당 목표가 설정된 싱크가 필요합니다.');
 if(A.nodes.some(n=>!['recipe','resource','sink'].includes(n.type)||n.unlimited||n.somersloops||n.sloops||n.physical))throw Error('초기 비교는 고정 목표의 레시피·공급·싱크 비순환 그래프를 지원합니다. 그룹·개별 기계·증폭·무제한 노드는 지원하지 않습니다.');
 const clocks=[...new Set(A.nodes.filter(n=>n.type==='recipe').map(n=>n.clock??100))];
 if(clocks.length>1)throw Error('초기 비교는 생산 기계에 동일한 클럭을 사용해야 합니다.');
 const clock=clocks[0]??100;if(clock<=0)throw Error('가동 클럭은 0보다 커야 합니다.');
 const visiting=new Set(),done=new Set();function visit(id){if(visiting.has(id))throw Error('순환 그래프는 비교할 수 없습니다.');if(done.has(id))return;visiting.add(id);for(const e of A.edges.filter(e=>e.from===id))visit(e.to);visiting.delete(id);done.add(id);}for(const n of A.nodes)visit(n.id);
 for(const n of A.nodes.filter(n=>n.type==='recipe')){
  const r=d.recipes.find(r=>r.id===n.recipe),outputs=[...new Set(A.edges.filter(e=>e.from===n.id).map(e=>e.item))];
  const item=outputs[0]||r.products[0].item;
  if(outputs.length>1)throw Error('여러 부산물을 재사용하는 그래프는 초기 비교 범위 밖입니다.');
  if(choices[item]&&choices[item]!==r.id)throw Error('같은 품목을 서로 다른 레시피로 만드는 그래프는 초기 비교 범위 밖입니다.');
  choices[item]=r.id;
 }
 const supplies=A.nodes.filter(n=>n.type==='resource'&&!d.items[n.item]?.resource).map(n=>({item:n.item,amount:n.max}));
 const targets=g=>{const r=M.solve(M.validate(g,d),d);for(const n of g.nodes.filter(n=>n.type==='sink')){const row=r.nodes.find(r=>r.id===n.id);if(!row?.valid||Math.abs((row.input?.find(p=>p.item===n.item)?.flow??0)-n.max)>1e-6*Math.max(1,n.max))throw Error('목표량을 충족하지 못하는 후보입니다.');}return r;};
 function metrics(g){const r=targets(g),raw={},byproducts={},machines={};const add=(o,k,v)=>o[k]=(o[k]||0)+v;
  for(const n of g.nodes){const row=r.nodes.find(r=>r.id===n.id);if(row?.valid===false||row?.unbounded)throw Error('미확인 계산 노드가 있습니다.');
   if(n.type==='resource')add(raw,n.item,row.output.reduce((s,p)=>s+p.flow,0));
   if(n.type==='recipe'){const recipe=d.recipes.find(a=>a.id===n.recipe);if(!recipe.ingredients.length)for(const p of row.output)add(raw,p.item,p.flow);add(machines,recipe.machines[0],Math.ceil(n.max-1e-9));for(const p of row.output)add(byproducts,p.item,Math.max(0,p.amount-p.flow));}
  }
  const shopping=C.calculate(C.graphEntries(g,d,r),d,g.dataMode||d.mode);return {raw,machines,power:{MW:r.summary.powerUnknown?null:r.summary.power},construction:{...shopping.totals,'파워 샤드':shopping.special.shards,'소머슬루프':shopping.special.sloops},byproducts,warnings:[...(g.warnings||[]),...(r.summary.warnings||[]),...shopping.unknown.map(x=>'건설 비용 미확인: '+x.name)]};
 }
 const ma=metrics(A);
 function rows(){const mb=metrics(B);return {rows:['raw','machines','power','construction','byproducts'].flatMap(section=>[...new Set([...Object.keys(ma[section]),...Object.keys(mb[section])])].sort().map(item=>{const a=ma[section][item]??(Object.hasOwn(ma[section],item)?null:0),b=mb[section][item]??(Object.hasOwn(mb[section],item)?null:0);return {section,item,a,b,delta:!changed?0:a===null||b===null?null:Math.abs(b-a)<1e-8?0:b-a};})),warnings:[...new Set([...ma.warnings,...mb.warnings])],changed};}
 return {a:()=>clone(A),b:()=>clone(B),choices:()=>({...choices}),goals:clone(goals),rows,
 options:()=>{const all=new Map();for(const t of goals)for(const r of F.reachable(d,t.item,choices))all.set(r.item,r);return [...all.values()];},
 change(item,recipe){const next={...choices,[item]:recipe};if(!F.candidates(d,item).some(r=>r.id===recipe))throw Error('미해금 또는 미확인 레시피는 선택할 수 없습니다.');const candidate=F.expandMany(d,goals,next,G,E,supplies);
  if(clock!==100)for(const n of candidate.nodes.filter(n=>n.type==='recipe')){const before=G.ports(n,d).output[0].amount;n.clock=clock;const after=G.ports(n,d).output[0].amount;n.max*=before/after;delete n.maxExact;}
  Object.assign(candidate,{lineStyle:A.lineStyle,expandMachines:A.expandMachines,machineClockMode:A.machineClockMode,planNotes:A.planNotes||'',dataMode:A.dataMode||d.mode});targets(candidate);metrics(candidate);B=clone(candidate);choices=next;changed=true;return rows();}
 };
}
const api={create};if(typeof module!=='undefined'){module.exports=api;return;}root.RecipeCompare=api;
const R=root.RiriGraph,el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;},dialog=el('dialog');dialog.id='gCompareDialog';dialog.setAttribute('aria-label','레시피 대안 A/B 비교');document.getElementById('graphPanel').append(dialog);
const trigger=el('button','레시피 대안 A/B 비교');trigger.id='gRecipeCompare';document.getElementById('gToolbar').append(trigger);
const ko=name=>root.KO_NAMES?.[name]||root.KO_NAMES?.[String(name||'').replace(/^Alternate:\s*/i,'')]||name;
const sections={raw:'원자재·외부 공급 /분',machines:'기계 설치 대수',power:'소비 전력 MW',construction:'건설 재료',byproducts:'부산물 잉여 /분'};
trigger.onclick=()=>{dialog.replaceChildren();let session,error,body,selectors;const d=R.data(),baseline=JSON.stringify(R.get());
 const button=(label,id,fn,parent=content)=>{const b=el('button',label);b.id=id;b.type='button';b.onclick=()=>{try{fn();error.textContent='';}catch(e){error.textContent=e.message;}};parent.append(b);return b;};
 const header=el('header');header.className='g-compare-header';header.append(el('h2','레시피 대안 A/B 비교'));dialog.append(header);button('닫기','gCompareClose',()=>dialog.close(),header);const content=el('div');content.className='g-compare-content';dialog.append(content);error=el('p');error.id='gCompareError';error.setAttribute('role','alert');content.append(error);
 try{session=create(R.get(),d,{M:ModelerGraph,F:GraphFeatures,G:SFGraph,E:ExactFull,C:RiriConstruction});}catch(e){error.textContent=e.message;dialog.showModal();return;}
 content.append(el('p','A는 현재 그래프의 고정 복사본입니다. B의 경로 전체를 같은 목표·클럭·해금 조건에서 재계산합니다. 전역 최적화는 아닙니다. 채택 시 B의 자동 배치로 교체되며 Ctrl+Z로 되돌립니다.'));
 content.append(el('p',session.goals.map(t=>ko(d.items[t.item]?.name||t.item)+' '+Number(t.amount.toFixed(2))+'/분').join(' · ')));
 selectors=el('div');content.append(selectors);body=el('div');body.id='gCompareResults';content.append(body);
 
 const fmt=(n,section='raw')=>{if(n===null)return '미확인';const digits=section==='power'?1:section==='machines'?0:2;const rounded=Number(n.toFixed(digits));return (Object.is(rounded,-0)?0:rounded).toLocaleString('ko-KR',{minimumFractionDigits:section==='power'?1:0,maximumFractionDigits:digits});};
 function render(){selectors.replaceChildren();for(const row of session.options().filter(r=>r.options.length>1)){const label=el('label',ko(d.items[row.item]?.name||row.item)),s=el('select');s.dataset.item=row.item;s.setAttribute('aria-label','B '+(ko(d.items[row.item]?.name||row.item)));for(const r of [...row.options.filter(r=>r.id===(session.choices()[row.item]||row.recipe)),...row.options.filter(r=>r.id!==(session.choices()[row.item]||row.recipe)).slice(0,99)]){const o=el('option',ko(r.name));o.value=r.id;s.append(o);}s.value=session.choices()[row.item]||row.recipe;s.onchange=()=>{try{session.change(row.item,s.value);error.textContent='';render();}catch(e){error.textContent=e.message;s.value=session.choices()[row.item]||row.recipe;}};label.append(s);selectors.append(label);}
  body.replaceChildren();const result=session.rows();for(const [section,title]of Object.entries(sections)){body.append(el('h3',title));const table=el('table'),head=el('tr');for(const text of ['항목','A','B','증감 B−A'])head.append(el('th',text));table.append(head);for(const row of result.rows.filter(r=>r.section===section)){const tr=el('tr');tr.dataset.section=section;tr.dataset.item=row.item;tr.append(el('th',ko(d.items[row.item]?.name||d.buildings[row.item]?.name||row.item)),el('td',fmt(row.a,section)),el('td',fmt(row.b,section)));const delta=el('td',(row.delta>0&&Number(row.delta.toFixed(section==='power'?1:section==='machines'?0:2))>0?'+':'')+fmt(row.delta,section));delta.className=row.delta===null?'unknown':row.delta>0?'increase':row.delta<0?'decrease':'';tr.append(delta);table.append(tr);}body.append(table);}for(const warning of result.warnings)body.append(el('p',warning));if(result.changed){body.append(el('p','B의 전체 제작 경로가 다시 계산되었습니다. 원료 변화에는 다른 단계의 경로 변경 효과도 포함됩니다.'));const a=session.a(),b=session.b(),ids=new Set([...a.nodes,...b.nodes].filter(n=>n.type==='recipe').map(n=>n.recipe));for(const id of ids){const old=a.nodes.filter(n=>n.recipe===id).reduce((v,n)=>v+n.max,0),next=b.nodes.filter(n=>n.recipe===id).reduce((v,n)=>v+n.max,0);if(Math.abs(old-next)>1e-8)body.append(el('p',ko(d.recipes.find(r=>r.id===id)?.name||id)+': '+fmt(Math.ceil(old-1e-9),'machines')+' → '+fmt(Math.ceil(next-1e-9),'machines')+'대'));}}}
 const nameLabel=el('label','보관함 이름'),name=el('input');name.id='gCompareName';name.value='레시피 비교';name.maxLength=96;nameLabel.append(name);content.append(nameLabel);
 const lib=PlanLibrary.create(localStorage,ModelerGraph.validate,mode=>mode==='vanilla'?VANILLA_DATA:SF_DATA.sfplus);
 for(const side of ['A','B'])button(side+' 보관함 저장','gCompareSave'+side,()=>{const g=side==='A'?session.a():session.b();lib.save(name.value+' '+side,g,g.dataMode||d.mode);notice.textContent=side+' 보관함 저장 완료';});
 const notice=el('p');notice.id='gCompareNotice';notice.setAttribute('role','status');content.append(notice);
 const footer=el('footer');footer.className='g-compare-footer';dialog.append(footer);button('B 버리기','gCompareDiscard',()=>dialog.close(),footer);
 button('B 채택','gCompareAdopt',()=>{if(JSON.stringify(R.get())!==baseline)throw Error('비교 중 현재 그래프가 변경되었습니다. 닫고 다시 비교하세요.');ModelerGraph.validate(session.b(),d);R.apply(session.b());dialog.close();},footer);
 render();dialog.showModal();
};
})(typeof window==='undefined'?globalThis:window);
