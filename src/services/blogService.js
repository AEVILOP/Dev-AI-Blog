// TODO: Implement blogService (blog API calls)
import apiClient from "../infrastructure/apiClient";

// All blog-related API calls live here.
// Hooks consume these functions — they never call apiClient directly.

const blogService = {
  getAll: async (params = {}) => {
    const { data } = await apiClient.get("/api/blogs", { params });
    return data; // { blogs, total, pages, currentPage }
  },

  getById: async (id) => {
    const { data } = await apiClient.get(`/api/blogs/${id}`);
    return data;
  },

  getMyBlogs: async () => {
    const { data } = await apiClient.get("/api/blogs/user/me");
    // API returns { blogs, ... } – return only the blogs array for easier consumption.
    return data?.blogs || [];
  },

  create: async (blogData) => {
    const { data } = await apiClient.post("/api/blogs", blogData);
    return data;
  },

  update: async (id, blogData) => {
    const { data } = await apiClient.put(`/api/blogs/${id}`, blogData);
    return data;
  },

  delete: async (id) => {
    await apiClient.delete(`/api/blogs/${id}`);
    return true;
  },

  togglePublish: async (id) => {
    const { data } = await apiClient.patch(`/api/blogs/${id}/publish`);
    return data; // { isPublished, message }
  },
};

export default blogService;
