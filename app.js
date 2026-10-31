let data, page=0, filtered=[]; const size=12;
const $=id=>document.getElementById(id), fmt=v=>v===null||v===undefined?'Not reported':new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(v);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const selected=()=> $('facility').value;
const val=r=>!r?null:selected()==='all'?r.total:r.values[Number(selected())];
const indicator=code=>data.indicators.find(r=>r.code===code);
let activeService='all';
const metrics=[['MAT_CAR_Age','Family planning acceptors','New and repeat acceptors','♡'],['MAT_ANC1_GA.1','First antenatal contacts','Women receiving a first ANC contact','♡'],['MAT_SBR.LB.','Live births','Reported live births','✧'],['EPI_DPT3.1.','Pentavalent · third dose','Children under one year vaccinated','✚']];
function serviceRows(){return data.indicators.filter(r=>activeService==='all'||r.section===activeService)}
function highlights(){
 const codes=activeService==='all'?metrics.map(m=>m[0]):({
 'Family planning':['MAT_CAR_Age','MAT_CAR_Age.1','MAT_CAR_Age.2','MAT_IPPCAR_Age'],
 'Comprehensive abortion care':['MAT_CAC_SAC','MAT_CAC_PAC','MAT_CAC.Tr.1','MAT_CAC.MA.1'],
 'Adolescent and youth health':['MAT_TngP_TPR','NUT_Adl&Yo.1','NUT_Adl&Yo_SUW','NUT_Adl&Yo_SObe'],
 'Antenatal care':['MAT_ANC1_GA.1','MAT_ANC4+_MA.1','MAT_ANC8+.','MAT_Hepa'],
 'Postnatal care':['MAT_EPNC.1','MAT_EPNC.1. 1','MAT_EPNC.1. 3','MAT_EPNC.1. 5'],
 'PMTCT':['MTCT_TST.1.','MTCT_ART.1.','MTCT_HEI_EID.1.1','MTCT_HEI_ABTST.1'],
 'ECD':['CH_CHDM','CH_CHDMS. 1','CH_CHDMS. 2','CH_CHDMS. 3'],
 'Nutrition':['NUT_VITA.1','NUT_DeW.1','NUT_U5SMN.1','NUT_U5SMN.SAM.1']
 }[activeService]||serviceRows().filter(r=>r.total!==null).slice(0,4).map(r=>r.code));
 return codes.map(c=>indicator(c)).filter(Boolean);
}
function render(){
 const items=highlights();
 const previous=$('chartMetric').value;$('chartMetric').replaceChildren();serviceRows().forEach(r=>$('chartMetric').add(new Option(r.name+' · '+r.code,r.code)));
 if(serviceRows().some(r=>r.code===previous))$('chartMetric').value=previous;
 renderBars();
 const max=Math.max(1,...items.map(r=>val(r)??0));
 $('maternal').innerHTML=items.map(r=>`<div class="maternal-item"><div class="maternal-info"><span>${escape(r.name)}</span><strong>${fmt(val(r))}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${100*(val(r)??0)/max}%"></div></div></div>`).join('');
 renderMeasures();
 $('valueHeading').textContent=selected()==='all'?(data.aggregate?'SUBCITY TOTAL':'REPORTED TOTAL'):'FACILITY VALUE'; filter();
}
function renderBars(){
 const r=indicator($('chartMetric').value);const sorted=data.facilities.map((name,i)=>({name,i,value:r?.values[i]??null})).filter(x=>selected()==='all'||x.i===Number(selected())).sort((a,b)=>(b.value??-1)-(a.value??-1));const max=Math.max(1,...sorted.map(x=>x.value??0));
 $('bars').innerHTML=sorted.map(x=>`<div class="bar-row"><span class="bar-label" title="${escape(x.name)}">${escape(x.name.replace(' Health Center','').replace('_PHCU',''))}</span><div class="bar-track"><div class="bar-fill" style="width:${100*(x.value??0)/max}%"></div></div><span class="bar-number">${fmt(x.value)}</span></div>`).join('');
}
$('chartMetric').addEventListener('change',renderBars);
function chooseService(service){
 activeService=service;$('viewLabel').textContent=service==='all'?'Overview':service;
 document.querySelectorAll('#serviceNav button').forEach(b=>{b.classList.toggle('active',b.dataset.service===service);b.setAttribute('aria-pressed',String(b.dataset.service===service))});
 $('search').value='';$('section').value=service==='all'?'all':service;if(data)render();
}
['Overview',...MCH.categories].forEach((label,i)=>{const b=document.createElement('button');b.textContent=label;b.dataset.service=i?label:'all';b.onclick=()=>chooseService(b.dataset.service);$('serviceNav').append(b)});chooseService('all');
function filter(){if(!data)return;page=0;const q=$('search').value.trim().toLowerCase();filtered=serviceRows().filter(r=>(!q||(r.code+' '+r.name).toLowerCase().includes(q))&&($('section').value==='all'||r.section===$('section').value)&&(!$('reported').checked||val(r)!==null));renderTable()}
function renderTable(){
 $('rowCount').textContent=`${filtered.length.toLocaleString()} INDICATORS`;
 $('tbody').innerHTML=filtered.slice(page*size,(page+1)*size).map(r=>`<tr><td>${escape(r.name)}<small>${escape(r.code)}</small></td><td>${escape(r.section)}</td><td>${fmt(val(r))}</td><td>${r.values.filter(v=>v!==null).length} / ${data.facilities.length}</td></tr>`).join('')||'<tr><td colspan="4">No indicators match your filters.</td></tr>';
 $('pageInfo').textContent=filtered.length?`${page*size+1}–${Math.min((page+1)*size,filtered.length)} of ${filtered.length.toLocaleString()} indicators`:'0 indicators';$('prev').disabled=page===0;$('next').disabled=(page+1)*size>=filtered.length;
}
$('search').addEventListener('input',filter);$('section').addEventListener('change',()=>chooseService($('section').value));$('reported').addEventListener('change',filter);$('facility').addEventListener('change',()=>{if(data)render()});$('prev').onclick=()=>{page--;renderTable()};$('next').onclick=()=>{page++;renderTable()};
$('export').onclick=()=>{
 const cell=s=>'"'+String(s??'').replace(/"/g,'""')+'"';
 const rows=[['Code','Indicator','Category',selected()==='all'?'Reported total':data.facilities[Number(selected())],'Period'],...filtered.map(r=>[r.code,r.name,r.section,val(r),data.period])];
 const csv=rows.map(r=>r.map(v=>cell(typeof v==='string'&&/^[=+@\-]/.test(v)?"'"+v:v)).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='lemi-kura-mch-indicators.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
function loadData(d){
 if(!Array.isArray(d.facilities)||!Array.isArray(d.indicators)||!d.facilities.length||!d.indicators.every(r=>typeof r.code==='string'&&typeof r.name==='string'&&typeof r.section==='string'&&Array.isArray(r.values)&&r.values.length===d.facilities.length&&r.values.every(v=>v===null||Number.isFinite(v))&&(r.total===null||Number.isFinite(r.total))))throw Error('Invalid dashboard JSON format');
 d=MCH.scope(OrgUnits.normalize(d));data=d;activeService='all';page=0;$('facilityCount').textContent=d.facilities.length+' health facilities';$('facility').options[0].textContent=d.aggregate?.name||'All facilities';$('orgNote').textContent=d.aggregate?'Subcity dashboard: '+d.aggregate.name+'. Its dedicated column is used directly; it is excluded from facility charts and sums. Export totals that combine both levels are not used.':'Subcity column not present: using source-reported totals without recalculating them.';$('periodLabel').textContent=d.period||'Period not specified';$('search').value='';$('reported').checked=false;$('facility').length=1;$('section').length=1;
 d.facilities.forEach((name,i)=>$('facility').add(new Option(name,i)));[...new Set(d.indicators.map(r=>r.section))].forEach(s=>$('section').add(new Option(s,s)));
 $('error').hidden=true;$('export').disabled=false;chooseService('all');
}
$('export').disabled=true;
$('dataFile').addEventListener('change',async e=>{
 const f=e.target.files[0];if(!f)return;
 $('error').hidden=false;$('error').textContent='Reading '+f.name+'…';
 try{
  await new Promise(resolve=>setTimeout(resolve,30));
  const d=/\.json$/i.test(f.name)?JSON.parse(await f.text()):await HealthImport.importExcel(f);
  loadData(d);
 }catch(err){$('error').hidden=false;$('error').textContent='Could not load file: '+err.message}
 finally{e.target.value=''}
});
$('error').hidden=false;$('error').textContent='Choose an Excel file (.xls or .xlsx) above to prepare your dashboard. Files stay in your browser.';
