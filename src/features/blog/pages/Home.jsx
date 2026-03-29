import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full bg-transparent">
            {/* Main Hero Section */}
            <div className='relative min-h-[85vh] bg-transparent text-white flex items-center justify-start overflow-hidden pt-10 lg:pt-16'>

                {/* Watermark Background with Border Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 lg:opacity-100">
                    <h2 className="text-[20vw] lg:text-[12vw] font-black text-transparent leading-none whitespace-nowrap [webkit-text-stroke:2px_rgba(107,114,128,0.2)]">
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
                        <button onClick={() => navigate('/create')} className="font-barlow font-black text-[13px] tracking-widest uppercase border-2 border-orange-500 bg-orange-500 text-black px-8 py-4 cursor-pointer transition-all duration-150 hover:bg-black hover:text-orange-500">
                            GENERATE BLOG →
                        </button>
                        <button onClick={() => navigate('/explore')} className="font-barlow font-black text-[13px] tracking-widest uppercase border-2 border-orange-500 text-orange-500 bg-transparent px-8 py-4 cursor-pointer transition-all duration-150 hover:bg-orange-500 hover:text-black">
                            EXPLORE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home