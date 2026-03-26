// TODO: Implement RepoCard component
const LANG_COLORS = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572a5",
  Go: "#00add8", Rust: "#dea584", Java: "#b07219", Ruby: "#701516",
};

export default function RepoCard({ repo, onSelect }) {
  const langColor = LANG_COLORS[repo.language] || "#f97316";

  return (
    <div
      onClick={() => onSelect(repo)}
      className="bg-black border-2 border-neutral-900 p-5 cursor-pointer
        transition-colors duration-150 hover:border-orange-500 flex flex-col gap-2.5"
    >
      <div className="font-barlow font-black text-base text-white uppercase tracking-tight">{repo.name}</div>

      {repo.description && (
        <div className="text-xs text-neutral-700 leading-relaxed line-clamp-2">{repo.description}</div>
      )}

      <div className="flex items-center gap-4 mt-1">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: langColor }} />
            <span className="font-barlow font-bold text-[10px] text-neutral-700 tracking-[0.12em]">{repo.language}</span>
          </div>
        )}
        {repo.stars > 0 && (
          <span className="font-barlow font-bold text-[10px] text-neutral-800 tracking-[0.1em]">★ {repo.stars}</span>
        )}
        {repo.isPrivate && (
          <span className="font-barlow font-bold text-[9px] text-neutral-800 border border-neutral-900 px-1.5 py-0.5 tracking-[0.12em]">PRIVATE</span>
        )}
      </div>
    </div>
  );
}