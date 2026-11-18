/**
 * Scraper Komprehensif Google Maps Khusus Toko Komputer, Laptop, HP, Elektronik, & Jasa Servis di Kota Palu
 * Menyisir seluruh toko penjualan hardware/gadget dan pusat reparasi/servis resmi maupun independen:
 * - Toko Komputer, Laptop, PC Gaming, Sparepart & Aksesoris
 * - Toko HP, Smartphone, Counter Pulsa & Handphone, Distributor Resmi
 * - Toko Alat Elektronik Rumah Tangga, TV, Audio, AC, Kulkas
 * - Jasa Servis Laptop, Komputer, Motherboard, Instalasi & Printer
 * - Jasa Servis HP, Ganti LCD, Ganti Baterai, Teknisi Ponsel
 * - Jasa Servis Elektronik (TV LED/LCD, AC, Kulkas, Mesin Cuci, Audio)
 * - Authorized Service Center Resmi Brand (Asus, Acer, Lenovo, Samsung, Xiaomi, Oppo, Vivo, Epson, dll.)
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'places', 'palu-hardware-service.json');

const QUERIES = [
  // 1. Toko Komputer & Laptop
  'toko komputer palu',
  'toko laptop palu',
  'computer store palu',
  'toko pc gaming palu',
  'sparepart komputer laptop palu',
  'aksesoris komputer palu',
  'palu computer',
  'kharisma computer palu',
  'aneka komputer palu',
  'multicom palu',
  'mega computer palu',
  'indo computer palu',
  'galaxy computer palu',
  'bintang computer palu',

  // 2. Toko HP & Smartphone
  'toko hp palu',
  'counter hp palu',
  'konter hp palu',
  'toko handphone palu',
  'pusat hp palu',
  'erafone palu',
  'samsung store palu',
  'oppo store palu',
  'vivo store palu',
  'xiaomi store palu',
  'ibox palu',
  'digimap palu',
  'toko smartphone palu',
  'aksesoris hp smartphone palu',
  'distributor hp palu',

  // 3. Toko Alat Elektronik Rumah Tangga & Audio
  'toko elektronik palu',
  'toko alat elektronik palu',
  'alaska elektronik palu',
  'metro elektronik palu',
  'surya elektronik palu',
  'sahabat elektronik palu',
  'jaya elektronik palu',
  'audio sound system elektronik palu',
  'toko tv led kulkas ac palu',
  'komponen elektronik sparepart palu',
  'toko perlengkapan elektronik palu',

  // 4. Jasa Servis Komputer, Laptop & Printer
  'service laptop palu',
  'servis laptop palu',
  'service komputer palu',
  'servis komputer palu',
  'reparasi laptop palu',
  'tempat servis laptop palu',
  'servis printer palu',
  'service printer palu',
  'bengkel laptop komputer palu',
  'ganti keyboard lcd laptop palu',
  'servis motherboard laptop palu',
  'teknisi komputer palu',

  // 5. Jasa Servis HP & Smartphone
  'service hp palu',
  'servis hp palu',
  'service handphone palu',
  'servis handphone palu',
  'ganti lcd hp palu',
  'ganti baterai hp palu',
  'reparasi hp palu',
  'teknisi hp smartphone palu',
  'tempat servis hp palu',
  'bengkel hp palu',
  'servis hp iphone android palu',
  'flash unlock hp palu',

  // 6. Jasa Servis Elektronik Rumah Tangga (TV, Kulkas, AC)
  'service elektronik palu',
  'servis elektronik palu',
  'service tv palu',
  'servis tv led palu',
  'service ac palu',
  'servis ac palu',
  'service kulkas palu',
  'servis kulkas palu',
  'service mesin cuci palu',
  'servis mesin cuci palu',
  'bengkel service elektronik palu',
  'reparasi elektronik panggilan palu',
  'tukang servis tv ac palu',

  // 7. Authorized Service Center Resmi Brand
  'asus service center palu',
  'acer service center palu',
  'lenovo service center palu',
  'hp service center palu',
  'samsung service center palu',
  'xiaomi service center palu',
  'oppo service center palu',
  'vivo service center palu',
  'realme service center palu',
  'infinix service center palu',
  'epson service center palu',
  'canon service center palu',
  'polytron service center palu',
  'sharp service center palu',
  'panasonic service center palu',

  // 8. Koridor Jalan Utama Niaga & Pendidikan
  'komputer laptop Jalan Basuki Rahmat Palu',
  'toko hp Jalan Sis Aljufri Palu',
  'elektronik Jalan Hasanuddin Palu',
  'service laptop Jalan Juanda Palu',
  'toko hp Jalan Sam Ratulangi Palu',
  'toko komputer Jalan Diponegoro Palu',
  'toko elektronik Jalan Gajah Mada Palu',
  'service hp Jalan Dewi Sartika Palu',
  'toko laptop komputer Kampus Untad Palu',
  'service hp Tondo Mantikulore Palu',
  'komputer laptop Jalan Emmy Saelan Palu',
  'toko hp Palu Grand Mall',
  'toko elektronik Palu Plaza Mall Tatura',
  'service elektronik Jalan Towua Palu',
  'servis tv kulkas Jalan Monginsidi Palu',
  'toko elektronik Jalan Moh Hatta Palu',
  'toko komputer Jalan Sedap Malam Palu',
  'counter hp Jalan I Gusti Ngurah Rai Palu',

  // 9. Per Wilayah Kecamatan
  'toko komputer hp Palu Timur',
  'toko komputer hp Palu Barat',
  'toko komputer hp Palu Selatan',
  'toko komputer hp Mantikulore Palu',
  'toko komputer hp Tatanga Palu',
  'toko komputer hp Ulujadi Palu',
  'service hp komputer Palu Timur',
  'service hp komputer Palu Barat',
  'service hp komputer Palu Selatan',
  'service hp komputer Mantikulore Palu'
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanName(n) {
  return (n || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function extractKecamatan(address) {
  const addr = (address || '').toLowerCase();
  if (addr.includes('palu timur') || addr.includes('palu tim.')) return 'Palu Timur';
  if (addr.includes('palu barat') || addr.includes('palu bar.')) return 'Palu Barat';
  if (addr.includes('palu selatan') || addr.includes('palu sel.')) return 'Palu Selatan';
  if (addr.includes('mantikulore')) return 'Mantikulore';
  if (addr.includes('tatanga')) return 'Tatanga';
  if (addr.includes('ulujadi')) return 'Ulujadi';
  if (addr.includes('palu utara')) return 'Palu Utara';
  if (addr.includes('tawaeli')) return 'Tawaeli';
  if (addr.includes('tondo')) return 'Mantikulore';
  if (addr.includes('talise')) return 'Palu Timur';
  if (addr.includes('besusu')) return 'Palu Timur';
  if (addr.includes('lolu')) return 'Palu Timur';
  if (addr.includes('birobuli')) return 'Palu Selatan';
  if (addr.includes('tatura')) return 'Palu Selatan';
  if (addr.includes('palupi')) return 'Tatanga';
  if (addr.includes('lere')) return 'Palu Barat';
  if (addr.includes('ujuna')) return 'Palu Barat';
  if (addr.includes('kamonji')) return 'Palu Barat';
  return 'Kota Palu';
}

function determineCategory(name, typeStr) {
  const n = (name || '').toLowerCase();
  const t = (typeStr || '').toLowerCase();

  // 1. Authorized / Official Service Center
  if (
    n.includes('service center') ||
    n.includes('service centre') ||
    n.includes('authorized') ||
    n.includes('pusat servis resmi')
  ) {
    return {
      category: 'official_service',
      categoryLabel: 'Service Center Resmi Brand',
      icon: '🏢'
    };
  }

  // 2. Servis Komputer, Laptop & Printer
  if (
    (n.includes('service') || n.includes('servis') || n.includes('reparasi') || n.includes('bengkel') || n.includes('teknisi')) &&
    (n.includes('laptop') || n.includes('komputer') || n.includes('computer') || n.includes('pc') || n.includes('printer'))
  ) {
    return {
      category: 'servis_komputer',
      categoryLabel: 'Servis Laptop & Komputer',
      icon: '🛠️'
    };
  }

  // 3. Servis HP & Smartphone
  if (
    (n.includes('service') || n.includes('servis') || n.includes('reparasi') || n.includes('bengkel') || n.includes('teknisi') || n.includes('ganti lcd') || n.includes('ganti baterai')) &&
    (n.includes('hp') || n.includes('handphone') || n.includes('phone') || n.includes('smartphone') || n.includes('iphone') || n.includes('android'))
  ) {
    return {
      category: 'servis_hp',
      categoryLabel: 'Servis HP & Smartphone',
      icon: '📲'
    };
  }

  // 4. Servis Elektronik Rumah Tangga (TV, AC, Kulkas, Mesin Cuci)
  if (
    n.includes('service') || n.includes('servis') || n.includes('reparasi') || n.includes('bengkel') ||
    t.includes('perbaikan') || t.includes('reparasi')
  ) {
    return {
      category: 'servis_elektronik',
      categoryLabel: 'Servis Elektronik & AC/TV',
      icon: '🔧'
    };
  }

  // 5. Toko Komputer, Laptop & Aksesoris
  if (
    n.includes('computer') || n.includes('komputer') || n.includes('laptop') || n.includes('gaming') ||
    t.includes('komputer') || t.includes('computer')
  ) {
    return {
      category: 'komputer',
      categoryLabel: 'Toko Komputer & Laptop',
      icon: '💻'
    };
  }

  // 6. Toko HP & Smartphone
  if (
    n.includes('cell') || n.includes('cellular') || n.includes('selular') || n.includes('seluler') ||
    n.includes('phone') || n.includes('gadget') || n.includes('erafone') || n.includes('counter') ||
    n.includes('konter') || n.includes('samsung') || n.includes('oppo') || n.includes('vivo') ||
    n.includes('xiaomi') || n.includes('realme') || n.includes('infinix') || n.includes('ibox') ||
    n.includes('digimap') || t.includes('ponsel') || t.includes('handphone') || t.includes('telepon seluler')
  ) {
    return {
      category: 'hp',
      categoryLabel: 'Toko HP & Smartphone',
      icon: '📱'
    };
  }

  // 7. Toko Alat Elektronik Rumah Tangga / Toko Komponen Elektronik
  return {
    category: 'elektronik',
    categoryLabel: 'Toko Alat Elektronik',
    icon: '🔌'
  };
}

function extractFeatures(name, category, typeStr) {
  const n = (name || '').toLowerCase();
  const feats = [];

  if (category === 'official_service') {
    feats.push('Garansi Resmi Brand', 'Suku Cadang Asli', 'Teknisi Tersertifikasi');
    if (n.includes('asus')) feats.push('Asus ROG & Zenbook Specialist');
    if (n.includes('acer')) feats.push('Acer Predator Specialist');
    if (n.includes('samsung')) feats.push('Samsung Galaxy Specialist');
    if (n.includes('xiaomi')) feats.push('Xiaomi & Redmi Official');
    if (n.includes('epson')) feats.push('Epson EcoTank Specialist');
  } else if (category === 'servis_komputer') {
    feats.push('Reparasi Laptop Mati Total', 'Ganti Keyboard & LCD', 'Instalasi OS & Software');
    if (n.includes('printer')) feats.push('Servis Printer & Infus');
    if (n.includes('motherboard') || n.includes('chipset')) feats.push('Servis Motherboard/Chipset');
    feats.push('Pembersihan Fan & Pasta Thermal');
  } else if (category === 'servis_hp') {
    feats.push('Ganti LCD & Touchscreen', 'Ganti Baterai Original', 'Perbaikan Port Charger');
    if (n.includes('iphone') || n.includes('apple')) feats.push('Spesialis iPhone & iPad');
    feats.push('Software, Bootloop & Unlocking');
  } else if (category === 'servis_elektronik') {
    feats.push('Servis TV LED/Smart TV', 'Perbaikan Kulkas & AC', 'Servis Mesin Cuci');
    feats.push('Bisa Panggilan / Antar Jemput');
  } else if (category === 'komputer') {
    feats.push('Laptop Baru & Bekas Berkualitas', 'Rakit PC Gaming & Office', 'Sparepart & Aksesoris');
    feats.push('Printer, Tinta & Networking');
  } else if (category === 'hp') {
    feats.push('Jual Beli Smartphone Baru & Second', 'Aksesoris & Casing HP', 'Tempered Glass & Charger');
    if (n.includes('erafone') || n.includes('official') || n.includes('store')) feats.push('Garansi Resmi Indonesia');
  } else {
    feats.push('Alat Elektronik Rumah Tangga', 'TV LED, Audio & Kulkas', 'Komponen & Sparepart Elektronik');
  }

  return feats;
}

function parseHours(name) {
  const is24h = /24\s*jam/i.test(name);
  if (is24h) {
    return {
      isOpen24Hours: true,
      openTime: '00:00',
      closeTime: '23:59',
      hoursText: 'Buka 24 Jam Non-Stop',
      weekdayDescriptions: ['Setiap hari: Buka 24 Jam']
    };
  }

  // Jam operasional tipikal toko komputer, gadget & bengkel servis di Palu
  const isMall = /mall|palu grand mall|pgm|plaza/i.test(name);
  const openTime = isMall ? '10:00' : '08:30';
  const closeTime = isMall ? '22:00' : '21:00';

  return {
    isOpen24Hours: false,
    openTime: openTime,
    closeTime: closeTime,
    hoursText: `${openTime} - ${closeTime}`,
    weekdayDescriptions: [
      `Senin - Sabtu: ${openTime} – ${closeTime} WITA`,
      `Minggu: ${isMall ? '10:00 – 22:00' : '10:00 – 17:00 / Buka Fleksibel'}`
    ]
  };
}

async function fetchGmapsQuery(query) {
  const gmapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@-0.895,119.870,13z/data=!3m1!4b1?hl=id`;
  try {
    const res1 = await fetch(gmapsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    const html = await res1.text();
    const match = html.match(/href="(\/search\?tbm=map[^"]+)"/);
    if (!match) return [];

    const rpcUrl = 'https://www.google.com' + match[1].replace(/&amp;/g, '&');
    const res2 = await fetch(rpcUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': 'https://www.google.com/maps'
      }
    });

    const text = await res2.text();
    const clean = text.replace(/^\)\]\}'/, '');
    let data;
    try {
      data = JSON.parse(clean);
    } catch (err) {
      return [];
    }

    const list = data[64] || [];
    const places = [];

    for (let i = 0; i < list.length; i++) {
      const item = list[i]?.[1];
      if (!item) continue;

      const id = item[78] || item[10];
      const name = item[11];
      const coords = item[9];
      const lat = coords?.[2];
      const lon = coords?.[3];
      const rawAddr = item[18] || item[39] || item[2];
      const typeStr = item[13] ? item[13][0] : '';
      const phone = item[178] ? item[178][0] : null;

      if (!name || !lat || !lon) continue;

      // Filter koordinat lembah Palu & sekitarnya
      if (lat < -1.15 || lat > -0.65 || lon < 119.70 || lon > 120.05) {
        continue;
      }

      // Bersihkan nama tempat
      const cleanPlaceName = name.replace(/^[2-9CFGHJMPQRVWX]{4,8}\+[2-9CFGHJMPQRVWX]{2,3}\s+/, '').trim();

      // Bersihkan format alamat
      let cleanAddress = rawAddr || 'Kota Palu, Sulawesi Tengah';
      cleanAddress = cleanAddress.replace(/^[2-9CFGHJMPQRVWX]{4,8}\+[2-9CFGHJMPQRVWX]{2,3}\s+/, '').trim();
      if (!cleanAddress.toLowerCase().includes('palu')) {
        cleanAddress += ', Kota Palu';
      }

      let cleanPhone = null;
      if (phone) {
        cleanPhone = typeof phone === 'string' ? phone : (Array.isArray(phone) ? phone[0] : null);
        if (typeof cleanPhone !== 'string') cleanPhone = null;
      }

      places.push({
        id: id || `palu_hw_${cleanName(name)}`,
        name: cleanPlaceName,
        lat: lat,
        lon: lon,
        address: cleanAddress,
        typeStr: typeStr,
        phone: cleanPhone
      });
    }

    return places;
  } catch (e) {
    return [];
  }
}

async function main() {
  console.log('========================================================================');
  console.log('   💻📱 SCRAPING TOKO KOMPUTER, HP, ELEKTRONIK & JASA SERVIS PALU     ');
  console.log('   Menyisir seluruh hardware store, gadget & reparasi di Kota Palu     ');
  console.log('========================================================================\n');

  const allPlacesMap = new Map();
  const nameSet = new Set();

  for (let i = 0; i < QUERIES.length; i++) {
    const q = QUERIES[i];
    process.stdout.write(`[${i + 1}/${QUERIES.length}] Memindai: "${q}"... `);
    const places = await fetchGmapsQuery(q);

    let added = 0;
    for (const p of places) {
      const normName = cleanName(p.name);
      if (!normName || normName.length < 3) continue;

      // Deduplikasi ketat berdasarkan kesamaan nama dan koordinat
      let isDuplicate = false;
      for (const [existingKey, existingPlace] of allPlacesMap.entries()) {
        const dist = Math.hypot(existingPlace.lat - p.lat, existingPlace.lon - p.lon);
        // Jika lokasi sangat berdekatan (< 40 meter) atau nama hampir identik
        if (dist < 0.00035 || (normName === cleanName(existingPlace.name) && dist < 0.005)) {
          isDuplicate = true;
          // Lengkapi nomor telepon jika belum ada
          if (!existingPlace.phone && p.phone) {
            existingPlace.phone = p.phone;
          }
          break;
        }
      }

      if (!isDuplicate) {
        const catInfo = determineCategory(p.name, p.typeStr);
        const hours = parseHours(p.name);
        const features = extractFeatures(p.name, catInfo.category, p.typeStr);
        const kecamatan = extractKecamatan(p.address);

        const placeObj = {
          id: p.id,
          name: p.name,
          lat: Number(p.lat.toFixed(6)),
          lon: Number(p.lon.toFixed(6)),
          address: p.address,
          kecamatan: kecamatan,
          category: catInfo.category,
          categoryLabel: catInfo.categoryLabel,
          icon: catInfo.icon,
          phone: p.phone,
          isOpen24Hours: hours.isOpen24Hours,
          openTime: hours.openTime,
          closeTime: hours.closeTime,
          hoursText: hours.hoursText,
          weekdayDescriptions: hours.weekdayDescriptions,
          features: features,
          typeStr: p.typeStr
        };

        allPlacesMap.set(p.id, placeObj);
        added++;
      }
    }

    console.log(`+${added} baru (Total saat ini: ${allPlacesMap.size})`);
    await sleep(700);
  }

  const finalPlaces = Array.from(allPlacesMap.values());
  finalPlaces.sort((a, b) => a.name.localeCompare(b.name, 'id'));

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalPlaces, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log(`✅ SUKSES! Total ${finalPlaces.length} titik hardware & service tersimpan di:`);
  console.log(`   ${OUTPUT_PATH}`);
  console.log('========================================================================');

  // Breakdown per kategori
  const catCounts = {};
  for (const p of finalPlaces) {
    catCounts[p.categoryLabel] = (catCounts[p.categoryLabel] || 0) + 1;
  }
  console.log('\nBreakdown Kategori:');
  for (const [cat, count] of Object.entries(catCounts)) {
    console.log(` - ${cat}: ${count} titik`);
  }
}

main().catch(console.error);
