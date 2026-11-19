use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use petapalu_common::models::{PlaceRecord, PlaceSubmission};

#[derive(Clone)]
pub struct AppState {
    pub places_by_category: Arc<RwLock<HashMap<String, Vec<PlaceRecord>>>>,
    pub all_places: Arc<RwLock<Vec<PlaceRecord>>>,
    pub pending_submissions: Arc<RwLock<Vec<PlaceSubmission>>>,
}

impl AppState {
    pub async fn new_and_load(data_dir: &str) -> Result<Self, Box<dyn std::error::Error>> {
        let mut places_map: HashMap<String, Vec<PlaceRecord>> = HashMap::new();
        let mut all: Vec<PlaceRecord> = Vec::new();

        let files = [
            ("culinary", format!("{}/places/palu-coffeeshop-resto.json", data_dir)),
            ("printing", format!("{}/places/palu-fotocopy-percetakan.json", data_dir)),
            ("hardware", format!("{}/places/palu-hardware-servis.json", data_dir)),
            ("spbu_ibadah", format!("{}/places/palu-spbu-ibadah.json", data_dir)),
            ("parks", format!("{}/places/palu-pertamanan-fasilitas.json", data_dir)),
        ];

        for (mode_key, file_path) in files {
            if let Ok(content) = tokio::fs::read_to_string(&file_path).await {
                if let Ok(records) = serde_json::from_str::<Vec<PlaceRecord>>(&content) {
                    tracing::info!("Loaded {} records for mode '{}' from {}", records.len(), mode_key, file_path);
                    all.extend(records.clone());
                    places_map.insert(mode_key.to_string(), records);
                } else {
                    tracing::warn!("Failed to parse JSON for {}", file_path);
                }
            } else {
                tracing::warn!("File not found or unreadable: {}", file_path);
            }
        }

        Ok(Self {
            places_by_category: Arc::new(RwLock::new(places_map)),
            all_places: Arc::new(RwLock::new(all)),
            pending_submissions: Arc::new(RwLock::new(Vec::new())),
        })
    }
}
