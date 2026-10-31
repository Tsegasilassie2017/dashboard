# Power BI / DAX model

The web dashboard executes equivalent JavaScript formulas, not DAX. `measures.dax` supplies matching DAX definitions for Power BI. These definitions have not been executed in a Power BI engine in this environment.

Prepare the same scoped indicators through `NUT_Adl&Yo_SVObe_1.1. 4` inclusive. Normalize Code by removing whitespace. Keep blank values as null, not zero. Preserve separate code values even when labels repeat. Validate uniqueness and numeric types before loading.

Tables:

- Observations: Code, Facility, Period, Value. Unpivot facility columns to one row per code/facility/period. Do not include the Total column here.
- ReportedTotals: Code, Period, Value. One source total per code and aggregate period. Do not duplicate totals for each facility.
- Indicators: IndicatorKey (unique), Code and Name. Use one-to-many, single-direction IndicatorKey relationships to both fact tables; Code may be blank for named source rows.
- Facilities: unique Facility, one-to-many single-direction relationship to Observations only.
- Periods: unique Period, one-to-many single-direction relationships to both fact tables.

Use Facilities for facility slicers and chart axes. Without a facility filter, measures use ReportedTotals to match the dashboard's All facilities view. With a facility filter they use Observations. Use a single aggregate period; these inputs do not contain monthly observations. Do not relate Facilities to ReportedTotals. Do not sum duplicate indicator representations, age breakdowns, and their parent totals together.

Create each definition in measures.dax as a separate measure. The current file defines 52 annual-plan KPIs, not the former 18 exploratory ratios. Count measures and their plans use whole-number formatting. Format ratio measures as Percentage (e.g. 0.0%). DAX returns fractions, while the web view displays fractions multiplied by 100. Blank numerator, blank denominator or zero denominator returns BLANK, never zero. Negative or >100% results are retained and flagged by the corresponding Input Review measure. Use that measure for review tables; a calculable result does not establish validity.

Visuals: horizontal facility bars for comparing ratios, KPI cards for the selected facility or reported overall total, tooltips for formula/inputs/interpretation, and a matrix for data availability and validation flags. Use time-series charts only after genuine period-level data are supplied. Avoid gauges without an agreed target and avoid pies for overlapping service counts.

Palette (DHIS2-inspired, not a claimed official universal DHIS2 palette): blue #276696 for neutral measures, green #2E7D32 for meeting a locally approved target, amber #A66B00 for missing a target, red #C62828 for invalid/out-of-range inputs, gray #687681 for missing values. Always include labels. There are no default clinical performance targets. Do not interpret data-availability percentages as DHIS2 dataset reporting completeness: that requires expected/submitted reports and applicability metadata unavailable here.

For coverage measures (ANC, vaccination, etc.), supply approved population denominators and compatible reporting/catchment periods first. The available service ratios must not be relabeled population coverage, cohort retention, or transmission rates.

Current mapping requirements: include Indicators[Name] in the dimension, including uniquely keyed records for source rows with blank codes (PAB and MCV2). Normalize whitespace only in Code, not Name. Both fact tables must relate to a surrogate IndicatorKey, not blank Code; otherwise unrelated unnamed indicators can be combined. Unsupported KPI definitions return BLANK, with reasons in the comments. Annual Plan measures use the same count/fraction units as actuals. Do not compare a subcity count plan against individual facilities or a mismatched period. The definitions provide actuals and plan constants; they do not implement the browser's annual-period confirmation or quality/status labels automatically. Validate the model and definitions in Power BI before use.

## Dedicated subcity aggregate

When Lemi Kura Sub City Health Office is present, use that column alone for ReportedTotals. Exclude it from Observations and Facilities. Do not use the workbook Total column, which includes both reporting levels. Keep that exported total only for audit. A blank dedicated subcity value stays blank; never replace it with the exported total or sum of facilities. Preserve section headings as ContextCode / ContextName metadata for validating antibiotic and bag-and-mask measures. DAX formulas alone cannot validate that source context; verify it before loading. The browser's inferred zeros rely on explicit method/test partition reconciliation; DAX remains strict BLANK without preprocessing. Related/proxy measures in the web dashboard are not the annual-plan KPI and are not compared with its target.
