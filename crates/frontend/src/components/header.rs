use yew::prelude::*;
use petapalu_common::models::AppMode;

#[derive(Properties, PartialEq)]
pub struct HeaderProps {
    pub current_mode: AppMode,
    pub wita_clock: String,
    pub on_search: Callback<String>,
    pub on_open_dashboard: Callback<()>,
}

#[function_component(AppHeader)]
pub fn app_header(props: &HeaderProps) -> Html {
    let brand_title = props.current_mode.display_title();
    let search_placeholder = match props.current_mode {
        AppMode::Outage => "Cari jalan / lokasi padam...",
        AppMode::Culinary => "Cari coffeeshop, cafe, resto, atau kaledo...",
        AppMode::Printing => "Cari fotocopy, print, percetakan...",
        AppMode::Hardware => "Cari toko komputer, laptop, hp, servis...",
        AppMode::SpbuIbadah => "Cari SPBU Pertamina, masjid, gereja, pura, vihara...",
        AppMode::Parks => "Cari taman kota, hutan kota, lapangan olahraga, RTH...",
        AppMode::Rtrw => "Cari kawasan, zona, atau kelurahan di Palu...",
        AppMode::Contour => "Cari kontur & topografi...",
    };

    let on_input = {
        let cb = props.on_search.clone();
        Callback::from(move |e: InputEvent| {
            let input: web_sys::HtmlInputElement = e.target_unchecked_into();
            cb.emit(input.value());
        })
    };

    let open_dash = {
        let cb = props.on_open_dashboard.clone();
        Callback::from(move |_| cb.emit(()))
    };

    html! {
        <header>
            <div class="brand">
                <div class="brand-mode-wrapper">
                    <button
                        type="button"
                        class={classes!("brand-icon", "mode-selector-btn", format!("mode-{}", props.current_mode.as_str()))}
                        onclick={open_dash}
                        title="Buka Menu Dashboard Peta Palu"
                    >
                        <span class="mode-icon-inner">{"🗺️"}</span>
                    </button>
                </div>

                <div class="brand-info">
                    <h1 id="app-brand-title">{ brand_title }</h1>
                    <time id="wita-clock">{ &props.wita_clock }</time>
                </div>
            </div>

            <div class="map-search-bar" id="map-search-bar">
                <div class="search-input-shell">
                    <span class="search-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                    <input
                        type="search"
                        id="street-search-input"
                        placeholder={search_placeholder}
                        autocomplete="off"
                        spellcheck="false"
                        oninput={on_input}
                    />
                </div>
            </div>
        </header>
    }
}
