use yew::prelude::*;
use petapalu_common::models::AppMode;

#[derive(Properties, PartialEq)]
pub struct DockProps {
    pub current_mode: AppMode,
    pub on_select_mode: Callback<AppMode>,
}

#[function_component(QuickModeDock)]
pub fn quick_mode_dock(props: &DockProps) -> Html {
    let modes = [
        (AppMode::Outage, "dock-btn-outage", "Peta Pemadaman Listrik", html! {
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.2 2 4.6 13.3h6.1L9.6 22l8.8-11.6h-6.1z"/></svg>
        }),
        (AppMode::Culinary, "dock-btn-culinary", "Peta Coffeeshop & Resto", html! {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
        }),
        (AppMode::Printing, "dock-btn-printing", "Peta Fotocopy & Percetakan", html! {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
        }),
        (AppMode::Hardware, "dock-btn-hardware", "Peta Elektronik & Servis", html! {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
        }),
        (AppMode::SpbuIbadah, "dock-btn-facility", "Peta SPBU & Tempat Ibadah", html! {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 22h12"></path>
                <path d="M4 9h10"></path>
                <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"></path>
                <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"></path>
            </svg>
        }),
        (AppMode::Parks, "dock-btn-parks", "Peta Taman & Fasilitas", html! {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22v-5"/>
                <path d="M12 17c-3.5 0-6-2.5-6-6 0-3 2-5 3.5-6.5C10.5 3.5 11 2.5 12 2c1 0.5 1.5 1.5 2.5 2.5C16 6 18 8 18 11c0 3.5-2.5 6-6 6z"/>
            </svg>
        }),
        (AppMode::Rtrw, "dock-btn-rtrw", "Peta RTRW Kota Palu 2021–2041", html! {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/>
            </svg>
        }),
    ];

    html! {
        <nav id="map-mode-dock" class="map-mode-dock" aria-label="Pilih Layanan Peta Palu">
            <div class="dock-header" title="Ganti Mode Peta">
                <span>{"PETA"}</span>
            </div>
            <div class="dock-buttons">
                { for modes.iter().map(|(mode, class_name, tooltip, icon)| {
                    let is_active = *mode == props.current_mode;
                    let active_class = if is_active { "active" } else { "" };
                    let m = *mode;
                    let on_click = {
                        let cb = props.on_select_mode.clone();
                        Callback::from(move |_| cb.emit(m))
                    };

                    html! {
                        <button
                            type="button"
                            class={classes!("dock-mode-btn", *class_name, active_class)}
                            data-mode={m.as_str()}
                            data-tooltip={*tooltip}
                            aria-label={*tooltip}
                            aria-current={if is_active { "page" } else { "false" }}
                            onclick={on_click}
                        >
                            { icon.clone() }
                        </button>
                    }
                }) }
            </div>
        </nav>
    }
}
