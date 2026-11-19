use yew::prelude::*;
use petapalu_common::models::AppMode;
use crate::components::dock::QuickModeDock;
use crate::components::heat_dock::HeatmapDock;
use crate::components::header::AppHeader;
use crate::components::legend::MapLegend;
use petapalu_common::current_wita_time;

pub enum Msg {
    SwitchMode(AppMode),
    ToggleHeatmap,
    ToggleMarkers,
    UpdateSearch(String),
    OpenDashboard,
    CloseDashboard,
    TickWita,
}

pub struct App {
    current_mode: AppMode,
    is_heat_active: bool,
    are_markers_active: bool,
    active_category: String,
    active_time_filter: String,
    search_query: String,
    wita_clock: String,
    is_dashboard_open: bool,
}

impl Component for App {
    type Message = Msg;
    type Properties = ();

    fn create(ctx: &Context<Self>) -> Self {
        let link = ctx.link().clone();
        gloo_timers::callback::Interval::new(1000, move || {
            link.send_message(Msg::TickWita);
        }).forget();

        let now = current_wita_time();
        let clock = format!("WITA · {}", now.format("%d %b %Y, %H.%M"));

        Self {
            current_mode: AppMode::Outage,
            is_heat_active: false,
            are_markers_active: true,
            active_category: "all".to_string(),
            active_time_filter: "all".to_string(),
            search_query: String::new(),
            wita_clock: clock,
            is_dashboard_open: false,
        }
    }

    fn update(&mut self, _ctx: &Context<Self>, msg: Self::Message) -> bool {
        match msg {
            Msg::SwitchMode(mode) => {
                self.current_mode = mode;
                self.active_category = "all".to_string();
                self.active_time_filter = "all".to_string();
                self.is_dashboard_open = false;
                true
            }
            Msg::ToggleHeatmap => {
                self.is_heat_active = !self.is_heat_active;
                true
            }
            Msg::ToggleMarkers => {
                self.are_markers_active = !self.are_markers_active;
                true
            }
            Msg::UpdateSearch(q) => {
                self.search_query = q;
                true
            }
            Msg::OpenDashboard => {
                self.is_dashboard_open = true;
                true
            }
            Msg::CloseDashboard => {
                self.is_dashboard_open = false;
                true
            }
            Msg::TickWita => {
                let now = current_wita_time();
                self.wita_clock = format!("WITA · {}", now.format("%d %b %Y, %H.%M"));
                true
            }
        }
    }

    fn view(&self, ctx: &Context<Self>) -> Html {
        let is_heat_dock_visible = matches!(
            self.current_mode,
            AppMode::Culinary | AppMode::Printing | AppMode::Hardware | AppMode::SpbuIbadah | AppMode::Parks
        );

        let gradient_css = match self.current_mode {
            AppMode::Culinary => "linear-gradient(180deg, #fef08a 0%, #f43f5e 30%, #ef4444 60%, #f59e0b 80%, rgba(56, 189, 248, 0.6) 100%)",
            AppMode::Printing => "linear-gradient(180deg, #ef4444 0%, #eab308 30%, #10b981 60%, #06b6d4 80%, #0284c7 100%)",
            AppMode::Hardware => "linear-gradient(180deg, #ef4444 0%, #f59e0b 25%, #10b981 50%, #06b6d4 75%, #8b5cf6 100%)",
            AppMode::SpbuIbadah => "linear-gradient(180deg, #ef4444 0%, #f59e0b 25%, #38bdf8 50%, #10b981 75%, #059669 100%)",
            AppMode::Parks => "linear-gradient(180deg, #ef4444 0%, #f59e0b 25%, #06b6d4 50%, #10b981 75%, #059669 100%)",
            _ => "",
        };

        let on_select_mode = ctx.link().callback(Msg::SwitchMode);
        let on_toggle_heat = ctx.link().callback(|_| Msg::ToggleHeatmap);
        let on_toggle_markers = ctx.link().callback(|_| Msg::ToggleMarkers);
        let on_search = ctx.link().callback(Msg::UpdateSearch);
        let on_open_dashboard = ctx.link().callback(|_| Msg::OpenDashboard);
        let on_select_category = ctx.link().callback(|cat| Msg::UpdateSearch(cat));
        let on_select_time = ctx.link().callback(|_| Msg::TickWita);

        html! {
            <div id="rust-app-root">
                <AppHeader
                    current_mode={self.current_mode}
                    wita_clock={self.wita_clock.clone()}
                    on_search={on_search}
                    on_open_dashboard={on_open_dashboard}
                />

                <QuickModeDock
                    current_mode={self.current_mode}
                    on_select_mode={on_select_mode}
                />

                <HeatmapDock
                    is_visible={is_heat_dock_visible}
                    is_heat_active={self.is_heat_active}
                    are_markers_active={self.are_markers_active}
                    gradient_css={gradient_css.to_string()}
                    on_toggle_heat={on_toggle_heat}
                    on_toggle_markers={on_toggle_markers}
                />

                <main id="map" aria-label="Peta Interaktif Kota Palu (Rust WASM)">
                </main>

                <MapLegend
                    mode={self.current_mode}
                    active_category={self.active_category.clone()}
                    active_time_filter={self.active_time_filter.clone()}
                    on_select_category={on_select_category}
                    on_select_time={on_select_time}
                />
            </div>
        }
    }
}
