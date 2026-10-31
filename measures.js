(function(root){
 const defs=[
  {
    "id": "kpi-1",
    "name": "Postpartum family planning acceptors",
    "target": 37,
    "service": "Family planning",
    "numerator": "MAT_IPPCAR_Age",
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "Postpartum acceptors are available; eligible postpartum population denominator must be supplied and confirmed.",
    "proxy": {
      "numerator": "MAT_IPPCAR_Age",
      "denominator": "L&D_SBA.1.",
      "kind": "ratio",
      "label": "Postpartum FP acceptors per skilled-attended birth",
      "note": "Operational service ratio. Eligible unique postpartum women are not identified."
    }
  },
  {
    "id": "kpi-2",
    "name": "Family planning acceptors",
    "target": 82219,
    "service": "Family planning",
    "numerator": "MAT_CAR_Age",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-3",
    "name": "Long-acting family planning coverage",
    "target": 50,
    "service": "Family planning",
    "numerator": [
      "MAT_CAR_Mtd.1. 3",
      "MAT_CAR_Mtd.1. 4",
      "MAT_CAR_Mtd.1. 5",
      "MAT_CAR_Mtd.1. 6",
      "MAT_CAR_Mtd.2. 3",
      "MAT_CAR_Mtd.2. 4",
      "MAT_CAR_Mtd.2. 5",
      "MAT_CAR_Mtd.2. 6"
    ],
    "denominator": "MAT_CAR_Mtd",
    "kind": "ratio",
    "direction": "higher",
    "note": "Long-acting/permanent methods: implants, IUCD, vasectomy and tubal ligation, new plus repeat, divided by all method acceptors. Blank components are not assumed zero; confirm local method definition."
  },
  {
    "id": "kpi-4",
    "name": "Premature removal of long-acting family planning methods within six months",
    "target": 0.75,
    "service": "Family planning",
    "numerator": "MAT_LAFPPR.1",
    "denominator": [],
    "kind": "ratio",
    "direction": "lower",
    "note": "Numerator available. Matching insertion cohort/denominator unavailable; total removals is not a substitute.",
    "proxy": {
      "numerator": "MAT_LAFPPR.1",
      "denominator": "MAT_TLAFPR.",
      "kind": "ratio",
      "label": "Early removals as a share of all removals",
      "note": "Not the risk of early removal among an insertion cohort."
    }
  },
  {
    "id": "kpi-5",
    "name": "Safe abortion care",
    "target": 73.1,
    "service": "Comprehensive abortion care",
    "numerator": "MAT_CAC_SAC",
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "Safe abortion service count available. Target denominator (need/eligible cases) must be confirmed; service mix is not coverage.",
    "proxy": {
      "numerator": "MAT_CAC_SAC",
      "denominator": "MAT_CAC",
      "kind": "ratio",
      "label": "Safe abortion share of reported abortion care",
      "note": "Service mix, not coverage of estimated abortion need."
    }
  },
  {
    "id": "kpi-6",
    "name": "Post-abortion family planning coverage",
    "target": 90,
    "service": "Comprehensive abortion care",
    "numerator": "MAT_CAC.MA.1",
    "denominator": "MAT_CAC.Tr.1",
    "kind": "ratio",
    "direction": "higher",
    "note": "Post-abortion FP acceptors / reported comprehensive abortion care recipients. Confirm both rows cover the same eligible recipients."
  },
  {
    "id": "kpi-7",
    "name": "Adolescents and young people receiving integrated sexual and reproductive health information",
    "target": 20400,
    "service": "Adolescent and youth health",
    "numerator": null,
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "No matching indicator for this service was found in the supplied MCH data; related generic counts are not substituted."
  },
  {
    "id": "kpi-8",
    "name": "Adolescents and young people affected by gender-based violence linked to a one-stop center",
    "target": 100,
    "service": "Adolescent and youth health",
    "numerator": null,
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "No matching indicator for this service was found in the supplied MCH data; related generic counts are not substituted."
  },
  {
    "id": "kpi-9",
    "name": "Adolescents and young people screened for sexually transmitted infections",
    "target": 20400,
    "service": "Adolescent and youth health",
    "numerator": null,
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "No matching indicator for this service was found in the supplied MCH data; related generic counts are not substituted."
  },
  {
    "id": "kpi-10",
    "name": "Adolescents and young people screened for malnutrition",
    "target": 4770,
    "service": "Adolescent and youth health",
    "numerator": "NUT_Adl&Yo.1",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-11",
    "name": "Mothers receiving postnatal care",
    "target": 100,
    "service": "Postnatal care",
    "numerator": "MAT_EPNC.1",
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "Available numerator counts postnatal visits, not unique mothers. Eligible mothers and matching unique-recipient numerator are required.",
    "proxy": {
      "numerator": "MAT_EPNC.1",
      "denominator": "MAT_SBR.LB.",
      "kind": "ratio",
      "label": "Postnatal visits per reported live birth",
      "note": "Visits, not deduplicated mothers; not population coverage."
    }
  },
  {
    "id": "kpi-12",
    "name": "Mother-to-child HIV transmission rate among children under 18 months",
    "target": 1.75,
    "service": "PMTCT",
    "numerator": null,
    "denominator": [],
    "kind": "ratio",
    "direction": "lower",
    "note": "Under-18-month cohort and final infection outcomes are unavailable. EID positivity is not substituted for transmission rate.",
    "proxy": {
      "numerator": "MTCT_HEI_ABTST.1. 1",
      "denominator": "MTCT_HEI_ABTST.1",
      "kind": "ratio",
      "label": "Positivity among confirmatory antibody tests by 18 months",
      "note": "Test positivity, not transmission rate in the under-18-month birth cohort."
    }
  },
  {
    "id": "kpi-13",
    "name": "Pregnancy rate among adolescents aged 19 years or younger",
    "target": 0.269,
    "service": "Adolescent and youth health",
    "numerator": "MAT_TngP_TPR",
    "denominator": [],
    "kind": "ratio",
    "direction": "lower",
    "note": "Teenage positive pregnancy tests are available; adolescent population denominator and unique pregnancies are not.",
    "proxy": {
      "numerator": "MAT_TngP_TPR",
      "denominator": "MAT_Tngtst.",
      "kind": "ratio",
      "label": "Adolescent share of positive pregnancy tests",
      "note": "Not the pregnancy rate among the adolescent population."
    }
  },
  {
    "id": "kpi-14",
    "name": "Children protected at birth (PAB)",
    "target": 22186,
    "service": "EPI",
    "numerator": "name:Number of infants whose mothers had protective doses of TD against NNT (PAB)",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-15",
    "name": "Institutional maternal death rate",
    "target": 0.0099,
    "service": "Other maternal care",
    "numerator": "MAT_IMD.1.",
    "denominator": "L&D_SBA.1.",
    "kind": "ratio",
    "direction": "lower",
    "note": "Institutional maternal deaths / skilled-attended births × 100. Operational facility ratio; confirm the births are the intended denominator, not the standard per-100,000 live-birth MMR."
  },
  {
    "id": "kpi-16",
    "name": "Stillbirth rate",
    "target": 0.26,
    "service": "Other maternal care",
    "numerator": "MAT_SBR.SB.",
    "denominator": [
      "MAT_SBR.SB.",
      "MAT_SBR.LB."
    ],
    "kind": "ratio",
    "direction": "lower",
    "note": "Stillbirths / (stillbirths + live births) × 100; source birth counts must share reporting scope."
  },
  {
    "id": "kpi-17",
    "name": "Institutional neonatal death rate among live births",
    "target": 0.064,
    "service": "Child health",
    "numerator": "CH_IND",
    "denominator": "MAT_SBR.LB.",
    "kind": "ratio",
    "direction": "lower",
    "note": "Institutional neonatal deaths / reported live births × 100; source institutional populations must align."
  },
  {
    "id": "kpi-18",
    "name": "Mothers receiving ANC1",
    "target": 24651,
    "service": "Antenatal care",
    "numerator": "MAT_ANC1_GA.1",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-19",
    "name": "Mothers receiving ANC4 or more visits",
    "target": 22186,
    "service": "Antenatal care",
    "numerator": "MAT_ANC4+_MA.1",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-20",
    "name": "ANC dropout rate from ANC1 to ANC4",
    "target": 10,
    "service": "Antenatal care",
    "numerator": "MAT_ANC4+_MA.1",
    "denominator": "MAT_ANC1_GA.1",
    "kind": "dropout",
    "direction": "lower",
    "note": "(ANC1 − ANC4+) / ANC1 × 100; aggregate-period proxy, not linked-cohort retention."
  },
  {
    "id": "kpi-21",
    "name": "Mothers receiving ANC8 or more visits",
    "target": 7387,
    "service": "Antenatal care",
    "numerator": "MAT_ANC8+.",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-22",
    "name": "Skilled birth attendance",
    "target": 18636,
    "service": "Other maternal care",
    "numerator": "L&D_SBA.1.",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-23",
    "name": "Uterotonic coverage after delivery",
    "target": 100,
    "service": "Other maternal care",
    "numerator": "MAT_UTER.1",
    "denominator": "L&D_SBA.1.",
    "kind": "ratio",
    "direction": "higher",
    "note": "Uterotonics within first minute / skilled-attended births × 100; confirm denominator matches deliveries eligible for uterotonics."
  },
  {
    "id": "kpi-24",
    "name": "Postpartum haemorrhage (PPH)",
    "target": 2,
    "service": "Other maternal care",
    "numerator": "MAT_PPH.1",
    "denominator": "L&D_SBA.1.",
    "kind": "ratio",
    "direction": "lower",
    "note": "PPH cases / skilled-attended births × 100; numerator includes home cases, so source scope must be reconciled before clinical use."
  },
  {
    "id": "kpi-25",
    "name": "ANC1 clients tested for syphilis",
    "target": 100,
    "service": "Antenatal care",
    "numerator": "MAT_SYPH.1",
    "denominator": "MAT_ANC1_GA.1",
    "kind": "ratio",
    "direction": "higher",
    "note": "Pregnant women tested / ANC1 contacts. Service ratio; numerator is not explicitly restricted to ANC1 clients."
  },
  {
    "id": "kpi-26",
    "name": "ANC1 clients tested for hepatitis B (HBV B&C)",
    "target": 100,
    "service": "Antenatal care",
    "numerator": null,
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "Only hepatitis B testing is available (MAT_Hepa); hepatitis C and ANC1-restricted testing are unavailable.",
    "proxy": {
      "numerator": "MAT_Hepa",
      "denominator": "MAT_ANC1_GA.1",
      "kind": "ratio",
      "label": "Hepatitis B tests per ANC1 contact",
      "note": "Hepatitis C and ANC1-only test recipients are not separately available."
    }
  },
  {
    "id": "kpi-27",
    "name": "Pregnant and lactating women tested for HIV who know their status",
    "target": 100,
    "service": "PMTCT",
    "numerator": [
      "MTCT_TST.1.",
      "MTCT_TST.2.",
      "MTCT_TST.3."
    ],
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "Stage-specific tests cannot identify unique women across ANC, delivery and postpartum. Eligible population denominator required."
  },
  {
    "id": "kpi-28",
    "name": "HIV-positive pregnant, postpartum, and lactating mothers receiving ART",
    "target": 95,
    "service": "PMTCT",
    "numerator": null,
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "Unique eligible HIV-positive mothers and deduplicated ART recipients are required; stage counts cannot safely be summed into coverage."
  },
  {
    "id": "kpi-29",
    "name": "HIV-exposed infants receiving prophylaxis",
    "target": 90,
    "service": "PMTCT",
    "numerator": "MTCT_HEI_ARV.1.",
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "ARV prophylaxis numerator available; total eligible HIV-exposed infants is not identified in the supplied scope."
  },
  {
    "id": "kpi-30",
    "name": "HIV positivity among HIV-exposed infants tested by DBS at six weeks",
    "target": 0.78,
    "service": "PMTCT",
    "numerator": null,
    "denominator": [],
    "kind": "ratio",
    "direction": "lower",
    "note": "Available EID bands are 0–2 months and 2–12 months, not a six-week DBS-specific cohort.",
    "proxy": {
      "numerator": "MTCT_HEI_EID.1.1. 1",
      "denominator": "MTCT_HEI_EID.1.1",
      "kind": "ratio",
      "label": "HIV positivity among infants tested at 0–2 months",
      "note": "Broader age window; neither six-week-specific nor confirmed DBS-only."
    }
  },
  {
    "id": "kpi-31",
    "name": "ANC clients’ partners tested for HIV",
    "target": 15,
    "service": "PMTCT",
    "numerator": null,
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "Partner tests include pregnancy, labour and lactation; ANC-only matching numerator is unavailable.",
    "proxy": {
      "numerator": "MTCT_PRN_TST.1.",
      "denominator": "MAT_ANC1_GA.1",
      "kind": "ratio",
      "label": "Pregnancy, labour and lactation partner tests per ANC1",
      "note": "Includes partners outside ANC and is not ANC-only partner testing coverage."
    }
  },
  {
    "id": "kpi-32",
    "name": "VLBW infants receiving kangaroo mother care (KMC)",
    "target": 92,
    "service": "Child health",
    "numerator": null,
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "KMC source uses <2,000 g and/or premature newborns; it does not identify the VLBW (<1,500 g) cohort.",
    "proxy": {
      "numerator": "CH_KMC.1.",
      "denominator": "CH_KMC.2.",
      "kind": "ratio",
      "label": "KMC initiation among <2,000 g and/or premature newborns",
      "note": "Source eligibility differs from VLBW (<1,500 g)."
    }
  },
  {
    "id": "kpi-33",
    "name": "Newborns resuscitated with bag and mask who survive",
    "target": 92,
    "service": "Child health",
    "numerator": "CH_ASPH.1.",
    "denominator": "CH_ASPH.2.",
    "kind": "ratio",
    "direction": "higher",
    "note": "The section NCH_CHIM_AsfxRS explicitly specifies bag-and-mask resuscitation. Survived / total resuscitated × 100.",
    "requiredContext": {
      "code": "CH_ASPH.1.",
      "pattern": "bag.*mask"
    }
  },
  {
    "id": "kpi-34",
    "name": "Pregnant women screened for malnutrition",
    "target": 24651,
    "service": "Nutrition",
    "numerator": "NUT_PreSMN.2. 1",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-35",
    "name": "Pregnant women receiving deworming",
    "target": 19092,
    "service": "Nutrition",
    "numerator": "NUT_DeW.2.",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-36",
    "name": "Pregnant women receiving 90 or more iron-folate tablets",
    "target": 24651,
    "service": "Nutrition",
    "numerator": "NUT_IFA.1",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-37",
    "name": "Children cured after treatment for severe acute malnutrition (SAM)",
    "target": 97,
    "service": "Nutrition",
    "numerator": [
      "NUT_TX-U5MN_SAM_Cur_SC_ 4",
      "NUT_TX-U5MN_SAM_Ext_OTP_E. 1"
    ],
    "denominator": [
      "NUT_TX-U5MN_SAM_Ext_SC_9",
      "NUT_TX-U5MN_SAM_Ext_OTP_E"
    ],
    "kind": "ratio",
    "direction": "higher",
    "note": "Cured SC + OTP / all reported SC + OTP exits × 100. Transfers and other exits are included; confirm local outcome denominator before interpreting against plan."
  },
  {
    "id": "kpi-38",
    "name": "Fully immunized children",
    "target": 22470,
    "service": "EPI",
    "numerator": "EPI_FI.1.",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-39",
    "name": "Under-five children treated with antibiotics for pneumonia",
    "target": 9105,
    "service": "Child health",
    "numerator": "CH_TX_PNEU.1.",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "The workbook section CH_TX_PNEU explicitly defines under-five pneumonia antibiotic treatment; CH_TX_PNEU.1. provides the count.",
    "requiredContext": {
      "code": "CH_TX_PNEU.1.",
      "pattern": "antibiotic"
    }
  },
  {
    "id": "kpi-40",
    "name": "Under-five children with diarrhea receiving ORS and zinc or ORS",
    "target": 11787,
    "service": "Child health",
    "numerator": [
      "CH_TX_DIAR.1.",
      "CH_TX_DIAR.2."
    ],
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Sum of ORS-and-zinc and ORS-only treatments; assumes disjoint treatment categories."
  },
  {
    "id": "kpi-41",
    "name": "Under-five children receiving developmental monitoring through ECD at health facilities",
    "target": 98,
    "service": "ECD",
    "numerator": "CH_CHDM",
    "denominator": [],
    "kind": "ratio",
    "direction": "higher",
    "note": "Developmental assessments available; eligible under-five population denominator unavailable.",
    "proxy": {
      "numerator": "CH_CHDM",
      "denominator": null,
      "kind": "count",
      "label": "Developmental assessments reported",
      "note": "Eligible under-five population denominator is unavailable."
    }
  },
  {
    "id": "kpi-42",
    "name": "Households receiving parental-coaching home visits",
    "target": 30072,
    "service": "ECD",
    "numerator": null,
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "No matching indicator for this service was found in the supplied MCH data; related generic counts are not substituted."
  },
  {
    "id": "kpi-43",
    "name": "Children receiving Penta 1",
    "target": 22929,
    "service": "EPI",
    "numerator": "EPI_DPT1.1.",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-44",
    "name": "Children receiving Penta 3",
    "target": 22929,
    "service": "EPI",
    "numerator": "EPI_DPT3.1.",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-45",
    "name": "Penta vaccination dropout rate",
    "target": 2,
    "service": "EPI",
    "numerator": "EPI_DPT3.1.",
    "denominator": "EPI_DPT1.1.",
    "kind": "dropout",
    "direction": "lower",
    "note": "(Penta 1 − Penta 3) / Penta 1 × 100. Aggregate-period proxy, not a linked cohort."
  },
  {
    "id": "kpi-46",
    "name": "Children receiving MCV1",
    "target": 22470,
    "service": "EPI",
    "numerator": "EPI_MCV1.1.",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-47",
    "name": "Children receiving MCV2",
    "target": 22381,
    "service": "EPI",
    "numerator": "name:Number of children (15-23 ) months of age who have received second dose of measles vaccine",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  },
  {
    "id": "kpi-48",
    "name": "Low birth weight among live-born infants who were weighed",
    "target": 4.9,
    "service": "Nutrition",
    "numerator": "NUT_LBW.1.",
    "denominator": "NUT_LBW.2.",
    "kind": "ratio",
    "direction": "lower",
    "note": "Live births weighing <2,500 g / all live births weighed × 100."
  },
  {
    "id": "kpi-49",
    "name": "Children aged 6–59 months receiving vitamin A twice yearly",
    "target": 29095,
    "service": "Nutrition",
    "numerator": "NUT_VITA.2. 2",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Uses second-dose count as the twice-yearly delivery proxy. Does not establish individually linked two-dose receipt."
  },
  {
    "id": "kpi-50",
    "name": "Children aged 24–59 months receiving deworming twice yearly",
    "target": 18000,
    "service": "Nutrition",
    "numerator": "NUT_DeW.1. 2",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Uses second-dose count; not proof of linked two-dose receipt per child."
  },
  {
    "id": "kpi-51",
    "name": "Children under two receiving monthly growth monitoring and promotion",
    "target": 9130,
    "service": "Nutrition",
    "numerator": null,
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "NTR_GMP.1 counts weights recorded; unique children with monthly attendance across the year cannot be identified.",
    "proxy": {
      "numerator": "NTR_GMP.1",
      "denominator": null,
      "kind": "count",
      "label": "Under-two weights recorded during GMP sessions",
      "note": "Counts weighing events, not unique children attending every month."
    }
  },
  {
    "id": "kpi-52",
    "name": "Under-five children receiving nutrition screening",
    "target": 29413,
    "service": "Nutrition",
    "numerator": "NUT_U5SMN.1",
    "denominator": null,
    "kind": "count",
    "direction": "higher",
    "note": "Source-reported service counts for the uploaded aggregate period."
  }
];
 const sam=defs.find(m=>m.id==='kpi-37');sam.proxy={numerator:'NUT_TX-U5MN_SAM_Ext_OTP_E. 1',denominator:'NUT_TX-U5MN_SAM_Ext_OTP_E',kind:'ratio',label:'SAM cure share among OTP exits only',note:'OTP-only result. Stabilization-centre outcomes are missing; this is not the combined SC + OTP KPI.'};
 const norm=s=>String(s).replace(/\s+/g,'');
 // Infer a missing partition component only when every observed nonnegative sibling
 // already sums exactly to its explicitly defined parent. Never apply this globally.
 const partitions=[
 ...[1,2].map(g=>({parent:'MAT_CAR_Mtd.'+g,children:[1,2,3,4,5,6,7].map(i=>'MAT_CAR_Mtd.'+g+'. '+i)})),
 {parent:'MTCT_HEI_EID.1.1',children:['MTCT_HEI_EID.1.1. 1','MTCT_HEI_EID.1.1. 2']},
 {parent:'MTCT_HEI_ABTST.1',children:['MTCT_HEI_ABTST.1. 1','MTCT_HEI_ABTST.1. 2']}
 ];
 function raw(data,ref,facility='all'){
 if(!ref||Array.isArray(ref))return null;
 const rows=data.indicators.filter(r=>ref.startsWith('name:')?r.name===ref.slice(5):norm(r.code)===norm(ref));
 if(rows.length!==1)return null;return (facility==='all'?rows[0].total:rows[0].values[Number(facility)])??null;
 }
 function inferredZero(data,ref,facility){
 if(typeof ref!=='string'||data.indicators.filter(r=>norm(r.code)===norm(ref)).length!==1)return false;
 const p=partitions.find(p=>p.children.some(c=>norm(c)===norm(ref)));if(!p)return false;
 const parent=raw(data,p.parent,facility),values=p.children.map(c=>raw(data,c,facility));
 return parent!==null&&parent>=0&&values.some(v=>v!==null)&&values.every(v=>v===null||v>=0)&&Math.abs(values.reduce((a,v)=>a+(v??0),0)-parent)<1e-9;
 }
 function read(data,ref,facility='all'){
 if(!ref||(Array.isArray(ref)&&!ref.length))return null;
 if(Array.isArray(ref)){const values=ref.map(c=>read(data,c,facility));return values.some(v=>v===null)?null:values.reduce((a,b)=>a+b,0)}
 const value=raw(data,ref,facility);return value===null&&inferredZero(data,ref,facility)?0:value;
 }
 function inferredInputs(data,refs,facility){return refs.flat(Infinity).filter(ref=>typeof ref==='string'&&raw(data,ref,facility)===null&&inferredZero(data,ref,facility))}
 function related(data,m,facility='all'){
 if(!m.proxy)return null;const p=m.proxy,n=read(data,p.numerator,facility),d=p.kind==='count'?null:read(data,p.denominator,facility);
 return {...p,n,d,value:n===null||(p.kind!=='count'&&(d===null||d===0))?null:p.kind==='count'?n:n/d*100,inferred:inferredInputs(data,[p.numerator,p.denominator],facility)};
 }
 function formula(m){const ref=x=>Array.isArray(x)?x.length?'('+x.join(' + ')+')':'Required eligible denominator':x||'Required matching numerator';return m.kind==='count'?ref(m.numerator):m.kind==='dropout'?'('+ref(m.denominator)+' − '+ref(m.numerator)+') / '+ref(m.denominator)+' × 100':ref(m.numerator)+' / '+ref(m.denominator)+' × 100'}
 function calculate(data,m,facility='all',target=null,annualConfirmed=false){
 const n=read(data,m.numerator,facility),d=m.kind==='count'?null:read(data,m.denominator,facility);
 if(m.requiredContext){const row=data.indicators.find(r=>norm(r.code)===norm(m.requiredContext.code));if(!new RegExp(m.requiredContext.pattern,'i').test(row?.context?.name||''))return {value:null,n,d,status:'missing',label:'Needs explicit service context',achievement:null};}
 if(n===null||(m.kind!=='count'&&d===null))return {value:null,n,d,status:'missing',label:'Needs matching data / definition',achievement:null};
 if(m.kind!=='count'&&d===0)return {value:null,n,d,status:'missing',label:'Zero denominator',achievement:null};
 if(m.kind==='count'&&!Number.isInteger(n))return {value:n,n,d,status:'invalid',label:'Fractional count; review source',achievement:null};
 const value=m.kind==='count'?n:(m.kind==='dropout'?d-n:n)/d*100;
 if(n<0||(d!==null&&d<0)||value<0||(m.kind!=='count'&&value>100))return {value,n,d,status:'invalid',label:'Review data / period alignment',achievement:null};
 if(m.kind==='count'&&(facility!=='all'||!annualConfirmed))return {value,n,d,status:'neutral',label:facility!=='all'?'Subcity plan; facility allocation required':'Confirm annual-plan period to assess',achievement:null};
 target=target??m.target;
 if(!Number.isFinite(target))return {value,n,d,status:'neutral',label:'No target set',achievement:null};
 const met=m.direction==='lower'?value<=target:value>=target;
 return {value,n,d,status:met?'good':'warning',label:met?'Meets annual plan':'Outside annual plan',achievement:m.kind==='count'?value/target*100:null};
 }
 function quality(data,rows,facility='all'){
 const indices=facility==='all'?data.facilities.map((_,i)=>i):[Number(facility)];
 return indices.map(i=>{const cells=rows.map(r=>r.values[i]);const reported=cells.filter(v=>v!==null).length;const negatives=cells.filter(v=>v!==null&&v<0).length;let mismatch=0,checked=0;
 for(const r of rows){if(r.total!==null&&r.values.every(v=>v!==null)){checked++;if(Math.abs(r.values.reduce((a,b)=>a+b,0)-r.total)>0.01)mismatch++}}
 return {name:data.facilities[i],reported,expected:cells.length,nonblank:cells.length?reported/cells.length*100:null,negatives,mismatch,checked};});
 }
 root.Measures={defs,read,calculate,quality,formula,related,inferredInputs};if(typeof module!=='undefined')module.exports=root.Measures;
})(globalThis);
