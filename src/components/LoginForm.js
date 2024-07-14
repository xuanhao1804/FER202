import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import bcryptjs from 'bcryptjs';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:9999/users');
      const user = response.data.find(u => u.email === usernameOrEmail || u.username === usernameOrEmail);
      
      if (user) {
        const isMatch = await bcryptjs.compare(password, user.password);
        if (isMatch) {
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          toast.success('Logged in successfully');
          navigate('/');
        } else {
          toast.error('Invalid username/email or password');
        }
      } else {
        toast.error('Invalid username/email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login: ' + error.message);
    }
  };


  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name, sub: googleId } = decoded;

      const response = await axios.get('http://localhost:9999/users');
      let user = response.data.find(u => u.email === email);

      if (user) {
        // User exists, update Google ID if necessary
        if (!user.googleId) {
          user.googleId = googleId;
          await axios.put(`http://localhost:9999/users/${user.id}`, user);
        }
      } else {
        // Create new user
        const newUser = {
          email,
          fullName: name,
          googleId,
          isEmailVerified: true,
          role: "student",
          avatar: decoded.picture || "https://example.com/default-avatar.jpg",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          // Add other required fields with default values
          username: email.split('@')[0], // Using email as default username
          password: await bcryptjs.hash(googleId, 10), // Using googleId as password
          gender: "not specified",
          address: "",
          phone: "",
          studentID: null,
          balance: 0
        };
        const newUserResponse = await axios.post("http://localhost:9999/users", newUser);
        user = newUserResponse.data;
      }

      const { password, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast.success('Logged in with Google successfully');
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to login with Google: ' + error.message);
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5 text-center">
              <Link to="/">
                <img src="https://ocd.fpt.edu.vn/Content/images/landing/logo.png" alt="Logo" />
              </Link>
              <h1></h1>
              <h3 className="mb-5">Sign in</h3>
              <form onSubmit={handleLogin}>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="typeUsernameOrEmailX-2">
            Username or Email
          </label>
          <input
            type="text"
            id="typeUsernameOrEmailX-2"
            className="form-control form-control-lg"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="typePasswordX-2">
            Password
          </label>
          <input
            type="password"
            id="typePasswordX-2"
            className="form-control form-control-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

          <div className="form-check d-flex justify-content-start mb-4">
            <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
            <label className="form-check-label" htmlFor="form1Example3">
              Remember password
            </label>
          </div>

          <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" type="submit">
                  Login
                </button>
              </form>

              <hr className="my-4" />

              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Login Failed');
                  toast.error('Google login failed');
                }}
              />

              <p></p>
              <div className="form-link">
                <span>Don't have an account? </span>
                <Link to="/register">Sign Up</Link>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;