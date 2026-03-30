import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const GHIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const CheckIcon = () => (
  <span className="text-[#f97316] font-bold shrink-0">✓</span>
);

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [errorBanner, setErrorBanner] = useState(null);
  const [bannerType, setBannerType] = useState('error');
  const [loadingType, setLoadingType] = useState(null);

  useEffect(() => {
    if (user) {
      navigate('/account');
    }
  }, [user, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorParam = params.get('error');

    if (errorParam) {
      if (errorParam === 'oauth_failed') {
        setErrorBanner("GitHub login failed. Please try again.");
        setBannerType('error');
      } else if (errorParam === 'access_denied') {
        setErrorBanner("You denied access. Login requires GitHub authorization.");
        setBannerType('warning');
      } else if (errorParam === 'session_failed') {
        setErrorBanner("Session error. Please try again.");
        setBannerType('error');
      }

      // Clear params without reloading
      const url = new URL(window.location);
      url.searchParams.delete('error');
      window.history.replaceState({}, '', url);
    }
  }, [location.search]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handlePublicLogin = () => {
    setLoadingType('public');
    window.location.href = `${API_URL}/api/auth/github`;
  };

  const handleFullLogin = () => {
    setLoadingType('full');
    window.location.href = `${API_URL}/api/auth/github/full`;
  };

  const isAnyLoading = loadingType !== null;

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] font-sans flex flex-col items-center justify-center p-4">
      
      {/* ERROR BANNER */}
      {errorBanner && (
        <div className={`mb-6 w-full max-w-[480px] p-4 flex items-center justify-between border animate-fade-in ${
          bannerType === 'error' ? 'bg-red-950/20 border-red-900 text-red-400' : 'bg-yellow-950/20 border-yellow-900 text-yellow-400'
        }`}>
          <span className="text-sm font-bold">{errorBanner}</span>
          <button onClick={() => setErrorBanner(null)} className="text-lg font-bold opacity-70 hover:opacity-100 transition-opacity">
            ✕
          </button>
        </div>
      )}

      {/* TOP SECTION */}
      <div className="text-center mb-10">
        <h1 className="font-barlow font-black text-6xl text-[#f97316] uppercase tracking-widest leading-none mb-3">
          DevBlog
        </h1>
        <p className="text-[#999999] text-base font-medium tracking-wide">
          Turn your GitHub repos into developer blogs — in seconds.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="w-full max-w-[480px] bg-[#111111] border border-[#333333] p-6 md:p-10 flex flex-col gap-8">
        
        {/* BUTTON 1 - PUBLIC */}
        <div>
          <button
            onClick={handlePublicLogin}
            disabled={isAnyLoading}
            className={`w-full h-12 min-h-[48px] px-6 flex items-center justify-center gap-3 font-bold text-[16px] transition-colors rounded ${
              isAnyLoading 
                ? 'bg-[#333333] text-[#666666] cursor-not-allowed' 
                : 'bg-[#f97316] text-[#000000] hover:bg-[#ff8a3d]'
            }`}
          >
            {loadingType === 'public' ? (
              "Redirecting..."
            ) : (
              <><GHIcon /> Continue with GitHub</>
            )}
          </button>
          
          <ul className="mt-4 flex flex-col gap-2">
            <li className="flex gap-2 text-[13px] text-[#666666]"><CheckIcon /> Public repositories only</li>
            <li className="flex gap-2 text-[13px] text-[#666666]"><CheckIcon /> Reads README and commit messages only</li>
            <li className="flex gap-2 text-[13px] text-[#666666]"><CheckIcon /> Your source code is never accessed</li>
          </ul>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#333333]"></div>
          <span className="text-[#555555] text-sm uppercase tracking-widest font-bold">or</span>
          <div className="flex-1 h-px bg-[#333333]"></div>
        </div>

        {/* BUTTON 2 - PRIVATE */}
        <div>
          <button
            onClick={handleFullLogin}
            disabled={isAnyLoading}
            className={`w-full h-12 min-h-[48px] px-6 flex items-center justify-center gap-3 font-bold text-[16px] bg-transparent border border-[#555555] transition-colors rounded ${
              isAnyLoading 
                ? 'text-[#666666] cursor-not-allowed' 
                : 'text-[#ffffff] hover:border-[#ffffff]'
            }`}
          >
            {loadingType === 'full' ? (
              "Redirecting..."
            ) : (
              <><span className="text-xl">🔒</span> Login with Private Repo Access</>
            )}
          </button>

          <ul className="mt-4 flex flex-col gap-2">
            <li className="flex gap-2 text-[13px] text-[#666666]"><CheckIcon /> Public + private repositories</li>
            <li className="flex gap-2 text-[13px] text-[#666666]"><CheckIcon /> Still only reads README and commit messages</li>
            <li className="flex gap-2 text-[13px] text-[#666666]"><CheckIcon /> Source code is never accessed or stored</li>
            <li className="flex gap-2 text-[13px] text-[#666666]"><CheckIcon /> Revoke access anytime from GitHub Settings</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM OF PAGE */}
      <div className="mt-8 text-center text-[12px] text-[#444444] font-medium tracking-wide">
        By logging in you agree to our Terms of Service
      </div>

    </div>
  );
}