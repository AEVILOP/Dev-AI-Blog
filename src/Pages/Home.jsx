import React from 'react'

const Home = () => {
    return (
        <div className="w-full bg-black">
            {/* Search Bar */}
            <div className="sticky top-0 z-50 bg-black text-white py-4 px-8">
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl relative group">
                        <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-orange-400 rounded-lg blur-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-orange-400 text-lg">🔍</span>
                            <input
                                type="text"
                                placeholder="⌘ SEARCH BLOGS, REPOS, DEVELOPERS..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-950 text-white border border-gray-700 hover:border-orange-400 focus:border-orange-400 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-20"
                            />
                            <span className="absolute right-4 text-gray-600 text-xs">ESC</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Hero Section */}
            <div className='relative h-screen bg-black text-white flex items-start justify-start overflow-hidden pt-10 lg:pt-16'>

                {/* Watermark Background with Border Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h2 className="text-[15vw] sm:text-[10vw] font-black text-black leading-none whitespace-nowrap [text-stroke:2px_rgba(107,114,128,0.3)] sm:[text-stroke:1.5px_rgba(107,114,128,0.2)] [-webkit-text-stroke:2px_rgba(107,114,128,0.3)] sm:[-webkit-text-stroke:1.5px_rgba(107,114,128,0.2)] tracking-widest">
                        DEVBLOG.AI
                    </h2>
                </div>

                {/* Content Container - Left Aligned */}
                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 max-w-2xl">

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
                        <button className="text-black bg-linear-to-br from-orange-500 to-orange-900 rounded-2xl hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-700 font-bold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base uppercase tracking-wider transition-all hover:text-white w-full sm:w-auto">
                            GENERATE BLOG →
                        </button>
                        <button className="text-orange-400 bg-linear-to-br from-gray-800 to-black rounded-2xl hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-700 font-bold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base uppercase tracking-wider transition-all hover:text-orange-300 w-full sm:w-auto border-2 border-orange-500">
                            BROWSE
                        </button>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Home