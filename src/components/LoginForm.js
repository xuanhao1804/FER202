import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Login:', email, password);
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
          <label className="form-label" htmlFor="typeEmailX-2">
              Email
            </label>
            <input
              type="text"
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

        <hr className="my-1" />

        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-lg btn-block btn-primary" style={{ backgroundColor: '#dd4b39' }} type="submit">
          <i className="fab fa-google me-2"></i> Sign in with google
        </button>

        {/* <button data-mdb-button-init data-mdb-ripple-init className="btn btn-lg btn-block btn-primary mb-2" style={{ backgroundColor: '#3b5998' }} type="submit">
          <i className="fab fa-facebook-f me-2"></i>Sign in with facebook
        </button> */}
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