(function(root){
 const isSubcity=name=>String(name).replace(/[^a-z]/gi,'').toLowerCase()==='lemikurasubcityhealthoffice';
 function normalize(data){
  const indices=data.facilities.map((name,i)=>isSubcity(name)?i:-1).filter(i=>i>=0);
  if(indices.length>1)throw Error('More than one Lemi Kura Sub City Health Office column found.');
  if(!indices.length)return data;
  const aggregateIndex=indices[0];
  return {...data,aggregate:{name:data.facilities[aggregateIndex],source:'Dedicated subcity column'},facilities:data.facilities.filter((_,i)=>i!==aggregateIndex),indicators:data.indicators.map(r=>({...r,exportTotal:r.total,total:r.values[aggregateIndex]??null,values:r.values.filter((_,i)=>i!==aggregateIndex)}))};
 }
 root.OrgUnits={normalize,isSubcity};if(typeof module!=='undefined')module.exports=root.OrgUnits;
})(globalThis);
