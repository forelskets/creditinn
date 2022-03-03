import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const AdminSideBar = () => {
  const LogOutFunc = () => {};
  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">CreditIn</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/adminDashboard" className="active">
              <i className="fas fa-border-all"></i>
              <span className="links_name">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="adminApplication">
              <i className="fas fa-heart"></i>
              <span className="links_name">Applications </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminOffer">
              <i className="fas fa-university"></i>
              <span className="links_name">Offer</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminBank">
              <i className="fas fa-university"></i>
              <span className="links_name">Bank</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminServices">
              <i className="fas fa-user"></i>
              <span className="links_name">Services</span>
            </NavLink>
          </li>

          <li className="log_out">
            <NavLink to="#">
              <i className="bx bx-log-out"></i>
              <span className="links_name" onClick={LogOutFunc}>
                Log out
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSideBar;
