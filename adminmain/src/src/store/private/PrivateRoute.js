import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({children}) => {
    const {admin} = useSelector(state => state.AuthReducer);
  return  admin ? children :( <Navigate to='/'/>) 
}

export default PrivateRoute