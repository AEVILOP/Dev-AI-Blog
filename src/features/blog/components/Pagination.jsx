export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const base  = "font-barlow font-black text-sm tracking-[0.08em] border-2 transition-all duration-150 cursor-pointer";

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        className={`${base} px-4 py-2.5 uppercase text-[11px] tracking-[0.12em] ${currentPage===1?"border-neutral-900 text-neutral-900 cursor-not-allowed":" rounded-3xl border-neutral-800 text-neutral-600 hover:border-white hover:text-white"}`}>
        ← PREV
      </button>

      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)}
          className={`${base} w-10 h-10 rounded-3xl ${p===currentPage?"border-orange-500 bg-orange-500 text-black":"border-neutral-900 text-neutral-600 hover:border-neutral-600 hover:text-white"}`}>
          {p}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        className={`${base} px-4 py-2.5 uppercase text-[11px] tracking-[0.12em] ${currentPage===totalPages?" rounded-3xl border-neutral-900 text-neutral-900 cursor-not-allowed":"border-neutral-800 text-neutral-600 hover:border-white hover:text-white"}`}>
        NEXT →
      </button>
    </div>
  );
}