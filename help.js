// 사이트 안 단계별 도움말 투어. 지정한 요소에 불을 비추고 옆에 설명 카드를 띄운다.
(()=>{
'use strict';
const is3D=location.pathname.endsWith('viewer3d.html'),SEEN='sfp-help-v1-seen'+(is3D?'-3d':'');
if(!document.querySelector('link[href$="help.css"]')){const l=document.createElement('link');l.rel='stylesheet';l.href='help.css';document.head.append(l);}

const $=s=>document.querySelector(s);
const byText=(sel,txt)=>()=>[...document.querySelectorAll(sel)].find(e=>e.textContent.includes(txt)&&visible(e));
function visible(e){if(!e)return false;const r=e.getBoundingClientRect(),cs=getComputedStyle(e);return r.width>2&&r.height>2&&cs.visibility!=='hidden'&&cs.display!=='none';}
const tab=id=>()=>{const t=$('#'+id);if(t&&!t.classList.contains('active'))t.click();};
const firstNode=()=>[...document.querySelectorAll('.graph-node')].find(visible);

// ── 투어 내용 ──
const T={};
T.plan=[
 {pre:tab('planTab'),el:'#planTab',t:'01 생산 플래너',b:'<p>"이거 분당 몇 개 만들려면 뭐가 얼마나 필요해?"를 한 번에 계산하는 곳이에요. 목표 하나를 넣으면 원자재까지 나무처럼 펼쳐서 보여 줍니다.</p>'},
 {el:()=>$('#planner .select-trigger'),t:'게임 데이터 고르기',b:'<p>SF+ 모드 레시피로 계산할지 고르는 칸이에요. 모드를 깔고 하고 있다면 그대로 두면 됩니다.</p>'},
 {el:'#search',t:'아이템 찾기',b:'<p>만들고 싶은 아이템 이름을 치면 아래 목록이 그 이름으로 좁혀져요.</p>'},
 {el:()=>document.querySelectorAll('#planner .select-trigger')[1],t:'목표 아이템',b:'<p>여기서 최종으로 만들 아이템을 고릅니다.</p>'},
 {el:'#rate',t:'분당 생산량',b:'<p>목표 아이템을 <b>1분에 몇 개</b> 만들지 적어요. 액체·기체는 m³ 단위예요.</p>'},
 {el:'#clock',t:'클럭 (%)',b:'<p>기계를 몇 %로 돌릴지예요. 100이면 기본 속도고, 낮추면 기계 수가 늘어나는 대신 전력이 줄어요.</p>'},
 {el:'#calculate',t:'생산 흐름 계산',b:'<p>누르면 오른쪽에 결과가 나와요. 숫자를 바꿨으면 다시 눌러 주세요.</p>'},
 {el:'#summary',t:'요약',b:'<p>목표 생산량, 필요한 기계 총 대수, 전력 합계가 한눈에 나와요.</p>'},
 {el:'#tree',t:'생산 흐름',b:'<p>목표부터 원자재까지 단계별로 펼쳐져요. 각 줄의 <b>레시피 칸을 눌러 대체 레시피로 바꾸면</b> 그 아래가 통째로 다시 계산돼요.</p>'},
 {el:'#raw',t:'원자재 · 외부 공급',b:'<p>결국 캐야 하는 광석과 끌어와야 하는 재료 총량이에요. 채굴기를 몇 개 놔야 하는지 여기서 보면 돼요.</p>'},
 {el:'#byproducts',t:'부산물',b:'<p>만들다 보면 덤으로 나오는 것들이에요. 처리할 곳(싱크·창고·다른 라인)을 꼭 정해 두세요. 안 그러면 기계가 막혀요.</p>'}
];
T.map=[
 {pre:tab('mapTab'),el:'#mapTab',t:'02 월드맵',b:'<p>맵 전체의 자원 노드, 자원정, 수집품 위치를 보는 곳이에요. 세이브가 연결돼 있으면 내 공장 건물도 같이 깔려요.</p>'},
 {el:'#mapResourceSearch',t:'자원 검색',b:'<p>"철", "Bauxite"처럼 한글·영어로 찾을 수 있어요.</p>'},
 {el:byText('#resourceFilters button','자원 노드'),t:'무엇을 표시할지',b:'<p><b>자원 노드</b>(채굴기 자리), <b>자원정</b>(유정·가스 등 추출기 자리), <b>수집품</b>(슬러그·소머슬루프·착륙정 등)을 켜고 끌 수 있어요. 바로 밑의 모두 켜기/끄기도 있어요.</p>'},
 {el:()=>$('#resourceFilters .res-btn'),t:'자원·순도별 켜고 끄기',b:'<p>자원마다 <b>불순 / 보통 / 순수</b> 버튼이 있고 숫자는 그 개수예요. 눌러서 끄면 지도에서 숨어요. "순수 철만 보고 싶다" 할 때 나머지를 끄면 돼요.</p>'},
 {el:'#mapViewport',t:'지도 조작',b:'<ul><li>드래그: 지도 이동</li><li>휠 / <kbd>+</kbd> <kbd>−</kbd>: 확대·축소</li><li>점 클릭: 그 자원의 종류·순도·좌표</li></ul><p>수집품은 세이브 기준으로 이미 먹은 건 빼고 남은 것만 보여 줘요.</p>'},
 {el:'#toggleFilters',t:'필터 패널',b:'<p>왼쪽 패널을 접어서 지도를 넓게 볼 수 있어요.</p>'},
 {el:'#fitMap',t:'전체 보기',b:'<p>길을 잃으면 이걸 누르면 맵 전체가 화면에 들어와요.</p>'}
];
T.graph=[
 {pre:tab('graphTab'),el:'#graphTab',t:'03 노드 그래프',b:'<p>기계를 노드로 놓고 선으로 이어서 <b>내 공장을 그대로 설계</b>하는 곳이에요. 연결한 대로 실제 흐름을 계산해서 모자란 곳, 남는 곳을 알려 줘요. 작업은 이 기기 브라우저에 자동 저장돼요.</p>'},
 {el:'#gAdd',t:'노드 추가',b:'<p>레시피·채굴기·물류(분배기, 합류기, 창고, AWESOME Sink 등)를 검색해서 놓아요. 빈 캔버스를 <b>우클릭</b>하거나 <b>두 번 클릭</b>해도 같은 메뉴가 떠요.</p>'},
 {el:'#gCanvas',t:'캔버스 조작',b:'<ul><li>빈 곳 드래그: 화면 이동, 휠: 확대</li><li>노드 드래그: 옮기기, <kbd>Ctrl</kbd>+클릭: 여러 개 선택</li><li>우클릭 드래그: 범위 선택</li><li><kbd>F</kbd>: 전체 보기, <kbd>Esc</kbd>: 메뉴 닫기·묶음 밖으로</li></ul>'},
 {el:()=>firstNode()||$('#gCanvas'),t:'노드와 연결',b:'<p>노드 양옆의 <b>동그란 아이콘이 포트</b>예요. 왼쪽은 들어가는 재료, 오른쪽은 나오는 결과물이에요.</p><p>출력 포트에서 다른 노드의 같은 아이템 입력 포트로 <b>끌어다 놓거나, 하나씩 클릭</b>하면 선이 이어져요.</p><p>노드를 우클릭하면 수량·클럭 변경, 복제, 삭제, 연결 해제가 나와요. 노드 숫자 칸에 기계 대수를 직접 적을 수도 있어요.</p>'},
 {el:'#gCanvas',t:'묶음 (그룹)',b:'<p>여러 노드를 선택하고 우클릭 → <b>선택한 것 묶기</b>를 하면 하나의 상자로 접혀요. 두 번 눌러 안으로 들어가고 <kbd>Esc</kbd>로 나와요. 층별·구역별로 정리할 때 좋아요.</p>'},
 {el:'#gSettings',t:'설계 설정',b:'<p>여기서 <b>계산 방식</b>을 고를 수 있어요.</p><ul><li><b>각자 따로 계산</b>(기본): 기계마다 정한 수량대로 돌리고, 모자라면 빨간 부족, 남으면 초록 잉여로 표시</li><li><b>제일 모자란 곳에 전체 맞추기</b>: 병목 재료에 맞춰 전체 가동량을 자동으로 줄임</li><li><b>싱크 기준으로 전체 맞추기</b>: 싱크에 넣는 양이 최대가 되게 조절</li></ul><p>숫자 표시(소수·분수), 게임 데이터 전환, 파일 내보내기·불러오기도 이 메뉴에 있어요.</p>'},
 {el:'#gExample1',t:'예제 불러오기',b:'<p>미리 짜 둔 초반·중반 예제 공장이에요. 처음이면 이걸 열어서 구경해 보세요. <b>지금 그래프가 예제로 바뀌니</b> 먼저 파일로 내보내 두거나, 열어 본 뒤 <kbd>Ctrl</kbd>+<kbd>Z</kbd>로 돌아오세요.</p>'},
 {el:'#gExpand',t:'거꾸로 자동 전개',b:'<p>만들 아이템과 분당 개수만 적으면 <b>원자재 채굴까지 필요한 기계를 전부 자동으로 그려</b> 줘요. 같은 재료는 노드 하나로 합치고, 단계별 레시피는 창 아래 목록에서 바꿀 수 있어요.</p><p>새 그래프는 <b>지금 그래프 아래에 덧붙고</b>, 마음에 안 들면 <kbd>Ctrl</kbd>+<kbd>Z</kbd>로 취소돼요.</p>'},
 {el:'#gGenerator',t:'발전 노드',b:'<p>발전기와 연료, 클럭을 고르면 발전량과 연료 소비를 계산하는 노드를 놓아요. 연료 공급 라인에 연결하면 전력 수지에 반영돼요.</p>'},
 {el:'#gTotals',t:'전력·기계 합계',b:'<p>그래프 전체의 기계 대수, 소비 전력, 발전량, <b>수지</b>(남는지 모자라는지)가 실시간으로 나와요.</p>'},
 {el:'#gShare',t:'링크 복사',b:'<p>지금 그래프를 통째로 담은 주소를 복사해요. 친구한테 보내면 그대로 열려요. 받은 쪽의 원래 작업은 덮어쓰지 않고 따로 열려요.</p>'},
 {el:'#gCanvas',t:'단축키 모음',b:'<ul><li><kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Ctrl</kbd>+<kbd>Y</kbd>: 되돌리기 / 다시</li><li><kbd>Ctrl</kbd>+<kbd>C</kbd> <kbd>X</kbd> <kbd>V</kbd>: 복사·잘라내기·붙여넣기</li><li><kbd>Ctrl</kbd>+<kbd>A</kbd>: 전체 선택, <kbd>Delete</kbd>: 삭제</li><li><kbd>Ctrl</kbd>+<kbd>S</kbd>: 저장, <kbd>Tab</kbd>: 메뉴</li></ul><p><b>중요:</b> 되돌리기 기록은 창을 닫으면 사라져요. 큰 작업 전엔 설계 설정 → 파일로 내보내기로 백업해 두세요.</p>'}
];
T.go3d=[
 {el:'#viewer3dTab',t:'04 세이브 3D',b:'<p>내 세이브 파일을 넣으면 실제 게임 모델과 지형 위에 공장을 3D로 둘러볼 수 있어요. 새 탭으로 열리고, 거기서 도움말 버튼을 누르면 3D 사용법이 나와요.</p><p>파일은 내 컴퓨터 안에서만 읽고 어디로도 올리지 않아요.</p>'}
];
T.v3d=[
 {el:'#viewport',t:'세이브 3D',b:'<p>세이브 속 건물을 게임 모델 그대로, 맵 지형 위에 다시 세운 화면이에요.</p><ul><li>좌클릭 드래그: 회전 (찍은 곳 중심)</li><li>우클릭 드래그 / <kbd>Shift</kbd>+드래그: 이동</li><li>휠: 확대·축소</li><li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>: 보는 방향으로 이동, <kbd>E</kbd>/<kbd>Space</kbd> 위, <kbd>Q</kbd>/<kbd>C</kbd> 아래, <kbd>Shift</kbd> 빠르게</li><li>건물 클릭: 정보 보기</li></ul>'},
 {el:'#saveFile',alt:()=>byText('label,button','.sav')(),t:'내 세이브 열기',b:'<p>내 .sav 파일을 고르거나 화면에 <b>끌어다 놓으면</b> 그 세이브로 바뀌어요. 세이브는 보통 <b>%LOCALAPPDATA%\\FactoryGame\\Saved\\SaveGames</b> 안에 있어요.</p>'},
 {el:'#home',t:'공장 전경',b:'<p>길을 잃으면 눌러서 공장 전체가 보이는 위치로 돌아가요.</p>'},
 {el:'#low',t:'저사양 모드',b:'<p>렉이 걸리면 켜세요. 화질과 모델 세밀도를 낮춰서 가볍게 돌아가요.</p>'},
 {el:()=>$('#walls')?.closest('label')||$('#walls'),t:'표시 옵션',b:'<p>벽·유리를 숨기면 건물 안이 보여요. 지형, 자원 노드, 전선도 각각 켜고 끌 수 있어요.</p>'},
 {el:()=>$('#minHeight')?.closest('label')||$('#minHeight'),t:'높이 필터',b:'<p>최저·최고 높이(m)를 적으면 그 높이의 층만 보여요. 여러 층 공장에서 한 층씩 볼 때 좋아요.</p>'},
 {el:'#search',t:'건물 찾기',b:'<p>한글 이름, 클래스, 좌표로 건물을 찾을 수 있어요. 목록에서 누르면 그 건물로 날아가요.</p>'},
 {el:'#stats',t:'상태 표시줄',b:'<p>보이는 건물 수, 게임 모델 / 상자 대체 개수, 고도가 나와요. 아직 모델을 못 뽑은 일부 건물(리프트, 사다리 등)은 상자로 보여요.</p>'}
];
const FULL=[...T.plan,...T.map,...T.graph,...T.go3d];

// ── 실행기 ──
let steps=[],i=0,shade,spot,card;
function resolve(s){let e=typeof s.el==='function'?s.el():$(s.el);if(!visible(e)&&s.alt)e=s.alt();return visible(e)?e:null;}
function build(){if(card)return;shade=document.createElement('div');shade.id='hlpShade';spot=document.createElement('div');spot.id='hlpSpot';card=document.createElement('div');card.id='hlpCard';card.setAttribute('role','dialog');document.body.append(shade,spot,card);shade.onclick=()=>{};}
function close(){shade?.remove();spot?.remove();card?.remove();shade=spot=card=null;removeEventListener('resize',place);removeEventListener('keydown',keys,true);try{localStorage.setItem(SEEN,'1');}catch{}}
function keys(e){if(!card)return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();}else if(steps.length&&(e.key==='ArrowRight'||e.key==='Enter')){e.preventDefault();e.stopPropagation();go(i+1);}else if(steps.length&&e.key==='ArrowLeft'){e.preventDefault();e.stopPropagation();go(i-1);}}
function place(){if(!card)return;const s=steps[i],e=s?resolve(s):null,cw=card.offsetWidth,ch=card.offsetHeight,W=innerWidth,H=innerHeight,pad=8;
 if(!e){spot.classList.add('none');shade.style.clipPath='none';card.style.left=(W-cw)/2+'px';card.style.top=Math.max(12,(H-ch)/2)+'px';return;}
 spot.classList.remove('none');let r=e.getBoundingClientRect();const big=r.width>W*.7&&r.height>H*.6;
 const x=Math.max(4,r.left-pad),y=Math.max(4,r.top-pad),w=Math.min(W-8,r.right+pad)-x,h=Math.min(H-8,r.bottom+pad)-y;Object.assign(spot.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});shade.style.clipPath=`polygon(evenodd,0 0,${W}px 0,${W}px ${H}px,0 ${H}px,0 0,${x}px ${y}px,${x+w}px ${y}px,${x+w}px ${y+h}px,${x}px ${y+h}px,${x}px ${y}px)`;
 let L,Tp;if(big){L=W-cw-24;Tp=H-ch-24;}
 else if(r.bottom+pad+ch+12<H){Tp=r.bottom+pad+10;L=r.left;}
 else if(r.top-pad-ch-12>0){Tp=r.top-pad-ch-10;L=r.left;}
 else if(r.right+pad+cw+12<W){L=r.right+pad+12;Tp=r.top;}
 else{L=r.left-pad-cw-12;Tp=r.top;}
 card.style.left=Math.max(12,Math.min(W-cw-12,L))+'px';card.style.top=Math.max(12,Math.min(H-ch-12,Tp))+'px';}
function go(n){if(n<0)return;if(n>=steps.length){finish();return;}i=n;const s=steps[i];try{s.pre?.();}catch{}
 setTimeout(()=>{const e=resolve(s);if(e&&e.scrollIntoView){const r=e.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)e.scrollIntoView({block:'center'});}
  card.innerHTML=`<h3>${s.t}</h3>${(window.SFTouchText&&window.SFTouchText(s))||s.b}<div class="hlp-foot"><span>${i+1} / ${steps.length}</span><button data-a="x">그만 보기</button>${i?'<button data-a="p">이전</button>':''}<button class="main" data-a="n">${i===steps.length-1?'끝':'다음'}</button></div>`;
  card.querySelector('[data-a=x]').onclick=close;card.querySelector('[data-a=p]')&&(card.querySelector('[data-a=p]').onclick=()=>go(i-1));card.querySelector('[data-a=n]').onclick=()=>go(i+1);
  place();card.querySelector('.main').focus();},s.pre?260:0);}
function finish(){steps=[];card.innerHTML='<h3>다 봤어요!</h3><p>언제든 위쪽 <b>도움말</b> 버튼으로 다시 볼 수 있어요. 탭 하나만 골라서 다시 볼 수도 있어요.</p><div class="hlp-foot"><span></span><button class="main" data-a="x">닫기</button></div>';card.querySelector('[data-a=x]').onclick=close;spot.classList.add('none');shade.style.clipPath='none';place();card.querySelector('.main').focus();}
function start(list){build();steps=list;addEventListener('resize',place);addEventListener('keydown',keys,true);go(0);}
function menu(first){build();steps=[];addEventListener('resize',place);addEventListener('keydown',keys,true);spot.classList.add('none');shade.style.clipPath='none';
 const items=is3D?[['v3d','세이브 3D 사용법','회전·이동·세이브 열기·필터']]:[['full','처음부터 전부 둘러보기','생산 플래너 → 월드맵 → 노드 그래프 → 세이브 3D'],['plan','01 생산 플래너만','목표 아이템 하나 계산하기'],['map','02 월드맵만','자원·수집품 찾기'],['graph','03 노드 그래프만','공장 설계, 자동 전개, 발전, 공유']];
 card.innerHTML=`<h3>${first?'처음 오셨네요!':'도움말'}</h3><p>${first?'버튼 하나하나 짚어 가면서 설명해 드릴게요. 1~2분이면 끝나요.':'무엇을 볼까요?'}</p><div class="hlp-menu">${items.map(([k,a,b])=>`<button data-k="${k}">${a}<small>${b}</small></button>`).join('')}</div><div class="hlp-foot"><span><kbd>←</kbd><kbd>→</kbd> 이동 · <kbd>Esc</kbd> 닫기</span><button data-a="x">${first?'나중에':'닫기'}</button></div>`;
 card.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k;start(k==='full'?FULL:T[k]);});card.querySelector('[data-a=x]').onclick=close;place();card.querySelector('[data-k]').focus();}

function mount(){const h=document.querySelector('header');if(!h||$('#hlpBtn'))return;const b=document.createElement('button');b.id='hlpBtn';b.type='button';b.textContent='? 도움말';b.title='버튼마다 설명 보기';b.onclick=()=>menu(false);
 const anchor=$('#viewer3dTab');if(anchor&&!is3D)anchor.after(b);else{const nav=h.querySelector('.actions,nav')||h;nav.append(b);}
 let seen=false;try{seen=!!localStorage.getItem(SEEN);}catch{}
 const want=new URLSearchParams(location.search).has('help');
 if(want)setTimeout(()=>start(is3D?T.v3d:FULL),900);else if(!seen&&!navigator.webdriver&&!/^#riri-v[123]=/.test(location.hash))setTimeout(()=>menu(true),900);}
window.SFHelp={start:k=>start(k==='full'?FULL:T[k]),menu:()=>menu(false),close,tours:T};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
