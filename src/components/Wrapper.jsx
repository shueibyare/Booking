import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Wrapper = ({ token, handleLogout, children }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side navigation */}
            <div className="flex items-center space-x-8">
              <Link 
                    to="/" 
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                    <img 
                        src="/ambasa1.jpg" 
                        alt="Ambasa Coach Logo" 
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="text-xl font-bold">Ambasa Coach</span>
                </Link>

              
              {token && (
                <Link 
                  to='/my-bookings' 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                >
                  My Bookings
                </Link>
              )}
            </div>

            {/* Right side navigation */}
            <div className="flex items-center space-x-4">
              {token ? (
                <button 
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Register
                  </Link>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white shadow-sm rounded-lg p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TravelEase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Wrapper;