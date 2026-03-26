export default function GeneratingLoader({ repoName }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] space-y-8 animate-pulse text-white">
            
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-neutral-900 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            </div>

            <div className="text-center space-y-2">
                <h2 className="font-barlow font-black text-2xl tracking-tight uppercase">
                    GENERATING BLOG...
                </h2>
                <p className="text-sm font-bold tracking-widest text-orange-500 uppercase">
                    ANALYZING {repoName || "REPOSITORY"}
                </p>
            </div>

            <div className="text-xs text-neutral-500 text-center max-w-sm mt-8">
                Depending on the size of the codebase, this could take anywhere between 10 to 30 seconds.
            </div>
            
        </div>
    )
}
