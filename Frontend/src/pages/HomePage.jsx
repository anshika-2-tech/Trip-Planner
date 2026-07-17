import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchItinerary } from "../utils/api";
import TripForm from "../components/TripForm";
import LoadingState from "../components/LoadingState";

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // On a hard refresh, always send the user back to Landing.
  // We distinguish a real reload from a navigate-after-reload using a session flag
  // set by LandingPage on mount.
  useEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0];
    const navigatedFromApp = sessionStorage.getItem("navigatedFromApp");
    if (navEntry?.type === "reload" && !navigatedFromApp) {
      sessionStorage.removeItem("itinerary");
      sessionStorage.removeItem("tripError");
      navigate("/", { replace: true });
      return;
    }
    // Clear the flag — it's consumed, next reload check will be genuine
    sessionStorage.removeItem("navigatedFromApp");
  }, [navigate]);

  // If browser restores this page from bfcache (back/forward cache),
  // redirect to Landing so no stale form state is shown
  useEffect(() => {
    function handlePageShow(e) {
      if (e.persisted) {
        sessionStorage.removeItem("itinerary");
        sessionStorage.removeItem("tripError");
        navigate("/", { replace: true });
      }
    }
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [navigate]);

  async function handleSubmit(userInput) {
    setLoading(true);
    sessionStorage.removeItem("itinerary");
    sessionStorage.removeItem("tripError");

    try {
      const data = await fetchItinerary(userInput);
      const enriched = {
        ...data,
        days: data.days.map((day) => ({
          ...day,
          activities: day.activities.map((act) => ({ ...act, completed: false })),
        })),
      };
      sessionStorage.setItem("itinerary", JSON.stringify(enriched));
      sessionStorage.setItem("navigatedFromApp", "true");
      navigate("/itinerary");
    } catch (err) {
      let message = "Something went wrong. Please try again.";
      if (err.response?.data?.error) message = err.response.data.error;
      else if (err.code === "ECONNABORTED" || err.message?.includes("timeout"))
        message = "Request timed out. Please try again.";
      else if (!navigator.onLine) message = "You appear to be offline.";
      sessionStorage.setItem("tripError", message);
      sessionStorage.setItem("navigatedFromApp", "true");
      navigate("/itinerary");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80')` }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(8,8,12,0.88)" }} />
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ── Travel-themed background image ── */}
      <div
        className="fixed inset-0 bg-center bg-cover -z-10"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80')` }}
      />
      {/* ── Overlay: dark enough to read, light enough to feel atmospheric ── */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: "rgba(8,8,12,0.72)" }}
      />

      {/* Header */}
      <header className="relative z-10 px-6 pt-6 pb-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-xl">✈️</span>
            <span
              className="text-white font-bold text-lg group-hover:text-rose-400 transition-colors"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              TripAI
            </span>
          </button>
          <div className="flex items-center gap-2">
            {["🏔️", "🌴", "🏰"].map((icon, i) => (
              <span key={i} className="text-sm opacity-40 hover:opacity-80 transition-opacity cursor-default">
                {icon}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />
      </div>

      <main className="relative z-10 flex flex-col items-center px-4 pt-10 sm:pt-14 pb-12 sm:pb-16">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 animate-fade-in-up">
          <h1
            className="text-white leading-tight mb-3 sm:mb-4"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(2.4rem, 8vw, 5.5rem)",
              fontWeight: 700,
              textShadow: "0 0 60px rgba(225,29,72,0.15)",
            }}
          >
            Where to next?
          </h1>
          <p className="text-zinc-500 text-sm max-w-xs mx-auto leading-relaxed">
            Describe your dream trip and get a full day-by-day itinerary in seconds.
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <TripForm onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
