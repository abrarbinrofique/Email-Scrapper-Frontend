import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NabVar = () => {
  const usertoken = localStorage.getItem('token');
  const isAuthenticated = usertoken !== null;
  const navigate = useNavigate(); // Hook to programmatically navigate

  const logOut = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100">
          <div>
            <Link className="navbar-brand text-white" to="/">MailScrapper</Link>
          </div>
          <div>
            <ul className="navbar-nav d-flex flex-row">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-success text-white me-2" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary text-white" to="/signup">Signup</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={logOut}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NabVar;
