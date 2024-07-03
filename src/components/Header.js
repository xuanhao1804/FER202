import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Header() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name || user.email); // Use user name if available, otherwise use email
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserName('');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="header">
      <img src="https://ocd.fpt.edu.vn/Content/images/landing/logo.png" alt="Logo" />
      <nav>
        <ul>
          {userName ? (
            <>
              <Link to="/aaa" className="user-greeting">
                <p className="font">Xin chào, {userName}!</p>
              </Link>
              <Link to="#" className="font logout" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login" className="font logout">
              Login
            </Link>
          )}
          <Link to="/about" className="font">
            About
          </Link>
        </ul>
      </nav>
      
      <style>
        {`
        .header {
          padding: 10px;
        }

        .header img {
          height: 50px;
        }

        nav ul {
          list-style: none;
          display: flex;
          align-items: center;
          padding: 0;
        }

        .user-greeting {
          margin-right: 40px; /* Adjust the margin to create desired spacing */
          text-decoration: none; /* Remove underline from the link itself */
          display: flex;
          align-items: center;
          border-radius: 5px;
          padding: 10px 15px;
          color: #5895ff;
          height: 40px; /* Ensure same height */
          border: 2px solid #5895ff; /* Add border and make it thicker */
          box-sizing: border-box; /* Ensure border-box sizing */
        }

        nav ul a {
          margin-right: 20px;
          font-weight: bold;
          border-radius: 5px;
          padding: 10px 15px;
          color: black; /* Change to black color for normal links */
          text-decoration: underline; /* Add underline to text */
          display: flex;
          align-items: center;
          height: 40px; /* Ensure same height */
        }

        nav ul a.logout {
          background-color: orange;
          color: white;
        }

        nav ul a.logout:hover {
          background-color: darkorange;
        }

        .user-greeting p {
          font-weight: bold;
          border-radius: 5px;
          padding: 10px 15px;
          color: #5895ff; /* Change to blue color for user greeting */
          text-decoration: underline; /* Add underline to text */
          margin: 0; /* Remove default margin */
          display: flex;
          align-items: center;
          height: 40px; /* Ensure same height */
        }
      `}
      </style>
    </div>
  );
}

export default Header;
