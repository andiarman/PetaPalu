/**
 * Scraper Komprehensif Google Maps Khusus SPBU (Pom Bensin) & Seluruh Tempat Ibadah di Kota Palu
 * - SPBU Pertamina & Pertashop (Bahan Bakar, Fasilitas Toilet, Musholla, Angin/Nitrogen, ATM)
 * - Masjid & Musholla (Tempat Ibadah Umat Islam)
 * - Gereja Kristen Protestan & Katolik (Tempat Ibadah Umat Kristen & Katolik)
 * - Pura (Tempat Ibadah Umat Hindu)
 * - Vihara, Klenteng & Cetiya (Tempat Ibadah Umat Buddha & Konghucu)
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'places', 'palu-spbu-ibadah.json');

const QUERIES = [
  // 1. SPBU & POM BENSIN
  'spbu palu',
  'pom bensin palu',
  'spbu pertamina palu',
  'spbu 24 jam palu',
  'pertashop palu',
  'spbu diponegoro palu',
  'spbu gajah mada palu',
  'spbu pramuka palu',
  'spbu ki hajar dewantara palu',
  'spbu moh hatta palu',
  'spbu kartini palu',
  'spbu bypass mamboro palu',
  'spbu tondo palu',
  'spbu tavanjuka palu',
  'spbu tawanjuka palu',
  'spbu martadinata palu',
  'spbu soekarno hatta palu',
  'spbu maluku palu',
  'spbu sudirman palu',
  'spbu i gusti ngurah rai palu',
  'spbu sis aljufri palu',
  'spbu dewi sartika palu',
  'spbu basuki rahmat palu',
  'spbu vetran palu',
  'spbu veteran palu',
  'spbu sintuvu palu',
  'spbu boyaoge palu',
  'spbu pengawu palu',
  'spbu tipo palu',
  'spbu pantoloan palu',
  'spbu kayu malue palu',
  'spbu palu timur',
  'spbu palu barat',
  'spbu palu selatan',
  'spbu mantikulore palu',
  'spbu tatanga palu',
  'spbu ulujadi palu',
  'spbu palu utara',
  'spbu tawaeli palu',

  // 2. MASJID & MUSHOLLA
  'masjid raya palu',
  'masjid agung palu',
  'masjid jami palu',
  'masjid alkhairaat palu',
  'masjid terapung palu',
  'masjid baiturrahim palu',
  'masjid darussalam palu',
  'masjid nurul huda palu',
  'masjid al mujahidin palu',
  'masjid al munawwarah palu',
  'masjid al ikhlas palu',
  'masjid nurul iman palu',
  'masjid al muhajirin palu',
  'masjid at taqwa palu',
  'masjid an nur palu',
  'masjid nurul yaqin palu',
  'masjid babussalam palu',
  'masjid al falah palu',
  'masjid al huda palu',
  'masjid baitul makmur palu',
  'masjid ukhuwah islamiyah palu',
  'masjid al azhar palu',
  'masjid raya lolu palu',
  'masjid besusu palu',
  'masjid talise palu',
  'masjid tondo palu',
  'masjid lasoani palu',
  'masjid kawatuna palu',
  'masjid birobuli palu',
  'masjid petobo palu',
  'masjid tavanjuka palu',
  'masjid pengawu palu',
  'masjid boyaoge palu',
  'masjid b силу palu',
  'masjid kamonji palu',
  'masjid siranindi palu',
  'masjid tipo palu',
  'masjid buluri palu',
  'masjid watusampu palu',
  'masjid mamboro palu',
  'masjid taipa palu',
  'masjid kayumalue palu',
  'masjid pantoloan palu',
  'masjid baiya palu',
  'musholla palu timur',
  'musholla palu barat',
  'musholla palu selatan',
  'musholla mantikulore palu',

  // 3. GEREJA KRISTEN PROTESTAN & KATOLIK
  'gereja palu',
  'gereja katolik palu',
  'gereja kristen palu',
  'gereja santa maria palu',
  'gereja toraja palu',
  'gereja gkst palu',
  'gereja gpdi palu',
  'gereja gbi palu',
  'gereja bethel palu',
  'gereja pantekosta palu',
  'gereja advent palu',
  'gereja hkbp palu',
  'gereja kibaid palu',
  'gereja bala keselamatan palu',
  'gereja bk korps palu',
  'gereja immanuel palu',
  'gereja sion palu',
  'gereja efrata palu',
  'gereja maranatha palu',
  'gereja getsemani palu',
  'gereja betlehem palu',
  'gereja syalom palu',
  'gereja marturia palu',
  'gereja moria palu',
  'gereja hosana palu',
  'gereja jemaat kristus palu',
  'gereja kristen sulawesi tengah palu',
  'gereja katolik paroki palu',
  'gereja palu timur',
  'gereja palu barat',
  'gereja palu selatan',
  'gereja mantikulore palu',
  'gereja tatanga palu',
  'gereja ulujadi palu',

  // 4. PURA HINDU
  'pura palu',
  'pura agung wanakertha palu',
  'pura agung palu',
  'pura hindu palu',
  'pura jagatnatha palu',
  'pura dalem palu',
  'pura prajapati palu',
  'pura segara palu',
  'pura tondo mantikulore palu',
  'pura talise palu',
  'pura kawatuna palu',
  'pura lasoani palu',
  'pura palu selatan',
  'pura palu timur',

  // 5. VIHARA, KLENTENG & CETIYA (BUDDHA & KONGHUCU)
  'vihara palu',
  'vihara karuna dipa palu',
  'vihara maitreya palu',
  'vihara sasana subhasita palu',
  'klenteng palu',
  'klenteng jin de yuan palu',
  'klenteng kwan te bio palu',
  'klenteng kwan kong palu',
  'cetiya palu',
  'vihara buddha palu',
  'tempat ibadah tridharma palu',
  'klenteng palu barat',
  'vihara palu timur'
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
  if (addr.includes('petobo')) return 'Palu Selatan';
  if (addr.includes('kawatuna')) return 'Mantikulore';
  if (addr.includes('lasoani')) return 'Mantikulore';
  if (addr.includes('poboya')) return 'Mantikulore';
  if (addr.includes('layana')) return 'Mantikulore';
  if (addr.includes('donggala kodi')) return 'Ulujadi';
  if (addr.includes('kabonena')) return 'Ulujadi';
  if (addr.includes('tipo')) return 'Ulujadi';
  if (addr.includes('buluri')) return 'Ulujadi';
  if (addr.includes('watusampu')) return 'Ulujadi';
  if (addr.includes('boyaoge')) return 'Tatanga';
  if (addr.includes('pengawu')) return 'Tatanga';
  if (addr.includes('tavanjuka') || addr.includes('tawanjuka')) return 'Tatanga';
  if (addr.includes('palupi')) return 'Tatanga';
  if (addr.includes('duyu')) return 'Tatanga';
  if (addr.includes('mamboro')) return 'Palu Utara';
  if (addr.includes('taipa')) return 'Palu Utara';
  if (addr.includes('kayumalue')) return 'Palu Utara';
  if (addr.includes('pantoloan')) return 'Tawaeli';
  if (addr.includes('baiya')) return 'Tawaeli';
  if (addr.includes('kamonji') || addr.includes('siranindi') || addr.includes('ujuna')) return 'Palu Barat';
  return 'Kota Palu';
}

function classifyFacility(name, typeStr) {
  const n = (name || '').toLowerCase();
  const t = (typeStr || '').toLowerCase();

  // 1. SPBU & POM BENSIN
  if (n.includes('pertashop') || n.includes('pom mini')) {
    return {
      category: 'pertashop',
      categoryLabel: 'Pertashop & Pom Mini Resmi',
      icon: '🛢️'
    };
  }

  if (
    n.includes('spbu') || n.includes('pom bensin') || n.includes('pertamina') ||
    n.includes('gas station') || t.includes('gas station') || t.includes('spbu') ||
    n.match(/\b74\.\d{3}\b/) || n.match(/\b71\.\d{3}\b/)
  ) {
    return {
      category: 'spbu',
      categoryLabel: 'SPBU & Pom Bensin',
      icon: '⛽'
    };
  }

  // 2. PURA (HINDU)
  if (
    n.includes('pura') || t.includes('hindu temple') || t.includes('pura') ||
    n.includes('wanakertha') || n.includes('jagatnatha') || n.includes('prajapati')
  ) {
    return {
      category: 'pura',
      categoryLabel: 'Pura Hindu',
      icon: '🛕'
    };
  }

  // 3. VIHARA & KLENTENG (BUDDHA & KONGHUCU)
  if (
    n.includes('vihara') || n.includes('klenteng') || n.includes('kelenteng') ||
    n.includes('cetiya') || n.includes('buddha') || n.includes('tridharma') ||
    t.includes('buddhist temple') || t.includes('vihara') || n.includes('karuna dipa') ||
    n.includes('jin de yuan') || n.includes('kwan te bio') || n.includes('maitreya')
  ) {
    return {
      category: 'vihara',
      categoryLabel: 'Vihara & Klenteng',
      icon: '🪷'
    };
  }

  // 4. GEREJA (KRISTEN PROTESTAN & KATOLIK)
  if (
    n.includes('gereja') || n.includes('church') || t.includes('church') ||
    n.includes('gkst') || n.includes('gpdi') || n.includes('gbi') ||
    n.includes('bethel') || n.includes('katolik') || n.includes('toraja') ||
    n.includes('pantekosta') || n.includes('advent') || n.includes('hkbp') ||
    n.includes('kibaid') || n.includes('bala keselamatan') || n.includes('santa maria') ||
    n.includes('immanuel') || n.includes('maranatha') || n.includes('sion')
  ) {
    return {
      category: 'gereja',
      categoryLabel: 'Gereja (Kristen & Katolik)',
      icon: '⛪'
    };
  }

  // 5. MASJID & MUSHOLLA (ISLAM)
  return {
    category: 'masjid',
    categoryLabel: 'Masjid & Musholla',
    icon: '🕌'
  };
}

function extractFeatures(name, category, typeStr) {
  const n = (name || '').toLowerCase();
  const feats = [];

  if (category === 'spbu') {
    feats.push('Pertalite & Pertamax');
    feats.push('Solar / Dexlite');
    feats.push('Toilet & Musholla');
    feats.push('Angin / Nitrogen');
    if (n.includes('24 jam') || n.includes('maluku') || n.includes('pramuka') || n.includes('tondo')) {
      feats.unshift('Buka 24 Jam');
    }
  } else if (category === 'pertashop') {
    feats.push('Pertamax Berkualitas');
    feats.push('Pengisian Cepat');
    feats.push('Pelumas Pertamina');
  } else if (category === 'masjid') {
    feats.push('Sholat 5 Waktu');
    feats.push('Tempat Wudhu Nyaman');
    feats.push('Kajian & Pengajian');
    if (n.includes('raya') || n.includes('agung') || n.includes('jami') || n.includes('alkhairaat')) {
      feats.unshift('Sholat Jumat & Hari Raya');
      feats.push('Parkir Luas & Jamaah Besar');
    }
  } else if (category === 'gereja') {
    feats.push('Ibadah Minggu Rutin');
    feats.push('Persekutuan Doa');
    feats.push('Sekolah Minggu & Remaja');
    if (n.includes('katolik') || n.includes('santa maria')) {
      feats.unshift('Misa Kudus & Sakramen');
    }
  } else if (category === 'pura') {
    feats.push('Persembahyangan Purnama & Tilem');
    feats.push('Upacara Hari Raya Nyepi');
    feats.push('Pendidikan Pasraman');
  } else if (category === 'vihara') {
    feats.push('Kebaktian Rutin');
    feats.push('Meditasi & Puja Bakti');
    feats.push('Perayaan Waisak & Imlek');
  }

  return feats;
}

function estimateHours(category, name) {
  const n = (name || '').toLowerCase();

  if (category === 'spbu') {
    const is24h = n.includes('24 jam') || n.includes('maluku') || n.includes('pramuka') || n.includes('tondo') || n.includes('kartini');
    if (is24h) {
      return {
        isOpen24Hours: true,
        openTime: '00:00',
        closeTime: '23:59',
        hoursText: 'Buka 24 Jam',
        weekdayDescriptions: [
          'Setiap Hari: Buka 24 Jam Non-Stop'
        ]
      };
    }
    return {
      isOpen24Hours: false,
      openTime: '06:00',
      closeTime: '22:00',
      hoursText: '06:00 - 22:00',
      weekdayDescriptions: [
        'Senin - Minggu: 06:00 – 22:00 WITA'
      ]
    };
  }

  if (category === 'pertashop') {
    return {
      isOpen24Hours: false,
      openTime: '07:00',
      closeTime: '21:00',
      hoursText: '07:00 - 21:00',
      weekdayDescriptions: [
        'Senin - Minggu: 07:00 – 21:00 WITA'
      ]
    };
  }

  if (category === 'masjid') {
    return {
      isOpen24Hours: true,
      openTime: '04:00',
      closeTime: '22:00',
      hoursText: 'Terbuka Untuk Jamaah / Buka Waktu Sholat',
      weekdayDescriptions: [
        'Setiap Hari: Terbuka untuk Sholat Fardhu & Ibadah Mandiri',
        'Jumat: Sholat Jumat Berjamaah 11:30 – 13:00 WITA'
      ]
    };
  }

  if (category === 'gereja') {
    return {
      isOpen24Hours: false,
      openTime: '07:00',
      closeTime: '19:00',
      hoursText: 'Jadwal Ibadah Minggu & Hari Khusus',
      weekdayDescriptions: [
        'Minggu: Ibadah Pagi & Sore (07:00 – 19:00 WITA)',
        'Hari Kerja: Kantor Gereja & Persekutuan Kategorial'
      ]
    };
  }

  if (category === 'pura' || category === 'vihara') {
    return {
      isOpen24Hours: false,
      openTime: '07:00',
      closeTime: '20:00',
      hoursText: '07:00 - 20:00',
      weekdayDescriptions: [
        'Setiap Hari: Terbuka untuk Sembahyang & Kebaktian',
        'Hari Raya Keagamaan: Buka Khusus Sepanjang Hari'
      ]
    };
  }

  return {
    isOpen24Hours: false,
    openTime: '07:00',
    closeTime: '20:00',
    hoursText: 'Buka Jam Operasional',
    weekdayDescriptions: ['Buka sesuai jadwal kegiatan']
  };
}

async function searchGoogleMaps(query) {
  try {
    const url = 'https://www.google.com/maps/search/' + encodeURIComponent(query);
    const res1 = await fetch(url, {
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
        id: id || `palu_fac_${cleanName(name)}`,
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
  console.log('🚀 Memulai scraping Google Maps untuk SPBU & Seluruh Tempat Ibadah di Kota Palu...');
  const placesMap = new Map();

  for (let i = 0; i < QUERIES.length; i++) {
    const q = QUERIES[i];
    process.stdout.write(`[${i + 1}/${QUERIES.length}] Query: "${q}"... `);
    const results = await searchGoogleMaps(q);
    let added = 0;

    for (const r of results) {
      const key = `${r.lat.toFixed(4)}_${r.lon.toFixed(4)}`;
      const nameKey = cleanName(r.name);

      if (!placesMap.has(key) && !placesMap.has(nameKey)) {
        const classInfo = classifyFacility(r.name, r.typeStr);
        const kecamatan = extractKecamatan(r.address);
        const features = extractFeatures(r.name, classInfo.category, r.typeStr);
        const hours = estimateHours(classInfo.category, r.name);

        let priceRange = 'Fasilitas Umum & Ibadah Gratis';
        if (classInfo.category === 'spbu') {
          priceRange = 'Harga Resmi BBM Pertamina';
        } else if (classInfo.category === 'pertashop') {
          priceRange = 'Harga Resmi Pertamax';
        }

        const placeObj = {
          id: r.id,
          name: r.name,
          category: classInfo.category,
          categoryLabel: classInfo.categoryLabel,
          icon: classInfo.icon,
          lat: r.lat,
          lon: r.lon,
          address: r.address,
          kecamatan: kecamatan,
          phone: r.phone,
          priceRange: priceRange,
          features: features,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + ' ' + r.address)}`,
          typeStr: r.typeStr || classInfo.categoryLabel,
          operatingHours: hours
        };

        placesMap.set(key, placeObj);
        placesMap.set(nameKey, placeObj);
        added++;
      }
    }

    console.log(`+${added} baru (Total unik: ${Math.floor(placesMap.size / 2)})`);
    await sleep(700);
  }

  // Ambil data unik
  const uniquePlaces = Array.from(new Set(placesMap.values()));
  console.log(`\n✅ Berhasil mengumpulkan ${uniquePlaces.length} titik unik SPBU & Tempat Ibadah di Kota Palu!`);

  // Distribusi kategori
  const stats = {};
  for (const p of uniquePlaces) {
    stats[p.category] = (stats[p.category] || 0) + 1;
  }
  console.log('📊 Rincian per Kategori:');
  for (const [k, count] of Object.entries(stats)) {
    console.log(`  - ${k}: ${count} titik`);
  }

  // Simpan ke data/places/palu-spbu-ibadah.json
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(uniquePlaces, null, 2), 'utf8');
  console.log(`\n💾 Dataset disimpan ke: ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
