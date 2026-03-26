// TODO: Implement RepoSelectorModal component
import { useState, useEffect } from "react";
import { useGitHub } from "../hooks/useGitHub";
import RepoCard from "./RepoCard";

export default function RepoSelectorModal({ onSelect, onClose }) {
  const { repos, loading, error, fetchRepos } = useGitHub();
  const [search, setSearch] = useState("");

  useEffect(() => { fetchRepos(); }, []);

  const filtered = repos.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50" />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[min(640px,92vw)] max-h-[80vh] bg-black border-2 border-neutral-900
        z-50 flex flex-col animate-fade-up">

        {/* Header */}
        <div className="px-7 py-6 border-b-2 border-neutral-900 flex items-center justify-between sticky top-0 bg-black z-10">
          <div>
            <div className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.2em] uppercase mb-1.5">SELECT REPOSITORY</div>
            <div className="font-barlow font-black text-2xl text-white uppercase tracking-tight">YOUR GITHUB REPOS</div>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 border-2 border-neutral-900 text-neutral-700 flex items-center justify-center cursor-pointer transition-all duration-150 hover:border-white hover:text-white text-base bg-transparent">
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="px-7 py-4 border-b border-neutral-900">
          <input
            type="text" placeholder="SEARCH REPOS..." value={search}
            onChange={e => setSearch(e.target.value)} autoFocus
            className="w-full bg-neutral-950 border-2 border-neutral-900 text-white px-4 py-3 font-barlow font-bold text-xs tracking-[0.1em] focus:outline-none focus:border-orange-500 transition-colors duration-150"
          />
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 p-7 flex flex-col gap-2.5">
          {loading && <div className="flex justify-center py-10"><div className="w-5 h-5 border-2 border-neutral-800 border-t-orange-500 rounded-full animate-spin-orange" /></div>}
          {error   && <div className="font-barlow font-bold text-xs text-red-400 tracking-[0.08em] text-center py-6">{error}</div>}
          {!loading && !error && filtered.length === 0 && (
            <div className="font-barlow font-bold text-sm text-neutral-700 tracking-[0.1em] text-center uppercase py-10">No repositories found</div>
          )}
          {!loading && filtered.map(repo => <RepoCard key={repo.id} repo={repo} onSelect={onSelect} />)}
        </div>
      </div>
    </>
  );
}