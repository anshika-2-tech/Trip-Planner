import { useState, useRef, useCallback } from "react";
import { fetchItinerary } from "../utils/api";

/**
 * Custom hook to manage itinerary generation and state.
 * Handles loading, errors, cancellation of stale requests, and all
 * interactive features: delete day, reorder days, mark activity complete.
 */
export function useItinerary() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const generate = useCallback(async (userInput) => {
    // Cancel any in-flight request to prevent stale responses
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const data = await fetchItinerary(userInput, controller.signal);

      // Add a `completed` flag to each activity for progress tracking
      const enriched = {
        ...data,
        days: data.days.map((day) => ({
          ...day,
          activities: day.activities.map((act) => ({
            ...act,
            completed: false,
          })),
        })),
      };

      setItinerary(enriched);
    } catch (err) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
        // Request was intentionally cancelled — don't show error
        return;
      }

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
        setError("The request timed out. Please try again.");
      } else if (!navigator.onLine) {
        setError("You appear to be offline. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDay = useCallback((dayNumber) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const filtered = prev.days.filter((d) => d.day !== dayNumber);
      // Re-number days after deletion
      const renumbered = filtered.map((d, i) => ({ ...d, day: i + 1 }));
      return { ...prev, days: renumbered };
    });
  }, []);

  const moveDay = useCallback((fromIndex, toIndex) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const days = [...prev.days];
      const [moved] = days.splice(fromIndex, 1);
      days.splice(toIndex, 0, moved);
      const renumbered = days.map((d, i) => ({ ...d, day: i + 1 }));
      return { ...prev, days: renumbered };
    });
  }, []);

  const toggleActivity = useCallback((dayNumber, activityId) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const days = prev.days.map((day) => {
        if (day.day !== dayNumber) return day;
        return {
          ...day,
          activities: day.activities.map((act) =>
            act.id === activityId ? { ...act, completed: !act.completed } : act
          ),
        };
      });
      return { ...prev, days };
    });
  }, []);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setItinerary(null);
    setError(null);
    setLoading(false);
  }, []);

  // Calculate overall completion percentage
  const completionStats = itinerary
    ? (() => {
        const allActivities = itinerary.days.flatMap((d) => d.activities);
        const completed = allActivities.filter((a) => a.completed).length;
        return { completed, total: allActivities.length };
      })()
    : null;

  return {
    itinerary,
    loading,
    error,
    generate,
    deleteDay,
    moveDay,
    toggleActivity,
    reset,
    completionStats,
  };
}
