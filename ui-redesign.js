/* UI adapters deliberately use existing controls and public camera API. */
(() => {
 'use strict';
 const byId=id=>document.getElementById(id), panel=byId('mapPanel'), aside=panel.querySelector(':scope > aside');
 const pill=document.querySelector('header .pill');
 const chips=document.createElement('div');chips.className='header-chips';
 pill.textContent='2026.3.489';pill.replaceWith(chips);chips.append(pill);
 const offline=document.createElement('span');offline.className='pill';offline.textContent='OFFLINE';chips.append(offline);
 const notice=document.querySelector('.notice'),copy=document.createElement('span');copy.className='notice-copy';
 while(notice.firstChild)copy.append(notice.firstChild);notice.append(copy);
 const dismiss=document.createElement('button');dismiss.textContent='×';dismiss.setAttribute('aria-label','안내 배너 닫기');notice.append(dismiss);
 try{if(localStorage.getItem('sfplus-ui-notice-hidden')==='1')document.body.classList.add('notice-dismissed');}catch{}
 dismiss.onclick=()=>{document.body.classList.add('notice-dismissed');try{localStorage.setItem('sfplus-ui-notice-hidden','1');}catch{}};
 const heading=document.createElement('div');heading.className='filter-heading';heading.innerHTML='<div class="eyebrow">WORLD RESOURCES</div><h1>월드 자원 탐색</h1><button type="button" aria-label="필터 패널 접기">‹</button>';
 aside.querySelector('.eyebrow').remove();aside.querySelector('h1').remove();
 const scroll=document.createElement('div');scroll.className='filter-scroll';while(aside.firstChild)scroll.append(aside.firstChild);
 const searchLabel=document.createElement('label');searchLabel.className='filter-search';searchLabel.innerHTML='<input type="search" id="mapResourceSearch" placeholder="자원 이름 검색 · 한글 / English" aria-label="지도 자원 검색">';
 aside.append(heading,searchLabel,scroll);heading.querySelector('h1').append(byId('nodeCount'));heading.querySelector('button').onclick=()=>byId('toggleFilters').click();
 const search=byId('mapResourceSearch');
 function searchRows(){const q=search.value.trim().toLocaleLowerCase();scroll.querySelectorAll('.res-row:not(.res-head),.extra-btn').forEach(row=>{const aliases=[...row.querySelectorAll('img')].map(i=>i.alt+' '+(window.SF_DATA?.sfplus?.items?.[i.dataset.item]?.name||''));row.hidden=!!q&&!(row.textContent+' '+aliases+' '+row.dataset.search).toLocaleLowerCase().includes(q);});}
 function enrichRows(){scroll.querySelectorAll('.res-row:not(.res-head)').forEach(row=>{const localized=row.querySelector('span')?.textContent;const items=window.SF_DATA?.sfplus?.items||{};const extra=Object.entries(items).filter(([id,item])=>window.KO_NAMES?.[item.name]===localized).map(([id,item])=>item.name+' '+id).join(' ');row.dataset.search=extra;});searchRows();}
 search.oninput=searchRows;new MutationObserver(enrichRows).observe(byId('resourceFilters'),{childList:true,subtree:true});enrichRows();
 const details=document.createElement('section');details.id='mapDetails';details.hidden=true;details.setAttribute('aria-label','선택 항목 상세');details.innerHTML='<div class="section-head"><h2>선택 항목</h2><button id="closeDetails" aria-label="상세 패널 닫기">×</button></div>';
 panel.append(details);const info=byId('nodeInfo');const initialInfo=info.textContent;details.append(info);
 const status=document.createElement('div');status.className='map-status';status.setAttribute('role','status');status.innerHTML='<span id="mapStatusSelection">노드를 선택하면 자원과 좌표를 확인합니다</span><span id="mapStatusMeta"></span>';panel.append(status);
 const zoom=document.createElement('span');zoom.className='map-zoom';panel.querySelector('.map-controls').append(zoom);
 function meta(){const value=Math.round((window.SFMap?.view.z||1)*100)+'%';zoom.textContent=value;byId('mapStatusMeta').textContent=value+' · 2026.3.489 · '+(window.SFP_SAVE?'세이브 연결됨':'세이브 없음');}
 new MutationObserver(()=>{if(info.textContent&&info.textContent!==initialInfo){details.hidden=false;byId('mapStatusSelection').textContent=info.textContent;}}).observe(info,{childList:true,characterData:true,subtree:true});
 byId('closeDetails').onclick=()=>{details.hidden=true;byId('mapStatusSelection').textContent='선택 해제 · 지도 탐색 중';};
 byId('mapViewport').addEventListener('keydown',e=>{if(e.key==='Escape')byId('closeDetails').click();});
 window.addEventListener('mapviewchange',meta);meta();
 let framed=false;
 function frameMap(){if(!framed){requestAnimationFrame(()=>{const vp=byId('mapViewport'),view=window.SFMap?.view;if(view?.base){window.SFMap.focus(.5,.5,Math.max(vp.clientWidth,vp.clientHeight)/view.base);framed=true;meta();}});}}
 byId('mapTab').addEventListener('click',frameMap);if(!panel.hidden)frameMap();
 if(innerWidth<1024)byId('toggleFilters').click();
 document.querySelectorAll('.map-controls button').forEach(b=>{b.title=b.id==='zoomIn'?'확대 (+)':b.id==='zoomOut'?'축소 (−)':b.id==='fitMap'?'전체 보기 (Home)':'필터 패널 표시 / 숨김';});
})();
