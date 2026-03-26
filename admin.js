/* ═══════════════════════════════════════
   ADMIN PANEL — admin.js  v1
   ═══════════════════════════════════════ */
'use strict';

/* ── Helpers ── */
const fmt  = n => Math.round(n).toLocaleString('mn-MN');
const imgUrl = id => `https://admins-odoo.antmall.mn/web/image/product.template/${id}/image_1920`;
const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3C/svg%3E`;

/* ── Auth ── */
const ADMIN_KEY = 'antmall_admin_session';
function isAdminLoggedIn() { return !!localStorage.getItem(ADMIN_KEY); }
function adminLogin(e) {
  e.preventDefault();
  const user = document.getElementById('alUser').value.trim();
  const pass = document.getElementById('alPass').value;
  const err  = document.getElementById('alError');
  if (user === 'admin' && pass === 'admin2025') {
    localStorage.setItem(ADMIN_KEY, '1');
    err.textContent = '';
    document.getElementById('adminLoginScreen').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    initAdmin();
  } else {
    err.textContent = 'Нэвтрэх нэр эсвэл нууц үг буруу байна.';
  }
}
function adminLogout() {
  if (!confirm('Та гарахдаа итгэлтэй байна уу?')) return;
  localStorage.removeItem(ADMIN_KEY);
  document.getElementById('adminPanel').classList.add('hidden');
  document.getElementById('adminLoginScreen').classList.remove('hidden');
  document.getElementById('alUser').value = '';
  document.getElementById('alPass').value = '';
}
window.adminLogin  = adminLogin;
window.adminLogout = adminLogout;

/* ══════════════════════════════════════
   PRODUCT DATA  (197 бүтээгдэхүүн)
══════════════════════════════════════ */
const PRODUCTS_BASE = [
  {id:1845,name:'DJI Neo 2 Motion Fly More Combo',brand:'dji',cat:'drones',price:2180000},
  {id:1844,name:'DJI NEO 2 FLY MORE COMBO',brand:'dji',cat:'drones',price:1480000},
  {id:1843,name:'Apple Macbook Neo',brand:'apple',cat:'computers',price:3299000},
  {id:1838,name:'CUCKOO - Кофе машин',brand:'cuckoo',cat:'appliances',price:1150000,origPrice:1250000},
  {id:1837,name:'CUCKOO - Ус шүүгч',brand:'cuckoo',cat:'appliances',price:87400,origPrice:95000},
  {id:1836,name:'CUCKOO - Шарах шүүгээ',brand:'cuckoo',cat:'appliances',price:496800,origPrice:540000},
  {id:1835,name:'CUCKOO AIR FRYER - Шилэн тосгүй шарагч',brand:'cuckoo',cat:'appliances',price:294400,origPrice:320000},
  {id:1832,name:'DYSON Airwrap HS09 Co-Anda 2x Red Velvet/Gold',brand:'dyson',cat:'appliances',price:2850000},
  {id:1831,name:'DYSON HushJet Compact Purifier',brand:'dyson',cat:'appliances',price:1979000,origPrice:2199000},
  {id:1829,name:'DJI OSMO ACTION 6 Adventure Combo',brand:'dji',cat:'cameras',price:2150000},
  {id:1828,name:'TECNO TWS Buds 4',brand:'tecno',cat:'wearables',price:99900},
  {id:1826,name:'TECNO SPARK 30',brand:'tecno',cat:'phones',price:799900},
  {id:1825,name:'TECNO POVA 7 PRO 5G',brand:'tecno',cat:'phones',price:1469900},
  {id:1824,name:'TECNO CAMON 40 PRO 5G',brand:'tecno',cat:'phones',price:1549900},
  {id:1823,name:"IPAD PRO M5 13'' WIFI/CELL",brand:'apple',cat:'computers',price:5899000},
  {id:1822,name:"IPAD PRO M5 11'' WIFI/CELL",brand:'apple',cat:'computers',price:4499000},
  {id:1817,name:'DEERMA Humidifier F628W',brand:'deerma',cat:'appliances',price:81880,origPrice:89000},
  {id:1809,name:'POUT 100W USB-C',brand:'pout',cat:'accessories',price:25000},
  {id:1808,name:'POUT HANDS 7 - Утасгүй цэнэглэгч (Samsung)',brand:'pout',cat:'accessories',price:105800,origPrice:115000},
  {id:1807,name:'POUT TekDec Mat Cinnamon Brown',brand:'pout',cat:'accessories',price:69000},
  {id:1806,name:'DYSON V16 Piston Animal Submarine',brand:'dyson',cat:'appliances',price:4550000,origPrice:4750000},
  {id:1805,name:'DEERMA ROBOT Vacuum X-80 Ultra',brand:'deerma',cat:'appliances',price:1839080,origPrice:1999000},
  {id:1804,name:'DEERMA Robot Vacuum DEM-X90 Ultra',brand:'deerma',cat:'appliances',price:2391080,origPrice:2599000},
  {id:1803,name:'DEERMA Cordless Vacuum Cleaner Z50 Combo',brand:'deerma',cat:'appliances',price:735080,origPrice:799000},
  {id:1802,name:'DEERMA Handheld Steam Machine ZQ01',brand:'deerma',cat:'appliances',price:210680,origPrice:229000},
  {id:1801,name:'DEERMA Cordless Wet & Dry Vacuum VX300 Mix',brand:'deerma',cat:'appliances',price:1011080,origPrice:1099000},
  {id:1800,name:'DEERMA Cordless Vacuum Cleaner T30W XT',brand:'deerma',cat:'appliances',price:551080,origPrice:599000},
  {id:1799,name:'DEERMA Vacuum Cleaner DX700 Pro',brand:'deerma',cat:'appliances',price:192280,origPrice:209000},
  {id:1798,name:'DEERMA Air Fryer DEM-KZ150W',brand:'deerma',cat:'appliances',price:302680,origPrice:329000},
  {id:1797,name:'DEERMA Fabric & Upholstery Cleaner BY700 S',brand:'deerma',cat:'appliances',price:643080,origPrice:699000},
  {id:1796,name:'DEERMA Dust Mite Vacuum Cleaner DEM-CM980W',brand:'deerma',cat:'appliances',price:183080,origPrice:199000},
  {id:1795,name:'DEERMA Shoes Dryer DEM-HX10W',brand:'deerma',cat:'appliances',price:137080,origPrice:149000},
  {id:1794,name:'DEERMA Mini Dehumidifier DEM-CS50MW',brand:'deerma',cat:'appliances',price:63480,origPrice:69000},
  {id:1793,name:'DEERMA Humidifier DEM-F628S',brand:'deerma',cat:'appliances',price:127880,origPrice:139000},
  {id:1792,name:'POUT TekDec Mat Danish Black',brand:'pout',cat:'accessories',price:69000},
  {id:1791,name:'POUT Ears 2',brand:'pout',cat:'accessories',price:90000},
  {id:1790,name:'POUT Magpower Ring',brand:'pout',cat:'accessories',price:21000},
  {id:1789,name:'POUT Bandloof Sport',brand:'pout',cat:'accessories',price:35000},
  {id:1788,name:'POUT 17 Promax Case',brand:'pout',cat:'accessories',price:105800,origPrice:115000},
  {id:1787,name:'POUT 17 Pro Case',brand:'pout',cat:'accessories',price:96600,origPrice:105000},
  {id:1786,name:'Apple Watch SE3',brand:'apple',cat:'wearables',price:1250000,origPrice:1350000},
  {id:1785,name:'iPad A16',brand:'apple',cat:'computers',price:1650000},
  {id:1784,name:'DJI Osmo Mobile 8',brand:'dji',cat:'drones',price:580000},
  {id:1782,name:'Apple Watch Ultra 3',brand:'apple',cat:'wearables',price:3650000,origPrice:3950000},
  {id:1781,name:'Dyson PencilVac',brand:'dyson',cat:'appliances',price:2950000},
  {id:1780,name:'Dyson Purifier PH05',brand:'dyson',cat:'appliances',price:3500000,origPrice:3700000},
  {id:1779,name:'Cuckoo Будаа агшаагч',brand:'cuckoo',cat:'appliances',price:570400,origPrice:620000},
  {id:1778,name:'AirPods Pro (3rd generation)',brand:'apple',cat:'wearables',price:1350000},
  {id:1777,name:'Apple Watch Series 11',brand:'apple',cat:'wearables',price:1950000,origPrice:2050000},
  {id:1764,name:'Dyson V12 Detect Slim',brand:'dyson',cat:'appliances',price:2700000},
  {id:1763,name:'iPhone 17 Air',brand:'apple',cat:'phones',price:4799000,origPrice:4999000},
  {id:1762,name:'iPhone 17',brand:'apple',cat:'phones',price:4199000,origPrice:4399000},
  {id:1761,name:'DJI OSMO NANO',brand:'dji',cat:'cameras',price:1550000},
  {id:1760,name:'DJI MINI 5 PRO Fly More Combo Plus (RC2)',brand:'dji',cat:'drones',price:4480000},
  {id:1759,name:'DJI MINI 5 PRO Fly More Combo (RC-N3)',brand:'dji',cat:'drones',price:3880000},
  {id:1758,name:'iPhone 17 Pro',brand:'apple',cat:'phones',price:6899000,origPrice:7199000},
  {id:1757,name:'iPhone 17 Pro Max',brand:'apple',cat:'phones',price:8599000,origPrice:9399000},
  {id:1755,name:'POUT HANDS 7 - Утасгүй цэнэглэгч (iPhone)',brand:'pout',cat:'accessories',price:115000},
  {id:1754,name:'DJI MAVIC 4 PRO Fly More Combo',brand:'dji',cat:'drones',price:10880000},
  {id:1753,name:'Ray-Ban & Meta Eyeglasses Camera',brand:'apple',cat:'accessories',price:1650000},
  {id:1752,name:'DJI Mic 3',brand:'dji',cat:'drones',price:1450000},
  {id:1751,name:'POUT Adapter 33W',brand:'pout',cat:'accessories',price:30000},
  {id:1750,name:'PlayStation 5 Controller',brand:'sony',cat:'accessories',price:300000},
  {id:1749,name:'Cuckoo Dishwasher',brand:'cuckoo',cat:'appliances',price:749900},
  {id:1748,name:'Cuckoo Будаа агшаагч 0675F',brand:'cuckoo',cat:'appliances',price:276000,origPrice:300000},
  {id:1747,name:"IPAD PRO M4 13'' CELL",brand:'apple',cat:'computers',price:5850000},
  {id:1743,name:"iPad Pro M4 11'' CELL",brand:'apple',cat:'computers',price:4950000},
  {id:1742,name:"MacBook Pro M4 16''",brand:'apple',cat:'computers',price:10550000},
  {id:1741,name:"iPad Air M3 13'' 128GB",brand:'apple',cat:'computers',price:4050000},
  {id:1740,name:"iPad Air M3 11'' 128GB WiFi/Cell",brand:'apple',cat:'computers',price:2850000},
  {id:1738,name:'AirPods Gen 4',brand:'apple',cat:'wearables',price:650000},
  {id:1737,name:'Cuckoo Power One Ultra Slim Brush',brand:'cuckoo',cat:'appliances',price:699900},
  {id:1736,name:'DJI OSMO 360 Adventure Combo',brand:'dji',cat:'cameras',price:2450000},
  {id:1735,name:'DJI NEO Single Battery',brand:'dji',cat:'drones',price:850000},
  {id:1732,name:'Dyson Airwrap Co-Anda 2X',brand:'dyson',cat:'beauty',price:2850000},
  {id:1728,name:'CUCKOO Будаа агшаагч 0685GW',brand:'cuckoo',cat:'appliances',price:294400,origPrice:320000},
  {id:1727,name:'DJI FLIP Fly More Combo (DJI RC2)',brand:'dji',cat:'drones',price:3080000},
  {id:1726,name:'BODYLABS Массажны буу',brand:'bodylabs',cat:'beauty',price:193200,origPrice:210000},
  {id:1725,name:'Cuckoo Тосгүй шарагч CAF-HNL0510TW',brand:'cuckoo',cat:'appliances',price:349600,origPrice:380000},
  {id:1722,name:'DJI Osmo Mobile 7P',brand:'dji',cat:'drones',price:580000},
  {id:1721,name:'Galaxy S25',brand:'samsung',cat:'phones',price:3850000},
  {id:1720,name:'Galaxy S25 Ultra 256GB',brand:'samsung',cat:'phones',price:3999000,origPrice:5299000},
  {id:1719,name:'DJI OSMO POCKET 3 Standard',brand:'dji',cat:'cameras',price:2050000},
  {id:1718,name:'PlayStation 5 Slim Console (Disc Edition)',brand:'sony',cat:'accessories',price:2550000},
  {id:1717,name:'DJI MIC MINI (1TX+1RX)',brand:'dji',cat:'drones',price:350000},
  {id:1715,name:'POUT HANDS 7 PRO - Утасгүй цэнэглэгч',brand:'pout',cat:'accessories',price:155000},
  {id:1714,name:'AirPods Max (USB-C)',brand:'apple',cat:'wearables',price:2450000},
  {id:1713,name:'DJI Osmo Mobile 7',brand:'dji',cat:'drones',price:380000},
  {id:1710,name:'DJI AIR 3S Fly More Combo',brand:'dji',cat:'drones',price:5980000},
  {id:1709,name:'DJI OSMO ACTION 5 PRO Adventure Combo',brand:'dji',cat:'cameras',price:1900000},
  {id:1707,name:'Apple Watch Series 10',brand:'apple',cat:'wearables',price:1750000},
  {id:1706,name:'AirPods Max',brand:'apple',cat:'wearables',price:2200000},
  {id:1705,name:'DJI OSMO ACTION 5 PRO Standard Combo',brand:'dji',cat:'cameras',price:1600000},
  {id:1704,name:'Dell Latitude 3540 13th gen i5',brand:'dell',cat:'computers',price:2700000},
  {id:1703,name:'Dell Latitude 3440 12th gen i5',brand:'dell',cat:'computers',price:2750000},
  {id:1702,name:'Sony WF-1000XM5',brand:'sony',cat:'wearables',price:1000000},
  {id:1701,name:'Sony WH-1000XM6',brand:'sony',cat:'wearables',price:1850000},
  {id:1700,name:'iPhone 16 Plus',brand:'apple',cat:'phones',price:4299000},
  {id:1699,name:'iPhone 16',brand:'apple',cat:'phones',price:3899000},
  {id:1698,name:'iPhone 16 Pro',brand:'apple',cat:'phones',price:5199000},
  {id:1697,name:'iPhone 16 Pro Max',brand:'apple',cat:'phones',price:6699000},
  {id:1696,name:'DJI NEO Fly More Combo',brand:'dji',cat:'drones',price:1380000},
  {id:1695,name:"iPad Pro 11'' M4 WiFi",brand:'apple',cat:'computers',price:4450000},
  {id:1693,name:'iPad Air (6th generation)',brand:'apple',cat:'computers',price:2950000},
  {id:1692,name:'Dyson Gen5detect Complete Vacuum',brand:'dyson',cat:'appliances',price:3400000},
  {id:1691,name:'Dyson WashG1 Wet Floor Cleaner',brand:'dyson',cat:'appliances',price:2500000,origPrice:2900000},
  {id:1690,name:'Samsung Galaxy Fold 7',brand:'samsung',cat:'phones',price:6299000,origPrice:6599000},
  {id:1689,name:'Samsung Galaxy Flip 7',brand:'samsung',cat:'phones',price:3999000,origPrice:4199000},
  {id:1688,name:'Dyson - Үс шулуутгагч',brand:'dyson',cat:'beauty',price:1755000,origPrice:1900000},
  {id:1686,name:'AIMA HAPPY B Small',brand:'aima',cat:'ebike',price:1650000},
  {id:1685,name:'AIMA HAPPY Big',brand:'aima',cat:'ebike',price:1870000},
  {id:1684,name:'AIMA CM',brand:'aima',cat:'ebike',price:2180000},
  {id:1683,name:'AIMA IDO',brand:'aima',cat:'ebike',price:1980000},
  {id:1682,name:'AIMA LUNA',brand:'aima',cat:'ebike',price:2475000},
  {id:1681,name:'AIMA AIMAONE',brand:'aima',cat:'ebike',price:3300000},
  {id:1680,name:'AIMA LEXI',brand:'aima',cat:'ebike',price:3520000},
  {id:1679,name:'LUYUAN FBY',brand:'luyuan',cat:'ebike',price:1595000},
  {id:1678,name:'LUYUAN FQQ',brand:'luyuan',cat:'ebike',price:3300000},
  {id:1677,name:'LUYUAN S70 with Tailbox',brand:'luyuan',cat:'ebike',price:3850000},
  {id:1676,name:'LUYUAN S70',brand:'luyuan',cat:'ebike',price:3740000},
  {id:1675,name:'LUYUAN S90 with Tailbox',brand:'luyuan',cat:'ebike',price:4650000},
  {id:1674,name:'LUYUAN S90',brand:'luyuan',cat:'ebike',price:4400000},
  {id:1671,name:'Cuckoo Утасгүй үсний индүү',brand:'cuckoo',cat:'beauty',price:874000,origPrice:950000},
  {id:1670,name:'Dyson Агаар цэвэршүүлэгч (том)',brand:'dyson',cat:'appliances',price:3450000,origPrice:3700000},
  {id:1667,name:'Dyson Airwrap i.d. Straight+Wavy',brand:'dyson',cat:'beauty',price:2350000},
  {id:1666,name:'Dyson Airwrap Complete Long',brand:'dyson',cat:'beauty',price:2350000},
  {id:1663,name:'DJI AVATA 2 Fly More Combo (Single Battery)',brand:'dji',cat:'drones',price:3550000},
  {id:1661,name:'POUT EYES 19 Single Monitor Arm',brand:'pout',cat:'accessories',price:350000},
  {id:1660,name:'POUT Streaming Device Wall Bracket',brand:'pout',cat:'accessories',price:32200,origPrice:35000},
  {id:1659,name:'POUT Streaming Device TV Bracket',brand:'pout',cat:'accessories',price:35420,origPrice:38500},
  {id:1658,name:'POUT EYES 18 Corner TV Floor Stand',brand:'pout',cat:'accessories',price:450800,origPrice:490000},
  {id:1657,name:'POUT Screen Top Shelf for Monitor/TV',brand:'pout',cat:'accessories',price:25000},
  {id:1656,name:'POUT EYES 13 Single Monitor Arm',brand:'pout',cat:'accessories',price:210000},
  {id:1655,name:'DJI AVATA 2 Fly More Combo (3 Batteries)',brand:'dji',cat:'drones',price:4150000},
  {id:1654,name:'Dyson V15s Detect Submarine Complete',brand:'dyson',cat:'appliances',price:3900000,origPrice:4100000},
  {id:1653,name:'Dyson V12s Detect Slim Submarine (Gold/Gold)',brand:'dyson',cat:'appliances',price:3300000},
  {id:1652,name:'DJI AIR 3 Fly More Combo (DJI RC-N2)',brand:'dji',cat:'drones',price:4895000},
  {id:1649,name:'DJI OSMO MOBILE 6',brand:'dji',cat:'drones',price:500000},
  {id:1645,name:'POUT EYES 5 Wooden Monitor Stand',brand:'pout',cat:'accessories',price:101200,origPrice:110000},
  {id:1644,name:'DJI MIC MINI (2TX+1RX+Charging Case)',brand:'dji',cat:'drones',price:650000},
  {id:1641,name:'Samsung Galaxy A56 256GB',brand:'samsung',cat:'phones',price:1659000,origPrice:1899000},
  {id:1637,name:'POUT EYES 13 Dual Monitor Arm',brand:'pout',cat:'accessories',price:368000,origPrice:400000},
  {id:1632,name:'BodyLabs KomFort Massager Footrest',brand:'bodylabs',cat:'beauty',price:87400,origPrice:95000},
  {id:1631,name:'BodyLabs KomFort Footrest',brand:'bodylabs',cat:'beauty',price:90000},
  {id:1630,name:'POUT HANDS 3 Pro Wireless Charging Pad',brand:'pout',cat:'accessories',price:145000},
  {id:1629,name:'POUT HANDS 3 Wireless Charging Mouse Pad',brand:'pout',cat:'accessories',price:65000},
  {id:1628,name:'POUT HANDS 4 Wireless Charging Mouse',brand:'pout',cat:'accessories',price:65000},
  {id:1627,name:'Cuckoo Тосгүй шарагч CAF-F0510TB',brand:'cuckoo',cat:'appliances',price:320000},
  {id:1626,name:'DJI Mic 2 (2TX+1RX+Charging Case)',brand:'dji',cat:'drones',price:1380000},
  {id:1623,name:"MacBook Pro M4 13'' 16/256GB",brand:'apple',cat:'computers',price:4750000},
  {id:1618,name:'BodyLabs WaterFlow Portable Oral Irrigator',brand:'bodylabs',cat:'beauty',price:125000},
  {id:1615,name:'POUT EYES 19 Dual Monitor Arm',brand:'pout',cat:'accessories',price:600000},
  {id:1614,name:'POUT EYES 8 Monitor Stand Hub with Wireless Charging',brand:'pout',cat:'accessories',price:193200,origPrice:210000},
  {id:1613,name:'PlayStation 5 DualSense Wireless Controller',brand:'sony',cat:'accessories',price:300000},
  {id:1611,name:'POUT HANDS 8 Laptop Sleeve Case with Mouse Mat',brand:'pout',cat:'accessories',price:119600,origPrice:130000},
  {id:1610,name:'POUT EYES 9 Dual Monitor Wireless Charging Station',brand:'pout',cat:'accessories',price:265000},
  {id:1609,name:'Ширээний кабель цэгцлэгч',brand:'pout',cat:'accessories',price:46000,origPrice:50000},
  {id:1606,name:'AirPods Pro (2nd generation)',brand:'apple',cat:'wearables',price:950000},
  {id:1605,name:'Cuckoo Ус буцалгагч CK-C170TB',brand:'cuckoo',cat:'appliances',price:142600,origPrice:155000},
  {id:1604,name:'DJI OSMO POCKET 3 Creator Combo',brand:'dji',cat:'cameras',price:2850000},
  {id:1603,name:'DJI MINI 4 PRO Fly More Combo',brand:'dji',cat:'drones',price:4250000},
  {id:1601,name:'DJI MAVIC 3 PRO Fly More Combo (RC PRO)',brand:'dji',cat:'drones',price:13550000},
  {id:1600,name:'DJI MAVIC 3 PRO Fly More Combo (RC)',brand:'dji',cat:'drones',price:10750000},
  {id:1595,name:'Cuckoo Талх шарагч CT-C10W',brand:'cuckoo',cat:'appliances',price:133400,origPrice:145000},
  {id:1594,name:'Cuckoo Ус буцалгагч CK-C170TW',brand:'cuckoo',cat:'appliances',price:142600,origPrice:155000},
  {id:1593,name:'Apple Magic Mouse',brand:'apple',cat:'accessories',price:450000},
  {id:1592,name:'Dell Inspiron 15 3530 i5',brand:'dell',cat:'computers',price:3250000},
  {id:1591,name:'Dell Inspiron 15 3520 i7',brand:'dell',cat:'computers',price:3450000},
  {id:1590,name:'Apple Pencil Pro',brand:'apple',cat:'accessories',price:650000},
  {id:1588,name:"MacBook Air M4 13''",brand:'apple',cat:'computers',price:4199000,origPrice:4750000},
  {id:1587,name:"MacBook Air M4 15''",brand:'apple',cat:'computers',price:5199000},
  {id:1581,name:'DJI MINI 4K Fly More Combo',brand:'dji',cat:'drones',price:1850000},
  {id:1576,name:'DJI MINI 4 PRO Fly More Combo Plus (RC2)',brand:'dji',cat:'drones',price:6280000},
  {id:1575,name:'DJI MINI 4 PRO Fly More Combo (RC2)',brand:'dji',cat:'drones',price:5280000},
  {id:1574,name:'POUT HANDS 3 Pro Combo (Pad + Mouse)',brand:'pout',cat:'accessories',price:145000},
  {id:1573,name:'Cuckoo Агаар цэвэршүүлэгч',brand:'cuckoo',cat:'appliances',price:1150000,origPrice:1250000},
  {id:1572,name:'Dell Latitude 3520 CTO i7',brand:'dell',cat:'computers',price:3350000},
  {id:1571,name:'Dell Gaming G15 i7',brand:'dell',cat:'computers',price:5950000},
  {id:1570,name:'Dell Inspiron 16 5620 i7',brand:'dell',cat:'computers',price:3850000},
  {id:1569,name:'Dell Inspiron 15 3530 i7',brand:'dell',cat:'computers',price:3550000},
  {id:1568,name:"POUT EYES 11 iPad Pro Stand (12.9'')",brand:'pout',cat:'accessories',price:179400,origPrice:195000},
  {id:1567,name:"POUT EYES 11 iPad Pro Stand (11'')",brand:'pout',cat:'accessories',price:179400,origPrice:195000},
  {id:1566,name:'POUT EYES 4 Laptop Stand with 360 Rotating Base',brand:'pout',cat:'accessories',price:124200,origPrice:135000},
  {id:1565,name:'POUT EYES 10 Compact Laptop Stand',brand:'pout',cat:'accessories',price:45000},
  {id:1564,name:"POUT EYES 3 Lift 2''-20''",brand:'pout',cat:'accessories',price:101200,origPrice:110000},
  {id:1563,name:'POUT EYES 3 Angle Ergonomic Laptop Stand',brand:'pout',cat:'accessories',price:87400,origPrice:95000},
  {id:1553,name:"Apple Magic Keyboard 11''",brand:'apple',cat:'computers',price:1450000},
  {id:1551,name:'Apple Magic Keyboard',brand:'apple',cat:'computers',price:1450000},
  {id:1549,name:'Apple Pencil (2nd Generation)',brand:'apple',cat:'accessories',price:550000},
  {id:1548,name:"MacBook Pro M4 14'' 16/512GB",brand:'apple',cat:'computers',price:6999000},
  {id:1547,name:'Acer Aspire 5 A515-58M',brand:'unknown',cat:'computers',price:2950000},
  {id:1546,name:'Dell Inspiron 15 3511',brand:'dell',cat:'computers',price:2150000},
  {id:1542,name:'POUT Game Station 1 RGB Gaming Desk',brand:'pout',cat:'accessories',price:550000},
  {id:1539,name:'Cuckoo Талх шарагч CT-C10B',brand:'cuckoo',cat:'appliances',price:133400,origPrice:145000},
  {id:1536,name:'Belkin BOOST CHARGE PRO 2-in-1 Wireless Charger (MagSafe)',brand:'unknown',cat:'accessories',price:1140000},
  {id:1535,name:'Mophie 3-in-1 Stand for MagSafe',brand:'unknown',cat:'accessories',price:495000,origPrice:990000},
];

const CAT_LABELS = {
  phones:'Гар утас', wearables:'Ухаалаг цаг / Чихэвч', computers:'Компьютер',
  appliances:'Гэр ахуй', accessories:'Дагалдах хэрэгсэл', drones:'Дрон',
  cameras:'Камер', ebike:'Цахилгаан дугуй', beauty:'Гоо сайхан'
};
const CAT_COLORS = {
  phones:'#f97316', wearables:'#8b5cf6', computers:'#3b82f6',
  appliances:'#10b981', accessories:'#f59e0b', drones:'#ef4444',
  cameras:'#06b6d4', ebike:'#84cc16', beauty:'#ec4899'
};

/* ── Merge with any admin overrides stored in localStorage ── */
function getProducts() {
  const overrides = JSON.parse(localStorage.getItem('antmall_admin_prods') || '{}');
  return PRODUCTS_BASE.map(p => ({ ...p, ...(overrides[p.id] || {}) }));
}
function saveProdOverride(id, patch) {
  const ov = JSON.parse(localStorage.getItem('antmall_admin_prods') || '{}');
  ov[id] = { ...(ov[id] || {}), ...patch };
  localStorage.setItem('antmall_admin_prods', JSON.stringify(ov));
}
function deleteProdOverride(id) {
  const ov = JSON.parse(localStorage.getItem('antmall_admin_prods') || '{}');
  delete ov[id];
  localStorage.setItem('antmall_admin_prods', JSON.stringify(ov));
  /* Mark as deleted so it hides in the list */
  const del = JSON.parse(localStorage.getItem('antmall_deleted_prods') || '[]');
  if (!del.includes(id)) del.push(id);
  localStorage.setItem('antmall_deleted_prods', JSON.stringify(del));
}
function getDeletedIds() {
  return JSON.parse(localStorage.getItem('antmall_deleted_prods') || '[]');
}

/* ══════════════════════════════════════
   ORDERS DATA
══════════════════════════════════════ */
const ADMIN_ORDERS_SEED = [
  { id:'ANT-2026-087', date:'2026.03.25', customer:'Б. Мөнхбаяр', phone:'99112233', total:8599000, status:'processing', items:[{id:1757,name:'iPhone 17 Pro Max',qty:1,price:8599000,variant:'256GB / Natural Titanium'}] },
  { id:'ANT-2026-086', date:'2026.03.24', customer:'Э. Дэлгэрмаа', phone:'88991122', total:5980000, status:'shipped', items:[{id:1710,name:'DJI AIR 3S Fly More Combo',qty:1,price:5980000,variant:''}] },
  { id:'ANT-2026-085', date:'2026.03.24', customer:'Г. Болд', phone:'95001234', total:3850000, status:'delivered', items:[{id:1721,name:'Galaxy S25',qty:1,price:3850000,variant:'128GB / Icy Blue'}] },
  { id:'ANT-2026-084', date:'2026.03.23', customer:'Н. Цэцэгмаа', phone:'99887766', total:4199000, status:'delivered', items:[{id:1588,name:"MacBook Air M4 13''",qty:1,price:4199000,variant:'16GB/256GB'}] },
  { id:'ANT-2026-083', date:'2026.03.23', customer:'Д. Бат-Эрдэнэ', phone:'96000011', total:1350000, status:'delivered', items:[{id:1778,name:'AirPods Pro (3rd generation)',qty:1,price:1350000,variant:''}] },
  { id:'ANT-2026-082', date:'2026.03.22', customer:'О. Алтанцэцэг', phone:'99444555', total:2180000, status:'shipped', items:[{id:1845,name:'DJI Neo 2 Motion Fly More Combo',qty:1,price:2180000,variant:''}] },
  { id:'ANT-2026-081', date:'2026.03.22', customer:'М. Эрдэнэсүх', phone:'88223344', total:6899000, status:'processing', items:[{id:1758,name:'iPhone 17 Pro',qty:1,price:6899000,variant:'256GB / Black Titanium'}] },
  { id:'ANT-2026-080', date:'2026.03.21', customer:'Ж. Сүхбаатар', phone:'99550066', total:3400000, status:'delivered', items:[{id:1692,name:'Dyson Gen5detect Complete Vacuum',qty:1,price:3400000,variant:''}] },
  { id:'ANT-2026-079', date:'2026.03.20', customer:'Х. Отгонбаяр', phone:'91234567', total:1950000, status:'delivered', items:[{id:1777,name:'Apple Watch Series 11',qty:1,price:1950000,variant:'45mm / Midnight'}] },
  { id:'ANT-2026-078', date:'2026.03.19', customer:'Ч. Номун', phone:'99001122', total:2391080, status:'cancelled', items:[{id:1804,name:'DEERMA Robot Vacuum DEM-X90 Ultra',qty:1,price:2391080,variant:''}] },
  { id:'ANT-2026-077', date:'2026.03.18', customer:'Б. Наранцэцэг', phone:'98765432', total:4799000, status:'shipped', items:[{id:1763,name:'iPhone 17 Air',qty:1,price:4799000,variant:'128GB / Sky Blue'}] },
  { id:'ANT-2026-076', date:'2026.03.17', customer:'Д. Батжаргал', phone:'88334455', total:10550000, status:'delivered', items:[{id:1742,name:"MacBook Pro M4 16''",qty:1,price:10550000,variant:'24GB/512GB'}] },
  { id:'ANT-2026-075', date:'2026.03.16', customer:'Т. Энхтуяа', phone:'99223344', total:3500000, status:'delivered', items:[{id:1780,name:'Dyson Purifier PH05',qty:1,price:3500000,variant:''}] },
  { id:'ANT-2026-074', date:'2026.03.15', customer:'С. Батбаяр', phone:'95551234', total:650000, status:'delivered', items:[{id:1738,name:'AirPods Gen 4',qty:1,price:650000,variant:''}] },
  { id:'ANT-2026-073', date:'2026.03.14', customer:'Р. Одгэрэл', phone:'99112200', total:3650000, status:'shipped', items:[{id:1782,name:'Apple Watch Ultra 3',qty:1,price:3650000,variant:'49mm / Titanium'}] },
  { id:'ANT-2026-072', date:'2026.03.13', customer:'А. Ганбаатар', phone:'88445566', total:1850000, status:'delivered', items:[{id:1701,name:'Sony WH-1000XM6',qty:1,price:1850000,variant:''}] },
  { id:'ANT-2026-071', date:'2026.03.12', customer:'Х. Зул', phone:'99334411', total:4895000, status:'delivered', items:[{id:1652,name:'DJI AIR 3 Fly More Combo (DJI RC-N2)',qty:1,price:4895000,variant:''}] },
  { id:'ANT-2026-070', date:'2026.03.11', customer:'Э. Мөнхзул', phone:'99778899', total:999900, status:'processing', items:[{id:1806,name:'DYSON V16 Piston Animal Submarine',qty:1,price:4550000,variant:''},{ id:1808,name:'POUT HANDS 7',qty:1,price:105800,variant:''}] },
  { id:'ANT-2026-069', date:'2026.03.10', customer:'Б. Гэрэлмаа', phone:'99556677', total:3999000, status:'delivered', items:[{id:1689,name:'Samsung Galaxy Flip 7',qty:1,price:3999000,variant:'256GB / Silver'}] },
  { id:'ANT-2026-068', date:'2026.03.09', customer:'Н. Тэмүүлэн', phone:'88667788', total:2700000, status:'delivered', items:[{id:1764,name:'Dyson V12 Detect Slim',qty:1,price:2700000,variant:''}] },
];

function getAdminOrders() {
  const saved = localStorage.getItem('antmall_admin_orders');
  if (saved) return JSON.parse(saved);
  localStorage.setItem('antmall_admin_orders', JSON.stringify(ADMIN_ORDERS_SEED));
  return ADMIN_ORDERS_SEED;
}
function saveAdminOrders(orders) {
  localStorage.setItem('antmall_admin_orders', JSON.stringify(orders));
}

/* ══════════════════════════════════════
   USERS DATA
══════════════════════════════════════ */
const DEMO_USERS = [
  { first:'Мөнхбаяр', last:'Батсүрэн',  phone:'99112233', email:'monhbayar@gmail.com',  joined:'2025.01.10', orders:5,  spend:28500000, status:'active' },
  { first:'Дэлгэрмаа',last:'Цэдэн',      phone:'88991122', email:'delger@gmail.com',      joined:'2025.02.03', orders:3,  spend:12400000, status:'active' },
  { first:'Болд',      last:'Гантулга',   phone:'95001234', email:'bold.g@yahoo.com',      joined:'2025.02.20', orders:7,  spend:35000000, status:'active' },
  { first:'Цэцэгмаа', last:'Нямдорж',    phone:'99887766', email:'tsetseg@gmail.com',     joined:'2025.03.01', orders:2,  spend:8199000,  status:'active' },
  { first:'Бат-Эрдэнэ',last:'Дорж',      phone:'96000011', email:'bat.erdene@gmail.com',  joined:'2025.03.05', orders:4,  spend:15600000, status:'active' },
  { first:'Алтанцэцэг',last:'Очир',      phone:'99444555', email:'altantsetseg@mail.mn',  joined:'2025.03.10', orders:1,  spend:2180000,  status:'active' },
  { first:'Эрдэнэсүх', last:'Мягмар',    phone:'88223344', email:'erdene.m@gmail.com',    joined:'2025.03.12', orders:2,  spend:9049000,  status:'active' },
  { first:'Сүхбаатар', last:'Жамбал',    phone:'99550066', email:'sukhbaatar@gmail.com',  joined:'2025.03.15', orders:3,  spend:7850000,  status:'active' },
  { first:'Отгонбаяр', last:'Ханд',       phone:'91234567', email:'otgon@gmail.com',       joined:'2025.03.18', orders:6,  spend:19500000, status:'active' },
  { first:'Номун',     last:'Чимэд',      phone:'99001122', email:'nomun@gmail.com',       joined:'2026.01.05', orders:1,  spend:2391080,  status:'inactive' },
];

function getUsers() {
  /* Merge demo users + any registered real users from Auth */
  const users = [...DEMO_USERS];
  try {
    const session = JSON.parse(localStorage.getItem('antmall_session') || 'null');
    if (session && session.loggedIn && session.phone) {
      const exists = users.some(u => u.phone === session.phone);
      if (!exists) {
        const orders = JSON.parse(localStorage.getItem('antmall_orders') || '[]');
        const spend  = orders.reduce((s, o) => s + (o.total || 0), 0);
        users.unshift({
          first:   session.first || 'Хэрэглэгч',
          last:    session.last  || '',
          phone:   session.phone || '',
          email:   session.email || '',
          joined:  session.joined || '—',
          orders:  orders.length,
          spend,
          status: 'active',
          avatar: session.avatar || null
        });
      }
    }
  } catch (e) { /* ignore */ }
  return users;
}

/* ══════════════════════════════════════
   NAVIGATION
══════════════════════════════════════ */
const SECTION_TITLES = {
  dashboard: 'Хянах самбар',
  products:  'Бүтээгдэхүүн',
  orders:    'Захиалга',
  users:     'Хэрэглэгчид',
  settings:  'Тохиргоо'
};

function showSection(name, el) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.as-nav__item').forEach(b => b.classList.remove('active'));
  document.getElementById('sec-' + name)?.classList.add('active');
  if (el) el.classList.add('active');
  document.getElementById('adminPageTitle').textContent = SECTION_TITLES[name] || name;
  if (window.innerWidth < 800) document.getElementById('adminSidebar').classList.remove('open');

  if (name === 'products') renderProducts();
  if (name === 'orders')   renderOrders();
  if (name === 'users')    renderUsers();
}
window.showSection = showSection;

function toggleAdminSidebar() {
  document.getElementById('adminSidebar').classList.toggle('open');
}
window.toggleAdminSidebar = toggleAdminSidebar;

/* ══════════════════════════════════════
   DASHBOARD
══════════════════════════════════════ */
function renderDashboard() {
  const prods  = getProducts().filter(p => !getDeletedIds().includes(p.id));
  const orders = getAdminOrders();
  const users  = getUsers();

  /* Stats */
  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  document.getElementById('statRevenue').textContent  = fmt(revenue) + '₮';
  document.getElementById('statOrders').textContent   = orders.length;
  document.getElementById('statProducts').textContent = prods.length;
  document.getElementById('statUsers').textContent    = users.length;

  /* Sidebar badges */
  document.getElementById('navProdCount').textContent  = prods.length;
  document.getElementById('navOrderCount').textContent = orders.length;
  document.getElementById('navUserCount').textContent  = users.length;

  /* Recent orders */
  const BADGE = { processing:'badge--processing', shipped:'badge--shipped', delivered:'badge--delivered', cancelled:'badge--cancelled' };
  const LABEL = { processing:'Боловсруулж байна', shipped:'Хүргэлтэд', delivered:'Хүргэгдсэн', cancelled:'Цуцлагдсан' };
  const tbody = document.getElementById('dashOrdersBody');
  tbody.innerHTML = orders.slice(0, 8).map(o => `
    <tr>
      <td><strong style="font-size:.82rem">${o.id}</strong></td>
      <td style="font-size:.82rem">${o.customer}</td>
      <td style="font-weight:700;font-size:.85rem">${fmt(o.total)}₮</td>
      <td><span class="badge ${BADGE[o.status]||''}">${LABEL[o.status]||o.status}</span></td>
    </tr>`).join('');

  /* Category breakdown */
  const catCount = {};
  prods.forEach(p => { catCount[p.cat] = (catCount[p.cat] || 0) + 1; });
  const sorted = Object.entries(catCount).sort((a, b) => b[1] - a[1]);
  const maxCnt = sorted[0]?.[1] || 1;
  document.getElementById('dashCatList').innerHTML = sorted.map(([cat, cnt]) => `
    <div class="cat-row">
      <div class="cat-row__dot" style="background:${CAT_COLORS[cat]||'#94a3b8'}"></div>
      <span class="cat-row__name">${CAT_LABELS[cat] || cat}</span>
      <div class="cat-row__bar-wrap">
        <div class="cat-row__bar" style="width:${Math.round(cnt/maxCnt*100)}%;background:${CAT_COLORS[cat]||'#94a3b8'}"></div>
      </div>
      <span class="cat-row__count">${cnt}</span>
    </div>`).join('');
}

/* ══════════════════════════════════════
   PRODUCTS
══════════════════════════════════════ */
let prodPage = 1;
const PROD_PER_PAGE = 20;
let filteredProds = [];

function filterProducts() {
  const q     = (document.getElementById('prodSearch').value || '').toLowerCase();
  const cat   = document.getElementById('prodCatFilter').value;
  const brand = document.getElementById('prodBrandFilter').value;
  const del   = getDeletedIds();
  filteredProds = getProducts().filter(p => {
    if (del.includes(p.id)) return false;
    if (cat   && p.cat   !== cat)   return false;
    if (brand && p.brand !== brand) return false;
    if (q && !p.name.toLowerCase().includes(q)) return false;
    return true;
  });
  prodPage = 1;
  renderProdTable();
}
window.filterProducts = filterProducts;

function renderProducts() {
  filterProducts();
}

function renderProdTable() {
  const start = (prodPage - 1) * PROD_PER_PAGE;
  const page  = filteredProds.slice(start, start + PROD_PER_PAGE);
  const del   = getDeletedIds();

  document.getElementById('prodTableBody').innerHTML = page.map(p => {
    const disc = p.origPrice ? Math.round((1 - p.price / p.origPrice) * 100) : 0;
    return `<tr>
      <td style="font-size:.75rem;color:#94a3b8">${p.id}</td>
      <td><img class="td-img" src="${imgUrl(p.id)}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER}'" /></td>
      <td>
        <div class="td-name">${p.name}</div>
        <div class="td-sub">${p.brand.toUpperCase()} · ${CAT_LABELS[p.cat]||p.cat}</div>
      </td>
      <td><span class="badge badge--orange">${CAT_LABELS[p.cat]||p.cat}</span></td>
      <td>
        <div class="td-price">${fmt(p.price)}₮</div>
        ${p.origPrice ? `<div class="td-orig">${fmt(p.origPrice)}₮</div>` : ''}
      </td>
      <td>${disc ? `<span class="td-disc">-${disc}%</span>` : '—'}</td>
      <td>
        <div class="td-actions">
          <button class="btn-icon" onclick="openEditProduct(${p.id})" title="Засах">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <a class="btn-icon" href="product.html?id=${p.id}" target="_blank" title="Харах">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </a>
          <button class="btn-icon btn-icon--del" onclick="deleteProduct(${p.id},'${p.name.replace(/'/g,"\\'")}')" title="Устгах">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        </div>
      </td>
    </tr>`;
  }).join('');

  renderProdPagination();
}

function renderProdPagination() {
  const total = filteredProds.length;
  const pages = Math.ceil(total / PROD_PER_PAGE);
  const start = (prodPage - 1) * PROD_PER_PAGE + 1;
  const end   = Math.min(prodPage * PROD_PER_PAGE, total);

  document.getElementById('prodPageInfo').textContent =
    total ? `${start}–${end} / ${total} бүтээгдэхүүн` : 'Бүтээгдэхүүн олдсонгүй';

  let btns = `<button class="pag-btn" onclick="prodGoPage(${prodPage-1})" ${prodPage===1?'disabled':''}>‹</button>`;
  const range = pagRange(prodPage, pages);
  range.forEach(p => {
    if (p === '…') btns += `<span class="pag-btn" style="border:none;pointer-events:none">…</span>`;
    else btns += `<button class="pag-btn ${p===prodPage?'active':''}" onclick="prodGoPage(${p})">${p}</button>`;
  });
  btns += `<button class="pag-btn" onclick="prodGoPage(${prodPage+1})" ${prodPage===pages||!pages?'disabled':''}>›</button>`;
  document.getElementById('prodPageBtns').innerHTML = btns;
}

function prodGoPage(p) {
  const pages = Math.ceil(filteredProds.length / PROD_PER_PAGE);
  if (p < 1 || p > pages) return;
  prodPage = p;
  renderProdTable();
}
window.prodGoPage = prodGoPage;

function pagRange(cur, total) {
  if (total <= 7) return Array.from({length:total},(_,i)=>i+1);
  if (cur <= 4)   return [1,2,3,4,5,'…',total];
  if (cur >= total-3) return [1,'…',total-4,total-3,total-2,total-1,total];
  return [1,'…',cur-1,cur,cur+1,'…',total];
}

/* ─── Product edit modal ─── */
let editingProdId = null;

function openEditProduct(id) {
  const p = getProducts().find(x => x.id === id);
  if (!p) return;
  editingProdId = id;
  document.getElementById('prodModalTitle').textContent = 'Бүтээгдэхүүн засах';
  document.getElementById('pmId').value       = p.id;
  document.getElementById('pmName').value     = p.name;
  document.getElementById('pmCat').value      = p.cat;
  document.getElementById('pmBrand').value    = p.brand;
  document.getElementById('pmPrice').value    = p.price;
  document.getElementById('pmOrigPrice').value = p.origPrice || '';
  document.getElementById('pmDesc').value     = p.desc || '';
  const img = document.getElementById('prodModalImg');
  img.src = imgUrl(id);
  img.onerror = () => img.src = PLACEHOLDER;
  document.getElementById('prodModal').classList.remove('hidden');
}
window.openEditProduct = openEditProduct;

function openAddProduct() {
  editingProdId = null;
  document.getElementById('prodModalTitle').textContent = 'Шинэ бүтээгдэхүүн нэмэх';
  ['pmId','pmName','pmPrice','pmOrigPrice','pmDesc'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('pmCat').value   = 'phones';
  document.getElementById('pmBrand').value = 'apple';
  document.getElementById('prodModalImg').src = PLACEHOLDER;
  document.getElementById('prodModal').classList.remove('hidden');
}
window.openAddProduct = openAddProduct;

function saveProdModal() {
  const name      = document.getElementById('pmName').value.trim();
  const cat       = document.getElementById('pmCat').value;
  const brand     = document.getElementById('pmBrand').value;
  const price     = parseInt(document.getElementById('pmPrice').value, 10);
  const origPrice = parseInt(document.getElementById('pmOrigPrice').value, 10) || null;

  if (!name || !price) { showAdminToast('Нэр болон үнийг бөглөнө үү'); return; }

  if (editingProdId) {
    saveProdOverride(editingProdId, { name, cat, brand, price, origPrice });
    showAdminToast('✅ Бүтээгдэхүүн шинэчлэгдлээ');
  } else {
    /* Add as a new entry in overrides with a temporary negative id */
    const newId = Date.now();
    const ov    = JSON.parse(localStorage.getItem('antmall_admin_prods') || '{}');
    ov['_new_' + newId] = { id: newId, name, cat, brand, price, origPrice, isNew: true };
    localStorage.setItem('antmall_admin_prods', JSON.stringify(ov));
    showAdminToast('✅ Шинэ бүтээгдэхүүн нэмэгдлээ');
  }
  document.getElementById('prodModal').classList.add('hidden');
  filterProducts();
  renderDashboard();
}
window.saveProdModal = saveProdModal;

function deleteProduct(id, name) {
  if (!confirm(`"${name}" -ийг устгах уу?`)) return;
  deleteProdOverride(id);
  filterProducts();
  renderDashboard();
  showAdminToast('Бүтээгдэхүүн устгагдлаа');
}
window.deleteProduct = deleteProduct;

function closeProdModal(e) {
  if (e.target === document.getElementById('prodModal'))
    document.getElementById('prodModal').classList.add('hidden');
}
window.closeProdModal = closeProdModal;

function exportProducts() {
  const rows = [['ID','Нэр','Брэнд','Ангилал','Үнэ','Эх үнэ']];
  getProducts().filter(p => !getDeletedIds().includes(p.id)).forEach(p => {
    rows.push([p.id, p.name, p.brand, p.cat, p.price, p.origPrice||'']);
  });
  downloadCSV(rows, 'antmall_products.csv');
}
window.exportProducts = exportProducts;

/* ══════════════════════════════════════
   ORDERS
══════════════════════════════════════ */
let orderPage = 1;
const ORDER_PER_PAGE = 15;
let filteredOrders = [];
let currentOrderId = null;

const ORDER_BADGE = { processing:'badge--processing', shipped:'badge--shipped', delivered:'badge--delivered', cancelled:'badge--cancelled' };
const ORDER_LABEL = { processing:'Боловсруулж байна', shipped:'Хүргэлтэд', delivered:'Хүргэгдсэн', cancelled:'Цуцлагдсан' };

function filterOrders() {
  const q      = (document.getElementById('orderSearch').value || '').toLowerCase();
  const status = document.getElementById('orderStatusFilter').value;
  const all    = getAdminOrders();
  filteredOrders = all.filter(o => {
    if (status && o.status !== status) return false;
    if (q && !o.id.toLowerCase().includes(q) && !(o.customer||'').toLowerCase().includes(q)) return false;
    return true;
  });
  orderPage = 1;
  renderOrderTable();
}
window.filterOrders = filterOrders;

function renderOrders() { filterOrders(); }

function renderOrderTable() {
  const start = (orderPage - 1) * ORDER_PER_PAGE;
  const page  = filteredOrders.slice(start, start + ORDER_PER_PAGE);

  document.getElementById('orderTableBody').innerHTML = page.map(o => {
    const fi   = o.items[0];
    const more = o.items.length - 1;
    return `<tr>
      <td><strong style="font-size:.82rem;cursor:pointer;color:var(--orange)" onclick="openOrderDetail('${o.id}')">${o.id}</strong></td>
      <td style="font-size:.82rem;color:#64748b">${o.date}</td>
      <td>
        <div style="font-weight:600;font-size:.85rem">${o.customer}</div>
        <div style="font-size:.72rem;color:#94a3b8">${o.phone||''}</div>
      </td>
      <td style="font-size:.82rem">
        ${fi.name}${more > 0 ? ` <span class="badge badge--inactive">+${more}</span>` : ''}
      </td>
      <td class="td-price">${fmt(o.total)}₮</td>
      <td><span class="badge ${ORDER_BADGE[o.status]||''}">${ORDER_LABEL[o.status]||o.status}</span></td>
      <td>
        <div class="td-actions">
          <button class="btn-icon" onclick="openOrderDetail('${o.id}')" title="Дэлгэрэнгүй">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </td>
    </tr>`;
  }).join('');

  renderOrderPagination();
}

function renderOrderPagination() {
  const total = filteredOrders.length;
  const pages = Math.ceil(total / ORDER_PER_PAGE);
  const start = (orderPage - 1) * ORDER_PER_PAGE + 1;
  const end   = Math.min(orderPage * ORDER_PER_PAGE, total);

  document.getElementById('orderPageInfo').textContent =
    total ? `${start}–${end} / ${total} захиалга` : 'Захиалга олдсонгүй';

  let btns = `<button class="pag-btn" onclick="orderGoPage(${orderPage-1})" ${orderPage===1?'disabled':''}>‹</button>`;
  pagRange(orderPage, pages).forEach(p => {
    if (p === '…') btns += `<span class="pag-btn" style="border:none;pointer-events:none">…</span>`;
    else btns += `<button class="pag-btn ${p===orderPage?'active':''}" onclick="orderGoPage(${p})">${p}</button>`;
  });
  btns += `<button class="pag-btn" onclick="orderGoPage(${orderPage+1})" ${orderPage===pages||!pages?'disabled':''}>›</button>`;
  document.getElementById('orderPageBtns').innerHTML = btns;
}

function orderGoPage(p) {
  const pages = Math.ceil(filteredOrders.length / ORDER_PER_PAGE);
  if (p < 1 || p > pages) return;
  orderPage = p;
  renderOrderTable();
}
window.orderGoPage = orderGoPage;

function openOrderDetail(id) {
  currentOrderId = id;
  const o = getAdminOrders().find(x => x.id === id);
  if (!o) return;

  document.getElementById('orderModalTitle').textContent = 'Захиалга #' + id;
  document.getElementById('orderModalStatus').value = o.status;

  const itemsHtml = o.items.map(item => `
    <div class="order-detail-item">
      <img src="${imgUrl(item.id)}" alt="${item.name}" onerror="this.src='${PLACEHOLDER}'" />
      <div class="order-detail-item__info">
        <div class="order-detail-item__name">${item.name}</div>
        ${item.variant ? `<div class="order-detail-item__variant">${item.variant}</div>` : ''}
        <div class="order-detail-item__variant">× ${item.qty}</div>
      </div>
      <strong>${fmt(item.price)}₮</strong>
    </div>`).join('');

  document.getElementById('orderModalBody').innerHTML = `
    <div style="margin-bottom:14px;font-size:.85rem;color:#64748b">
      📅 ${o.date} &nbsp;·&nbsp; 👤 ${o.customer} &nbsp;·&nbsp; 📞 ${o.phone||'—'}
    </div>
    ${itemsHtml}
    <div class="order-detail-total">
      <span>Нийт дүн</span>
      <strong>${fmt(o.total)}₮</strong>
    </div>`;

  document.getElementById('orderModal').classList.remove('hidden');
}
window.openOrderDetail = openOrderDetail;

function updateOrderStatus() {
  if (!currentOrderId) return;
  const newStatus = document.getElementById('orderModalStatus').value;
  const orders    = getAdminOrders();
  const idx       = orders.findIndex(o => o.id === currentOrderId);
  if (idx === -1) return;
  orders[idx].status = newStatus;
  saveAdminOrders(orders);
  renderOrderTable();
  showAdminToast('Статус шинэчлэгдлээ: ' + ORDER_LABEL[newStatus]);
}
window.updateOrderStatus = updateOrderStatus;

function closeOrderModal(e) {
  if (e.target === document.getElementById('orderModal'))
    document.getElementById('orderModal').classList.add('hidden');
}
window.closeOrderModal = closeOrderModal;

function exportOrders() {
  const rows = [['Захиалга #','Огноо','Хэрэглэгч','Утас','Нийт дүн','Статус']];
  getAdminOrders().forEach(o => {
    rows.push([o.id, o.date, o.customer, o.phone||'', o.total, o.status]);
  });
  downloadCSV(rows, 'antmall_orders.csv');
}
window.exportOrders = exportOrders;

/* ══════════════════════════════════════
   USERS
══════════════════════════════════════ */
let allUsers = [];

function filterUsers() {
  const q = (document.getElementById('userSearch').value || '').toLowerCase();
  const filtered = q
    ? allUsers.filter(u =>
        (u.first+' '+u.last).toLowerCase().includes(q) ||
        (u.phone||'').includes(q) ||
        (u.email||'').toLowerCase().includes(q))
    : allUsers;
  renderUserTable(filtered);
}
window.filterUsers = filterUsers;

function renderUsers() {
  allUsers = getUsers();
  renderUserTable(allUsers);
}

function renderUserTable(users) {
  if (!users.length) {
    document.getElementById('userTableBody').innerHTML =
      `<tr><td colspan="7"><div class="empty-state-admin"><div class="empty-state-admin__icon">👤</div><div class="empty-state-admin__text">Хэрэглэгч олдсонгүй</div></div></td></tr>`;
    return;
  }
  document.getElementById('userTableBody').innerHTML = users.map(u => {
    const initials = ((u.first||'')[0]||'') + ((u.last||'')[0]||'');
    const avatarEl = u.avatar
      ? `<img src="${u.avatar}" />`
      : initials;
    return `<tr>
      <td>
        <div class="user-cell">
          <div class="user-avatar">${avatarEl}</div>
          <div>
            <div class="user-cell__name">${u.first} ${u.last}</div>
          </div>
        </div>
      </td>
      <td style="font-size:.82rem">${u.phone||'—'}</td>
      <td style="font-size:.82rem;color:#64748b">${u.email||'—'}</td>
      <td style="font-size:.82rem;color:#94a3b8">${u.joined||'—'}</td>
      <td style="font-weight:600;text-align:center">${u.orders||0}</td>
      <td style="font-weight:700">${fmt(u.spend||0)}₮</td>
      <td><span class="badge ${u.status==='active'?'badge--active':'badge--inactive'}">${u.status==='active'?'Идэвхтэй':'Идэвхгүй'}</span></td>
    </tr>`;
  }).join('');
}

/* ══════════════════════════════════════
   SETTINGS
══════════════════════════════════════ */
function saveSettings() {
  showAdminToast('✅ Тохиргоо хадгалагдлаа');
}
window.saveSettings = saveSettings;

function saveNotifSettings(cb, type) {
  showAdminToast('Мэдэгдэл тохиргоо шинэчлэгдлээ');
}
window.saveNotifSettings = saveNotifSettings;

function changeAdminPass() {
  const cur  = document.getElementById('curPass').value;
  const nw   = document.getElementById('newPass').value;
  const nw2  = document.getElementById('newPass2').value;
  if (!cur) { showAdminToast('Одоогийн нууц үгээ оруулна уу'); return; }
  if (nw.length < 8) { showAdminToast('Шинэ нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой'); return; }
  if (nw !== nw2) { showAdminToast('Нууц үг таарахгүй байна'); return; }
  ['curPass','newPass','newPass2'].forEach(id => { document.getElementById(id).value = ''; });
  showAdminToast('✅ Нууц үг амжилттай солигдлоо');
}
window.changeAdminPass = changeAdminPass;

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
let toastTimer;
function showAdminToast(msg) {
  const el = document.getElementById('adminToast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

/* ══════════════════════════════════════
   CSV EXPORT HELPER
══════════════════════════════════════ */
function downloadCSV(rows, filename) {
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ══════════════════════════════════════
   DATE/TIME CLOCK
══════════════════════════════════════ */
function updateClock() {
  const now = new Date();
  const d   = now.toLocaleDateString('mn-MN', { year:'numeric', month:'short', day:'numeric' });
  const t   = now.toLocaleTimeString('mn-MN', { hour:'2-digit', minute:'2-digit' });
  const el  = document.getElementById('adminDateTime');
  if (el) el.textContent = d + ' ' + t;
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
function initAdmin() {
  renderDashboard();
  updateClock();
  setInterval(updateClock, 30000);
}

document.addEventListener('DOMContentLoaded', () => {
  if (isAdminLoggedIn()) {
    document.getElementById('adminLoginScreen').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    initAdmin();
  }
});
