import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const GHIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path
      d="M7 10V7a5 5 0 0 1 10 0v3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="4" y="10" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-orange-500">
    <path
      d="M3.5 8.25 6.5 11l6-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [errorBanner, setErrorBanner] = useState(null);
  const [bannerType, setBannerType] = useState("error");
  const [loadingType, setLoadingType] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, [user, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorParam = params.get("error");

    if (errorParam) {
      setTimeout(() => {
        if (errorParam === "oauth_failed") {
          setErrorBanner("GitHub login failed. Please try again.");
          setBannerType("error");
        } else if (errorParam === "access_denied") {
          setErrorBanner("You denied access. Login requires GitHub authorization.");
          setBannerType("warning");
        } else if (errorParam === "session_failed") {
          setErrorBanner("Session error. Please try again.");
          setBannerType("error");
        }
      }, 0);

      navigate(location.pathname, { replace: true });
    }
  }, [location.search, location.pathname, navigate]);

  const API_URL = import.meta.env.VITE_API_URL || "";

  const handlePublicLogin = () => {
    setLoadingType("public");
    window.location.href = `${API_URL}/api/auth/github`;
  };

  const handleFullLogin = () => {
    setLoadingType("full");
    window.location.href = `${API_URL}/api/auth/github/full`;
  };

  const isAnyLoading = loadingType !== null;

  return (
    <div className="min-h-screen bg-[#000000] px-3 py-8 text-[#ffffff] font-sans sm:p-4">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[480px] flex-col items-center justify-center">
        {errorBanner && (
          <div
            className={`mb-5 flex w-full items-start justify-between gap-3 rounded-3xl border px-4 py-3 sm:mb-6 ${
              bannerType === "error" ? "border-red-900 bg-red-950/20 text-red-400" : "border-yellow-900 bg-yellow-950/20 text-yellow-400"
            }`}
          >
            <span className="text-sm font-bold leading-5">{errorBanner}</span>
            <button
              type="button"
              onClick={() => setErrorBanner(null)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-3xl border border-current/20 text-base font-bold opacity-70 transition-opacity hover:opacity-100"
            >
              X
            </button>
          </div>
        )}

        <div className="mb-8 w-full text-center sm:mb-10">
          <h1 className="mb-3 font-barlow text-[2.5rem] leading-none font-black uppercase tracking-[0.18em] text-orange-500 max-[360px]:text-[1.7rem] max-[360px]:tracking-[0.12em] sm:text-6xl">
            DevBlog.AI
          </h1>
          <p className="mx-auto max-w-[26rem] text-sm font-medium leading-6 tracking-wide text-[#999999] sm:text-base">
            Turn your GitHub repos into developer blogs in seconds.
          </p>
        </div>

        <div className="flex w-full flex-col gap-6 rounded-3xl border border-[#333333] bg-[#111111] p-4 sm:gap-8 sm:p-6 md:p-10">
          <div>
            <button
              type="button"
              onClick={handlePublicLogin}
              disabled={isAnyLoading}
              className={`flex min-h-[54px] w-full items-center justify-center gap-3 rounded-3xl px-4 py-3 text-center text-sm font-bold leading-tight transition-colors sm:min-h-[48px] sm:px-6 sm:text-[16px] ${
                isAnyLoading ? "cursor-not-allowed bg-[#333333] text-[#666666]" : "bg-orange-500 text-black hover:bg-orange-500/90"
              }`}
            >
              {loadingType === "public" ? (
                "Redirecting..."
              ) : (
                <>
                  <GHIcon />
                  <span>Continue with GitHub</span>
                </>
              )}
            </button>

            <ul className="mt-4 flex flex-col gap-2">
              <li className="flex gap-2 text-xs leading-5 text-[#666666] sm:text-[13px]">
                <CheckIcon />
                <span>Public repositories only</span>
              </li>
              <li className="flex gap-2 text-xs leading-5 text-[#666666] sm:text-[13px]">
                <CheckIcon />
                <span>Reads README and commit messages only</span>
              </li>
              <li className="flex gap-2 text-xs leading-5 text-[#666666] sm:text-[13px]">
                <CheckIcon />
                <span>Your source code is never accessed</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#333333]"></div>
            <span className="text-sm font-bold uppercase tracking-widest text-[#555555]">or</span>
            <div className="h-px flex-1 bg-[#333333]"></div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleFullLogin}
              disabled={isAnyLoading}
              className={`flex min-h-[54px] w-full items-center justify-center gap-3 rounded-3xl border border-[#555555] bg-transparent px-4 py-3 text-center text-sm font-bold leading-tight transition-colors sm:min-h-[48px] sm:px-6 sm:text-[16px] ${
                isAnyLoading ? "cursor-not-allowed text-[#666666]" : "text-[#ffffff] hover:border-orange-500/50 hover:text-orange-500"
              }`}
            >
              {loadingType === "full" ? (
                "Redirecting..."
              ) : (
                <>
                  <LockIcon />
                  <span>Login with Private Repo Access</span>
                </>
              )}
            </button>

            <ul className="mt-4 flex flex-col gap-2">
              <li className="flex gap-2 text-xs leading-5 text-[#666666] sm:text-[13px]">
                <CheckIcon />
                <span>Public plus private repositories</span>
              </li>
              <li className="flex gap-2 text-xs leading-5 text-[#666666] sm:text-[13px]">
                <CheckIcon />
                <span>Still only reads README and commit messages</span>
              </li>
              <li className="flex gap-2 text-xs leading-5 text-[#666666] sm:text-[13px]">
                <CheckIcon />
                <span>Source code is never accessed or stored</span>
              </li>
              <li className="flex gap-2 text-xs leading-5 text-[#666666] sm:text-[13px]">
                <CheckIcon />
                <span>Revoke access anytime from GitHub Settings</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 max-w-[22rem] text-center text-[11px] font-medium leading-5 tracking-wide text-[#444444] sm:mt-8 sm:max-w-none sm:text-[12px]">
          By logging in you agree to our Terms of Service
        </div>
      </div>
    </div>
  );
}
