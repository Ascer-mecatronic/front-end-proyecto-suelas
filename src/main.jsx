import React from 'react'
import ReactDOM from 'react-dom/client'
import { SuelasApp } from './SuelasApp'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './auth/context/AuthProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <SuelasApp />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
