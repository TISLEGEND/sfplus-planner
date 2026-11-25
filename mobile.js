// 모바일·터치 지원: 핀치 확대, 길게 누르기 = 우클릭 메뉴, 선택 모드, 터치용 안내 문구.
// 마우스 입력(pointerType 'mouse')은 전혀 건드리지 않는다.
(function(){
 'use strict';
 const coarse=()=>matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0;
 const VIEWS=['#gCanvas','#mapViewport','#alViewport'];
 const LONG_MS=520,MOVE_TOL=10;
 const touches=new Map();
 let pinch=null,longTimer=0,longFired=false,longStart=null,suppressClickUntil=0,lastTouchAt=-Infinity,selectMode=false;
 const synthetic=new WeakSet();

 function viewOf(t){for(const s of VIEWS){const v=t&&t.closest&&t.closest(s);if(v)return v;}return null;}
 function mid(){const p=[...touches.values()];return{x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,d:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)};}
 function cancelDrag(view,id,x,y){try{const ev=new PointerEvent('pointercancel',{bubbles:true,pointerId:id,pointerType:'touch',clientX:x,clientY:y});synthetic.add(ev);view.dispatchEvent(ev);}catch{}}
 function zoomView(view,ratio,x,y){
  if(!isFinite(ratio)||ratio<=0||Math.abs(ratio-1)<.002)return;
  if(view.id==='mapViewport'&&window.SFMap?.zoomBy){const r=view.getBoundingClientRect();window.SFMap.zoomBy(ratio,x-r.left,y-r.top);return;}
  const k=view.id==='gCanvas'?100/Math.log(1.3):1/.0015;
  const ev=new WheelEvent('wheel',{bubbles:true,cancelable:true,clientX:x,clientY:y,deltaY:-Math.log(ratio)*k,deltaMode:0});
  synthetic.add(ev);view.dispatchEvent(ev);
 }
 function clearLong(){clearTimeout(longTimer);longTimer=0;}
 function fireLong(){
  longTimer=0;if(!longStart||touches.size!==1)return;
  const {x,y,id,view}=longStart;longFired=true;suppressClickUntil=performance.now()+700;
  cancelDrag(view,id,x,y);
  const target=document.elementFromPoint(x,y)||view;
  const ev=new MouseEvent('contextmenu',{bubbles:true,cancelable:true,clientX:x,clientY:y,button:2,buttons:0,view:window});
  synthetic.add(ev);target.dispatchEvent(ev);
  if(navigator.vibrate)try{navigator.vibrate(15);}catch{}
 }

 window.addEventListener('pointerdown',e=>{
  if(e.pointerType!=='touch'||synthetic.has(e))return;
  lastTouchAt=performance.now();
  const view=viewOf(e.target);if(!view)return;
  touches.set(e.pointerId,{x:e.clientX,y:e.clientY,view});
  if(touches.size===2){
   clearLong();longStart=null;
   const first=[...touches.keys()].find(k=>k!==e.pointerId),p=touches.get(first);
   cancelDrag(view,first,p.x,p.y);
   const m=mid();pinch={view,d:m.d,x:m.x,y:m.y};
   e.stopImmediatePropagation();e.preventDefault();return;
  }
  if(touches.size>2){e.stopImmediatePropagation();e.preventDefault();return;}
  longFired=false;longStart={x:e.clientX,y:e.clientY,id:e.pointerId,view};
  clearLong();longTimer=setTimeout(fireLong,LONG_MS);
  if(selectMode&&view.id==='gCanvas'&&!e.target.closest('button,input,select,textarea,.g-port,[data-direction]')){
   // 선택 모드: 노드 탭 = Ctrl+클릭(여러 개 선택), 빈 곳 드래그 = 범위 선택
   e.stopImmediatePropagation();e.preventDefault();
   const onNode=!!e.target.closest('.graph-node');
   const ev=new PointerEvent('pointerdown',{bubbles:true,cancelable:true,composed:true,pointerId:e.pointerId,pointerType:'touch',isPrimary:true,clientX:e.clientX,clientY:e.clientY,button:0,buttons:1,ctrlKey:onNode,shiftKey:!onNode});
   synthetic.add(ev);e.target.dispatchEvent(ev);
  }
 },true);

 window.addEventListener('pointermove',e=>{
  if(e.pointerType!=='touch'||synthetic.has(e)||!touches.has(e.pointerId))return;
  const t=touches.get(e.pointerId);t.x=e.clientX;t.y=e.clientY;
  if(longStart&&Math.hypot(e.clientX-longStart.x,e.clientY-longStart.y)>MOVE_TOL){clearLong();longStart=null;}
  if(pinch&&touches.size>=2){
   e.stopImmediatePropagation();e.preventDefault();
   const m=mid();
   if(m.d>0&&pinch.d>0)zoomView(pinch.view,m.d/pinch.d,m.x,m.y);
   pinch.d=m.d;pinch.x=m.x;pinch.y=m.y;return;
  }
  if(longFired){e.stopImmediatePropagation();}
 },true);

 function up(e){
  if(e.pointerType!=='touch'||synthetic.has(e)||!touches.has(e.pointerId))return;
  touches.delete(e.pointerId);lastTouchAt=performance.now();
  if(e.pointerId===longStart?.id){clearLong();longStart=null;}
  if(pinch){e.stopImmediatePropagation();if(touches.size<2)pinch=touches.size?{...pinch,ending:true}:null;if(!touches.size)pinch=null;return;}
  if(longFired){e.stopImmediatePropagation();if(!touches.size)longFired=false;}
 }
 window.addEventListener('pointerup',up,true);
 window.addEventListener('pointercancel',up,true);

 // 터치 뒤에 브라우저가 스스로 띄우는 contextmenu(안드로이드 길게 누르기)는 우리 것과 겹치지 않게 막는다.
 window.addEventListener('contextmenu',e=>{
  if(synthetic.has(e))return;
  if(performance.now()-lastTouchAt<900||touches.size){e.preventDefault();e.stopImmediatePropagation();}
 },true);
 window.addEventListener('click',e=>{
  if(performance.now()<suppressClickUntil&&viewOf(e.target)){e.preventDefault();e.stopImmediatePropagation();return;}
  if(selectMode&&e.pointerType==='touch'&&e.target.closest?.('#gCanvas .graph-node')&&!e.target.closest('button,input,.g-max')){e.preventDefault();e.stopImmediatePropagation();}
 },true);
 // iOS 사파리의 길게 누르기 텍스트 선택·돋보기를 막는다.
 document.addEventListener('selectstart',e=>{if(viewOf(e.target)&&performance.now()-lastTouchAt<900)e.preventDefault();},true);

 // 터치용 안내 문구
 const WELCOME='빈 곳을 <b>길게 누르거나</b> <b>＋ 노드 추가</b>로 노드를 놓아요<br><small>한 손가락: 이동 · 두 손가락: 확대 · 노드 길게 누르기: 메뉴 · 포트 → 포트 차례로 톡: 연결</small>';
 const TOUCH_HELP={
  '지도 조작':'<ul><li>한 손가락 드래그: 지도 이동</li><li>두 손가락 벌리기·오므리기 / <b>+</b> <b>−</b> 버튼: 확대·축소</li><li>점 톡: 그 자원의 종류·순도·좌표</li></ul><p>수집품은 세이브 기준으로 이미 먹은 건 빼고 남은 것만 보여 줘요.</p>',
  '노드 추가':'<p>레시피·채굴기·물류(분배기, 합류기, 창고, AWESOME Sink 등)를 검색해서 놓아요. 빈 캔버스를 <b>길게 눌러도</b> 같은 메뉴가 떠요.</p>',
  '캔버스 조작':'<ul><li>한 손가락 드래그: 화면 이동, 두 손가락: 확대·축소</li><li>노드 드래그: 옮기기, 노드 톡: 상세 보기</li><li>길게 누르기: 메뉴 (노드 위면 수량·클럭·복제·삭제)</li><li>포트 톡 → 다른 노드 포트 톡: 연결</li><li>오른쪽 아래 <b>선택</b> 버튼을 켜면 노드 톡으로 여러 개 고르고, 빈 곳을 끌어 범위 선택해요</li></ul>',
  '묶음 (그룹)':'<p><b>선택</b> 버튼을 켜고 노드 여러 개를 고른 뒤 길게 누르기 → <b>선택한 것 묶기</b>를 하면 하나의 상자로 접혀요. 묶음을 두 번 톡 하면 안으로 들어가요. 층별·구역별로 정리할 때 좋아요.</p>',
  '단축키 모음':'<p>폰에서는 키보드 대신 길게 누르기 메뉴에서 복제·삭제·묶기를 쓰면 돼요. 되돌리기 기록은 창을 닫으면 사라지니 큰 작업 전엔 설계 설정 → 파일로 내보내기로 백업해 두세요.</p>'
 };
 window.SFTouchText=s=>coarse()?TOUCH_HELP[s.t]||null:null;

 function patchWelcome(){const w=document.getElementById('gWelcome');if(w&&coarse()&&w.dataset.touch!=='1'){w.innerHTML=WELCOME;w.dataset.touch='1';}}
 function ensureSelectButton(){
  const canvas=document.getElementById('gCanvas');if(!canvas||!coarse()||document.getElementById('gTouchSelect'))return;
  const b=document.createElement('button');b.id='gTouchSelect';b.type='button';b.textContent='선택';b.title='켜면 노드 톡으로 여러 개 선택, 빈 곳 드래그로 범위 선택';
  b.setAttribute('aria-pressed','false');
  b.addEventListener('pointerdown',e=>e.stopPropagation());
  b.addEventListener('click',e=>{e.stopPropagation();selectMode=!selectMode;b.classList.toggle('on',selectMode);b.setAttribute('aria-pressed',String(selectMode));});
  document.getElementById('graphPanel').append(b);
 }
 const TEXT_SWAPS=[
  ['연결선에 마우스를 올려 흐름 확인 · 휠 확대 · F 전체 보기','연결선 톡: 흐름 확인 · 두 손가락: 확대'],
  ['드래그로 이동 · 휠로 확대합니다.','한 손가락으로 이동 · 두 손가락으로 확대합니다.'],
  ['노드를 클릭하면 세부 정보를 확인합니다.','노드를 톡 하면 세부 정보를 확인합니다.'],
  ['추가 모드를 켜고 지도를 클릭하세요.','추가 모드를 켜고 지도를 톡 하세요.']
 ];
 function swapTexts(){
  if(!coarse())return;
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while((n=w.nextNode())){const v=n.nodeValue;if(!v||v.length<6)continue;let o=v;for(const [a,b] of TEXT_SWAPS)if(o.includes(a))o=o.split(a).join(b);if(o!==v)n.nodeValue=o;}
 }
 let swapQueued=false;
 function tick(){patchWelcome();ensureSelectButton();if(!swapQueued){swapQueued=true;requestAnimationFrame(()=>{swapQueued=false;swapTexts();});}}
 if(coarse())document.documentElement.classList.add('touch-ui');
 new MutationObserver(tick).observe(document.body,{childList:true,subtree:true});
 tick();
 window.SFTouch={get selectMode(){return selectMode;}};
})();
