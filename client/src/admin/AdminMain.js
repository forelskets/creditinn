import React from 'react'

import AdminNavBar from './AdminNavBar'

import AdminSideBar from './AdminSideBar'


import {Route , Switch } from 'react-router-dom'
import './style.css'


const AdminMain = () => {
  return (
    <>
    <AdminSideBar/>
    <section class="homes-section">
    <AdminNavBar />
   
    
         
          
    </section>
   
    </>
  )
}

export default AdminMain