use axum::{
    routing::{get, post},
    Router,
};
use std::net::SocketAddr;
use tower_http::{
    cors::{Any, CorsLayer},
    services::ServeDir,
    trace::TraceLayer,
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod routes;
mod state;

use routes::{get_places_handler, health_handler, search_handler, submit_place_handler};
use state::AppState;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "petapalu_server=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    tracing::info!("🦀 Memulai Peta Palu Rust Backend Server...");

    // Inisialisasi in-memory data store dari folder data/
    let data_dir = std::env::var("PETAPALU_DATA_DIR").unwrap_or_else(|_| "./data".to_string());
    let state = AppState::new_and_load(&data_dir).await?;

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // API Routes
    let api_routes = Router::new()
        .route("/health", get(health_handler))
        .route("/places", get(get_places_handler))
        .route("/places/search", get(search_handler))
        .route("/places/submit", post(submit_place_handler));

    // Main App Router (API + Static Files)
    let static_dir = std::env::var("PETAPALU_STATIC_DIR").unwrap_or_else(|_| "./crates/frontend/dist".to_string());
    let app = Router::new()
        .nest("/api/v1", api_routes)
        .nest_service("/data", ServeDir::new(&data_dir))
        .nest_service("/vendor", ServeDir::new("./vendor"))
        .fallback_service(ServeDir::new(&static_dir).append_index_html_on_directories(true))
        .layer(cors)
        .layer(TraceLayer::new_for_http())
        .with_state(state);

    let port: u16 = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(8080);
    let addr = SocketAddr::from(([0, 0, 0, 0], port));

    tracing::info!("🚀 Server Rust berjalan di http://localhost:{}", port);
    tracing::info!("⚡ REST API tersedia di http://localhost:{}/api/v1/health", port);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
