(function(root){
 const categories=['Family planning','Comprehensive abortion care','Adolescent and youth health','Antenatal care','Postnatal care','PMTCT','EPI','Child health','Nutrition','ECD'];
 const cutoff='NUT_Adl&Yo_SVObe_1.1.4';const normalize=c=>c.replace(/\s+/g,'');
 function category(code,name){const c=code.trim();
 if(/^MAT_(CAR|IPPCAR|LAFPPR|TLAFPR)/.test(c))return categories[0];
 if(c.startsWith('MAT_CAC'))return categories[1];
 if(/^MAT_Tng|^NUT_Adl/.test(c))return categories[2];
 if(/^MAT_(ANC|SYPH|Hepa|Prp)/.test(c))return categories[3];
 if(c.startsWith('MAT_EPNC'))return categories[4];
 if(c.startsWith('MTCT_'))return categories[5];
 if(c.startsWith('EPI_')||(!c&&/vaccine|measles|protective doses/i.test(name)))return categories[6];
 if(/^CH_CHDM/.test(c))return categories[9];
 if(c.startsWith('CH_'))return categories[7];
 if(/^NUT_|^NTR_/.test(c)||c==='')return categories[8];
 return 'Other maternal care';
 }
 function scope(d){const end=d.indicators.findIndex(r=>normalize(r.code)===cutoff);if(end<0)throw Error('The required end indicator NUT_Adl&Yo_SVObe_1.1. 4 was not found. Import the full Monthly common dataset through this indicator.');
 return {...d,indicators:d.indicators.slice(0,end+1).map(r=>({...r,section:category(r.code,r.name)}))};}
 root.MCH={categories,scope};if(typeof module!=='undefined')module.exports=root.MCH;
})(globalThis);
