import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoPage from './pages/TodoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Effect to handle token-based navigation (redirect to login if no token)
  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token'); // Clear token if user logs out
    }
  }, [token]);

  return (
    <Router>
      <div>
      <Navbar token={token} setToken={setToken} />

        <Routes>
          <Route
            path="/todos"
            element={token ? <TodoPage /> : <Navigate to="/login" />} // Redirect to login if no token
          />
          <Route
            path="/login"
            element={<LoginPage setToken={setToken} />} // Pass setToken to LoginPage
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={<h1 className="text-center text-3xl mt-6">Welcome to Todo App</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
