import { MapPin, Star } from "lucide-react";

const ACCENT_COLORS = [
  { bg: "rgba(13,13,18,0.90)", border: "rgba(244,63,94,0.3)",  dot: "#f43f5e" },
  { bg: "rgba(13,13,18,0.90)", border: "rgba(251,146,60,0.3)", dot: "#fb923c" },
  { bg: "rgba(13,13,18,0.90)", border: "rgba(34,197,94,0.3)",  dot: "#22c55e" },
  { bg: "rgba(13,13,18,0.90)", border: "rgba(56,189,248,0.3)", dot: "#38bdf8" },
  { bg: "rgba(13,13,18,0.90)", border: "rgba(168,85,247,0.3)", dot: "#a855f7" },
  { bg: "rgba(13,13,18,0.90)", border: "rgba(251,191,36,0.3)", dot: "#fbbf24" },
];

function PlaceCard({ place, colorIndex }) {
  const accent = ACCENT_COLORS[colorIndex % ACCENT_COLORS.length];

  return (
    <div
      className="rounded-xl p-4 w-full sm:flex-shrink-0 sm:w-44 flex flex-col gap-2 transition-all duration-200"
      style={{
        background: accent.bg,
        border: `1px solid ${accent.border}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: `${accent.dot}18` }}
      >
        <MapPin size={14} style={{ color: accent.dot }} />
      </div>
      <p className="text-sm font-semibold text-white leading-snug">{place.name}</p>
      <p className="text-xs leading-relaxed" style={{ color: "#a1a1aa" }}>{place.description}</p>
    </div>
  );
}

function MustVisitSection({ mustVisit }) {
  if (!mustVisit || mustVisit.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3 px-1">
        <Star size={13} style={{ color: "#fbbf24" }} />
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#80ca11" }}>
          Must-Visit Places
        </p>
      </div>

      {/* 2-col grid on mobile, horizontal scroll on sm+ */}
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:overflow-x-auto sm:pb-1 sm:-mx-1 sm:px-1" style={{ scrollbarWidth: "none" }}>
        {mustVisit.map((place, i) => (
          <PlaceCard key={i} place={place} colorIndex={i} />
        ))}
      </div>
    </div>
  );
}

export default MustVisitSection;
