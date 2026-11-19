/**
 * Scraper Komprehensif Google Maps Khusus Pertamanan dan Fasilitas Pendukung di Kota Palu
 * - Taman Kota & Alun-Alun (Taman Vatulemo, Taman GOR, Taman Gajah Mada, dsb.)
 * - Hutan Kota & Ekowisata (Hutan Kota Kaombona, Hutan Kota Talise, Hutan Mangrove, dsb.)
 * - Taman Pantai & Waterfront (Pantai Talise, Waterfront Teluk Palu, Pantai Mamboro, dsb.)
 * - Sarana Olahraga Publik (Lapangan Vatulemo, GOR Siranindi, Stadion Gawalise, Skatepark, dsb.)
 * - Wisata Puncak & Bukit Alam (Puncak Salena, Bukit Kawatuna, Bukit Doa, Puncak Doda, dsb.)
 * - Taman Bermain & RTH Lingkungan (Taman Lalu Lintas, Taman Kompleks, Playground Anak, dsb.)
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'places', 'palu-pertamanan-fasilitas.json');

const QUERIES = [
  // 1. TAMAN KOTA & ALUN-ALUN
  'taman kota palu',
  'taman palu',
  'taman vatulemo palu',
  'taman walikota palu',
  'taman gor palu',
  'taman gajah mada palu',
  'taman juanda palu',
  'taman patung kuda palu',
  'taman abadi palu',
  'taman bundaran stq palu',
  'taman lalulintas palu',
  'taman segitiga palu',
  'taman makam pahlawan tatura palu',
  'alun alun palu',
  'alun alun kota palu',
  'lapangan vatulemo palu',
  'lapangan walikota palu',
  'taman tondo palu',
  'taman talise palu',
  'taman besusu palu',
  'taman lolu palu',
  'taman birobuli palu',
  'taman kawatuna palu',
  'taman lasoani palu',
  'taman petobo palu',
  'taman tavanjuka palu',
  'taman pengawu palu',
  'taman boyaoge palu',
  'taman palu barat',
  'taman palu timur',
  'taman palu selatan',
  'taman palu utara',
  'taman mantikulore',
  'taman tatanga palu',
  'taman ulujadi palu',
  'taman tawaeli palu',

  // 2. HUTAN KOTA & EKOWISATA / RTH
  'hutan kota palu',
  'hutan kota kaombona palu',
  'taman kaombona palu',
  'hutan kota talise palu',
  'ruang terbuka hijau palu',
  'rth palu',
  'taman agro wisata palu',
  'wisata mangrove palu',
  'hutan mangrove mamboro palu',
  'mangrove taipa palu',
  'mangrove kabonga',
  'arboretum palu',
  'kebun raya palu',

  // 3. TAMAN PANTAI & WATERFRONT
  'pantai talise palu',
  'taman pantai talise palu',
  'taman jembatan palu iv',
  'waterfront palu',
  'kampung nelayan palu',
  'taman kampung nelayan palu',
  'pantai mamboro palu',
  'pantai taipa palu',
  'taman wisata taipa beach',
  'pantai dondo palu',
  'pantai silae palu',
  'pantai tipo palu',
  'pantai buluri palu',
  'pantai watusampu palu',
  'pantai pantoloan palu',
  'pantai tondo palu',
  'pantai baiya palu',
  'pantai kayumalue palu',

  // 4. SARANA OLAHRAGA PUBLIK & LAPANGAN
  'gor siranindi palu',
  'gor palu',
  'stadion gawalise palu',
  'stadion telkom palu',
  'gelora palu',
  'skatepark palu',
  'skate park taman gor palu',
  'jogging track vatulemo palu',
  'jogging track hutan kota palu',
  'lapangan immanuel palu',
  'lapangan silae palu',
  'lapangan galara palu',
  'lapangan beringin palu',
  'lapangan faqih rasyid palu',
  'lapangan petobo palu',
  'lapangan birobuli palu',
  'lapangan kawatuna palu',
  'lapangan lasoani palu',
  'lapangan tondo palu',
  'lapangan layana palu',
  'lapangan mamboro palu',
  'lapangan taipa palu',
  'lapangan tawaeli palu',
  'lapangan dolo',
  'lapangan marawola',

  // 5. WISATA PUNCAK & BUKIT ALAM
  'puncak salena palu',
  'paralayang salena palu',
  'bukit kawatuna palu',
  'bukit teletubbies palu',
  'bukit doa palu',
  'puncak doda palu',
  'wisata bukit palu',
  'pemandian air panas bora sigi',
  'matantimali paralayang palu',
  'puncak matantimali'
];

// Batas wilayah koordinat Palu & sekitarnya
const BOUNDS = {
  minLat: -1.06,
  maxLat: -0.68,
  minLon: 119.74,
  maxLon: 120.08
};

function determineKecamatan(lat, lon, address = '', name = '') {
  const text = (address + ' ' + name).toLowerCase();
  if (text.includes('palu timur')) return 'Palu Timur';
  if (text.includes('palu barat')) return 'Palu Barat';
  if (text.includes('palu selatan')) return 'Palu Selatan';
  if (text.includes('palu utara')) return 'Palu Utara';
  if (text.includes('mantikulore')) return 'Mantikulore';
  if (text.includes('tatanga')) return 'Tatanga';
  if (text.includes('ulujadi')) return 'Ulujadi';
  if (text.includes('tawaeli')) return 'Tawaeli';
  if (text.includes('sigi') || text.includes('biromaru') || text.includes('marawola') || text.includes('dolo')) return 'Sigi (Penyangga)';
  if (text.includes('donggala') || text.includes('banawa')) return 'Donggala (Pesisir)';

  // Estimasi koordinat
  if (lat > -0.82) return 'Palu Utara';
  if (lat < -0.92 && lon > 119.86) return 'Palu Selatan';
  if (lat < -0.92 && lon <= 119.86) return 'Tatanga';
  if (lon < 119.83) return 'Ulujadi';
  if (lon > 119.88 && lat > -0.91) return 'Mantikulore';
  if (lat > -0.89 && lon > 119.85) return 'Palu Timur';
  return 'Palu Barat';
}

function classifyParkCategory(name, typeStr = '', address = '') {
  const n = (name + ' ' + typeStr + ' ' + address).toLowerCase();

  // 1. Sarana Olahraga Publik & Lapangan
  if (
    n.includes('gor ') || n.includes('stadion') || n.includes('gelora') ||
    n.includes('skatepark') || n.includes('skate park') || n.includes('jogging') ||
    n.includes('fitness outdoor') || n.includes('lapangan ') || n.includes('sport center') ||
    n.includes('futsal') || n.includes('basket') || n.includes('tennis') || n.includes('badminton')
  ) {
    return {
      category: 'sarana_olahraga',
      categoryLabel: 'Sarana Olahraga Publik',
      icon: '⚽',
      features: ['Fasilitas Olahraga Gratis', 'Lapangan Terbuka', 'Jogging Track', 'Komunitas Pemuda/Warga']
    };
  }

  // 2. Wisata Puncak & Bukit Alam
  if (
    n.includes('puncak') || n.includes('bukit') || n.includes('paralayang') ||
    n.includes('salena') || n.includes('matantimali') || n.includes('teletubbies') ||
    n.includes('view point') || n.includes('camping') || n.includes('air panas')
  ) {
    return {
      category: 'wisata_bukit',
      categoryLabel: 'Wisata Puncak & Bukit Alam',
      icon: '⛰️',
      features: ['Panorama Kota Palu 360°', 'Spot Sunrise / Sunset', 'Udara Sejuk Alami', 'Spot Foto Panorama']
    };
  }

  // 3. Taman Pantai & Waterfront
  if (
    n.includes('pantai') || n.includes('beach') || n.includes('waterfront') ||
    n.includes('teluk palu') || n.includes('kampung nelayan') || n.includes('jembatan palu iv') ||
    n.includes('pesisir') || n.includes('dermaga') || n.includes('tanggul laut')
  ) {
    return {
      category: 'taman_pantai',
      categoryLabel: 'Taman Pantai & Waterfront',
      icon: '🌊',
      features: ['Pemandangan Teluk Palu', 'Sunset View Point', 'Pedestrian Walk Tepi Laut', 'Kuliner Jagung Bakar & Kelapa']
    };
  }

  // 4. Hutan Kota & Ekowisata
  if (
    n.includes('hutan kota') || n.includes('kaombona') || n.includes('mangrove') ||
    n.includes('ekowisata') || n.includes('kebun raya') || n.includes('arboretum') ||
    n.includes('konservasi') || n.includes('agrowisata') || n.includes('hutan lindung')
  ) {
    return {
      category: 'hutan_kota',
      categoryLabel: 'Hutan Kota & Ekowisata',
      icon: '🌲',
      features: ['Pepohonan Rindang Teduh', 'Jalur Lari & Sepeda', 'Wisata Edukasi Alam', 'Kawasan Konservasi & O2']
    };
  }

  // 5. Taman Bermain & RTH Lingkungan
  if (
    n.includes('bermain') || n.includes('playground') || n.includes('lalulintas') ||
    n.includes('lalu lintas') || n.includes('ramah anak') || n.includes('rptra') ||
    n.includes('taman bermain') || n.includes('kompleks') || n.includes('perumahan')
  ) {
    return {
      category: 'taman_ramah_anak',
      categoryLabel: 'Taman Bermain & RTH Lingkungan',
      icon: '🎠',
      features: ['Permainan Ayunan & Perosotan', 'Area Ramah Anak & Keluarga', 'Bangku Santai & Gazebo', 'Aman & Bebas Polusi']
    };
  }

  // 6. Default: Taman Kota & Alun-Alun
  return {
    category: 'taman_kota',
    categoryLabel: 'Taman Kota & Alun-Alun',
    icon: '🌳',
    features: ['Ruang Terbuka Hijau Publik', 'Jogging Track & Senam', 'Bangku Taman & Lampu Malam', 'Pusat Interaksi Warga Palu']
  };
}

function determineOperatingHours(category, name = '') {
  const n = name.toLowerCase();

  // Taman pantai, taman kota, puncak umumnya buka 24 jam untuk umum
  if (category === 'taman_pantai' || category === 'wisata_bukit' || n.includes('vatulemo') || n.includes('talise')) {
    return {
      isOpen24Hours: true,
      openTime: '00:00',
      closeTime: '23:59',
      hoursText: 'Buka 24 Jam',
      weekdayDescriptions: ['Buka 24 Jam Setiap Hari (Terbuka untuk Umum)']
    };
  }

  if (category === 'hutan_kota') {
    return {
      isOpen24Hours: false,
      openTime: '06:00',
      closeTime: '18:30',
      hoursText: '06:00 - 18:30',
      weekdayDescriptions: [
        'Senin - Minggu: 06:00 – 18:30 WITA',
        'Pagi & Sore: Waktu Paling Ramai Olahraga'
      ]
    };
  }

  if (category === 'sarana_olahraga') {
    return {
      isOpen24Hours: false,
      openTime: '06:00',
      closeTime: '22:00',
      hoursText: '06:00 - 22:00',
      weekdayDescriptions: [
        'Senin - Minggu: 06:00 – 22:00 WITA',
        'Lampu Lapangan Menyala Malam Hari'
      ]
    };
  }

  // Taman kota & taman ramah anak
  return {
    isOpen24Hours: false,
    openTime: '05:30',
    closeTime: '22:00',
    hoursText: '05:30 - 22:00',
    weekdayDescriptions: [
      'Senin - Minggu: 05:30 – 22:00 WITA',
      'Terbuka Gratis untuk Seluruh Warga'
    ]
  };
}

async function searchGoogleMaps(query) {
  try {
    const url = 'https://www.google.com/maps/search/' + encodeURIComponent(query);
    const res1 = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate'
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
        'Referer': 'https://www.google.com/maps',
        'Accept-Encoding': 'gzip, deflate'
      }
    });

    const buf = Buffer.from(await res2.arrayBuffer());
    let text;
    try {
      text = zlib.gunzipSync(buf).toString('utf8');
    } catch {
      try {
        text = zlib.inflateSync(buf).toString('utf8');
      } catch {
        text = buf.toString('utf8');
      }
    }

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

      if (!name || typeof lat !== 'number' || typeof lon !== 'number') continue;

      // Filter batasan koordinat sekitar Palu
      if (lat < BOUNDS.minLat || lat > BOUNDS.maxLat || lon < BOUNDS.minLon || lon > BOUNDS.maxLon) {
        continue;
      }

      // Filter tempat yang tidak relevan (hotel, sekolah, resto, toko komersil umum)
      const nLower = name.toLowerCase();
      if (
        nLower.includes('hotel ') || nLower.includes('penginapan') || nLower.includes('kost ') ||
        nLower.includes('salon ') || nLower.includes('barbershop') || nLower.includes('laundry') ||
        nLower.includes('bengkel') || nLower.includes('kantor camat') || nLower.includes('kantor lurah')
      ) {
        continue;
      }

      const addressLines = item[2] || [];
      const address = addressLines.filter(Boolean).join(', ') || item[39] || `${name}, Kota Palu, Sulawesi Tengah`;
      const typeStr = item[13]?.[0] || 'Taman & Fasilitas Publik';
      const phone = item[178]?.[0] || null;

      places.push({
        id: id || `park_${lat.toFixed(5)}_${lon.toFixed(5)}`,
        name: name.trim(),
        lat,
        lon,
        address,
        typeStr,
        phone
      });
    }

    return places;
  } catch (err) {
    return [];
  }
}

async function main() {
  console.log(`[Start] Menjalankan scraping titik pertamanan dan fasilitas pendukung di Kota Palu...`);
  console.log(`[Config] Total kata kunci pencarian: ${QUERIES.length} queries.`);

  const placesMap = new Map();

  for (let i = 0; i < QUERIES.length; i++) {
    const q = QUERIES[i];
    process.stdout.write(`[${i + 1}/${QUERIES.length}] Query: "${q}"... `);

    const items = await searchGoogleMaps(q);
    let added = 0;

    for (const p of items) {
      // Dedup berdasarkan koordinat kedekatan (< 25 meter) atau ID persis
      const coordKey = `${p.lat.toFixed(4)}_${p.lon.toFixed(4)}`;
      if (!placesMap.has(p.id) && !placesMap.has(coordKey)) {
        placesMap.set(p.id, p);
        placesMap.set(coordKey, p);
        added++;
      }
    }

    console.log(`Ditemukan ${items.length} item (+${added} baru, Total unik: ${placesMap.size / 2 | 0})`);
    // Delay santun
    await new Promise(r => setTimeout(r, 600));
  }

  // Format dataset akhir
  const uniquePlaces = [];
  const seenIds = new Set();

  for (const [key, p] of placesMap.entries()) {
    if (seenIds.has(p.id)) continue;
    seenIds.add(p.id);

    const catInfo = classifyParkCategory(p.name, p.typeStr, p.address);
    const opHours = determineOperatingHours(catInfo.category, p.name);
    const kecamatan = determineKecamatan(p.lat, p.lon, p.address, p.name);

    uniquePlaces.push({
      id: p.id,
      name: p.name,
      category: catInfo.category,
      categoryLabel: catInfo.categoryLabel,
      icon: catInfo.icon,
      lat: p.lat,
      lon: p.lon,
      address: p.address,
      kecamatan: kecamatan,
      phone: p.phone,
      priceRange: 'Ruang Terbuka Hijau & Fasilitas Gratis',
      features: catInfo.features,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' ' + p.address)}`,
      typeStr: p.typeStr,
      operatingHours: opHours
    });
  }

  // Urutkan alfabetis
  uniquePlaces.sort((a, b) => a.name.localeCompare(b.name));

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(uniquePlaces, null, 2), 'utf8');

  console.log(`\n======================================================`);
  console.log(`[SELESAI] Berhasil menyimpan ${uniquePlaces.length} titik pertamanan & fasilitas pendukung ke:`);
  console.log(`-> ${OUTPUT_PATH}`);

  // Ringkasan per kategori
  const catSummary = {};
  for (const p of uniquePlaces) {
    catSummary[p.categoryLabel] = (catSummary[p.categoryLabel] || 0) + 1;
  }
  console.log('\n[Ringkasan per Kategori]:');
  for (const [cat, count] of Object.entries(catSummary)) {
    console.log(`- ${cat}: ${count} lokasi`);
  }
  console.log(`======================================================\n`);
}

main();
