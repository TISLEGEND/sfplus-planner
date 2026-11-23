(function(){'use strict';
// 딱 떨어짐 계산기: 현재 그래프를 목표량 기준으로 비례 확대/축소했을 때 기계 수가 정수가 되는 목표량을 찾는다.
const R=window.RiriGraph,$=id=>document.getElementById(id),panel=$('graphPanel');
if(!R||!panel||!$('gToolbar'))return;
const koLabel=n=>{const k=window.KO_NAMES?.[n];return k&&k!==n?n+' · '+k:n;};
const abs=a=>a<0n?-a:a,gcd=(a,b)=>{a=abs(a);b=abs(b);while(b){[a,b]=[b,a%b];}return a;},lcm=(a,b)=>a===0n||b===0n?0n:abs(a/gcd(a,b)*b);
function Q(n,d=1n){if(d<0n){n=-n;d=-d;}const g=gcd(n,d)||1n;return {n:n/g,d:d/g};}
function parse(v){
 if(v&&typeof v==='object'&&'n'in v)return v;
 const s=String(v??'0').trim();
 if(s.includes('/')){const [a,b]=s.split('/');return Q(parse(a).n*parse(b).d,parse(a).d*parse(b).n);}
 const m=s.match(/^(-?)(\d*)(?:\.(\d+))?(?:e([+-]?\d+))?$/i);if(!m)return Q(0n);
 let n=BigInt((m[2]||'0')+(m[3]||'')),d=10n**BigInt((m[3]||'').length);const e=Number(m[4]||0);
 if(e>0)n*=10n**BigInt(e);else if(e<0)d*=10n**BigInt(-e);return Q(m[1]?-n:n,d);
}
const mul=(a,b)=>Q(a.n*b.n,a.d*b.d),div=(a,b)=>Q(a.n*b.d,a.d*b.n),isInt=a=>a.d===1n,str=a=>a.d===1n?String(a.n):a.n+'/'+a.d,num=a=>Number(a.n)/Number(a.d);
const ceilQ=a=>(a.n+a.d-1n)/a.d;
function fmt(x,digits=2){const v=typeof x==='number'?x:num(x);return Number.isInteger(v)?String(v):v.toFixed(digits).replace(/0+$/,'').replace(/\.$/,'');}
// 목표 v에 대해 기계 수가 정수가 되는 최소 단위(유리수). v는 unit의 배수일 때만 정수.
const unitOf=c=>Q(c.d,c.n); // c=a/b(기약) → 목표 배수 단위 b/a

function rows(graph,d,targetNode){
 const T=parse(targetNode.maxExact??targetNode.max);
 const out=[];
 for(const n of graph.nodes){
  if(n.type!=='recipe'||n.unlimited)continue;
  const count=parse(n.maxExact??n.max);if(count.n<=0n)continue;
  const r=d.recipes.find(x=>x.id===n.recipe),machine=r&&d.buildings[r.machines?.[0]];
  out.push({node:n,count,per:div(count,T),name:koLabel(r?.name||n.recipe),machine:machine?koLabel(machine.name):'',clock:n.clock??100});
 }
 return {T,list:out};
}
function lcmQ(list){let n=1n,d=0n;for(const q of list){n=lcm(n,q.n);d=d===0n?q.d:gcd(d,q.d);}return Q(n,d||1n);}
function evaluate(list,target){
 let ints=0,machines=0n;const details=list.map(x=>{const c=mul(x.per,target),ok=isInt(c),m=ok?c.n:ceilQ(c);if(ok)ints++;machines+=m;return {...x,c,ok,m,under:ok?100:num(c)/Number(m)*100};});
 return {target,ints,machines,details};
}
function candidates(list,T,limit){
 const units=list.map(x=>unitOf(x.per)),all=lcmQ(units),seen=new Map();
 const add=v=>{if(v.n<=0n)return;const k=str(v);if(!seen.has(k))seen.set(k,v);};
 for(const u of units){for(let k=1n;k<=4000n;k++){const v=mul(u,Q(k));if(num(v)>limit)break;add(v);}}
 add(all);add(T);
 return {all,list:[...seen.values()].map(v=>evaluate(list,v))};
}
function element(tag,text,cls){const e=document.createElement(tag);if(text!=null)e.textContent=text;if(cls)e.className=cls;return e;}
const dialog=element('dialog');dialog.id='gExactDialog';dialog.className='g-exact';dialog.setAttribute('aria-label','딱 떨어짐 계산기');panel.append(dialog);
const style=element('style',`#gExactDialog{max-width:760px;width:94vw;max-height:88vh;overflow:auto}#gExactDialog .g-tools-head{display:flex;justify-content:space-between;align-items:center;gap:8px}#gExactDialog table{border-collapse:collapse;width:100%;font-size:13px;margin:6px 0}#gExactDialog th,#gExactDialog td{border-bottom:1px solid #8884;padding:4px 6px;text-align:left}#gExactDialog td.num{text-align:right;font-variant-numeric:tabular-nums}#gExactDialog .ok{color:#3c6}#gExactDialog .no{color:#e94}#gExactDialog .best{background:#3c63}#gExactDialog label{display:inline-flex;gap:6px;align-items:center;margin:4px 10px 4px 0}#gExactDialog .hint{opacity:.8;font-size:12.5px}#gExactDialog button.pick{padding:2px 8px}`);
document.head.append(style);
function close(){dialog.close();}
function open(){
 const graph=R.get(),d=R.data();dialog.replaceChildren();
 const head=element('div',null,'g-tools-head'),closeB=element('button','닫기');closeB.type='button';closeB.onclick=close;head.append(element('h2','딱 떨어짐 계산기'),closeB);dialog.append(head);
 const sinks=graph.nodes.filter(n=>n.type==='sink'&&!n.unlimited&&parse(n.maxExact??n.max).n>0n);
 if(!sinks.length){dialog.append(element('p','목표 노드(초록 목표/싱크 노드)가 있는 그래프에서 쓸 수 있어요. [거꾸로 자동 전개]로 그래프를 만든 뒤 다시 눌러 주세요.'));dialog.showModal();return;}
 const pick=element('select');pick.id='gExactTarget';sinks.forEach((n,i)=>{const o=element('option',koLabel(d.items[n.item]?.name||n.item)+' · '+fmt(parse(n.maxExact??n.max))+' /분');o.value=i;pick.append(o);});
 const lab=element('label','목표 노드');lab.append(pick);
 const limitIn=Object.assign(element('input'),{type:'number',min:'1',step:'any',id:'gExactLimit'});const lab2=element('label','찾을 최대 목표량 /분');lab2.append(limitIn);
 const onlyCore=Object.assign(element('input'),{type:'checkbox',id:'gExactCore'});const lab3=element('label','완전 정수만 보기');lab3.prepend(onlyCore);
 dialog.append(lab,lab2,lab3,element('p','그래프 전체를 같은 비율로 키우거나 줄였을 때 기계 수가 정수로 떨어지는 목표량을 찾아요. 정수가 아닌 기계는 한 대 더 짓고 클럭을 낮추는 값을 같이 보여 줘요. [적용]을 누르면 모든 노드가 그 비율로 바뀌고 Ctrl+Z로 되돌릴 수 있어요.','hint'));
 const body=element('div');body.id='gExactBody';dialog.append(body);
 function draw(){
  body.replaceChildren();
  const t=sinks[Number(pick.value)||0],{T,list}=rows(graph,d,t);
  if(!list.length){body.append(element('p','계산할 레시피 노드가 없어요.'));return;}
  if(!limitIn.value)limitIn.value=String(Math.max(60,Math.ceil(num(T)*4)));
  const limit=Math.max(1,Number(limitIn.value)||num(T)*4),{all,list:cands}=candidates(list,T,limit);
  const total=list.length;
  const s=element('p');s.innerHTML='';s.append('모든 기계가 정수가 되는 최소 목표량: ',Object.assign(element('b',fmt(all)+' /분'),{id:'gExactAll'}),' (현재 '+fmt(T)+' /분의 '+fmt(div(all,T))+'배)');body.append(s);
  let shown=cands.filter(c=>c.target.n>0n&&(!onlyCore.checked||c.ints===total));
  shown.sort((a,b)=>b.ints-a.ints||num(a.target)-num(b.target));
  const integerOnes=shown.filter(c=>c.ints===total);
  const best=[];const pushU=c=>{if(c&&!best.includes(c))best.push(c);};
  pushU(shown.find(c=>str(c.target)===str(T)));
  // 정수 개수 단계별로 가장 작은 목표량을 추린다
  const byInts=new Map();for(const c of shown){const k=c.ints;if(!byInts.has(k)||num(c.target)<num(byInts.get(k).target))byInts.set(k,c);}
  [...byInts.values()].sort((a,b)=>b.ints-a.ints).forEach(pushU);
  shown.slice(0,12).forEach(pushU);integerOnes.slice(0,3).forEach(pushU);
  if(!best.length){body.append(element('p','이 범위에서는 후보가 없어요. 최대 목표량을 늘려 보세요.'));return;}
  const table=element('table');table.id='gExactTable';
  const hr=element('tr');['목표 /분','배율','정수 기계','총 기계 수',''].forEach(h=>hr.append(element('th',h)));table.append(hr);
  const detail=element('div');detail.id='gExactDetail';
  function showDetail(c){
   detail.replaceChildren(element('h3','목표 '+fmt(c.target)+' /분일 때'));
   const tb=element('table'),h=element('tr');['레시피','기계','필요 수','지을 수','클럭'].forEach(x=>h.append(element('th',x)));tb.append(h);
   for(const x of c.details){const tr=element('tr');tr.append(element('td',x.name),element('td',x.machine),element('td',fmt(x.c,3),'num '+(x.ok?'ok':'no')),element('td',String(x.m),'num'),element('td',x.ok?fmt(x.clock)+'%':fmt(x.under*(x.clock/100),4)+'%','num'));tb.append(tr);}
   detail.append(tb);
   const apply=element('button','이 목표량으로 그래프 적용');apply.type='button';apply.id='gExactApply';apply.onclick=()=>applyScale(div(c.target,T),c.target,t);detail.append(apply);
  }
  for(const c of best){
   const tr=element('tr');if(c.ints===total)tr.className='best';
   const b=element('button','보기','pick');b.type='button';b.onclick=()=>showDetail(c);
   const td=element('td');td.append(b);
   tr.append(element('td',fmt(c.target)+(str(c.target)===str(T)?' (현재)':''),'num'),element('td','×'+fmt(div(c.target,T),3),'num'),element('td',c.ints+' / '+total,'num '+(c.ints===total?'ok':'no')),element('td',String(c.machines),'num'),td);table.append(tr);
  }
  body.append(table,detail);showDetail(best[0]);
 }
 function applyScale(f,newT,t){
  try{
   const g=R.get();
   for(const n of g.nodes){
    if(['group','missing'].includes(n.type)||n.unlimited)continue;
    if(n.maxExact==null&&!Number.isFinite(n.max))continue;
    const v=mul(parse(n.maxExact??n.max),f);n.maxExact=str(v);n.max=num(v);
    if(n.id===t.id&&typeof n.title==='string')n.title=n.title.replace(/목표\s*[\d.\/]+\s*\/분/,'목표 '+fmt(newT)+' /분');
   }
   const v=window.ModelerGraph.validate(g,R.data());R.apply(v);close();
   const st=$('gStatus');if(st){st.textContent='딱 떨어짐 적용 · 목표 '+fmt(newT)+' /분 (×'+fmt(f,3)+')';st.classList.add('shown');}
  }catch(e){const p=element('p','적용 실패: '+e.message);p.setAttribute('role','alert');body.append(p);}
 }
 pick.onchange=()=>{limitIn.value='';draw();};limitIn.onchange=draw;onlyCore.onchange=draw;
 draw();dialog.showModal();
}
const toolbar=$('gToolbar'),b=document.createElement('button');b.type='button';b.id='gExactFit';b.textContent='딱 떨어짐 계산';b.title='기계 수가 정수로 떨어지는 목표량 찾기';b.onclick=open;
toolbar.insertBefore(b,$('gTotals'));
// 거꾸로 자동 전개 창 아래 팁
const tipStyle=element('style',`#gAutoFitTip{margin:8px 0;padding:8px 10px;border-radius:8px;background:#3c62;border:1px solid #3c66;font-size:13px;line-height:1.6}#gAutoFitTip b{color:#5d8}#gAutoFitTip button{margin:2px 4px;padding:1px 8px;font-size:12.5px}`);document.head.append(tipStyle);
let tipTimer=0;
function autoTip(){
 const tools=$('gToolsDialog'),rate=$('gAutoRate'),target=$('gAutoTarget'),recipesBox=$('gAutoRecipes');
 if(!tools||!tools.open||!rate||!target||!recipesBox)return;
 let tip=$('gAutoFitTip');if(!tip){tip=element('div');tip.id='gAutoFitTip';recipesBox.before(tip);}
 tip.replaceChildren();
 try{
  const d=R.data(),choices={};for(const s of recipesBox.querySelectorAll('select[data-item]'))if(s.value)choices[s.dataset.item]=s.value;
  const amount=Number(rate.value);if(!(amount>0))return void(tip.hidden=true);
  const graph=window.GraphFeatures.expand(d,target.value,amount,choices,window.SFGraph,window.ExactFull),t=graph.nodes.find(n=>n.id==='auto-target')||graph.nodes.find(n=>n.type==='sink');
  if(!t)return void(tip.hidden=true);
  const {T,list}=rows(graph,d,t);if(!list.length)return void(tip.hidden=true);
  const total=list.length,now=evaluate(list,T),{all,list:cands}=candidates(list,T,Math.max(num(T)*3,60));
  const near=cands.filter(c=>num(c.target)>=num(T)/2&&num(c.target)<=num(T)*3&&str(c.target)!==str(T)).sort((a,b)=>b.ints-a.ints||Math.abs(num(a.target)-num(T))-Math.abs(num(b.target)-num(T))).slice(0,3);
  const chip=c=>{const b=element('button',fmt(c.target)+'/분 ('+c.ints+'/'+total+')');b.type='button';b.onclick=()=>{rate.value=fmt(c.target,6);rate.dispatchEvent(new Event('input',{bubbles:true}));};return b;};
  tip.hidden=false;
  tip.append(element('b','팁! '),now.ints===total?'지금 '+fmt(T)+'/분이면 기계 '+total+'종류가 전부 딱 떨어져요!':'지금 '+fmt(T)+'/분은 기계 '+total+'종류 중 '+now.ints+'종류만 딱 떨어져요. ');
  if(now.ints<total){
   if(near.length&&near[0].ints>now.ints){tip.append(element('br'),'가까운 추천: ');near.filter(c=>c.ints>now.ints).forEach(c=>tip.append(chip(c)));}
   tip.append(element('br'),'전부 딱 떨어지는 최소 목표량은 ');const allC=evaluate(list,all);tip.append(chip(allC));
   const p=element('span',' (나머지는 한 대 더 짓고 클럭을 낮추면 돼요)');p.style.opacity='.8';tip.append(p);
  }
 }catch(e){tip.hidden=true;}
}
const schedule=()=>{clearTimeout(tipTimer);tipTimer=setTimeout(autoTip,120);};
document.addEventListener('input',e=>{if(e.target?.id==='gAutoRate'||e.target?.id==='gAutoSearch')schedule();},true);
document.addEventListener('change',e=>{if(e.target?.closest?.('#gToolsDialog'))schedule();},true);
document.addEventListener('click',e=>{if(e.target?.id==='gExpand')schedule();},true);
window.ExactFit={parse,str,num,rows,candidates,evaluate,open,autoTip};
})();
