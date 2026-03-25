/* ═══════════════════════════════════════
   PROFILE PAGE — profile.js  v2
   Auth module (auth.js) өгөгдөл удирдана
   ═══════════════════════════════════════ */
(function () {
'use strict';

/* ── Нэвтрээгүй бол login рүү ── */
if (typeof Auth === 'undefined' || !Auth.isLoggedIn()) {
  window.location.replace('login.html?return=profile.html');
}

const imgUrl = id => `https://admins-odoo.antmall.mn/web/image/product.template/${id}/image_1920`;
const fmt    = n  => Math.round(n).toLocaleString('mn-MN');

/* ── Өгөгдлийг Auth-аас авна ── */
let USER     = Auth.getUser()  || {};
let ORDERS   = Auth.getOrders();
let WISHLIST = Auth.getWishlist();

/* ── Захиалгын статус тохиргоо ── */
const STATUS = {
  processing: { label: 'Боловсруулж байна', cls: 'status-processing', icon: '⏳' },
  shipped:    { label: 'Хүргэлтэд',         cls: 'status-shipped',    icon: '🚚' },
  delivered:  { label: 'Хүргэгдсэн',        cls: 'status-delivered',  icon: '✅' },
  cancelled:  { label: 'Цуцлагдсан',        cls: 'status-cancelled',  icon: '❌' }
};

/* ── Mock addresses (session-д хадгалагдахгүй — demo) ── */
let ADDRESSES = JSON.parse(localStorage.getItem('antmall_addresses') || 'null') || [
  { id: 1, label: 'Гэр', recipient: (USER.first||'') + ' ' + (USER.last||''), phone: USER.phone||'', district: 'Сүхбаатар', detail: '13-р хороо, Энхтайваны өргөн чөлөө 15, 3-р байр, 42 тоот', isDefault: true },
  { id: 2, label: 'Ажил', recipient: (USER.first||'') + ' ' + (USER.last||''), phone: USER.phone||'', district: 'Баянгол', detail: '16-р хороо, Наадамчдын гудамж 8, Офис 201', isDefault: false }
];

function saveAddresses() {
  localStorage.setItem('antmall_addresses', JSON.stringify(ADDRESSES));
}

/* ═══════════════════════════════════
   TABS
   ═══════════════════════════════════ */
function showTab(name) {
  document.querySelectorAll('.prof-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.prof-nav__item').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name)?.classList.add('active');
  document.querySelector(`[data-tab="${name}"]`)?.classList.add('active');
  if (window.innerWidth < 900) document.getElementById('profSidebar')?.classList.remove('open');
  if (name === 'orders')   renderOrders('all');
  if (name === 'wishlist') renderWishlist();
  if (name === 'address')  renderAddresses();
}
window.showTab = showTab;

function toggleSidebar() {
  document.getElementById('profSidebar')?.classList.toggle('open');
}
window.toggleSidebar = toggleSidebar;

/* ═══════════════════════════════════
   USER INFO
   ═══════════════════════════════════ */
function initUserInfo() {
  USER = Auth.getUser() || USER;
  const initials = ((USER.first||'')[0]||'') + ((USER.last||'')[0]||'');

  /* Sidebar */
  const sn = document.getElementById('sidebarName');
  if (sn) sn.textContent = [USER.first, USER.last].filter(Boolean).join(' ');
  const sp = document.getElementById('sidebarPhone');
  if (sp) sp.textContent = (USER.phone||'').replace(/(\d{4})(\d{4})/, '$1-$2');

  /* Avatars */
  updateAvatarEls(USER.avatar, initials);

  /* Form fields */
  setValue('infoFirst', USER.first);
  setValue('infoLast',  USER.last);
  setValue('infoPhone', USER.phone);
  setValue('infoEmail', USER.email);
  setValue('infoBirth', USER.birth);
  setGender(USER.gender || 'male');

  /* Stats */
  document.getElementById('statOrders').textContent = ORDERS.length;
  document.getElementById('statWish').textContent   = WISHLIST.length;
  document.getElementById('wishBadge').textContent  = WISHLIST.length;
  document.getElementById('orderBadge').textContent = ORDERS.length;

  const totalSpend = ORDERS.reduce((s, o) => s + (o.total||0), 0);
  document.getElementById('statSpend').textContent = fmt(totalSpend) + '₮';
  document.getElementById('statOrders').textContent = ORDERS.length;
}

function updateAvatarEls(src, initials) {
  /* Sidebar avatar */
  const sImg  = document.getElementById('avatarImg');
  const sInit = document.getElementById('avatarInitials');
  if (sImg && sInit) {
    if (src) { sImg.src = src; sImg.style.display = 'block'; sInit.style.display = 'none'; }
    else     { sImg.style.display = 'none'; sInit.style.display = ''; sInit.textContent = initials || 'А'; }
  }
  /* Info avatar */
  const iImg  = document.getElementById('infoAvatarImg');
  const iInit = document.getElementById('infoAvatarInitials');
  if (iImg && iInit) {
    if (src) { iImg.src = src; iImg.style.display = 'block'; iInit.style.display = 'none'; }
    else     { iImg.style.display = 'none'; iInit.style.display = ''; iInit.textContent = initials || 'А'; }
  }
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function setGender(g) {
  USER.gender = g;
  document.getElementById('genderM')?.classList.toggle('active', g === 'male');
  document.getElementById('genderF')?.classList.toggle('active', g === 'female');
}
window.setGender = setGender;

function saveInfo(e) {
  e.preventDefault();
  const btn = document.getElementById('infoSaveBtn');
  btn.classList.add('loading');

  setTimeout(() => {
    const patch = {
      first:  document.getElementById('infoFirst').value.trim() || USER.first,
      last:   document.getElementById('infoLast').value.trim()  || USER.last,
      phone:  document.getElementById('infoPhone').value.trim() || USER.phone,
      email:  document.getElementById('infoEmail').value.trim() || USER.email,
      birth:  document.getElementById('infoBirth').value        || USER.birth,
      gender: USER.gender
    };
    Auth.updateUser(patch);
    USER = Auth.getUser();
    initUserInfo();
    Auth.updateHeader();          /* header-ийг нэн даруй шинэчилнэ */
    btn.classList.remove('loading');
    const toast = document.getElementById('infoToast');
    if (toast) { toast.classList.remove('hidden'); setTimeout(() => toast.classList.add('hidden'), 2800); }
  }, 700);
}
window.saveInfo = saveInfo;

/* ── Avatar upload ── */
function changeAvatar(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const src = ev.target.result;
    Auth.updateUser({ avatar: src });
    USER = Auth.getUser();
    const initials = ((USER.first||'')[0]||'') + ((USER.last||'')[0]||'');
    updateAvatarEls(src, initials);
    Auth.updateHeader();
    showGlobalToast('Зураг амжилттай солигдлоо');
  };
  reader.readAsDataURL(file);
}
window.changeAvatar = changeAvatar;

/* ═══════════════════════════════════
   ORDERS
   ═══════════════════════════════════ */
function renderOrders(filter) {
  const list = document.getElementById('ordersList');
  if (!list) return;
  const filtered = filter === 'all' ? ORDERS : ORDERS.filter(o => o.status === filter);

  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state">
      <div class="empty-state__icon">📦</div>
      <p class="empty-state__title">Захиалга байхгүй байна</p>
      <a href="products.html" class="btn-save" style="display:inline-flex;width:auto;padding:0 28px">Дэлгүүр хэсэх</a>
    </div>`;
    return;
  }

  const PLACEHOLDER_IMG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3C/svg%3E`;

  list.innerHTML = filtered.map(o => {
    const st = STATUS[o.status] || STATUS.processing;
    const fi = o.items[0];
    const extra = o.items.length - 1;
    return `<div class="order-card" onclick="openOrder('${o.id}')">
      <div class="order-card__img">
        <img src="${imgUrl(fi.id)}" alt="${fi.name}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'" />
        ${extra > 0 ? `<span class="order-card__more">+${extra}</span>` : ''}
      </div>
      <div class="order-card__body">
        <div class="order-card__top">
          <span class="order-card__id">#${o.id}</span>
          <span class="order-status ${st.cls}">${st.icon} ${st.label}</span>
        </div>
        <p class="order-card__name">${fi.name}${fi.variant ? ` · <small>${fi.variant}</small>` : ''}</p>
        <div class="order-card__foot">
          <span class="order-card__date">📅 ${o.date}</span>
          <span class="order-card__total">${fmt(o.total)}₮</span>
        </div>
      </div>
      <svg class="order-card__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </div>`;
  }).join('');
}

function filterOrders(filter, btn) {
  document.querySelectorAll('.order-ftab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderOrders(filter);
}
window.filterOrders = filterOrders;

function openOrder(id) {
  const order = ORDERS.find(o => o.id === id);
  if (!order) return;
  const steps      = ['processing','shipped','delivered'];
  const stepLabels = ['Баталгаажсан','Хүргэлтэд','Хүргэгдсэн'];
  const stepIdx    = steps.indexOf(order.status);

  let stepperHtml = `<div class="order-stepper">`;
  steps.forEach((s, i) => {
    const done = stepIdx >= i;
    const curr = stepIdx === i && order.status !== 'cancelled';
    stepperHtml += `<div class="step ${done?'done':''} ${curr?'current':''}">
      <div class="step__dot">${done ? '✓' : i+1}</div>
      <span class="step__label">${stepLabels[i]}</span>
    </div>`;
    if (i < steps.length - 1)
      stepperHtml += `<div class="step__line ${stepIdx > i ? 'done' : ''}"></div>`;
  });
  stepperHtml += '</div>';

  const PLACEHOLDER_IMG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3C/svg%3E`;

  const itemsHtml = order.items.map(item => `
    <div class="modal-item">
      <img src="${imgUrl(item.id)}" alt="${item.name}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'" />
      <div class="modal-item__info">
        <p class="modal-item__name">${item.name}</p>
        ${item.variant ? `<span class="modal-item__variant">${item.variant}</span>` : ''}
        <span class="modal-item__qty">× ${item.qty}</span>
      </div>
      <span class="modal-item__price">${fmt(item.price)}₮</span>
    </div>`).join('');

  document.getElementById('modalOrderId').textContent = 'Захиалга #' + order.id;
  document.getElementById('modalBody').innerHTML = `
    ${order.status !== 'cancelled' ? stepperHtml : `<div class="order-cancelled-msg">❌ Захиалга цуцлагдсан</div>`}
    <div class="modal-meta">
      <span>Дугаар: <strong>#${order.id}</strong></span>
      <span>Огноо: <strong>${order.date}</strong></span>
    </div>
    <div class="modal-items">${itemsHtml}</div>
    <div class="modal-total"><span>Нийт дүн</span><strong>${fmt(order.total)}₮</strong></div>
    ${order.status === 'delivered'  ? `<button class="btn-save" style="width:100%;margin-top:8px" onclick="showGlobalToast('Үнэлгээ илгээгдлээ ⭐')">⭐ Үнэлгээ өгөх</button>` : ''}
    ${order.status === 'processing' ? `<button class="btn-danger" style="width:100%;margin-top:8px" onclick="cancelOrder('${order.id}')">Захиалга цуцлах</button>` : ''}
  `;
  document.getElementById('orderModal').classList.remove('hidden');
}
window.openOrder = openOrder;

function cancelOrder(id) {
  const idx = ORDERS.findIndex(o => o.id === id);
  if (idx === -1) return;
  ORDERS[idx].status = 'cancelled';
  Auth.saveOrders(ORDERS);
  document.getElementById('orderModal').classList.add('hidden');
  renderOrders('all');
  showGlobalToast('Захиалга цуцлагдлаа');
}
window.cancelOrder = cancelOrder;

function closeOrderModal(e) {
  if (e.target === document.getElementById('orderModal'))
    document.getElementById('orderModal').classList.add('hidden');
}
window.closeOrderModal = closeOrderModal;

/* ═══════════════════════════════════
   WISHLIST
   ═══════════════════════════════════ */
function renderWishlist() {
  const grid = document.getElementById('wishGrid');
  if (!grid) return;

  if (!WISHLIST.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state__icon">❤️</div>
      <p class="empty-state__title">Хадгалсан бараа байхгүй байна</p>
      <a href="products.html" class="btn-save" style="display:inline-flex;width:auto;padding:0 28px">Дэлгүүр хэсэх</a>
    </div>`;
    return;
  }

  const PLACEHOLDER_IMG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3C/svg%3E`;

  grid.innerHTML = WISHLIST.map((p, idx) => {
    const disc = p.origPrice ? Math.round((1 - p.price / p.origPrice) * 100) : 0;
    const ns   = (p.name||'').replace(/'/g,"\\'");
    return `<div class="wish-card">
      <button class="wish-card__remove" onclick="removeWish(${idx})" aria-label="Хасах">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      ${disc ? `<span class="wish-card__badge">-${disc}%</span>` : ''}
      <div class="wish-card__img" onclick="location.href='product.html?id=${p.id}'">
        <img src="${imgUrl(p.id)}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'" />
      </div>
      <div class="wish-card__body">
        <p class="wish-card__name" onclick="location.href='product.html?id=${p.id}'">${p.name}</p>
        <div class="wish-card__price">
          <span class="price-now">${fmt(p.price)}₮</span>
          ${p.origPrice ? `<span class="price-was">${fmt(p.origPrice)}₮</span>` : ''}
        </div>
        <button class="btn-cart-wish" onclick="addToCartWish('${ns}',${p.price})">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Сагсанд нэмэх
        </button>
      </div>
    </div>`;
  }).join('');
}

function removeWish(idx) {
  WISHLIST.splice(idx, 1);
  Auth.saveWishlist(WISHLIST);
  document.getElementById('wishBadge').textContent = WISHLIST.length;
  document.getElementById('statWish').textContent  = WISHLIST.length;
  renderWishlist();
  showGlobalToast('Хадгалсан жагсаалтаас хасагдлаа');
}
window.removeWish = removeWish;

function addToCartWish(name, price) {
  showGlobalToast('Сагсанд нэмэгдлээ: ' + name);
}
window.addToCartWish = addToCartWish;

/* ═══════════════════════════════════
   ADDRESSES
   ═══════════════════════════════════ */
function renderAddresses() {
  const grid = document.getElementById('addrGrid');
  if (!grid) return;
  grid.innerHTML = ADDRESSES.map(a => `
    <div class="addr-card ${a.isDefault ? 'addr-card--default' : ''}">
      ${a.isDefault ? `<span class="addr-default-badge">Үндсэн хаяг</span>` : ''}
      <div class="addr-card__label">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${a.label}
      </div>
      <p class="addr-card__recipient">${a.recipient}</p>
      <p class="addr-card__phone">${a.phone}</p>
      <p class="addr-card__detail">${a.district} дүүрэг, ${a.detail}</p>
      <div class="addr-card__actions">
        ${!a.isDefault ? `<button class="addr-btn" onclick="setDefaultAddr(${a.id})">Үндсэн болгох</button>` : ''}
        <button class="addr-btn addr-btn--del" onclick="deleteAddr(${a.id})">Устгах</button>
      </div>
    </div>`).join('');
}

function setDefaultAddr(id) {
  ADDRESSES.forEach(a => a.isDefault = a.id === id);
  saveAddresses();
  renderAddresses();
  showGlobalToast('Үндсэн хаяг тохируулагдлаа');
}
window.setDefaultAddr = setDefaultAddr;

function deleteAddr(id) {
  if (ADDRESSES.length <= 1) { showGlobalToast('Хамгийн багадаа 1 хаяг шаардлагатай'); return; }
  ADDRESSES = ADDRESSES.filter(a => a.id !== id);
  saveAddresses();
  renderAddresses();
  showGlobalToast('Хаяг устгагдлаа');
}
window.deleteAddr = deleteAddr;

function toggleAddrForm() {
  const form = document.getElementById('addrForm');
  form.classList.toggle('hidden');
  if (!form.classList.contains('hidden')) form.scrollIntoView({ behavior:'smooth', block:'start' });
}
window.toggleAddrForm = toggleAddrForm;

function saveAddress(e) {
  e.preventDefault();
  const label     = document.getElementById('addrLabel').value.trim()     || 'Хаяг';
  const recipient = document.getElementById('addrRecipient').value.trim();
  const phone     = document.getElementById('addrPhone').value.trim();
  const district  = document.getElementById('addrDistrict').value;
  const detail    = document.getElementById('addrDetail').value.trim();

  if (!recipient || !phone || !district || !detail) {
    showGlobalToast('Бүх талбарыг бөглөнө үү'); return;
  }
  const newId = Math.max(0, ...ADDRESSES.map(a => a.id)) + 1;
  ADDRESSES.push({ id: newId, label, recipient, phone, district, detail, isDefault: false });
  saveAddresses();
  toggleAddrForm();
  renderAddresses();
  showGlobalToast('Хаяг нэмэгдлээ');
  ['addrLabel','addrRecipient','addrPhone','addrDetail'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('addrDistrict').value = '';
}
window.saveAddress = saveAddress;

/* ═══════════════════════════════════
   SECURITY
   ═══════════════════════════════════ */
function togglePassForm() {
  const form = document.getElementById('passChangeForm');
  const btn  = document.getElementById('passExpandBtn');
  const open = form.classList.toggle('hidden');
  if (btn) btn.textContent = open ? 'Солих' : 'Хаах';
}
window.togglePassForm = togglePassForm;

function togglePass2(inputId, btn) {
  const inp = document.getElementById(inputId);
  const isH = inp.type === 'password';
  inp.type = isH ? 'text' : 'password';
  btn.innerHTML = isH
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
}
window.togglePass2 = togglePass2;

function changePassword(e) {
  e.preventDefault();
  const curr = document.getElementById('scPassCurr').value;
  const nw   = document.getElementById('scPassNew').value;
  const nw2  = document.getElementById('scPassNew2').value;
  const err  = document.getElementById('scPassErr');
  err.textContent = '';
  if (!curr)           { err.textContent = 'Одоогийн нууц үгээ оруулна уу'; return; }
  if (nw.length < 8)   { err.textContent = 'Шинэ нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой'; return; }
  if (nw !== nw2)      { err.textContent = 'Нууц үг таарахгүй байна'; return; }
  ['scPassCurr','scPassNew','scPassNew2'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  togglePassForm();
  showGlobalToast('Нууц үг амжилттай солигдлоо 🔒');
}
window.changePassword = changePassword;

function saveNotif(checkbox, type) {
  showGlobalToast('Мэдэгдэл ' + (checkbox.checked ? 'асаалттай' : 'унтраалттай') + ' болгогдлоо');
}
window.saveNotif = saveNotif;

function confirmDelete() {
  if (confirm('Та акаунтаа устгахдаа итгэлтэй байна уу? Энэ үйлдэл буцаах боломжгүй.')) {
    Auth.logout();
    showGlobalToast('Акаунт устгагдлаа');
    setTimeout(() => window.location.href = 'index.html', 1000);
  }
}
window.confirmDelete = confirmDelete;

/* ═══════════════════════════════════
   LOGOUT
   ═══════════════════════════════════ */
function handleLogout() {
  if (confirm('Та гарахдаа итгэлтэй байна уу?')) {
    Auth.logout();
    showGlobalToast('Гарлаа. Шилжүүлж байна...');
    setTimeout(() => window.location.href = 'index.html', 900);
  }
}
window.handleLogout = handleLogout;

/* ═══════════════════════════════════
   GLOBAL TOAST
   ═══════════════════════════════════ */
let toastTimer;
function showGlobalToast(msg) {
  const el = document.getElementById('globalToast');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.classList.add('hidden'), 300);
  }, 2800);
}
window.showGlobalToast = showGlobalToast;

/* ═══════════════════════════════════
   SEARCH
   ═══════════════════════════════════ */
function doSearch(e) {
  e.preventDefault();
  const q = document.getElementById('searchInput')?.value.trim();
  if (q) window.location.href = `products.html?q=${encodeURIComponent(q)}`;
}
window.doSearch = doSearch;

/* ═══════════════════════════════════
   INIT
   ═══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  initUserInfo();
  Auth.updateHeader();

  /* URL hash → auto-tab */
  const hash  = window.location.hash.replace('#','');
  const valid = ['info','orders','wishlist','address','security'];
  showTab(valid.includes(hash) ? hash : 'info');

  /* Sticky header */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 10);
  });

  /* Phone inputs: digits only */
  ['addrPhone','infoPhone'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g,'').slice(0,8);
    });
  });
});

})();
