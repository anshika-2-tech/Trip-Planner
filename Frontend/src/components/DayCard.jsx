import { useState } from "react";
import { RefreshCw } from "lucide-react";
import ActivityItem from "./ActivityItem";

function DayCard({
  day, index, totalDays,
  onDelete, onMoveUp, onMoveDown, onToggleActivity,
  onRegenDay, regenState = { loading: false, error: null },
}) {
  const [isOpen, setIsOpen] = useState(index === 0);

  const completedCount = day.activities.filter((a) => a.completed).length;
  const totalCount = day.activities.length;
  const allDone = completedCount === totalCount;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: "rgba(13,13,18,0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${allDone ? "rgba(244,63,94,0.35)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        opacity: regenState.loading ? 0.7 : 1,
      }}
    >
      {/* Rose accent line when complete */}
      <div
        className="h-[2px] transition-all duration-500"
        style={{ background: allDone ? "linear-gradient(90deg,#e11d48,#fb7185)" : "transparent" }}
      />

      {/* Header */}
      <div
        className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 cursor-pointer gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {/* Day badge */}
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: allDone ? "rgba(244,63,94,0.12)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${allDone ? "rgba(244,63,94,0.2)" : "#2a2a2a"}`,
              color: allDone ? "#fb7185" : "#555",
              fontFamily: "'Caveat', cursive",
              fontSize: "1rem",
            }}
          >
            {regenState.loading ? (
              <RefreshCw size={14} className="animate-spin" style={{ color: "#fb7185" }} />
            ) : allDone ? "✓" : day.day}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">{day.title}</p>
            {regenState.loading ? (
              <p className="text-xs mt-1" style={{ color: "#fb7185" }}>Regenerating…</p>
            ) : regenState.error ? (
              <button
                onClick={(e) => { e.stopPropagation(); onRegenDay(); }}
                className="text-xs mt-1 cursor-pointer hover:underline text-left"
                style={{ color: "#f43f5e" }}
              >
                Failed — Retry
              </button>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <div className="w-16 sm:w-20 h-1 rounded-full overflow-hidden" style={{ background: "#1a1a1a" }}>
                  <div
                    className="h-1 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%`, background: "linear-gradient(90deg,#e11d48,#fb7185)" }}
                  />
                </div>
                <span className="text-xs" style={{ color: "#3a3a3a" }}>
                  {completedCount}/{totalCount}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Controls — flex-shrink-0 so they never compress */}
        <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {/* Regenerate */}
          {onRegenDay && !regenState.loading && (
            <button
              onClick={onRegenDay}
              title="Regenerate this day"
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
              style={{ color: "#3a3a3a" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
            >
              <RefreshCw size={13} />
            </button>
          )}
          {onMoveUp && (
            <button
              onClick={onMoveUp}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors text-xs cursor-pointer"
              style={{ color: "#3a3a3a" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fb7185")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
            >↑</button>
          )}
          {onMoveDown && (
            <button
              onClick={onMoveDown}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors text-xs cursor-pointer"
              style={{ color: "#3a3a3a" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fb7185")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
            >↓</button>
          )}
          {totalDays > 1 && (
            <button
              onClick={onDelete}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors text-xs cursor-pointer"
              style={{ color: "#3a3a3a" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f43f5e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
            >✕</button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors text-xs cursor-pointer"
            style={{ color: "#3a3a3a" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
          >
            {isOpen ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Activities */}
      {isOpen && !regenState.loading && (
        <div style={{ borderTop: "1px solid #181818" }}>
          {day.activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              onToggle={() => onToggleActivity(activity.id)}
            />
          ))}
        </div>
      )}

      {/* Loading shimmer while regenerating */}
      {regenState.loading && (
        <div style={{ borderTop: "1px solid #181818" }} className="px-4 py-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3 animate-pulse">
              <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ background: "#1f1f1f" }} />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 rounded" style={{ background: "#1f1f1f", width: `${60 + i * 10}%` }} />
                <div className="h-2 rounded" style={{ background: "#181818", width: "80%" }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DayCard;
