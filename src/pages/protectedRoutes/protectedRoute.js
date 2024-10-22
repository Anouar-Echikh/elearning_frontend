//the goal of this component is to Navigate the client if isn't logged in => to the page /login

import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate ,Outlet } from "react-router-dom";



const ProtectedRoute = ({ isAuth ,error}) => {
 
  
  if(error&&error.status==500)
    return <Navigate to="/500" replace />;

  else if (!isAuth ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet/>;
};



const mapStateToProps = ({ authReducer }) => {
 
  return {
    isAuth: authReducer.isAuth,
    error: authReducer.error,
    isLocked: authReducer.isLocked
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
