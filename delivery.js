/* ═══════════════════════════════════════
   DELIVERY WORKER — delivery.js  v1
   ═══════════════════════════════════════ */
'use strict';

const fmt = n => Math.round(n).toLocaleString('mn-MN');
const imgUrl = id => `https://admins-odoo.antmall.mn/web/image/product.template/${id}/image_1920`;
const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect fill='%23f3f4f6' width='60' height='60'/%3E%3C/svg%3E`;

/* ── Courier accounts ── */
const COURIERS = {
  'D001': { pin:'1234', name:'Дорж Батбаяр',   zone:'Сүхбаатар, Баянзүрх', phone:'99001122', id:'D001' },
  'D002': { pin:'5678', name:'Мөнх Эрдэнэ',    zone:'Баянгол, Сонгинохайрхан', phone:'88223344', id:'D002' },
  'D003': { pin:'9999', name:'Энхбаяр Гантулга',zone:'Хан-Уул, Налайх', phone:'99334411', id:'D003' },
};

const SESSION_KEY = 'antmall_courier_session';
let currentCourier = null;
let activeOrderId  = null;

/* ══════════════════════════════════
   AUTH
══════════════════════════════════ */
function dvLogin(e) {
  e.preventDefault();
  const id  = document.getElementById('dvLoginId').value.trim().toUpperCase();
  const pin = document.getElementById('dvLoginPin').value.trim();
  const err = document.getElementById('dvLoginErr');

  const courier = COURIERS[id];
  if (!courier || courier.pin !== pin) {
    err.textContent = 'Ажилтны код эсвэл PIN буруу байна.';
    document.getElementById('dvLoginPin').value = '';
    return;
  }

  err.textContent = '';
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id, ts: Date.now() }));
  bootApp(courier);
}
window.dvLogin = dvLogin;

function dvLogout() {
  if (!confirm('Системээс гарах уу?')) return;
  localStorage.removeItem(SESSION_KEY);
  document.getElementById('dvApp').classList.add('hidden');
  document.getElementById('dvLogin').classList.remove('hidden');
  document.getElementById('dvLoginId').value  = '';
  document.getElementById('dvLoginPin').value = '';
  currentCourier = null;
}
window.dvLogout = dvLogout;

function bootApp(courier) {
  currentCourier = courier;

  /* Header */
  document.getElementById('dvCourierName').textContent    = courier.name.split(' ')[0];
  document.getElementById('dvCourierInitial').textContent = courier.name[0];

  /* Profile tab */
  document.getElementById('dvProfileName').textContent  = courier.name;
  document.getElementById('dvProfileId').textContent    = courier.id + ' · ' + courier.zone;
  document.getElementById('dvProfileInitial').textContent = courier.name[0];

  document.getElementById('dvLogin').classList.add('hidden');
  document.getElementById('dvApp').classList.remove('hidden');

  renderAll();
}

/* ══════════════════════════════════
   ORDER DATA
══════════════════════════════════ */

/* Seed addresses for demo orders */
const ADDRESSES = [
  { district:'Сүхбаатар', detail:'13-р хороо, Энхтайваны өргөн чөлөө 15, 3-р байр, 42 тоот' },
  { district:'Баянгол',   detail:'16-р хороо, Наадамчдын гудамж 8, Офис 201' },
  { district:'Баянзүрх',  detail:'23-р хороо, Их тойруу 45, 7-р байр, 15 тоот' },
  { district:'Хан-Уул',   detail:'11-р хороо, Зайсангийн гудамж 12, 2-р байр, 8 тоот' },
  { district:'Чингэлтэй', detail:'3-р хороо, Амарсанаагийн гудамж 22, 1-р байр, 104 тоот' },
  { district:'Сонгинохайрхан', detail:'19-р хороо, Тэнгэлэг гудамж 5, 5-р байр, 33 тоот' },
  { district:'Налайх',    detail:'2-р хороо, Налайхын гудамж 7, 4-р байр, 21 тоот' },
];

const PHONES = ['99112233','88991122','95001234','99887766','96000011','99444555','88223344','99550066','91234567','99001122'];

function getOrders() {
  const key = 'antmall_admin_orders';
  let orders = [];
  try { orders = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) { orders = []; }

  if (!orders.length) {
    /* Fallback demo seed if admin hasn't opened yet */
    orders = SEED_ORDERS;
    localStorage.setItem(key, JSON.stringify(orders));
  }

  /* Assign address + phone + courierId if missing */
  let changed = false;
  orders.forEach((o, i) => {
    if (!o.address) {
      o.address = ADDRESSES[i % ADDRESSES.length];
      changed = true;
    }
    if (!o.phone) {
      o.phone = PHONES[i % PHONES.length];
      changed = true;
    }
    if (!o.courierId) {
      /* Active orders (shipped/delivering) → D001 & D002 so demo is useful */
      if (o.status === 'shipped' || o.status === 'delivering') {
        const active = ['D001','D002'];
        o.courierId = active[i % active.length];
      } else {
        const ids = Object.keys(COURIERS);
        o.courierId = ids[i % ids.length];
      }
      changed = true;
    }
  });
  if (changed) localStorage.setItem(key, JSON.stringify(orders));

  return orders;
}

function saveOrders(orders) {
  localStorage.setItem('antmall_admin_orders', JSON.stringify(orders));
}

function myOrders() {
  if (!currentCourier) return [];
  return getOrders().filter(o => o.courierId === currentCourier.id);
}

/* ══════════════════════════════════
   RENDER
══════════════════════════════════ */
function renderAll() {
  const mine = myOrders();
  const pending    = mine.filter(o => o.status === 'shipped');
  const delivering = mine.filter(o => o.status === 'delivering');
  const done       = mine.filter(o => o.status === 'delivered' || o.status === 'failed' || o.status === 'cancelled');

  /* Stats */
  document.getElementById('dvStatPending').textContent    = pending.length;
  document.getElementById('dvStatDelivering').textContent = delivering.length;
  document.getElementById('dvStatDone').textContent       = done.filter(o => o.status === 'delivered').length;
  document.getElementById('dvBadgePending').textContent    = pending.length;
  document.getElementById('dvBadgeDelivering').textContent = delivering.length;

  /* Profile stats */
  const doneCnt   = done.filter(o => o.status === 'delivered').length;
  const failedCnt = done.filter(o => o.status === 'failed').length;
  const totalDone = mine.filter(o => o.status !== 'processing');
  const rate = totalDone.length ? Math.round(doneCnt / (doneCnt + failedCnt) * 100) || 100 : 0;
  const totalSpend = done.filter(o => o.status === 'delivered').reduce((s, o) => s + (o.total||0), 0);

  document.getElementById('dvProfDone').textContent   = doneCnt;
  document.getElementById('dvProfFailed').textContent = failedCnt;
  document.getElementById('dvProfRate').textContent   = rate + '%';
  document.getElementById('dvProfTotal').textContent  = fmt(totalSpend) + '₮';

  /* Lists */
  document.getElementById('dvPendingList').innerHTML    = pending.length    ? pending.map(renderCard).join('')    : emptyState('📋','Хүлээж буй захиалга байхгүй','Шинэ захиалга ирэхэд энд харагдана');
  document.getElementById('dvDeliveringList').innerHTML = delivering.length ? delivering.map(renderCard).join('') : emptyState('🚚','Хүргэж буй захиалга байхгүй','Захиалга авсны дараа энд харагдана');
  document.getElementById('dvDoneList').innerHTML       = done.length       ? done.map(renderCard).join('')       : emptyState('✅','Дууссан захиалга байхгүй','');
}

function emptyState(icon, title, sub) {
  return `<div class="dv-empty">
    <div class="dv-empty__icon">${icon}</div>
    <div class="dv-empty__title">${title}</div>
    ${sub ? `<div class="dv-empty__sub">${sub}</div>` : ''}
  </div>`;
}

function renderCard(o) {
  const fi    = o.items[0];
  const more  = o.items.length - 1;
  const addr  = o.address || { district:'—', detail:'Хаяг тодорхойгүй' };
  const cInit = (o.customer||'Х')[0];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr.district + ' дүүрэг ' + addr.detail + ' Улаанбаатар')}`;
  const isCOD  = o.total > 1000000; /* large orders = cash on delivery demo */

  let statusBadge = '';
  let actionsBtns = '';

  if (o.status === 'shipped') {
    statusBadge = `<span class="dv-status-badge dv-status-badge--pending">⏳ Хүлээж байна</span>`;
    actionsBtns = `
      <button class="dv-btn dv-btn--pickup" onclick="openAction('${o.id}','pickup')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        Авсан
      </button>`;
  } else if (o.status === 'delivering') {
    statusBadge = `<span class="dv-status-badge dv-status-badge--delivering">🚚 Хүргэж байна</span>`;
    actionsBtns = `
      <button class="dv-btn dv-btn--delivered" onclick="openAction('${o.id}','deliver')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        Хүргэсэн
      </button>
      <button class="dv-btn dv-btn--fail" onclick="openAction('${o.id}','fail')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Амжилтгүй
      </button>`;
  } else if (o.status === 'delivered') {
    statusBadge = `<span class="dv-status-badge dv-status-badge--delivered">✅ Хүргэгдсэн</span>`;
    actionsBtns = `<button class="dv-btn dv-btn--disabled" disabled>Дууссан</button>`;
  } else if (o.status === 'failed') {
    statusBadge = `<span class="dv-status-badge dv-status-badge--failed">❌ Амжилтгүй</span>`;
    actionsBtns = `<button class="dv-btn dv-btn--disabled" disabled>Амжилтгүй</button>`;
  } else if (o.status === 'cancelled') {
    statusBadge = `<span class="dv-status-badge dv-status-badge--failed">🚫 Цуцлагдсан</span>`;
    actionsBtns = `<button class="dv-btn dv-btn--disabled" disabled>Цуцлагдсан</button>`;
  }

  return `
  <div class="dv-card" id="card-${o.id}">
    <div class="dv-card__head">
      <div class="dv-card__id">
        <div class="dv-card__order-num">${o.id} · ${o.date}</div>
        <div class="dv-card__items-preview">${fi.name}${more > 0 ? ` <span style="font-size:.72rem;color:#64748b">+${more} бараа</span>` : ''}</div>
      </div>
      ${statusBadge}
    </div>

    <div class="dv-card__div"></div>

    <div class="dv-card__customer">
      <div class="dv-card__cust-avatar">${cInit}</div>
      <div class="dv-card__cust-info">
        <div class="dv-card__cust-name">${o.customer}</div>
        <div class="dv-card__cust-phone">${o.phone || '—'}</div>
      </div>
      ${o.phone ? `<a class="dv-call-btn" href="tel:${o.phone}" title="Дуудлага хийх">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>` : ''}
    </div>

    <div class="dv-card__address">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      <div>
        <div class="dv-card__address-district">${addr.district} дүүрэг</div>
        <div class="dv-card__address-text">${addr.detail}</div>
        <a class="dv-map-btn" href="${mapsUrl}" target="_blank">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          Газрын зураг нээх
        </a>
      </div>
    </div>

    <div class="dv-card__total">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      Нийт дүн: <strong>${fmt(o.total)}₮</strong>
      ${isCOD && (o.status === 'shipped' || o.status === 'delivering') ? `<span class="dv-card__cod">💵 Бэлнээр</span>` : ''}
    </div>

    <div class="dv-card__div"></div>

    <div class="dv-card__actions">
      ${actionsBtns}
    </div>
  </div>`;
}

/* ══════════════════════════════════
   TAB NAVIGATION
══════════════════════════════════ */
function dvShowTab(name, el) {
  document.querySelectorAll('.dv-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.dv-bnav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('dv-sec-' + name)?.classList.add('active');
  if (el) el.classList.add('active');
}
window.dvShowTab = dvShowTab;

/* ══════════════════════════════════
   ACTION MODAL
══════════════════════════════════ */
function openAction(orderId, action) {
  activeOrderId = orderId;
  const orders  = getOrders();
  const o       = orders.find(x => x.id === orderId);
  if (!o) return;

  const modal   = document.getElementById('dvActionModal');
  const title   = document.getElementById('dvModalTitle');
  const sub     = document.getElementById('dvModalSub');
  const btns    = document.getElementById('dvModalBtns');

  if (action === 'pickup') {
    title.textContent = '📦 Захиалга авах';
    sub.textContent   = `${o.id} — ${o.customer}\n${o.items[0].name}`;
    btns.innerHTML = `
      <button class="dv-modal__btn dv-modal__btn--green" onclick="confirmAction('delivering')">
        ✅ Тийм, авсан
      </button>
      <button class="dv-modal__btn dv-modal__btn--cancel" onclick="closeModal()">Болих</button>`;
  } else if (action === 'deliver') {
    title.textContent = '🎉 Хүргэлт баталгаажуулах';
    sub.textContent   = `${o.customer}-д хүргэсэн үү?`;
    btns.innerHTML = `
      <button class="dv-modal__btn dv-modal__btn--green" onclick="confirmAction('delivered')">
        ✅ Тийм, хүргэсэн
      </button>
      <button class="dv-modal__btn dv-modal__btn--cancel" onclick="closeModal()">Болих</button>`;
  } else if (action === 'fail') {
    title.textContent = '❌ Хүргэлт амжилтгүй';
    sub.textContent   = 'Амжилтгүйн шалтгааныг сонгоно уу:';
    btns.innerHTML = `
      <button class="dv-modal__btn dv-modal__btn--red" onclick="confirmAction('failed','Хэрэглэгч байрандаа байсангүй')">
        🏠 Хэрэглэгч байрандаа байсангүй
      </button>
      <button class="dv-modal__btn dv-modal__btn--red" onclick="confirmAction('failed','Хэрэглэгч утасгүй байна')">
        📵 Утасгүй байна
      </button>
      <button class="dv-modal__btn dv-modal__btn--red" onclick="confirmAction('failed','Хаяг олдсонгүй')">
        🗺️ Хаяг олдсонгүй
      </button>
      <button class="dv-modal__btn dv-modal__btn--cancel" onclick="closeModal()">Болих</button>`;
  }

  modal.classList.remove('hidden');
}
window.openAction = openAction;

function confirmAction(newStatus, note) {
  const orders = getOrders();
  const idx    = orders.findIndex(o => o.id === activeOrderId);
  if (idx === -1) { closeModal(); return; }

  orders[idx].status = newStatus;
  if (note) orders[idx].failNote = note;
  if (newStatus === 'delivering') orders[idx].pickedAt   = new Date().toLocaleTimeString('mn-MN', { hour:'2-digit', minute:'2-digit' });
  if (newStatus === 'delivered')  orders[idx].deliveredAt = new Date().toLocaleTimeString('mn-MN', { hour:'2-digit', minute:'2-digit' });

  saveOrders(orders);
  closeModal();
  renderAll();

  const msgs = {
    delivering: '📦 Захиалга авлаа. Хүргэлт эхлэв!',
    delivered:  '🎉 Захиалга амжилттай хүргэгдлээ!',
    failed:     '❌ Амжилтгүй тэмдэглэгдлээ.'
  };
  showToast(msgs[newStatus] || 'Шинэчлэгдлээ');

  /* Auto-navigate to matching tab */
  const tabs = { delivering: 1, delivered: 2, failed: 2 };
  const idx2 = tabs[newStatus] ?? 0;
  const tabNames = ['pending','delivering','done'];
  const tabEls   = document.querySelectorAll('.dv-bnav-item');
  dvShowTab(tabNames[idx2], tabEls[idx2]);
}
window.confirmAction = confirmAction;

function closeModal() {
  document.getElementById('dvActionModal').classList.add('hidden');
  activeOrderId = null;
}
window.closeModal = closeModal;

function closeDvModal(e) {
  if (e.target === document.getElementById('dvActionModal')) closeModal();
}
window.closeDvModal = closeDvModal;

/* ══════════════════════════════════
   TOAST
══════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const el = document.getElementById('dvToast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

/* ══════════════════════════════════
   SEED ORDERS (fallback)
══════════════════════════════════ */
const SEED_ORDERS = [
  { id:'ANT-2026-087', date:'2026.03.25', customer:'Б. Мөнхбаяр', phone:'99112233', total:8599000, status:'shipped',    courierId:'D001', address:ADDRESSES[0], items:[{id:1757,name:'iPhone 17 Pro Max',qty:1,price:8599000,variant:'256GB / Natural Titanium'}] },
  { id:'ANT-2026-086', date:'2026.03.24', customer:'Э. Дэлгэрмаа', phone:'88991122', total:5980000, status:'shipped',    courierId:'D002', address:ADDRESSES[1], items:[{id:1710,name:'DJI AIR 3S Fly More Combo',qty:1,price:5980000,variant:''}] },
  { id:'ANT-2026-085', date:'2026.03.24', customer:'Г. Болд',       phone:'95001234', total:3850000, status:'delivered',  courierId:'D001', address:ADDRESSES[2], items:[{id:1721,name:'Galaxy S25',qty:1,price:3850000,variant:'128GB / Icy Blue'}] },
  { id:'ANT-2026-084', date:'2026.03.23', customer:'Н. Цэцэгмаа',  phone:'99887766', total:4199000, status:'delivered',  courierId:'D002', address:ADDRESSES[3], items:[{id:1588,name:"MacBook Air M4 13''",qty:1,price:4199000,variant:'16GB/256GB'}] },
  { id:'ANT-2026-083', date:'2026.03.23', customer:'Д. Бат-Эрдэнэ',phone:'96000011', total:1350000, status:'delivering', courierId:'D001', address:ADDRESSES[4], items:[{id:1778,name:'AirPods Pro (3rd generation)',qty:1,price:1350000,variant:''}] },
  { id:'ANT-2026-082', date:'2026.03.22', customer:'О. Алтанцэцэг', phone:'99444555', total:2180000, status:'shipped',    courierId:'D002', address:ADDRESSES[5], items:[{id:1845,name:'DJI Neo 2 Motion Fly More Combo',qty:1,price:2180000,variant:''}] },
  { id:'ANT-2026-081', date:'2026.03.22', customer:'М. Эрдэнэсүх', phone:'88223344', total:6899000, status:'shipped',    courierId:'D001', address:ADDRESSES[0], items:[{id:1758,name:'iPhone 17 Pro',qty:1,price:6899000,variant:'256GB / Black Titanium'}] },
  { id:'ANT-2026-080', date:'2026.03.21', customer:'Ж. Сүхбаатар', phone:'99550066', total:3400000, status:'delivered',  courierId:'D002', address:ADDRESSES[1], items:[{id:1692,name:'Dyson Gen5detect Complete Vacuum',qty:1,price:3400000,variant:''}] },
  { id:'ANT-2026-079', date:'2026.03.20', customer:'Х. Отгонбаяр', phone:'91234567', total:1950000, status:'delivered',  courierId:'D001', address:ADDRESSES[2], items:[{id:1777,name:'Apple Watch Series 11',qty:1,price:1950000,variant:'45mm / Midnight'}] },
  { id:'ANT-2026-078', date:'2026.03.19', customer:'Ч. Номун',      phone:'99001122', total:2391080, status:'failed',     courierId:'D002', address:ADDRESSES[3], failNote:'Хэрэглэгч байрандаа байсангүй', items:[{id:1804,name:'DEERMA Robot Vacuum DEM-X90 Ultra',qty:1,price:2391080,variant:''}] },
  { id:'ANT-2026-077', date:'2026.03.18', customer:'Б. Наранцэцэг',phone:'98765432', total:4799000, status:'shipped',    courierId:'D001', address:ADDRESSES[4], items:[{id:1763,name:'iPhone 17 Air',qty:1,price:4799000,variant:'128GB / Sky Blue'}] },
  { id:'ANT-2026-076', date:'2026.03.17', customer:'Д. Батжаргал', phone:'88334455', total:10550000,status:'delivering', courierId:'D002', address:ADDRESSES[5], items:[{id:1742,name:"MacBook Pro M4 16''",qty:1,price:10550000,variant:'24GB/512GB'}] },
  { id:'ANT-2026-075', date:'2026.03.16', customer:'Т. Энхтуяа',   phone:'99223344', total:3500000, status:'delivered',  courierId:'D001', address:ADDRESSES[6], items:[{id:1780,name:'Dyson Purifier PH05',qty:1,price:3500000,variant:''}] },
  { id:'ANT-2026-074', date:'2026.03.15', customer:'С. Батбаяр',   phone:'95551234', total:650000,  status:'shipped',    courierId:'D002', address:ADDRESSES[0], items:[{id:1738,name:'AirPods Gen 4',qty:1,price:650000,variant:''}] },
  { id:'ANT-2026-073', date:'2026.03.14', customer:'Р. Одгэрэл',   phone:'99112200', total:3650000, status:'shipped',    courierId:'D001', address:ADDRESSES[1], items:[{id:1782,name:'Apple Watch Ultra 3',qty:1,price:3650000,variant:'49mm / Titanium'}] },
  { id:'ANT-2026-072', date:'2026.03.13', customer:'А. Ганбаатар', phone:'88445566', total:1850000, status:'delivered',  courierId:'D002', address:ADDRESSES[2], items:[{id:1701,name:'Sony WH-1000XM6',qty:1,price:1850000,variant:''}] },
  { id:'ANT-2026-071', date:'2026.03.12', customer:'Х. Зул',        phone:'99334411', total:4895000, status:'delivered',  courierId:'D001', address:ADDRESSES[3], items:[{id:1652,name:'DJI AIR 3 Fly More Combo',qty:1,price:4895000,variant:''}] },
  { id:'ANT-2026-069', date:'2026.03.10', customer:'Б. Гэрэлмаа',  phone:'99556677', total:3999000, status:'shipped',    courierId:'D002', address:ADDRESSES[4], items:[{id:1689,name:'Samsung Galaxy Flip 7',qty:1,price:3999000,variant:'256GB / Silver'}] },
  { id:'ANT-2026-068', date:'2026.03.09', customer:'Н. Тэмүүлэн',  phone:'88667788', total:2700000, status:'delivering', courierId:'D001', address:ADDRESSES[5], items:[{id:1764,name:'Dyson V12 Detect Slim',qty:1,price:2700000,variant:''}] },
  { id:'ANT-2026-067', date:'2026.03.08', customer:'Э. Мөнхзул',   phone:'99778899', total:999900,  status:'delivered',  courierId:'D002', address:ADDRESSES[6], items:[{id:1826,name:'TECNO SPARK 30',qty:1,price:799900,variant:''},{ id:1809,name:'POUT 100W USB-C',qty:1,price:25000,variant:''}] },
];

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(SESSION_KEY);
  if (saved) {
    try {
      const { id } = JSON.parse(saved);
      const courier = COURIERS[id];
      if (courier) { bootApp(courier); return; }
    } catch(e) { /* ignore */ }
  }
  /* Show login */
  document.getElementById('dvLogin').classList.remove('hidden');
});
