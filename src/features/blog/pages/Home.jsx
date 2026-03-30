import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full bg-transparent">
            <div className="relative mx-auto flex min-h-[78vh] max-w-[1400px] items-center justify-between overflow-hidden px-4 pt-8 text-white sm:px-6 lg:px-12 lg:pt-16">
                <div className="relative z-10 w-full max-w-2xl">
                    <div className="mb-8 flex items-center gap-2 text-orange-500 sm:mb-12">
                        <div className="h-1 w-6 bg-orange-500 sm:w-8"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] sm:text-sm">
                            AI-POWERED GITHUB BLOG GENERATOR
                        </span>
                    </div>

                    <h1 className="mb-6 text-[clamp(2.7rem,12vw,5.5rem)] font-black leading-[0.95] tracking-tight sm:mb-8">
                        <span className="block text-white">YOUR CODE</span>
                        <span className="block text-white">DESERVES TO</span>
                        <span className="block text-orange-500">BE READ.</span>
                    </h1>

                    <p className="mb-8 max-w-xl text-sm leading-relaxed text-gray-400 sm:mb-12 sm:text-base lg:text-lg">
                        Select a GitHub repo. Pick your tone. Get a complete developer blog in seconds, then edit and publish it to the world.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <button onClick={() => navigate('/create')} className="rounded-3xl border-2 border-orange-500 bg-orange-500 px-6 py-4 font-barlow text-[12px] font-black uppercase tracking-widest text-black transition-all duration-150 hover:bg-black hover:text-orange-500 sm:px-8 sm:text-[13px]">
                            Generate Blog -
                        </button>
                        <button onClick={() => navigate('/explore')} className="rounded-3xl border-2 border-orange-500 bg-transparent px-6 py-4 font-barlow text-[12px] font-black uppercase tracking-widest text-orange-500 transition-all duration-150 hover:bg-orange-500 hover:text-black sm:px-8 sm:text-[13px]">
                            Explore
                        </button>
                    </div>
                </div>

                <div className="relative hidden xl:flex flex-1 items-center justify-end xl:ml-20">
                    <div className="relative h-[500px] w-[450px]">
                        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" style={{ strokeDasharray: "8,8" }}>
                            <path d="M 100 120 C 200 120, 225 250, 225 250" fill="none" stroke="#ea580c" strokeWidth="2" strokeOpacity="0.4" />
                            <path d="M 225 250 C 225 250, 250 380, 350 380" fill="none" stroke="#ea580c" strokeWidth="2" strokeOpacity="0.4" />
                        </svg>

                        <div className="absolute left-0 top-10 z-10 w-64 -rotate-3 rounded-3xl border-2 border-neutral-700 bg-[#0a0a0a] p-5 transition-transform duration-300 hover:rotate-0 hover:scale-105">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                                </div>
                                <div className="font-barlow font-bold tracking-wider text-white">github.com/...</div>
                            </div>
                            <div className="space-y-2 font-mono text-[11px] text-neutral-400">
                                <div className="flex gap-2"><span className="text-orange-500">commit</span><span className="text-neutral-300">8f192a0</span></div>
                                <div className="text-green-400">feat: implement AI engine module</div>
                                <div className="text-neutral-500">2 minutes ago</div>
                            </div>
                        </div>

                        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="absolute inset-0 animate-ping rounded-full bg-orange-500 opacity-30"></div>
                                <div className="relative z-10 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-4 border-[#0a0a0a] bg-orange-500 shadow-[0_0_40px_rgba(234,88,12,0.4)] transition-transform hover:scale-110">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12c-4.9-1.2-8.3-4.6-9.5-9.5C10.3 7.4 6.9 10.8 2 12c4.9 1.2 8.3 4.6 9.5 9.5C12.7 16.6 16.1 13.2 21 12z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 right-0 z-30 flex w-72 rotate-2 flex-col gap-4 rounded-3xl border-2 border-orange-500 bg-[#0a0a0a] p-5 shadow-[0_0_30px_rgba(234,88,12,0.15)] transition-transform duration-300 hover:rotate-0 hover:scale-105">
                            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                                <div className="h-10 w-10 rounded-full bg-linear-to-br from-orange-500 to-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>
                                <div className="flex flex-col gap-1">
                                    <div className="font-barlow text-sm font-black uppercase leading-none tracking-widest text-white">Adding AI Engine</div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">DevBlog Generated</div>
                                </div>
                            </div>
                            <div className="space-y-2.5">
                                <div className="h-2.5 w-full rounded-full bg-neutral-800"></div>
                                <div className="h-2.5 w-full rounded-full bg-neutral-800"></div>
                                <div className="h-2.5 w-3/4 rounded-full bg-neutral-800"></div>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="rounded border border-orange-500/20 bg-orange-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-500">Published</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-10 w-full max-w-[1400px] border-t border-neutral-900 bg-transparent px-4 py-16 sm:mt-12 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
                <div className="relative mb-12 flex items-center justify-center sm:mb-16">
                    <div className="absolute top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-neutral-900"></div>
                    <div className="bg-black px-4 sm:px-8">
                        <h2 className="text-center font-barlow text-xl font-black uppercase tracking-[0.14em] text-white sm:text-3xl sm:tracking-[0.2em]">HOW IT WORKS</h2>
                    </div>
                </div>

                <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-8 sm:mb-16">
                    <div className="group relative flex flex-col gap-5 rounded-3xl border-2 border-neutral-900 bg-black/60 p-5 shadow-lg backdrop-blur-md transition-colors hover:border-orange-500 sm:p-8">
                        <div className="absolute top-1/2 -right-6 z-10 hidden -translate-y-1/2 rounded-full border-4 border-black bg-orange-500 text-black shadow-[0_0_15px_rgba(234,88,12,0.5)] md:flex lg:-right-8">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="p-1">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 pt-0.5 text-lg font-black text-black">1</div>
                            <h3 className="m-0 font-barlow text-lg font-black uppercase tracking-widest text-white">Connect GitHub</h3>
                        </div>
                        <p className="m-0 text-sm leading-relaxed text-neutral-400">
                            Login securely with GitHub.<br />Access your repositories instantly.
                        </p>
                        <div className="group/image mt-2 overflow-hidden rounded-[1.5rem] border border-neutral-800/90 bg-linear-to-br from-neutral-950 via-black to-neutral-900/80 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all hover:border-orange-500/40 hover:shadow-[0_0_25px_rgba(234,88,12,0.12)]">
                            <div className="overflow-hidden rounded-[1.1rem] border border-neutral-800/80 bg-black/70">
                                <img src="/Github Auth.png" alt="Connect GitHub" className="h-48 w-full object-cover object-top opacity-95 transition-transform duration-500 hover:scale-[1.03] hover:opacity-100 sm:h-56" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        </div>
                    </div>

                    <div className="group relative flex flex-col gap-5 rounded-3xl border-2 border-neutral-900 bg-black/60 p-5 shadow-lg backdrop-blur-md transition-colors hover:border-orange-500 sm:p-8">
                        <div className="absolute top-1/2 -right-6 z-10 hidden -translate-y-1/2 rounded-full border-4 border-black bg-orange-500 text-black shadow-[0_0_15px_rgba(234,88,12,0.5)] md:flex lg:-right-8">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="p-1">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 pt-0.5 text-lg font-black text-black">2</div>
                            <h3 className="m-0 font-barlow text-lg font-black uppercase tracking-widest text-white">Select Repository</h3>
                        </div>
                        <p className="m-0 text-sm leading-relaxed text-neutral-400">
                            Choose a project.<br />AI reads README and metadata.
                        </p>
                        <div className="group/image mt-2 overflow-hidden rounded-[1.5rem] border border-neutral-800/90 bg-linear-to-br from-neutral-950 via-black to-neutral-900/80 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all hover:border-orange-500/40 hover:shadow-[0_0_25px_rgba(234,88,12,0.12)]">
                            <div className="overflow-hidden rounded-[1.1rem] border border-neutral-800/80 bg-black/70">
                                <img src="/Select repo modal.png" alt="Select Repository" className="h-48 w-full object-cover object-top opacity-95 transition-transform duration-500 hover:scale-[1.03] hover:opacity-100 sm:h-56" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        </div>
                    </div>

                    <div className="group flex flex-col gap-5 rounded-3xl border-2 border-neutral-900 bg-black/60 p-5 shadow-lg backdrop-blur-md transition-colors hover:border-orange-500 sm:p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 pt-0.5 text-lg font-black text-black">3</div>
                            <h3 className="m-0 font-barlow text-lg font-black uppercase tracking-widest text-white">Generate Blog</h3>
                        </div>
                        <p className="m-0 text-sm leading-relaxed text-neutral-400">
                            AI writes developer-friendly blog.<br />Customize tone and style.
                        </p>
                        <div className="group/image mt-2 overflow-hidden rounded-[1.5rem] border border-neutral-800/90 bg-linear-to-br from-neutral-950 via-black to-neutral-900/80 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all hover:border-orange-500/40 hover:shadow-[0_0_25px_rgba(234,88,12,0.12)]">
                            <div className="overflow-hidden rounded-[1.1rem] border border-neutral-800/80 bg-black/70">
                                <img src="/AI-Generated blog.png" alt="Generate Blog" className="h-48 w-full object-cover object-top opacity-95 transition-transform duration-500 hover:scale-[1.03] hover:opacity-100 sm:h-56" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button onClick={() => navigate('/explore')} className="rounded-3xl border-2 border-orange-500 bg-orange-500 px-8 py-4 font-barlow text-xs font-black uppercase tracking-widest text-black transition-all duration-150 hover:bg-black hover:text-orange-500 sm:px-10">
                        Browse More
                    </button>
                </div>
            </div>

            <div className="mx-auto w-full max-w-[1400px] border-t border-neutral-900 bg-transparent px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
                <div className="mb-12 text-center sm:mb-16">
                    <h2 className="font-barlow text-xl font-black uppercase tracking-[0.14em] text-white sm:text-3xl sm:tracking-[0.2em]">
                        WHY DEVELOPERS <span className="text-orange-500">LOVE</span> DEVBLOG.AI
                    </h2>
                    <p className="mt-5 text-sm uppercase tracking-widest text-neutral-400">
                        Turn your GitHub projects into polished developer blogs.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-4 rounded-3xl border-2 border-neutral-900 bg-black/40 p-6 backdrop-blur-md transition-colors hover:border-orange-500/50 sm:p-8">
                        <div className="text-3xl font-black text-orange-500">Fast</div>
                        <h3 className="m-0 font-barlow text-lg font-black uppercase tracking-widest text-white leading-tight">Write blogs faster</h3>
                        <p className="m-0 mt-2 text-sm leading-relaxed text-neutral-400">Transform source code into content in under 60 seconds.</p>
                    </div>

                    <div className="flex flex-col gap-4 rounded-3xl border-2 border-neutral-900 bg-black/40 p-6 backdrop-blur-md transition-colors hover:border-orange-500/50 sm:p-8">
                        <div className="text-3xl font-black text-orange-500">Show</div>
                        <h3 className="m-0 font-barlow text-lg font-black uppercase tracking-widest text-white leading-tight">Turn projects into portfolios</h3>
                        <p className="m-0 mt-2 text-sm leading-relaxed text-neutral-400">Showcase your projects with professional blog posts.</p>
                    </div>

                    <div className="flex flex-col gap-4 rounded-3xl border-2 border-neutral-900 bg-black/40 p-6 backdrop-blur-md transition-colors hover:border-orange-500/50 sm:p-8">
                        <div className="text-3xl font-black text-orange-500">Grow</div>
                        <h3 className="m-0 font-barlow text-lg font-black uppercase tracking-widest text-white leading-tight">Improve developer visibility</h3>
                        <p className="m-0 mt-2 text-sm leading-relaxed text-neutral-400">Get your work seen by the developer community.</p>
                    </div>

                    <div className="flex flex-col gap-4 rounded-3xl border-2 border-neutral-900 bg-black/40 p-6 backdrop-blur-md transition-colors hover:border-orange-500/50 sm:p-8">
                        <div className="text-3xl font-black text-orange-500">Share</div>
                        <h3 className="m-0 font-barlow text-lg font-black uppercase tracking-widest text-white leading-tight">Share knowledge effortlessly</h3>
                        <p className="m-0 mt-2 text-sm leading-relaxed text-neutral-400">Contribute tutorials and insights to help others.</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full max-w-[1400px] border-t border-neutral-900 bg-transparent px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:px-12 lg:pt-24 lg:pb-32">
                <div className="relative mb-8 flex items-center justify-center">
                    <div className="absolute top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-neutral-900"></div>
                    <div className="bg-black px-4 sm:px-8">
                        <h2 className="text-center font-barlow text-xl font-black uppercase tracking-[0.14em] text-white sm:text-3xl sm:tracking-[0.2em]">FEATURES</h2>
                    </div>
                </div>
                <p className="mb-12 text-center text-sm uppercase tracking-widest text-neutral-400 sm:mb-16">
                    AI-powered features built for developers sharing.
                </p>

                <div className="group relative">
                    <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-orange-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 sm:rounded-[40px]"></div>

                    <div className="group/image relative flex h-[220px] w-full items-center justify-center overflow-hidden rounded-[28px] border-2 border-neutral-800 bg-neutral-950/80 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:border-orange-500/60 sm:h-[400px] sm:rounded-[40px] sm:border-4 lg:h-[600px]">
                        <img
                            src="/Feature image.png"
                            alt="DevBlog Feature Showcase"
                            className="h-full w-full object-contain opacity-90 transition-transform duration-500 hover:scale-105 hover:opacity-100"
                            onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.style.backgroundColor = '#1a1a1a'
                            }}
                        />
                        <div className="pointer-events-none absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
                    </div>

                    <div className="absolute -bottom-1 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0 blur-md"></div>
                </div>

                <div className="mx-auto mt-12 max-w-2xl text-center">
                    <h3 className="mb-3 font-barlow text-lg font-black uppercase tracking-widest text-white sm:text-xl">Transform Your Code Into Beautiful Blogs</h3>
                    <p className="text-sm leading-relaxed text-neutral-400">
                        Create professional, AI-powered blog posts directly from your GitHub repositories. Edit and customize with our intuitive editor, then publish instantly to reach the developer community.
                    </p>
                </div>

                <div className="mt-12 flex justify-center sm:mt-16">
                    <button onClick={() => navigate('/create')} className="rounded-3xl border-2 border-orange-500 bg-orange-500 px-8 py-4 font-barlow text-[13px] font-black uppercase tracking-[0.12em] text-black shadow-xl shadow-orange-500/10 transition-all duration-150 hover:bg-black hover:text-orange-500 hover:shadow-orange-500/20 sm:px-14 sm:py-5 sm:text-[15px] sm:tracking-[0.15em]">
                        Get Started Now -
                    </button>
                </div>
            </div>

            <footer className="w-full border-t border-neutral-900 bg-[#050505]">
                <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-10 px-4 py-12 text-center sm:px-6 md:flex-row md:items-start md:text-left lg:px-12 lg:py-16">
                    <div className="flex max-w-sm flex-col gap-3">
                        <span className="flex items-center justify-center font-barlow text-2xl font-black uppercase tracking-widest text-white md:justify-start">
                            DEV<span className="text-orange-500">BLOG.AI</span>
                        </span>
                        <p className="text-sm leading-relaxed text-neutral-500">
                            The intelligent platform for transforming your GitHub repositories into beautiful, professional portfolios and technical blogs.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-barlow text-xs font-bold uppercase tracking-widest text-white">Platform</h4>
                            <div className="flex flex-col gap-3 text-sm text-neutral-500">
                                <span className="block cursor-pointer transition-colors hover:text-orange-500">Create Blog</span>
                                <span className="block cursor-pointer transition-colors hover:text-orange-500">Explore Feed</span>
                                <span className="block cursor-pointer transition-colors hover:text-orange-500">Dashboard</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-barlow text-xs font-bold uppercase tracking-widest text-white">Connect</h4>
                            <div className="flex flex-col gap-3 text-sm text-neutral-500">
                                <span className="block cursor-pointer transition-colors hover:text-orange-500">Twitter / X</span>
                                <span className="block cursor-pointer transition-colors hover:text-orange-500">GitHub Repository</span>
                                <span className="block cursor-pointer transition-colors hover:text-orange-500">Support</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-900">
                    <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-12">
                        <span className="text-center font-mono text-xs tracking-wider text-neutral-600 sm:text-left">
                            © {new Date().getFullYear()} DevBlog AI. All rights reserved.
                        </span>
                        <span className="flex items-center gap-1.5 text-center font-barlow text-xs uppercase tracking-widest text-neutral-500 sm:text-right">
                            Built by <a href="https://github.com" target="_blank" rel="noreferrer" className="font-black text-orange-500 transition-colors hover:text-white">ANIRBAN BANERJEE</a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
