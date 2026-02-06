/**
 * Riverview School District 2026 Bonds and Levies Review
 * Charts Module — All Chart.js chart initialization and interaction
 */

const Charts = (() => {
  const instances = {};
  const C = APP_DATA.colors;

  // ─── Helpers ──────────────────────────────────────────────────
  const fmt = (n) =>
    n >= 1e6
      ? '$' + (n / 1e6).toFixed(1) + 'M'
      : n >= 1e3
      ? '$' + (n / 1e3).toFixed(0) + 'K'
      : '$' + n.toLocaleString();

  const fmtFull = (n) => '$' + n.toLocaleString();

  const chartDefaults = () => {
    Chart.defaults.font.family =
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    Chart.defaults.font.size = 13;
    Chart.defaults.color = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-text-muted')
      .trim() || '#64748b';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
    Chart.defaults.plugins.legend.labels.padding = 16;
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
  };

  const getGridColor = () =>
    getComputedStyle(document.documentElement)
      .getPropertyValue('--color-border')
      .trim() || '#e2e8f0';

  // ─── Proposition Annual Collections Bar Chart ─────────────────
  function createAnnualChart(canvasId, prop, color) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (instances[canvasId]) instances[canvasId].destroy();

    instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: prop.annualSchedule.map((s) => s.year.toString()),
        datasets: [
          {
            label: 'Levy Collection',
            data: prop.annualSchedule.map((s) => s.amount),
            backgroundColor: color + 'cc',
            borderColor: color,
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const s = prop.annualSchedule[ctx.dataIndex];
                return `${fmtFull(s.amount)} @ $${s.rate}/$1,000 AV`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: getGridColor() },
            ticks: { callback: (v) => fmt(v) },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  // ─── Funding Breakdown Doughnut ───────────────────────────────
  function createFundingBreakdown(canvasId, prop, baseColor) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (instances[canvasId]) instances[canvasId].destroy();

    const colors = prop.fundingBreakdown.map((_, i) => {
      const hue = parseInt(baseColor.slice(1), 16);
      const opacity = 0.4 + (i / prop.fundingBreakdown.length) * 0.6;
      return baseColor + Math.round(opacity * 255).toString(16).padStart(2, '0');
    });

    instances[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: prop.fundingBreakdown.map((f) => f.category),
        datasets: [
          {
            data: prop.fundingBreakdown.map((f) => f.pct),
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: getComputedStyle(document.documentElement)
              .getPropertyValue('--color-bg-card')
              .trim() || '#fff',
          },
        ],
      },
      options: {
        cutout: '55%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { size: 11 }, padding: 12 },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
            },
          },
        },
      },
    });
  }

  // ─── Bond Project Breakdown ───────────────────────────────────
  let bondChartType = 'bar';

  function createBondBreakdown(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (instances[canvasId]) instances[canvasId].destroy();

    const projects = APP_DATA.bondProjects;
    const catColors = {
      'New Construction': '#d97706',
      Infrastructure: '#2563eb',
      Renovation: '#7c3aed',
      Athletics: '#16a34a',
      Safety: '#dc2626',
    };

    if (bondChartType === 'bar') {
      instances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: projects.map((p) => p.name),
          datasets: [
            {
              data: projects.map((p) => p.amount),
              backgroundColor: projects.map(
                (p) => (catColors[p.category] || C.neutral) + 'cc'
              ),
              borderColor: projects.map(
                (p) => catColors[p.category] || C.neutral
              ),
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const p = projects[ctx.dataIndex];
                  return `${fmtFull(p.amount)} (${p.pct}%) — ${p.category}`;
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: { color: getGridColor() },
              ticks: { callback: (v) => fmt(v) },
            },
            y: {
              grid: { display: false },
              ticks: { font: { size: 11 } },
            },
          },
        },
      });
    } else {
      instances[canvasId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: projects.map((p) => p.name),
          datasets: [
            {
              data: projects.map((p) => p.amount),
              backgroundColor: projects.map(
                (p) => (catColors[p.category] || C.neutral) + 'cc'
              ),
              borderWidth: 2,
              borderColor:
                getComputedStyle(document.documentElement)
                  .getPropertyValue('--color-bg-card')
                  .trim() || '#fff',
            },
          ],
        },
        options: {
          cutout: '40%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { font: { size: 10 }, padding: 8 },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const p = projects[ctx.dataIndex];
                  return `${p.name}: ${fmtFull(p.amount)} (${p.pct}%)`;
                },
              },
            },
          },
        },
      });
    }
  }

  function toggleBondChartType(type) {
    bondChartType = type;
    createBondBreakdown('chart-bond-breakdown');
  }

  // ─── Tax Impact Stacked Bar ───────────────────────────────────
  function createTaxImpactChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (instances[canvasId]) instances[canvasId].destroy();

    const tiers = APP_DATA.taxImpact.tiers;

    instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: tiers.map(
          (t) => '$' + (t.value / 1000).toFixed(0) + 'K'
        ),
        datasets: [
          {
            label: 'Prop 1 (EP&O)',
            data: tiers.map((t) => t.prop1Annual),
            backgroundColor: C.prop1 + 'cc',
            borderColor: C.prop1,
            borderWidth: 1,
          },
          {
            label: 'Prop 2 (Tech)',
            data: tiers.map((t) => t.prop2Annual),
            backgroundColor: C.prop2 + 'cc',
            borderColor: C.prop2,
            borderWidth: 1,
          },
          {
            label: 'Prop 3 (Bond)',
            data: tiers.map((t) => t.prop3Annual),
            backgroundColor: C.prop3 + 'cc',
            borderColor: C.prop3,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              afterBody: (items) => {
                const total = items.reduce((s, i) => s + i.parsed.y, 0);
                return `\nTotal: ${fmtFull(total)}/year (${fmtFull(Math.round(total / 12))}/month)`;
              },
            },
          },
          legend: { position: 'top' },
        },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: { color: getGridColor() },
            ticks: { callback: (v) => fmtFull(v) },
          },
        },
      },
    });
  }

  // ─── District Levy Rate Comparison ────────────────────────────
  let districtSortOrder = 'combined';

  function createDistrictComparison(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (instances[canvasId]) instances[canvasId].destroy();

    let data = [...APP_DATA.districtComparisons];
    if (districtSortOrder === 'combined') {
      data.sort((a, b) => b.combined - a.combined);
    } else {
      data.sort((a, b) => a.district.localeCompare(b.district));
    }

    const bgAlpha = data.map((d) => (d.highlight ? 'ff' : 'cc'));

    instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((d) => d.district),
        datasets: [
          {
            label: 'EP&O Rate',
            data: data.map((d) => d.epo),
            backgroundColor: data.map((d, i) => C.prop1 + bgAlpha[i]),
            borderColor: C.prop1,
            borderWidth: data.map((d) => (d.highlight ? 2 : 1)),
            borderRadius: 2,
          },
          {
            label: 'Tech/Capital Rate',
            data: data.map((d) => d.techCap),
            backgroundColor: data.map((d, i) => C.prop2 + bgAlpha[i]),
            borderColor: C.prop2,
            borderWidth: data.map((d) => (d.highlight ? 2 : 1)),
            borderRadius: 2,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              afterBody: (items) => {
                const total = items.reduce((s, i) => s + i.parsed.x, 0);
                return `Combined: $${total.toFixed(2)}/$1,000`;
              },
            },
          },
          legend: { position: 'top' },
        },
        scales: {
          x: {
            stacked: true,
            beginAtZero: true,
            grid: { color: getGridColor() },
            title: { display: true, text: 'Rate per $1,000 Assessed Value' },
          },
          y: {
            stacked: true,
            grid: { display: false },
            ticks: {
              font: {
                weight: (ctx) => {
                  const d = data[ctx.index];
                  return d && d.highlight ? 'bold' : 'normal';
                },
              },
            },
          },
        },
      },
    });
  }

  function sortDistricts(order) {
    districtSortOrder = order;
    createDistrictComparison('chart-district-comparison');
  }

  // ─── Per-Student Funding ──────────────────────────────────────
  function createPerStudentChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (instances[canvasId]) instances[canvasId].destroy();

    const data = APP_DATA.perStudentFunding;

    instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((d) => d.district),
        datasets: [
          {
            label: 'Levy Funding per Student (2027)',
            data: data.map((d) => d.perStudent),
            backgroundColor: data.map((d) =>
              d.highlight ? C.highlight + 'ff' : C.neutral + '88'
            ),
            borderColor: data.map((d) =>
              d.highlight ? C.highlight : C.neutral
            ),
            borderWidth: data.map((d) => (d.highlight ? 2 : 1)),
            borderRadius: 4,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => fmtFull(ctx.parsed.x) + ' per student',
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: getGridColor() },
            ticks: { callback: (v) => fmtFull(v) },
          },
          y: { grid: { display: false } },
        },
      },
    });
  }

  // ─── Bond Per-Student Cost ────────────────────────────────────
  function createBondPerStudentChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (instances[canvasId]) instances[canvasId].destroy();

    const data = APP_DATA.bondPerStudent;
    const outcomeColors = {
      passed: C.passed,
      failed: C.failed,
      pending: C.pending,
    };

    instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((d) => d.district),
        datasets: [
          {
            label: 'Bond Cost per Student',
            data: data.map((d) => d.perStudent),
            backgroundColor: data.map(
              (d) => (outcomeColors[d.outcome] || C.neutral) + 'cc'
            ),
            borderColor: data.map(
              (d) => outcomeColors[d.outcome] || C.neutral
            ),
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => data[items[0].dataIndex].district,
              label: (ctx) => {
                const d = data[ctx.dataIndex];
                return [
                  `${fmtFull(d.perStudent)} per student`,
                  `Total Bond: ${fmt(d.bond)}`,
                  `Enrollment: ${d.enrollment.toLocaleString()}`,
                  `Outcome: ${d.outcome.charAt(0).toUpperCase() + d.outcome.slice(1)}`,
                ];
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: getGridColor() },
            ticks: { callback: (v) => fmtFull(v) },
            title: { display: true, text: 'Cost per Student' },
          },
          y: { grid: { display: false } },
        },
      },
    });
  }

  // ─── Construction Cost Escalation ─────────────────────────────
  function createCostEscalationChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (instances[canvasId]) instances[canvasId].destroy();

    const data = APP_DATA.constructionCosts.timelineYears;

    instances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((d) => d.year.toString()),
        datasets: [
          {
            label: 'Construction Cost Index (2017 = 100)',
            data: data.map((d) => d.index),
            borderColor: C.prop3,
            backgroundColor: C.prop3 + '22',
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `Cost Index: ${ctx.parsed.y.toFixed(1)} (${(
                  ((ctx.parsed.y - 100) / 100) *
                  100
                ).toFixed(0)}% above 2017)`,
            },
          },
          annotation: {
            annotations: {
              bond2020: {
                type: 'point',
                xValue: '2020',
                yValue: 121.1,
                backgroundColor: C.failed,
                radius: 8,
                borderWidth: 2,
                borderColor: '#fff',
              },
              bond2026: {
                type: 'point',
                xValue: '2026',
                yValue: 177.7,
                backgroundColor: C.pending,
                radius: 8,
                borderWidth: 2,
                borderColor: '#fff',
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 90,
            grid: { color: getGridColor() },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  // ─── District-Wide Enrollment Trend ────────────────────────────
  function createDistrictEnrollmentChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (instances[canvasId]) instances[canvasId].destroy();

    const data = APP_DATA.enrollment.districtTrend;

    instances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((d) => d.year),
        datasets: [
          {
            label: 'District Enrollment',
            data: data.map((d) => d.students),
            borderColor: C.highlight,
            backgroundColor: C.highlight + '22',
            fill: true,
            tension: 0.3,
            pointRadius: data.map((d) => (d.label ? 6 : 4)),
            pointHoverRadius: 8,
            pointBackgroundColor: data.map((d) =>
              d.label ? C.highlight : C.highlight + 'cc'
            ),
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const d = data[ctx.dataIndex];
                const extra = d.label ? ` (${d.label})` : '';
                return ctx.parsed.y.toLocaleString() + ' students' + extra;
              },
            },
          },
        },
        scales: {
          y: {
            min: 2900,
            max: 3400,
            grid: { color: getGridColor() },
            ticks: { callback: (v) => v.toLocaleString() },
            title: { display: true, text: 'Total Students' },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  // ─── Middle School Enrollment + Projections ───────────────────
  function createMiddleSchoolChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (instances[canvasId]) instances[canvasId].destroy();

    const data = APP_DATA.enrollment.middleSchoolTrend;
    const actuals = data.filter((d) => !d.projected);
    const projected = data.filter((d) => d.projected);

    // Build full dataset with nulls for gaps
    const allLabels = data.map((d) => d.year);
    const actualData = data.map((d) => (d.projected ? null : d.students));
    const projectedData = data.map((d, i) => {
      // Include last actual as bridge point
      if (!d.projected && data[i + 1] && data[i + 1].projected) return d.students;
      if (d.projected) return d.students;
      return null;
    });

    instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: allLabels,
        datasets: [
          {
            label: 'Actual',
            data: actualData,
            backgroundColor: C.prop2 + 'cc',
            borderColor: C.prop2,
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: 'Projected',
            data: projectedData,
            backgroundColor: C.prop2 + '55',
            borderColor: C.prop2,
            borderWidth: 1,
            borderRadius: 4,
            borderDash: [4, 4],
          },
        ],
      },
      options: {
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.parsed.y === null) return '';
                const d = data[ctx.dataIndex];
                const extra = d.label ? ` (${d.label})` : '';
                return (
                  ctx.dataset.label +
                  ': ' +
                  ctx.parsed.y.toLocaleString() +
                  ' students' +
                  extra
                );
              },
            },
          },
        },
        scales: {
          y: {
            min: 550,
            max: 850,
            grid: { color: getGridColor() },
            ticks: { callback: (v) => v.toLocaleString() },
            title: { display: true, text: 'Middle School Students' },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  // ─── Public API ───────────────────────────────────────────────
  function initAll() {
    chartDefaults();

    // Proposition annual charts
    const props = APP_DATA.propositions;
    createAnnualChart('chart-prop1-annual', props[0], C.prop1);
    createAnnualChart('chart-prop2-annual', props[1], C.prop2);
    createAnnualChart('chart-prop3-annual', props[2], C.prop3);

    // Funding breakdown doughnuts
    createFundingBreakdown('chart-prop1-funding', props[0], C.prop1);
    createFundingBreakdown('chart-prop2-funding', props[1], C.prop2);

    // Bond project breakdown
    createBondBreakdown('chart-bond-breakdown');

    // Tax impact
    createTaxImpactChart('chart-tax-impact');

    // Comparisons
    createDistrictComparison('chart-district-comparison');
    createPerStudentChart('chart-per-student');
    createBondPerStudentChart('chart-bond-per-student');

    // Historical / context
    createCostEscalationChart('chart-cost-escalation');
    createDistrictEnrollmentChart('chart-enrollment-district');
    createMiddleSchoolChart('chart-enrollment-ms');
  }

  function refreshColors() {
    chartDefaults();
    Object.values(instances).forEach((chart) => {
      if (chart) chart.update();
    });
    // Recreate all to pick up new CSS variable colors
    initAll();
  }

  return {
    initAll,
    refreshColors,
    toggleBondChartType,
    sortDistricts,
    instances,
    createTaxImpactChart,
  };
})();
