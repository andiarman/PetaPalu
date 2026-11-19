# 🦀 Peta Palu — Full-Stack Rust Edition

> **Arsitektur Penuh Bahasa Pemrograman Rust (100% Rust Backend + WebAssembly Frontend)**  
> Portal Pemetaan Terpadu & Jadwal Pemadaman Listrik Kota Palu, Sulawesi Tengah.

Proyek ini merupakan duplikasi dan penulisan ulang (*rewrite*) menyeluruh dari proyek **Peta Palu** menggunakan ekosistem bahasa pemrograman **Rust** dari hulu ke hilir:
- **Backend**: Asynchronous REST API Server bertenaga **Axum** & **Tokio**.
- **Frontend**: Single Page Application (SPA) reaktif berbasis **WebAssembly (WASM)** menggunakan framework **Yew** & **Trunk**.
- **Shared Logic**: Model data bersama, kalkulasi waktu WITA (UTC+8), dan algoritma *fuzzy search* in-memory tercepat tanpa overhead JavaScript.

---

## 🏗️ Struktur Arsitektur Workspace Cargo

```text
d:\outage-map-pages_backup_20261112_040238_rust/
├── Cargo.toml                  # Cargo Workspace Definition
├── Trunk.toml                  # Trunk Bundler Configuration (WASM)
├── README.md                   # Dokumentasi Lengkap Proyek
├── run-server.ps1              # Script Menjalankan Backend Axum
├── run-frontend.ps1            # Script Menjalankan Frontend WebAssembly
├── data/                       # Direktori Data JSON Asli Kota Palu
│   └── places/
│       ├── palu-coffeeshop-resto.json
│       ├── palu-fotocopy-percetakan.json
│       ├── palu-hardware-servis.json
│       ├── palu-spbu-ibadah.json
│       └── palu-pertamanan-fasilitas.json
├── vendor/                     # Vendor Library (Leaflet & Plugins)
└── crates/
    ├── common/                 # 📦 Shared Domain Models & Logic
    │   ├── Cargo.toml
    │   └── src/
    │       ├── lib.rs
    │       ├── models.rs       # Struct PlaceRecord, Outage, Hours, Search
    │       ├── wita.rs         # Kalkulasi Live WITA (UTC+8) & Jam Operasional
    │       └── search.rs       # In-Memory Fuzzy Search & Scoring Algorithm
    │
    ├── server/                 # 🚀 Axum / Tokio REST Backend Server
    │   ├── Cargo.toml
    │   └── src/
    │       ├── main.rs         # Server Entrypoint, CORS & Static Service
    │       ├── routes.rs       # REST API Endpoints (/health, /places, /search)
    │       └── state.rs        # In-Memory Cache & Crowdsource Queue
    │
    └── frontend/               # ⚡ Yew WebAssembly Frontend
        ├── Cargo.toml
        ├── index.html          # HTML Shell & WASM Loader
        └── src/
            ├── lib.rs          # WASM Start Function
            ├── app.rs          # Yew Main Component & Reactive State
            ├── leaflet.rs      # Rust wasm_bindgen FFI Bindings ke Leaflet
            └── components/
                ├── header.rs   # Navigasi Atas, Brand & Search Bar
                ├── dock.rs     # Quick Mode Switcher Dock (Kiri)
                ├── heat_dock.rs# Vertical Heatmap Dock (Kanan Atas)
                └── legend.rs   # Filter Kategori & Jam Buka (Bawah)
```

---

## ⚡ Fitur Backend (Axum Server)

1. **Kecepatan Tinggi (< 1ms Latensi)**: Data 2.200+ titik dimuat ke memori saat server menyala (*in-memory atomic read cache* via `Arc<RwLock<AppState>>`).
2. **REST API V1**:
   - `GET /api/v1/health`: Status server & waktu live WITA.
   - `GET /api/v1/places?mode=culinary&category=cafe`: Mengambil data titik terfilter.
   - `GET /api/v1/places/search?q=pantai`: Pencarian cepat nama & alamat.
   - `POST /api/v1/places/submit`: Menerima dan memvalidasi pendaftaran titik baru dari warga.
3. **Static File Serving**: Menyajikan bundle WASM, file GeoJSON batas kelurahan, dan Leaflet vendor asset secara otomatis dengan kompresi gzip.

---

## ⚡ Fitur Frontend (WebAssembly / Yew)

1. **Zero JS Slop**: Seluruh logika pergantian mode, filtering kategori, live WITA clock, dan pencarian dijalankan langsung di mesin WebAssembly (*compiled binary*).
2. **Leaflet FFI Interop**: Rust mengontrol objek `L.map`, `L.markerClusterGroup`, dan `L.heatLayer` melalui binding `wasm_bindgen`.
3. **Memory Safety**: Bebas dari *null pointer exceptions* dan memory leak runtime JavaScript.

---

## 🚀 Panduan Menjalankan Proyek

### 1. Prasyarat Toolchain Rust
Pastikan Rust & WebAssembly target terpasang di sistem:
```powershell
# 1. Tambahkan target WebAssembly
rustup target add wasm32-unknown-unknown

# 2. Pasang bundler Trunk
cargo install --locked trunk
```

### 2. Menjalankan Backend Server
Buka terminal PowerShell:
```powershell
cd d:\outage-map-pages_backup_20261112_040238_rust
.\run-server.ps1
# Server akan berjalan di http://localhost:8080
```

### 3. Menjalankan Frontend WebAssembly
Buka terminal baru:
```powershell
cd d:\outage-map-pages_backup_20261112_040238_rust
.\run-frontend.ps1
# Frontend Trunk dev server akan berjalan di http://localhost:8081
```
Atau Anda dapat langsung melakukan kompilasi produksi:
```powershell
trunk build --release
```
Hasil kompilasi WebAssembly yang siap di-deploy ke server akan berada di `crates/frontend/dist/`.
