import React from 'react'
import {Link} from 'react-router-dom'

const AdminNavBar = () => {
  return (
    <>
       
    <nav>
        <div className="sidebar-button" >
        <i className="fas fa-border-all"></i>
          <span className="dashboard">Dashboard</span>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <i className="bx bx-search"></i>
        </div>
        <div className="dropdown">
          <div className="profile-details">
            <img src="images/profile.jpg" alt="" />

            <span className="admin_name">Prem Shahi</span>
            <button
              className="btn"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bx bx-chevron-down"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <Link className="dropdown-item" to="#">
                <i className="fas fa-sign-in-alt"></i> <span>action</span>
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fas fa-sign-in-alt"></i> <span>setting</span>
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fas fa-sign-in-alt"></i> <span>ID</span>
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fas fa-sign-in-alt"></i> <span> Reg </span>
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fas fa-sign-in-alt"></i> <span>action</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    
    </>
  )
}

export default AdminNavBar