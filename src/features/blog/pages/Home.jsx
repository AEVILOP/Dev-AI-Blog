import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full bg-transparent">
            {/* Main Hero Section */}
            <div className='relative min-h-[85vh] max-w-[1400px] mx-auto bg-transparent text-white flex items-center justify-between overflow-hidden pt-10 lg:pt-16 px-4 sm:px-6 lg:px-12'>

                {/* Content Container - Left Aligned */}
                <div className="relative z-10 w-full max-w-2xl">

                    {/* Watermark Label */}
                    <div className="flex items-center space-x-2 mb-8 sm:mb-12 text-orange-400">
                        <div className="w-8 h-1 bg-orange-400"></div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">
                            AI-POWERED GITHUB BLOG GENERATOR
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-6xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6 sm:mb-8 tracking-tight">
                        <span className="block text-white">YOUR CODE</span>
                        <span className="block text-white">DESERVES TO</span>
                        <span className="block text-orange-400">BE READ.</span>
                    </h1>

                    {/* Description */}
                    <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-xl mb-8 sm:mb-12 leading-relaxed">
                        Select a GitHub repo. Pick your tone. Get a complete developer blog in seconds — then edit and publish it to the world.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <button onClick={() => navigate('/create')} className="font-barlow font-black text-[13px] tracking-widest uppercase border-2 rounded-3xl border-orange-500 bg-orange-500 text-black px-8 py-4 cursor-pointer transition-all duration-150 hover:bg-black hover:text-orange-500">
                            GENERATE BLOG →
                        </button>
                        <button onClick={() => navigate('/explore')} className="font-barlow font-black text-[13px] tracking-widest uppercase border-2 rounded-3xl border-orange-500 text-orange-500 bg-transparent px-8 py-4 cursor-pointer transition-all duration-150 hover:bg-orange-500 hover:text-black">
                            EXPLORE
                        </button>
                    </div>
                </div>

                {/* Visual Elements - Right Aligned (Hidden on smaller screens) */}
                <div className="relative hidden lg:flex flex-1 justify-end items-center h-full min-h-[500px] ml-10 xl:ml-20">
                    <div className="relative w-[450px] h-[500px]">

                        {/* Floating elements connected by an animated dashed SVG line */}
                        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ strokeDasharray: "8,8" }}>
                            {/* Line from top-left to center */}
                            <path d="M 100 120 C 200 120, 225 250, 225 250" fill="none" stroke="#ea580c" strokeWidth="2" strokeOpacity="0.4" />
                            {/* Line from center to bottom-right */}
                            <path d="M 225 250 C 225 250, 250 380, 350 380" fill="none" stroke="#ea580c" strokeWidth="2" strokeOpacity="0.4" />
                            {/* Arrow heads approximating the endpoints */}
                        </svg>

                        {/* 1. GitHub Repo Card */}
                        <div className="absolute top-10 left-0 bg-[#0a0a0a] border-2 border-neutral-700 rounded-3xl p-5 w-64 z-10 transform -rotate-3 transition-transform hover:rotate-0 hover:scale-105 duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                                </div>
                                <div className="font-barlow font-bold text-white tracking-wider">github.com/...</div>
                            </div>
                            <div className="space-y-2 font-mono text-[11px] text-neutral-400">
                                <div className="flex gap-2"><span className="text-orange-500">commit</span><span className="text-neutral-300">8f192a0</span></div>
                                <div className="text-green-400">feat: implement AI engine module</div>
                                <div className="text-neutral-500">2 minutes ago</div>
                            </div>
                        </div>

                        {/* 2. AI Processing Node */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="relative">
                                {/* Ping animation */}
                                <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-30"></div>
                                {/* Sparkle icon */}
                                <div className="w-20 h-20 bg-orange-500 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center relative z-10 transition-transform hover:scale-110 shadow-[0_0_40px_rgba(234,88,12,0.4)] cursor-pointer">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12c-4.9-1.2-8.3-4.6-9.5-9.5C10.3 7.4 6.9 10.8 2 12c4.9 1.2 8.3 4.6 9.5 9.5C12.7 16.6 16.1 13.2 21 12z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* 3. Published Blog Card */}
                        <div className="absolute bottom-6 right-0 bg-[#0a0a0a] border-2 border-orange-500 rounded-3xl p-5 w-72 z-30 transform rotate-2 transition-transform hover:rotate-0 hover:scale-105 duration-300 shadow-[0_0_30px_rgba(234,88,12,0.15)] flex flex-col gap-4">
                            <div className="flex gap-3 items-center border-b border-neutral-800 pb-4">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>
                                <div className="flex flex-col gap-1">
                                    <div className="font-barlow font-black text-white uppercase text-sm tracking-widest leading-none">Adding AI Engine</div>
                                    <div className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider">DevBlog Generated</div>
                                </div>
                            </div>
                            <div className="space-y-2.5">
                                <div className="w-full h-2.5 bg-neutral-800 rounded-full"></div>
                                <div className="w-full h-2.5 bg-neutral-800 rounded-full"></div>
                                <div className="w-3/4 h-2.5 bg-neutral-800 rounded-full"></div>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest px-2.5 py-1.5 bg-orange-500/10 rounded border border-orange-500/20">Published</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="w-full px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto py-24 border-t border-neutral-900 mt-12 bg-transparent">
                <div className="flex items-center justify-center mb-16 relative">
                    <div className="absolute w-full h-px bg-neutral-900 top-1/2 -translate-y-1/2 -z-10"></div>
                    <div className="bg-black px-8">
                        <h2 className="font-barlow font-black text-2xl sm:text-3xl uppercase text-white tracking-[0.2em] text-center">HOW IT WORKS</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    {/* Step 1 */}
                    <div className="relative flex flex-col gap-6 p-8 border-2 border-neutral-900 rounded-3xl bg-black/60 shadow-lg backdrop-blur-md transition-colors hover:border-orange-500 group">
                        {/* Arrow to Step 2 */}
                        <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-8 -translate-y-1/2 z-10 text-black bg-orange-500 rounded-full border-4 border-black shadow-[0_0_15px_rgba(234,88,12,0.5)]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="p-1">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-orange-500 text-black flex items-center justify-center font-black text-lg shrink-0 pt-0.5">1</div>
                            <h3 className="font-barlow font-black text-lg text-white uppercase tracking-widest m-0">Connect GitHub</h3>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed m-0">
                            Login securely with GitHub.<br />Access your repositories instantly.
                        </p>
                        <div className="w-full h-56 bg-neutral-900/50 rounded-2xl border-2 border-neutral-800 mt-6 overflow-hidden hover:border-orange-500/40 transition-all group/image">
                            <img src="/Github Auth.png" alt="Connect GitHub" className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100 p-4" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col gap-6 p-8 border-2 border-neutral-900 rounded-3xl bg-black/60 shadow-lg backdrop-blur-md transition-colors hover:border-orange-500 group">
                        {/* Arrow to Step 3 */}
                        <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-8 -translate-y-1/2 z-10 text-black bg-orange-500 rounded-full border-4 border-black shadow-[0_0_15px_rgba(234,88,12,0.5)]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="p-1">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-orange-500 text-black flex items-center justify-center font-black text-lg shrink-0 pt-0.5">2</div>
                            <h3 className="font-barlow font-black text-lg text-white uppercase tracking-widest m-0">Select Repository</h3>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed m-0">
                            Choose a project.<br />AI reads README and metadata.
                        </p>
                        <div className="w-full h-56 bg-neutral-900/50 rounded-2xl border-2 border-neutral-800 mt-6 overflow-hidden hover:border-orange-500/40 transition-all group/image">
                            <img src="/Select repo modal.png" alt="Select Repository" className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100 p-4" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col gap-6 p-8 border-2 border-neutral-900 rounded-3xl bg-black/60 shadow-lg backdrop-blur-md transition-colors hover:border-orange-500 group">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-orange-500 text-black flex items-center justify-center font-black text-lg shrink-0 pt-0.5">3</div>
                            <h3 className="font-barlow font-black text-lg text-white uppercase tracking-widest m-0">Generate Blog</h3>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed m-0">
                            AI writes developer-friendly blog.<br />Customize tone and style.
                        </p>
                        <div className="w-full h-56 bg-neutral-900/50 rounded-2xl border-2 border-neutral-800 mt-6 overflow-hidden hover:border-orange-500/40 transition-all group/image">
                            <img src="/AI-Generated blog.png" alt="Generate Blog" className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100 p-4" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button onClick={() => navigate('/explore')} className="font-barlow font-black text-xs tracking-widest uppercase border-2 rounded-3xl border-orange-500 bg-orange-500 text-black px-10 py-4 cursor-pointer transition-all duration-150 hover:bg-black hover:text-orange-500">
                        BROWSE MORE
                    </button>
                </div>
            </div>

            {/* WHY DEVELOPERS LOVE */}
            <div className="w-full px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto py-24 border-t border-neutral-900 bg-transparent">
                <div className="text-center mb-16">
                    <h2 className="font-barlow font-black text-2xl sm:text-3xl uppercase text-white tracking-[0.2em]">
                        WHY DEVELOPERS <span className="text-orange-500">💛</span> DEVBLOG.AI
                    </h2>
                    <p className="text-neutral-400 mt-5 text-sm uppercase tracking-widest">
                        Turn your GitHub projects into polished developer blogs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-8 border-2 border-neutral-900 rounded-3xl bg-black/40 backdrop-blur-md flex flex-col gap-4 hover:border-orange-500/50 transition-colors">
                        <div className="text-orange-500 text-3xl font-black">⚡</div>
                        <h3 className="font-barlow font-black text-lg text-white uppercase tracking-widest m-0 leading-tight">Write blogs faster</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed m-0 mt-2">Transform source code into content in under 60 seconds.</p>
                    </div>

                    <div className="p-8 border-2 border-neutral-900 rounded-3xl bg-black/40 backdrop-blur-md flex flex-col gap-4 hover:border-orange-500/50 transition-colors">
                        <div className="text-orange-500 text-3xl font-black">📚</div>
                        <h3 className="font-barlow font-black text-lg text-white uppercase tracking-widest m-0 leading-tight">Turn projects into portfolios</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed m-0 mt-2">Showcase your projects with professional blog posts.</p>
                    </div>

                    <div className="p-8 border-2 border-neutral-900 rounded-3xl bg-black/40 backdrop-blur-md flex flex-col gap-4 hover:border-orange-500/50 transition-colors">
                        <div className="text-orange-500 text-3xl font-black">🚀</div>
                        <h3 className="font-barlow font-black text-lg text-white uppercase tracking-widest m-0 leading-tight">Improve developer visibility</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed m-0 mt-2">Get your work seen by the developer community.</p>
                    </div>

                    <div className="p-8 border-2 border-neutral-900 rounded-3xl bg-black/40 backdrop-blur-md flex flex-col gap-4 hover:border-orange-500/50 transition-colors">
                        <div className="text-orange-500 text-3xl font-black">🤝</div>
                        <h3 className="font-barlow font-black text-lg text-white uppercase tracking-widest m-0 leading-tight">Share knowledge effortlessly</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed m-0 mt-2">Contribute tutorials and insights to help others.</p>
                    </div>
                </div>
            </div>

            {/* FEATURES / BIG IMAGE SECTION */}
            <div className="w-full px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto pt-24 pb-32 border-t border-neutral-900 bg-transparent">
                <div className="flex items-center justify-center mb-8 relative">
                    <div className="absolute w-full h-px bg-neutral-900 top-1/2 -translate-y-1/2 -z-10"></div>
                    <div className="bg-black px-8">
                        <h2 className="font-barlow font-black text-2xl sm:text-3xl uppercase text-white tracking-[0.2em] text-center">FEATURES</h2>
                    </div>
                </div>
                <p className="text-center text-neutral-400 mb-16 text-sm uppercase tracking-widest">
                    AI-powered features built for developers sharing.
                </p>

                {/* Feature Image Container with Enhanced Styling */}
                <div className="relative group">
                    {/* Gradient Background Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-orange-500/20 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Main Image Container */}
                    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] border-2 sm:border-4 border-neutral-800 hover:border-orange-500/60 bg-neutral-950/80 shadow-2xl rounded-[40px] flex flex-col items-center justify-center overflow-hidden backdrop-blur-lg group/image transition-all duration-300">

                        {/* Image */}
                        <img
                            src="/Feature image.png"
                            alt="DevBlog Feature Showcase"
                            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100"
                            onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.style.backgroundColor = '#1a1a1a'
                            }}
                        />

                        {/* Overlay Gradient (top to bottom fade) */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0 rounded-full blur-md"></div>
                </div>

                {/* Description Below Image */}
                <div className="mt-12 text-center max-w-2xl mx-auto">
                    <h3 className="font-barlow font-black text-lg sm:text-xl text-white uppercase tracking-widest mb-3">Transform Your Code Into Beautiful Blogs</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        Create professional, AI-powered blog posts directly from your GitHub repositories. Edit and customize with our intuitive editor, then publish instantly to reach the developer community.
                    </p>
                </div>

                <div className="flex justify-center mt-16">
                    <button onClick={() => navigate('/create')} className="font-barlow font-black text-[15px] tracking-[0.15em] uppercase border-2 rounded-3xl border-orange-500 bg-orange-500 text-black px-14 py-5 cursor-pointer transition-all duration-150 hover:bg-black hover:text-orange-500 shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20">
                        GET STARTED NOW →
                    </button>
                </div>
            </div>

            {/* PROFESSIONAL FOOTER */}
            <footer className="w-full border-t border-neutral-900 bg-[#050505]">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16 flex flex-col md:flex-row justify-between items-center md:items-start gap-10 text-center md:text-left">
                    <div className="flex flex-col gap-3 max-w-sm">
                        <span className="font-barlow font-black text-2xl text-white uppercase tracking-widest flex items-center justify-center md:justify-start">
                            DEV<span className="text-orange-500">BLOG.AI</span>
                        </span>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            The intelligent platform for transforming your GitHub repositories into beautiful, professional portfolios and technical blogs.
                        </p>
                    </div>

                    <div className="flex gap-12 sm:gap-20">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-barlow font-bold text-white text-xs uppercase tracking-widest">Platform</h4>
                            <div className="flex flex-col gap-3 text-sm text-neutral-500">
                                <span className="hover:text-orange-500 cursor-pointer transition-colors block">Create Blog</span>
                                <span className="hover:text-orange-500 cursor-pointer transition-colors block">Explore Feed</span>
                                <span className="hover:text-orange-500 cursor-pointer transition-colors block">Dashboard</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-barlow font-bold text-white text-xs uppercase tracking-widest">Connect</h4>
                            <div className="flex flex-col gap-3 text-sm text-neutral-500">
                                <span className="hover:text-orange-500 cursor-pointer transition-colors block">Twitter / X</span>
                                <span className="hover:text-orange-500 cursor-pointer transition-colors block">GitHub Repository</span>
                                <span className="hover:text-orange-500 cursor-pointer transition-colors block">Support</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-900">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="text-neutral-600 text-xs font-mono tracking-wider">
                            © {new Date().getFullYear()} DevBlog AI. All rights reserved.
                        </span>
                        <span className="text-neutral-500 text-xs font-barlow tracking-widest uppercase flex items-center gap-1.5">
                            Built by <a href="https://github.com" target="_blank" rel="noreferrer" className="text-orange-500 font-black hover:text-white transition-colors">ANIRBAN BANERJEE</a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home