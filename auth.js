/* ═══════════════════════════════════════
   AUTH MODULE — auth.js  v1
   localStorage-д session хадгалж,
   header-ийг бүх хуудасд шинэчилнэ.
   ═══════════════════════════════════════ */
(function (global) {
'use strict';

const SESSION_KEY  = 'antmall_session';
const WISHLIST_KEY = 'antmall_wishlist';
const ORDERS_KEY   = 'antmall_orders';

/* ── Default demo orders (нэвтрэх үед л анх байршуулна) ── */
const DEMO_ORDERS = [
  {
    id: 'ANT-2025-031', date: '2025.03.18', status: 'delivered', total: 8599000,
    items: [{ id: 1757, name: 'iPhone 17 Pro Max', qty: 1, price: 8599000, variant: '256GB / Natural Titanium' }]
  },
  {
    id: 'ANT-2025-024', date: '2025.02.27', status: 'shipped', total: 5980000,
    items: [{ id: 1710, name: 'DJI AIR 3S Fly More Combo', qty: 1, price: 5980000, variant: '' }]
  },
  {
    id: 'ANT-2025-011', date: '2025.01.14', status: 'processing', total: 4224000,
    items: [
      { id: 1588, name: "MacBook Air M4 13''", qty: 1, price: 4199000, variant: '16GB / 256GB' },
      { id: 1809, name: 'POUT 100W USB-C',     qty: 1, price: 25000,   variant: '' }
    ]
  }
];

const DEMO_WISHLIST = [
  { id: 1782, name: 'Apple Watch Ultra 3',          price: 3650000, origPrice: 3950000 },
  { id: 1777, name: 'Apple Watch Series 11',        price: 1950000, origPrice: 2050000 },
  { id: 1804, name: 'DEERMA Robot Vacuum X90 Ultra',price: 2391080, origPrice: 2599000 },
  { id: 1720, name: 'Galaxy S25 Ultra 256GB',       price: 3999000, origPrice: 5299000 },
  { id: 1667, name: 'Dyson Airwrap i.d.',           price: 2350000 }
];

const Auth = {

  /* ─────────────────────────────────────
     GETTERS
  ───────────────────────────────────── */
  getUser() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const u = JSON.parse(raw);
      return (u && u.loggedIn) ? u : null;
    } catch (e) { return null; }
  },

  isLoggedIn() { return !!this.getUser(); },

  getOrders() {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
    catch (e) { return []; }
  },

  getWishlist() {
    try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
    catch (e) { return []; }
  },

  /* ─────────────────────────────────────
     SETTERS
  ───────────────────────────────────── */

  /* Нэвтрэх / шинэ бүртгэл үед дуудна */
  login(userData, isNew) {
    const now = new Date();
    const joined = now.getFullYear() + '.' +
      String(now.getMonth()+1).padStart(2,'0') + '.' +
      String(now.getDate()).padStart(2,'0');

    const user = {
      first:  userData.first  || 'Хэрэглэгч',
      last:   userData.last   || '',
      phone:  userData.phone  || '',
      email:  userData.email  || '',
      birth:  userData.birth  || '',
      gender: userData.gender || 'male',
      avatar: userData.avatar || null,
      joined: userData.joined || joined,
      loggedIn: true
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));

    /* Шинэ бүртгэл бол demo өгөгдөл байршуулна */
    if (isNew || !localStorage.getItem(ORDERS_KEY)) {
      localStorage.setItem(ORDERS_KEY,  JSON.stringify(DEMO_ORDERS));
    }
    if (isNew || !localStorage.getItem(WISHLIST_KEY)) {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(DEMO_WISHLIST));
    }
  },

  /* Profile хуудсанд мэдээлэл засахад */
  updateUser(patch) {
    const u = this.getUser();
    if (!u) return;
    const updated = { ...u, ...patch };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
  },

  saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  saveWishlist(list) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  },

  /* Гарах */
  logout() {
    localStorage.removeItem(SESSION_KEY);
    /* Захиалга, wishlist-ийг үлдээнэ — дараагийн session-д харагдуулна */
  },

  /* ─────────────────────────────────────
     HEADER UPDATE  (бүх хуудасд)
  ───────────────────────────────────── */
  updateHeader() {
    const btn = document.getElementById('headerAccountBtn');
    if (!btn) return;

    const u = this.getUser();
    if (u) {
      const initials = ((u.first||'')[0]||'') + ((u.last||'')[0]||'');
      const avatarHtml = u.avatar
        ? `<img src="${u.avatar}" class="hbtn-avatar-img" alt="${u.first}" />`
        : `<span class="hbtn-avatar-init">${initials || 'А'}</span>`;

      btn.href = 'profile.html';
      btn.classList.add('hbtn--logged');
      btn.innerHTML = `
        <div class="hbtn-avatar">${avatarHtml}</div>
        <span>${u.first}</span>
      `;
    } else {
      btn.href = 'login.html';
      btn.classList.remove('hbtn--logged');
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Нэвтрэх</span>
      `;
    }
  },

  /* ─────────────────────────────────────
     REDIRECT HELPERS
  ───────────────────────────────────── */

  /* login.html?return=products.html гэж redirect хийхэд ашиглана */
  getReturnUrl(defaultUrl) {
    try {
      const p = new URLSearchParams(window.location.search);
      const r = p.get('return');
      /* Зөвхөн өөрийн домейны URL зөвшөөрнө */
      if (r && !r.startsWith('http') && !r.startsWith('//')) return r;
    } catch (e) { /* ignore */ }
    return defaultUrl || 'profile.html';
  },

  /* Нэвтрээгүй хэрэглэгчийг login руу явуулна (return URL-тэй) */
  requireLogin() {
    if (!this.isLoggedIn()) {
      const cur = window.location.pathname.split('/').pop() || 'index.html';
      window.location.href = 'login.html?return=' + cur;
      return true; /* redirecting */
    }
    return false;
  }
};

global.Auth = Auth;
})(window);
