/* Local, offline world-map camera. World coordinates remain shared with save overlays. */
(() => {
 const vp=$('mapViewport'),surface=$('mapSurface'),tip=$('mapTooltip');
 let x=0,y=0,z=1,base=1,ready=false,drag=null,moved=false,raf=0,animation=0,targetZoom=1;
 (()=>{const S=window.SFP_SAVE,sv=(S?.nodes||[]).filter(n=>n.r);if(!sv.length||!BASE.sfplus)return;let hit=0;for(const n of BASE.sfplus.nodes){let b=null,bd=250000;for(const s of sv){const d=(s.x-n.x)**2+(s.y-n.y)**2;if(d<bd){bd=d;b=s;}}if(b){n.resource=b.r;if(b.p)n.purity=b.p;n.fromSave=true;hit++;}}window.SFMapSaveNodes=hit;})();
 const selected=new Set(); let lastData=null,icons={};
 const ko={Montanion:'몬타니온',Callanite:'칼라나이트',Aurovite:'아우로바이트',Siterite:'시테라이트',Kyalite:'카이알라이트','Montanion Ore':'몬타니온 광석','Callanite Ore':'칼라나이트 광석','Aurovite Ore':'아우로바이트 광석','Siterite Ore':'시테라이트 광석','Larrussite Ore':'라루사이트 광석',Peat:'이탄',Dirt:'흙',Loam:'양토','Chlorine Gas':'염소 가스','Algal Mass':'조류 덩어리','Kerr Crystal':'커 결정'};
 const label=id=>id==='Desc_GeothermalEnergy_C'?'간헐천':(window.KO_NAMES?.[name(id)]||ko[name(id)]||name(id));
 function icon(id){if(id?.[0]==='@')return id.slice(1);const k=id==='Desc_GeothermalEnergy_C'?'Desc_GeneratorGeoThermal_C':id,pre=window.SFPLUS_ICONS?.[k];if(pre?.src)return pre.src;const entry=icons[k];return entry?.icon?'assets/sfplus_icons/'+entry.icon:null;}
 function image(id){const img=make('img');img.alt=label(id);const url=icon(id);if(url)img.src=url;return img;}
 const EXTRAS={slug1:{name:'파워 슬러그 (파랑)',icon:'Desc_Crystal_C',color:'#2f7fd1'},slug2:{name:'파워 슬러그 (노랑)',icon:'Desc_Crystal_mk2_C',color:'#d1a72f'},slug3:{name:'파워 슬러그 (보라)',icon:'Desc_Crystal_mk3_C',color:'#9a4fd1'},sloop:{name:'소머슬루프',icon:'Desc_WAT1_C',color:'#c0392b'},mercer:{name:'머서 구체',icon:'Desc_WAT2_C',color:'#5b2c83'},droppod:{name:'추락한 착륙정',icon:'@assets/sfplus_icons/icons/TXUI_MIcon_ScanHardDrive.png',color:'#c9822b'}};
 const key=n=>n.resource+'|'+n.purity,PURS=['impure','normal','pure','unknown'],isWell=n=>n.nodeType==='frackingSatellite'||n.nodeType==='geyser';
 const TABS=[['nodes','자원 노드',n=>!isWell(n)],['wells','자원정',isWell],['extras','수집품',null]];let tab='nodes';const extrasOn=new Set(),got=new Set(window.SFP_SAVE?.collected||[]);let hideGot=true;
 function filters(){
  if(lastData!==D){selected.clear();D.nodes.forEach(n=>selected.add(key(n)));lastData=D;}
  const box=$('resourceFilters');box.replaceChildren();const tabs=make('div',undefined,'layer-tabs');
  for(const [id,name]of TABS){const b=make('button',name);if(id===tab)b.className='on';b.onclick=()=>{tab=id;filters();};tabs.append(b);}box.append(tabs);
  const actions=make('div',undefined,'pair'),all=make('button','모두 켜기'),none=make('button','모두 끄기');actions.append(all,none);box.append(actions);
  if(tab==='extras'){const C=window.SF_COLLECTIBLES||[],groups=[...new Set(C.map(c=>c.t))];all.onclick=()=>{groups.forEach(g=>extrasOn.add(g));filters();schedule();};none.onclick=()=>{extrasOn.clear();filters();schedule();};
   if(!C.length)box.append(make('p','수집품 위치 자료가 아직 없습니다.','small muted'));
   const hg=make('label',undefined,'resource-check'),hc=make('input');hc.type='checkbox';hc.checked=hideGot;hc.onchange=()=>{hideGot=hc.checked;filters();schedule();};hg.append(hc,make('span',`세이브에서 획득·파괴한 것 숨기기 (${C.filter(c=>got.has(c.n)).length}개)`));box.append(hg);box.append(make('p','숫자는 남은 개수/전체 개수예요. 세이브에서 먹거나 부순 만큼 빠지는 게 정상입니다.','small muted'));
   for(const g of groups){const info=EXTRAS[g]||{name:g},b=make('button',undefined,'extra-btn'+(extrasOn.has(g)?' on':''));const i=make('img');i.src=icon(info.icon)||'';const tot=C.filter(c=>c.t===g).length,gn=C.filter(c=>c.t===g&&got.has(c.n)).length;b.title=`전체 ${tot}개 중 ${gn}개 획득·파괴 → 남은 ${tot-gn}개`;b.append(i,make('span',info.name+(gn?` (−${gn})`:'')),make('i',`${tot-gn}/${tot}`));b.onclick=()=>{extrasOn.has(g)?extrasOn.delete(g):extrasOn.add(g);filters();schedule();};box.append(b);}
   return;}
  const list=D.nodes.filter(TABS.find(t=>t[0]===tab)[2]),keys=new Set(list.map(key));
  all.onclick=()=>{keys.forEach(k=>selected.add(k));filters();schedule();};none.onclick=()=>{keys.forEach(k=>selected.delete(k));filters();schedule();};
  const head=make('div',undefined,'res-row res-head');head.append(make('span',''));const hc=make('div',undefined,'res-cells');for(const p of ['impure','normal','pure'])hc.append(make('small',pureNames[p]||p));head.append(hc);box.append(head);
  for(const id of [...new Set(list.map(n=>n.resource))]){const row=make('div',undefined,'res-row'),cells=make('div',undefined,'res-cells');row.append(make('span',label(id)));
   for(const p of PURS){const cnt=list.filter(n=>n.resource===id&&n.purity===p).length;if(!cnt&&p==='unknown')continue;const k=id+'|'+p,b=make('button',undefined,`res-btn ${p}${selected.has(k)?' on':''}`);b.title=`${label(id)} · ${pureNames[p]||p} · ${cnt}곳`;b.disabled=!cnt;b.append(image(id),make('i',String(cnt)));b.onclick=()=>{selected.has(k)?selected.delete(k):selected.add(k);filters();schedule();};cells.append(b);}
   row.append(cells);box.append(row);}
  if(window.SFMapSaveNodes&&D===BASE.sfplus)$('mapScope').textContent=`세이브 ${window.SFP_SAVE.file} 기준 · 실제 노드 ${window.SFMapSaveNodes}곳의 자원·순도 반영`;
 }
 const oldUpdate=updateResources;updateResources=function(){oldUpdate();filters();};
 function svg(tag,attrs){const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);return e;}
 function popup(text){$('nodeInfo').textContent=text;$('nodeInfo').classList.add('open');}
 const PC={pure:'#6fbf3a',normal:'#f07c12',impure:'#d63a3a',unknown:'#7d8a9a'},imgCache={},canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),tiles=document.createElement('div');
 canvas.id='nodeCanvas';tiles.id='tileLayer';surface.querySelector('img').after(tiles);surface.after(canvas);let hits=[],projected=null,projData=null,hover=null;
 function img(url){let i=imgCache[url];if(!i){i=imgCache[url]=new Image();i.onload=()=>schedule();i.src=url;}return i;}
 function visibleNodes(){if(projData!==D){projData=D;projected=D.nodes.map(n=>({n,p:E.project(n.x,n.y)}));}const pu=$('purity').value,nt=$('nodeType').value;return projected.filter(({n})=>selected.has(key(n))&&(!pu||n.purity===pu)&&(!nt||n.nodeType===nt));}
 function drawNodes(){const dpr=devicePixelRatio||1,w=vp.clientWidth,h=vp.clientHeight;if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);hits=[];if(!ready)return 0;const s=18+Math.min(18,Math.log2(z)*6),W=base*z,list=visibleNodes();
  for(const o of list){const sx=x+o.p.x*W,sy=y+o.p.y*W;if(sx<-s||sy<-s*2||sx>w+s||sy>h+s)continue;pin(sx,sy,hover===o?s*1.2:s,PC[o.n.purity]||PC.unknown,icon(o.n.resource),hover===o);
   hits.push({o,sx,sy,s});}
  const C=window.SF_COLLECTIBLES||[];if(extrasOn.size)for(const c of C){if(!extrasOn.has(c.t)||hideGot&&got.has(c.n))continue;const p=c.p||(c.p=E.project(c.x,c.y)),sx=x+p.x*W,sy=y+p.y*W;if(sx<-s||sy<-s*2||sx>w+s||sy>h+s)continue;const e=EXTRAS[c.t]||{},o={c};pin(sx,sy,s*.85,e.color||'#3d4f63',icon(e.icon),false);hits.push({o,sx,sy,s:s*.85});}
  return list.length;}
 function pin(cx,cy,s,fill,url,hl){const r=s/2;ctx.beginPath();ctx.moveTo(cx-r*.5,cy+r*.75);ctx.lineTo(cx,cy+r*1.5);ctx.lineTo(cx+r*.5,cy+r*.75);ctx.closePath();ctx.fillStyle='#fff';ctx.fill();
  ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.beginPath();ctx.arc(cx,cy,r-(hl?2.5:1.6),0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();
  if(url){const i=img(url);if(i.complete&&i.naturalWidth)ctx.drawImage(i,cx-r*.72,cy-r*.72,r*1.44,r*1.44);}else{ctx.fillStyle='#fff';ctx.font=`${r}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('♨',cx,cy);}}
 function hitAt(px,py){for(let i=hits.length-1;i>=0;i--){const h=hits[i];if((px-h.sx)**2+(py-h.sy)**2<=(h.s/2+2)**2)return h.o;}return null;}
 const tileImgs=new Map();
 function updateTiles(){if(!ready)return;const L=Math.max(3,Math.min(5,Math.ceil(Math.log2(base*z*(devicePixelRatio||1)/256))));const keep=new Set();
  if(L>3){const n=2**L,W=base*z,a=v=>Math.max(0,Math.min(n-1,Math.floor(v*n)));const x0=a(-x/W),x1=a((vp.clientWidth-x)/W),y0=a(-y/W),y1=a((vp.clientHeight-y)/W);
   for(let i=x0;i<=x1;i++)for(let j=y0;j<=y1;j++){const k=`${L}/${i}/${j}`;keep.add(k);if(!tileImgs.has(k)){const t=document.createElement('img');t.draggable=false;t.decoding='async';t.src=`assets/tiles/${k}.webp`;t.style.cssText=`left:${i/n*100}%;top:${j/n*100}%;width:${100/n+.03}%;height:${100/n+.03}%`;tileImgs.set(k,t);tiles.append(t);}}}
  for(const [k,t]of tileImgs)if(!keep.has(k)){t.remove();tileImgs.delete(k);}}
 let frame=0,settle=0;function schedule(){if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const c=drawNodes();$('nodeCount').textContent=`${c} 지점`;updateTiles();});}
 renderMap=function(){
  if(lastData!==D)filters();const layer=$('nodeLayer');layer.replaceChildren();
  for(const m of markers){const c=circle(m.x,m.y,7,'#ff825b');c.onclick=e=>{if(adding||moved)return;e.stopPropagation();editMarker(m);};const title=svg('title',{});title.textContent=m.name;c.append(title);layer.append(c);}
  $('markerList').replaceChildren();for(const m of markers){const b=make('button','◆ '+m.name);b.onclick=()=>editMarker(m);$('markerList').append(b);}schedule();
 };
 vp.addEventListener('pointermove',e=>{if(drag&&moved)return;const r=vp.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top,o=e.target.closest('aside,.map-controls,#nodeInfo')?null:hitAt(px,py);if(o!==hover){hover=o;schedule();}
  if(o){tip.textContent=o.c?(EXTRAS[o.c.t]?.name||o.c.t):`${label(o.n.resource)} · ${pureNames[o.n.purity]||o.n.purity} · ${nodeNames[o.n.nodeType]||o.n.nodeType}`;tip.hidden=false;tip.style.left=Math.min(vp.clientWidth-260,px+16)+'px';tip.style.top=Math.max(8,py-42)+'px';vp.style.cursor='pointer';}else{tip.hidden=true;vp.style.cursor='';}});
 vp.addEventListener('pointerleave',()=>{tip.hidden=true;if(hover){hover=null;schedule();}});
 vp.addEventListener('click',e=>{if(adding||moved||e.target.closest('aside,.map-controls,button'))return;const r=vp.getBoundingClientRect(),o=hitAt(e.clientX-r.left,e.clientY-r.top);if(!o)return;e.stopPropagation();if(o.c){popup(`${EXTRAS[o.c.t]?.name||o.c.t}${got.has(o.c.n)?' · 획득함':''} · X ${o.c.x}, Y ${o.c.y}, Z ${o.c.z} cm · 원판 게임 맵 배치 (SF+ 변경·획득 여부 미반영)`);return;}const n=o.n;popup(`${label(n.resource)} · ${pureNames[n.purity]||n.purity} · ${nodeNames[n.nodeType]||n.nodeType} · X ${n.x}, Y ${n.y}, Z ${n.z} cm · ${n.fromSave?'세이브 '+(window.SFP_SAVE?.file||'')+' 실제 자원·순도':n.source==='mod-level-asset'?'모드 에셋 배치 · 활성화 미검증':'원판 1.0 참고 좌표'}`);});
 circle=function(px,py,r,color){return svg('circle',{cx:px*1000,cy:py*1000,r:r*1000/(base*Math.sqrt(z)),fill:color});};
 function apply(){surface.style.width=base+'px';surface.style.transform=`translate(${x}px,${y}px) scale(${z})`;$('zoom').value=z;schedule();clearTimeout(settle);settle=setTimeout(()=>{renderMap();window.dispatchEvent(new Event('mapviewchange'));},180);}
 function fit(){cancelAnimationFrame(animation);if(!vp.clientWidth)return;base=Math.min(vp.clientWidth,vp.clientHeight);z=1;x=(vp.clientWidth-base)/2;y=(vp.clientHeight-base)/2;ready=true;apply();}
 function zoom(next,px=vp.clientWidth/2,py=vp.clientHeight/2){next=Math.max(1,Math.min(16,next));x=px-(px-x)*next/z;y=py-(py-y)*next/z;z=next;apply();}
 window.SFMap={focus(px,py,scale){if(!ready)fit();z=Math.max(1,Math.min(16,scale));x=vp.clientWidth/2-px*base*z;y=vp.clientHeight/2-py*base*z;apply();},get view(){return {x,y,z,base};}};
 vp.addEventListener('wheel',e=>{e.preventDefault();const r=vp.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;cancelAnimationFrame(animation);targetZoom=Math.max(1,Math.min(16,z*Math.exp(-Math.max(-120,Math.min(120,e.deltaY))*.004)));function step(){const next=z+(targetZoom-z)*.3;zoom(Math.abs(next-targetZoom)<.002?targetZoom:next,px,py);if(z!==targetZoom)animation=requestAnimationFrame(step);}step();},{passive:false});
 vp.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('button'))return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,ox:x,oy:y};moved=false;});
 vp.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>4){moved=true;vp.setPointerCapture(e.pointerId);vp.classList.add('dragging');x=drag.ox+dx;y=drag.oy+dy;apply();}});
 function end(){drag=null;vp.classList.remove('dragging');}vp.addEventListener('pointerup',end);vp.addEventListener('pointercancel',end);
 vp.addEventListener('click',e=>{if(moved){e.stopImmediatePropagation();setTimeout(()=>moved=false,0);}},{capture:true});
 $('zoomIn').onclick=()=>zoom(z*1.5);$('zoomOut').onclick=()=>zoom(z/1.5);$('fitMap').onclick=$('resetMap').onclick=fit;
 $('zoom').oninput=()=>zoom(Number($('zoom').value));
 $('toggleFilters').onclick=()=>{const collapsed=$('mapPanel').classList.toggle('filters-collapsed');$('toggleFilters').setAttribute('aria-expanded',!collapsed);};
 vp.addEventListener('keydown',e=>{if(e.target!==vp)return;const step=70;if(e.key==='+'||e.key==='=')zoom(z*1.5);else if(e.key==='-')zoom(z/1.5);else if(e.key==='Home')fit();else if(e.key.startsWith('Arrow')){e.preventDefault();x+=e.key==='ArrowLeft'?step:e.key==='ArrowRight'?-step:0;y+=e.key==='ArrowUp'?step:e.key==='ArrowDown'?-step:0;apply();}});
 $('mapTab').addEventListener('click',()=>{if(!ready)fit();});new ResizeObserver(()=>{if(!vp.clientWidth)return;if(!ready)fit();else{const old=base;const next=Math.min(vp.clientWidth,vp.clientHeight);x=vp.clientWidth/2-(vp.clientWidth/2-x)*next/old;y=vp.clientHeight/2-(vp.clientHeight/2-y)*next/old;base=next;apply();}}).observe(vp);
 window.addEventListener('load',()=>{filters();renderMap();});
 filters();renderMap();
})();
