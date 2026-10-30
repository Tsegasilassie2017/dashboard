let data, page=0, filtered=[]; const size=12;
const $=id=>document.getElementById(id), fmt=v=>v===null||v===undefined?'Not reported':new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(v);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const selected=()=> $('facility').value;
const val=r=>!r?null:selected()==='all'?r.total:r.values[Number(selected())];
const indicator=code=>data.indicators.find(r=>r.code===code);
const metrics=[['MS_OPD_NumOV.1','Outpatient visits','Recorded visits · includes repeat visits','↗'],['MAT_ANC1_GA.1','First antenatal contacts','Women receiving a first ANC contact','♡'],['MAT_SBR.LB.','Live births','Reported live births','✧'],['EPI_DPT3.1.','Pentavalent · third dose','Children under one year vaccinated','✚']];
function render(){
 $('cards').innerHTML=metrics.map(([code,title,note,icon])=>`<article class="card"><div class="card-top">${title}<span class="card-icon">${icon}</span></div><div class="card-value">${fmt(val(indicator(code)))}</div><div class="card-note">${note}</div></article>`).join('');
 const opd=indicator('MS_OPD_NumOV.1');const sorted=data.facilities.map((name,i)=>({name,i,value:opd.values[i]})).filter(x=>selected()==='all'||x.i===Number(selected())).sort((a,b)=>(b.value??-1)-(a.value??-1));const max=Math.max(1,...sorted.map(x=>x.value??0));
 $('bars').innerHTML=sorted.map(x=>`<div class="bar-row"><span class="bar-label" title="${escape(x.name)}">${escape(x.name.replace(' Health Center','').replace('_PHCU',''))}</span><div class="bar-track"><div class="bar-fill" style="width:${100*(x.value??0)/max}%"></div></div><span class="bar-number">${fmt(x.value)}</span></div>`).join('');
 const maternal=[['MAT_ANC1_GA.1','First antenatal contact'],['MAT_ANC4+_MA.1','Four or more ANC contacts'],['MAT_ANC8+.','Eight or more ANC contacts'],['MAT_SBR.LB.','Live births']].map(([c,n])=>({name:n,value:val(indicator(c))}));const maternalMax=Math.max(1,...maternal.map(x=>x.value??0));
 $('maternal').innerHTML=maternal.map((x,i)=>`<div class="maternal-item"><div class="maternal-info"><span>${x.name}</span><strong>${fmt(x.value)}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${100*(x.value??0)/maternalMax}%;background:${['#365b3c','#6e9152','#a1ba73','#c1d498'][i]}"></div></div></div>`).join('');
 $('valueHeading').textContent=selected()==='all'?'REPORTED TOTAL':'FACILITY VALUE'; filter();
}
function filter(){page=0;const q=$('search').value.trim().toLowerCase();filtered=data.indicators.filter(r=>(!q||(r.code+' '+r.name).toLowerCase().includes(q))&&($('section').value==='all'||r.section===$('section').value)&&(!$('reported').checked||val(r)!==null));renderTable()}
function renderTable(){
 $('rowCount').textContent=`${filtered.length.toLocaleString()} INDICATORS`;
 $('tbody').innerHTML=filtered.slice(page*size,(page+1)*size).map(r=>`<tr><td>${escape(r.name)}<small>${escape(r.code)}</small></td><td>${escape(r.section)}</td><td>${fmt(val(r))}</td><td>${r.values.filter(v=>v!==null).length} / ${data.facilities.length}</td></tr>`).join('')||'<tr><td colspan="4">No indicators match your filters.</td></tr>';
 $('pageInfo').textContent=filtered.length?`${page*size+1}–${Math.min((page+1)*size,filtered.length)} of ${filtered.length.toLocaleString()} indicators`:'0 indicators';$('prev').disabled=page===0;$('next').disabled=(page+1)*size>=filtered.length;
}
$('search').addEventListener('input',filter);$('section').addEventListener('change',filter);$('reported').addEventListener('change',filter);$('facility').addEventListener('change',render);$('prev').onclick=()=>{page--;renderTable()};$('next').onclick=()=>{page++;renderTable()};
$('export').onclick=()=>{
 const cell=s=>'"'+String(s??'').replace(/"/g,'""')+'"';
 const rows=[['Code','Indicator','Category',selected()==='all'?'Reported total':data.facilities[Number(selected())],'Period'],...filtered.map(r=>[r.code,r.name,r.section,val(r),data.period])];
 const csv=rows.map(r=>r.map(v=>cell(typeof v==='string'&&/^[=+@\-]/.test(v)?"'"+v:v)).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='healthscope-indicators.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
function loadData(d){
 if(!Array.isArray(d.facilities)||!Array.isArray(d.indicators)||!d.facilities.length||!d.indicators.every(r=>typeof r.code==='string'&&typeof r.name==='string'&&typeof r.section==='string'&&Array.isArray(r.values)&&r.values.length===d.facilities.length&&r.values.every(v=>v===null||Number.isFinite(v))&&(r.total===null||Number.isFinite(r.total))))throw Error('Invalid dashboard JSON format');
 data=d;page=0;$('facility').length=1;$('section').length=1;
 d.facilities.forEach((name,i)=>$('facility').add(new Option(name,i)));[...new Set(d.indicators.map(r=>r.section))].forEach(s=>$('section').add(new Option(s,s)));
 $('error').hidden=true;$('export').disabled=false;render();
}
$('export').disabled=true;
$('dataFile').addEventListener('change',async e=>{try{const f=e.target.files[0];if(!f)return;loadData(JSON.parse(await f.text()))}catch(err){$('error').hidden=false;$('error').textContent='Could not load file: '+err.message}});
fetch('data/indicators.json').then(r=>{if(!r.ok)throw Error('No local dataset');return r.json()}).then(loadData).catch(()=>{$('error').hidden=false;$('error').textContent='Load your dashboard JSON file above to view KPIs. Data stays in your browser; no upload is performed.'});
