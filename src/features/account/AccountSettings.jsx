import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useBlogs } from "../blog/hooks/useBlogs";
import { useGitHub } from "../github/hooks/useGitHub";

export default function AccountSettings() {
  const { user, loading, logout } = useAuth();
  const { fetchMyBlogs, deleteBlog, togglePublish, loading: blogsOpLoading } = useBlogs();
  const { repos, fetchRepos, loading: reposLoading } = useGitHub();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard", "settings", "blogs", "repos"
  const [subTab, setSubTab] = useState("published"); // for blogs view
  const [fetchingBlogs, setFetchingBlogs] = useState(true);
  const [confirmDel, setConfirmDel] = useState(null);

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    let mounted = true;

    fetchMyBlogs()
      .then((data) => {
        if (mounted && data) setBlogs(data);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setFetchingBlogs(false);
      });

    fetchRepos().catch(() => {});

    return () => {
      mounted = false;
    };
  }, [loading, user]); // eslint-disable-line react-hooks/exhaustive-deps

  const published = blogs.filter(b => b.isPublished);
  const drafts    = blogs.filter(b => !b.isPublished);
  const displayedBlogs = subTab === "published" ? published : drafts;
  
  // Dashboard content helpers
  const recentBlogs = blogs.slice(0, 3); // top 3
  const hasMoreBlogs = blogs.length > 3;

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

  // --- RENDERS ---
  const renderDashboard = () => (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-barlow font-black text-4xl uppercase tracking-widest text-white">Dashboard</h1>
        <button
            onClick={() => navigate("/create")}
            className="font-barlow font-black text-[13px] tracking-widest uppercase border-2 border-orange-500 rounded-3xl bg-orange-500 text-black px-6 py-3 cursor-pointer transition-all duration-150 hover:bg-black hover:text-orange-500"
          >
            + NEW BLOG
        </button>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="border-2 border-neutral-900 bg-neutral-950 rounded-3xl p-6 flex items-center justify-between">
            <div>
               <div className="font-barlow font-bold text-xs tracking-widest uppercase text-neutral-500 mb-2">Total GitHub Repos</div>
               <div className="font-barlow font-black text-4xl">{reposLoading ? "..." : repos.length}</div>
            </div>
            <div className="text-4xl opacity-80 mix-blend-luminosity grayscale">📦</div>
        </div>
        <div className="border-2 border-neutral-900 bg-neutral-950 rounded-3xl p-6 flex items-center justify-between">
            <div>
               <div className="font-barlow font-bold text-xs tracking-widest uppercase text-neutral-500 mb-2">Total Blogs Created</div>
               <div className="font-barlow font-black text-4xl">{fetchingBlogs ? "..." : blogs.length}</div>
            </div>
            <div className="text-4xl opacity-80 mix-blend-luminosity grayscale">📝</div>
        </div>
      </div>

      {/* Created Blogs Row */}
      <div className="mb-12">
         <div className="font-barlow font-black text-sm tracking-widest uppercase text-neutral-400 mb-5 border-b-2 border-neutral-900 pb-2 inline-block">Created Blogs</div>
         
         {fetchingBlogs ? (
            <div className="text-neutral-500 font-barlow text-sm uppercase tracking-widest">Loading...</div>
         ) : blogs.length === 0 ? (
            <div className="border-2 border-neutral-900 border-dashed rounded-3xl p-8 text-center text-neutral-500 font-barlow font-bold text-xs uppercase tracking-widest">No blogs created yet.</div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentBlogs.map(blog => (
                <div key={blog._id} onClick={() => navigate(`/blog/${blog._id}`)} className="border-2 border-neutral-900 bg-neutral-950 rounded-3xl p-5 flex flex-col justify-between cursor-pointer hover:border-orange-500 transition-colors h-48">
                    <div>
                        <div className="font-barlow font-black text-lg text-white uppercase tracking-tight line-clamp-2 leading-none mb-3">{blog.title}</div>
                        <div className="font-barlow font-bold text-[10px] text-orange-500 disabled tracking-widest uppercase truncate">{blog.repoName || "Local Repo"}</div>
                    </div>
                    <div className="flex items-center justify-between mt-auto shrink-0 pt-4">
                        <div className="font-barlow font-bold text-[10px] text-neutral-600 tracking-widest">
                           {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                        {blog.isPublished && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                    </div>
                </div>
              ))}
              {hasMoreBlogs && (
                 <div onClick={() => setActiveTab("blogs")} className="border-2 border-neutral-900 border-dashed bg-transparent rounded-3xl p-5 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:text-orange-500 transition-colors h-48 text-neutral-500 group">
                    <div className="font-barlow font-black text-3xl mb-2 group-hover:scale-110 transition-transform">→</div>
                    <div className="font-barlow font-bold text-[10px] tracking-widest uppercase text-center mt-1">Show More<br/>Blogs</div>
                 </div>
              )}
            </div>
         )}
      </div>

      {/* Repos List */}
      <div>
         <div className="font-barlow font-black text-sm tracking-widest uppercase text-neutral-400 mb-5 border-b-2 border-neutral-900 pb-2 inline-block">Repo Cards With Generate Button</div>
         
         {reposLoading ? (
            <div className="flex justify-center py-6"><div className="w-5 h-5 border-2 border-neutral-800 border-t-orange-500 rounded-full animate-spin-orange" /></div>
         ) : repos.length === 0 ? (
            <div className="border-2 border-neutral-900 border-dashed rounded-3xl p-8 text-center text-neutral-500 font-barlow font-bold text-xs uppercase tracking-widest">No repos found or connect your GitHub.</div>
         ) : (
            <div className="flex flex-col gap-3">
               {repos.slice(0, 5).map(repo => (
                  <div key={repo.id} className="border-2 border-neutral-900 bg-black backdrop-blur-md rounded-3xl px-6 py-5 flex items-center justify-between gap-4 hover:border-neutral-700 transition-colors">
                      <div className="flex-1 min-w-0 pr-4">
                          <div className="font-barlow font-black text-lg text-white uppercase tracking-tight truncate">{repo.name}</div>
                          {repo.description && <div className="text-xs text-neutral-500 truncate mt-1">{repo.description}</div>}
                      </div>
                      <button onClick={() => navigate('/create')} className="shrink-0 font-barlow font-bold text-[10px] tracking-widest uppercase border-2 border-orange-500/20 text-orange-500 rounded-3xl px-5 py-2.5 hover:border-orange-500 hover:text-white hover:bg-orange-500 transition-colors bg-transparent">
                          Generate Blog
                      </button>
                  </div>
               ))}
               {repos.length > 5 && (
                  <button onClick={() => setActiveTab("repos")} className="font-barlow font-bold text-xs tracking-widest uppercase text-neutral-500 hover:text-white py-4 mt-2">
                      VIEW ALL {repos.length} REPOSITORIES →
                  </button>
               )}
            </div>
         )}
      </div>
    </div>
  );

  const renderBlogs = () => (
    <div className="animate-fade-up">
       <div className="font-barlow font-black text-4xl uppercase tracking-widest text-white mb-10">Your Blogs</div>
        {/* Tabs */}
        <div className="flex border-b-2 border-neutral-900 mb-8">
          {["published", "drafts"].map(tab => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`font-barlow font-black text-[13px] tracking-widest uppercase px-6 py-3 cursor-pointer transition-all duration-150 border-b-2 -mb-0.5 bg-transparent
                ${subTab === tab ? "border-orange-500 text-orange-500" : "border-transparent text-neutral-700 hover:text-neutral-400"}`}
            >
              {tab === "published" ? `PUBLISHED (${published.length})` : `DRAFTS (${drafts.length})`}
            </button>
          ))}
        </div>

        {/* Blog list */}
        {fetchingBlogs ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-neutral-800 border-t-orange-500 rounded-full animate-spin-orange" />
          </div>
        ) : displayedBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="font-barlow font-black text-2xl text-neutral-900 uppercase tracking-tight mb-4">
              {subTab === "published" ? "NO PUBLISHED BLOGS YET" : "NO DRAFTS"}
            </div>
            <button
              onClick={() => navigate("/create")}
              className="font-barlow font-black text-xs tracking-widest uppercase border-2 border-neutral-900 rounded-3xl text-neutral-700 px-5 py-3 cursor-pointer transition-all duration-150 hover:border-orange-500 hover:text-orange-500"
            >
              CREATE YOUR FIRST BLOG →
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayedBlogs.map(blog => (
              <div
                key={blog._id}
                className="bg-black/40 backdrop-blur-md border-2 border-neutral-900 rounded-3xl px-7 py-6 flex items-center justify-between gap-5 flex-wrap transition-colors duration-150 hover:border-neutral-800"
              >
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-barlow font-black text-lg text-white uppercase tracking-tight truncate mb-1.5">
                    {blog.title}
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    {blog.repoName && (
                      <span className="font-barlow font-bold text-[10px] text-neutral-700 tracking-widest uppercase">{blog.repoName}</span>
                    )}
                    <span className="font-barlow font-bold text-[10px] text-neutral-900 tracking-widest">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 items-center shrink-0">
                  {blog.isPublished && (
                    <button
                      onClick={() => navigate(`/blog/${blog._id}`)}
                      className="font-barlow font-bold text-[10px] tracking-widest uppercase border border-neutral-900 rounded-3xl text-neutral-700 px-3 py-2 cursor-pointer transition-all duration-150 hover:border-white hover:text-white bg-transparent"
                    >
                      VIEW
                    </button>
                  )}

                  <button
                    onClick={() => handleTogglePublish(blog._id)}
                    disabled={blogsOpLoading}
                    className={`font-barlow font-bold text-[10px] tracking-widest uppercase border rounded-3xl px-3 py-2 cursor-pointer transition-all duration-150
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
                        className="font-barlow font-bold text-[10px] tracking-widest uppercase bg-red-500 border border-red-500 rounded-3xl text-white px-3 py-2 cursor-pointer"
                      >
                        CONFIRM
                      </button>
                      <button
                        onClick={() => setConfirmDel(null)}
                        className="font-barlow font-bold text-[10px] tracking-widest uppercase border border-neutral-900 rounded-3xl text-neutral-700 px-3 py-2 cursor-pointer bg-transparent"
                      >
                        CANCEL
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDel(blog._id)}
                      className="font-barlow font-bold text-[10px] tracking-widest uppercase border border-neutral-900 rounded-3xl text-neutral-900 px-3 py-2 cursor-pointer transition-all duration-150 hover:border-red-500 hover:text-red-500 bg-transparent"
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
  );

  const renderSettings = () => (
    <div className="animate-fade-up max-w-xl">
       <div className="font-barlow font-black text-4xl uppercase tracking-widest text-white mb-10">Account Settings</div>
       <div className="border-2 border-neutral-900 rounded-3xl p-8 bg-neutral-950">
          <div className="flex items-center gap-6 mb-8">
            {user?.avatarUrl && <img src={user.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-neutral-800" />}
            <div>
               <div className="font-barlow font-black text-2xl uppercase tracking-tight text-white">{user?.username}</div>
               <div className="text-xs text-neutral-500 font-barlow tracking-widest uppercase mt-1">GitHub Developer</div>
            </div>
          </div>
          <div className="border-t-2 border-neutral-900 pt-8 mt-4">
             <button
               onClick={handleLogout}
               className="font-barlow font-bold text-[11px] tracking-widest uppercase border-2 border-red-500/20 text-red-500 rounded-3xl px-6 py-3 cursor-pointer hover:bg-red-500 hover:text-black hover:border-red-500 transition-all"
             >
               SIGN OUT
             </button>
          </div>
       </div>
    </div>
  );

  const renderRepos = () => (
     <div className="animate-fade-up">
       <div className="font-barlow font-black text-4xl uppercase tracking-widest text-white mb-10">Your Repositories</div>
       {reposLoading ? (
          <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-neutral-800 border-t-orange-500 rounded-full animate-spin-orange" /></div>
       ) : repos.length === 0 ? (
          <div className="text-center py-16 font-barlow font-bold text-sm text-neutral-600 uppercase tracking-widest">No repositories found.</div>
       ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {repos.map(repo => (
                <div key={repo.id} className="border-2 border-neutral-900 bg-neutral-950 rounded-3xl px-6 py-6 flex flex-col justify-between hover:border-neutral-700 transition-colors">
                    <div className="mb-6">
                        <div className="font-barlow font-black text-lg text-white uppercase tracking-tight">{repo.name}</div>
                        {repo.description && <div className="text-sm text-neutral-500 mt-2 line-clamp-2">{repo.description}</div>}
                    </div>
                    <div className="flex items-center justify-between border-t-2 border-neutral-900 pt-4 mt-auto">
                        <div className="font-barlow font-bold text-[10px] text-orange-500 tracking-widest uppercase">{repo.language || "CODE"}</div>
                        <button onClick={() => navigate('/create')} className="font-barlow font-bold text-[10px] tracking-widest uppercase bg-transparent hover:bg-white text-neutral-400 hover:text-black border border-neutral-700 rounded-3xl px-5 py-2.5 transition-colors">
                            GENERATE
                        </button>
                    </div>
                </div>
             ))}
          </div>
       )}
     </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-66px)] bg-transparent text-white">
      {/* SIDEBAR */}
      <div className="hidden lg:flex w-64 border-r-2 border-neutral-900 bg-black flex-col py-8 px-6 shrink-0 h-[calc(100vh-66px)] sticky top-[66px] overflow-y-auto custom-scrollbar">
          
          {/* User Profile */}
          <div className="mb-10 text-center">
            {user?.avatarUrl && (
              <img src={user.avatarUrl} alt={user.username} className="w-20 h-20 rounded-full border-2 border-neutral-800 mx-auto mb-4" />
            )}
            <div className="font-barlow font-black text-xl uppercase tracking-widest truncate">{user?.username}</div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 flex-1">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "settings", label: "Account-settings" },
              { id: "blogs", label: "Blogs" },
              { id: "repos", label: "Repos" },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`font-barlow font-bold text-[11px] tracking-widest uppercase text-left px-5 py-3 rounded-3xl transition-colors ${activeTab === item.id ? "bg-orange-500 text-black" : "text-neutral-500 hover:text-white hover:bg-neutral-900"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Bottom Analytics Box */}
          <div className="mt-8 border-2 border-neutral-900 bg-neutral-950 p-5 rounded-3xl">
             <div className="font-barlow font-bold text-[10px] uppercase text-neutral-500 tracking-widest mb-1">Created Blogs</div>
             <div className="font-barlow font-black text-2xl text-white">{blogs.length}</div>
             <div className="font-barlow font-bold text-[9px] text-orange-500 tracking-[0.1em] uppercase mt-2">{blogs.length} LIFETIME</div>
          </div>
      </div>

      {/* MOBILE NAV (Dropdown) */}
      <div className="lg:hidden w-full border-b-2 border-neutral-900 p-4 absolute top-[66px] bg-black z-10 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "settings", label: "Settings" },
            { id: "blogs", label: "Blogs" },
            { id: "repos", label: "Repos" },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`shrink-0 font-barlow font-bold text-[10px] tracking-widest uppercase px-4 py-2 rounded-3xl transition-colors ${activeTab === item.id ? "bg-orange-500 text-black" : "text-neutral-500 border border-neutral-900"}`}
            >
              {item.label}
            </button>
          ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 w-full bg-transparent overflow-x-hidden pt-16 lg:pt-0 overflow-y-auto custom-scrollbar">
         <div className="max-w-5xl mx-auto px-6 sm:px-10 py-12">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "blogs" && renderBlogs()}
            {activeTab === "settings" && renderSettings()}
            {activeTab === "repos" && renderRepos()}
         </div>
      </div>
    </div>
  );
}
