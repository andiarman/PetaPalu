use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::Deserialize;
use serde_json::json;
use crate::state::AppState;
use petapalu_common::{current_wita_time, search_places, PlaceSubmission};

#[derive(Deserialize)]
pub struct PlacesQuery {
    pub mode: Option<String>,
    pub category: Option<String>,
}

#[derive(Deserialize)]
pub struct SearchQuery {
    pub q: String,
    pub limit: Option<usize>,
}

/// GET /api/v1/health
pub async fn health_handler() -> impl IntoResponse {
    let now = current_wita_time();
    Json(json!({
        "status": "ok",
        "service": "petapalu-rust-backend",
        "wita_time": now.format("%Y-%m-%d %H:%M:%S WITA").to_string(),
        "timestamp_rfc3339": now.to_rfc3339(),
    }))
}

/// GET /api/v1/places
pub async fn get_places_handler(
    State(state): State<AppState>,
    Query(params): Query<PlacesQuery>,
) -> impl IntoResponse {
    let map = state.places_by_category.read().await;

    if let Some(mode) = params.mode {
        if let Some(records) = map.get(&mode) {
            if let Some(cat) = params.category {
                let filtered: Vec<_> = records.iter().filter(|r| r.category == cat).cloned().collect();
                return Json(json!(filtered));
            }
            return Json(json!(records));
        }
    }

    let all = state.all_places.read().await;
    Json(json!(*all))
}

/// GET /api/v1/search?q=...
pub async fn search_handler(
    State(state): State<AppState>,
    Query(params): Query<SearchQuery>,
) -> impl IntoResponse {
    let all = state.all_places.read().await;
    let limit = params.limit.unwrap_or(20);
    let results = search_places(&all, &params.q, limit);
    Json(json!(results))
}

/// POST /api/v1/places/submit
pub async fn submit_place_handler(
    State(state): State<AppState>,
    Json(payload): Json<PlaceSubmission>,
) -> impl IntoResponse {
    if payload.name.trim().is_empty() || payload.address.trim().is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({"error": "Nama tempat dan alamat wajib diisi"})),
        );
    }

    let mut pending = state.pending_submissions.write().await;
    tracing::info!("Received crowdsource submission: '{}' ({})", payload.name, payload.category);
    pending.push(payload);

    (
        StatusCode::CREATED,
        Json(json!({
            "success": true,
            "message": "Usulan tempat baru berhasil diterima oleh server Rust dan masuk ke antrean kurasi."
        })),
    )
}
