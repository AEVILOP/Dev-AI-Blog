import { useState, useEffect } from "react";
import { useGitHub } from "../hooks/useGitHub";
import RepoCard from "./RepoCard";

export default function RepoSelectorModal({ onSelect, onClose }) {
  const { repos, loading, error, fetchRepos } = useGitHub();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRepos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm" />

      <div className="fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[min(640px,94vw)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl border-2 border-neutral-900 bg-black animate-fade-up">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-3xl border-b-2 border-neutral-900 bg-black px-4 py-4 sm:items-center sm:px-7 sm:py-6">
          <div>
            <div className="mb-1.5 font-barlow text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">SELECT REPOSITORY</div>
            <div className="font-barlow text-lg font-black uppercase tracking-tight text-white sm:text-2xl">YOUR GITHUB REPOS</div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center border-2 border-neutral-900 bg-transparent text-base text-neutral-500 transition-all duration-150 hover:border-white hover:text-white"
          >
            x
          </button>
        </div>

        <div className="border-b border-neutral-900 px-4 py-4 sm:px-7">
          <input
            type="text"
            placeholder="SEARCH REPOS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full border-2 border-neutral-900 bg-neutral-950 px-4 py-3 font-barlow text-xs font-bold tracking-[0.1em] text-white transition-colors duration-150 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4 sm:p-7">
          {loading && <div className="flex justify-center py-10"><div className="h-5 w-5 animate-spin-orange rounded-full border-2 border-neutral-800 border-t-orange-500" /></div>}
          {error && <div className="py-6 text-center font-barlow text-xs font-bold tracking-[0.08em] text-red-400">{error}</div>}
          {!loading && !error && filtered.length === 0 && (
            <div className="py-10 text-center font-barlow text-sm font-bold uppercase tracking-[0.1em] text-neutral-600">No repositories found</div>
          )}
          {!loading && filtered.map((repo) => <RepoCard key={repo.id} repo={repo} onSelect={onSelect} />)}
        </div>
      </div>
    </>
  );
}
