// TODO: Implement ToneSelector component
const TONES = [
  { id: "casual",       label: "CASUAL",       desc: "Fun, conversational, like talking to a friend", icon: "☕" },
  { id: "professional", label: "PROFESSIONAL", desc: "Structured, precise, portfolio-ready",          icon: "💼" },
];

export default function ToneSelector({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.18em] uppercase">
        SELECT TONE
      </label>
      <div className="flex gap-3">
        {TONES.map(tone => (
          <button
            key={tone.id}
            onClick={() => onChange(tone.id)}
            className={`flex-1 p-5 text-left cursor-pointer transition-all duration-150 border-2 bg-transparent
              ${value === tone.id
                ? "border-orange-500 bg-neutral-950"
                : "border-neutral-900 hover:border-neutral-700"}`}
          >
            <div className="text-xl mb-2.5">{tone.icon}</div>
            <div className={`font-barlow font-black text-base uppercase tracking-wide mb-1.5
              ${value === tone.id ? "text-orange-500" : "text-white"}`}>
              {tone.label}
            </div>
            <div className="text-xs text-neutral-700 leading-relaxed">{tone.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}