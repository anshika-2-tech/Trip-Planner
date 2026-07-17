import { useState } from "react";
import {
  MapPin,
  Navigation,
  CalendarDays,
  Users,
  Wallet,
  Compass,
  StickyNote,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { buildTripPrompt } from "../utils/buildTripPrompt";

// ─── constants ────────────────────────────────────────────────────────────────

const BUDGET_PRESETS = [
  { label: "Budget", sub: "₹0 – ₹15k", value: "Budget (under ₹15,000)" },
  { label: "Mid-range", sub: "₹15k – ₹50k", value: "Mid-range (₹15,000 – ₹50,000)" },
  { label: "Luxury", sub: "₹50k+", value: "Luxury (above ₹50,000)" },
  { label: "Custom ₹", sub: "Enter amount", value: "__custom__" },
];

const STYLE_OPTIONS = [
  { label: "Adventure", icon: "🧗" },
  { label: "Relaxation", icon: "🌅" },
  { label: "Culture", icon: "🏛️" },
  { label: "Food", icon: "🍜" },
  { label: "Nightlife", icon: "🎶" },
  { label: "Nature", icon: "🌿" },
  { label: "Backpacking", icon: "🎒" },
  { label: "Luxury", icon: "💎" },
];

const STEPS = ["Destination", "Details", "Style"];

// ─── sub-components ───────────────────────────────────────────────────────────

function FieldLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Icon size={14} className="text-rose-400 flex-shrink-0" />
      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{label}</span>
    </div>
  );
}

function InputBox({ children }) {
  return (
    <div
      className="rounded-xl px-4 py-3 transition-all"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {children}
    </div>
  );
}

// ─── step 1 ───────────────────────────────────────────────────────────────────

function StepDestination({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      {/* Destination */}
      <div>
        <FieldLabel icon={MapPin} label="Destination" />
        <InputBox>
          <input
            type="text"
            value={data.destination}
            onChange={(e) => onChange("destination", e.target.value)}
            placeholder="e.g. Manali, Himachal Pradesh"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-700 focus:outline-none"
          />
        </InputBox>
        {errors.destination && (
          <p className="text-rose-400 text-xs mt-1">{errors.destination}</p>
        )}
      </div>

      {/* Current Location / Starting City */}
      <div>
        <FieldLabel icon={Navigation} label="Starting City" />
        <InputBox>
          <input
            type="text"
            value={data.fromCity}
            onChange={(e) => onChange("fromCity", e.target.value)}
            placeholder="e.g. Delhi, Lucknow, Mumbai"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-700 focus:outline-none"
          />
        </InputBox>
        {errors.fromCity && (
          <p className="text-rose-400 text-xs mt-1">{errors.fromCity}</p>
        )}
      </div>

      {/* Duration + Travelers side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel icon={CalendarDays} label="Duration (days)" />
          <InputBox>
            <input
              type="number"
              min={1}
              max={30}
              value={data.duration}
              onChange={(e) => onChange("duration", e.target.value)}
              placeholder="5"
              className="w-full bg-transparent text-sm text-white placeholder-zinc-700 focus:outline-none"
            />
          </InputBox>
          {errors.duration && (
            <p className="text-rose-400 text-xs mt-1">{errors.duration}</p>
          )}
        </div>
        <div>
          <FieldLabel icon={Users} label="Travelers" />
          <InputBox>
            <input
              type="number"
              min={1}
              max={15}
              value={data.travelers}
              onChange={(e) => onChange("travelers", e.target.value)}
              placeholder="2"
              className="w-full bg-transparent text-sm text-white placeholder-zinc-700 focus:outline-none"
            />
          </InputBox>
          {errors.travelers && (
            <p className="text-rose-400 text-xs mt-1">{errors.travelers}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── step 2 ───────────────────────────────────────────────────────────────────

function StepBudget({ data, onChange, errors }) {
  const isCustom = data.budgetPreset === "__custom__";

  return (
    <div className="space-y-5">
      <div>
        <FieldLabel icon={Wallet} label="Budget" />
        <div className="grid grid-cols-2 gap-2">
          {BUDGET_PRESETS.map((preset) => {
            const selected = data.budgetPreset === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => onChange("budgetPreset", preset.value)}
                className="rounded-xl px-3 py-3 text-left transition-all cursor-pointer"
                style={{
                  background: selected
                    ? "rgba(225,29,72,0.1)"
                    : "rgba(255,255,255,0.03)",
                  border: selected
                    ? "1px solid rgba(225,29,72,0.4)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: selected ? "#fb7185" : "#a1a1aa" }}
                >
                  {preset.label}
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">{preset.sub}</p>
              </button>
            );
          })}
        </div>

        {/* Custom amount input */}
        {isCustom && (
          <div className="mt-3">
            <InputBox>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 text-sm">₹</span>
                <input
                  type="number"
                  min={0}
                  value={data.customBudget}
                  onChange={(e) => onChange("customBudget", e.target.value)}
                  placeholder="Enter your budget"
                  className="w-full bg-transparent text-sm text-white placeholder-zinc-700 focus:outline-none"
                />
              </div>
            </InputBox>
          </div>
        )}
        {errors.budget && (
          <p className="text-rose-400 text-xs mt-1">{errors.budget}</p>
        )}
      </div>
    </div>
  );
}

// ─── step 3 ───────────────────────────────────────────────────────────────────

function StepStyle({ data, onChange, errors }) {
  function toggleStyle(label) {
    const current = data.travelStyles;
    const updated = current.includes(label)
      ? current.filter((s) => s !== label)
      : [...current, label];
    onChange("travelStyles", updated);
  }

  return (
    <div className="space-y-5">
      <div>
        <FieldLabel icon={Compass} label="Travel Style (pick all that apply)" />
        <div className="flex flex-wrap gap-2">
          {STYLE_OPTIONS.map(({ label, icon }) => {
            const selected = data.travelStyles.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleStyle(label)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
                style={{
                  background: selected
                    ? "rgba(225,29,72,0.12)"
                    : "rgba(255,255,255,0.03)",
                  border: selected
                    ? "1px solid rgba(225,29,72,0.45)"
                    : "1px solid rgba(255,255,255,0.07)",
                  color: selected ? "#fb7185" : "#71717a",
                }}
              >
                <span>{icon}</span>
                {label}
              </button>
            );
          })}
        </div>
        {errors.travelStyles && (
          <p className="text-rose-400 text-xs mt-1">{errors.travelStyles}</p>
        )}
      </div>

      <div>
        <FieldLabel icon={StickyNote} label="Additional Preferences (optional)" />
        <div
          className="rounded-xl transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <textarea
            value={data.preferences}
            onChange={(e) => onChange("preferences", e.target.value)}
            placeholder="e.g. prefer hostels, vegetarian food, avoid tourist traps…"
            rows={3}
            className="w-full bg-transparent px-4 pt-3 pb-2 text-sm text-white placeholder-zinc-700 resize-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// ─── progress indicator ───────────────────────────────────────────────────────

function StepIndicator({ current, total, labels }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {labels.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: done
                    ? "linear-gradient(135deg,#e11d48,#f43f5e)"
                    : active
                    ? "rgba(225,29,72,0.15)"
                    : "rgba(255,255,255,0.04)",
                  border: active
                    ? "1px solid rgba(225,29,72,0.5)"
                    : done
                    ? "none"
                    : "1px solid rgba(255,255,255,0.07)",
                  color: done ? "#fff" : active ? "#fb7185" : "#3f3f46",
                  boxShadow: active ? "0 0 12px rgba(225,29,72,0.25)" : "none",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className="text-xs"
                style={{ color: active ? "#fb7185" : done ? "#52525b" : "#3f3f46" }}
              >
                {label}
              </span>
            </div>
            {i < total - 1 && (
              <div
                className="flex-1 h-px mx-2 mb-4 transition-all"
                style={{
                  background: done
                    ? "linear-gradient(90deg,#e11d48,#f43f5e)"
                    : "rgba(255,255,255,0.06)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

const INITIAL = {
  destination: "",
  fromCity: "",
  duration: "",
  travelers: "",
  budgetPreset: "",
  customBudget: "",
  travelStyles: [],
  preferences: "",
};

function validate(step, data) {
  const errs = {};

  if (step === 0) {
    if (!data.destination.trim()) errs.destination = "Destination is required.";
    if (!data.fromCity.trim()) errs.fromCity = "Starting city is required.";
    const d = Number(data.duration);
    if (!data.duration || isNaN(d) || d < 1 || d > 30)
      errs.duration = "Enter 1–30 days.";
    const t = Number(data.travelers);
    if (!data.travelers || isNaN(t) || t < 1 || t > 15)
      errs.travelers = "Enter 1–15 travelers.";
  }

  if (step === 1) {
    if (!data.budgetPreset) {
      errs.budget = "Please select a budget range.";
    } else if (data.budgetPreset === "__custom__") {
      const b = Number(data.customBudget);
      if (!data.customBudget || isNaN(b) || b <= 0)
        errs.budget = "Enter a valid budget amount.";
    }
  }

  if (step === 2) {
    if (data.travelStyles.length === 0)
      errs.travelStyles = "Pick at least one travel style.";
  }

  return errs;
}

function resolvedBudget(data) {
  if (data.budgetPreset === "__custom__") {
    return `₹${Number(data.customBudget).toLocaleString("en-IN")}`;
  }
  return data.budgetPreset;
}

function TripForm({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleNext() {
    const errs = validate(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const userInput = buildTripPrompt({
      destination: data.destination.trim(),
      fromCity: data.fromCity.trim(),
      duration: Number(data.duration),
      travelers: Number(data.travelers),
      budget: resolvedBudget(data),
      travelStyles: data.travelStyles,
      preferences: data.preferences,
    });

    onSubmit(userInput);
  }

  const isLastStep = step === STEPS.length - 1;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(13,13,18,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.55)",
        }}
      >
        <div className="px-5 pt-5 pb-2">
          <StepIndicator current={step} total={STEPS.length} labels={STEPS} />
        </div>

        <div className="px-5 pb-5">
          {/* Step panels */}
          {step === 0 && (
            <StepDestination data={data} onChange={handleChange} errors={errors} />
          )}
          {step === 1 && (
            <StepBudget data={data} onChange={handleChange} errors={errors} />
          )}
          {step === 2 && (
            <StepStyle data={data} onChange={handleChange} errors={errors} />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            ) : (
              <div />
            )}

            {isLastStep ? (
              <button
                type="submit"
                className="flex items-center gap-2 text-sm font-semibold text-white px-6 py-2.5 rounded-xl cursor-pointer transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #e11d48, #f43f5e)",
                  boxShadow: "0 0 20px rgba(225,29,72,0.3)",
                }}
              >
                <Sparkles size={15} />
                Generate Trip
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 text-sm font-semibold text-white px-6 py-2.5 rounded-xl cursor-pointer transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #e11d48, #f43f5e)",
                  boxShadow: "0 0 20px rgba(225,29,72,0.3)",
                }}
              >
                Next
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default TripForm;
