/* antmall redesign — main.js */
'use strict';

/* ─── helpers ─────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const fmt = n => n.toLocaleString('mn-MN');
const imgUrl = (attrId, size = 512) =>
  `https://admins-odoo.antmall.mn/web/image/product.product/${attrId}/image_${size}`;
const brandUrl = id =>
  `https://admins-odoo.antmall.mn/api/webgrid/product_brand/${id}/image`;

/* ─── product data ─────────────────────────────────────────── */
const BRAND = { apple: 2, samsung: 8, cuckoo: 1, dyson: 6, dell: 4, tecno: 15, pout: 3, deerma: 14 };

const PHONES = [
  { id: 3746, name: 'iPhone 17 Pro Max', brand: 'apple',   price: 6_299_000, badge: 'Шинэ' },
  { id: 3752, name: 'iPhone 17 Pro',     brand: 'apple',   price: 5_499_000, badge: 'Шинэ' },
  { id: 3656, name: 'iPhone 17',         brand: 'apple',   price: 4_199_000, badge: 'Шинэ' },
  { id: 3658, name: 'iPhone 17 Air',     brand: 'apple',   price: 4_699_000, badge: 'Шинэ' },
  { id: 3471, name: 'iPhone 16 Pro Max', brand: 'apple',   price: 5_599_000, badge: null },
  { id: 3461, name: 'iPhone 16 Pro',     brand: 'apple',   price: 4_799_000, badge: null },
  { id: 3549, name: 'iPhone 16',         brand: 'apple',   price: 3_499_000, badge: null },
  { id: 3469, name: 'iPhone 16 Plus',    brand: 'apple',   price: 3_899_000, badge: null },
  { id: 3612, name: 'Galaxy S25 Ultra',  brand: 'samsung', price: 5_299_000, badge: 'Шинэ' },
  { id: 3613, name: 'Galaxy S25',        brand: 'samsung', price: 3_299_000, badge: 'Шинэ' },
  { id: 3607, name: 'Galaxy Z Fold 7',   brand: 'samsung', price: 6_799_000, badge: 'Шинэ' },
  { id: 3594, name: 'Galaxy Z Flip 7',   brand: 'samsung', price: 4_199_000, badge: 'Шинэ' },
  { id: 3769, name: 'TECNO CAMON 40',    brand: 'tecno',   price: 1_299_000, badge: 'Шинэ' },
  { id: 3770, name: 'TECNO POVA 7',      brand: 'tecno',   price:   899_000, badge: 'Шинэ' },
  { id: 3771, name: 'TECNO SPARK 30',    brand: 'tecno',   price:   699_000, badge: null },
];

const WEARABLES = [
  { id: 3681, name: 'AirPods Pro 3',         brand: 'apple', price:   699_000, badge: 'Шинэ' },
  { id: 3679, name: 'Apple Watch Ultra 11',  brand: 'apple', price: 2_199_000, badge: 'Шинэ' },
  { id: 3513, name: 'Apple Watch Series 10', brand: 'apple', price: 1_299_000, badge: null },
  { id: 3620, name: 'AirPods Gen 4',         brand: 'apple', price:   499_000, badge: null },
  { id: 3530, name: 'AirPods Max USB-C',     brand: 'apple', price: 1_199_000, badge: null },
  { id: 3491, name: 'AirPods Max',           brand: 'apple', price: 1_099_000, badge: null },
  { id: 3145, name: 'AirPods Pro 2',         brand: 'apple', price:   599_000, badge: null },
  { id: 3772, name: 'TECNO Buds',            brand: 'tecno', price:   149_000, badge: 'Шинэ' },
];

const APPLIANCES = [
  { id: 3231, name: 'Dyson Gen5 Detect',      brand: 'dyson', price: 3_199_000, badge: 'Бест' },
  { id: 3230, name: 'Dyson WashG1',           brand: 'dyson', price: 2_999_000, badge: null },
  { id: 3193, name: 'Dyson V15s Detect+',     brand: 'dyson', price: 2_799_000, badge: null },
  { id: 3192, name: 'Dyson V12s Detect Slim', brand: 'dyson', price: 2_199_000, badge: null },
  { id: 3660, name: 'Dyson V12 Slim',         brand: 'dyson', price: 1_799_000, badge: null },
  { id: 3683, name: 'Dyson Purifier PH05',    brand: 'dyson', price: 2_499_000, badge: 'Шинэ' },
  { id: 3684, name: 'Dyson Pencil Vacuum',    brand: 'dyson', price: 1_299_000, badge: 'Шинэ' },
  { id: 3209, name: 'Dyson Air Wrap',         brand: 'dyson', price: 1_899_000, badge: null },
];

const CUCKOO_PRODUCTS = [
  { id: 3553, name: 'Cuckoo Rice Cooker',  brand: 'cuckoo', price:   799_000, badge: null },
  { id: 3112, name: 'Cuckoo Air Purifier', brand: 'cuckoo', price: 1_099_000, badge: null },
  { id: 3264, name: 'Cuckoo Air Fryer',    brand: 'cuckoo', price:   599_000, badge: null },
  { id: 3144, name: 'Cuckoo Kettle',       brand: 'cuckoo', price:   299_000, badge: null },
  { id: 3078, name: 'Cuckoo Toaster',      brand: 'cuckoo', price:   249_000, badge: null },
];

const DEERMA_PRODUCTS = [
  { id: 3722, name: 'Deerma Robot Vacuum X90 Ultra', brand: 'deerma', price: 2_391_080, badge: 'Шинэ' },
  { id: 3725, name: 'Deerma Robot Vacuum X80 Ultra', brand: 'deerma', price: 1_839_080, badge: 'Шинэ' },
  { id: 3721, name: 'Deerma Cordless Vacuum Z50',    brand: 'deerma', price:   735_080, badge: null },
  { id: 3718, name: 'Deerma Cordless Vacuum T30W',   brand: 'deerma', price:   551_080, badge: null },
  { id: 3720, name: 'Deerma Steam Machine ZQ01',     brand: 'deerma', price:   210_680, badge: null },
  { id: 3753, name: 'Deerma Humidifier F628W',       brand: 'deerma', price:    81_880, badge: null },
];

const POUT_PRODUCTS = [
  { id: 3729, name: 'POUT HANDS 7 Wireless Charger', brand: 'pout', price: 105_800, badge: null },
  { id: 3728, name: 'POUT TekDec Mat Cinnamon',       brand: 'pout', price:  69_000, badge: null },
  { id: 3724, name: 'POUT TekDec Mat Danish Black',   brand: 'pout', price:  69_000, badge: null },
  { id: 3709, name: 'POUT Ears 2 Headphones',         brand: 'pout', price:  90_000, badge: null },
  { id: 3730, name: 'POUT 100W USB-C Charger',        brand: 'pout', price:  25_000, badge: null },
  { id: 3708, name: 'POUT Magpower Ring',              brand: 'pout', price:  21_000, badge: null },
];

const COMPUTERS = [
  { id: 3795, name: 'MacBook Air M4 15"',    brand: 'apple', price: 4_199_000, badge: 'Шинэ' },
  { id: 3270, name: 'MacBook Pro 14" M4',    brand: 'apple', price: 5_299_000, badge: null },
  { id: 3587, name: 'MacBook Pro 16" M4',    brand: 'apple', price: 6_899_000, badge: null },
  { id: 3162, name: 'MacBook Pro 13" M4',    brand: 'apple', price: 3_999_000, badge: null },
  { id: 3344, name: 'MacBook Air 15"',       brand: 'apple', price: 3_699_000, badge: null },
  { id: 3110, name: 'Dell G15 Gaming',       brand: 'dell',  price: 2_499_000, badge: null },
  { id: 3108, name: 'Dell Inspiron i7 3530', brand: 'dell',  price: 1_999_000, badge: null },
  { id: 3130, name: 'Dell Inspiron i7 3520', brand: 'dell',  price: 1_799_000, badge: null },
  { id: 3242, name: 'Dell Vostro 3440',      brand: 'dell',  price: 1_499_000, badge: null },
];

const FLASH_DEALS = [
  { id: 3461, name: 'iPhone 16 Pro 128GB',    brand: 'apple',  origPrice: 4_799_000, salePrice: 4_299_000, stock: 12 },
  { id: 3193, name: 'Dyson V15s Detect+',     brand: 'dyson',  origPrice: 2_799_000, salePrice: 2_399_000, stock: 5 },
  { id: 3344, name: 'MacBook Air 15"',         brand: 'apple',  origPrice: 3_699_000, salePrice: 3_299_000, stock: 8 },
  { id: 3613, name: 'Galaxy S25 256GB',        brand: 'samsung',origPrice: 3_299_000, salePrice: 2_899_000, stock: 15 },
  { id: 3112, name: 'Cuckoo Air Purifier',     brand: 'cuckoo', origPrice: 1_099_000, salePrice:   899_000, stock: 20 },
  { id: 3530, name: 'AirPods Max USB-C',       brand: 'apple',  origPrice: 1_199_000, salePrice:   999_000, stock: 7 },
  { id: 3110, name: 'Dell G15 Gaming',         brand: 'dell',   origPrice: 2_499_000, salePrice: 2_099_000, stock: 4 },
  { id: 3209, name: 'Dyson Air Wrap',          brand: 'dyson',  origPrice: 1_899_000, salePrice: 1_599_000, stock: 6 },
];

const OPEN_BOX = [
  { id: 3471, name: 'iPhone 16 Pro Max',  brand: 'apple',   origPrice: 5_599_000, salePrice: 4_799_000, grade: 'A+' },
  { id: 3230, name: 'Dyson WashG1',       brand: 'dyson',   origPrice: 2_999_000, salePrice: 2_499_000, grade: 'A' },
  { id: 3270, name: 'MacBook Pro 14" M4', brand: 'apple',   origPrice: 5_299_000, salePrice: 4_599_000, grade: 'A+' },
  { id: 3612, name: 'Galaxy S25 Ultra',   brand: 'samsung', origPrice: 5_299_000, salePrice: 4_599_000, grade: 'A' },
  { id: 3231, name: 'Dyson Gen5 Detect',  brand: 'dyson',   origPrice: 3_199_000, salePrice: 2_699_000, grade: 'A' },
  { id: 3587, name: 'MacBook Pro 16" M4', brand: 'apple',   origPrice: 6_899_000, salePrice: 5_999_000, grade: 'A+' },
];

/* ─── SVG icons ────────────────────────────────────────────── */
const SVG_HEART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const SVG_CART  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
const PLACEHOLDER = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect fill='%23f3f4f6' width='200' height='200'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='40'>📦</text></svg>`;

/* ─── card renderers ───────────────────────────────────────── */
function renderProductCard(p) {
  const price = p.salePrice ?? p.price;
  const orig  = p.origPrice ?? null;
  const pct   = orig ? Math.round((1 - price / orig) * 100) : null;
  const nameSafe = p.name.replace(/'/g, "\\'");

  let badgeHtml = '';
  if (p.badge) {
    badgeHtml = `<span class="badge badge-new">${p.badge}</span>`;
  } else if (pct) {
    badgeHtml = `<span class="badge badge-sale">-${pct}%</span>`;
  }

  const brandLogoHtml = BRAND[p.brand]
    ? `<span class="pc__brand"><img src="${brandUrl(BRAND[p.brand])}" alt="${p.brand}" loading="lazy" onerror="this.parentElement.style.display='none'"></span>`
    : '';

  return `
<article class="pc" data-brand="${p.brand}" onclick="location.href='product.html?id=${p.id}'" style="cursor:pointer">
  <div class="pc__media">
    ${badgeHtml}
    <button class="btn-wish" aria-label="Хадгалах" onclick="event.stopPropagation();toggleWish(this)">${SVG_HEART}</button>
    <img src="${imgUrl(p.id, 512)}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
  </div>
  <div class="pc__body">
    ${brandLogoHtml}
    <h3 class="pc__name">${p.name}</h3>
    <div class="pc__price">
      <span class="price-now">${fmt(price)}<span class="currency">₮</span></span>
      ${orig ? `<span class="price-was">${fmt(orig)}₮</span>` : ''}
      ${pct ? `<span class="price-save">-${pct}%</span>` : ''}
    </div>
    <button class="btn-add-cart" onclick="event.stopPropagation();addToCart(this,'${nameSafe}',${price})">${SVG_CART} Сагсанд нэмэх</button>
  </div>
</article>`;
}

function renderFlashCard(p) {
  const pct      = Math.round((1 - p.salePrice / p.origPrice) * 100);
  const stockPct = Math.min(96, Math.round((1 - p.stock / 30) * 100));
  const nameSafe = p.name.replace(/'/g, "\\'");
  return `
<article class="pc flash-card" data-brand="${p.brand}" onclick="location.href='product.html?id=${p.id}'" style="cursor:pointer">
  <div class="pc__media">
    <span class="badge badge-sale">-${pct}%</span>
    <button class="btn-wish" aria-label="Хадгалах" onclick="event.stopPropagation();toggleWish(this)">${SVG_HEART}</button>
    <img src="${imgUrl(p.id, 512)}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
  </div>
  <div class="pc__body">
    <h3 class="pc__name">${p.name}</h3>
    <div class="pc__price">
      <span class="price-now" style="color:var(--red)">${fmt(p.salePrice)}<span class="currency">₮</span></span>
      <span class="price-was">${fmt(p.origPrice)}₮</span>
    </div>
    <div class="flash-stock">
      <div class="flash-stock-bar"><div class="flash-stock-fill" style="width:${stockPct}%"></div></div>
      <span class="flash-stock-label">Үлдсэн: <strong>${p.stock}</strong></span>
    </div>
    <button class="btn-add-cart" onclick="event.stopPropagation();addToCart(this,'${nameSafe}',${p.salePrice})">${SVG_CART} Сагсанд нэмэх</button>
  </div>
</article>`;
}

function renderOpenBoxCard(p) {
  const pct      = Math.round((1 - p.salePrice / p.origPrice) * 100);
  const nameSafe = p.name.replace(/'/g, "\\'");
  return `
<article class="pc ob-card" data-brand="${p.brand}" onclick="location.href='product.html?id=${p.id}'" style="cursor:pointer">
  <div class="pc__media">
    <span class="badge badge-open">Лац задарсан</span>
    <span class="ob-grade">${p.grade}</span>
    <button class="btn-wish" aria-label="Хадгалах" onclick="event.stopPropagation();toggleWish(this)">${SVG_HEART}</button>
    <img src="${imgUrl(p.id, 512)}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
  </div>
  <div class="pc__body">
    <h3 class="pc__name">${p.name}</h3>
    <div class="pc__price">
      <span class="price-now" style="color:var(--amber)">${fmt(p.salePrice)}<span class="currency">₮</span></span>
      <span class="price-was">${fmt(p.origPrice)}₮</span>
      <span class="price-save">-${pct}%</span>
    </div>
    <button class="btn-add-cart btn-add-cart--amber" onclick="event.stopPropagation();addToCart(this,'${nameSafe}',${p.salePrice})">${SVG_CART} Сагсанд нэмэх</button>
  </div>
</article>`;
}

/* ─── populate sections ────────────────────────────────────── */
function populateSection(containerId, data, renderer) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = data.map(renderer).join('');
}

/* ─── hero slider ──────────────────────────────────────────── */
const HERO_DURATION = 4500;
let heroIndex = 0, heroTimer, heroPaused = false;

function initHero() {
  const slider = document.getElementById('heroSlider');
  const dotsEl = document.getElementById('heroDots');
  if (!slider) return;

  const slides = () => $$('.hero__slide', slider);

  // Build dots
  if (dotsEl) {
    dotsEl.innerHTML = slides().map((_, i) =>
      `<button class="hero-dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="Слайд ${i + 1}"></button>`
    ).join('');
    dotsEl.addEventListener('click', e => {
      const btn = e.target.closest('[data-i]');
      if (btn) goHero(+btn.dataset.i);
    });
  }

  document.getElementById('heroPrev')?.addEventListener('click', () => goHero(heroIndex - 1));
  document.getElementById('heroNext')?.addEventListener('click', () => goHero(heroIndex + 1));

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goHero(heroIndex - 1);
    if (e.key === 'ArrowRight') goHero(heroIndex + 1);
  });

  // Touch swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) goHero(heroIndex + (diff < 0 ? 1 : -1));
  }, { passive: true });

  // Hover pause
  slider.addEventListener('mouseenter', () => {
    heroPaused = true;
    clearInterval(heroTimer);
    const bar = document.getElementById('heroProgressBar');
    if (bar) bar.style.transition = 'none';
  });
  slider.addEventListener('mouseleave', () => {
    heroPaused = false;
    startHeroTimer();
  });

  startHeroTimer();
}

function goHero(idx) {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;
  const slideEls = $$('.hero__slide', slider);
  const dots     = $$('.hero-dot');
  const count    = slideEls.length;
  if (!count) return;
  heroIndex = ((idx % count) + count) % count;
  slideEls.forEach((s, i) => s.classList.toggle('active', i === heroIndex));
  dots.forEach((d, i)     => d.classList.toggle('active', i === heroIndex));
  if (!heroPaused) startHeroTimer();
}

function startHeroTimer() {
  clearInterval(heroTimer);
  // Reset progress bar
  const bar = document.getElementById('heroProgressBar');
  if (bar) {
    bar.style.transition = 'none';
    bar.style.width = '0%';
    void bar.offsetWidth; // force reflow
    bar.style.transition = `width ${HERO_DURATION}ms linear`;
    bar.style.width = '100%';
  }
  heroTimer = setInterval(() => goHero(heroIndex + 1), HERO_DURATION);
}

/* ─── flash deals countdown ────────────────────────────────── */
function initCountdown() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 0);
  if (end <= now) end.setDate(end.getDate() + 1);

  const hEl = document.getElementById('timerH');
  const mEl = document.getElementById('timerM');
  const sEl = document.getElementById('timerS');
  if (!hEl) return;

  function tick() {
    const diff = Math.max(0, end - Date.now());
    hEl.textContent = String(Math.floor(diff / 3_600_000)).padStart(2, '0');
    mEl.textContent = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, '0');
    sEl.textContent = String(Math.floor((diff % 60_000) / 1_000)).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1_000);
}

/* ─── scroll arrows ────────────────────────────────────────── */
function initScrollArrows() {
  const sections = [
    { left: 'phonesLeft',     right: 'phonesRight',     grid: 'phonesGrid' },
    { left: 'wearablesLeft',  right: 'wearablesRight',  grid: 'wearablesGrid' },
    { left: 'appliancesLeft', right: 'appliancesRight', grid: 'appliancesGrid' },
    { left: 'computersLeft',  right: 'computersRight',  grid: 'computersGrid' },
    { left: 'cuckooLeft',     right: 'cuckooRight',     grid: 'cuckooGrid' },
    { left: 'deermaLeft',     right: 'deermaRight',     grid: 'deermaGrid' },
    { left: 'poutLeft',       right: 'poutRight',       grid: 'poutGrid' },
  ];
  sections.forEach(({ left, right, grid }) => {
    const rail = document.getElementById(grid);
    if (!rail) return;
    document.getElementById(left)?.addEventListener('click',
      () => rail.scrollBy({ left: -rail.clientWidth * 0.75, behavior: 'smooth' }));
    document.getElementById(right)?.addEventListener('click',
      () => rail.scrollBy({ left:  rail.clientWidth * 0.75, behavior: 'smooth' }));
  });
}

/* ─── cart ─────────────────────────────────────────────────── */
let cartCount = 0;

function addToCart(btn, name, price) {
  cartCount++;
  updateCartBadge();
  showToast(name, price);
  btn.closest('.pc')?.classList.add('added');
  setTimeout(() => btn.closest('.pc')?.classList.remove('added'), 1_500);
}

function updateCartBadge() {
  $$('.cart-badge').forEach(el => {
    el.textContent = cartCount;
    el.style.display = cartCount ? 'flex' : 'none';
  });
}

function showToast(name, price) {
  const toast = document.getElementById('cartToast');
  if (!toast) return;
  const msgEl = document.getElementById('cartToastMsg');
  if (msgEl) msgEl.textContent = `${name} — ${fmt(price)}₮ сагсанд нэмэгдлээ`;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3_000);
}

/* ─── wishlist toggle ──────────────────────────────────────── */
function toggleWish(btn) {
  btn.classList.toggle('active');
  const path = btn.querySelector('path');
  if (path) {
    const on = btn.classList.contains('active');
    path.setAttribute('fill',   on ? 'var(--red)' : 'none');
    path.setAttribute('stroke', on ? 'var(--red)' : 'currentColor');
  }
  // keep visible after interaction
  if (btn.classList.contains('active')) {
    btn.style.opacity = '1';
  } else {
    btn.style.opacity = '';
  }
}

/* ─── brand filter (phones) ────────────────────────────────── */
function initBrandFilter() {
  const brandsContainer = document.getElementById('phoneBrands');
  const grid = document.getElementById('phonesGrid');
  if (!brandsContainer || !grid) return;

  const brands = [
    { key: '',        label: 'Бүгд' },
    { key: 'apple',   label: 'Apple',   logo: BRAND.apple },
    { key: 'samsung', label: 'Samsung', logo: BRAND.samsung },
    { key: 'tecno',   label: 'TECNO',   logo: BRAND.tecno },
  ];

  brandsContainer.innerHTML = brands.map(b => `
    <button class="brand-filter-btn${b.key === '' ? ' active' : ''}" data-brand="${b.key}">
      ${b.logo ? `<img src="${brandUrl(b.logo)}" alt="${b.label}" onerror="this.style.display='none'">` : ''}
      <span>${b.label}</span>
    </button>`).join('');

  brandsContainer.addEventListener('click', e => {
    const btn = e.target.closest('[data-brand]');
    if (!btn) return;
    $$('.brand-filter-btn', brandsContainer).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const brand = btn.dataset.brand;
    $$('.pc', grid).forEach(card => {
      card.style.display = (!brand || card.dataset.brand === brand) ? '' : 'none';
    });
  });
}

/* ─── sticky header ────────────────────────────────────────── */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    header.classList.toggle('hidden',   y > lastY && y > 300);
    lastY = y;
  }, { passive: true });
}

/* ─── mobile menu ──────────────────────────────────────────── */
function initMobileMenu() {
  const burger  = document.getElementById('burger');
  const menu    = document.getElementById('mobileMenu');
  const close   = document.getElementById('mobileClose');
  const overlay = document.getElementById('mobileOverlay');
  if (!burger || !menu) return;

  const open  = () => {
    menu.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    menu.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', open);
  close?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
}

/* ─── category dropdown ────────────────────────────────────── */
function initCategoryDropdown() {
  const btn      = document.getElementById('catBtn');
  const dropdown = document.getElementById('catDropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target) && e.target !== btn) {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ─── search ───────────────────────────────────────────────── */
function initSearch() {
  const form = document.getElementById('searchForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = document.getElementById('searchInput')?.value.trim();
    if (q) window.location.href = `https://antmall.mn/shop?search=${encodeURIComponent(q)}`;
  });
}

/* ─── back-to-top ──────────────────────────────────────────── */
function injectBackToTop() {
  if (document.getElementById('backToTop')) return;
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.setAttribute('aria-label', 'Дээш харайх');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── smooth anchor scroll ─────────────────────────────────── */
function initAnchorScroll() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ─── extra CSS ────────────────────────────────────────────── */
function injectExtraStyles() {
  const css = `
/* flash stock bar */
.flash-stock { margin-top: 8px; display: flex; align-items: center; gap: 8px; }
.flash-stock-bar { flex: 1; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden; }
.flash-stock-fill { height: 100%; background: linear-gradient(90deg, var(--red), #ff6b6b); border-radius: 3px; }
.flash-stock-label { font-size: .72rem; color: #6b7280; white-space: nowrap; }

/* open box grade badge */
.ob-grade {
  position: absolute; top: 40px; right: 10px; z-index: 3;
  background: var(--amber); color: #000;
  font-weight: 800; font-size: .72rem; padding: 2px 8px; border-radius: 20px;
}

/* brand filter buttons */
.brand-filter-btn {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 12px; border-radius: 20px; border: 1.5px solid #e5e7eb;
  background: #fff; cursor: pointer; font-size: .78rem; font-weight: 600;
  color: #374151; transition: all .2s; white-space: nowrap;
}
.brand-filter-btn img { width: 18px; height: 18px; object-fit: contain; }
.brand-filter-btn:hover { border-color: var(--orange); color: var(--orange); }
.brand-filter-btn.active { border-color: var(--orange); background: var(--orange); color: #fff; }
.brand-filter-btn.active img { filter: brightness(0) invert(1); }
#phoneBrands { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }

/* sticky header scroll */
#header { transition: transform .3s ease, box-shadow .2s; }
#header.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,.12); }
#header.hidden { transform: translateY(-100%); }

/* back to top */
#backToTop {
  position: fixed; bottom: 24px; left: 20px; z-index: 800;
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--orange); color: #fff; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(249,115,22,.4);
  opacity: 0; transform: translateY(20px) scale(.8);
  transition: all .3s ease; pointer-events: none;
}
#backToTop.visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
#backToTop svg { width: 20px; height: 20px; }

/* pc added animation */
.pc.added .pc__media img { transform: scale(.95); filter: brightness(1.1); }

/* mobile overlay */
.mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 899; }
.mobile-overlay.open { display: block; }
`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

/* ─── init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectExtraStyles();
  injectBackToTop();

  // Render product grids
  populateSection('flashGrid',      FLASH_DEALS,    renderFlashCard);
  populateSection('phonesGrid',     PHONES,         renderProductCard);
  populateSection('wearablesGrid',  WEARABLES,      renderProductCard);
  populateSection('appliancesGrid', APPLIANCES,     renderProductCard);
  populateSection('computersGrid',  COMPUTERS,      renderProductCard);
  populateSection('cuckooGrid',     CUCKOO_PRODUCTS,renderProductCard);
  populateSection('deermaGrid',     DEERMA_PRODUCTS,renderProductCard);
  populateSection('poutGrid',       POUT_PRODUCTS,  renderProductCard);
  populateSection('openboxGrid',    OPEN_BOX,       renderOpenBoxCard);

  // Init all features
  initHero();
  initCountdown();
  initScrollArrows();
  initBrandFilter();
  initStickyHeader();
  initMobileMenu();
  initCategoryDropdown();
  initSearch();
  initAnchorScroll();

  // Initial cart badge
  updateCartBadge();
});
