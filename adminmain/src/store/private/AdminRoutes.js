import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({ children }) => {
  const { admin } = useSelector((state) => state.AuthReducer);
  return admin.Type === 'Admin' ? children : 'This route is only for Main Admin';
};

export default AdminRoutes;
