import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useGenerate } from "../hooks/useGenerate";
import { useBlogs } from "../hooks/useBlogs";
import { useGitHub } from "../hooks/useGitHub";

import RepoSelectorModal from "../components/RepoSelectorModal";
import ToneSelector from "../components/ToneSelector";
import GeneratingLoader from "../components/GeneratingLoader";
import RegenerateButton from "../components/RegenerateButton";

import BlogLayout from "../components/editor/BlogLayout";
import BlogEditor from "../components/editor/BlogEditor";
import BlogPreview from "../components/editor/BlogPreview";
export default function CreateBlog() {

    const navigate = useNavigate()

    const { generate, loading, error, setError,
        regenerateCount, isCoolingDown, cooldownSeconds,
        readmeNote } = useGenerate()

    const { createBlog, updateBlog, loading: saving } = useBlogs()
    const { fetchReadme } = useGitHub()

    const [step, setStep] = useState("select")
    const [showModal, setShowModal] = useState(false)
    const [selectedRepo, setSelectedRepo] = useState(null)
    const [tone, setTone] = useState("casual")
    const [draftId, setDraftId] = useState(null)

    const { register, watch, setValue } = useForm({
        defaultValues: {
            title: "",
            intro: "",
            whatItDoes: "",
            techStack: "",
            challenges: "",
            gettingStarted: "",
            conclusion: ""
        }
    })

    const blogData = watch()

    /* ---------------- Repo Select ---------------- */

    const handleRepoSelect = (repo) => {
        setSelectedRepo(repo)
        setShowModal(false)
    }

    /* ---------------- Generate Blog ---------------- */

    const handleGenerate = async (isRegeneration = false) => {

        if (!selectedRepo) return

        setStep("generating")
        setError(null)

        const { readme } = await fetchReadme(
            selectedRepo.owner,
            selectedRepo.name
        )

        const result = await generate({
            repoName: selectedRepo.name,
            description: selectedRepo.description,
            language: selectedRepo.language,
            readme,
            tone,
            isRegeneration
        })

        if (!result) {
            setStep("select")
            return
        }

        setValue("title", result.title)
        setValue("intro", result.intro)
        setValue("whatItDoes", result.whatItDoes)
        setValue("techStack", result.techStack)
        setValue("challenges", result.challenges)
        setValue("gettingStarted", result.gettingStarted)
        setValue("conclusion", result.conclusion)

        setStep("edit")
    }

    /* ---------------- Save Draft ---------------- */

    const handleSaveDraft = async () => {

        const payload = {
            title: blogData.title,
            content: JSON.stringify(blogData),
            repoName: selectedRepo.name,
            repoUrl: selectedRepo.url,
            repoLanguage: selectedRepo.language,
            category: selectedRepo.language,
            tone,
            isPublished: false
        }

        if (draftId) {
            await updateBlog(draftId, payload)
        } else {
            const saved = await createBlog(payload)
            if (saved) setDraftId(saved._id)
        }

        navigate("/account")
    }

    /* ---------------- Publish ---------------- */

    const handlePublish = async () => {

        const payload = {
            title: blogData.title,
            content: JSON.stringify(blogData),
            repoName: selectedRepo.name,
            repoUrl: selectedRepo.url,
            repoLanguage: selectedRepo.language,
            category: selectedRepo.language,
            tone,
            isPublished: true
        }

        if (draftId) {
            await updateBlog(draftId, payload)
        } else {
            const saved = await createBlog(payload)
            if (saved) setDraftId(saved._id)
        }

        navigate("/account")
    }

    /* ---------------- Loader ---------------- */

    if (step === "generating") {
        return <GeneratingLoader repoName={selectedRepo?.name} />
    }

    /* ---------------- UI ---------------- */

    return (

        <div className="min-h-screen bg-black text-white">

            {/* NAVBAR */}

            <nav className="border-b border-neutral-900 px-10 py-4 flex justify-between">

                <h1 className="font-bold">
                    DEV<span className="text-orange-500">BLOG</span>
                </h1>

                <button onClick={() => navigate(-1)}>
                    CANCEL
                </button>

            </nav>


            {/* STEP 1 : SELECT REPO */}

            {step === "select" && (

                <div className="max-w-xl mx-auto py-20 space-y-8">

                    <button
                        onClick={() => setShowModal(true)}
                        className="border border-neutral-800 p-6 w-full"
                    >
                        {selectedRepo ? selectedRepo.name : "SELECT REPOSITORY"}
                    </button>

                    <ToneSelector value={tone} onChange={setTone} />

                    <button
                        onClick={() => handleGenerate(false)}
                        className="bg-orange-500 text-black px-6 py-4"
                    >
                        GENERATE BLOG
                    </button>

                </div>

            )}


            {/* STEP 2 : EDIT BLOG */}

            {step === "edit" && (

                <div className="h-[calc(100vh-70px)]">

                    {readmeNote && (
                        <div className="px-10 py-3 text-orange-400 text-sm">
                            {readmeNote}
                        </div>
                    )}

                    <BlogLayout

                        editor={
                            <BlogEditor register={register} />
                        }

                        preview={
                            <BlogPreview blog={blogData} />
                        }

                    />

                    <div className="flex justify-between px-10 py-6 border-t border-neutral-900">

                        <RegenerateButton
                            onRegenerate={() => handleGenerate(true)}
                            regenerateCount={regenerateCount}
                            isCoolingDown={isCoolingDown}
                            cooldownSeconds={cooldownSeconds}
                            loading={loading}
                        />

                        <div className="flex gap-4">

                            <button
                                onClick={handleSaveDraft}
                                disabled={saving}
                                className="border border-neutral-800 px-6 py-3"
                            >
                                SAVE DRAFT
                            </button>

                            <button
                                onClick={handlePublish}
                                disabled={saving}
                                className="bg-orange-500 text-black px-6 py-3"
                            >
                                PUBLISH
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* MODAL */}

            {showModal && (
                <RepoSelectorModal
                    onSelect={handleRepoSelect}
                    onClose={() => setShowModal(false)}
                />
            )}

        </div>

    )

}