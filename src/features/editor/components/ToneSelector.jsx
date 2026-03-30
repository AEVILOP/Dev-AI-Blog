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
            className={`group relative flex-1 p-6 text-left cursor-pointer transition-all duration-300 rounded-3xl overflow-hidden border
              ${value === tone.id
                ? "bg-linear-to-br from-orange-500/10 to-transparent border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)] ring-1 ring-orange-500/30"
                : "bg-neutral-950/40 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-lg"
              }`}
          >
            {/* Active Glow Accent */}
            {value === tone.id && (
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
            )}

            <div className="relative z-10">
              <div className={`text-2xl mb-3 transition-transform duration-300 
                ${value === tone.id ? "scale-110 translate-x-1" : "group-hover:scale-110 group-hover:translate-x-1"}`}>
                {tone.icon}
              </div>
              <div className={`font-barlow font-black text-lg uppercase tracking-wider mb-2 transition-colors duration-300
                ${value === tone.id ? "text-orange-400" : "text-white group-hover:text-neutral-200"}`}>
                {tone.label}
              </div>
              <div className={`text-xs leading-relaxed transition-colors duration-300
                ${value === tone.id ? "text-neutral-300" : "text-neutral-500 group-hover:text-neutral-400"}`}>
                {tone.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}