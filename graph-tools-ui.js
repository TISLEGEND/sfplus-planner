(function(){'use strict';
const R=window.RiriGraph,F=window.GraphFeatures,G=window.SFGraph,E=window.ExactFull,$=id=>document.getElementById(id),panel=$('graphPanel');
const koLabel=n=>{const k=window.KO_NAMES?.[n];return k&&k!==n?n+' · '+k:n;};
function element(tag,text){const e=document.createElement(tag);if(text)e.textContent=text;return e;}
const dialog=element('dialog');dialog.id='gToolsDialog';dialog.setAttribute('aria-label','모델러 도구');panel.append(dialog);
function message(text){$('gStatus').textContent=text;$('gStatus').classList.add('shown');}
function open(title){dialog.replaceChildren();const header=element('div'),heading=element('h2',title),close=element('button','닫기');close.onclick=()=>dialog.close();header.className='g-tools-head';header.append(heading,close);dialog.append(header);dialog.showModal();}
function button(text,fn,parent=dialog){const b=element('button',text);b.type='button';b.onclick=fn;parent.append(b);return b;}
function field(text,input){const label=element('label',text);label.append(input);dialog.append(label);return input;}
function select(options,id){const s=element('select');s.id=id;for(const [value,text]of options){const o=element('option',text);o.value=value;s.append(o);}return s;}
const toolbar=$('gToolbar');function tool(id,text,fn){const b=button(text,fn,toolbar);b.id=id;toolbar.insertBefore(b,$('gTotals'));return b;}
tool('gExpand','거꾸로 자동 전개',()=>{
 open('목표 → 원자재 자동 전개');const d=R.data(),choices={};
 const search=field('목표 검색',Object.assign(element('input'),{type:'search',id:'gAutoSearch',placeholder:'아이템 이름(한글·영어) / 클래스 ID'}));
 const target=field('최종 아이템',select(Object.entries(d.items).filter(([id,i])=>i.resource||F.candidates(d,id).some(r=>!r.ingredients.some(p=>p.item===id))).map(([id,i])=>[id,koLabel(i.name)]),'gAutoTarget'));
 const rate=field('분당 목표량',Object.assign(element('input'),{type:'number',value:'120',min:'0.001',max:'1000000',step:'any',id:'gAutoRate'}));
 dialog.append(element('p','만들 아이템과 분당 개수(액체·기체는 m³)를 정하고 [그래프 생성]을 누르면, 원자재 채굴까지 필요한 기계를 전부 이어서 그려 줍니다. 같은 재료는 노드 하나로 합치고 기본 레시피를 먼저 씁니다. 아래 목록에서 단계별 레시피를 바꿀 수 있어요. 지금 그래프는 새 그래프로 바뀌며 Ctrl+Z로 되돌릴 수 있습니다.'));
 const rows=element('div');rows.id='gAutoRecipes';dialog.append(rows);const error=element('p');error.id='gAutoError';error.setAttribute('role','alert');dialog.append(error);
 function update(){rows.replaceChildren();error.textContent='';try{for(const row of F.reachable(d,target.value,choices)){
  const label=element('label',koLabel(d.items[row.item].name)),s=select(row.options.map(r=>[r.id,(r.alternate?'대체: ':'기본: ')+r.name]),'auto-'+row.item);s.value=row.recipe||'';s.dataset.item=row.item;
  if(!row.options.length){label.append(element('span','검증된 제작 경로 없음'));}else {s.onchange=()=>{choices[row.item]=s.value;update();};label.append(s);}rows.append(label);
 }}catch(e){error.textContent=e.message;}}
 target.onchange=update;search.oninput=()=>{const q=search.value.toLowerCase().replace(/\s+/g,'');for(const o of target.options){const t=(o.text+' '+o.value).toLowerCase().replace(/\s+/g,'');o.hidden=!t.includes(q);}const first=[...target.options].find(o=>!o.hidden);if(first){target.value=first.value;update();}};
 button('그래프 생성',()=>{try{const graph=F.expand(d,target.value,Number(rate.value),choices,G,E),validated=window.ModelerGraph.validate(graph,d),result=window.ModelerGraph.solve(validated,d),actual=result.nodes.find(n=>n.id==='auto-target').used;
  if(!Number.isFinite(actual)||Math.abs(actual-Number(rate.value))>1e-6*Math.max(1,Number(rate.value)))throw Error('Full 계산이 목표량을 충족하지 못해 생성하지 않았습니다.');
  R.apply(validated);dialog.close();message('자동 전개 완료 · Full 목표 '+actual+' /분'+(graph.warnings.length?' · '+graph.warnings.join(' / '):''));
 }catch(e){error.textContent=e.message;}}).id='gAutoGenerate';update();
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
tool('gShare','링크 복사',async()=>{try{
 const url=await F.encode(R.get(),location.href);
 try{await navigator.clipboard.writeText(url);message('공유 링크를 복사했습니다. '+url.length.toLocaleString()+'자 · 받는 사람에게 같은 로컬 앱/주소가 필요합니다.');}
 catch{open('공유 링크 직접 복사');dialog.append(element('p','브라우저가 클립보드를 허용하지 않아 주소를 선택했습니다. Ctrl+C로 복사하세요.'));const t=element('textarea');t.id='gShareURL';t.value=url;t.readOnly=true;dialog.append(t);t.focus();t.select();}
 }catch(e){message('링크 생성 실패: '+e.message);}});
const shared=tool('gSaveShared','공유본을 이 기기에 저장',()=>{if(R.saveShared()){shared.hidden=true;message('확인 후 이 기기의 작업으로 저장했습니다.');}});shared.hidden=!R.isShared();
let opening=0;
async function openHash(){const ticket=++opening;if(!location.hash.startsWith('#riri-'))return;try{
 message('공유 그래프 읽는 중…');const graph=await F.decode(location.hash);if(ticket!==opening)return;R.loadShared(graph);shared.hidden=false;$('graphTab').click();message('공유본 별도 열기 · 변경 사항은 기존 로컬 작업에 자동 저장하지 않습니다. 저장 버튼에서 덮어쓰기를 확인하세요.');
 }catch(e){message('공유 링크 열기 실패: '+e.message+' · 기존 작업은 유지했습니다.');}}
addEventListener('hashchange',openHash);openHash();
})();
