// BlogPreview — read-only rendered view of the blog before publishing.

export default function BlogPreview({ title, fields, repoLanguage, tone }) {
  const sections = [
    { label: fields.whatItDoesHeading ?? "WHAT IT DOES",    content: fields.whatItDoes,     accent: false },
    { label: fields.techStackHeading ?? "TECH STACK",      content: fields.techStack,      accent: true  },
    { label: fields.challengesHeading ?? "CHALLENGES",      content: fields.challenges,     accent: false },
    { label: fields.gettingStartedHeading ?? "GETTING STARTED", content: fields.gettingStarted, accent: false, border: true },
    { label: fields.conclusionHeading ?? "FINAL THOUGHTS",  content: fields.conclusion,     accent: false },
  ];

  return (
    <div className="bg-neutral-950 border-2 border-neutral-900 p-8 flex flex-col gap-8">
      {/* Preview badge */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        <span className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.2em] uppercase">LIVE PREVIEW</span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 flex-wrap">
        {repoLanguage && (
          <span className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.18em] uppercase">{repoLanguage}</span>
        )}
        {tone && (
          <span className="font-barlow font-bold text-[10px] text-neutral-700 tracking-[0.14em] uppercase">{tone} TONE</span>
        )}
      </div>

      {/* Title */}
      <h1 className="font-barlow font-black text-white uppercase leading-[0.93] tracking-tight"
        style={{ fontSize: "clamp(24px,3vw,40px)" }}>
        {title || "YOUR BLOG TITLE"}
      </h1>

      {/* Intro */}
      {fields.intro && (
        <p className="text-neutral-500 text-sm leading-relaxed italic border-l-2 border-neutral-800 pl-4">
          {fields.intro}
        </p>
      )}

      <div className="w-full h-px bg-linear-to-r from-orange-500 to-transparent" />

      {/* Content sections */}
      {sections.map(({ label, content, accent, border }) => {
        if (!content) return null;
        return (
          <div key={label} className={border ? "border-l-4 border-orange-500 pl-5" : ""}>
            <h2 className={`font-barlow font-black text-lg uppercase tracking-tight mb-3
              ${accent ? "text-orange-500" : "text-white"}`}>
              {label}
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">{content}</p>
          </div>
        );
      })}
    </div>
  );
}