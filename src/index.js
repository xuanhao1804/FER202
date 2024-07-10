import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import '../node_modules/startbootstrap-sb-admin-2/vendor/jquery/jquery.min.js'
import '../node_modules/startbootstrap-sb-admin-2/vendor/bootstrap/js/bootstrap.bundle.min.js'
import '../node_modules/startbootstrap-sb-admin-2/vendor/fontawesome-free/css/all.min.css'
import '../node_modules/startbootstrap-sb-admin-2/css/sb-admin-2.min.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <App/>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

