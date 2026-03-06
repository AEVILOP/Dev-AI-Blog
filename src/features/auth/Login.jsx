import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from '../blog/components/Pagination'

const ORANGE = '#f97316'
const DIM = '#1a1a1a'


// ── Canvas Hook ──────────────────────────────────────────────
const useGeoCanvas = (canvasRef) => {
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        let shapes = []
        let particles = []

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            init(canvas.width, canvas.height)
        }

        const init = (W, H) => {
            shapes = []
            particles = []
            for (let y = 0; y < H; y += 56) shapes.push({ type: 'hline', y, opacity: 0.07 + Math.random() * 0.08 })
            for (let x = 0; x < W; x += 56) shapes.push({ type: 'vline', x, opacity: 0.07 + Math.random() * 0.08 })
            for (let i = 0; i < 5; i++) shapes.push({ type: 'rect', x: Math.random() * W * 0.75, y: Math.random() * H * 0.75, w: 80 + Math.random() * 180, h: 80 + Math.random() * 180, rot: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.0025, color: i % 3 === 0 ? ORANGE : DIM, lw: i % 3 === 0 ? 1.5 : 0.5, opacity: 0.18 + Math.random() * 0.25 })
            for (let i = 0; i < 5; i++) shapes.push({ type: 'triangle', x: Math.random() * W, y: Math.random() * H, size: 40 + Math.random() * 110, rot: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.003, color: i % 2 === 0 ? ORANGE : DIM, lw: i % 2 === 0 ? 1.5 : 0.5, opacity: 0.12 + Math.random() * 0.22 })
            for (let i = 0; i < 4; i++) shapes.push({ type: 'circle', x: Math.random() * W, y: Math.random() * H, r: 30 + Math.random() * 90, color: i === 0 ? ORANGE : DIM, lw: i === 0 ? 1.5 : 0.5, opacity: 0.1 + Math.random() * 0.18, phase: Math.random() * Math.PI * 2, phaseSpeed: 0.012 + Math.random() * 0.018 })
            for (let i = 0; i < 3; i++) shapes.push({ type: 'crosshair', x: Math.random() * W, y: Math.random() * H, r: 18 + Math.random() * 55, color: i === 0 ? ORANGE : DIM, lw: i === 0 ? 1.5 : 0.5, opacity: 0.18 + Math.random() * 0.28, phase: Math.random() * Math.PI * 2, phaseSpeed: 0.014 })
            for (let i = 0; i < 5; i++) shapes.push({ type: 'slash', x: Math.random() * W, y: Math.random() * H, len: 100 + Math.random() * 180, angle: -Math.PI / 4 + (Math.random() - 0.5) * 0.5, color: i % 2 === 0 ? ORANGE : DIM, lw: i % 2 === 0 ? 1.5 : 0.5, opacity: 0.08 + Math.random() * 0.18 })
            for (let i = 0; i < 38; i++) particles.push({ x: Math.random() * W, y: Math.random() * H, r: 0.8 + Math.random() * 1.8, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, color: Math.random() < 0.22 ? ORANGE : '#2a2a2a', opacity: 0.3 + Math.random() * 0.5 })
        }

        const draw = () => {
            const W = canvas.width
            const H = canvas.height
            ctx.clearRect(0, 0, W, H)
            ctx.fillStyle = '#000'
            ctx.fillRect(0, 0, W, H)

            shapes.forEach(s => {
                ctx.save()
                ctx.globalAlpha = s.opacity
                ctx.strokeStyle = s.color
                ctx.lineWidth = s.lw || 0.5
                if (s.type === 'hline') { ctx.beginPath(); ctx.moveTo(0, s.y); ctx.lineTo(W, s.y); ctx.stroke() }
                else if (s.type === 'vline') { ctx.beginPath(); ctx.moveTo(s.x, 0); ctx.lineTo(s.x, H); ctx.stroke() }
                else if (s.type === 'rect') { s.rot += s.rotSpeed; ctx.translate(s.x + s.w / 2, s.y + s.h / 2); ctx.rotate(s.rot); ctx.strokeRect(-s.w / 2, -s.h / 2, s.w, s.h) }
                else if (s.type === 'triangle') {
                    s.rot += s.rotSpeed; ctx.translate(s.x, s.y); ctx.rotate(s.rot); ctx.beginPath()
                    for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2 - Math.PI / 2; i === 0 ? ctx.moveTo(Math.cos(a) * s.size, Math.sin(a) * s.size) : ctx.lineTo(Math.cos(a) * s.size, Math.sin(a) * s.size) }
                    ctx.closePath(); ctx.stroke()
                }
                else if (s.type === 'circle') { s.phase += s.phaseSpeed; ctx.beginPath(); ctx.arc(s.x, s.y, s.r + Math.sin(s.phase) * 7, 0, Math.PI * 2); ctx.stroke() }
                else if (s.type === 'crosshair') {
                    s.phase += s.phaseSpeed; const r = s.r + Math.sin(s.phase) * 5; const gap = 7
                    ctx.beginPath(); ctx.arc(s.x, s.y, r, 0, Math.PI * 2); ctx.stroke()
                    ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2); ctx.fill()
                    ctx.beginPath()
                    ctx.moveTo(s.x - r - 10, s.y); ctx.lineTo(s.x - gap, s.y)
                    ctx.moveTo(s.x + gap, s.y); ctx.lineTo(s.x + r + 10, s.y)
                    ctx.moveTo(s.x, s.y - r - 10); ctx.lineTo(s.x, s.y - gap)
                    ctx.moveTo(s.x, s.y + gap); ctx.lineTo(s.x, s.y + r + 10)
                    ctx.stroke()
                }
                else if (s.type === 'slash') { const dx = Math.cos(s.angle) * s.len / 2; const dy = Math.sin(s.angle) * s.len / 2; ctx.beginPath(); ctx.moveTo(s.x - dx, s.y - dy); ctx.lineTo(s.x + dx, s.y + dy); ctx.stroke() }
                ctx.restore()
            })

            // Corner brackets
            ctx.save(); ctx.strokeStyle = ORANGE; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.55
            const b = 44
            ctx.beginPath()
            ctx.moveTo(b, 2); ctx.lineTo(2, 2); ctx.lineTo(2, b)
            ctx.moveTo(W - b, H - 2); ctx.lineTo(W - 2, H - 2); ctx.lineTo(W - 2, H - b)
            ctx.stroke(); ctx.restore()

            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
                ctx.save(); ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore()
            })

            animId = requestAnimationFrame(draw)
        }

        resize()
        draw()
        const ro = new ResizeObserver(resize)
        ro.observe(canvas)
        return () => { cancelAnimationFrame(animId); ro.disconnect() }
    }, [canvasRef])
}




// ── GitHub Icon ──────────────────────────────────────────────
const GHIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
)


// ── Geo Panel (Left Side) ────────────────────────────────────
const GeoPanel = () => {
    const canvasRef = useRef(null)
    useGeoCanvas(canvasRef)

    return (
        <div className="flex-1 relative overflow-hidden border-r-2 border-gray-900 hidden lg:block">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 flex flex-col justify-between p-12">

                {/* Logo */}
                <Link to="/" className="font-black text-[22px] text-white uppercase tracking-tight no-underline">
                    DEV<span className="text-orange-400">BLOG</span>.AI
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
const LoginPanel = () => {
    const [loading, setLoading] = useState(false)
    const [showError] = useState(false)

    const handleLogin = () => {
        setLoading(true)
        // Real: window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`
        setTimeout(() => setLoading(false), 2500)
    }

    return (
        <div className="w-full lg:w-[460px] shrink-0 bg-black flex flex-col justify-center p-8 sm:p-12 relative">

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
        <div className="min-h-screen bg-black flex flex-col">
            <InfiniteScroll />
            <div className="flex-1 flex min-h-[calc(100vh-41px)]">
                <GeoPanel />
                <LoginPanel />
            </div>
        </div>
    )
}

export default Login