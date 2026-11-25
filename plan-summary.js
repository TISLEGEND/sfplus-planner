(function(root){'use strict';
const finite=n=>typeof n==='number'&&Number.isFinite(n);
const num=(n,dp=2)=>finite(n)?Number(n.toFixed(dp)).toLocaleString('ko-KR',{maximumFractionDigits:dp}):'미확인',mw=n=>num(n,1);
function extractor(n,d){
 const machine=n.extractor||(/water/i.test(n.item)?'Build_WaterPump_C':/oil/i.test(n.item)?'Build_OilPump_C':'Build_MinerMk1_C');
 const rate=n.extractionRate>0?n.extractionRate:/water|oil/i.test(n.item)?120:/LIQUID|GAS/.test(d.items[n.item]?.form)?60:60;
 return {machine,count:n.physical?n.max/(rate*n.clock/100):n.max>0?1:0,clock:n.machineClock??n.clock};
}
function format({graph:g,data:d,result:r,display,shopping,title,unlocks,transport=[],url,name}){
 const label=name||((id)=>d.items[id]?.name||id),s=(display?.result||r)?.summary||{},rows=new Map((r?.nodes||[]).map(n=>[n.id,n])),lines=[],warnings=[...(g.warnings||[]),...(r?.summary?.warnings||[]),...(s.warnings||[])];
 const clean=v=>String(v).replace(/[\r\n]+/g,' ').replace(/`/g,'ˋ'),rate=(id,n)=>num(n)+(finite(n)?(/LIQUID|GAS/.test(d.items[id]?.form)?' m³/분':' 개/분'):''),add=(id,n,map)=>{map.set(id,map.has(id)&&finite(map.get(id))&&finite(n)?map.get(id)+n:map.has(id)?null:n);};
 lines.push('【'+clean(title||'친구에게 보낼 생산 계획')+'】','계산 방식: '+(g.solver==='Nominal'?'Nominal · 각자 설정량 (연결 유량과 다름)':g.solver==='Full'?'Full · 연결 제약 정상상태':g.solver==='Sink'?'Sink · 싱크 기준':'미확인'),'데이터 모드: '+(g.dataMode==='vanilla'?'원판':g.dataMode==='sfplus'?'SF+ · 에셋 검증 부분 범위':'미확인'));
 const counts={'미착수':0,'건설 중':0,'완료':0};for(const n of g.nodes)if(n.type!=='group')counts[n.constructionNotes?.status||'미착수']++;lines.push('시공 상태: '+Object.entries(counts).map(([k,v])=>k+' '+v+'개').join(' · '));
 const finals=new Map(),byproducts=new Map(),supplies=new Map();
 for(const n of g.nodes){const row=rows.get(n.id),valid=row&&row.valid!==false&&!row.unbounded;
  if(n.type==='resource'){const p=row?.output?.find(p=>p.item===n.item);supplies.set(n.id,'• '+clean(label(n.item))+': 설정 상한 '+(n.unlimited?'무제한':rate(n.item,n.max))+' / 연결 '+rate(n.item,valid?p?.flow:null));}
  if(n.type==='sink'){const ps=row?.input||[];if(!ps.length)add(n.item,null,finals);for(const p of ps)add(p.item,valid?p.flow:null,finals);}
  if(n.type==='recipe')for(const p of row?.output||[]){if(!g.edges.some(e=>e.from===n.id&&e.item===p.item))add(p.item,valid?p.amount:null,byproducts);}
  if(!row&&n.type==='recipe'){for(const p of d.recipes.find(a=>a.id===n.recipe)?.products||[])if(!g.edges.some(e=>e.from===n.id&&e.item===p.item))add(p.item,null,byproducts);}
  if(n.type==='missing'||row?.valid===false||row?.unbounded)warnings.push((n.title||n.missingName||n.id)+': 계산 제외 또는 수량 미확인');
 }
 if(!finals.size&&byproducts.size){for(const [id,n]of byproducts)finals.set(id,n);byproducts.clear();}
 lines.push('','최종 생산 (목표·싱크로 나가는 양)',...([...finals].map(([id,n])=>'• '+clean(label(id))+': '+rate(id,n))));if(!finals.size)lines.push('• 최종 생산 품목 미지정');
 if(byproducts.size)lines.push('','부산물·처리 필요 (연결 안 된 출력)',...([...byproducts].map(([id,n])=>'• '+clean(label(id))+': '+rate(id,n))));
 lines.push('','외부 공급',...supplies.values());if(!supplies.size)lines.push('• 없음');
 lines.push('','기계 설치 / 가동 (부분 가동은 1대; 공급은 기본 추출기 가정)');
 const dr=new Map((display?.result?.nodes||r?.nodes||[]).map(n=>[n.id,n]));
 const machines=(display?.nodes||g.nodes).filter(n=>(['recipe','generator'].includes(n.type)||(n.type==='resource'&&n.machineClock!==undefined)));
 const groups=new Map();
 for(const n of machines){const row=dr.get(n.id),recipe=d.recipes.find(a=>a.id===n.recipe),id=n.type==='resource'?extractor(n,d).machine:n.generator||recipe?.machines?.[0],key=d.buildings[id]?.name||id||n.recipe,known=row&&row.valid!==false&&!row.unbounded;
  const installed=n.type==='resource'?Math.ceil(extractor(n,d).count-1e-9):n.type==='generator'?finite(row?.generatorCount)?Math.ceil(row.generatorCount-1e-9):null:n.machineClock!==undefined?finite(n.max)?Math.ceil(n.max-1e-9):null:finite(n.max)?Math.ceil(n.max-1e-9):null;
  const active=n.type==='generator'?finite(row?.generatorCount)?Math.ceil(row.generatorCount-1e-9):null:finite(row?.used)?(n.machineClock!==undefined?(row.used>0&&n.machineClock>0?installed:0):Math.min(installed,Math.ceil(row.used-1e-9))):null;
  const a=groups.get(key)||{installed:0,active:0};for(const [k,v]of Object.entries({installed,active})){a[k]=finite(a[k])&&finite(v)&&known?a[k]+v:null;}groups.set(key,a);
 }
 for(const [key,a]of groups)lines.push('• '+clean(label(key))+': 설치 '+num(a.installed)+'대 / 가동 '+num(a.active)+'대');if(!groups.size)lines.push('• 없음');
 const power=s.powerUnknown||g.nodes.some(n=>n.type==='missing'||n.type==='recipe'&&(!rows.get(n.id)||rows.get(n.id).valid===false||rows.get(n.id).unbounded))?null:s.power,generated=g.nodes.some(n=>n.type==='generator'&&(!rows.get(n.id)||rows.get(n.id).valid===false||rows.get(n.id).generationKnown===false))?null:s.generatedPower,net=finite(power)&&finite(generated)?generated-power:null;
 lines.push('','전력','• 소비: '+mw(power)+(finite(power)?' MW':''),'• 발전: '+mw(generated)+(finite(generated)?' MW':''),'• 수지 (발전 − 소비): '+mw(net)+(finite(net)?' MW':''));
 lines.push('','장보기 요약 (건물·장착품; 벨트·파이프 길이 제외)');
 if(shopping){for(const [id,n]of Object.entries(shopping.totals))lines.push('• '+clean(label(id))+' × '+num(n));lines.push('• 파워샤드 × '+num(shopping.special?.shards),'• 소머슬루프 × '+num(shopping.special?.sloops));for(const u of shopping.unknown||[])warnings.push('건설 비용 미확인: '+u.name+' (대수 '+num(u.count)+')');}else lines.push('• 장보기 미확인');
 lines.push('','해금·운송 조건','• 해금 제한: '+(unlocks?unlocks.enabled?'사용 · '+clean(unlocks.profile?.source||'해금 프로필 미확인'):'사용 안 함 (해금 보장 안 함)':'미확인'));
 for(const t of transport)lines.push('• '+clean(t));if(!transport.length)lines.push('• 벨트·파이프 티어/용량 미확인');
 lines.push('• 받는 사람의 해금·운송 설정은 자동 일치하지 않습니다.');
 if(!finite(power))warnings.push('소비 전력 미확인');if(!finite(generated))warnings.push('발전량 미확인');
 if(g.dataMode==='sfplus')warnings.push('SF+ 부분 데이터: 런타임 삭제·일부 기본값·해금 조건 미확인');
 lines.push('','주의·미확인',...[...new Set(warnings)].map(w=>'• '+clean(w)));if(!warnings.length)lines.push('• 현재 계산에서 보고된 경고 없음');
 if(url)lines.push('','공유 URL (같은 앱/주소 필요)',url);
 return lines.join('\n');
}
const api={format};if(typeof module!=='undefined'){module.exports=api;return;}root.PlanSummary=api;
const R=root.RiriGraph,el=(tag,text)=>{const e=document.createElement(tag);if(text)e.textContent=text;return e;},dialog=el('dialog');dialog.id='gPlanSummaryPanel';dialog.setAttribute('aria-labelledby','gPlanSummaryTitle');document.getElementById('graphPanel').append(dialog);
const trigger=el('button','친구에게 보낼 계획 요약');trigger.id='gPlanSummary';trigger.type='button';document.getElementById('gToolbar').append(trigger);
trigger.onclick=()=>{
 dialog.replaceChildren();const heading=el('h2','계획 요약 미리보기');heading.id='gPlanSummaryTitle';const close=el('button','닫기');close.onclick=()=>dialog.close();dialog.append(heading,close);
 const g=R.get(),d=R.data(),r=R.result(),display=R.display(),name=id=>{const n=d.items[id]?.name||root.RiriConstructionData?.items[id]?.name||id;return root.KO_NAMES?.[n]||n;};
 const u=root.SFUnlocks?.get(),transport=['belt','pipe'].map(kind=>{const t=root.SFUnlocks?.tier(g.dataMode,kind);return (kind==='belt'?'벨트':'파이프')+': '+(t?t.name+' · '+num(t.capacity)+(kind==='belt'?' 개/분':' m³/분'):'미확인');});
 // The same physical nodes/clocks used by the graph display drive shopping totals.
 const entries=root.RiriConstruction.graphEntries({nodes:display.nodes},d,display.result);for(const n of display.nodes.filter(n=>n.type==='resource'&&n.machineClock!==undefined))entries.push(extractor(n,d));const shopping=root.RiriConstruction.calculate(entries.filter(Boolean),d,g.dataMode);if(entries.some(e=>e&&!finite(e.count))){shopping.special.shards=null;shopping.special.sloops=null;}
 for(const e of r.edges||[]){const c=root.SFUnlocks?.capacity(d,e.item,e.flow,g.dataMode);if(c?.over)transport.push(name(e.item)+': '+num(e.flow)+(/LIQUID|GAS/.test(d.items[e.item]?.form)?' m³/분':' 개/분')+' · '+c.label);}
 const args={graph:g,data:d,result:r,display,shopping,title:root.PlanLibrary.currentName?.(g),unlocks:u,transport,name};
 const label=el('label','공유 URL 선택 첨부 '),include=el('input');include.type='checkbox';include.id='gPlanSummaryURL';label.prepend(include);dialog.append(label);
 const text=el('textarea');text.id='gPlanSummaryText';text.readOnly=true;text.setAttribute('aria-label','친구에게 보낼 계획 요약 전문');const status=el('p');status.id='gPlanSummaryStatus';status.setAttribute('role','status');const copy=el('button','요약 복사');copy.id='gPlanSummaryCopy';dialog.append(text,copy,status);
 let revision=0;const render=async()=>{const ticket=++revision;copy.disabled=true;status.textContent='';let url;try{if(include.checked)url=await root.GraphFeatures.encode(g,location.href);}catch(e){if(ticket===revision)status.textContent='공유 URL 생성 실패: '+e.message;}if(ticket!==revision)return;text.value=format({...args,url});copy.disabled=false;};include.onchange=render;render();
 copy.onclick=async()=>{try{await navigator.clipboard.writeText(text.value);status.textContent='복사 완료 · 디스코드에 붙여넣으세요.';}catch{text.focus();text.select();status.textContent='클립보드가 거부되었습니다. 선택된 텍스트를 Ctrl+C 또는 길게 눌러 직접 복사하세요.';}};
 dialog.showModal();
};
})(typeof window==='undefined'?globalThis:window);
