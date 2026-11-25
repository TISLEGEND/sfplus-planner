/* Move existing controls after every feature has registered its actions. */
(() => {
'use strict';
const toolbar=document.getElementById('gToolbar');
let current=null;
function close(restore=false){if(!current)return;const {trigger,popup}=current;popup.hidden=true;trigger.setAttribute('aria-expanded','false');current=null;if(restore)trigger.focus();}
function group(id,label,controls){
 const wrap=document.createElement('div');wrap.className='g-toolbar-group';
 const trigger=document.createElement('button');trigger.id=id;trigger.type='button';trigger.textContent=label+' ▾';trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls',id+'Popup');
 const popup=document.createElement('div');popup.id=id+'Popup';popup.className='g-toolbar-popup';popup.hidden=true;popup.setAttribute('role','group');popup.setAttribute('aria-label',label);
 wrap.append(trigger,popup);toolbar.insertBefore(wrap,document.getElementById('gTotals'));
 for(const control of controls){const node=document.getElementById(control);if(node)popup.append(node.matches('input,select')?node.closest('label'):node);}
 function open(){close();popup.hidden=false;trigger.setAttribute('aria-expanded','true');current={trigger,popup};}
 trigger.onclick=()=>current?.trigger===trigger?close():open();
 trigger.onkeydown=e=>{if(e.key==='ArrowDown'){e.preventDefault();open();popup.querySelector('button,input,select')?.focus();}};
 popup.addEventListener('click',e=>{if(e.target.closest('button'))close();});
}
group('gView','보기',['gMachineExpand','gMachineClockMode','gLineCurve','gLineOrthogonal']);
group('gTools','도구',['gExportSvg','gPrint','gSettings','gExample1','gExample2','gGenerator','gExactFit','gToLayout','gConstruction','gCsvProduction','gCsvConstruction','gPlanSummary','gRecipeCompare','gPlanNotes','gSaveShared','gToMap','gToPlan']);
// Keep the primary actions first, preserving their original handlers and IDs.
for(const id of ['gShare','gExpand','gAdd'])toolbar.prepend(document.getElementById(id));
document.addEventListener('pointerdown',e=>{if(current&&!e.target.closest('.g-toolbar-group'))close();},true);
document.addEventListener('keydown',e=>{if(current&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();close(true);}},true);
toolbar.addEventListener('focusout',e=>{if(current&&e.relatedTarget&&!e.relatedTarget.closest('.g-toolbar-group'))close();});
})();
