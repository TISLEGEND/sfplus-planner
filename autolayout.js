(() => {
'use strict';
const $=id=>document.getElementById(id),ns='http://www.w3.org/2000/svg',Core=window.SFAutolayout;
const tab=document.createElement('button');tab.id='layoutTab';tab.textContent='05 공장 배치';$('graphTab').after(tab);
const panel=document.createElement('section');panel.id='layoutPanel';panel.hidden=true;document.querySelector('footer').before(panel);
panel.innerHTML='<div id="alToolbar"><strong>자동 배치</strong><label>기본 입력<select id="alInput"><option value="manifold">매니폴드</option><option value="balanced">밸런서</option></select></label><label>기본 출력<select id="alOutput"><option value="manifold">매니폴드</option><option value="balanced">밸런서</option></select></label><button id="alRegenerate">현재 계획 재배치</button><button id="alEdit">직접 편집으로 전환</button><button id="alMinus" aria-label="배치 축소">−</button><output id="alZoom">100%</output><button id="alPlus" aria-label="배치 확대">+</button><button id="alFit">전체 보기</button></div><div id="alWorkspace"><aside id="alSidebar"><h2>자동 배치된 묶음</h2><div id="alList"></div><div id="alSelection" hidden><strong id="alSelectedName"></strong><label>이 묶음 입력<select id="alGroupInput"></select></label><label>이 묶음 출력<select id="alGroupOutput"></select></label><button id="alClearOverride">기본 형식 따르기</button><p>건물과 묶음 클릭: 개별 설정<br>목록 클릭: 선택하고 화면 중앙으로 이동</p></div></aside><div id="alViewport" tabindex="0" aria-label="공장 배치: 빈 곳 드래그 이동, 휠 확대, F 전체 보기"><svg id="alWorld" role="img" aria-label="자동 공장 배치도"></svg><div id="alEmpty"></div></div></div><div id="alStatus" role="status"></div>';
for(const id of ['alGroupInput','alGroupOutput'])$(id).innerHTML='<option value="">기본 형식 따름</option><option value="manifold">매니폴드</option><option value="balanced">밸런서</option>';
let graphPlan=null;
let layout=null,plan=null,selected=null,overrides=new Map(),dirty=true,view={x:20,y:20,z:1},drag=null;
const fmt=n=>new Intl.NumberFormat('ko-KR',{maximumFractionDigits:3}).format(n),name=id=>{const n=plan?.data.items[id]?.name||id;return window.KO_NAMES?.[n]||n;},machine=id=>{const n=plan.data.buildings[id]?.name||id;return window.KO_NAMES?.[n]||n;};
const fluid=id=>{const i=plan.data.items[id],form=i?.form||i?.state;if(form)return /liquid|gas|fluid/i.test(form);return /water|oil|nitrogen|fuel|alumina|acid|residue|solution/i.test(id+' '+i?.name)&&!(/packaged|solid|rod/i.test(id+' '+i?.name));};
const color=id=>window.SFAutolayoutColors.color(id),unit=id=>fluid(id)?' m³/분':' /분';
// Visual dimensions only; production calculations and data remain untouched.
const PX_PER_METER=12,topdown=id=>window.SFTopdown?.classes[id?.replace(/^Build_/,'').replace(/_C$/,'')];
function sizes(){return Object.fromEntries(Object.keys(plan.data.buildings).flatMap(id=>{const a=topdown(id);if(!a)return [];const f=a.footprintCm,w=Math.max(a.widthM,f?(f[2]-f[0])/100:0),h=Math.max(a.depthM,f?(f[3]-f[1])/100:0),scale=Math.max(PX_PER_METER,150/Math.min(w,h));return [[id,{w:w*scale,h:h*scale}]];}));}
function itemIcon(id){return window.SFPLUS_ICONS?.[id]?.src||window.MODELER_ASSETS?.icons?.[window.ModelerGraph.norm(plan.data.items[id]?.name||id)];}
function itemArt(id,x,y,size,parent){const src=itemIcon(id);if(src)svg('image',{href:src,x,y,width:size,height:size,class:'al-item-icon'},parent);else svg('circle',{cx:x+size/2,cy:y+size/2,r:size*.25,fill:color(id)},parent);}

function svg(tag,attrs={},parent=$('alWorld')){const e=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))if(v!==undefined)e.setAttribute(k,v);parent.append(e);return e;}
function text(value,x,y,attrs={},parent){const e=svg('text',{x,y,...attrs},parent);e.textContent=value;return e;}
let networkRate=null,networkProjection=null;
function path(points,item,parent,amount){
 if(networkProjection)points=points.map(p=>Core.point(networkProjection,p));
 const d=points.map((p,i)=>(i?'L':'M')+p.x+','+p.y).join(' '),isPipe=fluid(item);
 svg('path',{d,class:'al-track '+(isPipe?'al-pipe':'al-belt')},parent);
 const p=svg('path',{d,stroke:color(item),class:'al-wire','marker-end':'url(#alArrow'+(isPipe?'Pipe':'Belt')+')'},parent);
 // Repeated chevrons make direction visible along the entire conveyor, even at fit scale.
 for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],len=Math.abs(b.x-a.x)+Math.abs(b.y-a.y);if(len<25)continue;const dx=Math.sign(b.x-a.x),dy=Math.sign(b.y-a.y);for(let s=32;s<len-8;s+=100){const x=a.x+dx*s,y=a.y+dy*s;svg('path',{d:`M${x-dx*4-dy*3},${y-dy*4+dx*3} L${x},${y} L${x-dx*4+dy*3},${y-dy*4-dx*3}`,class:'al-chevron'},parent);}}
 window.SFAutolayoutColors.decorate(p,points,item,amount??networkRate??0,amount===undefined);
 return p;
}
function dot(x,y,item,output,parent,share){if(networkProjection)({x,y}=Core.point(networkProjection,{x,y}));const cls=fluid(item)?'PipelineJunction_Cross':output?'ConveyorAttachmentMerger':'ConveyorAttachmentSplitter',a=window.SFTopdown?.classes[cls],w=14,h=14;const e=svg('image',{href:a?.src||'assets/autolayout-topdown/'+(fluid(item)?'pipe':output?'merger':'splitter')+'.svg',x:x-w/2,y:y-h/2,width:w,height:h,class:'al-junction'},parent);const t=svg('title',{},e);t.textContent=(fluid(item)?'파이프 접합':output?'머저':'스플리터')+(share?' · '+share:'');}
function icon(id){const li=plan.data.buildings[id]?.layoutIcon;if(li){const cls=li.replace(/^Desc_|^Build_/,'').replace(/_C$/,'');return window.SFTopdown?.classes[cls]?.src||window.SFPLUS_ICONS?.[li]?.src||window.MODELER_ASSETS?.icons?.[window.ModelerGraph.norm(plan.data.buildings[id].name)]||'assets/autolayout-topdown/'+(/Merger/.test(li)?'merger':'splitter')+'.svg';}if(topdown(id))return topdown(id).src;const title=plan.data.buildings[id]?.name||id;const known=['Constructor','Assembler','Refinery','Smelter','Foundry','Manufacturer','Crusher','Flexible Blast Furnace','Wet Washer','Reformer','Sorter','Blender','Chemical Reactor','Converter','Packager','A.I. Fluid Packer','Particle Accelerator','Quantum Encoder','Composter','Cooking Hub','Crop Plot','Mycelia Plot','Tree Plot','Modular Miner'];const kind=known.find(n=>n.toLowerCase()===title.toLowerCase());return kind?'assets/autolayout-topdown/'+kind.toLowerCase().replaceAll(' ','-').replaceAll('.','')+'.svg':window.SFPLUS_ICONS?.[id]?.src||window.MODELER_ASSETS?.icons?.[window.ModelerGraph.norm(title)];}
function network(g,e,index,output,parent){
 networkRate=e.amount;
 const list=output?g.outputs:g.inputs,item=e.item,port=output?e.ax:e.bx,sign=output?1:-1,body=output?g.bodyY+g.bodyH:g.bodyY;
 const rail=output?body+22+index*g.slot:g.y+42+index*g.slot;
 const leaves=g.boxes.map(b=>({x:b.x+b.w*(index+1)/(list.length+1),y:body}));
 const mode=overrides.get(g.id)?.[output?'output':'input']||$(output?'alOutput':'alInput').value;
 const outerY=output?g.y+g.h:g.y;
 if(mode==='manifold'){
  const ys=rail;const far=leaves.at(-1).x;
  if(output){leaves.forEach(p=>{path([p,{x:p.x,y:ys}],item,parent);dot(p.x,ys,item,true,parent);});path([{x:leaves[0].x,y:ys},{x:far,y:ys},{x:port,y:ys},{x:port,y:outerY}],item,parent);}
  else{path([{x:port,y:outerY},{x:port,y:ys},{x:leaves[0].x,y:ys}],item,parent);path([{x:leaves[0].x,y:ys},{x:far,y:ys}],item,parent);leaves.forEach(p=>{dot(p.x,ys,item,false,parent);path([{x:p.x,y:ys},p],item,parent);});}
 }else{
  const realCount=leaves.length;
  if(!output)while(leaves.length<g.treeLeaves)leaves.push({x:g.boxes.at(-1).x+g.bodyW+12+(leaves.length-g.installed)*16,y:body});
  const depth=Math.ceil(Math.log2(Math.max(2,leaves.length))),base=output?rail+depth*20:rail,returns=[];
  function tree(a,b,d){const x=(leaves[a].x+leaves[b-1].x)/2,y=base+(output?-1:1)*d*20;
   if(b-a===1){if(output)path([leaves[a],{x,y}],item,parent);else if(a<realCount)path([{x,y},leaves[a]],item,parent);else returns.push({x,y});return {x,y};}
   dot(x,y,item,output,parent,output?'트리 합류':'1:1 균등 분배');const m=a+Math.ceil((b-a)/2),children=[tree(a,m,d+1),tree(m,b,d+1)];
   for(const p of children){const points=[{x,y},{x:p.x,y},p];path(output?points.reverse():points,item,parent);}return {x,y};
  }
  const root=tree(0,leaves.length,0),points=[{x:port,y:outerY},{x:port,y:root.y},root];path(output?points.reverse():points,item,parent);
  if(returns.length){const returnY=rail+depth*20+14,sideX=g.x+g.w-10-index*8,mergeY=root.y-14;for(const p of returns){path([p,{x:p.x,y:returnY},{x:sideX,y:returnY}],item,parent);dot(p.x,returnY,item,true,parent,'남는 가지를 입력으로 환류');}path([{x:sideX,y:returnY},{x:sideX,y:mergeY},{x:port,y:mergeY}],item,parent);dot(port,mergeY,item,true,parent,'환류 병합');}
 }
}
function transform(){$('alWorld').style.transform=`translate(${view.x}px,${view.y}px) scale(${view.z})`;$('alZoom').value=Math.round(view.z*100)+'%';window.SFAutolayoutColors.updateLabels(view.z);
 // CSS transforms scale the outer SVG too; compensate in world units.
 $('alWorld').querySelectorAll('.al-wire[data-flow],.al-bridge').forEach(e=>e.style.strokeWidth=((e.classList.contains('al-bridge-cut')?8:e.classList.contains('al-flow-active')?4.5:3.5)/view.z)+'px');
 $('alWorld').querySelectorAll('.al-bridge[data-x]').forEach(e=>{const x=+e.dataset.x,y=+e.dataset.y,r=Math.min(6/view.z,+e.dataset.room);e.setAttribute('d',`M${x-r},${y} Q${x},${y-r*1.8} ${x+r},${y}`);});}
function fit(){if(!layout||!$('alViewport').clientWidth)return;const v=$('alViewport');view.z=Math.min(1.5,(v.clientWidth-40)/layout.width,(v.clientHeight-40)/layout.height);view.z=Math.max(.005,view.z);view.x=(v.clientWidth-layout.width*view.z)/2;view.y=(v.clientHeight-layout.height*view.z)/2;transform();}
function zoom(f,cx,cy){const v=$('alViewport').getBoundingClientRect(),x=cx??v.width/2,y=cy??v.height/2,z=Math.max(.005,Math.min(3,view.z*f));view.x=x-(x-view.x)*z/view.z;view.y=y-(y-view.y)*z/view.z;view.z=z;transform();}
function select(id,focus=false){selected=id;const g=layout?.groups.find(g=>g.id===id);$('alSelection').hidden=!g;if(g){$('alSelectedName').textContent=name(g.item);$('alGroupInput').value=overrides.get(id)?.input||'';$('alGroupOutput').value=overrides.get(id)?.output||'';if(focus){view.z=Math.max(.12,Math.min(1,$('alViewport').clientWidth/(g.w+100),$('alViewport').clientHeight/(g.h+100)));view.x=$('alViewport').clientWidth/2-(g.x+g.w/2)*view.z;view.y=$('alViewport').clientHeight/2-(g.y+g.h/2)*view.z;transform();}}
  window.SFAutolayoutColors.select(g?[g.item,...g.inputs,...g.outputs]:[]);
  panel.querySelectorAll('[data-group]').forEach(e=>e.classList.toggle('selected',e.dataset.group===id));
}
function draw(){
 if(layout&&plan)layout=Core.build(plan,{input:$('alInput').value,output:$('alOutput').value,overrides:Object.fromEntries(overrides),sizes:sizes(),presentation:true});
 window.SFAutolayoutColors.start({edges:layout?.edges||[],fluid,name,fmt,unit,itemIcon});
 const world=$('alWorld');world.replaceChildren();$('alList').replaceChildren();if(!layout)return;
 world.setAttribute('width',layout.width);world.setAttribute('height',layout.height);
 const defs=svg('defs');for(const [id,cls] of [['alBeltTexture','ConveyorBeltMk1'],['alPipeTexture','Pipeline']]){const a=window.SFTopdown?.classes[cls];if(a){const p=svg('pattern',{id,patternUnits:'userSpaceOnUse',width:18,height:10,y:-5},defs);svg('image',{href:a.src,x:0,y:0,width:18,height:10,preserveAspectRatio:'none'},p);}}for(const [k,c]of [['Belt','#ffa64c'],['Pipe','#62b9ff']]){const marker=svg('marker',{id:'alArrow'+k,viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:5,markerHeight:5,orient:'auto-start-reverse',markerUnits:'userSpaceOnUse'},defs);svg('path',{d:'M 0 0 L 10 5 L 0 10 Z',fill:c},marker);}
 for(const bus of layout.buses){for(const points of bus.paths)path(points,bus.item,undefined,bus.amount);window.SFAutolayoutColors.label(bus.item,bus.start);}
 // Draw a raised horizontal jump over each distinct cross-item crossing.
 const segments=layout.buses.flatMap(bus=>bus.paths.map(p=>({item:bus.item,a:p[0],b:p[1]}))),bridges=new Set();
 for(const h of segments.filter(s=>s.a.y===s.b.y))for(const v of segments.filter(s=>s.a.x===s.b.x)){
  if(h.item===v.item)continue;const x=v.a.x,y=h.a.y;
  if(x<=Math.min(h.a.x,h.b.x)+.1||x>=Math.max(h.a.x,h.b.x)-.1||y<=Math.min(v.a.y,v.b.y)+.1||y>=Math.max(v.a.y,v.b.y)-.1)continue;
  const key=x+','+y;if(bridges.has(key))continue;bridges.add(key);
  const r=Math.min(16,x-Math.min(h.a.x,h.b.x),Math.max(h.a.x,h.b.x)-x),d=`M${x-r},${y} Q${x},${y-r*1.8} ${x+r},${y}`;
  svg('path',{d,class:'al-bridge al-bridge-cut','data-x':x,'data-y':y,'data-room':r});svg('path',{d,class:'al-bridge','data-x':x,'data-y':y,'data-room':r,'data-flow':h.item,style:'stroke:'+window.SFAutolayoutColors.color(h.item)});
 }
 for(const n of [...layout.sources,...layout.sinks.filter(n=>!n.byproduct)]){const group=svg('g',{class:'al-resource-card',tabindex:n.byproduct?0:undefined});if(n.byproduct){const focus=()=>{for(const el of world.querySelectorAll('[data-group]'))el.classList.toggle('al-related',el.dataset.group===n.producer);};const clear=()=>world.querySelectorAll('.al-related').forEach(el=>el.classList.remove('al-related'));group.onmouseenter=focus;group.onmouseleave=clear;group.onfocus=focus;group.onblur=clear;}svg('rect',{x:n.x,y:n.y,width:n.w,height:n.h,rx:10,class:'al-card'},group);itemArt(n.item,n.x+12,n.y+17,30,group);const label=name(n.item);text((n.kind==='source'?'원료':n.byproduct?'부산물':'완제품'),n.x+52,n.y+16,{class:'al-card-kind'},group);text(label,n.x+52,n.y+34,{class:'al-card-name',textLength:label.length*12>n.w-62?n.w-62:undefined,lengthAdjust:'spacingAndGlyphs'},group);text(fmt(n.amount)+unit(n.item),n.x+52,n.y+52,{class:'al-card-rate'},group);}

 const badgeLayer=svg('g',{class:'al-badge-layer'});
 for(const g of layout.groups){
  const wrap=svg('g',{'data-group':g.id,class:g.final?'al-final':''});svg('rect',{x:g.x,y:g.y,width:g.w,height:g.h,rx:8,class:'al-group'},wrap);
  const label=name(g.item)+' · '+machine(g.machine)+' ×'+g.installed;
  itemArt(g.item,g.x+12,g.y+9,22,wrap);
  text(label,g.x+8,g.y+19,{class:'al-title',textLength:label.length*15>g.w-16?g.w-16:undefined,lengthAdjust:'spacingAndGlyphs'},wrap);
  const title=svg('title',{},wrap);title.textContent=g.recipeName+' · 필요 '+fmt(g.count)+'대 · '+fmt(g.amount)+unit(g.item);
  networkProjection=layout.projection;const original=layout.drawing?.groups.find(n=>n.id===g.id)||g;for(const output of [false,true])for(const [i,item]of (output?original.outputs:original.inputs).entries()){const ee=(layout.drawing||layout).edges.filter(e=>e.item===item&&(output?e.from===g.id:e.to===g.id));network(original,{...ee[0],amount:ee.reduce((n,e)=>n+e.amount,0)},i,output,wrap);}networkProjection=null;
  for(const b of g.boxes){const src=icon(g.machine),w=b.w,h=b.h,cx=b.x+b.w/2,cy=b.y+b.h/2;if(src)svg('image',{href:src,x:cx-w/2,y:cy-h/2,width:w,height:h,preserveAspectRatio:'xMidYMid meet',class:'al-machine-art','data-machine':g.machine},wrap);const lw=Math.max(32,Math.min(b.w-8,110));const badge=svg('g',{class:'al-building-caption'},wrap);svg('rect',{x:cx-lw/2,y:cy-18,width:lw,height:36,rx:3,class:'al-machine-label'},badge);text(name(g.item),cx,cy-3,{'text-anchor':'middle',textLength:name(g.item).length*10>lw-6?lw-6:undefined,'lengthAdjust':'spacingAndGlyphs'},badge);text(g.utilization.toFixed(2)+'%',cx,cy+12,{'text-anchor':'middle',class:'al-util'},badge);}
  for(const b of g.byproducts||[]){const n=layout.sinks.find(n=>n.id===b.sink),r=n.badge,badge=svg('g',{class:'al-output-badge',tabindex:0},badgeLayer);const focus=()=>wrap.classList.add('al-related'),clear=()=>wrap.classList.remove('al-related');badge.onpointerdown=e=>{e.stopPropagation();badge.focus();};badge.onmouseenter=focus;badge.onmouseleave=clear;badge.onfocus=focus;badge.onblur=clear;svg('rect',{x:r.x,y:r.y,width:24,height:24,rx:6,fill:window.SFAutolayoutColors.color?.(b.item)||'#354f56',stroke:'#9ec6be'},badge);itemArt(b.item,r.x+2,r.y+2,20,badge);svg('title',{},badge).textContent='부산물 · '+name(b.item)+' · '+fmt(b.amount)+unit(b.item);const card=svg('g',{class:'al-resource-card al-byproduct-summary',tabindex:0},badge);card.onfocus=focus;card.onblur=clear;const x=r.x+220<layout.width?r.x+30:r.x-198,y=Math.max(0,Math.min(r.y,layout.height-70));svg('rect',{x,y,width:190,height:64,rx:8,class:'al-card'},card);itemArt(b.item,x+10,y+18,28,card);text('부산물',x+48,y+16,{class:'al-card-kind'},card);text(name(b.item),x+48,y+34,{class:'al-card-name'},card);text(fmt(b.amount)+unit(b.item),x+48,y+52,{class:'al-card-rate'},card);}
  for(const [i,b] of (g.extraByproducts||[]).entries()){const badge=svg('g',{class:'al-output-badge',tabindex:0},badgeLayer);const x=g.x+8+i*27,y=g.y+g.h-26;svg('rect',{x,y,width:24,height:24,rx:6,fill:color(b.item)},badge);itemArt(b.item,x+2,y+2,20,badge);svg('title',{},badge).textContent='미연결 산출물 · '+name(b.item)+' · '+fmt(b.amount)+unit(b.item);}
  const button=document.createElement('button');button.dataset.group=g.id;const img=document.createElement('img');img.src=icon(g.machine)||'';img.alt='';button.append(img,document.createTextNode(name(g.item)));const small=document.createElement('small');small.textContent=machine(g.machine)+' · '+g.installed+'대 (필요 '+fmt(g.count)+')';button.append(small);button.onclick=()=>select(g.id,true);$('alList').append(button);
 }
 world.append(badgeLayer);
 window.SFAutolayoutColors.finish();
 select(selected);transform();$('alStatus').textContent=layout.groups.length+'개 묶음 · '+layout.total+'대 · '+layout.buses.length+'개 공용 아이템 버스 · 연결선에 마우스를 올려 흐름 확인 · 휠 확대 · F 전체 보기';
}
function regenerate(){try{plan=graphPlan||window.SFPlannerPlan;layout=Core.build(plan,{sizes:sizes(),presentation:true});overrides.clear();selected=null;dirty=false;$('alEmpty').textContent='';$('alEdit').disabled=false;draw();fit();}catch(e){layout=null;selected=null;draw();$('alSelection').hidden=true;$('alEmpty').textContent=e.message;$('alStatus').textContent='배치 생성 실패';$('alEdit').disabled=true;}}
tab.onclick=()=>{for(const id of ['planner','mapPanel','graphPanel'])$(id).hidden=true;for(const id of ['planTab','mapTab','graphTab'])$(id).classList.remove('active');panel.hidden=false;tab.classList.add('active');document.body.classList.remove('map-fullscreen','graph-active');if(dirty||!layout)regenerate();else requestAnimationFrame(transform);};
for(const id of ['planTab','mapTab','graphTab'])$(id).addEventListener('click',()=>{panel.hidden=true;tab.classList.remove('active');});
window.addEventListener('sfplannerchange',()=>{graphPlan=null;dirty=true;if(!panel.hidden)regenerate();});
$('alRegenerate').onclick=regenerate;for(const id of ['alInput','alOutput'])$(id).onchange=draw;
for(const [id,key]of [['alGroupInput','input'],['alGroupOutput','output']])$(id).onchange=()=>{if(!selected)return;overrides.set(selected,{...overrides.get(selected),[key]:$(id).value});draw();};
$('alClearOverride').onclick=()=>{overrides.delete(selected);draw();};$('alPlus').onclick=()=>zoom(1.25);$('alMinus').onclick=()=>zoom(.8);$('alFit').onclick=fit;
$('alViewport').addEventListener('wheel',e=>{e.preventDefault();const r=e.currentTarget.getBoundingClientRect();zoom(Math.exp(-e.deltaY*.0015),e.clientX>=r.left&&e.clientX<=r.right?e.clientX-r.left:undefined,e.clientY>=r.top&&e.clientY<=r.bottom?e.clientY-r.top:undefined);},{passive:false});
$('alViewport').onpointerdown=e=>{if(e.button!==0)return;const g=e.target.closest('[data-group]');if(g){select(g.dataset.group);return;}drag={x:e.clientX,y:e.clientY,vx:view.x,vy:view.y};e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.focus();};
$('alViewport').onpointermove=e=>{if(drag){view.x=drag.vx+e.clientX-drag.x;view.y=drag.vy+e.clientY-drag.y;transform();}};for(const t of ['pointerup','pointercancel','lostpointercapture'])$('alViewport').addEventListener(t,()=>drag=null);
$('alViewport').onkeydown=e=>{if(e.key.toLowerCase()==='f'){e.preventDefault();fit();}if(e.key==='+'||e.key==='=')zoom(1.25);if(e.key==='-')zoom(.8);};
$('alEdit').onclick=()=>{if(!layout)return;try{const d=plan.dataMode==='vanilla'?window.VANILLA_DATA:plan.data,graph=plan.graph?plan.graph:Core.toGraph(layout,plan,d);window.RiriGraph.loadShared(graph);$('graphTab').click();window.RiriGraph.fit();}catch(e){$('alStatus').textContent='편집 전환 실패: '+e.message;}};
const convert=document.createElement('button');convert.id='gToLayout';convert.textContent='공장 배치로 만들기';$('gToolbar').append(convert);
convert.onclick=()=>{try{const next=window.RiriLayoutGraph.fromGraph(window.RiriGraph.get(),window.RiriGraph.data(),window.RiriGraph.result());Core.build(next,{presentation:true});graphPlan=next;dirty=true;tab.click();}catch(e){$('gStatus').textContent='공장 배치 변환 실패: '+e.message;}};
window.RiriAutolayout={get:()=>layout,view:()=>({...view}),overrides:()=>Object.fromEntries(overrides),regenerate,fit};
})();
