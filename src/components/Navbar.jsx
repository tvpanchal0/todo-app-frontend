import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null); // Update state to reflect user is logged out
    navigate('/login'); 
};

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Todo App</h1>
        <div className="space-x-4">
          {/* Conditionally render the links */}
          {!token ? (
            <>
              <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-200">Signup</Link>
            </>
          ) : (
            <button 
              onClick={handleLogout} 
              className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
           
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
