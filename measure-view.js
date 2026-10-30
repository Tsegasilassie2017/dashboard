const localTargets={};
function measureList(){return Measures.defs.filter(m=>activeService==='all'||m.service===activeService)}
const percent=v=>v===null?'Not calculable':fmt(v)+'%';
function renderMeasures(){
 $('exportMeasures').disabled=false;
 const list=measureList(),old=$('measureSelect').value;$('measureSelect').replaceChildren();list.forEach(m=>$('measureSelect').add(new Option(m.name,m.id)));if(list.some(m=>m.id===old))$('measureSelect').value=old;
 $('measureCards').innerHTML=list.map(m=>{const r=Measures.calculate(data,m,selected(),localTargets[m.id]??null);return `<article class="measure-card ${r.status}"><span>${escape(m.service)}</span><h3>${escape(m.name)}</h3><strong>${percent(r.value)}</strong><p>${escape(r.label)}</p><details><summary>Definition & interpretation</summary><p>${escape(m.kind==='dropout'?'('+m.denominator+' − '+m.numerator+') / '+m.denominator:m.numerator+' / '+m.denominator)} × 100</p><p>Inputs: ${fmt(r.n)} / ${fmt(r.d)}</p><p>${escape(m.note)}</p><p>Direction for a locally agreed target: ${m.direction==='lower'?'lower':'higher'} is better. No default benchmark is assumed.</p></details></article>`}).join('');renderMeasureChart();renderQuality();
}
function renderMeasureChart(){const m=Measures.defs.find(m=>m.id===$('measureSelect').value);if(!m)return;const target=localTargets[m.id]??null;$('target').value=target??'';$('targetHint').textContent=m.direction==='lower'?'Target is a maximum (%)':'Target is a minimum (%)';
 const values=data.facilities.map((name,i)=>({name,...Measures.calculate(data,m,String(i),target)})).filter((_,i)=>selected()==='all'||i===Number(selected()));const max=Math.max(100,...values.map(x=>Math.abs(x.value??0)),target??0);
 $('measureChart').innerHTML=values.map(x=>`<div class="measure-bar"><span>${escape(x.name)}</span><div class="measure-track">${target===null?'':`<i style="left:${100*target/max}%" title="Local target ${target}%"></i>`}<b class="${x.status}" style="width:${100*Math.abs(x.value??0)/max}%"></b></div><strong>${percent(x.value)}</strong><small>${escape(x.label)}</small></div>`).join('');
 $('measureNote').textContent=m.note+' Ratios use source totals for All facilities; individual bars use facility values. Targets apply only to this browser session.';
}
function renderQuality(){const q=Measures.quality(data,serviceRows(),selected());$('qualityTable').innerHTML=q.map(x=>`<tr><td>${escape(x.name)}</td><td><span class="quality-chip ${x.nonblank===null?'missing':'neutral'}">${percent(x.nonblank)}</span><small>${x.reported} / ${x.expected} cells</small></td><td><span class="quality-chip ${x.negatives?'invalid':'good'}">${x.negatives?x.negatives+' flagged':'None'}</span></td><td>${x.checked?`${x.mismatch} / ${x.checked} checked`:'Not assessable'}</td></tr>`).join('');
 const checks=measureList().map(m=>({m,r:Measures.calculate(data,m,selected())})).filter(x=>x.r.status==='invalid');$('qualityAlerts').textContent=checks.length?checks.map(x=>x.m.name+': '+percent(x.r.value)+' — review source counts, period alignment and catchment flows.').join(' '):'No out-of-range ratios among the selected measures. This does not establish overall data quality.';
}
$('measureSelect').addEventListener('change',renderMeasureChart);$('applyTarget').onclick=()=>{const m=Measures.defs.find(m=>m.id===$('measureSelect').value);if(!m||!data)return;const raw=$('target').value;const n=Number(raw);if(raw!==''&&(!Number.isFinite(n)||n<0||n>100)){ $('targetHint').textContent='Enter a target between 0 and 100.';return}if(raw==='')delete localTargets[m.id];else localTargets[m.id]=n;renderMeasures()};

$('exportMeasures').onclick=()=>{
 if(!data)return;
 const quote=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
 const rows=[['Measure','Service','Facility','Percent','Numerator input','Denominator input','Status','Local target percent','Formula','Interpretation'],...measureList().map(m=>{const r=Measures.calculate(data,m,selected(),localTargets[m.id]??null);return [m.name,m.service,selected()==='all'?'Reported total':data.facilities[Number(selected())],r.value,r.n,r.d,r.label,localTargets[m.id]??'',m.kind==='dropout'?'('+m.denominator+' - '+m.numerator+') / '+m.denominator:m.numerator+' / '+m.denominator,m.note]})];
 const csv=rows.map(row=>row.map(v=>quote(typeof v==='string'&&/^[=+@\-]/.test(v)?"'"+v:v)).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='healthscope-measures.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
