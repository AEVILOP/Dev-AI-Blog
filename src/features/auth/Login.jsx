import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ORANGE = '#f97316'
const DIM = '#1a1a1a'


// ── Canvas Hook ──────────────────────────────────────────────
// This was moved to src/shared/components/GeoBackground.jsx// ── GitHub Icon ──────────────────────────────────────────────
const GHIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
)


// ── Geo Panel (Left Side) ────────────────────────────────────
const GeoPanel = () => {
    return (
        <div className="flex-1 relative overflow-hidden border-r-2 border-gray-900 hidden lg:block bg-transparent">
            <div className="absolute inset-0 flex flex-col justify-between p-12">

                {/* Logo */}
                <Link to="/" className="font-black text-[22px] text-white uppercase tracking-tight no-underline">
                    DEV<span className="text-orange-400">BLOG.AI</span>
                </Link>

                {/* Main text */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-0.5 bg-orange-400"></div>
                        <span className="font-extrabold text-[10px] tracking-[0.22em] text-orange-400 uppercase">AI-POWERED</span>
                    </div>
                    <h2 className="font-black text-[clamp(36px,4.5vw,72px)] uppercase leading-[0.92] tracking-tighter text-white">
                        TURN CODE<br />INTO<br /><span className="text-orange-400">CONTENT.</span>
                    </h2>
                </div>

                {/* Stats */}
                <div className="flex gap-0 border-t-2 border-gray-900">
                    {[{ v: '2,400+', l: 'BLOGS PUBLISHED', active: true }, { v: '840+', l: 'DEVELOPERS' }, { v: 'FREE', l: 'TO START' }].map((s, i) => (
                        <div key={i} className={`pt-5 ${i < 2 ? 'pr-8 border-r border-gray-900' : ''} ${i > 0 ? 'pl-8' : ''}`}>
                            <div className={`font-black text-[26px] tracking-tight ${s.active ? 'text-orange-400' : 'text-white'}`}>{s.v}</div>
                            <div className="font-bold text-[9px] text-gray-800 tracking-[0.18em] mt-1">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


// ── Login Panel (Right Side) ─────────────────────────────────
import { useAuth } from '../auth/AuthContext'

const LoginPanel = () => {
    const { login, user } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showError] = useState(false)

    React.useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const handleLogin = () => {
        setLoading(true)
        login()
        setTimeout(() => setLoading(false), 2500)
    }

    return (
        <div className="w-full lg:w-[460px] shrink-0 bg-transparent flex flex-col justify-center p-8 sm:p-12 relative">

            {/* Orange top line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-orange-400 to-transparent"></div>

            {/* Back */}
            {/* <Link to="/home" className="absolute top-7 left-8 sm:left-12 font-bold text-[11px] tracking-[0.12em] text-gray-800 uppercase no-underline hover:text-white transition-colors">
                ← BACK
            </Link> */}

            <div className="login-fade-up">

                {/* Label */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-0.5 bg-orange-400"></div>
                    <span className="font-extrabold text-[10px] tracking-[0.22em] text-orange-400 uppercase">DEVELOPER ACCESS</span>
                </div>

                {/* Heading */}
                <h1 className="font-black text-[clamp(40px,5vw,62px)] uppercase leading-[0.93] tracking-tighter text-white mb-5">
                    SIGN IN<br />TO START<br /><span className="text-orange-400">WRITING.</span>
                </h1>

                <p className="text-gray-600 text-sm leading-relaxed mb-10 max-w-[300px]">
                    Connect with GitHub to access your repositories and generate developer blogs instantly.
                </p>

                {/* Error */}
                {showError && (
                    <div className="mb-6 bg-red-950 border border-red-900 p-3 flex items-center gap-3">
                        <span className="text-red-400 text-sm">✕</span>
                        <span className="font-semibold text-xs text-red-400 tracking-wide">Authentication failed. Please try again.</span>
                    </div>
                )}

                {/* GitHub Button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full flex items-center justify-center rounded-2xl gap-3 border-2 font-extrabold text-sm tracking-widest uppercase py-4 px-6 mb-3 transition-all ${loading
                        ? 'bg-gray-950 border-gray-900 text-gray-500 cursor-not-allowed'
                        : 'bg-white border-white text-black cursor-pointer hover:bg-black hover:text-white'
                        }`}
                >
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-gray-700 border-t-orange-400 rounded-full inline-block login-spin"></span>
                            CONNECTING TO GITHUB...
                        </>
                    ) : (
                        <><GHIcon /> CONTINUE WITH GITHUB</>
                    )}
                </button>

                {/* Guest */}
                <Link to="/home" className="block w-full text-center bg-transparent border-2 border-gray-400  rounded-2xl font-bold text-[13px] tracking-widest uppercase py-3.5 px-6 text-gray-400 no-underline transition-all hover:border-gray-600 hover:text-white">
                    BROWSE AS GUEST
                </Link>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-gray-400"></div>
                    <span className="font-bold text-[9px] text-gray-400 tracking-[0.15em]">WHY GITHUB?</span>
                    <div className="flex-1 h-px bg-gray-400"></div>
                </div>

                {/* Reasons */}
                <div className="flex flex-col gap-4">
                    {[
                        { icon: '⚡', text: 'Instantly access all your repositories' },
                        { icon: '🔒', text: 'No password stored — OAuth only' },
                        { icon: '✦', text: 'AI reads your README to write your blog' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 login-fade-up" style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
                            <div className="w-8 h-8 bg-gray-950 border rounded-2xl border-gray-400 flex items-center justify-center text-orange-400 text-[13px] shrink-0">{item.icon}</div>
                            <span className="text-gray-400 text-[13px] leading-relaxed">{item.text}</span>
                        </div>
                    ))}
                </div>

                <p className="text-gray-400 text-[11px] leading-relaxed mt-10">
                    By continuing you agree to our Terms of Se rvice. We only request read access to your public repositories.
                </p>
            </div>
        </div>
    )
}


// ── Main Login Page ──────────────────────────────────────────
const Login = () => {
    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <div className="flex-1 flex min-h-[calc(100vh-41px)] bg-transparent">
                <GeoPanel />
                <LoginPanel />
            </div>
        </div>
    )
}

export default Login