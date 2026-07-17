import { Lightbulb } from "lucide-react";

function LocalTips({ localTips }) {
  if (!localTips || localTips.length === 0) return null;

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(13,13,18,0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(34,197,94,0.2)",
        borderLeft: "3px solid rgba(34,197,94,0.6)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
        >
          <Lightbulb size={14} style={{ color: "#4ade80" }} />
        </div>
        <p className="text-sm font-semibold text-white">Local Tips</p>
      </div>

      <div className="space-y-3">
        {localTips.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-base leading-none mt-0.5 flex-shrink-0">{item.icon}</span>
            <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
              {item.tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocalTips;
