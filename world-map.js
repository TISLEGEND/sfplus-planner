/* Local, offline world-map camera. World coordinates remain shared with save overlays. */
(() => {
 const vp=$('mapViewport'),surface=$('mapSurface'),tip=$('mapTooltip');
 let x=0,y=0,z=1,base=1,ready=false,drag=null,moved=false,raf=0,animation=0,targetZoom=1;
 const selected=new Set(); let lastData=null,icons={};
 const ko={Montanion:'몬타니온',Callanite:'칼라나이트',Aurovite:'아우로바이트',Siterite:'시테라이트',Kyalite:'카이알라이트','Montanion Ore':'몬타니온 광석','Callanite Ore':'칼라나이트 광석','Aurovite Ore':'아우로바이트 광석','Siterite Ore':'시테라이트 광석','Larrussite Ore':'라루사이트 광석',Peat:'이탄',Dirt:'흙',Loam:'양토','Chlorine Gas':'염소 가스','Algal Mass':'조류 덩어리','Kerr Crystal':'커 결정'};
 const label=id=>id==='Desc_GeothermalEnergy_C'?'간헐천':(window.KO_NAMES?.[name(id)]||ko[name(id)]||name(id));
 function icon(id){const k=id==='Desc_GeothermalEnergy_C'?'Desc_GeneratorGeoThermal_C':id,pre=window.SFPLUS_ICONS?.[k];if(pre?.src)return pre.src;const entry=icons[k];return entry?.icon?'assets/sfplus_icons/'+entry.icon:null;}
 function image(id){const img=make('img');img.alt=label(id);const url=icon(id);if(url)img.src=url;return img;}
 function filters(){
  if(lastData!==D){selected.clear();D.nodes.forEach(n=>selected.add(n.resource));lastData=D;}
  const box=$('resourceFilters');box.replaceChildren(); const title=make('div','자원 레이어','eyebrow');box.append(title);
  const all=make('button','모두 선택'),none=make('button','모두 해제');all.onclick=()=>{D.nodes.forEach(n=>selected.add(n.resource));filters();renderMap();};none.onclick=()=>{selected.clear();filters();renderMap();};const actions=make('div',undefined,'pair');actions.append(all,none);box.append(actions);
  for(const id of [...new Set(D.nodes.map(n=>n.resource))]){const row=make('label',undefined,'resource-check'),check=make('input');check.type='checkbox';check.checked=selected.has(id);check.onchange=()=>{check.checked?selected.add(id):selected.delete(id);renderMap();};row.append(check,image(id),make('span',label(id)),make('b',D.nodes.filter(n=>n.resource===id).length));box.append(row);}
  const type=$('nodeType'),old=type.value;type.replaceChildren();option(type,'','모든 종류');for(const t of new Set(D.nodes.map(n=>n.nodeType)))option(type,t,nodeNames[t]||t);type.value=old;
 }
 const oldUpdate=updateResources;updateResources=function(){oldUpdate();filters();};
 function svg(tag,attrs){const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);return e;}
 function popup(text){$('nodeInfo').textContent=text;$('nodeInfo').classList.add('open');}
 renderMap=function(){
  if(lastData!==D)filters();const layer=$('nodeLayer');layer.replaceChildren();let count=0;
  const size=(13+Math.min(21,Math.log2(z)*6))*1000/(base*z);
  for(const n of D.nodes){if(!selected.has(n.resource)||$('purity').value&&n.purity!==$('purity').value||$('nodeType').value&&n.nodeType!==$('nodeType').value)continue;
   const p=E.project(n.x,n.y),g=svg('g',{class:'resource-marker',tabindex:0,role:'button','aria-label':`${label(n.resource)} · ${pureNames[n.purity]||n.purity} · ${nodeNames[n.nodeType]||n.nodeType}`}),cx=p.x*1000,cy=p.y*1000;
   g.append(svg('rect',{x:cx-size/2,y:cy-size/2,width:size,height:size,rx:size*.2,fill:'#101b24',stroke:({pure:'#74efbc',normal:'#f7cf66',impure:'#ed7b7b',unknown:'#9faebe'})[n.purity]||'#9faebe','stroke-width':2,'vector-effect':'non-scaling-stroke'}));
   const url=icon(n.resource);if(url)g.append(svg('image',{href:url,x:cx-size*.44,y:cy-size*.44,width:size*.88,height:size*.88}));else{const t=svg('text',{x:cx,y:cy,'font-size':size*.65,'text-anchor':'middle','dominant-baseline':'central',fill:'white'});t.textContent='♨';g.append(t);}
   const text=g.getAttribute('aria-label');g.onpointerenter=()=>{tip.textContent=text;tip.hidden=false;};g.onpointermove=e=>{const r=vp.getBoundingClientRect();tip.style.left=Math.min(vp.clientWidth-260,e.clientX-r.left+16)+'px';tip.style.top=Math.max(8,e.clientY-r.top-42)+'px';};g.onpointerleave=()=>tip.hidden=true;
   const show=e=>{if(adding||moved)return;e.stopPropagation();popup(`${text} · X ${n.x}, Y ${n.y}, Z ${n.z} cm · ${n.source==='mod-level-asset'?'모드 에셋 배치 · 활성화 미검증':'원판 1.0 참고 좌표'}`);};g.onclick=show;g.onkeydown=e=>{if(e.key==='Enter')show(e);};layer.append(g);count++;
  }
  for(const m of markers){const c=circle(m.x,m.y,7,'#ff825b');c.onclick=e=>{if(adding||moved)return;e.stopPropagation();editMarker(m);};const title=svg('title',{});title.textContent=m.name;c.append(title);layer.append(c);}
  $('nodeCount').textContent=`${count} 지점`;$('markerList').replaceChildren();for(const m of markers){const b=make('button','◆ '+m.name);b.onclick=()=>editMarker(m);$('markerList').append(b);}
 };
 circle=function(px,py,r,color){return svg('circle',{cx:px*1000,cy:py*1000,r:r*1000/(base*Math.sqrt(z)),fill:color});};
 function apply(){surface.style.width=base+'px';surface.style.transform=`translate(${x}px,${y}px) scale(${z})`;$('zoom').value=z;tip.hidden=true;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{renderMap();window.dispatchEvent(new Event('mapviewchange'));});}
 function fit(){cancelAnimationFrame(animation);if(!vp.clientWidth)return;base=Math.min(vp.clientWidth,vp.clientHeight);z=1;x=(vp.clientWidth-base)/2;y=(vp.clientHeight-base)/2;ready=true;apply();}
 function zoom(next,px=vp.clientWidth/2,py=vp.clientHeight/2){next=Math.max(1,Math.min(40,next));x=px-(px-x)*next/z;y=py-(py-y)*next/z;z=next;apply();}
 window.SFMap={focus(px,py,scale){if(!ready)fit();z=Math.max(1,Math.min(40,scale));x=vp.clientWidth/2-px*base*z;y=vp.clientHeight/2-py*base*z;apply();},get view(){return {x,y,z,base};}};
 vp.addEventListener('wheel',e=>{e.preventDefault();const r=vp.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;cancelAnimationFrame(animation);targetZoom=Math.max(1,Math.min(40,z*Math.exp(-Math.max(-120,Math.min(120,e.deltaY))*.004)));function step(){const next=z+(targetZoom-z)*.3;zoom(Math.abs(next-targetZoom)<.002?targetZoom:next,px,py);if(z!==targetZoom)animation=requestAnimationFrame(step);}step();},{passive:false});
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
