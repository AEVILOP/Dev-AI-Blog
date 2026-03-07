// BlogEditor — all editable text sections of the generated blog.
// Receives fields + setters from CreateBlog page.

const SECTIONS = [
  { key: "intro",          label: "INTRO",           rows: 4 },
  { key: "whatItDoes",     label: "WHAT IT DOES",    rows: 5 },
  { key: "techStack",      label: "TECH STACK",      rows: 5 },
  { key: "challenges",     label: "CHALLENGES",      rows: 5 },
  { key: "gettingStarted", label: "GETTING STARTED", rows: 4 },
  { key: "conclusion",     label: "CONCLUSION",      rows: 4 },
];

export default function BlogEditor({ title, setTitle, fields, setField }) {
  const textareaCls =
    "w-full bg-neutral-950 border-2 border-neutral-900 text-white px-4 py-3.5 " +
    "text-sm leading-relaxed focus:outline-none focus:border-orange-500 " +
    "transition-colors duration-150 resize-y font-dm";

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
      {SECTIONS.map(({ key, label, rows }) => (
        <div key={key}>
          <label className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.18em] uppercase block mb-2.5">
            {label}
          </label>
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