# Riverview School District 2026 Bonds and Levies Review

An independent, non-partisan single-page web app that visualizes the three ballot propositions for Riverview School District No. 407's February 10, 2026 special election.

Published on GitHub Pages: https://fitzgeraldsteele.github.io/riverview-funding-2026/

## Propositions Covered

| Proposition | Type | Amount | Threshold |
|---|---|---|---|
| **Prop 1** — EP&O Levy | Renewal | $53.9M (4 yr) | 50% + 1 |
| **Prop 2** — Tech/Capital Levy | Renewal | $19.2M (4 yr) | 50% + 1 |
| **Prop 3** — Capital Bond | New debt | $185.5M (20 yr) | 60% supermajority |

## Features

- **Proposition summaries** — At-a-glance cards for each measure
- **Pros & Cons** — Equal-weight arguments for and against each proposition
- **Interactive tax calculator** — Enter your home value, see annual/monthly cost per proposition
- **Bond project breakdown** — Switchable bar/doughnut chart showing where the $185.5M goes
- **District comparisons** — Levy rates, per-student funding, and bond costs vs. neighboring districts
- **Historical voting timeline** — 35+ years of levy and bond election results
- **Construction cost context** — Cost escalation data showing why the 2026 bond exceeds the 2020 proposal
- **Enrollment data** — Current enrollment, middle school growth projections, housing starts
- **24 cited sources** — All data linked to public records, district publications, and news reporting
- **Dark mode** — Respects system preference with manual toggle
- **Mobile responsive** — Works on phones, tablets, and desktop
- **Print-friendly** — Clean output when printed

## Running Locally

No build tools needed — just open the file:

```bash
# Option 1: Open directly
open docs/index.html          # macOS
start docs/index.html         # Windows

# Option 2: Use a local server (recommended for best experience)
npx serve docs
# or
cd docs && python -m http.server 8000
```

## Deploying to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch and **/docs** folder
5. Click **Save** — the site will be live at `https://<username>.github.io/<repo-name>/`

## Tech Stack

- **HTML5** — Semantic markup with accessibility attributes
- **CSS3** — Custom properties, responsive grid, dark mode, print stylesheet
- **Vanilla JavaScript** — No framework dependencies
- **[Chart.js 4](https://www.chartjs.org/)** — Interactive charts loaded from CDN

## Project Structure

```
docs/                   ← Deployed site (GitHub Pages serves from here)
  index.html            ← Main page
  css/styles.css        ← All styles
  js/data.js            ← Structured data (propositions, comparisons, sources)
  js/charts.js          ← Chart.js initialization and interaction
  js/app.js             ← Navigation, calculator, theme toggle, accordion
research/               ← Source research documents (not deployed)
README.md
.gitignore
```

## Disclaimer

This is an independent informational resource. It is not affiliated with Riverview School District, any campaign, or any political organization. Data sourced from public records and news reporting.
