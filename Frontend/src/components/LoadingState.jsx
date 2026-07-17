import { useState, useEffect } from "react";

const STEPS = [
  "Reading your travel preferences…",
  "Researching the destination…",
  "Building your day-by-day plan…",
  "Adding local tips and hidden gems…",
  "Putting the final touches…",
];

function LoadingState() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < STEPS.length - 1 ? s + 1 : s));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center px-4">
      {/* Spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full" style={{ border: "2px solid #1a1a1a" }} />
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{ border: "2px solid transparent", borderTopColor: "#e11d48", borderRightColor: "#fb7185" }}
        />
        <div
          className="absolute inset-3 rounded-full animate-spin"
          style={{ border: "2px solid transparent", borderTopColor: "#f43f5e", animationDuration: "1.2s", animationDirection: "reverse" }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">✈️</div>
      </div>

      <div>
        <p
          className="text-white font-bold text-xl mb-2"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Crafting your itinerary
        </p>
        <p className="text-zinc-600 text-sm">{STEPS[step]}</p>
      </div>

      {/* Animated dots */}
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i <= step ? "20px" : "8px",
              height: "8px",
              background: i <= step ? "#e11d48" : "#1f1f1f",
              boxShadow: i <= step ? "0 0 8px rgba(225,29,72,0.5)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default LoadingState;
