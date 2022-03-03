import React, { useEffect, useState } from 'react';
import './userStyle.css';
import ApplyLoan from './ApplyLoan';
import UserNavbar from './UserNavbar';

const UserMain = () => {
  return (
    <>
      <div className="home-section back-image">
        <UserNavbar />
        <ApplyLoan />
      </div>
    </>
  );
};

export default UserMain;
