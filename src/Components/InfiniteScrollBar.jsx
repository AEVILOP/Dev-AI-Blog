import React from 'react'

const InfiniteScrollBar = () => {

    const technologies = ['AI', 'PRISMA', 'TYPESCRIPT', 'GO', 'RUST', 'PYTHON', 'REACT', 'NODE', 'NEXT.JS', 'SQL', 'DOCKER', 'KUBERNETES', 'AWS', 'GCP', 'AZURE', 'MONGODB', 'POSTGRESQL', 'REDIS', 'GRAPHQL', 'APOLLO', 'VUE.JS', 'ANGULAR', 'SVELTE']
    const repeatedTechnologies = [...technologies, ...technologies, ...technologies]

    return (
        <div className="w-full overflow-hidden py-2 sm:py-3 lg:py-4 bg-black border-gray-600 border-t border-b">


            <div className="scroll-container inline-flex whitespace-nowrap gap-4 sm:gap-6 lg:gap-8">
                {repeatedTechnologies.map((tech, index) => (
                    <React.Fragment key={index}>
                        <span className={`text-xs sm:text-sm lg:text-base ${index % 2 === 0 ? 'text-orange-400' : 'text-gray-600'} font-bold tracking-wider shrink-0`}>
                            {tech}
                        </span>
                        {index !== repeatedTechnologies.length - 1 && (
                            <span className='text-orange-600 opacity-80 shrink-0'>•</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default InfiniteScrollBar