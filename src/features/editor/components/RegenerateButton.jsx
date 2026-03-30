// TODO: Implement RegenerateButton component
export default function RegenerateButton({
  onRegenerate, regenerateCount, isCoolingDown, cooldownSeconds, loading,
}) {
  const maxRegen  = 3;
  const remaining = maxRegen - regenerateCount;
  const disabled  = loading || isCoolingDown || remaining === 0;

  return (
    <div className="relative">
      <button
        onClick={onRegenerate}
        disabled={disabled}
        className={`font-barlow font-black text-[13px] tracking-[0.1em] uppercase
          border-2 px-5 py-3 flex items-center gap-2.5 transition-all duration-150
          bg-transparent rounded-3xl
          ${disabled
            ? "border-neutral-900 text-neutral-800 cursor-not-allowed"
            : "border-neutral-700 text-white hover:border-orange-500 hover:text-orange-500 cursor-pointer"}`}
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-neutral-700 border-t-orange-500 rounded-full animate-spin-orange inline-block" />
            REGENERATING...
          </>
        ) : isCoolingDown ? (
          `WAIT ${cooldownSeconds}S...`
        ) : remaining === 0 ? (
          "NO REGENERATIONS LEFT"
        ) : (
          <>↻ REGENERATE</>
        )}
      </button>

      {/* Remaining dots positioned absolutely so they don't break flex alignment */}
      <div className="absolute top-[calc(100%+8px)] left-2 flex items-center gap-1.5">
        {Array.from({ length: maxRegen }).map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 transition-colors duration-300 ${i < remaining ? "bg-orange-500" : "bg-neutral-900"}`} />
        ))}
        <span className="font-barlow font-bold text-[9px] text-neutral-800 tracking-[0.14em] ml-1">
          {remaining} LEFT
        </span>
      </div>
    </div>
  );
}