import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ role }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== role) {
    toast.error('Forbidden: You do not have permission to access this page');
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
