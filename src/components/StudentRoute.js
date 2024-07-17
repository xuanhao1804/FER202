import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const StudentRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'student') {
    toast.error('Forbidden: You do not have permission to access this page');
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default StudentRoute;
