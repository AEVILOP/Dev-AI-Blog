import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts / Shared
import Navbar from '../shared/components/Navbar';

// Features / Pages
import Login from '../features/auth/Login';
import Home from '../features/blog/pages/Home';
import Explore from '../features/blog/pages/Explore';
import BlogDetail from '../features/blog/pages/BlogDetail';
import CreateBlog from '../features/editor/pages/CreateBlog';
import AccountSettings from '../features/account/AccountSettings';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / Landing */}
      <Route path="/" element={
        <>
          <Navbar />
          <Home />
        </>
      } />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      <Route path="/explore" element={
        <>
          <Navbar />
          <Explore />
        </>
      } />
      
      <Route path="/create" element={
        <>
          <CreateBlog />
        </>
      } />

      <Route path="/blog/:id" element={
        <>
          <Navbar />
          <BlogDetail />
        </>
      } />

      <Route path="/account" element={
        <>
          <Navbar />
          <AccountSettings />
        </>
      } />

    </Routes>
  );
}
