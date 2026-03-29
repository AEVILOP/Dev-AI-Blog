import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useBlogs } from "../blog/hooks/useBlogs";

export default function AccountSettings() {
  const { user, logout }                                      = useAuth();
  const { fetchMyBlogs, deleteBlog, togglePublish, loading }  = useBlogs();
  const navigate                                              = useNavigate();

  const [blogs,      setBlogs]      = useState([]);
  const [activeTab,  setActiveTab]  = useState("published");
  const [fetching,   setFetching]   = useState(true);
  const [confirmDel, setConfirmDel] = useState(null);

  useEffect(() => {
    fetchMyBlogs()
      .then(data => { if (data) setBlogs(data); })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const published = blogs.filter(b => b.isPublished);
  const drafts    = blogs.filter(b => !b.isPublished);
  const displayed = activeTab === "published" ? published : drafts;

  const handleDelete = async (id) => {
    const ok = await deleteBlog(id);
    if (ok) setBlogs(prev => prev.filter(b => b._id !== id));
    setConfirmDel(null);
  };

  const handleTogglePublish = async (id) => {
    const result = await togglePublish(id);
    if (result) setBlogs(prev => prev.map(b => b._id === id ? { ...b, isPublished: result.isPublished } : b));
  };

  const handleLogout = async () => { await logout(); navigate("/"); };

  return (
    <div className="min-h-screen bg-transparent text-white">

      {/* Nav */}
      <nav className="sticky top-0 z-10 bg-black/60 backdrop-blur-md border-b-2 border-neutral-900 px-10 py-4 flex items-center justify-between">
        <a href="/" className="font-barlow font-black text-lg text-white uppercase no-underline">
          DEV<span className="text-orange-500">BLOG.AI</span>
        </a>
        <span className="font-barlow font-black text-[10px] text-orange-500 tracking-[0.2em] uppercase">ACCOUNT</span>
        <button
          onClick={handleLogout}
          className="font-barlow font-black text-[11px] tracking-[0.14em] uppercase border-2 border-neutral-900 text-neutral-700 px-3.5 py-2 cursor-pointer transition-all duration-150 hover:border-red-500 hover:text-red-500"
        >
          LOGOUT
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-10 py-12">

        {/* Profile header */}
        <div className="flex items-center gap-6 mb-12 pb-12 border-b-2 border-neutral-900 animate-fade-up flex-wrap">
          {user?.avatarUrl && (
            <img src={user.avatarUrl} alt={user.username} className="w-[72px] h-[72px] rounded-full border-2 border-neutral-900" />
          )}
          <div className="flex-1 min-w-0">
            <div className="font-barlow font-black text-4xl md:text-5xl text-white uppercase tracking-tight leading-none">
              {user?.username}
            </div>
            <div className="font-barlow font-bold text-[10px] text-neutral-700 tracking-[0.14em] uppercase mt-2">
              {published.length} PUBLISHED · {drafts.length} DRAFTS
            </div>
          </div>
          <button
            onClick={() => navigate("/create")}
            className="font-barlow font-black text-[13px] tracking-[0.1em] uppercase border-2 border-orange-500 bg-orange-500 text-black px-6 py-3.5 cursor-pointer transition-all duration-150 hover:bg-black hover:text-orange-500 ml-auto"
          >
            + NEW BLOG
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-neutral-900 mb-8">
          {["published", "drafts"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-barlow font-black text-[13px] tracking-[0.12em] uppercase px-6 py-3 cursor-pointer transition-all duration-150 border-b-2 -mb-0.5 bg-transparent border-t-0 border-l-0 border-r-0
                ${activeTab === tab ? "border-orange-500 text-orange-500" : "border-transparent text-neutral-700 hover:text-neutral-400"}`}
            >
              {tab === "published" ? `PUBLISHED (${published.length})` : `DRAFTS (${drafts.length})`}
            </button>
          ))}
        </div>

        {/* Blog list */}
        {fetching ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-neutral-800 border-t-orange-500 rounded-full animate-spin-orange" />
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16">
            <div className="font-barlow font-black text-2xl text-neutral-900 uppercase tracking-tight mb-4">
              {activeTab === "published" ? "NO PUBLISHED BLOGS YET" : "NO DRAFTS"}
            </div>
            <button
              onClick={() => navigate("/create")}
              className="font-barlow font-black text-xs tracking-[0.12em] uppercase border-2 border-neutral-900 text-neutral-700 px-5 py-3 cursor-pointer transition-all duration-150 hover:border-orange-500 hover:text-orange-500"
            >
              CREATE YOUR FIRST BLOG →
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayed.map(blog => (
              <div
                key={blog._id}
                className="bg-black/40 backdrop-blur-md border-2 border-neutral-900 px-7 py-6 flex items-center justify-between gap-5 flex-wrap transition-colors duration-150 hover:border-neutral-800"
              >
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-barlow font-black text-lg text-white uppercase tracking-tight truncate mb-1.5">
                    {blog.title}
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    {blog.repoName && (
                      <span className="font-barlow font-bold text-[10px] text-neutral-700 tracking-[0.12em] uppercase">{blog.repoName}</span>
                    )}
                    <span className="font-barlow font-bold text-[10px] text-neutral-900 tracking-[0.12em]">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 items-center shrink-0">
                  {blog.isPublished && (
                    <button
                      onClick={() => navigate(`/blog/${blog._id}`)}
                      className="font-barlow font-bold text-[10px] tracking-[0.12em] uppercase border border-neutral-900 text-neutral-700 px-3 py-2 cursor-pointer transition-all duration-150 hover:border-white hover:text-white bg-transparent"
                    >
                      VIEW
                    </button>
                  )}

                  <button
                    onClick={() => handleTogglePublish(blog._id)}
                    disabled={loading}
                    className={`font-barlow font-bold text-[10px] tracking-[0.12em] uppercase border px-3 py-2 cursor-pointer transition-all duration-150
                      ${blog.isPublished
                        ? "border-neutral-900 text-neutral-700 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                        : "border-orange-500 bg-orange-500 text-black hover:bg-black hover:text-orange-500"}`}
                  >
                    {blog.isPublished ? "UNPUBLISH" : "PUBLISH"}
                  </button>

                  {confirmDel === blog._id ? (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="font-barlow font-bold text-[10px] tracking-[0.1em] uppercase bg-red-500 border border-red-500 text-white px-3 py-2 cursor-pointer"
                      >
                        CONFIRM
                      </button>
                      <button
                        onClick={() => setConfirmDel(null)}
                        className="font-barlow font-bold text-[10px] tracking-[0.1em] uppercase border border-neutral-900 text-neutral-700 px-3 py-2 cursor-pointer bg-transparent"
                      >
                        CANCEL
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDel(blog._id)}
                      className="font-barlow font-bold text-[10px] tracking-[0.12em] uppercase border border-neutral-900 text-neutral-900 px-3 py-2 cursor-pointer transition-all duration-150 hover:border-red-500 hover:text-red-500 bg-transparent"
                    >
                      DELETE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}