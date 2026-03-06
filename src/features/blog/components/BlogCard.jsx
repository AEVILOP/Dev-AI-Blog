import { useNavigate } from "react-router-dom";

const LANG_COLORS = {
    JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572a5",
    Go: "#00add8", Rust: "#dea584", Java: "#b07219", Ruby: "#701516",
};

export default function BlogCard({ blog }) {
    const navigate = useNavigate();
    const langColor = LANG_COLORS[blog.repoLanguage] || "#f97316";
    const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });

    return (
        <div
            onClick={() => navigate(`/blog/${blog._id}`)}
            className="relative bg-black border-2 border-neutral-900 p-7 cursor-pointer transition-colors duration-150 hover:border-orange-500 flex flex-col gap-4 overflow-hidden group"
        >
            {/* Top orange accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

            {/* Language + date */}
            <div className="flex items-center justify-between">
                {blog.repoLanguage && (
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: langColor }} />
                        <span className="font-barlow font-bold text-[10px] text-neutral-700 tracking-[0.14em] uppercase">
                            {blog.repoLanguage}
                        </span>
                    </div>
                )}
                <span className="font-barlow font-semibold text-[10px] text-neutral-800 tracking-[0.1em]">{date}</span>
            </div>

            {/* Title */}
            <h3 className="font-barlow font-black text-xl text-white uppercase leading-tight tracking-tight">
                {blog.title}
            </h3>

            {/* Excerpt */}
            {blog.excerpt && (
                <p className="text-neutral-700 text-sm leading-relaxed line-clamp-3">{blog.excerpt}</p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-neutral-900 pt-4 mt-auto">
                <div className="flex items-center gap-2.5">
                    {blog.author?.avatarUrl && (
                        <img src={blog.author.avatarUrl} alt={blog.author.username}
                            className="w-6 h-6 rounded-full border border-neutral-800" />
                    )}
                    <span className="font-barlow font-bold text-[11px] text-neutral-700 tracking-[0.1em]">
                        {blog.author?.username || "Anonymous"}
                    </span>
                </div>
                {blog.repoName && (
                    <span className="font-barlow font-bold text-[10px] text-neutral-800 tracking-[0.1em] uppercase">
                        {blog.repoName}
                    </span>
                )}
            </div>
        </div>
    );
}