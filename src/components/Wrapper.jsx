import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Wrapper = ({ token, handleLogout, children }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container">
          {/* Left: Logo and Nav */}
          <Link to="/" className="navbar-brand d-flex align-items-center text-primary fw-bold">
            <img 
              src="/ambasa1.jpg" 
              alt="Ambasa Coach Logo" 
              className="rounded-circle me-2" 
              style={{ height: '32px', width: '32px', objectFit: 'cover' }} 
            />
            Ambasa Coach
          </Link>

          {/* Right: Navigation Buttons */}
          <div className="d-flex align-items-center ms-auto">
            {token && (
              <Link 
                to="/my-bookings" 
                className="btn btn-outline-secondary me-2"
              >
                My Bookings
              </Link>
            )}

            {token ? (
              <button 
                onClick={logout} 
                className="btn text-white me-2"
                style={{ backgroundColor: '#4F46E5' }} // Bootstrap doesn't have exact Tailwind indigo
              >
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="btn text-primary fw-semibold me-2 border-0"
                  style={{ backgroundColor: 'transparent' }}
                >
                  Register
                </Link>
                <Link 
                  to="/login" 
                  className="btn text-white"
                  style={{ backgroundColor: '#4F46E5' }}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow-1 container py-4">
        <div className="bg-white shadow-sm rounded p-4">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-top py-3 mt-auto">
        <div className="container text-center text-muted small">
          &copy; {new Date().getFullYear()} TravelEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Wrapper;
