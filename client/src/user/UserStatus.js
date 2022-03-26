import React, { useEffect, useState } from 'react';
import './userStyle.css';
import '../frontPage/css/contact.css';
import ApplyLoan from './ApplyLoan';
import UserNavbar from './UserNavbar';
import Status from './status';

const UserStatus = () => {
  return (
    <>
      <div className="home-section back-image">
        <UserNavbar />
        <Status />
      </div>
    </>
  );
};

export default UserStatus;
