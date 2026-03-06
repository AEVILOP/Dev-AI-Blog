export default function BlogEditor({ register }) {
    return (
        <div className="space-y-8">

            <div>
                <label className="text-xs text-orange-500 uppercase">Title</label>

                <input
                    {...register("title")}
                    placeholder="Blog title"
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-xl"
                />
            </div>

            <div>
                <label className="text-xs text-orange-500 uppercase">Introduction</label>

                <textarea
                    {...register("intro")}
                    rows={4}
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3"
                />
            </div>

            <div>
                <label className="text-xs text-orange-500 uppercase">What It Does</label>

                <textarea
                    {...register("whatItDoes")}
                    rows={4}
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3"
                />
            </div>

            <div>
                <label className="text-xs text-orange-500 uppercase">Tech Stack</label>

                <textarea
                    {...register("techStack")}
                    rows={4}
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3"
                />
            </div>

            <div>
                <label className="text-xs text-orange-500 uppercase">Challenges</label>

                <textarea
                    {...register("challenges")}
                    rows={4}
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3"
                />
            </div>

            <div>
                <label className="text-xs text-orange-500 uppercase">Getting Started</label>

                <textarea
                    {...register("gettingStarted")}
                    rows={4}
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3"
                />
            </div>

            <div>
                <label className="text-xs text-orange-500 uppercase">Conclusion</label>

                <textarea
                    {...register("conclusion")}
                    rows={4}
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3"
                />
            </div>

        </div>
    );
}