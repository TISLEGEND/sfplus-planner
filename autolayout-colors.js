(function(){
'use strict';
const ns='http://www.w3.org/2000/svg';let context,colors=new Map(),selection=[],hovered=null;
function color(id){return colors.get(id)||'#b68a62';}
function start(ctx){context=ctx;colors=new Map();hovered=null;selection=[];for(const liquid of [false,true]){const ids=[...new Set(ctx.edges.map(e=>e.item))].filter(id=>ctx.fluid(id)===liquid).sort();ids.forEach((id,i)=>colors.set(id,ids.length===1?(liquid?'#62b9ff':'#ffc078'):`hsl(${(liquid?182:24)+(i*.61803398875%1)*330} 78% ${64+(i%3)*5}%)`));}}
function make(tag,attrs,parent){const e=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);parent.append(e);return e;}
function highlight(id){hovered=id;document.querySelectorAll('#alWorld [data-flow]').forEach(e=>{const active=!!id&&e.dataset.flow===id;e.classList.toggle('al-flow-active',active);e.classList.toggle('al-flow-selected',!id&&selection.includes(e.dataset.flow));e.classList.toggle('al-flow-dim',!!id&&!active);});}
function select(items){selection=items;highlight(hovered);}
function decorate(p,points,item,amount,internal){
 p.dataset.flow=item;p.style.stroke=color(item);
 const description=context.name(item)+(internal?' · 묶음 입출력 합계 ':' · 공용 버스 연결 합계 ')+context.fmt(amount)+context.unit(item);make('title',{},p).textContent=description;
 const hit=make('path',{d:p.getAttribute('d'),class:'al-flow-hit','data-flow':item,'aria-label':description},p.parentNode);make('title',{},hit).textContent=description;
 hit.addEventListener('pointerenter',()=>highlight(item));hit.addEventListener('pointerleave',()=>highlight(null));
}
// One label per bus, at the origin; detail labels never repeat along a path.
function label(item,p){
 const g=make('g',{class:'al-flow-label','data-flow':item,transform:`translate(${p.x} ${p.y})`},document.getElementById('alWorld'));
 const src=context.itemIcon(item);make('circle',{cx:0,cy:0,r:10,fill:'#182126',stroke:color(item)},g);
 if(src)make('image',{href:src,x:-8,y:-8,width:16,height:16},g);else make('circle',{cx:0,cy:0,r:3,fill:color(item)},g);
 const detail=make('g',{class:'al-lane-name'},g),value=context.name(item),w=Math.max(54,value.length*12+16);
 make('rect',{x:13,y:-12,width:w,height:24,rx:5,stroke:color(item)},detail);make('text',{x:21,y:4},detail).textContent=value;
}
const intersects=(a,b)=>a.left<b.right+.25&&a.right+.25>b.left&&a.top<b.bottom+.25&&a.bottom+.25>b.top;
function updateLabels(z){
 const world=document.getElementById('alWorld');if(!world)return;
 world.querySelectorAll('.al-building-caption').forEach(e=>e.style.display=z>=.6?'':'none');
 world.querySelectorAll('.al-lane-name').forEach(e=>e.style.display=z>=.85?'':'none');
 const occupied=[];
 // Fixed panel/card titles first, then optional building and bus labels.
 const fixed=[...world.querySelectorAll('.al-title,.al-resource-card text')];
 for(const e of fixed){e.style.visibility='visible';const r=e.getBoundingClientRect();if(occupied.some(b=>intersects(r,b)))e.style.visibility='hidden';else occupied.push(r);}
 for(const e of world.querySelectorAll('.al-building-caption')){e.style.visibility='visible';if(z<.6)continue;const r=e.getBoundingClientRect();if(occupied.some(b=>intersects(r,b)))e.style.visibility='hidden';else occupied.push(r);}
 const buildings=[...world.querySelectorAll('.al-machine-art')].map(e=>e.getBoundingClientRect());
 for(const e of world.querySelectorAll('.al-flow-label')){e.style.visibility='visible';const r=e.getBoundingClientRect();if([...occupied,...buildings].some(b=>intersects(r,b)))e.style.visibility='hidden';else occupied.push(r);}
}
function finish(){let legend=document.getElementById('alFlowLegend');if(!legend){legend=document.createElement('details');legend.id='alFlowLegend';document.getElementById('alSidebar').prepend(legend);}legend.replaceChildren();const summary=document.createElement('summary');summary.textContent='아이템 연결선 범례 ('+colors.size+')';legend.append(summary);for(const [id,c]of colors){const e=document.createElement('div'),sw=document.createElement('span');sw.style.background=c;e.append(sw,document.createTextNode((context.fluid(id)?'유체 · ':'고체 · ')+context.name(id)));e.onpointerenter=()=>highlight(id);e.onpointerleave=()=>highlight(null);legend.append(e);}}
window.SFAutolayoutColors={start,color,decorate,finish,label,updateLabels,select};
})();
