/* Source-backed modular miner catalogue; null never means a guessed unit amount. */
(function(root){'use strict';
function label(key,ko={}){const base=ko['Modular Miner']||'Modular Miner';if(key==='base')return base;if(key==='Smelter')return ko['Modular Miner: Smelting Module']||base+': '+(ko['Smelter Module']||'Smelter Module');const names={Crusher:'Crusher Module',Fluid:'Fluid Module',Energy:'Half Booster Module',Energy_Mk2:'Full Booster Module'};return base+': '+(key.startsWith('Drill_')?(ko.Drill||'Drill')+' '+key.split('_')[1]:(ko[names[key]]||names[key]||key));}
const cls=v=>v?.ObjectName?.split("'")[1]||null;
function install(d,raw,ko={}){if(!d||d.recipes.some(r=>r.modularMiner))return d;
 const moduleLabel=key=>label(key,ko);
 for(const key of Object.keys(raw.modules)){const item=d.items[raw.modules[key].descriptor];if(item)item.name=moduleLabel(key);}
 const machine=raw.modules.base.class;
 d.buildings[machine]={id:machine,name:moduleLabel('base'),speed:null,power:null,exponent:null,source:'KLib',unverified:true,evidence:raw.modules.base.evidence};
 for(const res of raw.resources){const p=res.properties;
  for(const stage of ['Drill','Smelter','Crusher']){
   const info=(p.mModuleInformation||[]).find(x=>x.Key.includes('WP_'+stage+'.'))?.Value;
   if(stage!=='Drill'&&!info)continue;
   const products=stage==='Drill'?[res.resource]:[cls(info.mProductionItem),cls(info.mTrashItem)];
   const known=[...new Set(products.filter(Boolean))];if(known.some(id=>!d.items[id]))continue;
   const moduleName=stage==='Drill'?moduleLabel('Drill_T1'):(moduleLabel(stage));
   d.recipes.push({id:'ModularMiner_'+res.id+'_'+stage,name:moduleName+' · '+(ko[d.items[res.resource]?.name]||d.items[res.resource]?.name||res.resource)+' · 수율 미확인',searchAliases:Object.keys(raw.modules).filter(key=>!['Smelter','Crusher'].includes(key)&&(!key.startsWith('Drill_')||stage==='Drill')).map(moduleLabel).join(' '),source:'KLib',seconds:0,durationVerified:false,quantityVerified:false,ingredients:[],products:known.map(item=>({item,amount:null})),machines:[machine],alternate:true,variablePower:true,evidence:res.evidence,modularMiner:{resource:res.resource,stage,minTier:p.mDrillTier??null,fluids:(p.mFluidInfo||[]).map(x=>x.Key.split("'")[1].split('.').pop()),rate:null,ratio:null,purityMultiplier:null,power:null}});
  }
 }
 return d;
}
function config(value={},spec={}){const options={drill:['Drill_T1','Drill_T2','Drill_T3'],purity:['impure','normal','pure','unknown'],energy:['none','Energy','Energy_Mk2'],energy2:['none','Energy','Energy_Mk2'],energy3:['none','Energy','Energy_Mk2'],fluid:['none','Desc_Water_C','Desc_LiquidHydrochloricAcid_C','Desc_SlugSlime_Low_C']},defaults={drill:'Drill_T'+(spec.minTier||1),purity:'unknown',energy:'none',energy2:'none',energy3:'none',fluid:'none'};const out={};for(const [k,allowed]of Object.entries(options)){const v=value[k]??defaults[k];if(!allowed.includes(v))throw Error('모듈형 채굴기 설정 오류: '+k);out[k]=v;}if(spec.minTier&&Number(out.drill.slice(-1))<spec.minTier)throw Error('드릴 티어가 너무 낮습니다');if(out.fluid!=='none'&&spec.fluids&&!spec.fluids.includes(out.fluid))throw Error('이 자원에서 확인되지 않은 유체입니다');return out;}
function reference(value,raw){const c=config(value);if(c.purity==='unknown'||c.fluid!=='none'||[c.energy,c.energy2,c.energy3].some(x=>x!=='none'))return null;return raw.facts.perOutputRates[c.drill]*raw.facts.purityMultipliers[c.purity];}
const api={install,config,label,reference};if(typeof module!=='undefined')module.exports=api;else{root.SFModularMiner=api;install(root.SF_DATA?.sfplus,root.MODULAR_MINER_DATA,root.KO_NAMES);}
})(typeof window==='undefined'?globalThis:window);
