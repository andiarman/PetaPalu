use yew::prelude::*;
use petapalu_common::models::AppMode;

#[derive(Properties, PartialEq)]
pub struct LegendProps {
    pub mode: AppMode,
    pub active_category: String,
    pub active_time_filter: String,
    pub on_select_category: Callback<String>,
    pub on_select_time: Callback<String>,
}

#[function_component(MapLegend)]
pub fn map_legend(props: &LegendProps) -> Html {
    let mode_class = match props.mode {
        AppMode::Culinary => "culinary-only-ui",
        AppMode::Printing => "printing-only-ui",
        AppMode::Hardware => "hardware-only-ui",
        AppMode::SpbuIbadah => "facility-only-ui",
        AppMode::Parks => "parks-only-ui",
        _ => return html! {},
    };

    let categories: Vec<(&'static str, &'static str, &'static str)> = match props.mode {
        AppMode::Parks => vec![
            ("all", "Semua", "🌳"),
            ("taman_kota", "Taman Kota", "🌳"),
            ("hutan_kota", "Hutan Kota", "🌲"),
            ("taman_pantai", "Taman Pantai", "🌊"),
            ("sarana_olahraga", "Sarana Olahraga", "⚽"),
            ("wisata_bukit", "Wisata Puncak", "⛰️"),
            ("taman_ramah_anak", "Taman Anak & RTH", "🎠"),
        ],
        AppMode::SpbuIbadah => vec![
            ("all", "Semua", "⛽"),
            ("spbu", "SPBU", "⛽"),
            ("pertashop", "Pertashop", "🛢️"),
            ("masjid", "Masjid", "🕌"),
            ("gereja", "Gereja", "⛪"),
            ("pura", "Pura", "🛕"),
            ("vihara", "Vihara", "🪷"),
        ],
        _ => vec![("all", "Semua", "📍")],
    };

    html! {
        <div class={classes!("map-legend", mode_class)}>
            <div class="legend-head">
                <span class="legend-label">{"Filter Kategori"}</span>
            </div>

            { for categories.into_iter().map(|(key, label, icon)| {
                let is_active = props.active_category == key;
                let k = key.to_string();
                let cb = props.on_select_category.clone();
                let on_click = Callback::from(move |_| cb.emit(k.clone()));

                html! {
                    <button
                        type="button"
                        class="legend-item"
                        aria-pressed={if is_active { "true" } else { "false" }}
                        onclick={on_click}
                    >
                        <i class="legend-icon" aria-hidden="true">{ icon }</i>
                        <span>{ label }</span>
                    </button>
                }
            }) }
        </div>
    }
}
