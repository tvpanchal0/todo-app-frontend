import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Your Todo List</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TaskList token={token} />
        </div>
      </main>
    </div>
  );
};

export default TodoPage;
