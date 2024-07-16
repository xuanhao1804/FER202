import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import bcryptjs from 'bcryptjs';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    gender: 'male',
    address: '',
    phone: '',
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9999/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load user data');
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const isValidate = () => {
    // Username validation
    if (formData.username.trim().length < 3) {
      toast.error('Username must be at least 3 characters long');
      return false;
    }

    // Check if username already exists
    if (users.some(user => user.username === formData.username)) {
      toast.error('This username is already taken');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Check if email already exists
    if (users.some(user => user.email === formData.email)) {
      toast.error('This email is already registered');
      return false;
    }

    // Password validation
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    // Full Name validation
    if (formData.fullName.trim().length < 2) {
      toast.error('Please enter a valid full name');
      return false;
    }

    // Phone validation (simple check for now)
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid phone number (at least 10 digits)');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isValidate()) {
      try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(formData.password, salt);

        const newUser = {
          username: formData.username,
          email: formData.email,
          password: hashedPassword,
          fullName: formData.fullName,
          gender: formData.gender,
          address: formData.address,
          phone: formData.phone,
          role: "student",
          avatar: "https://example.com/default-avatar.jpg",
          googleId: null,
          isEmailVerified: false,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };

        await axios.post("http://localhost:9999/users", newUser);
        toast.success("Registered successfully. Please log in.");
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error);
        toast.error("Failed to register: " + (error.response?.data?.message || error.message));
      }
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
                <h3 className="mb-5">Sign up</h3>
                <form onSubmit={handleRegister}>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control form-control-lg"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control form-control-lg"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control form-control-lg"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control form-control-lg"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="form-control form-control-lg"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
    <label className="form-label">Gender</label>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginLeft:'70px',marginRight: '60px' }}>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={formData.gender === 'male'}
          onChange={handleChange}
          style={{ marginRight: '5px' }}
        />
        <label htmlFor="male">Male</label>
      </div>
      <div>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={formData.gender === 'female'}
          onChange={handleChange}
          style={{ marginRight: '5px' }}
        />
        <label htmlFor="female">Female</label>
      </div>
    </div>
  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="form-control form-control-lg"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control form-control-lg"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" type="submit">
                    Register
                  </button>
                </form>
                <div className="form-link">
                  <p></p>
                  <span>Already have an account? </span>
                  <Link to="/login">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Register;