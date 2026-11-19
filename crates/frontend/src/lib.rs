use wasm_bindgen::prelude::*;
use petapalu_common::models::PlaceRecord;
use petapalu_common::search::{haversine_distance_meters, search_places};
use petapalu_common::wita::{current_wita_time, is_place_open_now};

#[wasm_bindgen(start)]
pub fn main() {
    wasm_logger::init(wasm_logger::Config::default());
    log::info!("🦀 Peta Palu WebAssembly Engine (100% Rust) aktif & siap melayani UI!");
}

/// Mengembalikan waktu WITA terkini yang dihitung langsung oleh Rust
#[wasm_bindgen]
pub fn wasm_get_wita_time() -> String {
    let now = current_wita_time();
    format!("WITA · {}", now.format("%d %b %Y, %H.%M"))
}

/// Menghitung jarak antara dua titik koordinat bumi (dalam meter) via formula Haversine murni di Rust
#[wasm_bindgen]
pub fn wasm_haversine_distance(lat1: f64, lon1: f64, lat2: f64, lon2: f64) -> f64 {
    haversine_distance_meters(lat1, lon1, lat2, lon2)
}

/// Evaluasi status buka/tutup toko berdasarkan jam operasional WITA murni di Rust
#[wasm_bindgen]
pub fn wasm_is_place_open(place_json: &str) -> bool {
    if let Ok(place) = serde_json::from_str::<PlaceRecord>(place_json) {
        let now = current_wita_time();
        is_place_open_now(&place, &now)
    } else {
        false
    }
}

/// Pencarian fuzzy super cepat di memori WebAssembly Rust
#[wasm_bindgen]
pub fn wasm_search_places(query: &str, places_json: &str, limit: usize) -> String {
    if let Ok(places) = serde_json::from_str::<Vec<PlaceRecord>>(places_json) {
        let results = search_places(&places, query, limit);
        serde_json::to_string(&results).unwrap_or_else(|_| "[]".to_string())
    } else {
        "[]".to_string()
    }
}
