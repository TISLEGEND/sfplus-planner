// 세이브 오버레이: data/save-data.js(tools/saveparse/extract-save.mjs로 생성)를 월드맵 위에 그린다.
(function () {
  const S = window.SFP_SAVE, E = window.SFEngine;
  if (!S || !E) return;
  const $ = id => document.getElementById(id);
  const P = (x, y) => { const p = E.project(x, y); return [p.x * 1000, p.y * 1000]; };
  const kindOf = c => /Foundation(?!Passthrough)|Ramp|Roof/i.test(c)?'foundation':/Wall_/i.test(c)?'wall':/Miner|MiningHead|Extractor|WaterPump|Fracking|OilPump|Drill/i.test(c)?'miner'
    : /Generator|PowerStorage|Battery/i.test(c)?'power':/Storage|Container|Sink|Dimensional/i.test(c)?'storage'
    : /Splitter|Merger|Lift|Passthrough|Pole|PowerTower|Pipeline|Pump|Valve|Junction/i.test(c)?'logistics'
    : /Constructor|Assembler|Manufacturer|Smelter|Foundry|Refinery|Blender|Packager|Crusher|Cleaner|Collider|Converter|Encoder|Mixer|Furnace|Press|Kiln|Sorter|Bench|Workshop|Machine/i.test(c)?'production':'other';
  const kinds = {foundation:['토대·경사로·지붕','#747b80'],wall:['벽','#bdc4c7'],production:['생산 기계 (종류별 색)','#4dd5ad'],miner:['채굴·추출','#ff9e45'],power:['발전','#ffcf58'],storage:['보관·싱크','#bd83ed'],logistics:['분배·리프트·전주','#a8bac8'],other:['기타 구조물','#8295aa']};
  const machineColors={ConstructorMk1:'#48cdb0',SmelterMk1:'#ed9363',FoundryMk1:'#d9ad61',AssemblerMk1:'#6db7e8',Crusher:'#ef7c64',SorterMk1:'#e695bd',Cleaner2:'#7bd2c4',SoldifierAndCooler:'#79a4dc'};
  const buildingColor=(b,k)=>machineColors[b.c]||kinds[k][1];
  const show=Object.fromEntries(Object.keys(kinds).map(k=>[k,true]));
  let showBelts=true,showWires=true,on=true,focusClass='';
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),vp=$('mapViewport');
  canvas.id='saveLayer';canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
  $('mapSurface').after(canvas);
  const xy=(x,y)=>{const p=E.project(x,y);return [p.x,p.y];};
  // Index world-space bounding boxes once. Curves use the Bezier control hull for safe culling.
  const entries=[],grid=new Map(),large=[],CELL=.025;
  function entry(type,points,data,k,path){
    const xs=points.filter((_,i)=>i%2===0),ys=points.filter((_,i)=>i%2===1);
    if(!points.length||points.some(v=>!Number.isFinite(v)))return;
    const a={type,data,k,path,points,bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)]};entries.push(a);
    const [x0,y0,x1,y1]=a.bounds.map(v=>Math.floor(v/CELL));
    if((x1-x0+1)*(y1-y0+1)>256){large.push(a);return;}
    for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++){const key=x+','+y;if(!grid.has(key))grid.set(key,[]);grid.get(key).push(a);}
  }
  for(const b of S.buildings){
    const k=kindOf(b.c),p=(b.fp||[]).flatMap((_,i,a)=>i%2?[]:xy(a[i],a[i+1])),path=new Path2D();
    if(p.length){path.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)path.lineTo(p[i],p[i+1]);path.closePath();}
    const center=xy(b.x,b.y);entry('building',p.length?p:center,b,k,path);
  }
  for(const b of S.belts){const path=new Path2D(),hull=[];
    // Cubic Hermite to Bezier: P0 + leave/3 and P1 - arrive/3.
    if(b.spline?.length>1){const ss=b.spline;let p=xy(...ss[0].p);path.moveTo(...p);hull.push(...p);
      for(let i=1;i<ss.length;i++){const a=ss[i-1],b=ss[i],c1=xy(a.p[0]+a.l[0]/3,a.p[1]+a.l[1]/3),c2=xy(b.p[0]-b.a[0]/3,b.p[1]-b.a[1]/3),p=xy(...b.p);path.bezierCurveTo(...c1,...c2,...p);hull.push(...c1,...c2,...p);}
    }else for(let i=0;i<b.p.length;i+=2){const p=xy(b.p[i],b.p[i+1]);i?path.lineTo(...p):path.moveTo(...p);hull.push(...p);}
    entry('belt',hull,b,/Pipe/i.test(b.c)?'pipe':'belt',path);
  }
  for(const w of S.wires){const a=xy(w[0],w[1]),b=xy(w[2],w[3]),path=new Path2D();path.moveTo(...a);path.lineTo(...b);entry('wire',[...a,...b],w,'wire',path);}
  function candidates(bounds){const [x0,y0,x1,y1]=bounds.map(v=>Math.floor(v/CELL)),set=new Set(large);
    for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++)for(const a of grid.get(x+','+y)||[])set.add(a);
    return [...set].filter(a=>a.bounds[2]>=bounds[0]&&a.bounds[0]<=bounds[2]&&a.bounds[3]>=bounds[1]&&a.bounds[1]<=bounds[3]);
  }
  const states={NoPower:'전력 없음',Producing:'가동 중',Idle:'대기',Standby:'정지',OutputFull:'출력 가득',NoInput:'재료 없음'};
  function info(b){$('nodeInfo').textContent='세이브 건물 · '+[b.c,b.recipe&&'레시피 '+b.recipe,b.clock!=null&&'클럭 '+b.clock+'%',states[b.state]||b.state,b.on&&'가동 중',`X ${b.x}, Y ${b.y}, Z ${b.z} cm`,b.fp?'크기 근거: '+S.dimensionEvidence?.[b.c]?.quality:'크기 미확인 · 점 표시'].filter(Boolean).join(' · ');$('nodeInfo').classList.add('open');}
  let frame=0,visible=[],stats={};
  const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
  function draw(){
    const started=performance.now(),v=window.SFMap?.view;if(!v||!vp.clientWidth)return;
    const w=vp.clientWidth,h=vp.clientHeight,dpr=devicePixelRatio||1,W=v.base*v.z;
    if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
    ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);visible=[];
    stats={total:entries.length,candidates:0,drawn:0,footprints:0,points:0,wires:0,curves:0,ms:0};if(!on){window.SFSaveOverlay.stats=stats;return;}
    ctx.setTransform(dpr*W,0,0,dpr*W,dpr*v.x,dpr*v.y);ctx.lineJoin='round';ctx.lineCap='round';
    const list=candidates([(-v.x-8)/W,(-v.y-8)/W,(w-v.x+8)/W,(h-v.y+8)/W]);stats.candidates=list.length;
    const batches=new Map();
    function batch(key,path,color,stroke,width,alpha){if(!batches.has(key))batches.set(key,{path:new Path2D(),color,stroke,width,alpha});batches.get(key).path.addPath(path);}
    for(const a of list){
      if(a.type==='wire'){if(showWires){batch('2wire',a.path,'#f1cb60',true,.65,.65);stats.wires++;}continue;}
      if(a.type==='belt'){if(showBelts){batch('3'+a.k,a.path,a.k==='pipe'?'#62baff':'#ecdfbd',true,a.k==='pipe'?1.65:1.25,.92);stats.curves++;}continue;}
      const b=a.data,hit=!!focusClass&&b.c===focusClass;if(!show[a.k]&&!hit)continue;
      const dot=/Pole|PowerTower/i.test(b.c)||!b.fp,size=(a.k==='wall'?Math.max:Math.min)(a.bounds[2]-a.bounds[0],a.bounds[3]-a.bounds[1])*W;
      const blend=dot?0:smooth((size-.9)/2.6),level=Math.round(blend*8)/8,color=buildingColor(b,a.k),order=a.k==='foundation'?'0':a.k==='wall'?'1':'4';
      if(level>0){batch(order+a.k+color+level,a.path,color,false,.65,level);batch(order+a.k+color+level+'edge',a.path,a.k==='foundation'?'#353f46':a.k==='wall'?color:'#182a31',true,a.k==='foundation'?.55:.7,level);stats.footprints++;}
      if(level<1){const p=xy(b.x,b.y),path=new Path2D();path.arc(...p,(dot?1.65:1.35)/W,0,Math.PI*2);batch(order+a.k+color+'dot'+level,path,color,false,0,(1-level)*.9);stats.points++;}
      if(hit){const path=a.points.length>2?a.path:new Path2D();if(a.points.length===2)path.arc(a.points[0],a.points[1],4/W,0,Math.PI*2);batch('9highlight',path,'#ff4d79',true,2.5,1);}
      visible.push({...a,dot:dot||level<.5});
    }
    for(const [key,b]of [...batches].sort((a,b)=>a[0].localeCompare(b[0]))){ctx.globalAlpha=b.alpha;ctx.lineWidth=b.width/W;ctx.fillStyle=ctx.strokeStyle=b.color;b.stroke?ctx.stroke(b.path):ctx.fill(b.path);}
    ctx.globalAlpha=1;
    S.players.forEach((p,i)=>{const [x,y]=xy(p.x,p.y);if(x*W+v.x<-8||x*W+v.x>w+8||y*W+v.y<-8||y*W+v.y>h+8)return;ctx.beginPath();ctx.arc(x,y,5/W,0,Math.PI*2);ctx.fillStyle='#ff4d9a';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5/W;ctx.stroke();visible.push({type:'player',data:p,index:i,points:[x,y],dot:true});});
    const priority=a=>a.type==='player'?3:a.k==='foundation'?0:a.k==='wall'?1:2;
    visible.sort((a,b)=>priority(a)-priority(b));
    stats.drawn=visible.length;stats.ms=performance.now()-started;window.SFSaveOverlay.stats=stats;
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;draw();});}
  function pick(px,py){if(!on)return null;const v=window.SFMap.view,W=v.base*v.z,x=(px-v.x)/W,y=(py-v.y)/W;
    for(let i=visible.length-1;i>=0;i--){const a=visible[i],p=a.type==='player'?a.points:xy(a.data.x,a.data.y);
      if(a.dot){if(Math.hypot(x-p[0],y-p[1])*W<=5)return a;}else if(a.k==='wall'){const p=a.points,dx=p[2]-p[0],dy=p[3]-p[1],d=dx*dx+dy*dy,t=d?Math.max(0,Math.min(1,((x-p[0])*dx+(y-p[1])*dy)/d)):0;if(Math.hypot(x-p[0]-t*dx,y-p[1]-t*dy)*W<4)return a;}else {let inside=false;const p=a.points;for(let j=0,k=p.length-2;j<p.length;k=j,j+=2)if((p[j+1]>y)!==(p[k+1]>y)&&x<(p[k]-p[j])*(y-p[j+1])/(p[k+1]-p[j+1])+p[j])inside=!inside;if(inside)return a;}
    }return null;
  }
  vp.addEventListener('click',e=>{if(e.target.closest('aside,button,.map-controls')||window.SFMap?.hitAt?.(e.clientX-vp.getBoundingClientRect().left,e.clientY-vp.getBoundingClientRect().top))return;const r=vp.getBoundingClientRect(),a=pick(e.clientX-r.left,e.clientY-r.top);if(!a)return;e.stopPropagation();if(a.type==='player'){$('nodeInfo').textContent=`플레이어 ${a.index+1} 마지막 위치 · X ${a.data.x}, Y ${a.data.y}, Z ${a.data.z} cm`;$('nodeInfo').classList.add('open');}else info(a.data);});
  window.SFSaveOverlay={schedule,draw,pick,stats};

  function focus(list) {
    if (!list.length) return;
    const xs = list.map(p => p[0]), ys = list.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const span = Math.max(x1 - x0, y1 - y0, 8);
    window.SFMap.focus((x0+x1)/2000,(y0+y1)/2000,Math.min(16,800/span));
  }

  // 사이드 패널
  window.addEventListener('mapviewchange', schedule);
  $('zoom').max = 16;
  const zoomInput = $('zoom').oninput;
  $('zoom').oninput = () => { zoomInput(); if (typeof renderMap === 'function') renderMap(); draw(); };
  const box = document.createElement('div');
  box.className = 'savebox';
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  box.innerHTML = `<div class="eyebrow">SAVE OVERLAY</div><h2>세이브 · ${escape(S.name)}</h2>
    <p class="small muted">${escape(S.file)}<br>저장 ${new Date(S.savedAt).toLocaleString('ko-KR')}${S.playHours != null ? ' · 플레이 ' + S.playHours + '시간' : ''}<br>건물 ${S.buildings.length} · 벨트/파이프 ${S.belts.length} · 전선 ${S.wires.length}</p>
    <label>기지로 이동<select id="saveBase"></select></label><button id="saveFocusPlayer">플레이어 위치로</button>
    <div id="saveToggles"></div><label>건물 찾기<select id="saveClass"><option value="">강조 없음</option></select></label>
    <p class="small muted">회색 격자: 토대 · 색 블록: 크기 근거가 있는 건물 · 작은 점: 전주 또는 크기 미확인 건물. 확대하면 윤곽으로 전환합니다.</p>
    <p class="small muted">세이브가 바뀌면 refresh-save.cmd를 실행한 뒤 새로고침하세요.</p>`;
  $('markerList').before(box);
  const check = (label, val, fn, color) => {
    const l = document.createElement('label'), i = document.createElement('input'), s = document.createElement('span');
    l.className = 'savecheck'; i.type = 'checkbox'; i.checked = val; i.onchange = () => { fn(i.checked); draw(); };
    s.textContent = label; if (color) l.style.setProperty('--dot', color); l.append(i, s); $('saveToggles').append(l);
  };
  check('세이브 표시', on, v => on = v);
  check(`벨트·파이프 ${S.belts.length}`, showBelts, v => showBelts = v, '#e9eef5');
  check(`전선 ${S.wires.length}`, showWires, v => showWires = v, '#ffe066');
  const per = {}; for (const b of S.buildings) { const k = kindOf(b.c); per[k] = (per[k] || 0) + 1; }
  for (const [k, [label, color]] of Object.entries(kinds)) if (per[k]) check(`${label} ${per[k]}`, show[k], v => show[k] = v, color);
  const perClass = {}; for (const b of S.buildings) perClass[b.c] = (perClass[b.c] || 0) + 1;
  for (const [c, n] of Object.entries(perClass).sort((a, b) => b[1] - a[1])) { const o = document.createElement('option'); o.value = c; o.textContent = `${c} × ${n}`; $('saveClass').append(o); }
  $('saveClass').onchange = () => { focusClass = $('saveClass').value; draw(); if (focusClass) focus(S.buildings.filter(b => b.c === focusClass).map(b => P(b.x, b.y))); };
  // 300m 안에 이어진 건물끼리 한 기지로 묶는다
  const bases=[],seen=new Set(),cells=new Map(),cellKey=(x,y)=>x+','+y;
  S.buildings.forEach((b,i)=>{const k=cellKey(Math.floor(b.x/30000),Math.floor(b.y/30000));if(!cells.has(k))cells.set(k,new Set());cells.get(k).add(i);});
  for(let i=0;i<S.buildings.length;i++){
    if(seen.has(i))continue;const group=[],q=[i];seen.add(i);
    while(q.length){const j=q.pop(),a=S.buildings[j];group.push(a);const cx=Math.floor(a.x/30000),cy=Math.floor(a.y/30000);
      for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){const cell=cells.get(cellKey(cx+dx,cy+dy));if(!cell)continue;for(const k of cell){if(seen.has(k)){cell.delete(k);continue;}const b=S.buildings[k];if((a.x-b.x)**2+(a.y-b.y)**2<900000000){seen.add(k);cell.delete(k);q.push(k);}}}}
    bases.push(group);
  }
  bases.sort((a, b) => b.length - a.length);
  bases.forEach((g, i) => { const o = document.createElement('option'); o.value = i; const c = g.filter(b => kindOf(b.c) === 'production').length; o.textContent = `기지 ${i + 1} · 건물 ${g.length}${c ? ' · 생산 ' + c : ''}`; $('saveBase').append(o); });
  const all = document.createElement('option'); all.value = 'all'; all.textContent = '전체 건물'; $('saveBase').append(all);
  $('saveBase').onchange = () => focus(($('saveBase').value === 'all' ? S.buildings : bases[$('saveBase').value]).map(b => P(b.x, b.y)));
  $('saveFocusPlayer').onclick = () => focus(S.players.map(p => P(p.x, p.y)));
  draw();
  let first = false;
  $('mapTab').addEventListener('click', () => { if (first) { first = false; setTimeout(() => $('saveBase').onchange(), 50); } });
})();
