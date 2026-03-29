import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'

const Explore = () => {
    const navigate = useNavigate()
    const { fetchBlogs, loading } = useBlogs()

    const [blogs, setBlogs] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm)
            setPage(1)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchTerm])

    useEffect(() => {
        let isMounted = true;
        fetchBlogs({ search: debouncedSearch, page }).then(data => {
            if (isMounted && data) {
                setBlogs(data.blogs || [])
                setTotalPages(data.pages || 1)
            }
        })
        return () => { isMounted = false }
    }, [debouncedSearch, page]) // eslint-disable-line

    return (
        <div className="min-h-screen bg-transparent">
            {/* Search Bar */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b-2 border-neutral-900 py-4 px-8 transition-colors">
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl relative group">
                        <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-orange-400 rounded-lg blur-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-orange-400 text-lg">🔍</span>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="⌘ SEARCH BLOGS, REPOS, DEVELOPERS..."
                                className="w-full pl-12 pr-4 py-3 bg-black/60 text-white font-barlow font-bold uppercase tracking-widest border border-neutral-800 hover:border-orange-500/50 focus:border-orange-500 transition-all focus:outline-none placeholder:text-neutral-600 focus:bg-black"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* BROWSE FEED SECTION */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
                <div className="flex items-center justify-between mb-12 border-b-2 border-neutral-900 pb-6">
                    <h2 className="font-barlow font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                        EXPLORE <span className="text-orange-500">FEED.</span>
                    </h2>
                    {loading && <div className="w-6 h-6 border-2 border-neutral-800 border-t-orange-500 rounded-full animate-spin"></div>}
                </div>

                {!loading && blogs.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-neutral-900">
                        <p className="font-barlow font-bold text-neutral-600 uppercase tracking-widest text-sm">NO BLOGS FOUND FOR THIS QUERY</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map(blog => (
                            <div key={blog._id} className="group relative bg-black/40 backdrop-blur-md border-2 border-neutral-900 p-6 flex flex-col transition-all duration-300 hover:border-orange-500/50">
                                <div className="absolute inset-0 bg-linear-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                
                                <div className="flex justify-between items-start mb-4">
                                    <span className="font-barlow font-bold text-[10px] text-orange-500 tracking-widest uppercase border border-orange-500/30 px-2 py-1 bg-orange-500/10">
                                        {blog.repoName || "GITHUB REPO"}
                                    </span>
                                    <span className="font-barlow font-bold text-[10px] text-neutral-600 tracking-widest uppercase">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="font-barlow font-black text-xl text-white uppercase tracking-tight leading-tight mb-3 line-clamp-2">
                                    {blog.title}
                                </h3>
                                
                                <p className="font-inter text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-3 text-ellipsis grow">
                                    {blog.excerpt || "A developer blog exploring the codebase architecture, implementation challenges, and the developer's journey building this repository."}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-900">
                                    <div className="flex items-center gap-3">
                                        {blog.author?.avatarUrl ? (
                                            <img src={blog.author.avatarUrl} alt="author" className="w-8 h-8 rounded-full grayscale group-hover:grayscale-0 transition-all border border-neutral-800" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-500">
                                                {blog.author?.username?.[0]?.toUpperCase() || "!"}
                                            </div>
                                        )}
                                        <span className="font-barlow font-bold text-[11px] text-neutral-300 tracking-widest uppercase">
                                            {blog.author?.username || "UNKNOWN"}
                                        </span>
                                    </div>

                                    <button onClick={() => navigate(`/blog/${blog._id}`)} className="font-barlow font-bold text-[10px] tracking-widest uppercase text-orange-500 hover:text-white transition-colors">
                                        READ →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-16 pt-8 border-t-2 border-neutral-900">
                        <button 
                            disabled={page === 1} 
                            onClick={() => setPage(p => p - 1)}
                            className="font-barlow font-bold text-xs tracking-widest uppercase border border-neutral-800 px-4 py-2 text-neutral-400 disabled:opacity-30 hover:border-white hover:text-white transition-all disabled:hover:border-neutral-800 disabled:hover:text-neutral-400"
                        >
                            ← PREV
                        </button>
                        <span className="font-barlow font-bold text-[10px] text-neutral-600 tracking-widest uppercase">
                            PAGE {page} OF {totalPages}
                        </span>
                        <button 
                            disabled={page === totalPages} 
                            onClick={() => setPage(p => p + 1)}
                            className="font-barlow font-bold text-xs tracking-widest uppercase border border-neutral-800 px-4 py-2 text-neutral-400 disabled:opacity-30 hover:border-white hover:text-white transition-all disabled:hover:border-neutral-800 disabled:hover:text-neutral-400"
                        >
                            NEXT →
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Explore
