import { FileProtectOutlined } from '@ant-design/icons';
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const UserNavbar = () => {
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const profileFunc = async () => {
    const response = await fetch('/profile', {
      method: 'GET',
      headers: {
        Accept: 'application/josn',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    setProfile(data);
  };
  const logOutFunc = async () => {
    const response = await fetch('/userLogout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.status === 200) {
      history.push('/');
    }
  };

  useEffect(() => {
    profileFunc();
  }, []);
  return (
    <>
      <nav>
        <div>
          <div class="logo-container">
            <img
              src="images/credit-n-logo.svg"
              className="d-inline-block align-top"
              alt=""
            />
          </div>
        </div>
        <div class="search-box">
          <input type="text" placeholder="Search..." />
          <i class="bx fas fa-search bx-search"></i>
        </div>
        <div class="dropdown">
          <div class="profile-details">
            <img src="images/portrait-young-smiling-woman-2.png" alt="" />

            <span class="admin_name" style={{ textTransform: 'capitalize' }}>
              {profile.Name}
            </span>
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li class="dropdown-item" href="#">
                <i class="fas fa-sign-in-alt"></i> <span>action</span>
              </li>
              <li class="dropdown-item" href="#" onClick={logOutFunc}>
                Logout
              </li>
              {/* <li class="dropdown-item" href="#">Logout</li>
              <li class="dropdown-item" href="#">Logout</li>
              <li class="dropdown-item" href="#">Logout</li> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
