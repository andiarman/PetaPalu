use crate::models::{PlaceRecord, SearchResultItem};

/// Fast in-memory search across places with relevance scoring
pub fn search_places(places: &[PlaceRecord], query: &str, limit: usize) -> Vec<SearchResultItem> {
    let q = query.trim().to_lowercase();
    if q.is_empty() {
        return Vec::new();
    }

    let mut results: Vec<SearchResultItem> = places
        .iter()
        .filter_map(|p| {
            let name_lower = p.name.to_lowercase();
            let addr_lower = p.address.to_lowercase();
            let cat_lower = p.category_label.to_lowercase();
            let kec_lower = p.kecamatan.as_deref().unwrap_or("").to_lowercase();

            let mut score = 0;

            if name_lower.starts_with(&q) {
                score += 100;
            } else if name_lower.contains(&q) {
                score += 50;
            }

            if cat_lower.contains(&q) {
                score += 30;
            }

            if addr_lower.contains(&q) || kec_lower.contains(&q) {
                score += 20;
            }

            for f in &p.features {
                if f.to_lowercase().contains(&q) {
                    score += 10;
                    break;
                }
            }

            if score > 0 {
                Some(SearchResultItem {
                    id: p.id.clone(),
                    name: p.name.clone(),
                    category_label: p.category_label.clone(),
                    address: p.address.clone(),
                    icon: p.icon.clone(),
                    lat: p.lat,
                    lon: p.lon,
                    score,
                })
            } else {
                None
            }
        })
        .collect();

    results.sort_by(|a, b| b.score.cmp(&a.score));
    results.truncate(limit);
    results
}

/// Calculate Haversine distance in meters between two lat/lon points
pub fn haversine_distance_meters(lat1: f64, lon1: f64, lat2: f64, lon2: f64) -> f64 {
    const EARTH_RADIUS: f64 = 6_371_000.0;
    let d_lat = (lat2 - lat1).to_radians();
    let d_lon = (lon2 - lon1).to_radians();

    let a = (d_lat / 2.0).sin().powi(2)
        + lat1.to_radians().cos() * lat2.to_radians().cos() * (d_lon / 2.0).sin().powi(2);
    let c = 2.0 * a.sqrt().atan2((1.0 - a).sqrt());

    EARTH_RADIUS * c
}
