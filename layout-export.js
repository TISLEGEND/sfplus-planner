/* Standalone, script-free vector snapshots. Never changes graph/view state. */
(() => {
'use strict';
const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg',font='"Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';
function el(tag,attrs={},parent){const e=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);parent?.append(e);return e;}
function text(parent,value,x,y,size=12){const e=el('text',{x,y,fill:'#111','font-size':size,'font-family':font},parent);e.textContent=value;return e;}
const imageCache=new Map();
function safeName(value){const v=String(value||'').trim(),d=window.RiriGraph.data();const entry=d.items[v]||d.buildings[v];const name=entry?.name||v;return window.KO_NAMES?.[name]||(/(?:Build_|Desc_|Recipe_|_C\b|[a-z][A-Z]|SoldifierAndCooler)/.test(v)?'':name);}
function imageSlot(parent,source,box){const href=source.currentSrc||source.getAttribute('href')||source.src;const uri=imageCache.get(href);if(uri)el('image',{...box,href:uri,preserveAspectRatio:'xMidYMid meet'},parent);else {const width=Math.min(20,Number(box.width)),height=Math.min(20,Number(box.height));el('rect',{x:Number(box.x)+(Number(box.width)-width)/2,y:Number(box.y)+(Number(box.height)-height)/2,width,height,rx:3,fill:'#edf0f2',stroke:'#8b969e','stroke-width':.6},parent);}}
async function inlineImages(){await Promise.all([...document.querySelectorAll('#gNodes img,#gLabels img,#alWorld image')].map(async source=>{const href=source.currentSrc||source.getAttribute('href')||source.src;if(!href||imageCache.has(href))return;if(href.startsWith('data:')){imageCache.set(href,href);return;}try{const response=await fetch(href);if(!response.ok)throw Error('image');const blob=await response.blob();const uri=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});imageCache.set(href,uri);return;}catch{}try{const url=new URL(href,document.baseURI).href;const img=[...document.images].find(i=>i.complete&&i.naturalWidth&&i.currentSrc===url);if(!img)return;const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;canvas.getContext('2d').drawImage(img,0,0);imageCache.set(href,canvas.toDataURL('image/png'));}catch{}}));}
function cloneStyled(source){const copy=source.cloneNode(true),a=[source,...source.querySelectorAll('*')],b=[copy,...copy.querySelectorAll('*')];a.forEach((s,i)=>{const c=b[i],style=getComputedStyle(s);c.removeAttribute('style');for(const key of ['display','visibility','marker-start','marker-mid','marker-end','fill','fill-opacity','stroke','stroke-opacity','stroke-width','stroke-dasharray','stroke-linecap','stroke-linejoin','opacity','font-size','font-weight','text-anchor','dominant-baseline','paint-order','vector-effect']){let v=style.getPropertyValue(key);if(v.includes('url('))v=v.replace(/url\([^#]*#([^)"]+)"?\)/g,'url(#$1)');c.style.setProperty(key,v);}c.style.fontFamily=font;const tag=c.tagName.toLowerCase();if(tag==='rect')c.style.fill='#fff';if(tag==='text'){c.style.fill='#111';c.style.stroke='none';c.textContent=safeName(s.textContent);}if(tag==='path'&&style.stroke!=='none'){const rgb=style.stroke.match(/[\d.]+/g);if(rgb&&rgb.length>=3)c.style.stroke='rgba('+rgb.slice(0,3).map(n=>Math.round(Number(n)*.65)).join(',')+','+(rgb[3]??1)+')';}for(const attr of [...c.attributes])if(/^on/i.test(attr.name)||attr.name.startsWith('data-'))c.removeAttribute(attr.name);if(tag==='image'){const g=el('g');imageSlot(g,s,Object.fromEntries(['x','y','width','height'].map(k=>[k,s.getAttribute(k)||0])));for(const child of g.children)for(const key of ['display','visibility','opacity'])child.style.setProperty(key,c.style.getPropertyValue(key));c.replaceWith(...g.childNodes);}});copy.querySelectorAll('script,foreignObject,style,a').forEach(e=>e.remove());return copy;}
function build(kind){
 if(matchMedia('print').matches&&!document.body.classList.contains('riri-export-capture')){document.body.classList.add('riri-export-capture');try{return build(kind);}finally{document.body.classList.remove('riri-export-capture');}}
 const svg=el('svg',{xmlns:NS,role:'img',preserveAspectRatio:'xMinYMin meet'}),content=el('g',{},svg);let bounds;
 if(kind==='layout'){
  const source=$('alWorld');if(!source.children.length)throw Error('먼저 공장 배치를 생성하세요.');
  const copy=cloneStyled(source);copy.removeAttribute('style');copy.removeAttribute('id');copy.removeAttribute('width');copy.removeAttribute('height');
  // Use a group so the source SVG viewport cannot clip the full drawing.
  const g=el('g',{},content);g.append(...copy.childNodes);bounds=source.getBBox();
 }else{
  const world=$('gWorld').getBoundingClientRect(),z=window.RiriGraph.get().view.zoom;
  const point=r=>({x:(r.left-world.left)/z,y:(r.top-world.top)/z,w:r.width/z,h:r.height/z});
  const lines=cloneStyled($('gLines'));const layer=el('g',{'data-export-lines':'true'},content);layer.append(...lines.childNodes);
  for(const source of document.querySelectorAll('#gNodes > *, #gLabels > *')){
   const r=point(source.getBoundingClientRect()),group=el('g',{'data-export-kind':source.closest('#gNodes')?'node':'label'},content);
   el('rect',{x:r.x,y:r.y,width:r.w,height:r.h,rx:5,fill:'#fff',stroke:'#333','stroke-width':1},group);
   const walker=document.createTreeWalker(source,NodeFilter.SHOW_TEXT);let node;
   while((node=walker.nextNode())){if(!node.textContent.trim())continue;const range=document.createRange();range.selectNodeContents(node);for(const rect of range.getClientRects()){const p=point(rect);if(p.w&&p.h){const style=getComputedStyle(node.parentElement);text(group,safeName(node.textContent),p.x,p.y+p.h*.8,parseFloat(style.fontSize));break;}}}
   for(const img of source.querySelectorAll('img')){const p=point(img.getBoundingClientRect());imageSlot(group,img,{x:p.x,y:p.y,width:p.w,height:p.h});}
  }
  if(!document.querySelector('#gNodes > *'))throw Error('출력할 노드가 없습니다.');
  document.body.append(svg);for(const group of svg.querySelectorAll('[data-export-kind=label]')){const box=group.querySelector('rect'),right=Math.max(...[...group.querySelectorAll('text,image')].map(t=>{const r=t.getBBox();return r.x+r.width;}));box.setAttribute('width',Math.max(+box.getAttribute('width'),right-Number(box.getAttribute('x'))+4));}bounds=content.getBBox();svg.remove();
 }
 // Reuse identical embedded bitmap sizes to keep large diagrams under the download limit.
 const art=el('defs'),seen=new Map();for(const image of [...svg.querySelectorAll('image')]){const href=image.getAttribute('href');if(!href?.startsWith('data:'))continue;const key=[href,image.getAttribute('width'),image.getAttribute('height'),image.getAttribute('preserveAspectRatio')].join('|');let id=seen.get(key);if(!id){id='riri-export-icon-'+seen.size;seen.set(key,id);const template=image.cloneNode(false);template.removeAttribute('style');template.setAttribute('id',id);template.setAttribute('x',0);template.setAttribute('y',0);art.append(template);}const use=el('use',{href:'#'+id,x:image.getAttribute('x')||0,y:image.getAttribute('y')||0});use.setAttribute('style',image.getAttribute('style')||'');image.replaceWith(use);}svg.prepend(art);
 const title=window.PlanLibrary?.currentName?.(window.RiriGraph.get())||'이름 없는 계획',mode=(kind==='layout'?window.RiriAutolayout.plan()?.dataMode:window.RiriGraph.data().mode)==='vanilla'?'원판':'SF+';
 const x=bounds.x-30,y=bounds.y-90,w=Math.max(320,bounds.width+60),h=bounds.height+160;
 svg.setAttribute('viewBox',`${x} ${y} ${w} ${h}`);svg.setAttribute('width',w);svg.setAttribute('height',h);
 const bg=el('rect',{x,y,width:w,height:h,fill:'white'});svg.prepend(bg);
 text(svg,safeName(title),x+15,y+25,20);text(svg,`${new Date().toLocaleString('ko-KR')} · ${mode} · ${kind==='layout'?'공장 배치':'노드 그래프'}`,x+15,y+47);
 text(svg,'수량: /분 (유체 m³/분) · 빈 아이콘 자리: 보안상 이미지 변환 불가 시 · 미확인 값은 미확인 표기',x+15,y+h-28);
 text(svg,'계획 참고용 · 실제 시공 좌표/게임 blueprint 아님 · 큰 도면은 축소되므로 SVG 확대 권장',x+15,y+h-10);
 return svg;
}
const preview=document.createElement('section');preview.id='layoutPrintSheet';document.body.append(preview);
async function prepare(kind){await inlineImages();const svg=build(kind);preview.replaceChildren(svg);preparedKind=kind;return svg;}
async function download(kind){const svg=await prepare(kind),xml=new XMLSerializer().serializeToString(svg);if(xml.length>20*1024*1024)throw Error('SVG 파일 크기 상한(20 MiB)을 초과했습니다.');const url=URL.createObjectURL(new Blob([xml],{type:'image/svg+xml;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=(kind==='layout'?'공장배치':'노드그래프')+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function button(id,label,parent,action){const b=document.createElement('button');b.id=id;b.textContent=label;b.onclick=async()=>{try{await action();}catch(e){$(parent==='gToolbar'?'gStatus':'alStatus').textContent='출력 실패: '+e.message;}};$(parent).append(b);}
for(const [kind,prefix,parent]of [['graph','g','gToolbar'],['layout','al','alToolbar']]){button(prefix+'ExportSvg','전체 도면 SVG 저장',parent,()=>download(kind));button(prefix+'Print','전체 도면 인쇄',parent,async()=>{await prepare(kind);window.print();});}
let preparedKind=null;
window.addEventListener('beforeprint',()=>{try{const kind=$('layoutPanel').hidden?'graph':'layout';if(preparedKind!==kind||!preview.querySelector('svg')){preview.replaceChildren(build(kind));preparedKind=kind;}}catch(e){preview.textContent=e.message;}});
let warmTimer;const observer=new MutationObserver(()=>{preparedKind=null;clearTimeout(warmTimer);warmTimer=setTimeout(()=>inlineImages(),120);});for(const id of ['gNodes','gLabels','gLines','alWorld'])observer.observe($(id),{childList:true,subtree:true,attributes:true});
window.RiriLayoutExport={build,prepare,download};
})();
