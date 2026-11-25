(function(){'use strict';
const R=window.RiriGraph,F=window.GraphFeatures,G=window.SFGraph,E=window.ExactFull,$=id=>document.getElementById(id),panel=$('graphPanel');
const koLabel=n=>{const k=window.KO_NAMES?.[n];return k&&k!==n?n+' · '+k:n;};
function element(tag,text){const e=document.createElement(tag);if(text)e.textContent=text;return e;}
const dialog=element('dialog');dialog.id='gToolsDialog';dialog.setAttribute('aria-label','모델러 도구');panel.append(dialog);
function message(text){$('gStatus').textContent=text;$('gStatus').classList.add('shown');}
function open(title){dialog.classList.remove("g-auto-dialog");dialog.replaceChildren();const header=element('div'),heading=element('h2',title),close=element('button','닫기');close.onclick=()=>dialog.close();header.className='g-tools-head';header.append(heading,close);dialog.append(header);dialog.showModal();}
function button(text,fn,parent=dialog){const b=element('button',text);b.type='button';b.onclick=fn;parent.append(b);return b;}
function field(text,input){const label=element('label',text);label.append(input);dialog.append(label);return input;}
function select(options,id){const s=element('select');s.id=id;for(const [value,text]of options){const o=element('option',text);o.value=value;s.append(o);}return s;}
const toolbar=$('gToolbar');function tool(id,text,fn){const b=button(text,fn,toolbar);b.id=id;toolbar.insertBefore(b,$('gTotals'));return b;}
tool('gExpand','거꾸로 자동 전개',()=>{
 open('목표 → 원자재 자동 전개');dialog.classList.add('g-auto-dialog');const d=R.data(),choices={};
 const body=element('div');body.className='g-auto-body';dialog.append(body);
 const goals=element('div');goals.id='gAutoGoals';body.append(element('h3','생산 목표'),goals);let serial=0,supplySerial=0;const targets=[],supplies=[];
 const options=Object.entries(d.items).filter(([id,i])=>i.resource||d.recipes.some(r=>r.products.some(p=>p.item===id)&&!r.ingredients.some(p=>p.item===id))).map(([id,i])=>[id,window.KO_NAMES?.[i.name]||i.name]);
 const supplyOptions=Object.entries(d.items).map(([id,i])=>[id,window.KO_NAMES?.[i.name]||i.name]);
 function combo(opts,id,searchId,onchange){
  const wrap=element('div');wrap.className='g-item-combo';const target=select(opts,id);target.className="g-combo-native";target.tabIndex=-1;target.setAttribute("aria-hidden","true");
  const image=element('img');image.alt='';const input=Object.assign(element('input'),{type:'search',id:searchId,placeholder:'품목 검색·선택'});input.setAttribute('role','combobox');input.setAttribute('aria-label','품목 검색·선택');input.setAttribute('aria-autocomplete','list');input.setAttribute('aria-expanded','false');
  const list=element('div');list.className='g-combo-list';list.id=searchId+'-list';list.setAttribute('role','listbox');list.hidden=true;input.setAttribute('aria-controls',list.id);let active=-1;
  function sync(){input.value=opts.find(o=>o[0]===target.value)?.[1]||'';const src=window.SFPLUS_ICONS?.[target.value]?.src;image.hidden=!src;if(src)image.src=src;}
  function close(){list.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');}
  function choose(id){target.value=id;sync();close();onchange();}
  function show(){const q=input.value.toLowerCase().replace(/\s/g,'');const matches=opts.filter(([id,n])=>(id+' '+n+' '+d.items[id].name).toLowerCase().replace(/\s/g,'').includes(q)).slice(0,60);list.replaceChildren();active=-1;for(const [id,n]of matches){const item=element('div',n);item.id=list.id+'-'+list.children.length;item.setAttribute('role','option');item.dataset.item=id;item.onpointerdown=e=>{e.preventDefault();choose(id);};list.append(item);}if(!matches.length)list.append(element('span','일치하는 품목 없음'));list.hidden=false;input.setAttribute('aria-expanded','true');}
  input.onfocus=()=>{input.select();show();};input.oninput=()=>{target.value='';show();onchange();};input.onblur=()=>{close();if(target.value)sync();};input.onkeydown=e=>{const entries=[...list.querySelectorAll('[role=option]')];if(e.key==='Escape'&&!list.hidden){e.preventDefault();e.stopPropagation();close();sync();}if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(list.hidden)show();active=Math.max(0,Math.min(entries.length-1,active+(e.key==='ArrowDown'?1:-1)));entries.forEach((n,i)=>n.setAttribute('aria-selected',String(i===active)));if(entries[active]){input.setAttribute('aria-activedescendant',entries[active].id);entries[active].scrollIntoView({block:'nearest'});}}if(e.key==='Enter'&&entries.length){e.preventDefault();choose(entries[Math.max(0,active)].dataset.item);}};
  target.onchange=()=>{sync();onchange();};wrap.append(image,input,target,list);sync();return {wrap,target,sync};
 }
 function addRow(isSupply=false){
  const index=isSupply?supplySerial++:serial++,prefix=isSupply?'gSupply':'gAuto',suffix=index?'-'+index:'',row=element('div');row.className='g-auto-row';row.setAttribute('aria-label',(isSupply?'기존 공급 ':'목표 ')+(index+1));
  const {wrap,target,sync:syncCombo}=combo(isSupply?supplyOptions:options,prefix+'Target'+suffix,prefix+'Search'+suffix,update);if(!isSupply){const pt=document.getElementById('target')?.value,ok=v=>v&&options.some(o=>o[0]===v)&&!d.items[v]?.resource,pick=ok(pt)?pt:options.find(o=>!d.items[o[0]]?.resource)?.[0];if(pick){target.value=pick;syncCombo();}}const rate=Object.assign(element('input'),{type:'number',value:isSupply?'0':'120',min:isSupply?'0':'0.001',max:'1000000',step:'any',id:prefix+'Rate'+suffix});rate.setAttribute('aria-label',isSupply?'기존 공급량 /분':'분당 목표량');rate.oninput=()=>{error.textContent='';};
  const rateLabel=element('label','/분');rateLabel.className='g-auto-rate';rateLabel.prepend(rate);row.append(wrap,rateLabel);
  const entry={target,rate},entries=isSupply?supplies:targets;entries.push(entry);(isSupply?supplyList:goals).append(row);
  const remove=button('×',()=>{entries.splice(entries.indexOf(entry),1);row.remove();update();},row);remove.setAttribute('aria-label',(isSupply?'기존 공급':'목표')+' 삭제');update();
 }
 button('목표 추가',()=>addRow(),body).id='gAutoAdd';
 const supplyList=element('div');supplyList.id='gSupplyRows';body.append(element('h3','이미 있는 공급'),supplyList);button('공급 추가',()=>addRow(true),body).id='gSupplyAdd';
 body.append(element('p','공급은 합산 수요에서 먼저 차감합니다. 부족분만 새로 생산합니다.'));
 const help=element('details');help.append(element('summary','사용 방법·적용 범위'),element('p','공통 중간재와 중복 품목은 합산합니다. 품목별로 선택한 비순환 레시피 경로에만 적용하며, 자원 상한 최적화·부산물 환류는 지원하지 않습니다. 초과 공급은 사용하지 않고 경고합니다. 액체·기체 단위는 m³/분입니다. 기존 그래프 아래에 추가하며 Ctrl+Z로 취소합니다.'));body.append(help);
 const recipeDetails=element('details');recipeDetails.append(element('summary','단계별 레시피 변경'));const rows=element('div');rows.id='gAutoRecipes';recipeDetails.append(rows);body.append(recipeDetails);const error=element('p');error.id='gAutoError';error.setAttribute('role','alert');body.append(error);
 const footer=element('div');footer.className='g-auto-footer';dialog.append(footer);
 function update(){rows.replaceChildren();error.textContent='';try{const seen=new Set();for(const {target}of targets)for(const row of F.reachable(d,target.value,choices)){if(seen.has(row.item))continue;seen.add(row.item);
  const label=element('label',koLabel(d.items[row.item].name)),s=select(row.options.map(r=>[r.id,(r.alternate?'대체: ':'기본: ')+r.name]),'auto-'+row.item);s.value=row.recipe||'';s.dataset.item=row.item;
  if(!row.options.length){label.append(element('span',window.SFUnlocks?.missing(d,row.item)||'검증된 제작 경로 없음'));}else {s.onchange=()=>{choices[row.item]=s.value;update();};label.append(s);}rows.append(label);
 }}catch(e){error.textContent=e.message;}}
 button('그래프 생성',()=>{try{const graph=F.expandMany(d,targets.map(t=>({item:t.target.value,amount:Number(t.rate.value)})),choices,G,E,supplies.map(t=>({item:t.target.value,amount:Number(t.rate.value)}))),validated=window.ModelerGraph.validate(graph,d),result=window.ModelerGraph.solve(validated,d);
  const sinks=validated.nodes.filter(n=>n.type==='sink');
  for(const sink of sinks){const actual=result.nodes.find(n=>n.id===sink.id)?.used;if(!Number.isFinite(actual)||Math.abs(actual-sink.max)>1e-6*Math.max(1,sink.max))throw Error('Full 계산이 목표량을 충족하지 못해 생성하지 않았습니다: '+d.items[sink.item].name);}
  const actual=sinks.map(n=>n.max).join(' + ');
  const cur=R.get(),tag='auto'+Date.now().toString(36)+'-',ren=id=>tag+id,group=cur.activeGroup||null,existing=(cur.nodes||[]).filter(n=>(n.parent||null)===group);
  const baseY=existing.length?Math.max(...existing.map(n=>n.y))+400:0,baseX=existing.length?Math.min(...existing.map(n=>n.x)):0;
  for(const n of validated.nodes){n.id=ren(n.id);n.x+=baseX;n.y+=baseY;n.parent=group;}for(const e of validated.edges){e.id=ren(e.id);e.from=ren(e.from);e.to=ren(e.to);}
  cur.warnings=[...(cur.warnings||[]),...graph.warnings];cur.solver='Full';cur.nodes=[...(cur.nodes||[]),...validated.nodes];cur.edges=[...(cur.edges||[]),...validated.edges];R.apply(window.ModelerGraph.validate(cur,d));dialog.close();message('자동 전개 완료(기존 그래프 아래에 추가, Ctrl+Z로 취소) · Full 목표 '+actual+' /분'+(graph.warnings.length?' · '+graph.warnings.join(' / '):''));
 }catch(e){error.textContent=e.message;}},footer).id='gAutoGenerate';addRow();
});
function openGenerator(preset){
 open('발전기 추가');const d=R.data(),building=field('발전기 건물',select(F.generators(d).map(b=>[b.id,koLabel(b.name)]),'gGeneratorBuilding'));
 const allFuel=Object.entries(d.items).filter(([id,i])=>i.name&&i.form!=='RF_INVALID').map(([id,i])=>[id,koLabel(i.name)]);
 const fuelSelect=select(allFuel,'gGeneratorFuel'),fuel=field('연료 아이템',fuelSelect),fuelLabel=fuel.closest?.('label')||fuel.parentElement;
 const syncFuel=()=>{const ok=F.compatibleFuels(d.buildings[building.value],d);const list=ok?ok.map(id=>[id,koLabel(d.items[id].name)]):allFuel;const prev=fuelSelect.value;fuelSelect.replaceChildren(...list.map(([v,t])=>Object.assign(element('option'),{value:v,textContent:t})));if(list.some(([v])=>v===prev))fuelSelect.value=prev;fuelNote.textContent=ok?'게임 파일에서 확인한 호환 연료만 표시합니다.':'이 발전기는 고정 발전량·연료 자료가 없어(지열 등) 발전량이 미확인으로 표시됩니다.';};
 const fuelNote=element('p');if(preset&&[...building.options].some(o=>o.value===preset))building.value=preset;building.addEventListener('change',syncFuel);
 const rate=field('연료 유량 /분',Object.assign(element('input'),{type:'number',value:'60',min:'0',max:'1000000',step:'any',id:'gGeneratorRate'}));
 const clock=field('클럭 %',Object.assign(element('input'),{type:'number',value:'100',min:'1',max:'250',id:'gGeneratorClockInput'}));
 dialog.append(fuelNote);syncFuel();
 const error=element('p');error.setAttribute('role','alert');dialog.append(error);
 button('발전 노드 추가',()=>{try{const n={id:crypto.randomUUID(),type:'generator',generator:building.value,item:fuel.value,max:Number(rate.value),clock:Number(clock.value),x:0,y:0};const graph=R.get();n.y=graph.nodes.length?Math.max(...graph.nodes.map(n=>n.y))+280:80;n.parent=graph.activeGroup||null;graph.nodes.push(n);window.ModelerGraph.validate(graph,d);R.apply(graph);dialog.close();message(F.generation(n,d).valid?'발전 노드 추가':'발전 노드 추가 · 이 발전기는 발전량 자료가 없어 전력 수지 미확인');}catch(e){error.textContent=e.message;}}).id='gGeneratorCreate';
}
tool('gGenerator','발전 노드',()=>openGenerator());
window.GraphTools={...(window.GraphTools||{}),openGenerator:id=>{openGenerator(id);}};
tool('gShare','링크 복사',()=>{
 open('공유 링크');dialog.append(element('p','전달 시점의 스냅샷입니다. 메모는 기본적으로 공유하지 않습니다.'));
 const label=element('label','메모 포함 '),include=element('input');include.type='checkbox';include.id='gShareNotes';label.prepend(include);dialog.append(label);
 const error=element('p');error.setAttribute('role','status');dialog.append(error);
 let revision=0;include.onchange=()=>{revision++;$('gShareURL')?.remove();error.textContent='선택이 바뀌었습니다. 링크를 다시 만드세요.';};
 button('링크 만들기 · 복사',async()=>{const ticket=++revision;$('gShareURL')?.remove();try{
 const url=await F.encode(R.get(),location.href,{includeNotes:include.checked});if(ticket!==revision)return;
 let t=$('gShareURL');if(!t){t=element('textarea');t.id='gShareURL';t.readOnly=true;t.setAttribute('aria-label','공유 링크');dialog.append(t);}t.value=url;
 try{await navigator.clipboard.writeText(url);error.textContent='공유 링크를 복사했습니다. '+url.length+'자';}
 catch{error.textContent='선택된 주소를 Ctrl+C 또는 길게 눌러 직접 복사하세요. '+url.length+'자';t.focus();t.select();}
 }catch(e){error.textContent='링크 생성 실패: '+e.message;}}).id='gShareCreate';
});
const shared=tool('gSaveShared','공유본을 이 기기에 저장',()=>{open('현재 작업 덮어쓰기 확인');dialog.append(element('p','현재 열린 그래프로 이 기기의 기존 작업을 덮어쓸까요? 보존하려면 취소 후 보관함에 새 계획으로 저장하세요.'));button('취소',()=>dialog.close());button('덮어쓰기 저장',()=>{if(R.saveShared()){shared.hidden=true;dialog.close();message('확인 후 이 기기의 작업으로 저장했습니다.');}});});shared.hidden=!R.isShared();
let opening=0;
async function openHash(){const ticket=++opening;if(!location.hash.startsWith('#riri-')||new URLSearchParams(location.hash.slice(1)).get('view')==='layout')return;try{
 message('공유 그래프 읽는 중…');const graph=await F.decode(location.hash);if(ticket!==opening)return;R.loadShared(graph);shared.hidden=false;$('graphTab').click();if(graph.shareAutoFit===true)R.fit({all:true});message('공유본 별도 열기 · 변경 사항은 기존 로컬 작업에 자동 저장하지 않습니다. 저장 버튼에서 덮어쓰기를 확인하세요.');
 }catch(e){message('공유 링크 열기 실패: '+e.message+' · 기존 작업은 유지했습니다.');}}
addEventListener('hashchange',openHash);openHash();
})();
