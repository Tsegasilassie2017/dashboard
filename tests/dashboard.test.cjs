const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');
const available=fs.existsSync('data/indicators.json');
const d=available?JSON.parse(fs.readFileSync('data/indicators.json','utf8')):null;
test('import preserves source dimensions and known KPI totals',{skip:!available},()=>{assert.equal(d.facilities.length,10);assert.equal(d.indicators.length,2232);for(const [code,total] of [['MS_OPD_NumOV.1',2070812],['MAT_ANC1_GA.1',21251],['MAT_SBR.LB.',8702],['EPI_DPT3.1.',21386]]){const r=d.indicators.find(r=>r.code===code);assert.equal(r.total,total);assert.equal(r.values.reduce((a,b)=>a+(b??0),0),total)}});
test('missing values stay null',{skip:!available},()=>{assert(d.indicators.some(r=>r.values.includes(null)));assert(d.indicators.every(r=>r.values.length===10&&r.values.every(v=>v===null||Number.isFinite(v))))});
