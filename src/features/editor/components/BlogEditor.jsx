// BlogEditor — all editable text sections of the generated blog.
// Receives fields + setters from CreateBlog page.

const SECTIONS = [
  { key: "intro",          defaultLabel: "INTRO",           rows: 6 },
  { key: "whatItDoes",     defaultLabel: "WHAT IT DOES",    rows: 8 },
  { key: "techStack",      defaultLabel: "TECH STACK",      rows: 8 },
  { key: "challenges",     defaultLabel: "CHALLENGES",      rows: 8 },
  { key: "gettingStarted", defaultLabel: "GETTING STARTED", rows: 6 },
  { key: "conclusion",     defaultLabel: "CONCLUSION",      rows: 6 },
];

export default function BlogEditor({ title, setTitle, fields, setField }) {
  const textareaCls =
    "w-full bg-neutral-950 border-2 border-neutral-900 text-white px-4 py-3.5 " +
    "text-sm leading-relaxed focus:outline-none focus:border-orange-500 " +
    "transition-colors duration-150 resize-y font-dm custom-scrollbar";

  return (
    <div className="flex flex-col gap-7">
      {/* Title */}
      <div>
        <label className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.18em] uppercase block mb-2.5">
          TITLE
        </label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-neutral-950 border-2 border-neutral-900 text-white px-4 py-4
            font-barlow font-black text-xl uppercase tracking-tight
            focus:outline-none focus:border-orange-500 transition-colors duration-150"
        />
      </div>

      {/* Sections */}
      {SECTIONS.map(({ key, defaultLabel, rows }) => (
        <div key={key} className="flex flex-col relative group mt-2">
          <div className="flex items-center gap-2 mb-2.5">
            <input
              type="text"
              value={fields[`${key}Heading`] ?? defaultLabel}
              onChange={e => setField(`${key}Heading`, e.target.value)}
              placeholder={defaultLabel}
              className="font-barlow font-black text-[12px] text-orange-500 tracking-[0.18em] uppercase block bg-transparent border-none outline-none focus:border-b border-orange-500/50 w-64 placeholder-orange-500/30 transition-colors"
            />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-orange-500/50 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Edit Heading</span>
            </div>
          </div>
          <textarea
            rows={rows}
            value={fields[key] || ""}
            onChange={e => setField(key, e.target.value)}
            className={textareaCls}
          />
        </div>
      ))}
    </div>
  );
}