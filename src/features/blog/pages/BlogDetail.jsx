import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { getReadingTime } from "../../../shared/utils/readingTime";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchBlogById } = useBlogs();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogById(id).then((data) => {
      if (!data) navigate("/", { replace: true });
      else setBlog(data);
      setLoading(false);
    });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-neutral-800 border-t-orange-500 rounded-full animate-spin-orange" />
      </div>
    );
  }

  if (!blog) return null;

  let content = null;
  try {
    content = JSON.parse(blog.content);
  } catch {
    content = null;
  }

  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const readTime = getReadingTime(blog.content);

  const share = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`"${blog.title}" - ${blog.excerpt?.slice(0, 80)}...`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <nav className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b-2 border-neutral-900 bg-black/60 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-10 lg:py-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent border-none cursor-pointer font-barlow text-[10px] font-black uppercase tracking-[0.12em] text-neutral-500 transition-colors duration-150 hover:text-white sm:text-[11px] sm:tracking-[0.14em]"
        >
          {"<- Back"}
        </button>
        <a href="/" className="text-center font-barlow text-sm font-black uppercase text-white no-underline sm:text-lg">
          DEV<span className="text-orange-500">BLOG.AI</span>
        </a>
        <button
          onClick={share}
          className="rounded-3xl border-2 border-neutral-900 bg-transparent px-3 py-2 font-barlow text-[10px] font-black uppercase tracking-[0.12em] text-neutral-500 transition-all duration-150 hover:border-white hover:text-white sm:text-[11px] sm:tracking-[0.14em]"
        >
          Share
        </button>
      </nav>

      <div className="mx-auto max-w-4xl animate-fade-up border-b-2 border-neutral-900 px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-16 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8 sm:gap-5">
          {blog.repoLanguage && (
            <span className="font-barlow text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
              {blog.repoLanguage}
            </span>
          )}
          <span className="font-barlow text-[10px] font-bold tracking-[0.14em] text-neutral-700">{readTime}</span>
          <span className="font-barlow text-[10px] font-bold tracking-[0.14em] text-neutral-700">{date}</span>
        </div>

        <h1 className="mb-7 font-barlow font-black uppercase leading-[0.93] tracking-tight text-white" style={{ fontSize: "clamp(32px, 9vw, 64px)" }}>
          {blog.title}
        </h1>

        {blog.excerpt && (
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-neutral-500 sm:mb-9 sm:text-lg">
            {blog.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 border-t border-neutral-900 pt-6 sm:pt-7">
          {blog.author?.avatarUrl && (
            <img src={blog.author.avatarUrl} alt={blog.author.username} className="h-9 w-9 rounded-full border-2 border-neutral-900" />
          )}
          <div>
            <div className="font-barlow text-sm font-black tracking-wide text-white">{blog.author?.username}</div>
            {blog.repoUrl && (
              <a
                href={blog.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-barlow text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-600 no-underline transition-colors duration-150 hover:text-orange-500"
              >
                View Repo {"->"}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
        {content ? (
          <>
            {content.intro && (
              <p className="mb-10 text-base italic leading-relaxed text-neutral-500 sm:mb-12 sm:text-lg">
                {content.intro}
              </p>
            )}
            <div className="mb-12 h-0.5 w-full bg-gradient-to-r from-orange-500 to-transparent" />

            {content.whatItDoes && (
              <section className="mb-12">
                <h2 className="mb-4 font-barlow text-2xl font-black uppercase tracking-tight text-white md:text-3xl">WHAT IT DOES</h2>
                <p className="text-[15px] leading-relaxed text-neutral-600">{content.whatItDoes}</p>
              </section>
            )}

            {content.techStack && (
              <div className="mb-12 border border-neutral-900 bg-neutral-950 p-5 sm:p-8">
                <h2 className="mb-4 font-barlow text-2xl font-black uppercase tracking-tight text-orange-500">TECH STACK</h2>
                <p className="text-[15px] leading-relaxed text-neutral-600">{content.techStack}</p>
              </div>
            )}

            {content.challenges && (
              <section className="mb-12">
                <h2 className="mb-4 font-barlow text-2xl font-black uppercase tracking-tight text-white md:text-3xl">CHALLENGES</h2>
                <p className="text-[15px] leading-relaxed text-neutral-600">{content.challenges}</p>
              </section>
            )}

            {content.gettingStarted && (
              <div className="mb-12 border-l-4 border-orange-500 pl-4 sm:pl-6">
                <h2 className="mb-4 font-barlow text-2xl font-black uppercase tracking-tight text-white">GETTING STARTED</h2>
                <p className="text-[15px] leading-relaxed text-neutral-600">{content.gettingStarted}</p>
              </div>
            )}

            {content.conclusion && (
              <section>
                <h2 className="mb-4 font-barlow text-2xl font-black uppercase tracking-tight text-white md:text-3xl">FINAL THOUGHTS</h2>
                <p className="text-[15px] leading-relaxed text-neutral-600">{content.conclusion}</p>
              </section>
            )}
          </>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-[15px] leading-relaxed text-neutral-600" />
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-neutral-900 pt-8 sm:mt-16">
          <div>
            <div className="font-barlow text-lg font-black uppercase tracking-tight text-white">ENJOYED THIS?</div>
            <div className="mt-1 font-barlow text-[10px] font-bold tracking-[0.14em] text-neutral-600">SHARE IT WITH YOUR NETWORK</div>
          </div>
          <button
            onClick={share}
            className="w-full border-2 border-white bg-white px-5 py-3 font-barlow text-[12px] font-black uppercase tracking-[0.1em] text-black transition-all duration-150 hover:bg-black hover:text-white sm:w-auto sm:px-6 sm:text-[13px]"
          >
            Share On X {"->"}
          </button>
        </div>
      </div>
    </div>
  );
}
