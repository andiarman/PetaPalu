use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = L)]
    pub type Map;

    #[wasm_bindgen(js_namespace = L, js_name = map)]
    pub fn create_map(id: &str, options: &JsValue) -> Map;

    #[wasm_bindgen(method, js_name = setView)]
    pub fn set_view(this: &Map, center: &JsValue, zoom: u8) -> Map;

    #[wasm_bindgen(method, js_name = flyTo)]
    pub fn fly_to(this: &Map, latlng: &JsValue, zoom: u8, options: &JsValue);

    #[wasm_bindgen(method, js_name = hasLayer)]
    pub fn has_layer(this: &Map, layer: &JsValue) -> bool;

    #[wasm_bindgen(method, js_name = addLayer)]
    pub fn add_layer(this: &Map, layer: &JsValue);

    #[wasm_bindgen(method, js_name = removeLayer)]
    pub fn remove_layer(this: &Map, layer: &JsValue);

    // Marker Clusters
    #[wasm_bindgen(js_namespace = L, js_name = markerClusterGroup)]
    pub fn create_marker_cluster_group(options: &JsValue) -> JsValue;

    // Heatmap Layer
    #[wasm_bindgen(js_namespace = L, js_name = heatLayer)]
    pub fn create_heat_layer(points: &JsValue, options: &JsValue) -> JsValue;

    // DivIcon
    #[wasm_bindgen(js_namespace = L, js_name = divIcon)]
    pub fn create_div_icon(options: &JsValue) -> JsValue;

    // Marker
    #[wasm_bindgen(js_namespace = L, js_name = marker)]
    pub fn create_marker(latlng: &JsValue, options: &JsValue) -> JsValue;

    // TileLayer
    #[wasm_bindgen(js_namespace = L, js_name = tileLayer)]
    pub fn create_tile_layer(url: &str, options: &JsValue) -> JsValue;
}
