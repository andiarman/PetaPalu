use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum AppMode {
    Outage,
    Culinary,
    Printing,
    Hardware,
    SpbuIbadah,
    Parks,
    Rtrw,
    Contour,
}

impl AppMode {
    pub fn as_str(&self) -> &'static str {
        match self {
            AppMode::Outage => "outage",
            AppMode::Culinary => "culinary",
            AppMode::Printing => "printing",
            AppMode::Hardware => "hardware",
            AppMode::SpbuIbadah => "spbu_ibadah",
            AppMode::Parks => "parks",
            AppMode::Rtrw => "rtrw",
            AppMode::Contour => "contour",
        }
    }

    pub fn display_title(&self) -> &'static str {
        match self {
            AppMode::Outage => "Peta Pemadaman Sulawesi Tengah",
            AppMode::Culinary => "Peta Coffeeshop & Resto — Kota Palu",
            AppMode::Printing => "Peta Fotocopy & Percetakan — Kota Palu",
            AppMode::Hardware => "Peta Elektronik & Servis — Kota Palu",
            AppMode::SpbuIbadah => "Peta SPBU & Tempat Ibadah — Kota Palu",
            AppMode::Parks => "Peta Pertamanan & Fasilitas — Kota Palu",
            AppMode::Rtrw => "Peta RTRW Kota Palu 2021–2041",
            AppMode::Contour => "Peta Kontur & Topografi Palu",
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OperatingHours {
    #[serde(default)]
    pub is_open_24_hours: bool,
    #[serde(default)]
    pub hours_text: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaceRecord {
    pub id: String,
    pub name: String,
    pub category: String,
    pub category_label: String,
    pub icon: String,
    pub lat: f64,
    pub lon: f64,
    pub address: String,
    pub kecamatan: Option<String>,
    pub phone: Option<String>,
    pub price_range: Option<String>,
    #[serde(default)]
    pub features: Vec<String>,
    #[serde(default)]
    pub google_maps_url: Option<String>,
    #[serde(default)]
    pub type_str: Option<String>,
    #[serde(default)]
    pub operating_hours: Option<OperatingHours>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OutagePoint {
    pub id: String,
    pub location: String,
    pub ulp_name: String,
    pub lat: f64,
    pub lon: f64,
    pub time_start: String,
    pub time_end: String,
    pub date: String,
    pub status: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlaceSubmission {
    pub name: String,
    pub category: String,
    pub address: String,
    pub kecamatan: String,
    pub lat: f64,
    pub lon: f64,
    pub phone: Option<String>,
    pub is_24h: bool,
    pub open_hour: Option<String>,
    pub close_hour: Option<String>,
    pub reporter_name: Option<String>,
    pub reporter_contact: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchResultItem {
    pub id: String,
    pub name: String,
    pub category_label: String,
    pub address: String,
    pub icon: String,
    pub lat: f64,
    pub lon: f64,
    pub score: i32,
}
