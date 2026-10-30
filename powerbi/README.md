# Power BI / DAX model

The web dashboard executes equivalent JavaScript formulas, not DAX. `measures.dax` supplies matching DAX definitions for Power BI. These definitions have not been executed in a Power BI engine in this environment.

Prepare the same scoped indicators through `NUT_Adl&Yo_SVObe_1.1. 4` inclusive. Normalize Code by removing whitespace. Keep blank values as null, not zero. Preserve separate code values even when labels repeat. Validate uniqueness and numeric types before loading.

Tables:

- Observations: Code, Facility, Period, Value. Unpivot facility columns to one row per code/facility/period. Do not include the Total column here.
- ReportedTotals: Code, Period, Value. One source total per code and aggregate period. Do not duplicate totals for each facility.
- Indicators: Code and Name, unique Code. One-to-many, single-direction relationships to Code in both fact tables.
- Facilities: unique Facility, one-to-many single-direction relationship to Observations only.
- Periods: unique Period, one-to-many single-direction relationships to both fact tables.

Use Facilities for facility slicers and chart axes. Without a facility filter, measures use ReportedTotals to match the dashboard's All facilities view. With a facility filter they use Observations. Use a single aggregate period; these inputs do not contain monthly observations. Do not relate Facilities to ReportedTotals. Do not sum duplicate indicator representations, age breakdowns, and their parent totals together.

Create each definition in measures.dax as a separate measure. Format ratio measures as Percentage (e.g. 0.0%). DAX returns fractions, while the web view displays fractions multiplied by 100. Blank numerator, blank denominator or zero denominator returns BLANK, never zero. Negative or >100% results are retained and flagged by the corresponding Input Review measure. Use that measure for review tables; a calculable result does not establish validity.

Visuals: horizontal facility bars for comparing ratios, KPI cards for the selected facility or reported overall total, tooltips for formula/inputs/interpretation, and a matrix for data availability and validation flags. Use time-series charts only after genuine period-level data are supplied. Avoid gauges without an agreed target and avoid pies for overlapping service counts.

Palette (DHIS2-inspired, not a claimed official universal DHIS2 palette): blue #276696 for neutral measures, green #2E7D32 for meeting a locally approved target, amber #A66B00 for missing a target, red #C62828 for invalid/out-of-range inputs, gray #687681 for missing values. Always include labels. There are no default clinical performance targets. Do not interpret data-availability percentages as DHIS2 dataset reporting completeness: that requires expected/submitted reports and applicability metadata unavailable here.

For coverage measures (ANC, vaccination, etc.), supply approved population denominators and compatible reporting/catchment periods first. The available service ratios must not be relabeled population coverage, cohort retention, or transmission rates.
