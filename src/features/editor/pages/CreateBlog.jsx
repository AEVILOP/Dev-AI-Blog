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

  const [step, setStep] = useState("select");
  const [showModal, setShowModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [tone, setTone] = useState("casual");
  const [draftId, setDraftId] = useState(null);

  const [title, setTitle] = useState("");
  const [fields, setFields] = useState({
    intro: "", whatItDoes: "", techStack: "",
    challenges: "", gettingStarted: "", conclusion: "",
  });
  const [excerpt, setExcerpt] = useState("");

  const setField = (key, val) => setFields((prev) => ({ ...prev, [key]: val }));

  const handleRepoSelect = (repo) => {
    setShowModal(false);
    setSelectedRepo(repo);
  };

  const handleGenerate = async (isRegeneration = false) => {
    if (!selectedRepo) return;
    setStep("generating");
    setError(null);

    const { readme } = await fetchReadme(selectedRepo.owner, selectedRepo.name);

    const response = await generate({
      repoName: selectedRepo.name,
      description: selectedRepo.description,
      language: selectedRepo.language,
      readme,
      tone,
      isRegeneration,
    });

    if (response && response.blog) {
      if (response.draftId) setDraftId(response.draftId);
      const blog = response.blog;
      setTitle(blog.title || "");
      setExcerpt(blog.excerpt || "");
      setFields({
        intro: blog.intro || "",
        whatItDoes: blog.whatItDoes || "",
        techStack: blog.techStack || "",
        challenges: blog.challenges || "",
        gettingStarted: blog.gettingStarted || "",
        conclusion: blog.conclusion || "",
      });
      setStep("edit");
    } else {
      setStep("select");
    }
  };

  const getContent = () => JSON.stringify(fields);

  const handlePublish = async () => {
    const payload = {
      title,
      content: getContent(),
      excerpt,
      repoName: selectedRepo.name,
      repoUrl: selectedRepo.url,
      repoLanguage: selectedRepo.language,
      category: selectedRepo.language,
      tone,
      isPublished: true,
      isUnfinished: false,
    };

    if (draftId) await updateBlog(draftId, payload);
    else {
      const saved = await createBlog(payload);
      if (saved) setDraftId(saved._id);
    }
    navigate("/account");
  };

  const handleSaveDraft = async () => {
    const payload = {
      title,
      content: getContent(),
      excerpt,
      repoName: selectedRepo.name,
      repoUrl: selectedRepo.url,
      repoLanguage: selectedRepo.language,
      category: selectedRepo.language,
      tone,
      isPublished: false,
      isUnfinished: false,
    };

    if (draftId) await updateBlog(draftId, payload);
    else {
      const saved = await createBlog(payload);
      if (saved) setDraftId(saved._id);
    }
    navigate("/account");
  };

  if (step === "generating") return <GeneratingLoader repoName={selectedRepo?.name} />;

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b-2 border-neutral-900 bg-black px-4 py-3 sm:px-6 lg:px-10 lg:py-4">
        <a href="/" className="font-barlow text-sm font-black uppercase text-white no-underline sm:text-lg">
          DEV<span className="text-orange-500">BLOG.AI</span>
        </a>
        <span className="order-3 w-full text-center font-barlow text-[10px] font-black uppercase tracking-[0.16em] text-orange-500 sm:order-2 sm:w-auto sm:tracking-[0.2em]">
          {step === "select" ? "01 - SELECT REPO" : "02 - EDIT & PUBLISH"}
        </span>
        <button
          onClick={() => navigate(-1)}
          className="rounded-3xl border-2 border-neutral-900 bg-transparent px-3.5 py-2 font-barlow text-[10px] font-black uppercase tracking-[0.12em] text-neutral-500 transition-all duration-150 hover:border-white hover:text-white sm:text-[11px] sm:tracking-[0.14em]"
        >
          Cancel
        </button>
      </nav>

      {pendingDraft && (
        <div className="flex flex-col items-start justify-between gap-3 border-b border-orange-900/40 bg-orange-950/20 px-4 py-3.5 sm:flex-row sm:items-center sm:px-6 lg:px-10">
          <span className="font-barlow text-xs font-bold tracking-[0.08em] text-orange-500">
            Unfinished blog from {new Date(pendingDraft.createdAt).toLocaleDateString()} - "{pendingDraft.repoName}"
          </span>
          <button
            onClick={discardPendingDraft}
            className="rounded-3xl border border-orange-900 bg-transparent px-3 py-1.5 font-barlow text-[10px] font-bold uppercase tracking-[0.12em] text-orange-500"
          >
            Discard
          </button>
        </div>
      )}

      {step === "select" && (
        <div className="mx-auto max-w-xl animate-fade-up px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
          <div className="mb-12">
            <div className="mb-4 font-barlow text-[10px] font-black uppercase tracking-[0.22em] text-orange-500">CREATE BLOG</div>
            <h1 className="font-barlow font-black uppercase leading-[0.93] tracking-tight text-white" style={{ fontSize: "clamp(34px,12vw,72px)" }}>
              TURN YOUR<br />REPO INTO<br /><span className="text-orange-500">A BLOG.</span>
            </h1>
          </div>

          {error && (
            <div className="mb-6 flex flex-col items-start justify-between gap-4 border border-red-900 bg-red-950/30 px-4 py-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="text-red-400">x</span>
                <span className="font-barlow text-xs font-bold tracking-[0.06em] text-red-400">
                  {typeof error === "string" ? error : error.message}
                </span>
              </div>
              {error.code === "DUPLICATE_REPO_BLOG" && error.existingBlogId && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate(`/account`)}
                    className="border border-neutral-700 px-3 py-1.5 font-barlow text-[10px] font-bold uppercase tracking-widest text-neutral-400 transition-colors hover:border-white hover:text-white"
                  >
                    Go To Drafts
                  </button>
                  <button
                    onClick={async () => {
                      await deleteBlog(error.existingBlogId);
                      handleGenerate(false);
                    }}
                    className="border border-red-500 bg-red-500 px-3 py-1.5 font-barlow text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-black hover:text-red-500"
                  >
                    Delete & Regenerate
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mb-8">
            <div className="mb-3 font-barlow text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
              01 - REPOSITORY
            </div>
            {selectedRepo ? (
              <div className="flex flex-col items-start justify-between gap-4 border-2 border-orange-500 bg-neutral-950 px-4 py-5 sm:flex-row sm:items-center sm:px-6">
                <div className="min-w-0">
                  <div className="break-words font-barlow text-lg font-black uppercase tracking-tight text-white">{selectedRepo.name}</div>
                  {selectedRepo.description && <div className="mt-1 text-xs text-neutral-700">{selectedRepo.description}</div>}
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-3xl border border-neutral-700 bg-transparent px-3 py-1.5 font-barlow text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500 transition-all duration-150 hover:border-white hover:text-white"
                >
                  Change
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="w-full rounded-3xl border-2 border-dashed border-neutral-900 bg-transparent p-7 text-center transition-colors duration-150 hover:border-orange-500"
              >
                <div className="font-barlow text-sm font-black uppercase tracking-[0.1em] text-neutral-600">+ SELECT A REPOSITORY</div>
                <div className="mt-1.5 text-xs text-neutral-700">Choose from your GitHub repos</div>
              </button>
            )}
          </div>

          <div className="mb-10">
            <div className="mb-3 font-barlow text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">02 - TONE</div>
            <ToneSelector value={tone} onChange={setTone} />
          </div>

          <button
            onClick={() => handleGenerate(false)}
            disabled={!selectedRepo || loading}
            className={`w-full rounded-3xl border-2 py-5 font-barlow text-base font-black uppercase tracking-[0.1em] transition-all duration-150 ${
              !selectedRepo
                ? "cursor-not-allowed border-neutral-900 bg-transparent text-neutral-800"
                : "cursor-pointer border-orange-500 bg-orange-500 text-black hover:bg-black hover:text-orange-500"
            }`}
          >
            Generate Blog {"->"}
          </button>

          <div className="mt-4 text-center font-barlow text-[10px] font-bold tracking-[0.14em] text-neutral-700">
            USES 1 OF YOUR 5 DAILY GENERATIONS
          </div>
        </div>
      )}

      {step === "edit" && (
        <div className="min-h-[calc(100vh-74px)] w-full animate-fade-up">
          <BlogLayout
            title={title}
            setTitle={setTitle}
            fields={fields}
            setField={setField}
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

      {showModal && <RepoSelectorModal onSelect={handleRepoSelect} onClose={() => setShowModal(false)} />}
    </div>
  );
}
