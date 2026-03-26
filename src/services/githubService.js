// TODO: Implement githubService (GitHub API calls)
import apiClient from "../infrastructure/apiClient";

const githubService = {
  getRepos: async () => {
    const { data } = await apiClient.get("/api/github/repos");
    return data;
  },

  getReadme: async (owner, repo) => {
    const { data } = await apiClient.get(`/api/github/repos/${owner}/${repo}/readme`);
    return data; // { readme, hasReadme }
  },

  validateRepo: async (repoData) => {
    const { data } = await apiClient.post("/api/github/validate-repo", repoData);
    return data; // { valid, reason }
  },
};

export default githubService;