import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import { AuthProvider } from '../features/auth/AuthContext'
import GeoBackground from '../shared/components/GeoBackground'
import '../styles/index.css'

function App() {

  return (
    <AuthProvider>
      <Router>
        <GeoBackground />
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
