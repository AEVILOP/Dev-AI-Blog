import React from 'react'

const Navbar = () => {


    return (
        <>
            {/* Main Navbar */}
            <nav className="sticky top-0 z-50 bg-black text-white flex items-center justify-between px-8 py-4 shadow-lg border-b border-gray-800">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <span className="text-2xl font-black">
                        DEV<span className="text-orange-400">BLOG</span>
                        .AI
                    </span>
                </div>

                {/* Center Navigation */}
                <div className="flex items-center space-x-8">
                    <a href="#" className="text-gray-700 hover:text-white transition-colors uppercase text-xs font-semibold tracking-wider">EXPLORE</a>
                    <a href="#" className="text-gray-700 hover:text-white transition-colors uppercase text-xs font-semibold tracking-wider">TAGS</a>
                    <button className="text-black bg-linear-to-br from-orange-500 to-orange-900 rounded-lg hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-700 font-extrabold px-6 py-2 text-sm uppercase tracking-wider transition-all hover:text-white">
                        + CREATE
                    </button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                    <button className="text-black bg-linear-to-br from-orange-500 to-orange-900 rounded-lg hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-700 font-bold px-4 py-2 text-xs uppercase tracking-wider transition-all hover:text-white">
                        SIGN UP
                    </button>
                    <button className="text-orange-400 bg-linear-to-br from-gray-800 to-black rounded-lg hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-700 font-semibold px-4 py-2 text-xs uppercase tracking-wider transition-all hover:text-orange-300 border-2 border-orange-500">
                        SIGN IN
                    </button>
                </div>
            </nav>


        </>
    )
}

export default Navbar