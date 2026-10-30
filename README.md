# HealthScope KPI dashboard

Dashboard of the supplied Monthly common dataset: 10 health facilities, 398 maternal and child health indicator rows, Hamle 2017–Sene 2018 in the Ethiopian calendar.

## Run

Requires Python 3. From this directory run `npm start`, or `python -m http.server 3000 --bind 127.0.0.1`. No dependency installation or credentials are required. Open the server in a browser.

Features: facility filtering, outpatient comparisons, maternal service counts, searchable and paginated indicator explorer, category and reporting filters, CSV export of the filtered results, responsive layout.

## Local data (excluded from GitHub)

Health data is deliberately excluded by `.gitignore`. Use the **Load Excel file** picker to select your private Excel workbook or dashboard JSON. The picker reads files in the browser without uploading them; a local `data/indicators.json` can still be selected manually. A fresh clone starts with an empty dashboard until data is loaded. JSON format: `{ "facilities": ["Facility A"], "period": "Reporting period", "indicators": [{"code":"indicator_code", "name":"Indicator name", "section":"Category", "values":[123], "total":123}] }`. Use null for unreported values. `npm test` runs private-data validation when the local file exists, and skips it when absent.

## Data interpretation

The supplied .xls is an HTML table export. `data/indicators.json` preserves the reported facility values and source totals, with blank cells represented as null. Its numbers aggregate the 12 months listed in the source; month-by-month trends cannot be recovered. No monthly trend, coverage target, or patient retention claim is inferred. Indicators overlap and must not be summed into one service total. Reported totals are used as supplied, not silently recalculated. Facility reporting counts indicate nonblank cells, not reporting completeness across months. Outpatient counts include repeat visits. These data describe health-service aggregates, not unique patients.

## Excel import

Select **Load Excel file** to prepare the dashboard directly from .xls or .xlsx files using the Monthly common dataset layout: S.No, Activity, facility columns, Total. HTML exports with an .xls extension are supported, including the original supplied export. Other spreadsheet layouts show a clear error instead of guessing KPI definitions. JSON remains supported. Files are processed locally and are never uploaded or included in Git. The period is read from the workbook title. Reloading clears the imported data. No automatic private-data request is made.

Excel parsing uses the vendored `@e965/xlsx` 0.20.3 distribution (Apache-2.0, license in vendor/XLSX-LICENSE); its package SHA-512 was verified before extraction. No CDN request is needed.

## Maternal and child health scope

Excel and JSON imports include only rows through `NUT_Adl&Yo_SVObe_1.1. 4`, inclusive. The supplied export yields 398 rows. Imports missing that endpoint are rejected so unrelated services cannot silently appear. The sidebar filters cards, facility comparison, highlights, explorer, and CSV export by family planning, comprehensive abortion care, adolescent and youth health, antenatal care, postnatal care, PMTCT, EPI, child health, nutrition, and ECD. Adolescent nutrition is in adolescent and youth health; developmental milestone indicators are in ECD. Delivery and other maternal care remain in Overview. No overlapping service counts are summed.

## Calculated measures and data quality

The performance panel provides 18 documented ratios across all ten service areas. Each measure includes its exact numerator/denominator, source inputs, interpretation, and an optional local target. Facility comparison bars display ratios, with local target markers; negative/out-of-range values stay visible and flagged (bar lengths use absolute magnitude; signed values are labeled). Export measures includes inputs, percent, formula, interpretation and status. Targets are held in browser memory only. Missing inputs and zero denominators remain not calculable; percentages are never capped. The palette is DHIS2-inspired rather than a claimed universal official DHIS2 palette.

Quality checks show nonblank cell availability, negative values, and reconciliation of source totals against fully observed facility rows. Ratio review flags can reflect reporting errors, catchment flows or nonaligned cohorts; they are not automatic proof of invalid data. Completeness of expected DHIS2 dataset submissions, population coverage, monthly trends and population-based mortality rates cannot be inferred from this aggregate workbook.

The browser runs JavaScript formulas. Matching DAX and Power BI modeling instructions are in [powerbi/README.md](powerbi/README.md). DAX has not been executed in a Power BI engine here. Do not combine the Total column with facility values when building that model.
