import React from 'react';
import LayoutUser from "../layout/LayoutUser";
import LayoutAdmin from "../layout/LayoutAdmin";

const RoleBasedLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return null; // hoặc điều hướng đến trang đăng nhập nếu cần thiết
  }

  return user.role === 'admin' ? <LayoutAdmin>{children}</LayoutAdmin> : <LayoutUser>{children}</LayoutUser>;
};

export default RoleBasedLayout;
