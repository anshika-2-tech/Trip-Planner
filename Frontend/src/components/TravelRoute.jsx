import { Plane, Train, Car, Clock, Banknote } from "lucide-react";

const MODE_CONFIG = {
  flight: {
    Icon: Plane,
    label: "Flight",
    color: "#38bdf8",
    bg: "rgba(13,13,18,0.90)",
    border: "rgba(56,189,248,0.28)",
  },
  train: {
    Icon: Train,
    label: "Train",
    color: "#34d399",
    bg: "rgba(13,13,18,0.90)",
    border: "rgba(52,211,153,0.28)",
  },
  road: {
    Icon: Car,
    label: "Road",
    color: "#fb923c",
    bg: "rgba(13,13,18,0.90)",
    border: "rgba(251,146,60,0.28)",
  },
};

function RouteCard({ route }) {
  const cfg = MODE_CONFIG[route.mode] ?? MODE_CONFIG.road;
  const { Icon } = cfg;

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3 flex-shrink-0 w-56 transition-all duration-200"
      style={{
        background: cfg.bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${cfg.border}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
      }}
    >
      {/* Mode badge */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${cfg.color}18` }}
        >
          <Icon size={15} style={{ color: cfg.color }} />
        </div>
        <span className="text-sm font-semibold" style={{ color: cfg.color }}>
          {cfg.label}
        </span>
      </div>

      {/* Duration + cost */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Clock size={11} style={{ color: "#52525b" }} />
          <span className="text-xs text-zinc-400">{route.duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Banknote size={11} style={{ color: "#52525b" }} />
          <span className="text-xs text-zinc-400">{route.cost}</span>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs leading-relaxed" style={{ color: "#a1a1aa" }}>
        {route.note}
      </p>
    </div>
  );
}

function TravelRoute({ travelRoute }) {
  if (!travelRoute || travelRoute.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3 px-1">
        <Plane size={13} style={{ color: "#38bdf8" }} />
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#80ca11" }}>
          How to Reach
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
        {travelRoute.map((route, i) => (
          <RouteCard key={i} route={route} />
        ))}
      </div>
    </div>
  );
}

export default TravelRoute;
