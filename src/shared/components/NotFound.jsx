import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-10 text-center relative">

            {/* Ghost 404 */}
            <div className="relative mb-8">
                <div className="font-barlow font-black text-[clamp(120px,20vw,240px)] leading-none tracking-tighter select-none"
                    style={{ color: "transparent", WebkitTextStroke: "1px #1a1a1a" }}>
                    404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
            </div>

            {/* Text */}
            <div className="animate-fade-up">
                <div className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.22em] uppercase mb-4">
                    PAGE NOT FOUND
                </div>
                <h1 className="font-barlow font-black text-4xl md:text-5xl text-white uppercase tracking-tight leading-[0.95] mb-5">
                    THIS PAGE<br />DOESN'T EXIST.
                </h1>
                <p className="text-neutral-700 text-sm leading-relaxed max-w-xs mx-auto mb-10">
                    The page you're looking for has been moved, deleted, or never existed.
                </p>

                <div className="flex gap-3 justify-center flex-wrap">
                    <button
                        onClick={() => navigate("/")}
                        className="font-barlow font-black text-[13px] tracking-[0.1em] uppercase border-2 border-orange-500 bg-orange-500 text-black px-7 py-3.5 cursor-pointer transition-all duration-150 hover:bg-black hover:text-orange-500"
                    >
                        GO HOME →
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="font-barlow font-black text-[13px] tracking-[0.1em] uppercase border-2 border-neutral-900 text-neutral-700 px-6 py-3.5 cursor-pointer transition-all duration-150 hover:border-white hover:text-white"
                    >
                        GO BACK
                    </button>
                </div>
            </div>

            {/* Logo */}
            <a href="/"
                className="absolute bottom-8 font-barlow font-black text-base text-neutral-900 uppercase no-underline tracking-tight transition-colors duration-150 hover:text-white">
                DEV<span className="text-orange-500">BLOG</span>.AI
            </a>
        </div>
    );
}