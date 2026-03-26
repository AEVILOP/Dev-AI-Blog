// TODO: Implement useGitHub hook (GitHub API integration)
import { useState } from "react";
import githubService from "../../../services/githubService";

export function useGitHub() {
  const [repos,   setRepos]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchRepos = async () => {
    setLoading(true); setError(null);
    try {
      const data = await githubService.getRepos();
      setRepos(data);
      return data;
    } catch (err) {
      const code = err.response?.data?.code;
      if      (code === "GITHUB_TOKEN_EXPIRED") setError("Your GitHub session expired. Please log out and log back in.");
      else if (code === "GITHUB_RATE_LIMIT")    setError("GitHub rate limit reached. Try again in an hour.");
      else                                      setError(err.response?.data?.message || "Failed to fetch repositories");
      return null;
    } finally { setLoading(false); }
  };

  const fetchReadme = async (owner, repo) => {
    try   { return await githubService.getReadme(owner, repo); }
    catch { return { readme: null, hasReadme: false }; }
  };

  const validateRepo = async (repoData) => {
    try   { return await githubService.validateRepo(repoData); }
    catch { return { valid: false, reason: "Validation failed" }; }
  };

  return { repos, loading, error, setError, fetchRepos, fetchReadme, validateRepo };
}