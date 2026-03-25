/* ═══════════════════════════════════════
   PRODUCTS PAGE — products.js
   ═══════════════════════════════════════ */
(function () {
'use strict';

/* ── helpers (scoped to avoid conflict with main.js) ── */
const pfmt    = n => Math.round(n).toLocaleString('mn-MN');
const imgUrl  = (id, sz = 512) => `https://admins-odoo.antmall.mn/web/image/product.product/${id}/image_${sz}`;
const brandUrl = id => `https://admins-odoo.antmall.mn/api/webgrid/product_brand/${id}/image`;
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='40'%3E%F0%9F%93%A6%3C/text%3E%3C/svg%3E";

/* ── brand IDs ── */
const BRAND_IDS = { apple: 2, samsung: 8, cuckoo: 1, dyson: 6, dell: 4, tecno: 15, pout: 3, deerma: 14 };

/* ── SVG icons ── */
const SVG_HEART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const SVG_CART  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;

/* ═══════════════════════════════════════
   ALL PRODUCTS DATA
   ═══════════════════════════════════════ */
const ALL_PRODUCTS = [
  /* ── Phones ── */
  { id: 3746, name: 'iPhone 17 Pro Max',    brand: 'apple',   cat: 'phones',     price: 6_299_000, badge: 'Шинэ' },
  { id: 3752, name: 'iPhone 17 Pro',         brand: 'apple',   cat: 'phones',     price: 5_499_000, badge: 'Шинэ' },
  { id: 3656, name: 'iPhone 17',             brand: 'apple',   cat: 'phones',     price: 4_199_000, badge: 'Шинэ' },
  { id: 3658, name: 'iPhone 17 Air',         brand: 'apple',   cat: 'phones',     price: 4_699_000, badge: 'Шинэ' },
  { id: 3471, name: 'iPhone 16 Pro Max',     brand: 'apple',   cat: 'phones',     price: 5_199_000 },
  { id: 3461, name: 'iPhone 16 Pro',         brand: 'apple',   cat: 'phones',     price: 4_299_000, origPrice: 4_799_000 },
  { id: 3549, name: 'iPhone 16',             brand: 'apple',   cat: 'phones',     price: 3_499_000 },
  { id: 3469, name: 'iPhone 16 Plus',        brand: 'apple',   cat: 'phones',     price: 3_899_000 },
  { id: 3612, name: 'Galaxy S25 Ultra',      brand: 'samsung', cat: 'phones',     price: 5_299_000, badge: 'Шинэ' },
  { id: 3613, name: 'Galaxy S25',            brand: 'samsung', cat: 'phones',     price: 2_899_000, origPrice: 3_299_000, badge: 'Шинэ' },
  { id: 3607, name: 'Galaxy Z Fold 7',       brand: 'samsung', cat: 'phones',     price: 6_799_000, badge: 'Шинэ' },
  { id: 3594, name: 'Galaxy Z Flip 7',       brand: 'samsung', cat: 'phones',     price: 4_199_000, badge: 'Шинэ' },
  { id: 3769, name: 'TECNO CAMON 40',        brand: 'tecno',   cat: 'phones',     price: 1_299_000, badge: 'Шинэ' },
  { id: 3770, name: 'TECNO POVA 7',          brand: 'tecno',   cat: 'phones',     price:   899_000, badge: 'Шинэ' },
  { id: 3771, name: 'TECNO SPARK 30',        brand: 'tecno',   cat: 'phones',     price:   699_000 },
  /* ── Wearables ── */
  { id: 3681, name: 'AirPods Pro 3',          brand: 'apple',  cat: 'wearables',  price:   699_000, badge: 'Шинэ' },
  { id: 3679, name: 'Apple Watch Ultra 11',   brand: 'apple',  cat: 'wearables',  price: 2_199_000, badge: 'Шинэ' },
  { id: 3513, name: 'Apple Watch Series 10',  brand: 'apple',  cat: 'wearables',  price: 1_299_000 },
  { id: 3620, name: 'AirPods Gen 4',          brand: 'apple',  cat: 'wearables',  price:   499_000 },
  { id: 3530, name: 'AirPods Max USB-C',      brand: 'apple',  cat: 'wearables',  price:   999_000, origPrice: 1_199_000 },
  { id: 3491, name: 'AirPods Max',            brand: 'apple',  cat: 'wearables',  price: 1_099_000 },
  { id: 3145, name: 'AirPods Pro 2',          brand: 'apple',  cat: 'wearables',  price:   599_000 },
  { id: 3772, name: 'TECNO Buds TWS',         brand: 'tecno',  cat: 'wearables',  price:   149_000, badge: 'Шинэ' },
  /* ── Computers ── */
  { id: 3795, name: 'MacBook Air M4 15"',     brand: 'apple',  cat: 'computers',  price: 4_199_000, badge: 'Шинэ' },
  { id: 3270, name: 'MacBook Pro 14" M4',     brand: 'apple',  cat: 'computers',  price: 5_299_000 },
  { id: 3587, name: 'MacBook Pro 16" M4',     brand: 'apple',  cat: 'computers',  price: 6_899_000 },
  { id: 3162, name: 'MacBook Pro 13" M4',     brand: 'apple',  cat: 'computers',  price: 3_999_000 },
  { id: 3344, name: 'MacBook Air 15"',        brand: 'apple',  cat: 'computers',  price: 3_299_000, origPrice: 3_699_000 },
  { id: 3110, name: 'Dell G15 Gaming Laptop', brand: 'dell',   cat: 'computers',  price: 2_099_000, origPrice: 2_499_000 },
  { id: 3108, name: 'Dell Inspiron 15 i7',    brand: 'dell',   cat: 'computers',  price: 1_999_000 },
  { id: 3130, name: 'Dell Inspiron 15 i5',    brand: 'dell',   cat: 'computers',  price: 1_799_000 },
  { id: 3242, name: 'Dell Vostro 14 3440',    brand: 'dell',   cat: 'computers',  price: 1_499_000 },
  /* ── Appliances – Dyson ── */
  { id: 3231, name: 'Dyson Gen5 Detect',           brand: 'dyson',  cat: 'appliances', price: 3_199_000, badge: 'Бест' },
  { id: 3230, name: 'Dyson WashG1',                brand: 'dyson',  cat: 'appliances', price: 2_999_000 },
  { id: 3193, name: 'Dyson V15s Detect+',          brand: 'dyson',  cat: 'appliances', price: 2_399_000, origPrice: 2_799_000 },
  { id: 3192, name: 'Dyson V12s Detect Slim',      brand: 'dyson',  cat: 'appliances', price: 2_199_000 },
  { id: 3660, name: 'Dyson V12 Slim',              brand: 'dyson',  cat: 'appliances', price: 1_799_000 },
  { id: 3683, name: 'Dyson Purifier PH05',         brand: 'dyson',  cat: 'appliances', price: 2_499_000, badge: 'Шинэ' },
  { id: 3684, name: 'Dyson Pencil Vacuum',         brand: 'dyson',  cat: 'appliances', price: 1_299_000, badge: 'Шинэ' },
  { id: 3209, name: 'Dyson Air Wrap',              brand: 'dyson',  cat: 'appliances', price: 1_599_000, origPrice: 1_899_000 },
  /* ── Appliances – Cuckoo ── */
  { id: 3553, name: 'Cuckoo Rice Cooker',          brand: 'cuckoo', cat: 'appliances', price:   799_000 },
  { id: 3112, name: 'Cuckoo Air Purifier',         brand: 'cuckoo', cat: 'appliances', price:   899_000, origPrice: 1_099_000 },
  { id: 3264, name: 'Cuckoo Air Fryer',            brand: 'cuckoo', cat: 'appliances', price:   599_000 },
  { id: 3144, name: 'Cuckoo Kettle',               brand: 'cuckoo', cat: 'appliances', price:   299_000 },
  { id: 3078, name: 'Cuckoo Toaster',              brand: 'cuckoo', cat: 'appliances', price:   249_000 },
  /* ── Appliances – Deerma ── */
  { id: 3722, name: 'Deerma Robot Vacuum X90 Ultra', brand: 'deerma', cat: 'appliances', price: 2_391_080, badge: 'Шинэ' },
  { id: 3725, name: 'Deerma Robot Vacuum X80 Ultra', brand: 'deerma', cat: 'appliances', price: 1_839_080, badge: 'Шинэ' },
  { id: 3721, name: 'Deerma Cordless Vacuum Z50',    brand: 'deerma', cat: 'appliances', price:   735_080 },
  { id: 3718, name: 'Deerma Cordless Vacuum T30W',   brand: 'deerma', cat: 'appliances', price:   551_080 },
  { id: 3720, name: 'Deerma Steam Machine ZQ01',     brand: 'deerma', cat: 'appliances', price:   210_680 },
  { id: 3753, name: 'Deerma Humidifier F628W',       brand: 'deerma', cat: 'appliances', price:    81_880 },
  /* ── Accessories – POUT ── */
  { id: 3729, name: 'POUT HANDS 7 Wireless Charger', brand: 'pout',  cat: 'accessories', price: 105_800 },
  { id: 3728, name: 'POUT TekDec Mat Cinnamon',       brand: 'pout',  cat: 'accessories', price:  69_000 },
  { id: 3724, name: 'POUT TekDec Mat Danish Black',   brand: 'pout',  cat: 'accessories', price:  69_000 },
  { id: 3709, name: 'POUT Ears 2 Headphones',         brand: 'pout',  cat: 'accessories', price:  90_000 },
  { id: 3730, name: 'POUT 100W USB-C Charger',        brand: 'pout',  cat: 'accessories', price:  25_000 },
  { id: 3708, name: 'POUT Magpower Ring',              brand: 'pout',  cat: 'accessories', price:  21_000 },
];

/* ═══════════════════════════════════════
   STATE
   ═══════════════════════════════════════ */
const state = {
  brands:   new Set(),
  cat:      '',
  priceMin: 0,
  priceMax: 7_000_000,
  onSale:   false,
  isNew:    false,
  sort:     'default',
  view:     'grid',
  page:     1,
  perPage:  24,
};

/* ═══════════════════════════════════════
   FILTER + SORT
   ═══════════════════════════════════════ */
function getFiltered() {
  return ALL_PRODUCTS.filter(p => {
    if (state.brands.size && !state.brands.has(p.brand)) return false;
    if (state.cat && p.cat !== state.cat) return false;
    const price = p.origPrice ? p.price : p.price;
    if (price < state.priceMin || price > state.priceMax) return false;
    if (state.onSale && !p.origPrice) return false;
    if (state.isNew && p.badge !== 'Шинэ') return false;
    return true;
  });
}

function getSorted(arr) {
  const copy = [...arr];
  switch (state.sort) {
    case 'new':
      copy.sort((a, b) => b.id - a.id);
      break;
    case 'price-asc':
      copy.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      copy.sort((a, b) => b.price - a.price);
      break;
    case 'sale':
      copy.sort((a, b) => {
        const pA = a.origPrice ? (1 - a.price / a.origPrice) : 0;
        const pB = b.origPrice ? (1 - b.price / b.origPrice) : 0;
        return pB - pA;
      });
      break;
  }
  return copy;
}

/* ═══════════════════════════════════════
   RENDER PRODUCT CARD
   ═══════════════════════════════════════ */
function renderCard(p) {
  const price = p.price;
  const orig  = p.origPrice || null;
  const pct   = orig ? Math.round((1 - price / orig) * 100) : null;
  const ns    = p.name.replace(/'/g, "\\'");

  let badgeHtml = '';
  if (p.badge) {
    const cls = p.badge === 'Хямдрал' ? 'badge-sale' : p.badge === 'Бест' ? 'badge-best' : 'badge-new';
    badgeHtml = `<span class="badge ${cls}">${p.badge}</span>`;
  } else if (pct) {
    badgeHtml = `<span class="badge badge-sale">-${pct}%</span>`;
  }

  const brandLogoHtml = BRAND_IDS[p.brand]
    ? `<span class="pc__brand"><img src="${brandUrl(BRAND_IDS[p.brand])}" alt="${p.brand}" loading="lazy" onerror="this.parentElement.style.display='none'"></span>`
    : '';

  return `<article class="pc" data-brand="${p.brand}" data-cat="${p.cat}">
  <div class="pc__media">
    ${badgeHtml}
    <button class="btn-wish" aria-label="Хадгалах" onclick="toggleWish(this)">${SVG_HEART}</button>
    <img src="${imgUrl(p.id, 512)}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
  </div>
  <div class="pc__body">
    ${brandLogoHtml}
    <h3 class="pc__name">${p.name}</h3>
    <div class="pc__price">
      <span class="price-now">${pfmt(price)}<span class="currency">₮</span></span>
      ${orig ? `<span class="price-was">${pfmt(orig)}₮</span>` : ''}
      ${pct  ? `<span class="price-save">-${pct}%</span>` : ''}
    </div>
    <button class="btn-add-cart" onclick="addToCart(this,'${ns}',${price})">${SVG_CART} Сагсанд нэмэх</button>
  </div>
</article>`;
}

/* ═══════════════════════════════════════
   MAIN RENDER
   ═══════════════════════════════════════ */
function render() {
  const filtered = getFiltered();
  const sorted   = getSorted(filtered);
  const total    = sorted.length;
  const pages    = Math.max(1, Math.ceil(total / state.perPage));
  state.page     = Math.min(state.page, pages);
  const slice    = sorted.slice((state.page - 1) * state.perPage, state.page * state.perPage);

  /* count */
  const countEl = document.getElementById('resultsCount');
  if (countEl) countEl.innerHTML = `<strong>${total}</strong> бүтээгдэхүүн`;

  /* products */
  const wrap  = document.getElementById('productsWrap');
  const empty = document.getElementById('shopEmpty');
  if (wrap) {
    wrap.className = `products-wrap view-${state.view}`;
    wrap.innerHTML = slice.map(renderCard).join('');
    wrap.style.display = total ? '' : 'none';
  }
  if (empty) empty.style.display = total ? 'none' : '';

  /* active tags */
  renderActiveTags();

  /* pagination */
  renderPagination(pages);
}

/* ═══════════════════════════════════════
   ACTIVE FILTER TAGS
   ═══════════════════════════════════════ */
function renderActiveTags() {
  const el = document.getElementById('activeTags');
  if (!el) return;
  const tags = [];

  state.brands.forEach(b => tags.push({ label: b.toUpperCase(), key: 'brand', val: b }));

  if (state.cat) {
    const names = { phones: 'Гар утас', wearables: 'Ухаалаг цаг', computers: 'Компьютер', appliances: 'Гэр ахуй', accessories: 'Дагалдах' };
    tags.push({ label: names[state.cat] || state.cat, key: 'cat', val: state.cat });
  }
  if (state.priceMin > 0 || state.priceMax < 7_000_000) {
    tags.push({ label: `${pfmt(state.priceMin)}₮ — ${pfmt(state.priceMax)}₮`, key: 'price', val: '' });
  }
  if (state.isNew)  tags.push({ label: 'Шинэ', key: 'new', val: '' });
  if (state.onSale) tags.push({ label: 'Хямдралтай', key: 'sale', val: '' });

  el.innerHTML = tags.map(t =>
    `<span class="active-tag" data-key="${t.key}" data-val="${t.val}">
      ${t.label}
      <span class="active-tag__remove" data-key="${t.key}" data-val="${t.val}">×</span>
    </span>`
  ).join('');

  el.querySelectorAll('.active-tag__remove').forEach(btn => {
    btn.addEventListener('click', () => removeTag(btn.dataset.key, btn.dataset.val));
  });
}

function removeTag(key, val) {
  if (key === 'brand')  state.brands.delete(val);
  else if (key === 'cat')   { state.cat = ''; setActiveCatTab(''); }
  else if (key === 'price') { state.priceMin = 0; state.priceMax = 7_000_000; resetPriceSlider(); }
  else if (key === 'new')   { state.isNew = false; const c = document.getElementById('chkNew'); if (c) c.checked = false; }
  else if (key === 'sale')  { state.onSale = false; const c = document.getElementById('chkSale'); if (c) c.checked = false; }

  /* sync brand chips */
  document.querySelectorAll('.brand-chip').forEach(c => {
    c.classList.toggle('active', state.brands.has(c.dataset.brand));
  });
  state.page = 1;
  render();
}

/* ═══════════════════════════════════════
   PAGINATION
   ═══════════════════════════════════════ */
function renderPagination(pages) {
  const el = document.getElementById('shopPagination');
  if (!el) return;
  if (pages <= 1) { el.innerHTML = ''; return; }

  let html = `<button class="pg-btn" onclick="goPage(${state.page - 1})" ${state.page === 1 ? 'disabled' : ''}>‹</button>`;
  for (let i = 1; i <= pages; i++) {
    if (pages > 7 && Math.abs(i - state.page) > 2 && i !== 1 && i !== pages) {
      if (i === state.page - 3 || i === state.page + 3) html += `<span class="pg-ellipsis">…</span>`;
      continue;
    }
    html += `<button class="pg-btn${i === state.page ? ' active' : ''}" onclick="goPage(${i})">${i}</button>`;
  }
  html += `<button class="pg-btn" onclick="goPage(${state.page + 1})" ${state.page === pages ? 'disabled' : ''}>›</button>`;
  el.innerHTML = html;
}

function goPage(p) {
  const pages = Math.ceil(getFiltered().length / state.perPage);
  if (p < 1 || p > pages) return;
  state.page = p;
  render();
  const main = document.querySelector('.shop-main');
  if (main) main.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ═══════════════════════════════════════
   PRICE RANGE SLIDER
   ═══════════════════════════════════════ */
function initPriceSlider() {
  const minEl = document.getElementById('drsMin');
  const maxEl = document.getElementById('drsMax');
  if (!minEl || !maxEl) return;

  function updateSlider() {
    let lo = +minEl.value;
    let hi = +maxEl.value;
    if (lo > hi) {
      if (document.activeElement === minEl) { lo = hi; minEl.value = lo; }
      else { hi = lo; maxEl.value = hi; }
    }
    const MAX = 7_000_000;
    const fill = document.getElementById('drsFill');
    if (fill) {
      fill.style.left  = `${(lo / MAX) * 100}%`;
      fill.style.width = `${((hi - lo) / MAX) * 100}%`;
    }
    const lbl1 = document.getElementById('drsMinLbl');
    const lbl2 = document.getElementById('drsMaxLbl');
    if (lbl1) lbl1.textContent = pfmt(lo) + '₮';
    if (lbl2) lbl2.textContent = pfmt(hi) + '₮';
    state.priceMin = lo;
    state.priceMax = hi;
    state.page = 1;
    render();
  }

  minEl.addEventListener('input', updateSlider);
  maxEl.addEventListener('input', updateSlider);
  updateSlider(); /* initial fill */
}

function resetPriceSlider() {
  const minEl = document.getElementById('drsMin');
  const maxEl = document.getElementById('drsMax');
  if (minEl) minEl.value = 0;
  if (maxEl) maxEl.value = 7_000_000;
  const fill = document.getElementById('drsFill');
  if (fill) { fill.style.left = '0%'; fill.style.width = '100%'; }
  const lbl1 = document.getElementById('drsMinLbl');
  const lbl2 = document.getElementById('drsMaxLbl');
  if (lbl1) lbl1.textContent = '0₮';
  if (lbl2) lbl2.textContent = '7,000,000₮';
}

/* ═══════════════════════════════════════
   BRAND CHIPS
   ═══════════════════════════════════════ */
function initBrandChips() {
  const el = document.getElementById('brandChips');
  if (!el) return;

  const BRANDS = [
    { key: 'apple',   label: 'Apple'   },
    { key: 'samsung', label: 'Samsung' },
    { key: 'dyson',   label: 'Dyson'   },
    { key: 'cuckoo',  label: 'Cuckoo'  },
    { key: 'deerma',  label: 'Deerma'  },
    { key: 'pout',    label: 'POUT'    },
    { key: 'dell',    label: 'Dell'    },
    { key: 'tecno',   label: 'TECNO'   },
  ];

  el.innerHTML = BRANDS.map(b => {
    const count = ALL_PRODUCTS.filter(p => p.brand === b.key).length;
    const logoId = BRAND_IDS[b.key];
    const logoHtml = logoId
      ? `<img class="brand-chip__logo" src="${brandUrl(logoId)}" alt="${b.label}" loading="lazy" onerror="this.style.display='none'">`
      : `<span class="brand-chip__logo brand-chip__logo--text">${b.label[0]}</span>`;
    return `<button class="brand-chip" data-brand="${b.key}">
  ${logoHtml}
  <span class="brand-chip__name">${b.label}</span>
  <span class="brand-chip__count">${count}</span>
</button>`;
  }).join('');

  el.addEventListener('click', e => {
    const chip = e.target.closest('.brand-chip');
    if (!chip) return;
    const brand = chip.dataset.brand;
    if (state.brands.has(brand)) state.brands.delete(brand);
    else state.brands.add(brand);
    chip.classList.toggle('active', state.brands.has(brand));
    state.page = 1;
    render();
  });
}

/* ═══════════════════════════════════════
   CATEGORY TABS
   ═══════════════════════════════════════ */
function initCatTabs() {
  const tabs = document.getElementById('shopCatTabs');
  if (!tabs) return;
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.sct');
    if (!btn) return;
    state.cat = btn.dataset.cat;
    setActiveCatTab(state.cat);

    /* update breadcrumb */
    const names = { '': 'Бүтээгдэхүүн', phones: 'Гар утас', wearables: 'Ухаалаг цаг', computers: 'Компьютер', appliances: 'Гэр ахуй', accessories: 'Дагалдах' };
    const bc = document.getElementById('bcCurrent');
    if (bc) bc.textContent = names[state.cat] || 'Бүтээгдэхүүн';

    state.page = 1;
    render();
  });
}

function setActiveCatTab(cat) {
  document.querySelectorAll('.sct').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
}

/* ═══════════════════════════════════════
   FILTER GROUP COLLAPSE
   ═══════════════════════════════════════ */
function initFilterGroups() {
  document.querySelectorAll('.filter-group__hd').forEach(btn => {
    const bodyId = btn.dataset.target;
    const body   = document.getElementById(bodyId);
    if (!body) return;
    /* show bodies that have 'open' on their header */
    if (btn.classList.contains('open')) body.classList.add('show');
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      body.classList.toggle('show');
    });
  });
}

/* ═══════════════════════════════════════
   SORT
   ═══════════════════════════════════════ */
function initSort() {
  const sel = document.getElementById('sortSel');
  if (!sel) return;
  sel.addEventListener('change', () => {
    state.sort = sel.value;
    state.page = 1;
    render();
  });
}

/* ═══════════════════════════════════════
   VIEW TOGGLE (grid / list)
   ═══════════════════════════════════════ */
function initViewToggle() {
  const container = document.getElementById('viewBtns');
  if (!container) return;
  container.addEventListener('click', e => {
    const btn = e.target.closest('.view-btn');
    if (!btn) return;
    state.view = btn.dataset.view;
    document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === state.view));
    render();
  });
}

/* ═══════════════════════════════════════
   AVAILABILITY CHECKBOXES
   ═══════════════════════════════════════ */
function initAvailFilters() {
  const chkNew  = document.getElementById('chkNew');
  const chkSale = document.getElementById('chkSale');
  if (chkNew)  chkNew.addEventListener('change',  e => { state.isNew  = e.target.checked; state.page = 1; render(); });
  if (chkSale) chkSale.addEventListener('change', e => { state.onSale = e.target.checked; state.page = 1; render(); });
}

/* ═══════════════════════════════════════
   CLEAR ALL
   ═══════════════════════════════════════ */
function initClearAll() {
  const btn = document.getElementById('btnClearAll');
  if (!btn) return;
  btn.addEventListener('click', () => {
    state.brands.clear();
    state.cat      = '';
    state.priceMin = 0;
    state.priceMax = 7_000_000;
    state.isNew    = false;
    state.onSale   = false;
    state.sort     = 'default';
    state.page     = 1;
    resetPriceSlider();
    setActiveCatTab('');
    document.querySelectorAll('.brand-chip').forEach(c => c.classList.remove('active'));
    const chkNew = document.getElementById('chkNew'); if (chkNew) chkNew.checked = false;
    const chkSale = document.getElementById('chkSale'); if (chkSale) chkSale.checked = false;
    const sortSel = document.getElementById('sortSel'); if (sortSel) sortSel.value = 'default';
    const bc = document.getElementById('bcCurrent'); if (bc) bc.textContent = 'Бүтээгдэхүүн';
    render();
  });
}

/* ═══════════════════════════════════════
   MOBILE FILTER DRAWER
   ═══════════════════════════════════════ */
function initMobileFilter() {
  const sidebar   = document.getElementById('filterSidebar');
  const overlay   = document.getElementById('filterOverlay');
  const toggleBtn = document.getElementById('filterToggleBtn');
  if (!sidebar || !overlay || !toggleBtn) return;

  const open  = () => { sidebar.classList.add('open'); overlay.classList.add('show'); document.body.style.overflow = 'hidden'; };
  const close = () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); document.body.style.overflow = ''; };

  toggleBtn.addEventListener('click', open);
  overlay.addEventListener('click', close);
}

/* ═══════════════════════════════════════
   URL PARAMS — pre-select from query string
   ═══════════════════════════════════════ */
function syncFromUrl() {
  const params = new URLSearchParams(location.search);
  const cat    = params.get('category') || '';
  const brand  = params.get('brand') || '';

  if (cat) {
    state.cat = cat;
    setActiveCatTab(cat);
    const names = { phones: 'Гар утас', wearables: 'Ухаалаг цаг', computers: 'Компьютер', appliances: 'Гэр ахуй', accessories: 'Дагалдах' };
    const bc = document.getElementById('bcCurrent');
    if (bc) bc.textContent = names[cat] || 'Бүтээгдэхүүн';
  }
  if (brand) {
    state.brands.add(brand);
  }
  if (params.has('sale')) {
    state.onSale = true;
    const c = document.getElementById('chkSale'); if (c) c.checked = true;
  }
  if (params.has('new')) {
    state.isNew = true;
    const c = document.getElementById('chkNew'); if (c) c.checked = true;
  }
}

/* ═══════════════════════════════════════
   INIT
   ═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initFilterGroups();
  initBrandChips();
  initPriceSlider();
  initCatTabs();
  initSort();
  initViewToggle();
  initAvailFilters();
  initClearAll();
  initMobileFilter();
  syncFromUrl();
  render();
});

})(); /* end IIFE */
