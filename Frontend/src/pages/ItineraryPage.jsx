import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TripSummary from "../components/TripSummary";
import DayCard from "../components/DayCard";
import ProgressBar from "../components/ProgressBar";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import AccommodationSection from "../components/AccommodationSection";
import MustVisitSection from "../components/MustVisitSection";
import CostBreakdown from "../components/CostBreakdown";
import LocalTips from "../components/LocalTips";
import { fetchItinerary } from "../utils/api";

function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 px-1">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #1f1f1f, transparent)" }} />
      <p className="text-xs font-semibold uppercase tracking-widest flex-shrink-0" style={{ color: "#3f3f3f" }}>
        {label}
      </p>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #1f1f1f)" }} />
    </div>
  );
}

// Keep sessionStorage in sync so the current tab survives component re-mounts
function persist(updated) {
  sessionStorage.setItem("itinerary", JSON.stringify(updated));
  return updated;
}

function ItineraryPage() {
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  // Map of dayNumber → { loading, error }
  const [dayRegen, setDayRegen] = useState({});

  useEffect(() => {
    // On a hard refresh, always send the user back to Landing.
    // Use the navigatedFromApp flag to distinguish real reloads from navigations.
    const navEntry = performance.getEntriesByType("navigation")[0];
    const navigatedFromApp = sessionStorage.getItem("navigatedFromApp");
    if (navEntry?.type === "reload" && !navigatedFromApp) {
      sessionStorage.removeItem("itinerary");
      sessionStorage.removeItem("tripError");
      navigate("/", { replace: true });
      return;
    }
    // Consume the flag
    sessionStorage.removeItem("navigatedFromApp");

    const stored = sessionStorage.getItem("itinerary");
    const storedError = sessionStorage.getItem("tripError");
    if (stored) {
      try { setItinerary(JSON.parse(stored)); }
      catch { setError("Failed to load itinerary. Please try again."); }
    } else if (storedError) {
      setError(storedError);
      sessionStorage.removeItem("tripError");
    } else {
      navigate("/planner");
    }
  }, [navigate]);

  // Clear stale data when browser restores this page from bfcache (back/forward nav)
  useEffect(() => {
    function handlePageShow(e) {
      // persisted = true means the page was restored from bfcache
      if (e.persisted) {
        sessionStorage.removeItem("itinerary");
        sessionStorage.removeItem("tripError");
        // Redirect to Landing so the user always starts fresh after a reload
        navigate("/", { replace: true });
      }
    }
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [navigate]);

  // ── mutations ─────────────────────────────────────────────────────

  const handleDeleteDay = useCallback((dayNumber) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const filtered = prev.days.filter((d) => d.day !== dayNumber);
      if (filtered.length === 0) return prev;
      return persist({ ...prev, days: filtered.map((d, i) => ({ ...d, day: i + 1 })) });
    });
  }, []);

  const handleMoveDay = useCallback((fromIndex, toIndex) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const days = [...prev.days];
      const [moved] = days.splice(fromIndex, 1);
      days.splice(toIndex, 0, moved);
      return persist({ ...prev, days: days.map((d, i) => ({ ...d, day: i + 1 })) });
    });
  }, []);

  const handleToggleActivity = useCallback((dayNumber, activityId) => {
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
      return persist({ ...prev, days });
    });
  }, []);

  // ── single-day regeneration ───────────────────────────────────────

  const handleRegenDay = useCallback(async (day) => {
    if (!itinerary) return;

    const { destination, duration, budget, travelStyle } = itinerary.tripSummary;

    const userInput =
      `For a ${duration} trip to ${destination} with a budget of ${budget} and travel style: ${travelStyle}, ` +
      `regenerate ONLY Day ${day.day} activities. Keep the same destination, duration, budget, and travel style. ` +
      `Return a full valid itinerary JSON but I only need Day ${day.day} to be different from: "${day.title}".`;

    setDayRegen((prev) => ({ ...prev, [day.day]: { loading: true, error: null } }));

    try {
      const data = await fetchItinerary(userInput);
      const newDay = data.days?.find((d) => d.day === day.day) ?? data.days?.[0];
      if (!newDay) throw new Error("No day data in response");

      const enrichedDay = {
        ...newDay,
        day: day.day,
        activities: newDay.activities.map((act) => ({ ...act, completed: false })),
      };

      setItinerary((prev) => {
        if (!prev) return prev;
        const days = prev.days.map((d) => (d.day === day.day ? enrichedDay : d));
        return persist({ ...prev, days });
      });

      setDayRegen((prev) => ({ ...prev, [day.day]: { loading: false, error: null } }));
    } catch (err) {
      const msg = err.response?.data?.error ?? "Regeneration failed. Tap to retry.";
      setDayRegen((prev) => ({ ...prev, [day.day]: { loading: false, error: msg } }));
    }
  }, [itinerary]);

  // ── new trip: clear session and go back to form ───────────────────

  function handleNewTrip() {
    sessionStorage.removeItem("itinerary");
    navigate("/planner");
  }

  // ── derived ───────────────────────────────────────────────────────

  const completionStats = itinerary
    ? (() => {
        const all = itinerary.days.flatMap((d) => d.activities);
        return { completed: all.filter((a) => a.completed).length, total: all.length };
      })()
    : null;

  // ── guards ────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80')` }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(8,8,12,0.88)" }} />
        <div className="relative z-10">
          <ErrorState message={error} onRetry={() => navigate("/planner")} retryLabel="Plan a new trip" />
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80')` }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(8,8,12,0.88)" }} />
        <div className="relative z-10">
          <LoadingState />
        </div>
      </div>
    );
  }

  const { accommodations, mustVisit, costBreakdown, localTips } = itinerary;
  const hasExtras =
    accommodations?.length ||
    mustVisit?.length ||
    costBreakdown?.length ||
    localTips?.length;

  // ── render ────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen relative">
      {/* ── Travel-themed background image ── */}
      <div
        className="fixed inset-0 bg-center bg-cover -z-10"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80')` }}
      />
      {/* ── Overlay ── */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: "rgba(8,8,12,0.72)" }}
      />

      {/* Sticky header */}
      <header
        className="sticky top-0 z-20 px-4 py-3"
        style={{
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
          {/* Back → input form via history */}
          <button
            onClick={() => {
              sessionStorage.removeItem("itinerary");
              navigate(-1);
            }}
            className="text-zinc-400 hover:text-rose-400 transition-colors text-sm cursor-pointer flex-shrink-0"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 cursor-pointer group"
          >
            <span className="text-base">✈️</span>
            <span
              className="text-white font-bold text-base group-hover:text-rose-400 transition-colors"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              TripAI
            </span>
          </button>
          <button
            onClick={handleNewTrip}
            className="text-white text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl cursor-pointer hover:opacity-90 transition-all flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#e11d48,#f43f5e)" }}
          >
            New Trip
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-4 sm:space-y-5">

        <TripSummary summary={itinerary.tripSummary} />

        {completionStats && (
          <ProgressBar completed={completionStats.completed} total={completionStats.total} />
        )}

        {hasExtras && (
          <>
            <SectionDivider label="Trip Details" />
            <MustVisitSection mustVisit={mustVisit} />
            <AccommodationSection accommodations={accommodations} />
            {(costBreakdown?.length > 0 || localTips?.length > 0) && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <CostBreakdown costBreakdown={costBreakdown} />
                <LocalTips localTips={localTips} />
              </div>
            )}
          </>
        )}

        <SectionDivider label="Day-by-Day Itinerary" />

        <div className="space-y-3">
          {itinerary.days.map((day, index) => (
            <DayCard
              key={`day-${day.day}`}
              day={day}
              index={index}
              totalDays={itinerary.days.length}
              onDelete={() => handleDeleteDay(day.day)}
              onMoveUp={index > 0 ? () => handleMoveDay(index, index - 1) : null}
              onMoveDown={
                index < itinerary.days.length - 1
                  ? () => handleMoveDay(index, index + 1)
                  : null
              }
              onToggleActivity={(actId) => handleToggleActivity(day.day, actId)}
              onRegenDay={() => handleRegenDay(day)}
              regenState={dayRegen[day.day] ?? { loading: false, error: null }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ItineraryPage;
