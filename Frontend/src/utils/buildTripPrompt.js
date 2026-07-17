/**
 * Converts structured form data into a natural-language string
 * suitable for the backend's `userInput` field.
 *
 * @param {Object} formData
 * @param {string}   formData.destination
 * @param {string}   formData.fromCity      - departure city
 * @param {number}   formData.duration       - number of days
 * @param {number}   formData.travelers      - number of travelers
 * @param {string}   formData.budget         - e.g. "₹25,000" or "Mid-range"
 * @param {string[]} formData.travelStyles   - e.g. ["Adventure","Food"]
 * @param {string}   formData.preferences    - optional free-text
 * @returns {string}
 */
export function buildTripPrompt({ destination, fromCity, duration, travelers, budget, travelStyles, preferences }) {
  const travelerStr = travelers === 1 ? "1 traveler" : `${travelers} travelers`;
  const durationStr = duration === 1 ? "1-day" : `${duration}-day`;
  const styleStr = travelStyles.length > 0 ? travelStyles.join(", ") : "General";
  const fromStr = fromCity && fromCity.trim() ? ` from ${fromCity.trim()}` : "";

  let prompt =
    `Plan a ${durationStr} trip to ${destination}${fromStr} for ${travelerStr} with a budget of ${budget}. ` +
    `Travel style: ${styleStr}.`;

  if (preferences && preferences.trim().length > 0) {
    prompt += ` Additional preferences: ${preferences.trim()}.`;
  }

  return prompt;
}
