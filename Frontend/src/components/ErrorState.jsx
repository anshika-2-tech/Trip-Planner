function ErrorState({ message, onRetry, retryLabel = "Try again" }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 text-center px-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
        style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.15)" }}
      >
        😕
      </div>
      <div>
        <p className="text-white font-bold text-lg mb-2">Something went wrong</p>
        <p className="text-zinc-600 text-sm max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-white font-semibold px-6 py-3 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-all"
          style={{ background: "linear-gradient(135deg,#e11d48,#f43f5e)" }}
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

export default ErrorState;
