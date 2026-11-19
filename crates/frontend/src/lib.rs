use wasm_bindgen::prelude::*;

pub mod app;
pub mod components {
    pub mod dock;
    pub mod heat_dock;
    pub mod header;
    pub mod legend;
}
pub mod leaflet;

use app::App;

#[wasm_bindgen(start)]
pub fn main() {
    wasm_logger::init(wasm_logger::Config::default());
    log::info!("🦀 Peta Palu WebAssembly (Rust Frontend) berhasil dimuat!");

    yew::Renderer::<App>::new().render();
}
