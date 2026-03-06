import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import InfiniteScroll from './Components/InfiniteScroll'
import './index.css'
import Home from './Pages/Home'
import Login from './Pages/Login-page'

function App() {

  return (
    <Router>
      <Routes>
        {/* Login page as landing page */}
        <Route path="/" element={<Login />} />

        {/* Home route with Navbar + InfiniteScroll */}
        <Route path="/home" element={
          <>
            <Navbar />
            <InfiniteScroll />
            <Home />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
