// TODO: Implement apiClient (Axios/Fetch wrapper)
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // sends session cookie on every request
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired or not authenticated");
    }
    return Promise.reject(error);
  }
);

export default apiClient;