import { useState } from "react";
import blogService from "../../../services/blogService";

export function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = async (params) => {
    setLoading(true); setError(null);
    try {
      const data = await blogService.getAll(params);
      setBlogs(data.blogs || []);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch blogs");
      return null;
    } finally { setLoading(false); }
  };

  const fetchBlogById = async (id) => {
    setLoading(true); setError(null);
    try { return await blogService.getById(id); }
    catch (err) {
      setError(err.response?.data?.message || "Failed to fetch blog");
      return null;
    } finally { setLoading(false); }
  };

  const fetchMyBlogs = async () => {
    setLoading(true); setError(null);
    try { return await blogService.getMyBlogs(); }
    catch (err) {
      setError(err.response?.data?.message || "Failed to fetch your blogs");
      return null;
    } finally { setLoading(false); }
  };

  const createBlog = async (data) => {
    setLoading(true); setError(null);
    try { return await blogService.create(data); }
    catch (err) {
      setError(err.response?.data?.message || "Failed to create blog");
      return null;
    } finally { setLoading(false); }
  };

  const updateBlog = async (id, data) => {
    setLoading(true); setError(null);
    try { return await blogService.update(id, data); }
    catch (err) {
      setError(err.response?.data?.message || "Failed to update blog");
      return null;
    } finally { setLoading(false); }
  };

  const deleteBlog = async (id) => {
    setLoading(true); setError(null);
    try { return await blogService.delete(id); }
    catch (err) {
      setError(err.response?.data?.message || "Failed to delete blog");
      return false;
    } finally { setLoading(false); }
  };

  const togglePublish = async (id) => {
    setLoading(true); setError(null);
    try { return await blogService.togglePublish(id); }
    catch (err) {
      setError(err.response?.data?.message || "Failed to toggle status");
      return null;
    } finally { setLoading(false); }
  };

  return {
    blogs, loading, error, setError,
    fetchBlogs, fetchBlogById, fetchMyBlogs,
    createBlog, updateBlog, deleteBlog, togglePublish
  };
}
