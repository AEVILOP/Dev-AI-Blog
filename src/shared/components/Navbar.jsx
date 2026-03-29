import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext'

const Navbar = () => {
    const { user, login } = useAuth()

    return (
        <>
            {/* Main Navbar */}
            <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-md text-white flex items-center justify-between px-8 py-4 shadow-lg border-b border-neutral-900">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="text-2xl font-black no-underline text-white">
                        DEV<span className="text-orange-400">BLOG.AI</span>
                    </Link>
                </div>

                {/* Center Navigation */}
                <div className="flex items-center space-x-8">
                    <Link to="/explore" className="text-gray-700 hover:text-white transition-colors uppercase text-xs font-semibold tracking-wider no-underline">EXPLORE</Link>
                    <a href="#" className="text-gray-700 hover:text-white transition-colors uppercase text-xs font-semibold tracking-wider">TAGS</a>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/create" className="text-black bg-linear-to-br from-orange-400 to-orange-400 rounded-lg hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-700 font-bold px-4 py-2 text-xs uppercase tracking-wider transition-all hover:text-white no-underline inline-block">
                                + CREATE BLOG
                            </Link>
                            <Link to="/account" className="flex items-center pl-2">
                                <img 
                                    src={user.avatarUrl || "https://github.com/identicons/default.png"} 
                                    alt="Account" 
                                    className="w-8 h-8 rounded-full border border-orange-500 hover:scale-105 transition-transform"
                                />
                            </Link>
                        </>
                    ) : (
                        <>
                            <button onClick={login} className="text-black bg-linear-to-br from-orange-400 to-orange-400 rounded-lg hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-700 font-bold px-4 py-2 text-xs uppercase tracking-wider transition-all hover:text-white no-underline inline-block cursor-pointer">
                                SIGN IN WITH GITHUB
                            </button>
                        </>
                    )}
                </div>
            </nav>


        </>
    )
}

export default Navbar