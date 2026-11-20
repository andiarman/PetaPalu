# 🗺️ Peta Palu — Platform Pemetaan Terpadu & Jadwal Pemadaman Kota Palu

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/Lisensi-MIT-blue.svg?style=for-the-badge" alt="Lisensi MIT" />
  </a>
  <a href="https://andiarman.github.io/PetaPalu/">
    <img src="https://img.shields.io/badge/🌐_BUKA_PETA_PALU-KLIK_DI_SINI-0284c7?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Buka Website Peta Palu" />
  </a>
  <a href="https://andiarman.github.io/PetaPalu/">
    <img src="https://img.shields.io/badge/Status-Live_GitHub_Pages-22c55e?style=for-the-badge&logo=githubpages&logoColor=white" alt="Status GitHub Pages" />
  </a>
  <a href="https://www.threads.com/@andiarman___">
    <img src="https://img.shields.io/badge/Threads-@andiarman___-000000?style=for-the-badge&logo=threads&logoColor=white" alt="Threads Profile" />
  </a>
  <a href="https://andiarman.github.io/PetaPalu/">
    <img src="https://img.shields.io/badge/Engine-Rust_WebAssembly-dea584?style=for-the-badge&logo=rust&logoColor=black" alt="Rust WebAssembly" />
  </a>
  <a href="https://andiarman.github.io/PetaPalu/">
    <img src="https://img.shields.io/badge/Zona_Waktu-WITA_(UTC%2B8)-facc15?style=for-the-badge&logo=clock&logoColor=black" alt="Zona Waktu WITA" />
  </a>
</p>

<p align="center">
  <b>Portal pemetaan interaktif publik terpadu dan monitoring jadwal pemadaman listrik mandiri untuk masyarakat Kota Palu dan Sulawesi Tengah.</b><br>
  Dirancang dengan mesin komputasi berperforma tinggi <b>Rust WebAssembly</b>, antarmuka modern <i>dark glassmorphism</i>, direktori jujur tanpa manipulasi rating, serta perlindungan privasi penuh berbasis pemrosesan lokal (<i>client-side</i>).
</p>

---

## 🎯 Navigasi Cepat Layanan Peta

| Tautan Langsung | Mode Layanan | Deskripsi Fitur Utama |
| :--- | :--- | :--- |
| 🌐 [**Website Resmi Peta Palu**](https://andiarman.github.io/PetaPalu/) | Beranda & Hub | Gerbang utama seluruh layanan peta terpadu Kota Palu |
| ⚡ [**Peta Pemadaman Listrik**](https://andiarman.github.io/PetaPalu/?mode=outage) | Pemadaman PLN | Monitoring jadwal, estimasi durasi padam/nyala realtime (WITA), dan deteksi GPS lokasi |
| ☕ [**Peta Coffeeshop & Resto**](https://andiarman.github.io/PetaPalu/?mode=culinary) | Direktori Kuliner | 975+ titik kuliner jujur tanpa rating komersial bias, jam buka live, filter brand & heatmap kepadatan |
| 🖨️ [**Peta Fotocopy & Percetakan**](https://andiarman.github.io/PetaPalu/?mode=printing) | Sentra Cetak | 220+ tempat fotocopy kilat, digital printing spanduk/banner, 3D printing, dan penjilidan skripsi |
| 💻 [**Peta Elektronik & Servis**](https://andiarman.github.io/PetaPalu/?mode=hardware) | Gadget & Reparasi | 290+ toko laptop/PC, toko HP, suku cadang, tukang servis AC/TV, dan service center resmi |
| ⛽ [**Peta SPBU & Tempat Ibadah**](https://andiarman.github.io/PetaPalu/?mode=facility) | Fasilitas Publik | Lokasi SPBU 24 jam, Masjid, Gereja, Pura, dan Vihara di seluruh penjuru kota |
| 🌳 [**Peta Taman & Ruang Terbuka**](https://andiarman.github.io/PetaPalu/?mode=parks) | Ruang Terbuka Hijau | Direktori taman kota, sarana olahraga, lapangan, dan ruang publik ramah anak |
| 🏛️ [**Peta Pola Ruang RTRW**](https://andiarman.github.io/PetaPalu/?mode=rtrw) | Tata Ruang Daerah | Visualisasi resmi Rencana Tata Ruang Wilayah Kota Palu 2021–2041 (Perda No. 2/2021) |
| 💬 [**Threads Pengembang**](https://www.threads.com/@andiarman___) | Komunikasi & Masukan | Kanal diskusi, koreksi data, dan laporan saran fitur langsung dengan pembuat |

---

## 📖 Tentang Peta Palu (Ini Website Apa?)

**Peta Palu** ([andiarman.github.io/PetaPalu](https://andiarman.github.io/PetaPalu/)) adalah platform peta web interaktif nirlaba yang lahir dari inisiatif independen swadaya masyarakat untuk menjawab kebutuhan nyata warga Kota Palu, Sulawesi Tengah. Platform ini menggabungkan berbagai data spasial penting kota ke dalam satu peta responsif yang dapat diakses secara instan dari perangkat seluler maupun komputer tanpa perlu mengunduh aplikasi tambahan.

### 🌟 Fitur Utama Unggulan
1. **Pemantauan Jadwal Pemadaman Listrik Realtime**:
   - Menghitung waktu lokal **WITA (UTC+8)** secara presisi detik demi detik.
   - Mengelompokkan status wilayah padam secara visual:
     - 🛑 **Sedang Padam**: Warna merah dengan bar durasi dan sisa waktu pemadaman.
     - ⚠️ **Akan Padam**: Warna oranye peringatan dengan hitung mundur (*countdown*) menuju jadwal padam.
     - 🟢 **Sudah Menyala**: Warna hijau semi-transparan untuk area yang masa pemadamannya telah selesai.
   - **Fitur Cek Rumah Saya (GPS)**: Memeriksa apakah lokasi koordinat pengguna saat ini berada di dalam salah satu poligon zona pemadaman aktif hari ini.
2. **Prinsip "Peta Jujur Tanpa Rating" (Direct & Fair Directory)**:
   - Direktori kuliner, percetakan, dan servis elektronik disajikan **tanpa sistem rating bintang, ulasan berbayar, atau algoritma manipulasi popularitas**.
   - Setiap pelaku UMKM dan usaha lokal memiliki hak tampil yang setara pada hasil penelusuran.
3. **Peta Panas Kepadatan (Vertical Heatmap Dock)**:
   - Visualisasi sebaran kepadatan titik usaha (padat/sedang/rendah) di sepanjang Teluk Palu hingga perbukitan sekitar untuk mempermudah identifikasi pusat keramaian dan kebutuhan layanan.
4. **Kontrol Multi-Layanan 7-in-1**:
   - Memungkinkan navigasi mulus antar 7 mode layanan utama langsung melalui *dock switcher* di sisi kiri layar.

---

## 📂 Dari Mana Seluruh Data Ini Berasal? (Transparansi Data)

Platform ini mengumpulkan, memvalidasi, dan mengompilasi data publik dari berbagai sumber terbuka yang sah secara transparan:

| Komponen Data | Sumber Asal Data | Metode Pengumpulan & Validasi |
| :--- | :--- | :--- |
| **Jadwal Pemadaman Listrik** | **PT PLN (Persero) UP3 Palu / UIW Suluttenggo** | Pengumuman resmi berkala mengenai jadwal pemeliharaan jaringan dan pekerjaan kelistrikan terencana yang dipublikasikan secara terbuka untuk masyarakat umum. |
| **Peta Dasar & Jaringan Jalan** | **OpenStreetMap (OSM) Contributors** | Peta dasar dunia terbuka dari komunitas OpenStreetMap Indonesia dan global di bawah lisensi terbuka *Open Database License (ODbL)*. |
| **Batas Administrasi Wilayah** | **Badan Informasi Geospasial (BIG) / Ina-Geoportal** | Batas administrasi kelurahan, kecamatan, dan garis pantai resmi Kota Palu serta Provinsi Sulawesi Tengah. |
| **Pola Ruang & Zonasi (RTRW)** | **Pemerintah Kota Palu (Perda No. 2 Tahun 2021)** | Lampiran peta geospasial Rencana Tata Ruang Wilayah Kota Palu Tahun 2021–2041 mengenai kawasan lindung, budidaya, permukiman, dan fasilitas umum. |
| **Direktori Kuliner, Usaha & POI** | **Kompilasi Mandiri Komunitas & Crowdsourcing** | Kombinasi data tempat terbuka (*open POI*), penelusuran lapangan sukarela, direktori publik, serta kontribusi aktif warga melalui formulir pendaftaran tempat usaha. |

---

## 🛠️ Dibuat Dengan Apa? (Arsitektur & Teknologi)

Peta Palu dibangun dengan arsitektur **Full-Stack Rust & WebAssembly** untuk menghadirkan performa maksimal, konsumsi kuota yang sangat hemat, serta keamanan kode tingkat tinggi:

```text
PetaPalu/
├── Cargo.toml                  # Workspace Cargo Rust
├── Trunk.toml                  # Konfigurasi Trunk WASM Bundler
├── README.md                   # Dokumentasi Lengkap & Transparansi
├── DISCLAIMER.md               # Penafian Hukum & Batasan Tanggung Jawab
├── data/                       # Dataset Terstruktur JSON & GeoJSON Kota Palu
│   └── places/                 # 2.200+ Titik POI (Kuliner, Servis, Cetak, Fasilitas)
├── vendor/                     # Library Peta Mandiri (Leaflet, Cluster, Heatmap)
└── crates/
    ├── common/                 # 📦 Shared Logic Rust (Model Data, WITA Clock, Haversine, Fuzzy Search)
    ├── server/                 # 🚀 Axum / Tokio REST API Server (Self-Hosted Backend < 1ms Latensi)
    └── frontend/               # ⚡ Rust WebAssembly Engine (wasm-bindgen, Trunk, UI Integrator)
```

### 1. Mesin Komputasi Rust WebAssembly (Frontend Engine)
- Logika inti komputasi seperti sinkronisasi zona waktu WITA, formula jarak geosfer Haversine, dan penyaringan tempat ditulis dalam bahasa **Rust** dan dikompilasi menjadi biner WebAssembly (`petapalu-frontend.wasm`).
- Mesin WebAssembly berjalan langsung di peramban pengguna tanpa jeda (*zero garbage collection pause*), menghasilkan kecepatan eksekusi mendekati kecepatan bahasa *native*.

### 2. Antarmuka Visual Peta (Interactive UI)
- Dibangun dengan antarmuka murni yang ringan dan teroptimasi penuh (*zero JavaScript framework bloat*), menggabungkan pustaka pemetaan teruji: [Leaflet.js](https://leafletjs.com/), [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster), dan [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat).
- Gaya visual menggunakan estetika *dark glassmorphism* dengan kontras tinggi yang nyaman di mata pada malam hari maupun saat terjadi pemadaman listrik.

### 3. Backend REST Server (Axum & Tokio)
- Repositori ini juga dilengkapi dengan backend mandiri berbasis **Axum** dan runtime asynchronous **Tokio** di `crates/server/`.
- Memuat seluruh dataset ke dalam memori (*in-memory atomic cache* via `Arc<RwLock<AppState>>`) yang mampu melayani ribuan permintaan per detik dengan latensi respon sub-milidetik (< 1 ms).

### 4. Hosting & Otomatisasi CI/CD
- Dibangun secara otomatis menggunakan pipeline **GitHub Actions** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) dan disajikan melalui **GitHub Pages** dengan protokol HTTP/2 dan kompresi modern.

---

## 🛡️ Keamanan & Privasi (Security & Privacy)

Keamanan data dan privasi pengguna adalah prioritas mutlak dalam perancangan platform Peta Palu:

1. **Pemrosesan GPS Murni di Sisi Klien (100% Client-Side Execution / Zero-Tracking)**:
   - Ketika Anda menggunakan fitur *"Cek Rumah Saya"*, peramban Anda meminta izin akses lokasi (*HTML5 Geolocation API*).
   - Seluruh kalkulasi pencocokan posisi koordinat pengguna terhadap area zona pemadaman dilakukan **sepenuhnya di dalam memori perangkat Anda melalui modul Rust WebAssembly**.
   - Koordinat lokasi Anda **TIDAK PERNAH dikirim, dicatat, disimpan, atau dipantau oleh server mana pun**.
2. **Ketiadaan Kerentanan Basis Data (Zero Database Exposure)**:
   - Website publik disajikan sebagai aset biner statis dan WebAssembly. Tidak ada *database server* SQL publik yang terhubung langsung, sehingga platform ini secara alami **kebal dari serangan SQL Injection, pencurian basis data pengguna, atau eksploitasi kredensial**.
3. **Integritas Berkas Keras (Subresource Integrity / SRI)**:
   - Berkas biner WebAssembly dan skrip diverifikasi dengan hash integritas tinggi (`sha384`), mencegah serangan manipulasi skrip di tengah jalan (*Man-in-the-Middle*).
4. **Enkripsi Penuh HTTPS**:
   - Seluruh koneksi ke domain `andiarman.github.io` dilindungi oleh enkripsi TLS/SSL standar industri secara otomatis.
5. **Bebas Iklan & Pelacak Pihak Ketiga**:
   - Website ini tidak mengandung pelacak pihak ketiga (*third-party ad trackers*), tidak mengumpulkan informasi identitas pribadi (PII), dan tidak memasang kuki (*cookies*) untuk kepentingan pemasaran atau periklanan.

---

## ⚖️ Penafian Hukum & Batasan Tanggung Jawab (Legal Disclaimer)

> [!WARNING]
> **Pernyataan Penafian Mutlak Tanggung Jawab Pembuat (Limitation of Liability)**  
> Bacalah bagian ini dengan seksama sebelum menggunakan website Peta Palu. Dengan membuka, mengakses, menelusuri, atau memanfaatkan informasi di dalam website ini, Anda secara sadar dan tegas menyetujui seluruh ketentuan berikut:

1. **Sifat Inisiatif Swadaya Masyarakat & Nirlaba**:
   - Website ini dibuat dan dikelola oleh **Andi Arman** secara sukarela dan mandiri sebagai sarana penyampaian informasi publik bagi warga Kota Palu. Proyek ini bersifat nirlaba dan **TIDAK MEMILIKI HUBUNGAN AFILIASI, KEMITRAAN RESMI, ATAU ENDORSEMENT DARI**:
     - PT PLN (Persero) atau ULP/UP3 mana pun;
     - Pemerintah Kota Palu, Pemerintah Provinsi Sulawesi Tengah, atau lembaga instansi negara terkait;
     - Pemilik toko, kafe, restoran, tempat percetakan, atau penyedia jasa servis yang tertera di peta.
2. **Penyediaan Informasi "SEBAGAIMANA ADANYA" (*AS IS*)**:
   - Seluruh jadwal pemadaman listrik, estimasi jam nyala, batas kelurahan, titik koordinat, jam operasional toko, dan informasi kontak disajikan apa adanya (*as is*) tanpa jaminan kelengkapan, keakuratan mutlak, atau kepastian ketersediaan setiap saat.
   - Jadwal pekerjaan kelistrikan dapat berubah sewaktu-waktu oleh pihak berwenang di lapangan akibat kendala cuaca, kondisi operasional darurat sistem kelistrikan, atau kebijakan teknis lainnya yang berada di luar kendali pengembang.
3. **Penolakan Tanggung Jawab atas Penyalahgunaan**:
   - **PEMBUAT / PENGEMBANG WEBSITE TIDAK BERTANGGUNG JAWAB DALAM BENTUK APA PUN ATAS**:
     - Segala bentuk penyalahgunaan data, informasi peta, atau konten website ini yang dilakukan oleh pihak mana pun di luar peruntukan yang semestinya.
     - Kerugian finansial, kerugian materi, kerusakan perangkat elektronik, kehilangan keuntungan usaha, kecelakaan fisik, atau kerugian immateriel yang timbul secara langsung maupun tidak langsung akibat penggunaan atau ketergantungan terhadap data di website ini.
     - Segala perselisihan, klaim, atau sengketa hukum yang terjadi antara pengguna dengan penyedia jasa pihak ketiga, pemilik toko, maupun instansi kelistrikan.
4. **Tanggung Jawab Mandiri Pengguna**:
   - Pengguna bertanggung jawab penuh atas segala keputusan, tindakan, dan mobilitas pribadi yang diambil berdasarkan informasi di platform ini.
5. **Hak Koreksi & Kebijakan Penghapusan Data (*Notice and Takedown Policy*)**:
   - Apabila Anda adalah pemilik tempat usaha, pengelola fasilitas, atau pihak yang berwenang dan mendapati informasi tempat Anda keliru, membutuhkan pembaruan, atau berkeberatan atas pencantuman data tersebut di dalam peta:
     - Anda dapat mengajukan permohonan koreksi atau penghapusan data secara mudah dan bebas biaya.
     - Pengajuan dapat disampaikan melalui [GitHub Issues](https://github.com/andiarman/PetaPalu/issues) atau pesan langsung di akun Threads pengembang [@andiarman___](https://www.threads.com/@andiarman___). Permohonan akan segera ditinjau dan diproses dalam waktu sesingkat-singkatnya.

Dokumen lengkap penafian hukum dapat ditinjau lebih lanjut pada berkas [DISCLAIMER.md](DISCLAIMER.md).

---

## 🚀 Panduan Menjalankan Proyek Secara Mandiri

Bagi pengembang yang ingin mempelajari kode sumber atau menjalankan proyek ini di lingkungan komputer lokal:

### 1. Prasyarat Sistem
- [Rust & Cargo](https://rustup.rs/) (Toolchain Stable)
- Target WebAssembly:
  ```powershell
  rustup target add wasm32-unknown-unknown
  ```
- Trunk (WASM Bundler):
  ```powershell
  cargo install --locked trunk
  ```

### 2. Menjalankan Backend Axum (Lokal)
```powershell
.\run-server.ps1
# Backend API akan berjalan di http://localhost:8080
```

### 3. Menjalankan Frontend WebAssembly (Trunk Live Reload)
```powershell
.\run-frontend.ps1
# Frontend WebAssembly dev server akan berjalan di http://localhost:8081
```

### 4. Melakukan Build Produksi WebAssembly
```powershell
trunk build --release --public-url /PetaPalu/
```
Hasil artefak statis siap saji akan tercipta di direktori `crates/frontend/dist/`.

### 5. Membangun Berkas APK Android (Rust / Tauri v2)
Proyek ini mendukung kompilasi ke Android APK bertenaga Rust via **Tauri v2**:
- Otomatis via cloud: Pipeline [`.github/workflows/build-apk.yml`](.github/workflows/build-apk.yml) mengompilasi Rust ke berkas **`PetaPalu.apk`** siap unduh di tab GitHub Actions.
- Berjalan offline-first dengan seluruh modul komputasi WebAssembly dan antarmuka peta Kota Palu.

---

## 📄 Lisensi

Proyek ini dirilis dan didistribusikan secara terbuka di bawah ketentuan lisensi [MIT License](LICENSE).

Hak Cipta © 2026 **Andi Arman** ([@andiarman](https://github.com/andiarman)).  
Kota Palu, Sulawesi Tengah, Indonesia.
