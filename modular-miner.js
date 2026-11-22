/* Source-backed modular miner catalogue; null never means a guessed unit amount. */
(function(root){'use strict';
function label(key,ko={}){const base=ko['Modular Miner']||'Modular Miner';if(key==='base')return base;if(key==='Smelter')return ko['Modular Miner: Smelting Module']||base+': '+(ko['Smelter Module']||'Smelter Module');const names={Crusher:'Crusher Module',Fluid:'Fluid Module',Energy:'Half Booster Module',Energy_Mk2:'Full Booster Module'};return base+': '+(key.startsWith('Drill_')?(ko.Drill||'Drill')+' '+key.split('_')[1]:(ko[names[key]]||names[key]||key));}
const cls=v=>v?.ObjectName?.split("'")[1]||null;
function install(d,raw,ko={}){if(!d||d.recipes.some(r=>r.modularMiner))return d;
 const moduleLabel=key=>label(key,ko);
 for(const key of Object.keys(raw.modules)){const item=d.items[raw.modules[key].descriptor];if(item)item.name=moduleLabel(key);}
 const machine=raw.modules.base.class;
 d.buildings[machine]={id:machine,name:moduleLabel('base'),speed:1,power:7.5,exponent:0,source:'KLib',unverified:true,evidence:raw.modules.base.evidence};
 for(const res of raw.resources){const p=res.properties;
  for(const stage of ['Drill','Smelter','Crusher']){
   const info=(p.mModuleInformation||[]).find(x=>x.Key.includes('WP_'+stage+'.'))?.Value;
   if(stage!=='Drill'&&!info)continue;
   const products=stage==='Drill'?[res.resource]:[cls(info.mProductionItem),cls(info.mTrashItem)];
   const known=[...new Set(products.filter(Boolean))];if(known.some(id=>!d.items[id]))continue;
   const moduleName=stage==='Drill'?moduleLabel('Drill_T1'):(moduleLabel(stage));
   d.recipes.push({id:'ModularMiner_'+res.id+'_'+stage,name:moduleName+' · '+(ko[d.items[res.resource]?.name]||d.items[res.resource]?.name||res.resource)+'',searchAliases:Object.keys(raw.modules).filter(key=>!['Smelter','Crusher'].includes(key)&&(!key.startsWith('Drill_')||stage==='Drill')).map(moduleLabel).join(' '),source:'KLib',seconds:60,durationVerified:true,quantityVerified:true,ingredients:[],products:known.map(item=>({item,amount:null})),machines:[machine],alternate:true,variablePower:true,evidence:res.evidence,modularMiner:{resource:res.resource,stage,minTier:p.mDrillTier??1,fluids:(p.mFluidInfo||[]).map(x=>x.Key.split("'")[1].split('.').pop()),rate:60,ratio:1,purityMultiplier:1,power:null,raw,properties:p}});
  }
 }
 for(const r of d.recipes.filter(r=>r.modularMiner)){const rates=evaluate(r);if(rates.valid){r.products=rates.output;r.ingredients=rates.input;r.modularMiner.rate=rates.total;r.modularMiner.power=rates.power;}}
 return d;
}
function config(value={},spec={}){const options={drill:['Drill_T1','Drill_T2','Drill_T3'],purity:['impure','normal','pure','unknown'],energy:['none','Energy','Energy_Mk2'],energy2:['none','Energy','Energy_Mk2'],energy3:['none','Energy','Energy_Mk2'],fluid:['none',...(spec.fluids||['Desc_Water_C','Desc_LiquidHydrochloricAcid_C','Desc_SlugSlime_Low_C','Desc_SulfuricAcid_C','Desc_NitricAcid_C','Desc_SlugSlime_High_C'])]},defaults={drill:'Drill_T'+(spec.minTier||1),purity:'normal',energy:'none',energy2:'none',energy3:'none',fluid:'none'};const out={};for(const [k,allowed]of Object.entries(options)){const v=value[k]??defaults[k];if(!allowed.includes(v))throw Error('모듈형 채굴기 설정 오류: '+k);out[k]=v;}if(spec.minTier&&Number(out.drill.slice(-1))<spec.minTier)throw Error('드릴 티어가 너무 낮습니다');if(out.fluid!=='none'&&spec.fluids&&!spec.fluids.includes(out.fluid))throw Error('이 자원에서 확인되지 않은 유체입니다');return out;}
function reference(value,raw){const c=config(value);if(c.purity==='unknown'||c.fluid!=='none'||[c.energy,c.energy2,c.energy3].some(x=>x!=='none'))return null;return raw.facts.perOutputRates[c.drill]*raw.facts.purityMultipliers[c.purity];}
// Integral of the exported unweighted cubic Hermite curve over one period.
function curveMean(keys){let sum=0;for(let i=1;i<keys.length;i++){const a=keys[i-1],b=keys[i],h=b.Time-a.Time;sum+=h*((a.Value+b.Value)/2+h*(a.LeaveTangent-b.ArriveTangent)/12);}return sum/(keys.at(-1).Time-keys[0].Time);}
function evaluate(recipe,value={},clock=100){const s=recipe.modularMiner,c=config(value,s),raw=s.raw,p=s.properties,purity=raw.facts.purityMultipliers[c.purity],potential=Math.min(clock,100)/100;
 const selected=['base',c.drill,...(s.stage==='Drill'?[]:[s.stage]),...[c.energy,c.energy2,c.energy3].filter(x=>x!=='none'),...(c.fluid==='none'?[]:['Fluid'])];
 const needed=(p.mNeededModules||[]).map(cls);const missing=needed.some(x=>x.includes('FluidModule')&&c.fluid==='none'||x.includes('PowerShard')&&![c.energy,c.energy2,c.energy3].some(x=>x!=='none'));
 const fluid=(p.mFluidInfo||[]).find(x=>x.Key.split("'")[1].split('.').pop()===c.fluid)?.Value;
 const valid=purity!==undefined&&!missing;
 let bonus=selected.reduce((a,k)=>a+(raw.modules[k].properties.mBonus||0),0)+(fluid?.ProductionTimeMulti||0),malus=1;
 for(const k of selected){const v=raw.modules[k].properties.mMalus||0;if(['Smelter','Crusher'].includes(k)){if(v>0)malus*=v;}else bonus-=v;}
 const buff=valid?Math.max(.5,purity+(bonus>0?bonus*malus:0)):null;
 const perOutput=valid?raw.facts.perOutputRates[c.drill]*buff*potential:null,amounts=new Map();
 const add=(item,amount)=>{if(item)amounts.set(item,(amounts.get(item)||0)+amount);};
 const info=(p.mModuleInformation||[]).find(x=>x.Key.includes('WP_'+s.stage+'.'))?.Value;
 add(s.stage==='Drill'?s.resource:cls(info?.mProductionItem),perOutput*2);
 if(info&&cls(info.mTrashItem))add(cls(info.mTrashItem),perOutput*2/3);
 const mean=curveMean(raw.facts.powerCurveKeys);let power=0,powerMax=0,powerBase=0;
 for(const k of selected){const o=raw.modules[k].properties.mPowerOptions||{},factor=(o.mPowerMultiplier??1)*(o.bUseExponent===false?1:Math.pow(k==='base'?potential:1,o.mPowerConsumptionExponent??1.321929)),base=(o.mNormalPowerConsume||0)+(o.mOtherPowerConsume||0),variable=o.mPowerCurve?o.mMaxVariablePowerValue||0:0;power+=(base+variable*raw.facts.powerCurveKeys[0].Value)*factor;powerMax+=(base+variable)*factor;powerBase+=base*factor;}
 return {valid,reason:missing?'필수 유체/에너지 모듈이 필요합니다':purity===undefined?'노드 순도를 선택하세요':null,perOutput,total:perOutput===null?null:perOutput*2,buff,potential,power,powerMax,powerBase,powerBasis:'가동 중 기본 위상 MW',input:fluid?[{item:c.fluid,amount:valid?fluid.mNormalFluidCountPerSecond*purity*60/1000:0}]:[],output:[...amounts].map(([item,amount])=>({item,amount:valid?amount:0})),clockClamped:clock>100};
}
const api={install,config,label,reference,evaluate,curveMean};if(typeof module!=='undefined')module.exports=api;else{root.SFModularMiner=api;install(root.SF_DATA?.sfplus,root.MODULAR_MINER_DATA,root.KO_NAMES);}
})(typeof window==='undefined'?globalThis:window);
