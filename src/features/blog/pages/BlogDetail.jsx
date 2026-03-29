import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { getReadingTime } from "../../../shared/utils/readingTime";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchBlogById } = useBlogs();
  const [blog,    setBlog]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogById(id).then(data => {
      if (!data) navigate("/", { replace: true });
      else setBlog(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-neutral-800 border-t-orange-500 rounded-full animate-spin-orange" />
    </div>
  );
  if (!blog) return null;

  let content = null;
  try { content = JSON.parse(blog.content); } catch { content = null; }

  const date     = new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const readTime = getReadingTime(blog.content);

  const share = () => {
    const url  = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`"${blog.title}" — ${blog.excerpt?.slice(0,80)}...`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-transparent text-white">

      {/* Nav */}
      <nav className="sticky top-0 z-10 bg-black/60 backdrop-blur-md border-b-2 border-neutral-900 px-10 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)}
          className="font-barlow font-black text-[11px] tracking-[0.14em] uppercase text-neutral-700 hover:text-white transition-colors duration-150 bg-transparent border-none cursor-pointer">
          ← BACK
        </button>
        <a href="/" className="font-barlow font-black text-lg text-white uppercase no-underline">
          DEV<span className="text-orange-500">BLOG.AI</span>
        </a>
        <button onClick={share}
          className="font-barlow font-black text-[11px] tracking-[0.14em] uppercase border-2 border-neutral-900 text-neutral-700 px-3.5 py-2 cursor-pointer transition-all duration-150 hover:border-white hover:text-white">
          SHARE ↗
        </button>
      </nav>

      {/* Hero */}
      <div className="border-b-2 border-neutral-900 px-10 pt-16 pb-12 max-w-4xl mx-auto animate-fade-up">
        <div className="flex items-center gap-5 mb-8 flex-wrap">
          {blog.repoLanguage && <span className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.18em] uppercase">{blog.repoLanguage}</span>}
          <span className="font-barlow font-bold text-[10px] text-neutral-800 tracking-[0.14em]">{readTime}</span>
          <span className="font-barlow font-bold text-[10px] text-neutral-800 tracking-[0.14em]">{date}</span>
        </div>

        <h1 className="font-barlow font-black text-white uppercase leading-[0.93] tracking-tight mb-7" style={{ fontSize: "clamp(32px,5vw,64px)" }}>
          {blog.title}
        </h1>

        {blog.excerpt && <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mb-9">{blog.excerpt}</p>}

        <div className="flex items-center gap-3 pt-7 border-t border-neutral-900">
          {blog.author?.avatarUrl && <img src={blog.author.avatarUrl} alt={blog.author.username} className="w-9 h-9 rounded-full border-2 border-neutral-900" />}
          <div>
            <div className="font-barlow font-black text-sm text-white tracking-wide">{blog.author?.username}</div>
            {blog.repoUrl && (
              <a href={blog.repoUrl} target="_blank" rel="noreferrer"
                className="font-barlow font-bold text-[10px] text-neutral-700 tracking-[0.12em] uppercase no-underline hover:text-orange-500 transition-colors duration-150">
                VIEW REPO ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-10 py-16">
        {content ? (
          <>
            {content.intro && <p className="text-lg text-neutral-500 leading-relaxed italic mb-12">{content.intro}</p>}
            <div className="w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent mb-12" />
            {content.whatItDoes && (
              <section className="mb-12">
                <h2 className="font-barlow font-black text-2xl md:text-3xl text-white uppercase tracking-tight mb-4">WHAT IT DOES</h2>
                <p className="text-neutral-600 text-[15px] leading-relaxed">{content.whatItDoes}</p>
              </section>
            )}
            {content.techStack && (
              <div className="bg-neutral-950 border border-neutral-900 p-8 mb-12">
                <h2 className="font-barlow font-black text-2xl text-orange-500 uppercase tracking-tight mb-4">TECH STACK</h2>
                <p className="text-neutral-600 text-[15px] leading-relaxed">{content.techStack}</p>
              </div>
            )}
            {content.challenges && (
              <section className="mb-12">
                <h2 className="font-barlow font-black text-2xl md:text-3xl text-white uppercase tracking-tight mb-4">CHALLENGES</h2>
                <p className="text-neutral-600 text-[15px] leading-relaxed">{content.challenges}</p>
              </section>
            )}
            {content.gettingStarted && (
              <div className="border-l-4 border-orange-500 pl-6 mb-12">
                <h2 className="font-barlow font-black text-2xl text-white uppercase tracking-tight mb-4">GETTING STARTED</h2>
                <p className="text-neutral-600 text-[15px] leading-relaxed">{content.gettingStarted}</p>
              </div>
            )}
            {content.conclusion && (
              <section className="mb-0">
                <h2 className="font-barlow font-black text-2xl md:text-3xl text-white uppercase tracking-tight mb-4">FINAL THOUGHTS</h2>
                <p className="text-neutral-600 text-[15px] leading-relaxed">{content.conclusion}</p>
              </section>
            )}
          </>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-neutral-600 text-[15px] leading-relaxed" />
        )}

        {/* Share strip */}
        <div className="mt-16 pt-8 border-t-2 border-neutral-900 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="font-barlow font-black text-lg text-white uppercase tracking-tight">ENJOYED THIS?</div>
            <div className="font-barlow font-bold text-[10px] text-neutral-700 tracking-[0.14em] mt-1">SHARE IT WITH YOUR NETWORK</div>
          </div>
          <button onClick={share}
            className="font-barlow font-black text-[13px] tracking-[0.1em] uppercase bg-white border-2 border-white text-black px-6 py-3 cursor-pointer transition-all duration-150 hover:bg-black hover:text-white">
            SHARE ON X ↗
          </button>
        </div>
      </div>
    </div>
  );
}