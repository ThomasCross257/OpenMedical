import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header.tsx'
import Homepage from './Homepage.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header/>
    <Homepage/>
  </React.StrictMode>,
)
