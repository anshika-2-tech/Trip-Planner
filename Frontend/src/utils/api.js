import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Sends the user's trip request to the backend.
 * Returns the parsed itinerary or throws an error with a user-friendly message.
 */
export async function fetchItinerary(userInput, signal) {
  const response = await axios.post(
    `${API_URL}/generate-trip`,
    { userInput },
    { signal, timeout: 60000 }
  );
  return response.data;
}
