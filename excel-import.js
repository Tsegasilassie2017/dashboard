/* Browser-local import of Monthly common dataset workbooks. */
(function(root){
 function parseRows(rows){
  const clean=v=>String(v??'').replace(/\s+/g,' ').trim();
  const h=rows.findIndex(r=>clean(r[0]).toLowerCase()==='s.no'&&clean(r[1]).toLowerCase()==='activity');
  if(h<0)throw Error('Expected a Monthly common dataset table with S.No and Activity columns.');
  const header=rows[h].map(clean),totalIndex=header.findIndex((c,i)=>i>1&&c.toLowerCase()==='total');
  if(totalIndex<3)throw Error('The table needs facility columns followed by a Total column.');
  const facilities=header.slice(2,totalIndex);if(facilities.some(x=>!x))throw Error('Facility names cannot be blank.');
  const number=(v,row)=>{if(v===null||v===undefined||clean(v)==='')return null;const n=Number(clean(v).replace(/,/g,''));if(!Number.isFinite(n))throw Error('Non-numeric value in '+row+'. Check the spreadsheet.');return n};
  let section='General';const indicators=[];
  for(const row of rows.slice(h+1)){
   const code=clean(row[0]),name=clean(row[1]);if(!code||!name)continue;
   if(row.length<=3){if(!code.includes('_')&&!code.includes('.'))section=name;continue}
   indicators.push({code,name,section,values:facilities.map((_,i)=>number(row[i+2],code)),total:number(row[totalIndex],code)});
  }
  if(!indicators.length)throw Error('No indicator rows found in this workbook.');
  const title=rows.slice(0,h).flat().map(clean).find(x=>x.includes('('))||'';
  const period=title.includes('(')?title.slice(title.indexOf('(')+1,title.lastIndexOf(')')):'Period not specified';
  return {facilities,indicators,period};
 }
 async function importExcel(file){
  const buffer=await file.arrayBuffer();const prefix=new TextDecoder().decode(buffer.slice(0,4096));
  if(/<(?:table|style|html)\b/i.test(prefix)){
   const doc=new DOMParser().parseFromString(new TextDecoder().decode(buffer),'text/html');
   return parseRows([...doc.querySelectorAll('tr')].map(r=>[...r.children].filter(c=>/^(TD|TH)$/.test(c.tagName)).map(c=>c.textContent)));
  }
  const workbook=XLSX.read(buffer,{type:'array',cellFormula:false,cellHTML:false,cellStyles:false});
  for(const name of workbook.SheetNames){const rows=XLSX.utils.sheet_to_json(workbook.Sheets[name],{header:1,raw:true,blankrows:false});if(rows.some(r=>String(r[0]??'').trim().toLowerCase()==='s.no'))return parseRows(rows)}
  throw Error('No Monthly common dataset table found. Use the same S.No / Activity / facilities / Total layout as the supplied export.');
 }
 root.HealthImport={parseRows,importExcel};if(typeof module!=='undefined')module.exports=root.HealthImport;
})(globalThis);
