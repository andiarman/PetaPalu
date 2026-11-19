use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct HeatDockProps {
    pub is_visible: bool,
    pub is_heat_active: bool,
    pub are_markers_active: bool,
    pub gradient_css: String,
    pub on_toggle_heat: Callback<()>,
    pub on_toggle_markers: Callback<()>,
}

#[function_component(HeatmapDock)]
pub fn heatmap_dock(props: &HeatDockProps) -> Html {
    if !props.is_visible {
        return html! {};
    }

    let toggle_heat = {
        let cb = props.on_toggle_heat.clone();
        Callback::from(move |_| cb.emit(()))
    };

    let toggle_markers = {
        let cb = props.on_toggle_markers.clone();
        Callback::from(move |_| cb.emit(()))
    };

    html! {
        <aside id="map-heat-dock" class="map-heat-dock" aria-label="Kontrol Heatmap Kepadatan Palu">
            <div class="heat-dock-header" title="Kontrol Heatmap Kepadatan">
                <span>{"HEAT"}</span>
            </div>

            <button
                type="button"
                id="dock-heat-btn"
                class={classes!("heat-dock-toggle-btn", if props.is_heat_active { "active" } else { "" })}
                aria-pressed={if props.is_heat_active { "true" } else { "false" }}
                data-tooltip={if props.is_heat_active { "Matikan Heatmap (ON)" } else { "Nyalakan Heatmap (OFF)" }}
                onclick={toggle_heat}
            >
                <span class="heat-icon">{"🔥"}</span>
                <span class="heat-state-text">{ if props.is_heat_active { "ON" } else { "OFF" } }</span>
            </button>

            if props.is_heat_active {
                <div id="dock-heat-body" class="heat-dock-legend-body">
                    <div class="heat-dock-vertical-scale" title="Skala Kepadatan Titik (Padat -> Rendah)">
                        <div class="heat-dock-bar" style={format!("background: {};", props.gradient_css)}></div>
                        <div class="heat-dock-labels">
                            <span class="lbl-padat">{"Padat"}</span>
                            <span class="lbl-sedang">{"Sedang"}</span>
                            <span class="lbl-rendah">{"Rendah"}</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        id="dock-heat-marker-btn"
                        class={classes!("heat-dock-marker-btn", if !props.are_markers_active { "is-off" } else { "" })}
                        aria-pressed={if props.are_markers_active { "true" } else { "false" }}
                        data-tooltip={if props.are_markers_active { "Sembunyikan Titik" } else { "Tampilkan Titik" }}
                        onclick={toggle_markers}
                    >
                        <span>{"📍"}</span>
                        <span class="marker-sub">{"TITIK"}</span>
                    </button>
                </div>
            }
        </aside>
    }
}
