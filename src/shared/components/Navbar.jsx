import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext'

const Navbar = () => {
    const { user, login } = useAuth()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const closeMenu = () => setMobileMenuOpen(false)

    return (
        <nav className="sticky top-0 z-50 border-b border-neutral-900 bg-black/60 text-white shadow-lg backdrop-blur-md">
            <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <div className="min-w-0 flex-1">
                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="inline-block min-w-0 text-[15px] font-black leading-none text-white no-underline max-[360px]:text-[13px] sm:text-2xl"
                        >
                            DEV<span className="text-orange-500">BLOG.AI</span>
                        </Link>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
                        {user ? (
                            <>
                                <Link
                                    to="/create"
                                    onClick={closeMenu}
                                    className="inline-block rounded-3xl bg-orange-500 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black no-underline transition-all hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-orange-300 max-[360px]:px-2.5 max-[360px]:text-[9px] sm:px-4 sm:text-xs"
                                >
                                    <span className="sm:hidden">Create</span>
                                    <span className="hidden sm:inline">+ Create Blog</span>
                                </Link>
                                <Link to="/account" onClick={closeMenu} className="flex items-center">
                                    <img
                                        src={user.avatarUrl || "https://github.com/identicons/default.png"}
                                        alt="Account"
                                        className="h-8 w-8 rounded-full border border-orange-500 transition-transform hover:scale-105 max-[360px]:h-7 max-[360px]:w-7"
                                    />
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={login}
                                className="inline-block cursor-pointer rounded-3xl bg-orange-500 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition-all hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-orange-300 max-[360px]:px-2.5 max-[360px]:text-[9px] sm:px-4 sm:text-xs"
                            >
                                <span className="sm:hidden">Sign In</span>
                                <span className="hidden sm:inline">Sign In With GitHub</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={mobileMenuOpen}
                            className="flex h-10 w-10 items-center justify-center rounded-3xl border border-neutral-800 bg-neutral-950 text-white transition-colors hover:border-orange-500 hover:text-orange-500 sm:hidden"
                        >
                            <span className="flex flex-col gap-1">
                                <span className={`block h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
                                <span className={`block h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`} />
                                <span className={`block h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="mt-3 hidden items-center gap-5 border-t border-neutral-900/80 pt-3 sm:flex lg:gap-8">
                    <Link to="/explore" className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 no-underline transition-colors hover:text-white sm:text-xs">
                        Explore
                    </Link>
                    <a href="#" className="text-xs font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:text-white">
                        Tags
                    </a>
                </div>

                {mobileMenuOpen && (
                    <div className="mt-3 space-y-2 border-t border-neutral-900/80 pt-3 sm:hidden">
                        <Link
                            to="/explore"
                            onClick={closeMenu}
                            className="block rounded-3xl border border-neutral-900 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-300 no-underline transition-colors hover:border-orange-500 hover:text-white"
                        >
                            Explore
                        </Link>
                        <a
                            href="#"
                            onClick={closeMenu}
                            className="block rounded-3xl border border-neutral-900 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-300 no-underline transition-colors hover:border-orange-500 hover:text-white"
                        >
                            Tags
                        </a>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
