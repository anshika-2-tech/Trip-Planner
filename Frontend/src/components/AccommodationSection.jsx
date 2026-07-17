import { Hotel, MapPin, Tag } from "lucide-react";

function AccommodationCard({ hotel }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2 w-full sm:flex-shrink-0 sm:w-64 transition-all duration-200"
      style={{
        background: "rgba(13,13,18,0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(139,92,246,0.2)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid rgba(139,92,246,0.45)";
        e.currentTarget.style.background = "rgba(20,15,30,0.93)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid rgba(139,92,246,0.2)";
        e.currentTarget.style.background = "rgba(13,13,18,0.90)";
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}
        >
          <Hotel size={16} style={{ color: "#a78bfa" }} />
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ background: "rgba(139,92,246,0.1)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.2)" }}
        >
          {hotel.pricePerNight}
        </span>
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-white leading-snug">{hotel.name}</p>

      {/* Area */}
      <div className="flex items-center gap-1.5">
        <MapPin size={11} style={{ color: "#71717a" }} />
        <span className="text-xs text-zinc-500">{hotel.area}</span>
      </div>

      {/* Reason */}
      <p className="text-xs leading-relaxed" style={{ color: "#a1a1aa" }}>{hotel.reason}</p>
    </div>
  );
}

function AccommodationSection({ accommodations }) {
  if (!accommodations || accommodations.length === 0) return null;

  return (
    <div>
      {/* Section label */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <Hotel size={13} style={{ color: "#a78bfa" }} />
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#80ca11" }}>
          Suggested Stays
        </p>
      </div>

      {/* Stack on mobile, horizontal scroll on sm+ */}
      <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-row sm:overflow-x-auto sm:pb-1 sm:-mx-1 sm:px-1" style={{ scrollbarWidth: "none" }}>
        {accommodations.map((hotel, i) => (
          <AccommodationCard key={i} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default AccommodationSection;
