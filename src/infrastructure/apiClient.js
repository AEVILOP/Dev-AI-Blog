import axios from "axios";

const api = axios.create({
  baseURL: "https://dev-ai-blog-backend.onrender.com",
  withCredentials: true, // 🔥 THIS IS THE FIX
});

export default api;