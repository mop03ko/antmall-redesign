/* ═══════════════════════════════════════
   PRODUCTS PAGE — products.js
   ═══════════════════════════════════════ */
(function () {
'use strict';

/* ── helpers (scoped to avoid conflict with main.js) ── */
const pfmt    = n => Math.round(n).toLocaleString('mn-MN');
const imgUrl  = id => `https://admins-odoo.antmall.mn/web/image/product.template/${id}/image_1920`;
const brandUrl = id => `https://admins-odoo.antmall.mn/api/webgrid/product_brand/${id}/image`;
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='40'%3E%F0%9F%93%A6%3C/text%3E%3C/svg%3E";

/* ── brand IDs ── */
const BRAND_IDS = { apple: 2, samsung: 8, cuckoo: 1, dyson: 6, dell: 4, tecno: 15, pout: 3, deerma: 14, dji: 7, sony: 12, bodylabs: 9, aima: 11, luyuan: 10, unknown: 0 };

/* ── SVG icons ── */
const SVG_HEART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const SVG_CART  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;

/* ═══════════════════════════════════════
   ALL PRODUCTS DATA — live data from antmall.mn API
   ═══════════════════════════════════════ */
const ALL_PRODUCTS = [
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

/* ═══════════════════════════════════════
   STATE
   ═══════════════════════════════════════ */
const state = {
  brands:   new Set(),
  cat:      '',
  priceMin: 0,
  priceMax: 15_000_000,
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

  return `<article class="pc" data-brand="${p.brand}" data-cat="${p.cat}" onclick="location.href='product.html?id=${p.id}'" style="cursor:pointer">
  <div class="pc__media">
    ${badgeHtml}
    <button class="btn-wish" aria-label="Хадгалах" onclick="event.stopPropagation();toggleWish(this)">${SVG_HEART}</button>
    <img src="${imgUrl(p.id)}" alt="${p.name}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
  </div>
  <div class="pc__body">
    ${brandLogoHtml}
    <h3 class="pc__name">${p.name}</h3>
    <div class="pc__price">
      <span class="price-now">${pfmt(price)}<span class="currency">₮</span></span>
      ${orig ? `<span class="price-was">${pfmt(orig)}₮</span>` : ''}
      ${pct  ? `<span class="price-save">-${pct}%</span>` : ''}
    </div>
    <button class="btn-add-cart" onclick="event.stopPropagation();addToCart(this,'${ns}',${price})">${SVG_CART} Сагсанд нэмэх</button>
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
  if (state.priceMin > 0 || state.priceMax < 15_000_000) {
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
  else if (key === 'price') { state.priceMin = 0; state.priceMax = 15_000_000; resetPriceSlider(); }
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
    const MAX = 15_000_000;
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
  if (maxEl) maxEl.value = 15_000_000;
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
    state.priceMax = 15_000_000;
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
