const KEY = "tripai_last_itinerary";

export function saveItinerary(itinerary) {
  try {
    localStorage.setItem(KEY, JSON.stringify(itinerary));
  } catch {
    // storage full or unavailable — fail silently
  }
}

export function loadItinerary() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Basic shape check
    if (!parsed?.tripSummary || !Array.isArray(parsed?.days)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearItinerary() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
