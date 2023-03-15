import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './thema/Footer'
import Header from './thema/Header'
import Sidebar from './thema/Sidebar'

export default function Content() {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="page-wrapper" className="gray-bg dashbard-1">
        <Header />
        {<Outlet />}
        
        <Footer />
      </div>
      
    </div>

  )
}
