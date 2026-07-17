import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ICONS = [
  { icon: "✈️", top: "12%",  left: "8%",   delay: "0s",   size: "text-3xl", hideOnMobile: false },
  { icon: "🧭", top: "18%",  right: "10%", delay: "0.8s", size: "text-2xl", hideOnMobile: true  },
  { icon: "🗺️", bottom: "20%", left: "6%", delay: "1.4s", size: "text-2xl", hideOnMobile: true  },
  { icon: "📍", top: "60%",  right: "7%",  delay: "0.4s", size: "text-xl",  hideOnMobile: false },
  { icon: "⛺", bottom: "15%", right: "12%", delay: "1s",  size: "text-2xl", hideOnMobile: true  },
  { icon: "🏔️", top: "35%",  left: "4%",  delay: "1.8s", size: "text-xl",  hideOnMobile: true  },
];

function LandingPage() {
  const navigate = useNavigate();

  // Always wipe any leftover session data when landing here (fresh start)
  // Also set a flag so child pages know the next navigation is intentional (not a reload)
  useEffect(() => {
    sessionStorage.removeItem("itinerary");
    sessionStorage.removeItem("tripError");
    sessionStorage.setItem("navigatedFromApp", "true");
  }, []);

  function handleStart() {
    navigate("/planner");
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden cursor-pointer select-none"
      onClick={handleStart}
    >
      {/* Background image with slow zoom */}
      <div
        className="absolute inset-0 bg-center bg-cover animate-zoom-slow"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.65) 100%)" }}
      />

      {/* Floating icons — hidden on mobile to avoid overlapping text */}
      {ICONS.map((item, i) => (
        <span
          key={i}
          className={`absolute ${item.size} animate-float pointer-events-none opacity-70 ${item.hideOnMobile ? "hidden sm:block" : ""}`}
          style={{
            top: item.top, left: item.left, right: item.right, bottom: item.bottom,
            animationDelay: item.delay,
            animationDuration: `${3.5 + i * 0.4}s`,
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
          }}
        >
          {item.icon}
        </span>
      ))}

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-8 text-center">

        {/* Heading */}
        <h1
          className="text-white leading-tight mb-3 animate-fade-in-up"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(2.8rem, 10vw, 7rem)",
            fontWeight: 700,
            textShadow: "0 2px 30px rgba(0,0,0,0.6)",
            animationDelay: "0.15s",
          }}
        >
          Welcome to <br />
          <span
            style={{
              background: "linear-gradient(135deg,#fda4af,#f43f5e,#fb7185)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Trip Planner
          </span>
        </h1>

        {/* Glassmorphism card */}
        <div
          className="animate-fade-in-up mt-2 mb-6 sm:mb-8 px-5 sm:px-8 py-4 sm:py-5 rounded-2xl w-full max-w-sm sm:max-w-md"
          style={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            animationDelay: "0.4s",
          }}
        >
          <div className="text-xl sm:text-2xl mb-2 sm:mb-3 opacity-60">🏔️ ✦ 🏔️</div>
          <p className="text-white text-sm sm:text-base font-medium tracking-wide mb-1">
            Let's build your perfect trip together
          </p>
          <p className="text-zinc-400 text-xs mt-2 italic">
            "Every journey begins with a single click."
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={(e) => { e.stopPropagation(); handleStart(); }}
          className="animate-fade-in-up group relative overflow-hidden px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-white font-semibold text-sm tracking-wide cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgba(225,29,72,0.9), rgba(244,63,94,0.9))",
            border: "1px solid rgba(251,113,133,0.4)",
            boxShadow: "0 0 30px rgba(225,29,72,0.35), 0 4px 20px rgba(0,0,0,0.3)",
            animationDelay: "0.6s",
          }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)" }}
          />
          <span className="relative z-10 flex items-center gap-2">
            <span className="hidden sm:inline">Click Anywhere to Get Started</span>
            <span className="sm:hidden">Get Started</span>
            <span className="text-base">›</span>
          </span>
        </button>

      </div>
    </div>
  );
}

export default LandingPage;
