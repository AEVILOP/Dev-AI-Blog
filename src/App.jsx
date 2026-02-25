import React from 'react'
import Navbar from './Components/Navbar'
import InfiniteScrollBar from './Components/InfiniteScrollBar'
import './index.css'
import Home from './Pages/Home'

function App() {


  return (
    <>

      <Navbar />
      <InfiniteScrollBar />
      <Home />
    </>
  )
}

export default App
