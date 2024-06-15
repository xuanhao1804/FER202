import React from 'react';

const LoginForm = () => {
  return (

        <div className="row d-flex justify-content-center align-items-center h-100">

            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
                  <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeEmailX">Email</label>
                    <input type="email" id="typeEmailX" cl  assName="form-control form-control-lg" />

                  </div>
                  <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typePasswordX">Password</label>
                    <input type="password" id="typePasswordX" className="form-control form-control-lg" />

                  </div>
                  <p className="small mb-5 pb-lg-2"><a href="#!" className="text-white-50">Forgot password?</a></p>
                  <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                  </div>
                </div>
                <div>
                  <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
                </div>
              </div>

          </div>
        </div>

  );
};

export default LoginForm;