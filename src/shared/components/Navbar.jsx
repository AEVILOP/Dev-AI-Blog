import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext'

const Navbar = () => {
    const { user, login } = useAuth()

    return (
        <nav className="sticky top-0 z-50 border-b border-neutral-900 bg-black/60 text-white shadow-lg backdrop-blur-md">
            <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2">
                    <Link to="/" className="text-lg font-black no-underline text-white sm:text-2xl">
                        DEV<span className="text-orange-500">BLOG.AI</span>
                    </Link>
                </div>

                <div className="order-3 flex w-full items-center gap-5 border-t border-neutral-900/80 pt-3 sm:order-2 sm:w-auto sm:border-t-0 sm:pt-0 lg:gap-8">
                    <Link to="/explore" className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 no-underline transition-colors hover:text-white sm:text-xs">
                        Explore
                    </Link>
                    <a href="#" className="hidden text-xs font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:text-white sm:inline">
                        Tags
                    </a>
                </div>

                <div className="order-2 flex items-center gap-2 sm:gap-4">
                    {user ? (
                        <>
                            <Link to="/create" className="inline-block rounded-3xl bg-orange-500 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black no-underline transition-all hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-orange-300 sm:px-4 sm:text-xs">
                                <span className="sm:hidden">Create</span>
                                <span className="hidden sm:inline">+ Create Blog</span>
                            </Link>
                            <Link to="/account" className="flex items-center pl-1 sm:pl-2">
                                <img
                                    src={user.avatarUrl || "https://github.com/identicons/default.png"}
                                    alt="Account"
                                    className="h-8 w-8 rounded-full border border-orange-500 transition-transform hover:scale-105"
                                />
                            </Link>
                        </>
                    ) : (
                        <button onClick={login} className="inline-block cursor-pointer rounded-3xl bg-orange-500 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition-all hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-orange-300 sm:px-4 sm:text-xs">
                            <span className="sm:hidden">Sign In</span>
                            <span className="hidden sm:inline">Sign In With GitHub</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
