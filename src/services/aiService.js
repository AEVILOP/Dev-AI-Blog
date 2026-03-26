// TODO: Implement aiService (AI generation API calls)
import apiClient from "../infrastructure/apiClient";

const aiService = {
  generate: async (payload) => {
    const { data } = await apiClient.post("/api/ai/generate", payload);
    return data; // { blog, readmeNote }
  },

  getPendingDraft: async () => {
    const { data } = await apiClient.get("/api/ai/pending-draft");
    return data; // { hasPendingDraft, draft }
  },

  discardPendingDraft: async () => {
    await apiClient.delete("/api/ai/pending-draft");
    return true;
  },
};

export default aiService;