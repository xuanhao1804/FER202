import React, { useState } from 'react';
import LayoutUser from "../../layout/LayoutUser";
import { toast } from 'react-toastify';
import bcryptjs from 'bcryptjs';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user")).id;

    try {
      // Fetch current user data
      const userResponse = await axios.get(`http://localhost:9999/users/${userId}`);
      const user = userResponse.data;

      // Verify current password
      const isCurrentPasswordValid = await bcryptjs.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        toast.error('Current password is incorrect');
        return;
      }

      // Hash new password
      const salt = await bcryptjs.genSalt(10);
      const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

      // Update password
      const response = await axios.patch(`http://localhost:9999/users/${userId}`, {
        password: hashedNewPassword
      });

      if (response.status === 200) {
        toast.success('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error('Failed to change password');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }
  };

  return (
    <LayoutUser>
      <div className="container">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
      </div>
    </LayoutUser>
  );
};

export default ChangePassword;