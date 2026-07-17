import { Wallet } from "lucide-react";

// Fixed palette — one colour per category slot
const SEGMENT_COLORS = ["#f43f5e", "#fb923c", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"];

function CostBreakdown({ costBreakdown }) {
  if (!costBreakdown || costBreakdown.length === 0) return null;

  // Normalise percentages so they always sum to 100 (guard against Gemini rounding)
  const total = costBreakdown.reduce((s, c) => s + (Number(c.percentage) || 0), 0);
  const normalised = costBreakdown.map((c) => ({
    ...c,
    pct: total > 0 ? Math.round((Number(c.percentage) / total) * 100) : 0,
  }));

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(13,13,18,0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(251,191,36,0.2)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}
        >
          <Wallet size={14} style={{ color: "#fbbf24" }} />
        </div>
        <p className="text-sm font-semibold text-white">Budget Breakdown</p>
      </div>

      {/* Stacked bar */}
      <div className="flex w-full h-3 rounded-full overflow-hidden mb-4 gap-px">
        {normalised.map((c, i) => (
          <div
            key={i}
            className="h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${c.pct}%`,
              background: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
              minWidth: c.pct > 0 ? "4px" : "0",
            }}
            title={`${c.category}: ${c.pct}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        {normalised.map((c, i) => (
          <div key={i} className="flex items-center gap-2 min-w-0">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
            />
            <div className="min-w-0">
              <p className="text-xs text-white truncate">{c.category}</p>
              <p className="text-xs" style={{ color: "#52525b" }}>
                {c.amount} · {c.pct}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CostBreakdown;
