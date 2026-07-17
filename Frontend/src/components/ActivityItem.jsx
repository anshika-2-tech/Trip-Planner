const TYPE_CONFIG = {
  sightseeing: { icon: "🏛️", color: "#f59e0b" },
  food:        { icon: "🍽️", color: "#f97316" },
  trek:        { icon: "🥾", color: "#22c55e" },
  travel:      { icon: "🚗", color: "#a78bfa" },
  leisure:     { icon: "🌅", color: "#ec4899" },
  shopping:    { icon: "🛍️", color: "#fb7185" },
  photography: { icon: "📷", color: "#38bdf8" },
};

function ActivityItem({ activity, onToggle }) {
  const config = TYPE_CONFIG[activity.type] || { icon: "📍", color: "#9f9f9f" };

  return (
    <div
      onClick={onToggle}
      className="flex items-start gap-3 px-3 sm:px-4 py-3 sm:py-3.5 cursor-pointer transition-all"
      style={{
        borderBottom: "1px solid #161616",
        opacity: activity.completed ? 0.4 : 1,
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
    >
      {/* Checkbox */}
      <div
        className="mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
        style={{
          borderColor: activity.completed ? "#e11d48" : "#2a2a2a",
          background: activity.completed ? "#e11d48" : "transparent",
          boxShadow: activity.completed ? "0 0 8px rgba(225,29,72,0.4)" : "none",
        }}
      >
        {activity.completed && <span className="text-white text-xs leading-none">✓</span>}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="text-xs flex-shrink-0" style={{ color: "#3a3a3a" }}>{activity.time}</span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: `${config.color}12`, color: config.color }}
          >
            {config.icon} {activity.type}
          </span>
        </div>
        <p className={`text-sm font-semibold text-white break-words ${activity.completed ? "line-through" : ""}`}>
          {activity.title}
        </p>
        <p className="text-xs mt-0.5 leading-relaxed break-words" style={{ color: "#606060" }}>
          {activity.description}
        </p>
      </div>
    </div>
  );
}

export default ActivityItem;
