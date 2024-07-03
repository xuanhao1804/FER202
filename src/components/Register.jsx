import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Perform registration logic here
    console.log('Register:', email, password, confirmPassword);
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
          <label className="form-label" htmlFor="typeEmailX-2">
              Email
            </label>
            <input
              type="email"
              id="typeEmailX-2"
              className="form-control form-control-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="typeConfirmPasswordX-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="typeConfirmPasswordX-2"
              className="form-control form-control-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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