import { Clock, Wallet, Sparkles } from "lucide-react";

function TripSummary({ summary }) {
  if (!summary) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: "rgba(13,13,18,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(244,63,94,0.25)",
        boxShadow: "0 4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,63,94,0.06)",
      }}
    >
      {/* ── Hero band ─────────────────────────────────────────────────── */}
      <div
        className="relative px-6 pt-7 pb-6 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(225,29,72,0.22) 0%, rgba(244,63,94,0.12) 50%, rgba(13,13,18,0.0) 100%)",
        }}
      >
        {/* decorative blobs */}
        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-rose-600 rounded-full opacity-[0.12] blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-pink-500 rounded-full opacity-[0.08] blur-2xl pointer-events-none" />

        {/* "Your Trip" eyebrow */}
        <div className="relative z-10 flex items-center gap-2 mb-3">
          <Sparkles size={12} style={{ color: "#fb7185" }} />
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#fb7185" }}>
            Your Itinerary
          </p>
        </div>

        {/* Destination headline */}
        <h1
          className="relative z-10 text-white leading-tight mb-1"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(1.7rem, 5vw, 2.8rem)",
            fontWeight: 700,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {summary.destination}
        </h1>

        {/* Travel style sub-label */}
        {summary.travelStyle && (
          <p className="relative z-10 text-xs mb-5" style={{ color: "#71717a" }}>
            {summary.travelStyle}
          </p>
        )}

        {/* Stat pills */}
        <div className="relative z-10 flex flex-wrap gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: "rgba(225,29,72,0.12)",
              border: "1px solid rgba(225,29,72,0.25)",
              color: "#fda4af",
            }}
          >
            <Clock size={11} />
            {summary.duration}
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: "rgba(225,29,72,0.12)",
              border: "1px solid rgba(225,29,72,0.25)",
              color: "#fda4af",
            }}
          >
            <Wallet size={11} />
            {summary.budget}
          </div>
        </div>
      </div>

      {/* ── Highlights band ───────────────────────────────────────────── */}
      {summary.highlights?.length > 0 && (
        <div
          className="px-6 py-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderTop: "1px solid rgba(244,63,94,0.1)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-2.5"
            style={{ color: "#3f3f3f" }}
          >
            Highlights
          </p>
          <div className="flex flex-wrap gap-2">
            {summary.highlights.map((h, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(244,63,94,0.07)",
                  border: "1px solid rgba(244,63,94,0.14)",
                  color: "#fda4af",
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TripSummary;
