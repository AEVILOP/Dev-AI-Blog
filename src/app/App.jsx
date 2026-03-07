import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../shared/components/Navbar'
import '../styles/index.css'
import Home from '../features/blog/pages/Home'
import Login from '../features/auth/Login'

function App() {

  return (
    <Router>
      <Routes>
        {/* Login page as landing page */}
        <Route path="/" element={<Login />} />

        {/* Home route with Navbar */}
        <Route path="/home" element={
          <>
            <Navbar />
            <Home />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
