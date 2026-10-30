# HealthScope KPI dashboard

Dashboard of the supplied Monthly common dataset: 10 health facilities, 2,232 indicator rows, Hamle 2017–Sene 2018 in the Ethiopian calendar.

## Run

Requires Python 3. From this directory run `npm start`, or `python -m http.server 3000 --bind 127.0.0.1`. No dependency installation or credentials are required. Open the server in a browser.

Features: facility filtering, outpatient comparisons, maternal service counts, searchable and paginated indicator explorer, category and reporting filters, CSV export of the filtered results, responsive layout.

## Local data (excluded from GitHub)

Health data is deliberately excluded by `.gitignore`. Use the **Load local data** picker to select your private dashboard JSON, or place it at `data/indicators.json` locally. The picker reads files in the browser without uploading them. A fresh clone starts with an empty dashboard until data is loaded. JSON format: `{ "facilities": ["Facility A"], "period": "Reporting period", "indicators": [{"code":"indicator_code", "name":"Indicator name", "section":"Category", "values":[123], "total":123}] }`. Use null for unreported values. `npm test` runs private-data validation when the local file exists, and skips it when absent.

## Data interpretation

The supplied .xls is an HTML table export. `data/indicators.json` preserves the reported facility values and source totals, with blank cells represented as null. Its numbers aggregate the 12 months listed in the source; month-by-month trends cannot be recovered. No monthly trend, coverage target, or patient retention claim is inferred. Indicators overlap and must not be summed into one service total. Reported totals are used as supplied, not silently recalculated. Facility reporting counts indicate nonblank cells, not reporting completeness across months. Outpatient counts include repeat visits. These data describe health-service aggregates, not unique patients.
