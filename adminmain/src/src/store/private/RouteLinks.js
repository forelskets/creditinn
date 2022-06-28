import { useSelector } from "react-redux";
import React from 'react';
import { Navigate  } from "react-router-dom";


const RouteLinks = ({children}) =>{
    const {admin} = useSelector(state => state.AuthReducer)

    return admin ? (<Navigate to='/dashboard/app'/>) : children
}

export default RouteLinks