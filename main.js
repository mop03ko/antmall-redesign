/* antmall redesign — main.js */
'use strict';

/* ─── helpers ─────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const fmt = n => n.toLocaleString('mn-MN');
const imgUrl = id =>
  `https://admins-odoo.antmall.mn/web/image/product.template/${id}/image_1920`;
const brandUrl = id =>
  `https://admins-odoo.antmall.mn/api/webgrid/product_brand/${id}/image`;

/* ─── product data ─────────────────────────────────────────── */
const BRAND = { apple:2, samsung:8, cuckoo:1, dyson:6, dell:4, tecno:15, pout:3, deerma:14, dji:7, sony:12, aima:11, luyuan:10 };

const PHONES = [
  { id: 1757, name: 'iPhone 17 Pro Max',    brand: 'apple',   price: 8599000, badge: 'Шинэ' },
  { id: 1758, name: 'iPhone 17 Pro',        brand: 'apple',   price: 6899000, badge: 'Шинэ' },
  { id: 1762, name: 'iPhone 17',            brand: 'apple',   price: 4199000, badge: 'Шинэ' },
  { id: 1763, name: 'iPhone 17 Air',        brand: 'apple',   price: 4799000, badge: 'Шинэ' },
  { id: 1697, name: 'iPhone 16 Pro Max',    brand: 'apple',   price: 6699000 },
  { id: 1698, name: 'iPhone 16 Pro',        brand: 'apple',   price: 5199000 },
  { id: 1699, name: 'iPhone 16',            brand: 'apple',   price: 3899000 },
  { id: 1700, name: 'iPhone 16 Plus',       brand: 'apple',   price: 4299000 },
  { id: 1720, name: 'Galaxy S25 Ultra',     brand: 'samsung', price: 3999000, badge: 'Хямдрал' },
  { id: 1721, name: 'Galaxy S25',           brand: 'samsung', price: 3850000 },
  { id: 1690, name: 'Samsung Galaxy Fold 7',brand: 'samsung', price: 6299000 },
  { id: 1689, name: 'Samsung Galaxy Flip 7',brand: 'samsung', price: 3999000 },
  { id: 1824, name: 'TECNO CAMON 40 PRO 5G',brand: 'tecno',  price: 1549900, badge: 'Шинэ' },
  { id: 1825, name: 'TECNO POVA 7 PRO 5G',  brand: 'tecno',  price: 1469900, badge: 'Шинэ' },
  { id: 1826, name: 'TECNO SPARK 30',        brand: 'tecno',  price: 799900 },
];

const WEARABLES = [
  { id: 1778, name: 'AirPods Pro (3rd gen)',   brand: 'apple', price: 1350000, badge: 'Шинэ' },
  { id: 1782, name: 'Apple Watch Ultra 3',     brand: 'apple', price: 3650000, badge: 'Шинэ' },
  { id: 1777, name: 'Apple Watch Series 11',   brand: 'apple', price: 1950000 },
  { id: 1738, name: 'AirPods Gen 4',           brand: 'apple', price: 650000 },
  { id: 1714, name: 'AirPods Max (USB-C)',      brand: 'apple', price: 2450000 },
  { id: 1706, name: 'AirPods Max',              brand: 'apple', price: 2200000 },
  { id: 1606, name: 'AirPods Pro (2nd gen)',    brand: 'apple', price: 950000 },
  { id: 1828, name: 'TECNO TWS Buds 4',         brand: 'tecno', price: 99900, badge: 'Шинэ' },
  { id: 1702, name: 'Sony WF-1000XM5',          brand: 'sony',  price: 1000000 },
  { id: 1701, name: 'Sony WH-1000XM6',          brand: 'sony',  price: 1850000 },
];

const APPLIANCES = [
  { id: 1692, name: 'Dyson Gen5detect Complete', brand: 'dyson', price: 3400000, badge: 'Бест' },
  { id: 1691, name: 'Dyson WashG1',              brand: 'dyson', price: 2500000 },
  { id: 1654, name: 'Dyson V15s Detect Submarine',brand: 'dyson', price: 3900000 },
  { id: 1653, name: 'Dyson V12s Detect Slim',    brand: 'dyson', price: 3300000 },
  { id: 1764, name: 'Dyson V12 Detect Slim',     brand: 'dyson', price: 2700000 },
  { id: 1780, name: 'Dyson Purifier PH05',       brand: 'dyson', price: 3500000 },
  { id: 1781, name: 'Dyson PencilVac',           brand: 'dyson', price: 2950000, badge: 'Шинэ' },
  { id: 1667, name: 'Dyson Airwrap Straight+Wavy', brand: 'dyson', price: 2350000 },
];

const CUCKOO_PRODUCTS = [
  { id: 1779, name: 'Cuckoo Будаа агшаагч',      brand: 'cuckoo', price: 570400 },
  { id: 1573, name: 'Cuckoo Агаар цэвэршүүлэгч', brand: 'cuckoo', price: 1150000 },
  { id: 1725, name: 'Cuckoo Тосгүй шарагч',      brand: 'cuckoo', price: 349600 },
  { id: 1749, name: 'Cuckoo Dishwasher',          brand: 'cuckoo', price: 749900 },
  { id: 1595, name: 'Cuckoo Талх шарагч',         brand: 'cuckoo', price: 133400 },
  { id: 1594, name: 'Cuckoo Ус буцалгагч',        brand: 'cuckoo', price: 142600 },
];

const DEERMA_PRODUCTS = [
  { id: 1804, name: 'Deerma Robot Vacuum X90 Ultra', brand: 'deerma', price: 2391080, badge: 'Шинэ' },
  { id: 1805, name: 'Deerma Robot Vacuum X80 Ultra', brand: 'deerma', price: 1839080, badge: 'Шинэ' },
  { id: 1803, name: 'Deerma Cordless Vacuum Z50',    brand: 'deerma', price: 735080 },
  { id: 1800, name: 'Deerma Cordless Vacuum T30W',   brand: 'deerma', price: 551080 },
  { id: 1802, name: 'Deerma Steam Machine ZQ01',     brand: 'deerma', price: 210680 },
  { id: 1817, name: 'Deerma Humidifier F628W',       brand: 'deerma', price: 81880 },
];

const POUT_PRODUCTS = [
  { id: 1808, name: 'POUT HANDS 7 (Samsung)',       brand: 'pout', price: 105800 },
  { id: 1807, name: 'POUT TekDec Mat Cinnamon',      brand: 'pout', price: 69000 },
  { id: 1792, name: 'POUT TekDec Mat Danish Black',  brand: 'pout', price: 69000 },
  { id: 1791, name: 'POUT Ears 2',                   brand: 'pout', price: 90000 },
  { id: 1809, name: 'POUT 100W USB-C',               brand: 'pout', price: 25000 },
  { id: 1790, name: 'POUT Magpower Ring',             brand: 'pout', price: 21000 },
];

const COMPUTERS = [
  { id: 1588, name: "MacBook Air M4 13''",     brand: 'apple', price: 4199000, badge: 'Шинэ' },
  { id: 1587, name: "MacBook Air M4 15''",     brand: 'apple', price: 5199000 },
  { id: 1742, name: "MacBook Pro M4 16''",     brand: 'apple', price: 10550000 },
  { id: 1548, name: "MacBook Pro M4 14''",     brand: 'apple', price: 6999000 },
  { id: 1623, name: "MacBook Pro M4 13''",     brand: 'apple', price: 4750000 },
  { id: 1571, name: 'Dell Gaming G15 i7',      brand: 'dell',  price: 5950000 },
  { id: 1570, name: 'Dell Inspiron 16 i7',     brand: 'dell',  price: 3850000 },
  { id: 1569, name: 'Dell Inspiron 15 3530 i7',brand: 'dell',  price: 3550000 },
  { id: 1546, name: 'Dell Inspiron 15 3511',   brand: 'dell',  price: 2150000 },
];

const FLASH_DEALS = [
  { id: 1698, name: 'iPhone 16 Pro',           brand: 'apple',  origPrice: 5499000, salePrice: 5199000, stock: 8 },
  { id: 1691, name: 'Dyson WashG1',            brand: 'dyson',  origPrice: 2900000, salePrice: 2500000, stock: 5 },
  { id: 1588, name: "MacBook Air M4 13''",     brand: 'apple',  origPrice: 4750000, salePrice: 4199000, stock: 12 },
  { id: 1720, name: 'Galaxy S25 Ultra 256GB',  brand: 'samsung',origPrice: 5299000, salePrice: 3999000, stock: 7 },
  { id: 1573, name: 'Cuckoo Агаар цэвэршүүлэгч',brand: 'cuckoo',origPrice: 1250000, salePrice: 1150000, stock: 15 },
  { id: 1714, name: 'AirPods Max (USB-C)',      brand: 'apple',  origPrice: 2700000, salePrice: 2450000, stock: 6 },
  { id: 1838, name: 'CUCKOO Кофе машин',       brand: 'cuckoo', origPrice: 1250000, salePrice: 1150000, stock: 20 },
  { id: 1667, name: 'Dyson Airwrap',            brand: 'dyson',  origPrice: 2600000, salePrice: 2350000, stock: 4 },
];

const OPEN_BOX = [
  { id: 1697, name: 'iPhone 16 Pro Max',       brand: 'apple',   origPrice: 6699000, salePrice: 5999000, grade: 'A+' },
  { id: 1691, name: 'Dyson WashG1',            brand: 'dyson',   origPrice: 2900000, salePrice: 2400000, grade: 'A' },
  { id: 1742, name: "MacBook Pro M4 16''",     brand: 'apple',   origPrice: 10550000, salePrice: 9500000, grade: 'A+' },
  { id: 1720, name: 'Galaxy S25 Ultra',        brand: 'samsung', origPrice: 5299000, salePrice: 4599000, grade: 'A' },
  { id: 1692, name: 'Dyson Gen5detect',        brand: 'dyson',   origPrice: 3400000, salePrice: 2900000, grade: 'A' },
  { id: 1587, name: "MacBook Air M4 15''",     brand: 'apple',   origPrice: 5199000, salePrice: 4599000, grade: 'A+' },
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
    <img src="${imgUrl(p.id)}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
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
    <img src="${imgUrl(p.id)}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
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
    <img src="${imgUrl(p.id)}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
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

  // Auth — header button
  if (typeof Auth !== 'undefined') Auth.updateHeader();
});
