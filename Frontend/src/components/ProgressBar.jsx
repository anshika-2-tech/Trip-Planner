function ProgressBar({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(13,13,18,0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-white">Trip Progress</p>
          <p className="text-xs text-zinc-700 mt-0.5">
            {completed} of {total} activities completed
            {percentage === 100 && " 🎉"}
          </p>
        </div>
        <span className="text-2xl font-bold text-rose-400" style={{ fontFamily: "'Caveat', cursive" }}>
          {percentage}<span className="text-sm text-zinc-700">%</span>
        </span>
      </div>
      <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-1.5 rounded-full transition-all duration-700"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(90deg, #e11d48, #fb7185)",
            boxShadow: "0 0 8px rgba(225,29,72,0.4)",
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
