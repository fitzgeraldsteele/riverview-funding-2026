/**
 * Riverview School District 2026 Bonds and Levies Review
 * Data Layer — All proposition data, chart datasets, and sources
 *
 * Data compiled from public records, district publications, news reporting,
 * and King County / Snohomish County election materials.
 */

const APP_DATA = {

  // ─── Election Info ──────────────────────────────────────────────
  election: {
    date: 'February 10, 2026',
    district: 'Riverview School District No. 407',
    county: 'King County, Washington',
    enrollment: 3055,
    schools: 6,
    disclaimer:
      'This is an independent informational resource. It is not affiliated with Riverview School District, any campaign, or any political organization. Data sourced from public records and news reporting. See Sources section for all citations.',
  },

  // ─── Three Ballot Propositions ──────────────────────────────────
  propositions: [
    {
      id: 'prop1',
      number: 'Proposition 1',
      resolution: 'No. 25-6',
      title: 'Educational Programs & Operations (EP&O) Levy',
      type: 'Replacement / Renewal',
      totalAmount: 53900000,
      duration: '4 years (2027–2030)',
      threshold: 'Simple majority (50% + 1)',
      ratePerThousand: 1.5,
      description:
        'Replaces the expiring EP&O levy that funds approximately 16% of the district\'s operating budget. Funds staff positions, classroom supplies, transportation, athletics, extracurricular activities, and maintenance not covered by state funding.',
      fundingBreakdown: [
        { category: 'Certificated Staff (Teachers, Specialists)', pct: 38 },
        { category: 'Classified Staff (Paras, Office, Maintenance)', pct: 24 },
        { category: 'Student Transportation', pct: 14 },
        { category: 'Supplies & Materials', pct: 10 },
        { category: 'Athletics & Activities', pct: 8 },
        { category: 'Maintenance & Operations', pct: 6 },
      ],
      annualSchedule: [
        { year: 2027, amount: 12882801, rate: 1.5 },
        { year: 2028, amount: 13268589, rate: 1.5 },
        { year: 2029, amount: 13665950, rate: 1.5 },
        { year: 2030, amount: 14075233, rate: 1.5 },
      ],
      pros: [
        'Renewal of an existing levy — not a new tax; has passed continuously since 1992.',
        'Funds 16% of the operating budget; without it, the district would need to cut ~$13M annually in programs and staff.',
        'Rate of $1.50/$1,000 is mid-pack compared to neighboring districts.',
        'State funding (McCleary) does not fully cover actual operating costs — WA ranks 40th nationally for K-12 investment.',
        'Directly funds teachers, classroom supplies, transportation, and extracurricular programs students use daily.',
      ],
      cons: [
        'Adds ~$900/year for the median home ($886K assessed value) when combined with Props 2 & 3.',
        'Levy collections grow each year while enrollment has declined ~9% from peak.',
        'Critics argue McCleary ruling should have made levies unnecessary; voting no pressures the Legislature to fully fund schools.',
        'Per-pupil expenditure ($15,642) is above some neighboring districts, raising efficiency questions.',
        'February special election timing has lower turnout than November general elections.',
      ],
    },
    {
      id: 'prop2',
      number: 'Proposition 2',
      resolution: 'No. 25-7',
      title: 'Technology & Capital Projects Levy',
      type: 'Replacement / Renewal',
      totalAmount: 19200000,
      duration: '4 years (2027–2030)',
      threshold: 'Simple majority (50% + 1)',
      ratePerThousand: 0.55,
      description:
        'Replaces the expiring technology levy that funds classroom technology, device replacement cycles, network infrastructure, and smaller capital maintenance projects across all six schools.',
      fundingBreakdown: [
        { category: 'Student Devices (Chromebooks, Tablets)', pct: 35 },
        { category: 'Network Infrastructure & Wi-Fi', pct: 20 },
        { category: 'Classroom Technology (Displays, AV)', pct: 18 },
        { category: 'Software Licenses & Subscriptions', pct: 12 },
        { category: 'Tech Staff & Support', pct: 10 },
        { category: 'Capital Maintenance Projects', pct: 5 },
      ],
      annualSchedule: [
        { year: 2027, amount: 4800000, rate: 0.56 },
        { year: 2028, amount: 4800000, rate: 0.54 },
        { year: 2029, amount: 4800000, rate: 0.53 },
        { year: 2030, amount: 4800000, rate: 0.51 },
      ],
      pros: [
        'Renewal of an existing levy — has passed continuously since 2004.',
        'Funds device replacement on a sustainable cycle; without it, technology would age out without replacement.',
        'Rate is declining over the 4 years ($0.56 → $0.51) as assessed values rise.',
        'Technology is essential for modern curriculum, state testing, and college/career readiness.',
        'Smallest of the three measures at $4.8M/year.',
      ],
      cons: [
        'Combined with Prop 1, adds to the cumulative property tax burden.',
        'Some parents question whether 1:1 device programs are educationally necessary.',
        'District could potentially consolidate tech costs into the EP&O levy (as some districts do).',
        'Flat $4.8M/year does not adjust for enrollment changes.',
        'Some capital maintenance items could arguably belong in a bond measure.',
      ],
    },
    {
      id: 'prop3',
      number: 'Proposition 3',
      resolution: 'No. 25-8',
      title: 'Capital Improvements Bond',
      type: 'New Bond (20-year debt)',
      totalAmount: 185500000,
      duration: '20 years (bond maturity)',
      threshold: 'Supermajority (60% + validated by 40% turnout)',
      ratePerThousand: 1.0,
      description:
        'New general obligation bond primarily to replace the 116-year-old Tolt Middle School, plus HVAC upgrades, security improvements, and facility repairs across all district schools. This is the largest measure and the only one requiring 60% approval.',
      annualSchedule: [
        { year: 2027, amount: 9290000, rate: 1.0 },
        { year: 2028, amount: 9580000, rate: 1.0 },
        { year: 2029, amount: 9870000, rate: 1.0 },
        { year: 2030, amount: 10160000, rate: 1.0 },
      ],
      pros: [
        'Tolt Middle School is 116 years old (built 1910) with the lowest Building Condition Assessment score in the district.',
        'Failing HVAC, outdated electrical, outdoor walkways incompatible with modern security lockdown protocols, some science rooms lack running water.',
        'Bond resolution legally constrains spending to the 12 listed projects — funds cannot be redirected.',
        'Construction costs escalate ~6.6% annually (Mortenson Index); waiting increases costs by tens of millions.',
        'The 2020 bond was $125M; the $60.5M increase reflects 6 years of documented construction inflation.',
        'Middle school enrollment projected to grow 21% (642 → 780 by 2028-29) due to housing development.',
        '3-year community engagement process: 40-member Bond Committee, CAAC, community ambassadors, podcasts.',
        'HVAC, security vestibules, and roof repairs benefit all 6 schools, not just Tolt.',
      ],
      cons: [
        'At $60,700 per student, this is the highest bond-per-student cost in the region.',
        '$185.5M is $60.5M more than the bond that failed in February 2020 (53.21% Yes, needed 60%).',
        'Overall district enrollment has declined ~9% from peak; kindergarten enrollment is below projections.',
        '$4.16M synthetic turf field and $1.25M stadium lighting could be seen as non-essential "gold-plating."',
        '$16.75M to repurpose old Tolt campus raises scope creep concerns.',
        'No independent third-party verification of renovation vs. replacement cost comparison has been publicly released.',
        'Top campaign donor ($3,000) is Hutteball & Oremus Architecture — the planning firm for the project.',
        'King County cumulative tax burden (state, county, library, fire, schools) is already high.',
        'Renovation alternatives have not been fully explored publicly.',
      ],
    },
  ],

  // ─── Bond Project Breakdown (Prop 3, 12 line items) ─────────────
  bondProjects: [
    { name: 'Replace Tolt Middle School', amount: 132500000, pct: 71.4, category: 'New Construction' },
    { name: 'HVAC Replacement (All Schools)', amount: 21600000, pct: 11.6, category: 'Infrastructure' },
    { name: 'Renovate Old Tolt Campus', amount: 16750000, pct: 9.0, category: 'Renovation' },
    { name: 'Synthetic Turf & Track (Tolt)', amount: 4160000, pct: 2.2, category: 'Athletics' },
    { name: 'Cedarcrest HS Roof Replacement', amount: 3200000, pct: 1.7, category: 'Infrastructure' },
    { name: 'Secure Entry Vestibules (All)', amount: 2340000, pct: 1.3, category: 'Safety' },
    { name: 'Carnation Elem. Connections', amount: 1650000, pct: 0.9, category: 'Infrastructure' },
    { name: 'Cedarcrest Stadium Lighting', amount: 1250000, pct: 0.7, category: 'Athletics' },
    { name: 'Playfield Drainage (All Elem.)', amount: 1120000, pct: 0.6, category: 'Infrastructure' },
    { name: 'Theater Lighting (Cedarcrest)', amount: 600000, pct: 0.3, category: 'Renovation' },
    { name: 'Perimeter Fencing (All Elem.)', amount: 180000, pct: 0.1, category: 'Safety' },
    { name: 'Stillwater Sprinkler System', amount: 150000, pct: 0.1, category: 'Safety' },
  ],

  // ─── Tax Impact by Home Value ───────────────────────────────────
  taxImpact: {
    estimatedBondRate: 1.0,
    medianHomeValue: 886000,
    // Current 2025 levy rates for comparison (existing levies being renewed)
    current2025Rates: {
      epo: 1.50,      // Current EP&O levy rate (Prop 1 is a renewal at same rate)
      techCap: 0.50,   // Current Tech/Capital levy rate (Prop 2 renews at ~0.56)
      bond: 0,         // No current bond levy (Prop 3 would be new)
    },
    tiers: [
      { value: 400000, prop1Annual: 600, prop2Annual: 224, prop3Annual: 400 },
      { value: 600000, prop1Annual: 900, prop2Annual: 336, prop3Annual: 600 },
      { value: 800000, prop1Annual: 1200, prop2Annual: 448, prop3Annual: 800 },
      { value: 886000, prop1Annual: 1329, prop2Annual: 496, prop3Annual: 886 },
      { value: 1000000, prop1Annual: 1500, prop2Annual: 560, prop3Annual: 1000 },
      { value: 1200000, prop1Annual: 1800, prop2Annual: 672, prop3Annual: 1200 },
    ],
    ratesUsed: {
      prop1: 1.50,
      prop2: 0.56,
      prop3: 1.00,
    },
  },

  // ─── District Levy Rate Comparisons ─────────────────────────────
  districtComparisons: [
    { district: 'Tahoma', epo: 2.50, techCap: 0.26, combined: 2.76, county: 'King' },
    { district: 'Enumclaw', epo: 1.77, techCap: 0.90, combined: 2.67, county: 'King' },
    { district: 'Snohomish SD 201', epo: 1.80, techCap: 0.60, combined: 2.40, county: 'Snohomish' },
    { district: 'Everett', epo: 2.23, techCap: 0, combined: 2.23, county: 'Snohomish' },
    { district: 'Snoqualmie Valley', epo: 1.55, techCap: 0.56, combined: 2.11, county: 'King' },
    { district: 'Riverview SD 407', epo: 1.50, techCap: 0.56, combined: 2.06, county: 'King', highlight: true },
    { district: 'Lake Stevens', epo: 1.81, techCap: 0.18, combined: 1.99, county: 'Snohomish' },
    { district: 'Northshore', epo: 1.47, techCap: 0.50, combined: 1.97, county: 'King' },
    { district: 'Mukilteo', epo: 1.88, techCap: 0, combined: 1.88, county: 'Snohomish' },
    { district: 'Monroe', epo: 1.69, techCap: 0, combined: 1.69, county: 'Snohomish' },
    { district: 'Granite Falls', epo: 1.50, techCap: 0, combined: 1.50, county: 'Snohomish' },
    { district: 'Stanwood-Camano', epo: 1.50, techCap: 0, combined: 1.50, county: 'Snohomish' },
  ],

  // ─── Per-Student Levy Funding (2027 estimates) ──────────────────
  perStudentFunding: [
    { district: 'Issaquah', perStudent: 6200, highlight: false },
    { district: 'Lake Washington', perStudent: 5865, highlight: false },
    { district: 'Riverview', perStudent: 5691, highlight: true },
    { district: 'Snoqualmie Valley', perStudent: 5323, highlight: false },
    { district: 'Snohomish', perStudent: 4500, highlight: false },
    { district: 'Tahoma', perStudent: 4070, highlight: false },
  ],

  // ─── Bond Per-Student Cost Comparison ───────────────────────────
  bondPerStudent: [
    { district: 'Riverview (2026)', bond: 185500000, enrollment: 3055, perStudent: 60700, outcome: 'pending', year: 2026 },
    { district: 'Enumclaw (2023)', bond: 253000000, enrollment: 4200, perStudent: 60200, outcome: 'failed', year: 2023 },
    { district: 'Sultan (2024)', bond: 79000000, enrollment: 2000, perStudent: 39500, outcome: 'failed', year: 2024 },
    { district: 'Issaquah (2024)', bond: 642300000, enrollment: 19000, perStudent: 33800, outcome: 'failed', year: 2024 },
    { district: 'Northshore (2026)', bond: 698000000, enrollment: 23000, perStudent: 30350, outcome: 'pending', year: 2026 },
    { district: 'Lake Washington (2024)', bond: 676900000, enrollment: 31000, perStudent: 21800, outcome: 'passed', year: 2024 },
  ],

  // ─── Historical Voting Record ───────────────────────────────────
  historicalVotes: [
    { year: 1990, measure: 'Cedarcrest HS Bond', type: 'bond', outcome: 'passed', pct: null, note: 'Passed after 5 prior failures — pared-down version' },
    { year: 1992, measure: 'EP&O Levy', type: 'levy', outcome: 'passed', pct: null, note: 'Start of continuous EP&O passage streak' },
    { year: 2004, measure: 'Tech Levy', type: 'levy', outcome: 'passed', pct: null, note: 'First technology levy — has passed every renewal since' },
    { year: 2007, measure: 'Athletic Facilities Bond', type: 'bond', outcome: 'passed', pct: null, note: 'Passed after 5 prior failures. Last bond to pass.' },
    { year: 2010, measure: 'EP&O Levy (August)', type: 'levy', outcome: 'passed', pct: 50.99, note: 'Closest call — passed by <1%' },
    { year: 2018, measure: 'EP&O Levy Renewal', type: 'levy', outcome: 'passed', pct: null, note: 'Routine renewal' },
    { year: 2020, measure: 'Capital Bond ($125M)', type: 'bond', outcome: 'failed', pct: 53.21, note: 'Got 53.21% Yes but needed 60%. Failed by ~7 points.' },
    { year: 2022, measure: 'EP&O Levy Renewal', type: 'levy', outcome: 'passed', pct: null, note: 'Trailed 48.7% in early returns, swung to pass in late count' },
    { year: 2022, measure: 'Tech Levy Renewal', type: 'levy', outcome: 'passed', pct: 51.92, note: 'Narrowest tech levy margin on record' },
    { year: 2026, measure: 'Prop 1: EP&O Levy', type: 'levy', outcome: 'pending', pct: null, note: 'Current ballot — needs 50%+1' },
    { year: 2026, measure: 'Prop 2: Tech Levy', type: 'levy', outcome: 'pending', pct: null, note: 'Current ballot — needs 50%+1' },
    { year: 2026, measure: 'Prop 3: Capital Bond', type: 'bond', outcome: 'pending', pct: null, note: 'Current ballot — needs 60% supermajority' },
  ],

  // ─── Construction Cost Context ──────────────────────────────────
  constructionCosts: {
    ospiAvgPerSqFt: { low: 501, high: 511, method: 'Design-Bid-Build', years: '2022–23' },
    gcCmPerSqFt: { value: 633, method: 'GC/CM' },
    allInPerSqFt: { low: 650, high: 880, note: 'Including soft costs' },
    ccaJump: { from: 258.92, to: 375.0, pctChange: 44.8, year: 'FY2025' },
    escalation2017to2023: 37,
    mortensonAnnual: 6.6,
    bond2020: 125000000,
    bond2026: 185500000,
    inflationIncrease: 60500000,
    timelineYears: [
      { year: 2017, index: 100 },
      { year: 2018, index: 106.6 },
      { year: 2019, index: 113.6 },
      { year: 2020, index: 121.1 },
      { year: 2021, index: 129.1 },
      { year: 2022, index: 137.6 },
      { year: 2023, index: 146.7 },
      { year: 2024, index: 156.4 },
      { year: 2025, index: 166.7 },
      { year: 2026, index: 177.7 },
    ],
  },

  // ─── Enrollment Data ────────────────────────────────────────────
  enrollment: {
    districtTotal: 3055,
    peakEnrollment: 3296,
    declinePct: 9,
    portableClassrooms: 38,
    portableCapacity: 351,
    portableCostEach: 500000,
    kindergarten: { actual: 180, budgeted: 208, year: '2024-25' },
    middleSchool: {
      current: 642,
      projected2028: 780,
      growthPct: 21,
    },
    housingStarts: {
      duvall: 380,
      carnation: 200,
    },
    // District-wide trend (approximate historical)
    districtTrend: [
      { year: '2018-19', students: 3296, label: 'Peak' },
      { year: '2019-20', students: 3240 },
      { year: '2020-21', students: 3180 },
      { year: '2021-22', students: 3140 },
      { year: '2022-23', students: 3100 },
      { year: '2023-24', students: 3080 },
      { year: '2024-25', students: 3055, label: 'Current' },
    ],
    // Middle school enrollment and projections
    middleSchoolTrend: [
      { year: '2022-23', students: 610, projected: false },
      { year: '2023-24', students: 625, projected: false },
      { year: '2024-25', students: 642, projected: false, label: 'Current' },
      { year: '2025-26', students: 680, projected: true },
      { year: '2026-27', students: 720, projected: true },
      { year: '2027-28', students: 750, projected: true },
      { year: '2028-29', students: 780, projected: true, label: '+21%' },
    ],
  },

  // ─── Snohomish County Districts (Feb 2026 Ballot) ──────────────
  snohomishCountyBallot: [
    { district: 'Darrington', measures: 'EP&O Levy', amount: 2800000, rate: 2.96 },
    { district: 'Edmonds', measures: 'EP&O Levy', amount: 394000000, rate: 1.99 },
    { district: 'Everett', measures: 'EP&O Levy', amount: 300000000, rate: 2.23 },
    { district: 'Granite Falls', measures: 'EP&O Levy', amount: 18500000, rate: 1.50 },
    { district: 'Index', measures: 'EP&O Levy', amount: 590000, rate: 1.50 },
    { district: 'Lake Stevens', measures: 'EP&O + Tech Levy', amount: 197000000, rate: 1.99 },
    { district: 'Monroe', measures: 'EP&O Levy', amount: 82000000, rate: 1.69 },
    { district: 'Mukilteo', measures: 'EP&O Levy', amount: 215000000, rate: 1.88 },
    { district: 'Northshore', measures: 'EP&O + Tech + Bond', amount: 1225000000, rate: 1.97 },
    { district: 'Snohomish SD 201', measures: 'EP&O + Tech Levy', amount: 229400000, rate: 2.40 },
    { district: 'Stanwood-Camano', measures: 'EP&O Levy', amount: 48000000, rate: 1.50 },
    { district: 'Sultan', measures: 'EP&O Levy', amount: 16000000, rate: 1.75 },
  ],

  // ─── Sources & Citations ────────────────────────────────────────
  sources: [
    { id: 1, label: 'RSD Bond & Levy Page', url: 'https://www.rsd407.org/bondlevy', category: 'Official District', description: 'Riverview School District official bond and levy information page' },
    { id: 2, label: 'Vote Yes Riverview', url: 'https://www.voteyesriverview.org', category: 'Campaign', description: 'Vote Yes Riverview 501(c)(4) campaign website' },
    { id: 3, label: 'RSD Bond & Levy FAQ', url: 'https://www.rsd407.org/bond-levy-faq', category: 'Official District', description: 'District FAQ on bond and levy propositions' },
    { id: 4, label: 'RSD 2022 Levy Info', url: 'https://www.rsd407.org/levyinfo', category: 'Official District', description: 'Historical 2022 levy information and results' },
    { id: 5, label: 'Valley Record — 2022 Results', url: 'https://www.valleyrecord.com', category: 'News', description: '2022 election results coverage (Saunders, Valley Record)' },
    { id: 6, label: 'King County Voters\' Pamphlet 2022', url: 'https://kingcounty.gov', category: 'Government', description: 'King County 2022 voters\' pamphlet — Riverview section with opposition statement' },
    { id: 7, label: 'SVSD 2026 Renewal Levies', url: 'https://www.svsd410.org/community/2026-renewal-levies', category: 'Comparison District', description: 'Snoqualmie Valley School District levy comparison data' },
    { id: 8, label: 'Herald — Heckathorn Letter', url: 'https://www.heraldnet.com', category: 'News', description: 'Jeff Heckathorn opinion letter on school levy opposition (Niemi, Everett Herald)' },
    { id: 9, label: 'OPB — Battle Ground/Reykdal', url: 'https://www.opb.org', category: 'News', description: 'Battle Ground school cuts and Superintendent Reykdal on state funding gaps (Neumann, OPB)' },
    { id: 10, label: 'Valley Record — Feb 2026 Preview', url: 'https://www.valleyrecord.com', category: 'News', description: 'February 2026 Valley voters preview article (Gorenflo, Valley Record)' },
    { id: 11, label: 'Valley Record — Cedarcrest History', url: 'https://www.valleyrecord.com', category: 'News', description: '"Fifth time the charm" — Cedarcrest bond history article' },
    { id: 12, label: 'Wahkiakum v. State (2023)', url: 'https://content.govdelivery.com', category: 'Legal', description: 'WA Supreme Court ruling on school construction funding adequacy (2023)' },
    { id: 13, label: 'King County Elections', url: 'https://kingcounty.gov/en/dept/elections', category: 'Government', description: 'King County Elections — February 2026 special election page' },
    { id: 14, label: 'RSD Video/Audio Resources', url: 'https://www.rsd407.org/copy-of-bond-levy', category: 'Official District', description: 'District bond and levy video presentations and podcast' },
    { id: 15, label: 'KING 5 — Arlington Levy', url: 'https://www.king5.com', category: 'News', description: 'Arlington levy rejection coverage (KING 5)' },
    { id: 16, label: 'RSD Bond Committee', url: 'https://www.rsd407.org/bond-committee', category: 'Official District', description: 'Bond committee membership and process documentation' },
    { id: 17, label: 'Budget One-Pager (PDF)', url: 'https://www.voteyesriverview.org', category: 'Campaign', description: 'Vote Yes Riverview budget summary one-pager' },
    { id: 18, label: 'State Funding Gaps Infographic', url: 'https://www.voteyesriverview.org', category: 'Campaign', description: 'Vote Yes Riverview gaps in state funding infographic' },
    { id: 19, label: 'Snohomish County Assessor', url: 'https://www.snohomishcountywa.gov', category: 'Government', description: 'Snohomish County Assessor levy rate data' },
    { id: 20, label: 'SSD 2026 Levy Page', url: 'https://www.sno.wednet.edu/our-district/2026-levies', category: 'Comparison District', description: 'Snohomish School District 2026 levy information' },
    { id: 21, label: 'Herald — County Ballot Overview', url: 'https://www.heraldnet.com', category: 'News', description: 'Snohomish County school ballot overview (Geschke, Everett Herald)' },
    { id: 22, label: 'King County Sample Ballot', url: 'https://kingcounty.gov', category: 'Government', description: 'King County sample ballot PDF — February 2026' },
    { id: 23, label: 'OSPI Construction Cost Data', url: 'https://www.k12.wa.us', category: 'Government', description: 'OSPI school construction cost averages and CCA index data' },
    { id: 24, label: 'Mortenson Cost Index', url: 'https://www.mortenson.com', category: 'Industry', description: 'Mortenson Construction Cost Index — Seattle metro annual escalation data' },
  ],

  // ─── Color Palette ──────────────────────────────────────────────
  colors: {
    prop1: '#2563eb',     // Blue
    prop2: '#7c3aed',     // Purple
    prop3: '#d97706',     // Amber
    passed: '#16a34a',    // Green
    failed: '#dc2626',    // Red
    pending: '#d97706',   // Amber
    highlight: '#2563eb', // Blue accent
    neutral: '#64748b',   // Slate gray
    grid: '#e2e8f0',      // Light gray
  },
};
