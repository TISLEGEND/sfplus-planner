(function(root){'use strict';
const C=typeof module!=='undefined'?require('./data/construction-data'):root.RiriConstructionData;
const key=s=>String(s).replace(/^(BuildDesc_|Build_|Desc_)/,'').replace(/_C$/,'').replace(/[^a-z0-9]/gi,'').toLowerCase();
function calculate(entries,d,mode='sfplus',transport=[]){
 const totals={},buildings=[],unknown=[],special={shards:0,sloops:0};
 for(const e of entries){const count=Number.isFinite(e.count)?Math.max(0,Math.ceil(e.count-1e-9)):null,b=d.buildings[e.machine],title=e.name||b?.name||e.machine,cost=C[mode]?.[key(e.machine)]||C[mode]?.[key(title)];
 if(count!==null){special.shards+=count*Math.max(0,Math.ceil(((e.clock||100)-100)/50-1e-9));special.sloops+=count*Math.max(0,(e.somersloops??e.sloops) || 0);}
 if(count===null||!cost){unknown.push({name:title,count});continue;}
 const ingredients=cost.ingredients.map(x=>({...x,item:mode==='vanilla'&&!d.items[x.item]&&d.items[C.items[x.item]?.name]?C.items[x.item].name:x.item}));buildings.push({name:title,count,ingredients,recipe:cost.recipe});for(const x of ingredients)totals[x.item]=(totals[x.item]||0)+x.amount*count;

 }
 for(const t of transport){const cost=C[mode]?.[key(t.machine)];if(!cost){unknown.push({name:t.machine+' · '+t.meters.toFixed(1)+'m',count:null});continue;}const units=Math.ceil(t.meters/2);buildings.push({name:t.machine+' · 길이 기반 추정 '+t.meters.toFixed(1)+'m (2m 단위 올림)',count:units,ingredients:cost.ingredients});for(const x of cost.ingredients){const id=mode==='vanilla'&&d.items[C.items[x.item]?.name]?C.items[x.item].name:x.item;totals[id]=(totals[id]||0)+x.amount*units;}}
 return {totals,buildings,unknown,special};
}
function graphEntries(g,d,result){return g.nodes.flatMap(n=>{if(n.type==='resource')return [];if(n.type==='sink')return [{machine:'Build_ResourceSink_C',name:'AWESOME Sink',count:1}];if(n.type==='logistics'){const L=typeof module!=='undefined'?require('./logistics'):root.SFLogistics,s=L.spec(n);return [{machine:s?.icon||n.logistics,name:s?.ko,count:1}];}if(n.type==='generator')return [{machine:n.generator,count:result?.nodes.find(r=>r.id===n.id)?.generatorCount??null,clock:n.clock}];return [{machine:d.recipes.find(r=>r.id===n.recipe)?.machines[0]||n.recipe,count:n.max,clock:n.clock,somersloops:n.somersloops??n.sloops}];});}
function format(r,name=x=>x){return ['건설 재료 장보기',...Object.entries(r.totals).map(([id,n])=>`• ${name(id)} × ${n}`),`• 파워 샤드 × ${r.special.shards}`,`• 소머슬루프 × ${r.special.sloops}`, ...(r.buildings.some(b=>b.name.includes('길이 기반'))?['벨트·파이프: 도면 길이 기반 추정 (12px=1m, 2m 단위 올림)']:[]),...r.unknown.map(x=>`• 비용 미확인: ${x.name} (${x.count??'대수 미확인'})`)].join('\n');}
const api={calculate,graphEntries,format};if(typeof module!=='undefined'){module.exports=api;return;}root.RiriConstruction=api;
const dialog=document.createElement('dialog');dialog.id='constructionDialog';document.body.append(dialog);
const css=document.createElement('style');css.textContent='#constructionDialog{box-sizing:border-box;width:min(680px,95vw);max-height:88vh;overflow:auto;background:#172329;color:#eef4ee;border:1px solid #658077;border-radius:12px;padding:18px}#constructionDialog::backdrop{background:#0009}#constructionDialog img{width:28px;height:28px;object-fit:contain;vertical-align:middle;margin-right:8px}#constructionDialog p{overflow-wrap:anywhere}#constructionDialog .cmrow{display:flex;align-items:center;gap:6px;padding:5px 0}#constructionDialog .cmrow span{flex:1;min-width:0;overflow-wrap:anywhere}#constructionDialog select{max-width:140px}#constructionDialog button{margin:4px}';document.head.append(css);
function open(layoutMode){
 dialog.replaceChildren();const add=(tag,text,parent=dialog)=>{const e=document.createElement(tag);e.textContent=text;parent.append(e);return e;};add('h2','건설 재료');add('button','닫기').onclick=()=>dialog.close();const copy=add('button','텍스트 복사');let report;
 const options=add('div','');let include,belt,pipe;if(layoutMode){include=add('input','',options);include.type='checkbox';add('span','벨트·파이프 재료 포함 (길이 기반 추정)',options);belt=add('select','',options);for(let i=1;i<=6;i++){const o=add('option','벨트 Mk.'+i,belt);o.value='ConveyorBeltMk'+i;}pipe=add('select','',options);for(let i=1;i<=2;i++){const o=add('option','파이프 Mk.'+i,pipe);o.value=i===1?'Pipeline':'PipelineMK2';}}
 const body=add('div','');const d=layoutMode?root.RiriAutolayout.plan()?.data:root.RiriGraph.data(),mode=layoutMode?root.RiriAutolayout.plan()?.dataMode:root.RiriGraph.get().dataMode;
 const name=id=>{const n=d?.items[id]?.name||C.items[id]?.name||id;return root.KO_NAMES?.[n]||n;};
 function render(){body.replaceChildren();if(!d){add('p','현재 배치가 없습니다.',body);return;}let entries,transport=[];
 if(layoutMode){const l=root.RiriAutolayout.get();if(!l){add('p','현재 배치가 없습니다.',body);return;}entries=l.groups.map(g=>g.graphNode?graphEntries({nodes:[g.graphNode]},d,root.RiriGraph.result())[0]:{machine:g.machine,count:g.installed,clock:g.utilization});
 // Count visible junction symbols exactly, including those synthesized by the layout renderer.
 const junctions=document.querySelectorAll('#alWorld .al-junction');for(const j of junctions){const title=j.querySelector('title')?.textContent||'';entries.push({machine:/파이프/.test(title)?'PipelineJunction_Cross':/머저/.test(title)?'ConveyorAttachmentMerger':'ConveyorAttachmentSplitter',count:1});}
 if(include.checked){const meters={belt:0,pipe:0};for(const track of document.querySelectorAll('#alWorld .al-track'))meters[track.classList.contains('al-pipe')?'pipe':'belt']+=track.getTotalLength()/12;transport=[{machine:belt.value,meters:meters.belt},{machine:pipe.value,meters:meters.pipe}].filter(x=>x.meters>0);add('p','도면 12px = 1m 환산 · 2m 단위 올림 추정. 실제 시공 길이·지지대는 다를 수 있습니다.',body);}
 }else entries=graphEntries(root.RiriGraph.get(),d,root.RiriGraph.result());
 report=calculate(entries.filter(Boolean),d,mode,transport);add('p','생산 건물은 설정 대수를 올림합니다. 자원 입구는 건물로 계산하지 않습니다.',body);
 for(const [id,n] of Object.entries(report.totals).sort((a,b)=>name(a[0]).localeCompare(name(b[0]),'ko'))){const row=add('div','',body);row.className='cmrow';const src=root.SFPLUS_ICONS?.[id]?.src||root.MODELER_ASSETS?.icons?.[root.ModelerGraph.norm(d.items[id]?.name||C.items[id]?.name||id)];if(src){const img=document.createElement('img');img.src=src;img.alt='';row.append(img);}add('span',name(id),row);add('b',n.toLocaleString('ko-KR'),row);}
 add('p','파워 샤드 × '+report.special.shards,body);add('p','소머슬루프 × '+report.special.sloops+' (기계당 장착 수 × 올림한 기계 대수)',body);
 for(const b of report.buildings){const det=add('details','',body);add('summary',(root.KO_NAMES?.[b.name]||b.name)+' × '+b.count,det);add('p','건물당: '+b.ingredients.map(x=>name(x.item)+' × '+x.amount).join(', '),det);}
 if(report.unknown.length){add('h3','비용 미확인',body);for(const u of report.unknown)add('p',u.name+' × '+(u.count??'대수 미확인'),body);}
 }
 copy.onclick=async()=>{if(!report)return;const text=format(report,name);try{await navigator.clipboard.writeText(text);copy.textContent='복사 완료';}catch{const t=add('textarea',text);t.value=text;t.select();document.execCommand('copy');copy.textContent='복사 완료';}};
 if(layoutMode)for(const x of [include,belt,pipe])x.onchange=render;render();dialog.showModal();
}
for(const [id,layout] of [['gToolbar',false],['alToolbar',true]]){const b=document.createElement('button');b.id=layout?'alConstruction':'gConstruction';b.textContent='건설 재료';b.onclick=()=>open(layout);document.getElementById(id)?.append(b);}
})(typeof window==='undefined'?globalThis:window);
