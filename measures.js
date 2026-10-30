(function(root){
 const defs=[
 ['fp-new','New acceptor share','Family planning','MAT_CAR_Age.1','MAT_CAR_Age','New acceptors as a share of new and repeat acceptors.'],
 ['fp-implant','Implant share among new acceptors','Family planning','MAT_CAR_Mtd.1. 3','MAT_CAR_Mtd.1','Method mix; no universal preferred share.'],
 ['cac-fp','Post-abortion FP service ratio','Comprehensive abortion care','MAT_CAC.MA.1','MAT_CAC.Tr.1','Counts may cover different populations; not patient-level uptake.'],
 ['youth-under','Adolescent underweight screening share','Adolescent and youth health','NUT_Adl&Yo_SUW','NUT_Adl&Yo.1','Among adolescents screened; not population prevalence.','lower'],
 ['anc4','ANC4+ / ANC1 service ratio','Antenatal care','MAT_ANC4+_MA.1','MAT_ANC1_GA.1','Period service counts; not cohort retention or population coverage.'],
 ['anc8','ANC8+ / ANC1 service ratio','Antenatal care','MAT_ANC8+.','MAT_ANC1_GA.1','Period service counts; not cohort retention.'],
 ['anc-early','Early ANC first-contact share','Antenatal care','MAT_ANC1_GA.1. 1','MAT_ANC1_GA.1','First ANC contacts at or before 12 weeks.'],
 ['pnc','PNC / live-birth service ratio','Postnatal care','MAT_EPNC.1','MAT_SBR.LB.','Visits within 7 days per reported live birth; not unique-woman coverage.'],
 ['pnc24','PNC 0–24-hour visit share','Postnatal care','MAT_EPNC.1. 1','MAT_EPNC.1','Share of reported postnatal visits within 7 days.'],
 ['pmtct','Early infant HIV test positivity','PMTCT','MTCT_HEI_EID.1.1. 1','MTCT_HEI_EID.1.1','Positive results among infants tested at 0–2 months; not a transmission-rate estimate.','lower'],
 ['epi-drop','Pentavalent dose dropout proxy','EPI','EPI_DPT3.1.','EPI_DPT1.1.','(Dose 1 − dose 3) / dose 1. Period counts are not a linked cohort.','lower','dropout'],
 ['epi-waste','Pentavalent opened-dose wastage','EPI','EPI_VWR_Penta_giv.','EPI_VWR_Penta_opn.','(Opened − given) / opened; excludes unopened-stock losses.','lower','dropout'],
 ['kmc','KMC initiation share','Child health','CH_KMC.1.','CH_KMC.2.','Initiated among reported eligible low-weight/premature newborns.'],
 ['resus','Neonatal resuscitation survival share','Child health','CH_ASPH.1.','CH_ASPH.2.','Reported survived among resuscitated neonates.'],
 ['lbw','Low-birthweight share among weighed births','Nutrition','NUT_LBW.1.','NUT_LBW.2.','Birthweight <2,500 g among weighed live births.','lower'],
 ['sam','SAM share among screened under-5s','Nutrition','NUT_U5SMN.SAM.1','NUT_U5SMN.1','Severe acute malnutrition among children screened; not population prevalence.','lower'],
 ['ecd','Developmental delay screening share','ECD','CH_CHDMS. 2','CH_CHDMS','Confirmed developmental delay among children assessed by status.','lower'],
 ['ecd-suspect','Suspected developmental delay screening share','ECD','CH_CHDMS. 1','CH_CHDMS','Suspected delay among children assessed by status; not a diagnosis.','lower']
 ].map(([id,name,service,numerator,denominator,note,direction='higher',kind='ratio'])=>({id,name,service,numerator,denominator,note,direction,kind}));
 const norm=s=>s.replace(/\s+/g,'');
 function read(data,code,facility){const rows=data.indicators.filter(r=>norm(r.code)===norm(code));if(rows.length!==1)return null;return facility==='all'?rows[0].total:rows[0].values[Number(facility)]}
 function calculate(data,m,facility='all',target=null){const n=read(data,m.numerator,facility),d=read(data,m.denominator,facility);if(n===null||d===null)return {value:null,n,d,status:'missing',label:'Missing input'};if(d===0)return {value:null,n,d,status:'missing',label:'Zero denominator'};const value=(m.kind==='dropout'?d-n:n)/d*100;if(n<0||d<0||value<0||value>100)return {value,n,d,status:'invalid',label:'Review data / period alignment'};if(target===null||!Number.isFinite(target))return {value,n,d,status:'neutral',label:'No target set'};const met=m.direction==='lower'?value<=target:value>=target;return {value,n,d,status:met?'good':'warning',label:met?'Meets local target':'Below local performance target'};}
 function quality(data,rows,facility='all'){
 const indices=facility==='all'?data.facilities.map((_,i)=>i):[Number(facility)];
 return indices.map(i=>{const cells=rows.map(r=>r.values[i]);const reported=cells.filter(v=>v!==null).length;const negatives=cells.filter(v=>v!==null&&v<0).length;let mismatch=0,checked=0;
 for(const r of rows){if(r.total!==null&&r.values.every(v=>v!==null)){checked++;if(Math.abs(r.values.reduce((a,b)=>a+b,0)-r.total)>0.01)mismatch++}}
 return {name:data.facilities[i],reported,expected:cells.length,nonblank:cells.length?reported/cells.length*100:null,negatives,mismatch,checked};});
 }
 root.Measures={defs,read,calculate,quality};if(typeof module!=='undefined')module.exports=root.Measures;
})(globalThis);
