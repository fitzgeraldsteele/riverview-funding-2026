/**
 * Riverview School District 2026 Bonds and Levies Review
 * App Module — Navigation, interactions, tax calculator, theme toggle
 */

const App = (() => {
  // ─── Theme Toggle ─────────────────────────────────────────────
  function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeButton(next);
    Charts.refreshColors();
  }

  function updateThemeButton(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
  }

  // ─── Sticky Nav — Active Section Tracking ─────────────────────
  function initNavTracking() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove('active'));
            const activeLink = document.querySelector(
              `.nav-links a[href="#${entry.target.id}"]`
            );
            if (activeLink) activeLink.classList.add('active');
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // ─── Smooth Scroll ────────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ─── Pros/Cons Accordion ──────────────────────────────────────
  function initAccordions() {
    document.querySelectorAll('.pros-cons-header').forEach((header) => {
      header.addEventListener('click', () => {
        const list = header.nextElementSibling;
        const icon = header.querySelector('.toggle-icon');
        if (!list) return;

        const isCollapsed = list.style.maxHeight === '0px';
        if (isCollapsed) {
          list.style.maxHeight = list.scrollHeight + 'px';
          if (icon) icon.classList.remove('collapsed');
        } else {
          list.style.maxHeight = '0px';
          if (icon) icon.classList.add('collapsed');
        }
      });
    });

    // Start expanded
    document.querySelectorAll('.pros-cons-items').forEach((list) => {
      list.style.maxHeight = list.scrollHeight + 'px';
    });
  }

  // ─── Tax Impact Calculator ────────────────────────────────────
  const taxState = {
    showDifference: false,
    homeValue: APP_DATA.taxImpact.medianHomeValue,
    included: { prop1: true, prop2: true, prop3: true },
  };

  function clampHomeValue(value) {
    return Math.max(200000, Math.min(2000000, parseInt(value) || APP_DATA.taxImpact.medianHomeValue));
  }

  function formatRate(rate) {
    const abs = Math.abs(rate);
    const base = '$' + abs.toFixed(2) + '/$1K';
    if (rate === 0) return '$0.00/$1K';
    return rate > 0 ? '+' + base : '-' + base;
  }

  function getEffectiveRates() {
    const rates = APP_DATA.taxImpact.ratesUsed;
    if (!taxState.showDifference) return { ...rates };

    const current2025 = APP_DATA.taxImpact.current2025Rates;
    return {
      prop1: rates.prop1 - current2025.epo,
      prop2: rates.prop2 - current2025.techCap,
      prop3: rates.prop3 - current2025.bond,
    };
  }

  function initTaxCalculator() {
    const slider = document.getElementById('tax-slider');
    const input = document.getElementById('tax-input');
    const display = document.getElementById('tax-value-display');
    const resetBtn = document.getElementById('reset-median');
    const diffCheckbox = document.getElementById('show-difference');
    const compNote = document.getElementById('comparison-note');
    const include1 = document.getElementById('include-prop1');
    const include2 = document.getElementById('include-prop2');
    const include3 = document.getElementById('include-prop3');
    const chartTitle = document.getElementById('tax-impact-title');

    if (!slider || !input) return;

    function setCardExcluded(prop, isIncluded) {
      const card = document.querySelector(`.calc-result-card[data-prop="${prop}"]`);
      if (!card) return;
      card.classList.toggle('excluded', !isIncluded);
    }

    function setResult(prop, annual, isIncluded) {
      const card = document.querySelector(`.calc-result-card[data-prop="${prop}"]`);
      if (!card) return;
      const annualEl = card.querySelector('.result-annual');
      const monthlyEl = card.querySelector('.result-monthly');

      const effectiveAnnual = isIncluded ? annual : 0;
      const prefix = taxState.showDifference && effectiveAnnual >= 0 ? '+' : '';
      const sign = taxState.showDifference && effectiveAnnual < 0 ? '-' : '';
      const absAnnual = Math.abs(Math.round(effectiveAnnual));
      const absMonthly = Math.abs(Math.round(effectiveAnnual / 12));
      if (annualEl) annualEl.textContent = sign + prefix + '$' + absAnnual.toLocaleString() + '/yr';
      if (monthlyEl) monthlyEl.textContent = sign + prefix + '$' + absMonthly.toLocaleString() + '/mo';
    }

    function updateLabels() {
      const rates = APP_DATA.taxImpact.ratesUsed;
      const current2025 = APP_DATA.taxImpact.current2025Rates;
      const delta = {
        prop1: rates.prop1 - current2025.epo,
        prop2: rates.prop2 - current2025.techCap,
        prop3: rates.prop3 - current2025.bond,
      };

      document.querySelectorAll('.calc-result-card').forEach((card) => {
        const label = card.querySelector('.result-label');
        if (!label) return;
        const prop = card.dataset.prop;

        if (taxState.showDifference) {
          if (prop === 'prop1') label.textContent = `Prop 1 — EP&O (change: ${formatRate(delta.prop1)})`;
          else if (prop === 'prop2') label.textContent = `Prop 2 — Tech (change: ${formatRate(delta.prop2)})`;
          else if (prop === 'prop3') label.textContent = `Prop 3 — Bond (new: ${formatRate(delta.prop3)})`;
          else if (prop === 'total') label.textContent = 'Net Change from 2025 (selected props)';
        } else {
          if (prop === 'prop1') label.innerHTML = `Prop 1 — EP&amp;O ($${rates.prop1.toFixed(2)}/$1K)`;
          else if (prop === 'prop2') label.textContent = `Prop 2 — Tech ($${rates.prop2.toFixed(2)}/$1K)`;
          else if (prop === 'prop3') label.textContent = `Prop 3 — Bond ($${rates.prop3.toFixed(2)}/$1K)`;
          else if (prop === 'total') label.textContent = 'Combined Total (selected props)';
        }
      });

      if (chartTitle) {
        chartTitle.textContent = taxState.showDifference
          ? 'Annual Tax Impact by Home Value (Net Change vs 2025, Selected Propositions)'
          : 'Annual Tax Impact by Home Value (Selected Propositions, Stacked)';
      }
    }

    let chartDebounceTimer = null;

    function pushToChart() {
      if (typeof Charts.setTaxImpactState === 'function') {
        Charts.setTaxImpactState({
          showDifference: taxState.showDifference,
          included: { ...taxState.included },
          selectedHomeValue: taxState.homeValue,
        });
      }
    }

    function syncAll(immediate) {
      const value = clampHomeValue(taxState.homeValue);
      taxState.homeValue = value;
      slider.value = value;
      input.value = value;
      if (display) display.textContent = '$' + parseInt(value).toLocaleString();

      const rates = getEffectiveRates();
      const prop1 = (value / 1000) * rates.prop1;
      const prop2 = (value / 1000) * rates.prop2;
      const prop3 = (value / 1000) * rates.prop3;

      const total =
        (taxState.included.prop1 ? prop1 : 0) +
        (taxState.included.prop2 ? prop2 : 0) +
        (taxState.included.prop3 ? prop3 : 0);

      setCardExcluded('prop1', taxState.included.prop1);
      setCardExcluded('prop2', taxState.included.prop2);
      setCardExcluded('prop3', taxState.included.prop3);

      setResult('prop1', prop1, taxState.included.prop1);
      setResult('prop2', prop2, taxState.included.prop2);
      setResult('prop3', prop3, taxState.included.prop3);
      setResult('total', total, true);

      updateLabels();

      // Chart update: immediate for toggles/checkboxes, debounced for slider drag
      if (immediate) {
        clearTimeout(chartDebounceTimer);
        pushToChart();
      } else {
        clearTimeout(chartDebounceTimer);
        chartDebounceTimer = setTimeout(pushToChart, 250);
      }
    }

    function updateFromValue(value, immediate) {
      taxState.homeValue = value;
      syncAll(!!immediate);
    }

    slider.addEventListener('input', (e) => updateFromValue(e.target.value, false));
    slider.addEventListener('change', (e) => updateFromValue(e.target.value, true));
    input.addEventListener('change', (e) => updateFromValue(e.target.value, true));
    input.addEventListener('input', (e) => {
      if (display) {
        const v = parseInt(e.target.value);
        if (!isNaN(v)) display.textContent = '$' + v.toLocaleString();
      }
    });

    // Reset to median button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        updateFromValue(APP_DATA.taxImpact.medianHomeValue);
      });
    }

    // Difference toggle
    if (diffCheckbox) {
      diffCheckbox.addEventListener('change', (e) => {
        taxState.showDifference = e.target.checked;
        if (compNote) compNote.style.display = taxState.showDifference ? 'block' : 'none';
        syncAll(true);
      });
    }

    // Include toggles
    function wireInclude(checkbox, key) {
      if (!checkbox) return;
      checkbox.addEventListener('change', (e) => {
        taxState.included[key] = !!e.target.checked;
        syncAll(true);
      });
    }

    wireInclude(include1, 'prop1');
    wireInclude(include2, 'prop2');
    wireInclude(include3, 'prop3');

    // Initialize with median home value
    if (diffCheckbox) diffCheckbox.checked = taxState.showDifference;
    if (include1) include1.checked = taxState.included.prop1;
    if (include2) include2.checked = taxState.included.prop2;
    if (include3) include3.checked = taxState.included.prop3;
    syncAll(true);
  }

  // ─── Bond Chart Type Toggle ───────────────────────────────────
  function initChartToggles() {
    document.querySelectorAll('[data-chart-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.chartToggle;
        document
          .querySelectorAll('[data-chart-toggle]')
          .forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        Charts.toggleBondChartType(type);
      });
    });
  }

  // ─── District Sort Toggle ─────────────────────────────────────
  function initSortToggles() {
    document.querySelectorAll('[data-sort]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document
          .querySelectorAll('[data-sort]')
          .forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        Charts.sortDistricts(btn.dataset.sort);
      });
    });
  }

  // ─── Lazy Chart Init (IntersectionObserver) ───────────────────
  function initLazyCharts() {
    // Charts will init on first scroll into view
    const chartSections = document.querySelectorAll('[data-lazy-chart]');
    const initialized = new Set();

    if (!chartSections.length) {
      // Fallback: init all immediately
      Charts.initAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !initialized.has(entry.target)) {
            initialized.add(entry.target);
            // Init all charts when first chart section is visible
            if (initialized.size === 1) {
              Charts.initAll();
              observer.disconnect();
            }
          }
        });
      },
      { rootMargin: '200px' }
    );

    chartSections.forEach((section) => observer.observe(section));
  }

  // ─── Build Timeline ───────────────────────────────────────────
  function buildTimeline() {
    const container = document.getElementById('history-timeline');
    if (!container) return;

    const votes = APP_DATA.historicalVotes;
    let html = '';

    votes.forEach((v) => {
      const badge =
        v.outcome === 'pending'
          ? '<span class="timeline-badge pending">Pending</span>'
          : v.outcome === 'passed'
          ? '<span class="timeline-badge passed">Passed</span>'
          : '<span class="timeline-badge failed">Failed</span>';

      const pctNote = v.pct ? ` — ${v.pct}% Yes` : '';

      html += `
        <div class="timeline-item ${v.outcome}">
          <div class="timeline-year">${v.year}</div>
          <div class="timeline-measure">
            ${v.measure} ${badge}
          </div>
          <div class="timeline-detail">${v.note}${pctNote}</div>
        </div>`;
    });

    container.innerHTML = html;
  }

  // ─── Build Sources Section ────────────────────────────────────
  function buildSources() {
    const container = document.getElementById('sources-list');
    if (!container) return;

    const sources = APP_DATA.sources;
    const categories = [...new Set(sources.map((s) => s.category))];

    let html = '';
    categories.forEach((cat) => {
      const catSources = sources.filter((s) => s.category === cat);
      html += `<div class="source-category">
        <h4>${cat}</h4>`;
      catSources.forEach((s) => {
        html += `
          <div class="source-item" id="source-${s.id}">
            <span class="source-num">${s.id}</span>
            <div>
              <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="source-link">${s.label}</a>
              <span class="source-desc"> — ${s.description}</span>
            </div>
          </div>`;
      });
      html += `</div>`;
    });

    container.innerHTML = html;
  }

  // ─── Build Proposition Cards ──────────────────────────────────
  function buildPropCards() {
    const container = document.getElementById('prop-cards');
    if (!container) return;

    const props = APP_DATA.propositions;
    let html = '';

    props.forEach((p) => {
      const amountStr =
        p.totalAmount >= 1e6
          ? '$' + (p.totalAmount / 1e6).toFixed(1) + 'M'
          : '$' + p.totalAmount.toLocaleString();

      html += `
        <article class="prop-card" data-prop="${p.id}">
          <span class="prop-badge">${p.type}</span>
          <h3>${p.number}: ${p.title}</h3>
          <div class="prop-amount">${amountStr}</div>
          <div class="prop-meta">
            <span>📅 ${p.duration}</span>
            <span>🗳️ ${p.threshold}</span>
            <span>💰 $${p.ratePerThousand.toFixed(2)}/$1K AV</span>
          </div>
          <p class="prop-desc">${p.description}</p>
        </article>`;
    });

    container.innerHTML = html;
  }

  // ─── Build Props/Cons for each proposition ────────────────────
  function buildProsCons() {
    APP_DATA.propositions.forEach((p) => {
      const prosEl = document.getElementById(`pros-${p.id}`);
      const consEl = document.getElementById(`cons-${p.id}`);

      if (prosEl) {
        prosEl.innerHTML = p.pros
          .map((text) => `<li>${text}</li>`)
          .join('');
      }
      if (consEl) {
        consEl.innerHTML = p.cons
          .map((text) => `<li>${text}</li>`)
          .join('');
      }
    });
  }

  // ─── Initialize Everything ────────────────────────────────────
  function init() {
    initTheme();
    buildPropCards();
    buildProsCons();
    buildTimeline();
    buildSources();
    initSmoothScroll();
    initNavTracking();
    initAccordions();
    initTaxCalculator();
    initChartToggles();
    initSortToggles();
    initLazyCharts();

    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  }

  return { init };
})();

// Boot
document.addEventListener('DOMContentLoaded', App.init);
