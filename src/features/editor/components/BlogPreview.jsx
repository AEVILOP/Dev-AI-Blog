import ReactMarkdown from "react-markdown";

export default function BlogPreview({ blog }) {

    return (

        <article className="prose prose-invert max-w-none">

            <h1>{blog.title}</h1>

            <ReactMarkdown>
                {blog.intro}
            </ReactMarkdown>

            <h2>What It Does</h2>
            <ReactMarkdown>{blog.whatItDoes}</ReactMarkdown>

            <h2>Tech Stack</h2>
            <ReactMarkdown>{blog.techStack}</ReactMarkdown>

            <h2>Challenges</h2>
            <ReactMarkdown>{blog.challenges}</ReactMarkdown>

            <h2>Getting Started</h2>
            <ReactMarkdown>{blog.gettingStarted}</ReactMarkdown>

            <h2>Conclusion</h2>
            <ReactMarkdown>{blog.conclusion}</ReactMarkdown>

        </article>

    );
}