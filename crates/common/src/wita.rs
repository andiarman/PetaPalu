use chrono::{DateTime, FixedOffset, NaiveTime, Utc};
use crate::models::PlaceRecord;

/// Returns current time in Asia/Makassar (WITA, UTC+8)
pub fn current_wita_time() -> DateTime<FixedOffset> {
    let wita_offset = FixedOffset::east_opt(8 * 3600).unwrap();
    Utc::now().with_timezone(&wita_offset)
}

/// Evaluates if a place is open at the given WITA time
pub fn is_place_open_now(place: &PlaceRecord, now_wita: &DateTime<FixedOffset>) -> bool {
    // 1. Check 24-hours flag or 24-jam string in name/hours
    if let Some(ref oh) = place.operating_hours {
        if oh.is_open_24_hours {
            return true;
        }
        if let Some(ref text) = oh.hours_text {
            let lower = text.to_lowercase();
            if lower.contains("24 jam") || lower.contains("24 hours") {
                return true;
            }
        }
    }

    if place.name.to_lowercase().contains("24 jam") {
        return true;
    }

    // 2. Parse operational hours format, e.g. "08.00–22.00" or "08:00 - 22:00"
    if let Some(ref oh) = place.operating_hours {
        if let Some(ref text) = oh.hours_text {
            return parse_and_check_hours(text, now_wita.time());
        }
    }

    // Default: assume open if open-air public parks, or scheduled
    false
}

fn parse_and_check_hours(text: &str, current_time: NaiveTime) -> bool {
    let clean = text.replace('–', "-").replace("WITA", "").replace("wita", "");
    let parts: Vec<&str> = clean.split('-').map(|s| s.trim()).collect();
    if parts.len() != 2 {
        return false;
    }

    let parse_time = |s: &str| -> Option<NaiveTime> {
        let normalized = s.replace('.', ":");
        let subparts: Vec<&str> = normalized.split(':').collect();
        if subparts.len() == 2 {
            let hour: u32 = subparts[0].trim().parse().ok()?;
            let min: u32 = subparts[1].trim().parse().ok()?;
            NaiveTime::from_hms_opt(hour, min, 0)
        } else {
            None
        }
    };

    if let (Some(open), Some(close)) = (parse_time(parts[0]), parse_time(parts[1])) {
        if open <= close {
            current_time >= open && current_time <= close
        } else {
            // Over midnight (e.g. 17:00 - 02:00)
            current_time >= open || current_time <= close
        }
    } else {
        false
    }
}
