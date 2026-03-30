import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGenerate } from "../hooks/useGenerate";
import { useBlogs } from "../../blog/hooks/useBlogs";
import { useGitHub } from "../../github/hooks/useGitHub";
import ToneSelector from "../components/ToneSelector";
import GeneratingLoader from "../components/GeneratingLoader";
import BlogLayout from "../components/BlogLayout";
import RegenerateButton from "../components/RegenerateButton";
import RepoSelectorModal from "../../github/components/RepoSelectorModal";

export default function CreateBlog() {
  const navigate = useNavigate();
  const {
    generate, loading, error, setError,
    regenerateCount, isCoolingDown, cooldownSeconds,
    readmeNote, pendingDraft, discardPendingDraft,
  } = useGenerate();
  const { createBlog, updateBlog, deleteBlog, loading: saving } = useBlogs();
  const { fetchReadme } = useGitHub();

  const [step,         setStep]         = useState("select"); // select | generating | edit
  const [showModal,    setShowModal]    = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [tone,         setTone]         = useState("casual");
  const [draftId,      setDraftId]      = useState(null);

  // Blog content state
  const [title,  setTitle]  = useState("");
  const [fields, setFields] = useState({
    intro: "", whatItDoes: "", techStack: "",
    challenges: "", gettingStarted: "", conclusion: "",
  });
  const [excerpt, setExcerpt] = useState("");

  const setField = (key, val) => setFields(prev => ({ ...prev, [key]: val }));

  // ── Repo selected ──────────────────────────────────────────
  const handleRepoSelect = (repo) => { setShowModal(false); setSelectedRepo(repo); };

  // ── Generate / Regenerate ──────────────────────────────────
  const handleGenerate = async (isRegeneration = false) => {
    if (!selectedRepo) return;
    setStep("generating"); setError(null);

    const { readme } = await fetchReadme(selectedRepo.owner, selectedRepo.name);

    const response = await generate({
      repoName:    selectedRepo.name,
      description: selectedRepo.description,
      language:    selectedRepo.language,
      readme, tone, isRegeneration,
    });

    if (response && response.blog) {
      if (response.draftId) setDraftId(response.draftId);
      const blog = response.blog;
      setTitle(blog.title || "");
      setExcerpt(blog.excerpt || "");
      setFields({
        intro:          blog.intro          || "",
        whatItDoes:     blog.whatItDoes     || "",
        techStack:      blog.techStack      || "",
        challenges:     blog.challenges     || "",
        gettingStarted: blog.gettingStarted || "",
        conclusion:     blog.conclusion     || "",
      });
      setStep("edit");
    } else {
      setStep("select");
    }
  };

  // ── Build content JSON ─────────────────────────────────────
  const getContent = () => JSON.stringify(fields);

  // ── Publish ────────────────────────────────────────────────
  const handlePublish = async () => {
    const payload = {
      title, content: getContent(), excerpt,
      repoName: selectedRepo.name, repoUrl: selectedRepo.url,
      repoLanguage: selectedRepo.language, category: selectedRepo.language,
      tone, isPublished: true, isUnfinished: false,
    };
    if (draftId) { await updateBlog(draftId, payload); }
    else { const s = await createBlog(payload); if (s) setDraftId(s._id); }
    navigate("/account");
  };

  // ── Save draft ─────────────────────────────────────────────
  const handleSaveDraft = async () => {
    const payload = {
      title, content: getContent(), excerpt,
      repoName: selectedRepo.name, repoUrl: selectedRepo.url,
      repoLanguage: selectedRepo.language, category: selectedRepo.language,
      tone, isPublished: false, isUnfinished: false,
    };
    if (draftId) { await updateBlog(draftId, payload); }
    else { const s = await createBlog(payload); if (s) setDraftId(s._id); }
    navigate("/account");
  };

  // ── Loading screen ─────────────────────────────────────────
  if (step === "generating") return <GeneratingLoader repoName={selectedRepo?.name} />;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Nav */}
      <nav className="sticky top-0 z-10 bg-black border-b-2 border-neutral-900 px-10 py-4 flex items-center justify-between">
        <a href="/" className="font-barlow font-black text-lg text-white uppercase no-underline">
          DEV<span className="text-orange-500">BLOG.AI</span>
        </a>
        <span className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.2em] uppercase">
          {step === "select" ? "01 — SELECT REPO" : "02 — EDIT & PUBLISH"}
        </span>
        <button
          onClick={() => navigate(-1)}
          className="font-barlow  rounded-3xl font-black text-[11px] tracking-[0.14em] uppercase border-2 border-neutral-900 text-neutral-700 px-3.5 py-2 cursor-pointer transition-all duration-150 hover:border-white hover:text-white"
        >
          CANCEL
        </button>
      </nav>

      {/* Pending draft warning */}
      {pendingDraft && (
        <div className="bg-orange-950/20 border-b border-orange-900/40 px-10 py-3.5 flex items-center justify-between">
          <span className="font-barlow font-bold text-xs text-orange-500 tracking-[0.08em]">
            ⚠ Unfinished blog from {new Date(pendingDraft.createdAt).toLocaleDateString()} — "{pendingDraft.repoName}"
          </span>
          <button
            onClick={discardPendingDraft}
            className="font-barlow font-bold text-[10px] tracking-[0.12em] uppercase border border-orange-900 text-orange-500 px-3 py-1.5 cursor-pointer bg-transparent"
          >
            DISCARD
          </button>
        </div>
      )}

      {/* ── STEP 1 — SELECT ── */}
      {step === "select" && (
        <div className="max-w-xl mx-auto px-10 py-16 animate-fade-up">

          <div className="mb-12">
            <div className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.22em] uppercase mb-4">CREATE BLOG</div>
            <h1 className="font-barlow font-black text-white uppercase leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(40px,6vw,72px)" }}>
              TURN YOUR<br />REPO INTO<br /><span className="text-orange-500">A BLOG.</span>
            </h1>
          </div>

          {error && (
            <div className="bg-red-950/30 border border-red-900 px-4 py-3 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-red-400">✕</span>
                <span className="font-barlow font-bold text-xs text-red-400 tracking-[0.06em]">
                  {typeof error === "string" ? error : error.message}
                </span>
              </div>
              {error.code === "DUPLICATE_REPO_BLOG" && error.existingBlogId && (
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => navigate(`/account`)}
                    className="font-barlow font-bold text-[10px] tracking-widest uppercase border border-neutral-700 text-neutral-400 px-3 py-1.5 transition-colors hover:border-white hover:text-white"
                  >
                    GO TO DRAFTS
                  </button>
                  <button 
                    onClick={async () => {
                      await deleteBlog(error.existingBlogId);
                      handleGenerate(false);
                    }}
                    className="font-barlow font-bold text-[10px] tracking-widest uppercase bg-red-500 border border-red-500 text-white px-3 py-1.5 transition-colors hover:bg-black hover:text-red-500"
                  >
                    DELETE & REGENERATE
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Repo selector */}
          <div className="mb-8">
            <div className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.18em] uppercase mb-3">
              01 — REPOSITORY
            </div>
            {selectedRepo ? (
              <div className="bg-neutral-950 border-2 border-orange-500 px-6 py-5 flex items-center justify-between">
                <div>
                  <div className="font-barlow font-black text-lg text-white uppercase tracking-tight">{selectedRepo.name}</div>
                  {selectedRepo.description && <div className="text-xs text-neutral-700 mt-1">{selectedRepo.description}</div>}
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="font-barlow font-bold text-[10px] tracking-[0.12em] uppercase border border-neutral-700 text-neutral-600 px-3 py-1.5 cursor-pointer transition-all duration-150 hover:border-white hover:text-white bg-transparent"
                >
                  CHANGE
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="w-full border-2 border-dashed rounded-3xl border-neutral-900 p-7 cursor-pointer text-center transition-colors duration-150 hover:border-orange-500 bg-transparent"
              >
                <div className="font-barlow font-black text-sm text-neutral-700 tracking-[0.1em] uppercase">+ SELECT A REPOSITORY</div>
                <div className="text-xs text-neutral-900 mt-1.5">Choose from your GitHub repos</div>
              </button>
            )}
          </div>

          {/* Tone */}
          <div className="mb-10">
            <div className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.18em] uppercase mb-3">02 — TONE</div>
            <ToneSelector value={tone} onChange={setTone} />
          </div>

          {/* Generate */}
          <button
            onClick={() => handleGenerate(false)}
            disabled={!selectedRepo || loading}
            className={`w-full font-barlow font-black text-base tracking-[0.1em] uppercase py-5 transition-all duration-150 border-2
              ${!selectedRepo
                ? "border-neutral-900 text-neutral-900 cursor-not-allowed bg-transparent rounded-3xl"
                : "border-orange-500 bg-orange-500 text-black cursor-pointer hover:bg-black hover:text-orange-500 rounded-3xl"}`}
          >
            GENERATE BLOG →
          </button>

          <div className="font-barlow font-bold text-[10px] text-neutral-900 tracking-[0.14em] text-center mt-4">
            USES 1 OF YOUR 5 DAILY GENERATIONS
          </div>
        </div>
      )}

      {/* ── STEP 2 — EDIT ── */}
      {step === "edit" && (
        <div className="w-full animate-fade-up" style={{ height: "calc(100vh - 74px)" }}>
          <BlogLayout
            title={title} setTitle={setTitle}
            fields={fields} setField={setField}
            repoLanguage={selectedRepo?.language}
            tone={tone}
            actions={{ onSaveDraft: handleSaveDraft, onPublish: handlePublish, saving }}
            extras={{
              readmeNote,
              error,
              onRegenerate: () => handleGenerate(true),
              regenProps: (
                <RegenerateButton
                  onRegenerate={() => handleGenerate(true)}
                  regenerateCount={regenerateCount}
                  isCoolingDown={isCoolingDown}
                  cooldownSeconds={cooldownSeconds}
                  loading={loading}
                />
              ),
            }}
          />
        </div>
      )}

      {showModal && (
        <RepoSelectorModal
          onSelect={handleRepoSelect}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}