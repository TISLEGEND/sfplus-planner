/* 생산·건설 목록 CSV 출력 (2026-11-25). Excel 한글 깨짐 방지를 위해 UTF-8 BOM을 붙인다. */
(function(root){'use strict';
const finite=n=>typeof n==='number'&&Number.isFinite(n);
const round=(n,dp=4)=>finite(n)?Number(n.toFixed(dp)):'';
function cell(v){if(v===null||v===undefined)return '';if(typeof v==='number')return finite(v)?String(v):'';const s=String(v);return /[",\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}
function toCSV(rows){return '﻿'+rows.map(r=>r.map(cell).join(',')).join('\r\n')+'\r\n';}
function unit(d,id){return /LIQUID|GAS/.test(d.items[id]?.form)?'m³/분':'개/분';}
function ports(list,d,label,key){return (list||[]).map(p=>{const v=p[key]??p.flow??p.amount;return label(p.item)+' '+(finite(v)?round(v,2):'미확인')+' '+unit(d,p.item);}).join(' / ');}
function production({graph:g,data:d,result:r,name,ko}){
 const tr=ko||(x=>x);
 const label=name||(id=>d.items[id]?.name||id),rows=new Map((r?.nodes||[]).map(n=>[n.id,n]));
 const out=[['노드','종류','레시피','기계','설치 대수','가동 대수','클럭 %','입력','출력','전력 MW','비고']];
 const kind={recipe:'생산',resource:'자원 공급',sink:'싱크',generator:'발전',logistics:'물류',missing:'누락'};
 for(const n of g.nodes){const row=rows.get(n.id),ok=row&&row.valid!==false&&!row.unbounded,recipe=d.recipes.find(a=>a.id===n.recipe);
  const machine=n.type==='recipe'?tr(d.buildings[recipe?.machines?.[0]]?.name||recipe?.machines?.[0]||''):n.type==='generator'?tr(d.buildings[n.generator]?.name||n.generator||''):n.type==='sink'?'AWESOME Sink':'';
  const notes=[];if(!row)notes.push('계산 결과 없음');else if(!ok)notes.push('계산 제외 또는 수량 미확인');
  const installed=n.type==='recipe'&&finite(n.max)?Math.ceil(n.max-1e-9):n.type==='generator'&&finite(row?.generatorCount)?Math.ceil(row.generatorCount-1e-9):'';
  const active=ok&&finite(row?.used)&&(n.type==='recipe'||n.type==='generator')?round(row.used,4):'';
  const clock=n.type==='recipe'||n.type==='generator'?round(n.machineClock??n.clock??100,2):'';
  const title=n.title||(n.type==='recipe'?tr(recipe?.name||''):n.item?label(n.item):'')||n.missingName||n.id;
  out.push([title,kind[n.type]||n.type,n.type==='recipe'?tr(recipe?.name||n.recipe||''):'',machine,installed,active,clock,ok?ports(row.input,d,label,'flow'):'',ok?ports(row.output,d,label,'amount'):'',ok&&finite(row?.power)?round(row.power,3):'',notes.join('; ')]);
 }
 return out;
}
function construction(report,name){
 const label=name||(x=>x),out=[['구분','품목·건물','수량','비고']];
 for(const [id,n] of Object.entries(report.totals||{}))out.push(['재료',label(id),round(n,4),'']);
 out.push(['장착품','파워 샤드',finite(report.special?.shards)?report.special.shards:'',finite(report.special?.shards)?'':'미확인']);
 out.push(['장착품','소머슬루프',finite(report.special?.sloops)?report.special.sloops:'',finite(report.special?.sloops)?'':'미확인']);
 for(const b of report.buildings||[])out.push(['건물',label(b.name),b.count,'건물당: '+b.ingredients.map(x=>label(x.item)+' × '+x.amount).join(', ')]);
 for(const u of report.unknown||[])out.push(['비용 미확인',label(u.name),finite(u.count)?u.count:'','건설 비용 데이터 없음']);
 return out;
}
const api={toCSV,production,construction,cell};if(typeof module!=='undefined'){module.exports=api;return;}root.PlanCSV=api;

function download(filename,text){const blob=new Blob([text],{type:'text/csv;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);}
function stamp(){const t=new Date(),p=n=>String(n).padStart(2,'0');return t.getFullYear()+p(t.getMonth()+1)+p(t.getDate())+'_'+p(t.getHours())+p(t.getMinutes());}
function safe(s){return String(s||'sf_plan').replace(/[\\/:*?"<>|\s]+/g,'_').slice(0,60);}
function context(){const R=root.RiriGraph,g=R.get(),d=R.data(),r=R.result(),display=R.display?.()||{nodes:g.nodes,result:r},C=root.RiriConstructionData;
 const name=id=>{const n=d.items[id]?.name||C?.items?.[id]?.name||id;return root.KO_NAMES?.[n]||n;};
 return {g,d,r,display,name,ko:x=>root.KO_NAMES?.[x]||x,title:root.PlanLibrary?.currentName?.(g)};}
function exportProduction(){const {g,d,r,name,ko,title}=context();download(safe(title)+'_생산목록_'+stamp()+'.csv',toCSV(production({graph:g,data:d,result:r,name,ko})));}
function exportConstruction(){const {g,d,display,name,ko,title}=context(),C=root.RiriConstruction;const entries=C.graphEntries({nodes:display.nodes},d,display.result);const report=C.calculate(entries.filter(Boolean),d,g.dataMode);download(safe(title)+'_건설재료_'+stamp()+'.csv',toCSV(construction(report,x=>name(ko(x)))));}
const toolbar=document.getElementById('gToolbar');
for(const [id,text,fn] of [['gCsvProduction','생산 목록 CSV',exportProduction],['gCsvConstruction','건설 재료 CSV',exportConstruction]]){const b=document.createElement('button');b.id=id;b.type='button';b.textContent=text;b.onclick=()=>{try{fn();}catch(e){console.error('[PlanCSV]',e);b.textContent=text+' 실패';setTimeout(()=>b.textContent=text,2500);}};toolbar?.append(b);}
})(typeof window==='undefined'?globalThis:window);
