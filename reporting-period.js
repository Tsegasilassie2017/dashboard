(function(root){
 const monthGroups=[['meskerem','meskrem'],['tikemet','tikimt','teqemt'],['hidar'],['tahesas','tahsis'],['tir'],['yekatit'],['megabit'],['miazia','miyazia'],['genbot','ginbot'],['sene'],['hamle'],['nehase','nehassie']];
 const names=Object.fromEntries(monthGroups.flatMap((g,i)=>g.map(n=>[n,i+1])));
 const pattern=new RegExp('\\b('+Object.keys(names).join('|')+')\\s+(\\d{4})\\b','gi');
 function label(n){return !n?'Period not detected':n===1?'1 month':n===3?'Quarter · 3 months':n===6?'Half year · 6 months':n===12?'Annual · 12 months':n+' months'}
 function detect(text){
  text=String(text||'');const matches=[...text.matchAll(pattern)].map(m=>({month:names[m[1].toLowerCase()],year:Number(m[2]),index:m.index,length:m[0].length}));
  const missing=reason=>({months:null,label:label(null),reason});
  if(/pagum/i.test(text))return missing('Pagume is not one of the 12 annual planning months. Select the applicable planning duration.');
  if(!matches.length)return missing('No recognized Ethiopian month/year list or range. Select 1–12 months.');
  let months;
  if(text.includes(';')){const parts=text.split(';').map(s=>s.trim()).filter(Boolean);if(parts.some(p=>[...p.matchAll(pattern)].length!==1))return missing('Some month labels could not be recognized. Select the reporting duration.');months=new Set(matches.map(m=>m.year+'-'+m.month)).size;}
  else if(matches.length===2&&/[-–—]|\bto\b/i.test(text.slice(matches[0].index+matches[0].length,matches[1].index))){months=(matches[1].year-matches[0].year)*12+matches[1].month-matches[0].month+1;}
  else {months=new Set(matches.map(m=>m.year+'-'+m.month)).size;const rest=text.replace(pattern,'').replace(/\bEC\b/gi,'').replace(/[\s,()]/g,'');if(rest)return missing('Ambiguous period text. Select the reporting duration.');}
  if(months<1||months>12)return missing('The period is outside the supported 1–12 planning months.');
  return {months,label:label(months),reason:'Unique named Ethiopian planning months; not the number of facility reports.'};
 }
 root.ReportingPeriod={detect,label};if(typeof module!=='undefined')module.exports=root.ReportingPeriod;
})(globalThis);
