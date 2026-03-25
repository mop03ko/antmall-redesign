/* ═══════════════════════════════════════
   PRODUCT DETAIL PAGE — product.js
   ═══════════════════════════════════════ */
(function () {
'use strict';

const fmt      = n => Math.round(n).toLocaleString('mn-MN');
const imgUrl   = id => `https://admins-odoo.antmall.mn/web/image/product.template/${id}/image_1920`;
const brandUrl = id => `https://admins-odoo.antmall.mn/api/webgrid/product_brand/${id}/image`;
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3C/svg%3E";

const BRAND_IDS = { apple:2, samsung:8, cuckoo:1, dyson:6, dell:4, tecno:15, pout:3, deerma:14, dji:7, sony:12, bodylabs:9, aima:11, luyuan:10, unknown:0 };
const CAT_LABELS = { phones:'Гар утас', wearables:'Ухаалаг цаг / Чихэвч', computers:'Компьютер', appliances:'Гэр ахуйн цахилгаан', accessories:'Дагалдах хэрэгсэл', drones:'Дрон', cameras:'Камер', ebike:'Цахилгаан дугуй', beauty:'Гоо сайхан, эрүүл мэнд' };

const SVG_HEART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const SVG_CART  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;

/* ── All products — live data from antmall.mn API ── */
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
  {id:1785,name:"iPad A16",brand:'apple',cat:'computers',price:1650000},
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

/* ── Per-product variant data ── */
const VARIANTS = {
  // iPhone 17 series
  1757: { colors: [['Natural Titanium','#e8e0d5','#e8e0d5'],['Black Titanium','#2c2c2c','#2c2c2c'],['White Titanium','#f0eee9','#ddd'],['Desert Titanium','#c9a882','#c9a882']], storage: [['256GB',8599000],['512GB',9099000],['1TB',9599000]] },
  1758: { colors: [['Natural Titanium','#e8e0d5','#e8e0d5'],['Black Titanium','#2c2c2c','#2c2c2c'],['White Titanium','#f0eee9','#ddd'],['Desert Titanium','#c9a882','#c9a882']], storage: [['256GB',6899000],['512GB',7399000],['1TB',7899000]] },
  1762: { colors: [['Ultramarine','#3a5fa5','#3a5fa5'],['Teal','#4a9e8e','#4a9e8e'],['Pink','#e9849a','#e9849a'],['White','#f5f5f5','#ddd'],['Black','#1a1a1a','#1a1a1a']], storage: [['128GB',4199000],['256GB',4499000],['512GB',4999000]] },
  1763: { colors: [['Sky Blue','#9dc8e8','#9dc8e8'],['Starlight','#f5f0e8','#ddd'],['Black','#1a1a1a','#1a1a1a']], storage: [['128GB',4799000],['256GB',5099000]] },
  // iPhone 16 series
  1697: { colors: [['Black Titanium','#2c2c2c','#2c2c2c'],['White Titanium','#f0eee9','#ddd'],['Natural Titanium','#e8e0d5','#e8e0d5'],['Desert Titanium','#c9a882','#c9a882']], storage: [['256GB',6699000],['512GB',7199000],['1TB',7699000]] },
  1698: { colors: [['Black Titanium','#2c2c2c','#2c2c2c'],['White Titanium','#f0eee9','#ddd'],['Natural Titanium','#e8e0d5','#e8e0d5'],['Desert Titanium','#c9a882','#c9a882']], storage: [['128GB',5199000],['256GB',5499000],['512GB',5999000]] },
  1699: { colors: [['Black','#1a1a1a','#1a1a1a'],['White','#f5f5f5','#ddd'],['Pink','#f4b8c1','#f4b8c1'],['Ultramarine','#3a5fa5','#3a5fa5'],['Teal','#4a9e8e','#4a9e8e']], storage: [['128GB',3899000],['256GB',4199000],['512GB',4699000]] },
  1700: { colors: [['Black','#1a1a1a','#1a1a1a'],['White','#f5f5f5','#ddd'],['Pink','#f4b8c1','#f4b8c1'],['Ultramarine','#3a5fa5','#3a5fa5'],['Teal','#4a9e8e','#4a9e8e']], storage: [['128GB',4299000],['256GB',4599000],['512GB',5099000]] },
  // Samsung
  1721: { colors: [['Icy Blue','#a8c8e8','#a8c8e8'],['Mint','#8ecab0','#8ecab0'],['Navy','#1a2f5e','#1a2f5e'],['Silver','#e0e0e0','#ccc']], storage: [['128GB',3850000],['256GB',4199000]] },
  1720: { colors: [['Titanium Gray','#a8a8a8','#a8a8a8'],['Titanium Black','#1a1a1a','#1a1a1a'],['Titanium Silver','#e0e0e0','#ccc'],['Titanium Blue','#4a7ab5','#4a7ab5']], storage: [['256GB',3999000],['512GB',4499000],['1TB',4999000]] },
  // MacBooks — storage only
  1588: { storage: [['16GB/256GB',4199000],['16GB/512GB',4699000],['24GB/1TB',5299000]] },
  1587: { storage: [['16GB/256GB',5199000],['16GB/512GB',5699000],['24GB/1TB',6299000]] },
  1742: { storage: [['24GB/512GB',10550000],['36GB/1TB',11999000],['48GB/2TB',13999000]] },
  1548: { storage: [['16GB/512GB',6999000],['24GB/1TB',7999000],['24GB/2TB',8999000]] },
  1623: { storage: [['16GB/256GB',4750000],['16GB/512GB',5299000]] },
};

/* ── Per-category specs generator ── */
function getSpecs(p) {
  const n = p.name;
  const b = p.brand;
  switch (p.cat) {
    case 'phones': {
      const isApple = b === 'apple';
      const isSamsung = b === 'samsung';
      return [
        ['Дисплей', isApple ? '6.1"–6.9" Super Retina XDR OLED, ProMotion 120Hz' : '6.1"–6.8" Dynamic AMOLED 2X, 120Hz'],
        ['Chip', isApple ? (n.includes('Pro') ? 'Apple A18 Pro / A19 Pro (3nm)' : 'Apple A18 (3nm)') : (isSamsung ? 'Snapdragon 8 Elite / Exynos 2500' : 'MediaTek Helio G99')],
        ['RAM', isApple ? '8GB' : (isSamsung ? '12GB' : '8GB')],
        ['Камер', isApple ? (n.includes('Pro') ? '48MP + 48MP + 12MP Triple' : '48MP + 12MP Dual') : (isSamsung ? '200MP + 12MP + 10MP Triple' : '50MP + 8MP Dual')],
        ['Батарей', isApple ? '3,000–4,685mAh, MagSafe дэмжих' : (isSamsung ? '4,000–5,000mAh, 45W Зарядка' : '5,000mAh, 33W Зарядка')],
        ['OS', isApple ? 'iOS 18' : (isSamsung ? 'Android 15 + One UI 7' : 'Android 14')],
        ['Холболт', isApple ? '5G, Wi-Fi 7, Bluetooth 5.4, USB-C' : '5G, Wi-Fi 6E, Bluetooth 5.4, USB-C'],
        ['Биометр', isApple ? 'Face ID' : 'Fingerprint + Face unlock'],
        ['Усны тэсвэр', isApple || isSamsung ? 'IP68' : 'IP54'],
      ];
    }
    case 'wearables': {
      const isWatch = n.includes('Watch');
      const isAirPods = n.includes('AirPods') || n.includes('Buds') || n.includes('Ears');
      if (isWatch) return [
        ['Дисплей', 'Retina LTPO OLED, Always-on'],
        ['Chip', b === 'apple' ? 'Apple S9 / S10' : 'Exynos W940'],
        ['Батарей', b === 'apple' ? '18–60 цаг' : '40 цаг'],
        ['Холболт', 'Bluetooth 5.3, Wi-Fi, NFC, GPS'],
        ['Усны тэсвэр', n.includes('Ultra') ? '100м' : '50м'],
        ['OS', b === 'apple' ? 'watchOS 11' : 'Wear OS 5'],
        ['Биет хэмжээ', b === 'apple' ? '44mm / 46mm' : '40mm / 44mm'],
      ];
      return [
        ['Загвар', n.includes('Max') ? 'Over-ear' : 'In-ear / True Wireless'],
        ['Холболт', 'Bluetooth 5.4, H2/H1 chip'],
        ['Идэвхтэй дуу хасалт', n.includes('Pro') || n.includes('Max') ? 'Тийм — ANC' : 'Адаптив дуу тохируулга'],
        ['Батарей', n.includes('Max') ? '30 цаг (ANC-тэй)' : (n.includes('Pro') ? '30 цаг (кейстэй)' : '30 цаг (кейстэй)')],
        ['Усны тэсвэр', n.includes('Max') ? 'IPX4' : 'IPX4'],
        ['Зарядка', 'USB-C / MagSafe'],
      ];
    }
    case 'computers': {
      const isMac = b === 'apple';
      return [
        ['Processor', isMac ? (n.includes('Pro') ? 'Apple M4 Pro / M4 Max' : 'Apple M4') : (n.includes('Gaming') || n.includes('i7') ? 'Intel Core i7-13700H' : 'Intel Core i5-13420H')],
        ['RAM', isMac ? '16GB–96GB Unified Memory' : (n.includes('i7') || n.includes('Gaming') ? '16GB DDR5' : '8GB DDR4')],
        ['SSD', isMac ? '256GB–4TB NVMe' : (n.includes('Gaming') ? '512GB NVMe' : '256GB–512GB NVMe')],
        ['Дисплей', isMac ? (n.includes('16') ? '16.2" Liquid Retina XDR' : (n.includes('15') ? '15.3" Liquid Retina' : '14.2" Liquid Retina XDR')) : '15.6" FHD IPS 144Hz'],
        ['График', isMac ? 'Integrated GPU (10–40 core)' : (n.includes('Gaming') ? 'NVIDIA RTX 4060' : 'Intel Iris Xe')],
        ['Батарей', isMac ? '18–22 цаг' : '4–6 цаг'],
        ['OS', isMac ? 'macOS Sequoia' : 'Windows 11 Pro'],
        ['Холболт', isMac ? 'Thunderbolt 4, USB-C, MagSafe, Wi-Fi 6E' : 'USB-A, USB-C, HDMI, Wi-Fi 6'],
        ['Жин', isMac ? '1.24–2.24 кг' : '2.2–2.8 кг'],
      ];
    }
    case 'appliances': {
      if (b === 'dyson') {
        const isVacuum = n.includes('Detect') || n.includes('Vacuum') || n.includes('Pencil');
        if (isVacuum) return [
          ['Хүч', n.includes('Gen5') ? '262 AW' : (n.includes('V15') ? '230 AW' : '150 AW')],
          ['Тоос сорох систем', 'HEPA filtration, Dyson Digital Motor'],
          ['Ажиллах хугацаа', '60–75 минут'],
          ['Сав багтаамж', '0.3–0.76L'],
          ['Жин', '2.6–3.1 кг'],
          ['Аксессуар', 'Олон нэмэлт толгойтой'],
        ];
        if (n.includes('Air Wrap')) return [
          ['Хүч', '1300W'],
          ['Технологи', 'Coanda airflow styling'],
          ['Даралт', '13 bar'],
          ['Хурд', '3 хурдны тохиргоо'],
          ['Дулаан', '3 дулааны тохиргоо'],
          ['Холболт', 'PVHC motor'],
        ];
        return [
          ['Хүч', '600–1000W'],
          ['Фильтр', 'HEPA H13'],
          ['Агаарыг цэвэршүүлэх', 'PM0.1 тоосонцор устгах'],
          ['Дуу чимээ', '41–55 дБ'],
          ['Талбай', '80–100 м²'],
        ];
      }
      if (b === 'cuckoo') return [
        ['Хүчлэг', '220V / 50Hz'],
        ['Хүч', '700–1200W'],
        ['Технологи', n.includes('Rice') ? 'IH Pressure Cooking' : 'HEPA Filtration'],
        ['Багтаамж', n.includes('Rice') ? '1.0–1.8L' : (n.includes('Fryer') ? '3.7L' : '1.5–1.8L')],
        ['Програм', n.includes('Rice') ? '12 menu' : '5 горим'],
        ['Материал', 'BPA Free, Food Grade'],
      ];
      if (b === 'deerma') return [
        ['Хүч', '30–3200W'],
        ['Технологи', n.includes('Robot') ? 'LiDAR Navigation' : (n.includes('Steam') ? 'Steam cleaning' : 'Brushless Motor')],
        ['Ажиллах хугацаа', n.includes('Robot') || n.includes('Cordless') ? '90–180 минут' : '—'],
        ['Дуу чимээ', '52–65 дБ'],
        ['Ухаалаг функц', n.includes('Robot') ? 'Auto Dock, App Control' : '—'],
        ['Жин', '1.5–5 кг'],
      ];
      return [
        ['Хүч', '1000W'],
        ['Технологи', 'Advanced filtration'],
        ['Ажиллах хугацаа', '—'],
      ];
    }
    case 'accessories':
      return [
        ['Төрөл', n.includes('Charger') || n.includes('MagSafe') ? 'Утасгүй цэнэгч' : (n.includes('Headphone') || n.includes('Ears') ? 'Чихэвч' : 'Аксессуар')],
        ['Холболт', n.includes('USB') ? 'USB-C' : (n.includes('Wireless') || n.includes('MagSafe') ? 'Qi2 / MagSafe' : 'Bluetooth 5.2')],
        ['Гаралт', n.includes('100W') ? '100W PD' : (n.includes('Wireless') ? '15W' : '—')],
        ['Нийцтэй', 'iPhone, Android, iPad'],
        ['Материал', n.includes('Mat') ? 'Эко арьс / Fascia' : 'Хуванцар / Металл'],
      ];
    default:
      return [['Нэр', p.name],['Үнэ', `${fmt(p.price)}₮`]];
  }
}

/* ── Per-category description generator ── */
function getDescription(p) {
  const n = p.name;
  switch (p.cat) {
    case 'phones': {
      const isPro = n.includes('Pro');
      const isFold = n.includes('Fold') || n.includes('Flip');
      const feats = p.brand === 'apple' ? [
        ['📸', 'Pro Camera', isPro ? '48MP Triple камерын систем. 4K/120fps ProRes видео.' : '48MP Fusion камер. Гайхалтай зургийн чанар.'],
        ['⚡', isPro ? 'A18/A19 Pro Chip' : 'A18 Chip', 'Дэлхийн хамгийн хурдан утасны processor. AI боловсруулалтад тэргүүлэх.'],
        ['🔋', 'Батарей', 'Бүтэн өдрийн батарей. MagSafe болон Qi2 дэмжинэ.'],
        ['💎', 'Design', isPro ? 'Titanium хүрэм, Ceramic Shield. Элитэ материалын хослол.' : 'Aluminum + Ceramic Shield. Элэгдэлд тэсвэртэй.'],
      ] : p.brand === 'samsung' ? [
        ['📸', 'Camera', isFold ? 'Гурав дахь үеийн камерын систем.' : '200MP + AI боловсруулалт. Pro visual intelligence.'],
        ['⚡', 'Snapdragon', isFold ? 'Galaxy AI функцуудтай.' : 'Snapdragon 8 Elite. On-device AI.'],
        ['🔋', 'Батарей', '4000–5000mAh. 45W хурдан цэнэглэлт.'],
        ['🔲', 'Display', isFold ? 'Нугалагдах Flex дисплей технологи.' : 'Dynamic AMOLED 2X. Vision Booster.'],
      ] : [
        ['📸', 'Camera', '50MP AI камер. Гэрлийн найрлагатай зураг.'],
        ['⚡', 'Performance', 'Хурдан processor. Олон апп нэгэн зэрэг.'],
        ['🔋', 'Батарей', '5000mAh батарей. Бүтэн өдрийн ашиглалт.'],
        ['💰', 'Үнэ/Чанар', 'Гайхалтай үнэ-чанарын харьцаа.'],
      ];
      return { title: `${n}-ийн тухай`, intro: `${n} нь ${p.brand === 'apple' ? 'Apple' : p.brand === 'samsung' ? 'Samsung' : 'TECNO'}-ийн ${isPro || isFold ? 'флагман' : 'дунд ангиллын'} ухаалаг гар утас. AntMall.mn дээр хямд үнэ болон хурдан хүргэлттэйгээр авах боломжтой.`, features: feats };
    }
    case 'wearables': {
      const feats = n.includes('Watch') ? [
        ['❤️', 'Эрүүл мэнд', 'Зүрхний цохилт, цусны хүчилтөрөгч, нойрны хяналт.'],
        ['🏃', 'Спорт', '100+ дасгалын горим. GPS байршил тогтоолт.'],
        ['📲', 'Мэдэгдэл', 'Утасгүй дуудлага, мессеж, апп мэдэгдэл.'],
        ['🔋', 'Батарей', '18–60 цаг. Хурдан цэнэглэлт.'],
      ] : [
        ['🎵', 'Дуу чанар', 'High-fidelity audio. Адаптив эквалайзер.'],
        ['🔇', 'ANC', n.includes('Pro') || n.includes('Max') ? 'Active Noise Cancellation. Ухаалаг дуу хасалт.' : 'Adaptive audio.'],
        ['🔋', 'Батарей', '30+ цаг нийт тоглуулах хугацаа.'],
        ['📱', 'Холболт', 'H2 chip. Instant reconnect. Spatial audio.'],
      ];
      return { title: `${n}-ийн тухай`, intro: `${n} нь таны өдөр тутмын хэрэгцээнд нийцсэн ухаалаг зүүлт. AntMall.mn дээр баталгаатай үнэтэйгээр авна уу.`, features: feats };
    }
    case 'computers': {
      const isMac = p.brand === 'apple';
      const feats = isMac ? [
        ['⚡', 'M4 Chip', 'Apple Silicon M4 — бизнесийн болон бүтээлч ажлын хамгийн хурдан laptop.'],
        ['🖥️', 'Дисплей', 'Liquid Retina XDR. ProMotion 120Hz. ProDynamics Tone.'],
        ['🔋', 'Батарей', '18–22 цаг. Бүтэн ажлын өдрийн батарей.'],
        ['🔌', 'Холболт', 'Thunderbolt 4, MagSafe, Wi-Fi 6E.'],
      ] : [
        ['🎮', 'Гүйцэтгэл', n.includes('Gaming') ? 'RTX 4060 + i7-13700H. 144Hz дисплей.' : 'i5/i7 processor. Олон даалгавар гүйцэтгэл.'],
        ['💾', 'Storage', 'NVMe SSD + DDR5 RAM. Хурдан файл нээлт.'],
        ['🖥️', 'Дисплей', 'FHD IPS дисплей. Өргөн харах өнцөг.'],
        ['🔌', 'Холболт', 'USB-A, USB-C, HDMI, Wi-Fi 6.'],
      ];
      return { title: `${n}-ийн тухай`, intro: `${n} нь ${isMac ? 'Apple-ийн хамгийн хүчирхэг laptop.' : 'Dell-ийн найдвартай, хүчирхэг laptop.'} AntMall.mn дээр хямд үнэтэйгээр авах боломжтой.`, features: feats };
    }
    default: {
      const feats = [
        ['✅', 'Чанар', `${n} — өндөр чанартай, найдвартай бүтээгдэхүүн.`],
        ['🚚', 'Хүргэлт', '21 аймаг хүргэлт. Хурдан, найдвартай.'],
        ['🛡️', 'Баталгаа', '1 жилийн баталгаат засвар үйлчилгээ.'],
        ['💳', 'Төлбөр', 'Хүүгүй хуваан төлөлт боломжтой.'],
      ];
      return { title: `${n}-ийн тухай`, intro: `${n} нь AntMall.mn дэлгүүрийн шилдэг бүтээгдэхүүнүүдийн нэг. Баталгаатай үнэтэйгээр авах боломжтой.`, features: feats };
    }
  }
}

/* current state */
let currentPrice = 0;
let currentQty   = 1;
let currentProduct = null;

/* ── Populate page from product data ── */
function populatePage(p) {
  currentPrice = p.price;
  currentProduct = p;

  const imgSrc = imgUrl(p.id);
  const brandId = BRAND_IDS[p.brand];
  const brandSrc = brandId ? brandUrl(brandId) : '';
  const catLabel = CAT_LABELS[p.cat] || p.cat;

  // Title
  document.title = `${p.name} — AntMall.mn`;

  // Breadcrumb
  const bcCat = document.getElementById('bcCat');
  const bcProd = document.getElementById('bcProduct');
  if (bcCat) { bcCat.textContent = catLabel; bcCat.href = `products.html?category=${p.cat}`; }
  if (bcProd) bcProd.textContent = p.name;

  // Gallery — main image
  const mainImg = document.getElementById('mainImg');
  if (mainImg) { mainImg.src = imgSrc; mainImg.alt = p.name; }

  // Badge
  const badge = document.getElementById('pdpGalleryBadge');
  if (badge) {
    if (p.badge) { badge.textContent = p.badge.toUpperCase(); badge.style.display = ''; }
    else badge.style.display = 'none';
  }

  // Gallery thumbnails — only images belonging to this product
  const thumbsEl = document.getElementById('galleryThumbs');
  if (thumbsEl) {
    thumbsEl.innerHTML = `<button class="pdp-thumb active" data-src="${imgSrc}">
      <img src="${imgSrc}" alt="${p.name}" loading="lazy" />
    </button>`;
  }

  // Meta strip
  const metaBrand = document.getElementById('metaBrandImg');
  if (metaBrand) { metaBrand.src = brandSrc; metaBrand.alt = p.brand; }
  const metaCat = document.getElementById('metaCat');
  if (metaCat) metaCat.textContent = catLabel;
  const metaSku = document.getElementById('metaSku');
  if (metaSku) metaSku.textContent = `ANT-${p.id}`;

  // Info panel brand + title
  const infoBrand = document.getElementById('infoBrandLogo');
  if (infoBrand) { infoBrand.src = brandSrc; infoBrand.alt = p.brand; }
  const titleEl = document.getElementById('pdpTitle');
  if (titleEl) titleEl.textContent = p.name;

  // Sticky bar
  const stickyImg = document.getElementById('stickyImg');
  if (stickyImg) { stickyImg.src = imgSrc; stickyImg.alt = p.name; }
  const stickyName = document.getElementById('stickyName');
  if (stickyName) stickyName.textContent = p.name;

  // Price
  updatePriceDisplay();

  // Stock (pseudo-random but deterministic per product id)
  const stockEl = document.getElementById('pdpStock');
  if (stockEl) {
    const stock = 3 + ((p.id * 17 + 11) % 23); // deterministic 3–25 range
    stockEl.textContent = `${stock} ширхэг байна`;
  }

  // Color + storage variants
  renderVariants(p);

  // Description tab
  const desc = getDescription(p);
  const descEl = document.getElementById('pdpDescription');
  if (descEl) {
    descEl.innerHTML = `<h3>${desc.title}</h3><p>${desc.intro}</p>
      <div class="pdp-features">
        ${desc.features.map(([icon, title, text]) => `
          <div class="pdp-feature">
            <div class="pdp-feature__icon">${icon}</div>
            <div><strong>${title}</strong><p>${text}</p></div>
          </div>`).join('')}
      </div>`;
  }

  // Specs tab
  const specsBody = document.getElementById('pdpSpecsBody');
  if (specsBody) {
    const rows = getSpecs(p);
    specsBody.innerHTML = rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('');
  }

  // Related products "see all" link
  const relMore = document.getElementById('relatedMoreLink');
  if (relMore) relMore.href = `products.html?category=${p.cat}`;
}

/* ── Render color + storage variants ── */
function renderVariants(p) {
  const v = VARIANTS[p.id] || {};

  // Color group
  const colorGroup = document.querySelector('.pdp-option-group:has(#colorOptions)') ||
    document.getElementById('colorOptions')?.closest('.pdp-option-group');
  const colorEl = document.getElementById('colorOptions');
  if (colorEl) {
    if (v.colors && v.colors.length) {
      if (colorGroup) colorGroup.style.display = '';
      const firstColor = v.colors[0][0];
      const labelEl = document.getElementById('colorLabel');
      if (labelEl) labelEl.textContent = firstColor;
      colorEl.innerHTML = v.colors.map(([name, bg, border], i) =>
        `<button class="pdp-color${i === 0 ? ' active' : ''}" data-color="${name}" title="${name}" style="background:${bg};border-color:${border};"></button>`
      ).join('');
    } else {
      if (colorGroup) colorGroup.style.display = 'none';
    }
  }

  // Storage group
  const storageGroup = document.querySelector('.pdp-option-group:has(#storageOptions)') ||
    document.getElementById('storageOptions')?.closest('.pdp-option-group');
  const storageEl = document.getElementById('storageOptions');
  if (storageEl) {
    if (v.storage && v.storage.length) {
      if (storageGroup) storageGroup.style.display = '';
      currentPrice = v.storage[0][1];
      storageEl.innerHTML = v.storage.map(([label, price], i) =>
        `<button class="pdp-variant${i === 0 ? ' active' : ''}" data-storage="${label}" data-price="${price}">${label}</button>`
      ).join('');
    } else {
      if (storageGroup) storageGroup.style.display = 'none';
    }
  }

  updatePriceDisplay();
}

/* ── Gallery thumbnails ── */
function initGallery() {
  const mainImg = document.getElementById('mainImg');
  const getThumbList = () => document.querySelectorAll('.pdp-thumb');

  document.getElementById('galleryThumbs')?.addEventListener('click', e => {
    const thumb = e.target.closest('.pdp-thumb');
    if (!thumb) return;
    const src = thumb.dataset.src;
    if (mainImg) {
      mainImg.style.opacity = '0';
      setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 150);
    }
    getThumbList().forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });

  if (mainImg) mainImg.style.transition = 'opacity .15s ease';
}

/* ── Zoom modal ── */
function initZoom() {
  const modal    = document.getElementById('zoomModal');
  const zoomImg  = document.getElementById('zoomImg');
  const closeBtn = document.getElementById('zoomClose');
  const zoomBtn  = document.getElementById('galleryZoom');
  const mainImg  = document.getElementById('mainImg');
  const galleryMain = document.getElementById('galleryMain');

  const open  = () => { if (!modal || !zoomImg || !mainImg) return; zoomImg.src = mainImg.src; modal.classList.add('show'); document.body.style.overflow = 'hidden'; };
  const close = () => { modal?.classList.remove('show'); document.body.style.overflow = ''; };

  zoomBtn?.addEventListener('click', open);
  galleryMain?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  modal?.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ── Color options ── */
function initColors() {
  document.getElementById('colorOptions')?.addEventListener('click', e => {
    const btn = e.target.closest('.pdp-color');
    if (!btn) return;
    document.querySelectorAll('.pdp-color').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const label = document.getElementById('colorLabel');
    if (label) label.textContent = btn.dataset.color;
  });
}

/* ── Storage variants ── */
function initStorage() {
  document.getElementById('storageOptions')?.addEventListener('click', e => {
    const btn = e.target.closest('.pdp-variant');
    if (!btn) return;
    document.querySelectorAll('.pdp-variant').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPrice = parseInt(btn.dataset.price, 10);
    updatePriceDisplay();
  });
}

function updatePriceDisplay() {
  const priceEl  = document.getElementById('pdpPrice');
  const stickyEl = document.getElementById('stickyPrice');
  const emiEl    = document.getElementById('pdpEmi');

  if (priceEl) priceEl.innerHTML = `${fmt(currentPrice)}<span>₮</span>`;
  if (stickyEl) stickyEl.textContent = `${fmt(currentPrice)}₮`;
  if (emiEl) emiEl.textContent = `${fmt(Math.ceil(currentPrice / 30))}₮`;
}

/* ── Quantity stepper ── */
function initQty() {
  const minus = document.getElementById('qtyMinus');
  const plus  = document.getElementById('qtyPlus');
  const val   = document.getElementById('qtyVal');
  minus?.addEventListener('click', () => { if (currentQty > 1) { currentQty--; if (val) val.textContent = currentQty; } });
  plus?.addEventListener('click',  () => { if (currentQty < 99) { currentQty++; if (val) val.textContent = currentQty; } });
}

/* ── Tabs ── */
function initTabs() {
  document.querySelectorAll('.pdp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.pdp-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pdp-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const content = document.getElementById(`tab-${target}`);
      if (content) content.classList.add('active');
    });
  });
}

/* ── CTA buttons ── */
function initCTA() {
  const cartBtn    = document.getElementById('pdpBtnCart');
  const buyBtn     = document.getElementById('pdpBtnBuy');
  const stickyCart = document.getElementById('stickyCartBtn');

  const doAddCart = () => {
    if (currentProduct && typeof addToCart === 'function') {
      addToCart(cartBtn, currentProduct.name, currentPrice);
    }
  };

  cartBtn?.addEventListener('click', doAddCart);
  stickyCart?.addEventListener('click', doAddCart);
  buyBtn?.addEventListener('click', () => { doAddCart(); setTimeout(() => { window.location.href = '/cart'; }, 400); });
}

/* ── Wishlist ── */
function initWish() {
  const btn = document.getElementById('wishBtn');
  btn?.addEventListener('click', () => { btn.classList.toggle('active'); if (typeof toggleWish === 'function') toggleWish(btn); });
}

/* ── Sticky bar ── */
function initStickyBar() {
  const bar    = document.getElementById('pdpStickyBar');
  const ctaRow = document.getElementById('pdpCtaRow');
  if (!bar || !ctaRow) return;
  new IntersectionObserver(([entry]) => { bar.classList.toggle('show', !entry.isIntersecting); }, { threshold: 0 }).observe(ctaRow);
}

/* ── Related products ── */
function initRelated(p) {
  const rail = document.getElementById('relatedRail');
  if (!rail) return;

  const related = ALL_PRODUCTS
    .filter(r => r.cat === p.cat && r.id !== p.id)
    .slice(0, 8);

  rail.innerHTML = related.map(r => {
    const orig = r.origPrice || null;
    const pct  = orig ? Math.round((1 - r.price / orig) * 100) : null;
    const ns   = r.name.replace(/'/g, "\\'");
    const bid  = BRAND_IDS[r.brand];
    let badge  = '';
    if (r.badge) badge = `<span class="badge badge-new">${r.badge}</span>`;
    else if (pct) badge = `<span class="badge badge-sale">-${pct}%</span>`;
    const logo = bid ? `<span class="pc__brand"><img src="${brandUrl(bid)}" alt="${r.brand}" loading="lazy" onerror="this.parentElement.style.display='none'"></span>` : '';
    return `<article class="pc" onclick="location.href='product.html?id=${r.id}'" style="cursor:pointer">
  <div class="pc__media">
    ${badge}
    <button class="btn-wish" aria-label="Хадгалах" onclick="event.stopPropagation();toggleWish(this)">${SVG_HEART}</button>
    <img src="${imgUrl(r.id)}" alt="${r.name}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
  </div>
  <div class="pc__body">
    ${logo}
    <h3 class="pc__name">${r.name}</h3>
    <div class="pc__price">
      <span class="price-now">${fmt(r.price)}<span class="currency">₮</span></span>
      ${orig ? `<span class="price-was">${fmt(orig)}₮</span>` : ''}
      ${pct  ? `<span class="price-save">-${pct}%</span>` : ''}
    </div>
    <button class="btn-add-cart" onclick="event.stopPropagation();addToCart(this,'${ns}',${r.price})">${SVG_CART} Сагсанд нэмэх</button>
  </div>
</article>`;
  }).join('');

  const prev = document.getElementById('relPrev');
  const next = document.getElementById('relNext');
  prev?.addEventListener('click', () => rail.scrollBy({ left: -300, behavior: 'smooth' }));
  next?.addEventListener('click', () => rail.scrollBy({ left:  300, behavior: 'smooth' }));
}

/* ── Finance calculator ── */
const FINANCE_PROVIDERS = {
  leasing: {
    name: 'Лизинг',
    sub: 'Худалдаа хөгжлийн банк',
    emoji: '🏦',
    terms: [6, 12, 18, 24, 36],
    defaultTerm: 24,
    applyUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSffoQ2lsSwEwpXqkVCq2rVzPJdl4Imlt9eHZBdeTb1bOzNmUQ/viewform',
  },
  simplebuy: {
    name: 'Simple Buy',
    sub: 'Одоо ав, дараа төл',
    emoji: '💳',
    terms: [3, 6, 12, 18, 24],
    defaultTerm: 12,
    applyUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSffoQ2lsSwEwpXqkVCq2rVzPJdl4Imlt9eHZBdeTb1bOzNmUQ/viewform',
  },
  storepay: {
    name: 'Storepay',
    sub: 'Хүүгүй хуваан төлөлт',
    emoji: '⚡',
    terms: [1, 3, 6, 12, 18, 24, 30],
    defaultTerm: 12,
    applyUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSffoQ2lsSwEwpXqkVCq2rVzPJdl4Imlt9eHZBdeTb1bOzNmUQ/viewform',
  },
};

let fcActiveTerm = 12;

function openFinanceCalc(type) {
  if (type === 'storepay') { openStorepay(); return; }
  if (type === 'simplebuy') { openSimpleBuy(); return; }
  const provider = FINANCE_PROVIDERS[type];
  if (!provider) return;

  const modal = document.getElementById('financeModal');
  if (!modal) return;

  // populate header
  const providerEl = document.getElementById('fcProvider');
  if (providerEl) providerEl.innerHTML = `${provider.emoji} ${provider.name} <span>${provider.sub}</span>`;

  // populate product
  const img = document.getElementById('fcProductImg');
  const name = document.getElementById('fcProductName');
  const price = document.getElementById('fcProductPrice');
  if (img && currentProduct) { img.src = imgUrl(currentProduct.id); img.alt = currentProduct.name; }
  if (name && currentProduct) name.textContent = currentProduct.name;
  if (price) price.textContent = `${fmt(currentPrice)}₮`;

  // apply button
  const applyBtn = document.getElementById('fcApplyBtn');
  if (applyBtn) applyBtn.href = provider.applyUrl;

  // render terms
  fcActiveTerm = provider.defaultTerm;
  renderFcTerms(provider);
  updateFcCalc();

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function renderFcTerms(provider) {
  const termsEl = document.getElementById('fcTerms');
  if (!termsEl) return;
  termsEl.innerHTML = provider.terms.map(t =>
    `<button class="fc-term-btn${t === fcActiveTerm ? ' active' : ''}" data-term="${t}">${t} сар</button>`
  ).join('');
}

function updateFcCalc() {
  const monthly = Math.ceil(currentPrice / fcActiveTerm);
  const monthlyEl = document.getElementById('fcMonthly');
  const totalEl   = document.getElementById('fcTotal');
  if (monthlyEl) monthlyEl.textContent = `${fmt(monthly)}₮`;
  if (totalEl)   totalEl.textContent   = `${fmt(currentPrice)}₮`;
}

function closeFinanceCalc() {
  document.getElementById('financeModal')?.classList.remove('show');
  document.body.style.overflow = '';
}

/* ── Storepay dedicated modal ── */
const SP_TERMS = [
  { period: '45 хоногт', days: 45,  count: 4,  tag: null },
  { period: '60 хоногт', days: 60,  count: 3,  tag: null },
  { period: '4 сард',    days: 120, count: 5,  tag: null },
  { period: '60 хоногт', days: 60,  count: 4,  tag: null },
  { period: '30 сард',   days: 900, count: 30, tag: 'Урьдчилгаагүй', tagColor: 'green', rainbow: true },
  { period: '45 хоногт', days: 45,  count: 3,  tag: 'Тун удахгүй',   tagColor: 'red',   disabled: true },
];
let spActiveTerm = SP_TERMS[0];

function openStorepay() {
  const modal = document.getElementById('storepayModal');
  if (!modal) return;
  spActiveTerm = SP_TERMS[0];
  renderSpTerms();
  renderSpSchedule();
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeStorepay() {
  document.getElementById('storepayModal')?.classList.remove('show');
  document.body.style.overflow = '';
}

function renderSpTerms() {
  const el = document.getElementById('spTerms');
  if (!el) return;
  el.innerHTML = SP_TERMS.map((t, i) => {
    const isActive = t === spActiveTerm;
    const rainbow  = t.rainbow  ? ' sp-term-card--rainbow' : '';
    const disabled = t.disabled ? ' disabled' : '';
    const tagHtml  = t.tag ? `<span class="sp-term-tag sp-term-tag--${t.tagColor}">${t.tag}</span>` : '';
    return `<div class="sp-term-card${isActive ? ' active' : ''}${rainbow}${disabled}" data-idx="${i}">
  <span class="sp-term-period">${t.period}</span>
  <span class="sp-term-badge">${t.count}</span>${tagHtml}
</div>`;
  }).join('');
}

function spProgressIcon(i, count) {
  const pct = count <= 1 ? 1 : i / (count - 1);
  const r = 14, cx = 18, cy = 18, stroke = 3;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  const gap  = circ - dash;
  // rotate so arc starts at top
  const rotate = -90;
  return `<svg width="36" height="36" viewBox="0 0 36 36" class="sp-prog-svg">
    <defs>
      <linearGradient id="spg${i}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6"/>
        <stop offset="100%" stop-color="#06b6d4"/>
      </linearGradient>
    </defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e5e7eb" stroke-width="${stroke}"/>
    ${pct > 0 ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
      stroke="url(#spg${i})" stroke-width="${stroke}"
      stroke-dasharray="${dash} ${gap}"
      stroke-linecap="round"
      transform="rotate(${rotate} ${cx} ${cy})"/>` : ''}
    ${i === 0 ? `<circle cx="${cx}" cy="${cy}" r="4" fill="#3b82f6"/>` : ''}
  </svg>`;
}

function renderSpSchedule() {
  const t = spActiveTerm;
  const amount = Math.ceil(currentPrice / t.count);
  const titleEl = document.getElementById('spScheduleTitle');
  const schedEl = document.getElementById('spSchedule');
  if (!titleEl || !schedEl) return;

  titleEl.textContent = `${t.period} ${t.count} хувааж төлөх`;

  const intervalDays = t.count > 1 ? Math.round(t.days / (t.count - 1)) : t.days;
  const today = new Date();
  const rows = Array.from({ length: t.count }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i * intervalDays);
    const dateStr = i === 0 ? 'Өнөөдөр' : `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
    const label = i === 0 ? 'Одоо төлөх' : `${i+1} дахь төлөлт`;
    return `<div class="sp-schedule-row${i === 0 ? ' sp-schedule-row--first' : ''}">
  <div class="sp-schedule-icon">${spProgressIcon(i, t.count)}</div>
  <div class="sp-schedule-info">
    <div class="sp-schedule-label">${label}</div>
    <div class="sp-schedule-date">${dateStr}</div>
  </div>
  <div class="sp-schedule-amount">${fmt(amount)} ₮</div>
</div>`;
  }).join('');

  const bonusRow = `<div class="sp-schedule-row sp-schedule-bonus">
  <div class="sp-schedule-info"><div class="sp-schedule-label">Танд олгогдох</div></div>
  <div class="sp-bonus-badge"><svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="10" fill="#0a1628"/><text x="10" y="14" text-anchor="middle" fill="white" font-size="9" font-weight="bold">SPC</text></svg> SPC Бонус &nbsp;<strong>+Infinity SPC</strong></div>
</div>`;

  const zaavar = `<div class="sp-zaavar">
  <div class="sp-zaavar__title">Заавар</div>
  <ol class="sp-zaavar__list">
    <li>Бараануудаа сагсанда нэмнэ.</li>
    <li>Төлбөрийн нөхцөл дээрээс Сторпэй-г сонгоно.</li>
    <li>Сторпэй аппликейшнд нэхэмжлэх ирж, эхний төлөлтөө баталгаажуулна.</li>
  </ol>
</div>`;

  schedEl.innerHTML = rows + bonusRow + zaavar;
}

function initStorepay() {
  document.getElementById('spBackdrop')?.addEventListener('click', closeStorepay);
  document.getElementById('spClose')?.addEventListener('click', closeStorepay);
  document.getElementById('spTerms')?.addEventListener('click', e => {
    const card = e.target.closest('.sp-term-card');
    if (!card || card.classList.contains('disabled')) return;
    spActiveTerm = SP_TERMS[parseInt(card.dataset.idx, 10)];
    renderSpTerms();
    renderSpSchedule();
  });
}

/* ── Simple Buy dedicated modal ── */
const SB_TERMS = [
  { months: 3 },
  { months: 6 },
  { months: 12, tag: 'Хамгийн их' },
  { months: 18 },
  { months: 24, tag: 'Урьдчилгаагүй' },
];
let sbActiveTerm = SB_TERMS[2];

function openSimpleBuy() {
  const modal = document.getElementById('simplebuyModal');
  if (!modal) return;
  sbActiveTerm = SB_TERMS[2];
  renderSbTerms();
  renderSbSchedule();
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSimpleBuy() {
  document.getElementById('simplebuyModal')?.classList.remove('show');
  document.body.style.overflow = '';
}

function renderSbTerms() {
  const el = document.getElementById('sbTerms');
  if (!el) return;
  el.innerHTML = SB_TERMS.map((t, i) => {
    const isActive = t === sbActiveTerm;
    return `<div class="sb-term-card${isActive ? ' active' : ''}" data-idx="${i}">
      <span class="sb-term-period">${t.months} сар</span>
      <span class="sb-term-badge">${t.months}</span>
      ${t.tag ? `<span class="sb-term-tag sb-term-tag--green">${t.tag}</span>` : ''}
    </div>`;
  }).join('');
}

function renderSbSchedule() {
  const t = sbActiveTerm;
  const monthly = Math.ceil(currentPrice / t.months);
  const titleEl = document.getElementById('sbScheduleTitle');
  const schedEl = document.getElementById('sbSchedule');
  if (!titleEl || !schedEl) return;

  titleEl.textContent = `${t.months} сар хуваан төлөх`;

  const today = new Date();
  let rows = '';
  for (let i = 0; i < t.months; i++) {
    const d = new Date(today);
    d.setMonth(d.getMonth() + i);
    const dateStr = `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
    const label = i === 0 ? 'Одоо төлөх' : `${i+1} дахь төлөлт`;
    rows += `<div class="sb-schedule-row">
      <div class="sb-schedule-icon">${i === 0 ? '●' : i+1}</div>
      <div class="sb-schedule-info">
        <div class="sb-schedule-label">${label}</div>
        <div class="sb-schedule-date">${dateStr}</div>
      </div>
      <div class="sb-schedule-amount">${fmt(monthly)}₮</div>
    </div>`;
  }
  schedEl.innerHTML = rows;
}

function initSimpleBuy() {
  const backdrop = document.getElementById('sbBackdrop');
  const closeBtn = document.getElementById('sbClose');
  backdrop?.addEventListener('click', closeSimpleBuy);
  closeBtn?.addEventListener('click', closeSimpleBuy);

  document.getElementById('sbTerms')?.addEventListener('click', e => {
    const card = e.target.closest('.sb-term-card');
    if (!card) return;
    sbActiveTerm = SB_TERMS[parseInt(card.dataset.idx, 10)];
    renderSbTerms();
    renderSbSchedule();
  });
}

function initFinanceCalc() {
  // openFinanceCalc already routes storepay/simplebuy; expose globally
  window.openFinanceCalc = openFinanceCalc;

  const backdrop = document.getElementById('financeBackdrop');
  const closeBtn = document.getElementById('financeClose');
  const termsEl  = document.getElementById('fcTerms');

  closeBtn?.addEventListener('click', closeFinanceCalc);
  backdrop?.addEventListener('click', closeFinanceCalc);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeFinanceCalc(); closeStorepay(); closeSimpleBuy(); } });

  termsEl?.addEventListener('click', e => {
    const btn = e.target.closest('.fc-term-btn');
    if (!btn) return;
    fcActiveTerm = parseInt(btn.dataset.term, 10);
    termsEl.querySelectorAll('.fc-term-btn').forEach(b => b.classList.toggle('active', b === btn));
    updateFcCalc();
  });

  initStorepay();
  initSimpleBuy();
}

function openFinanceCalcGeneric(type) {
  openFinanceCalc_inner(type);
}
function openFinanceCalc_inner(type) {
  const provider = FINANCE_PROVIDERS[type];
  if (!provider) return;
  const modal = document.getElementById('financeModal');
  if (!modal) return;
  const providerEl = document.getElementById('fcProvider');
  if (providerEl) providerEl.innerHTML = `${provider.emoji} ${provider.name} <span>${provider.sub}</span>`;
  const img = document.getElementById('fcProductImg');
  const name = document.getElementById('fcProductName');
  const price = document.getElementById('fcProductPrice');
  if (img && currentProduct) { img.src = imgUrl(currentProduct.id); img.alt = currentProduct.name; }
  if (name && currentProduct) name.textContent = currentProduct.name;
  if (price) price.textContent = `${fmt(currentPrice)}₮`;
  const applyBtn = document.getElementById('fcApplyBtn');
  if (applyBtn) applyBtn.href = provider.applyUrl;
  fcActiveTerm = provider.defaultTerm;
  renderFcTerms(provider);
  updateFcCalc();
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id     = parseInt(params.get('id'), 10);
  const p      = ALL_PRODUCTS.find(x => x.id === id) || ALL_PRODUCTS[0];

  populatePage(p);
  initGallery();
  initZoom();
  initColors();
  initStorage();
  initQty();
  initTabs();
  initCTA();
  initWish();
  initStickyBar();
  initRelated(p);
  initFinanceCalc();
});

})();
