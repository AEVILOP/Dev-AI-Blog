import React, { useEffect, useRef } from 'react'

const ORANGE = '#f97316'
const DIM = '#1a1a1a'

const useGeoCanvas = (canvasRef) => {
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        let shapes = []
        let particles = []

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            init(canvas.width, canvas.height)
        }

        const init = (W, H) => {
            shapes = []
            particles = []
            for (let y = 0; y < H; y += 56) shapes.push({ type: 'hline', y, opacity: 0.08 + Math.random() * 0.1 })
            for (let x = 0; x < W; x += 56) shapes.push({ type: 'vline', x, opacity: 0.08 + Math.random() * 0.1 })
            for (let i = 0; i < 5; i++) shapes.push({ type: 'rect', x: Math.random() * W * 0.75, y: Math.random() * H * 0.75, w: 80 + Math.random() * 180, h: 80 + Math.random() * 180, rot: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.0025, color: i % 3 === 0 ? ORANGE : DIM, lw: i % 3 === 0 ? 1.5 : 0.5, opacity: 0.25 + Math.random() * 0.25 })
            for (let i = 0; i < 5; i++) shapes.push({ type: 'triangle', x: Math.random() * W, y: Math.random() * H, size: 40 + Math.random() * 110, rot: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.003, color: i % 2 === 0 ? ORANGE : DIM, lw: i % 2 === 0 ? 1.5 : 0.5, opacity: 0.2 + Math.random() * 0.25 })
            for (let i = 0; i < 4; i++) shapes.push({ type: 'circle', x: Math.random() * W, y: Math.random() * H, r: 30 + Math.random() * 90, color: i === 0 ? ORANGE : DIM, lw: i === 0 ? 1.5 : 0.5, opacity: 0.2 + Math.random() * 0.2, phase: Math.random() * Math.PI * 2, phaseSpeed: 0.012 + Math.random() * 0.018 })
            for (let i = 0; i < 3; i++) shapes.push({ type: 'crosshair', x: Math.random() * W, y: Math.random() * H, r: 18 + Math.random() * 55, color: i === 0 ? ORANGE : DIM, lw: i === 0 ? 1.5 : 0.5, opacity: 0.25 + Math.random() * 0.3 })
            for (let i = 0; i < 5; i++) shapes.push({ type: 'slash', x: Math.random() * W, y: Math.random() * H, len: 100 + Math.random() * 180, angle: -Math.PI / 4 + (Math.random() - 0.5) * 0.5, color: i % 2 === 0 ? ORANGE : DIM, lw: i % 2 === 0 ? 1.5 : 0.5, opacity: 0.15 + Math.random() * 0.2 })
            for (let i = 0; i < 38; i++) particles.push({ x: Math.random() * W, y: Math.random() * H, r: 0.8 + Math.random() * 1.8, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, color: Math.random() < 0.22 ? ORANGE : '#2a2a2a', opacity: 0.3 + Math.random() * 0.4 })
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

            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
                ctx.save(); ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore()
            })

            animId = requestAnimationFrame(draw)
        }

        window.addEventListener('resize', resize)
        resize()
        draw()
        
        return () => { 
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [canvasRef])
}

export default function GeoBackground() {
    const canvasRef = useRef(null)
    useGeoCanvas(canvasRef)

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] bg-black">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/80"></div>
        </div>
    )
}
