import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { getTasks, createTask, deleteTask, updateTask } from '../services/api';

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(''); // State for tracking error message

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskList = await getTasks(token);
        setTasks(taskList || []); // Ensure tasks are always an array
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [token]);

  const handleAddTask = async () => {
    if (newTask.trim() === '' || newTask.length < 3) {
      setError('Task text must be at least 3 characters long.'); // Set error message
      return;
    }

    const taskData = { text: newTask, completed: false }; // New task has completed set to false
    try {
      const createdTask = await createTask(taskData, token);
      setTasks([...tasks, createdTask]);
      setNewTask('');
      setError(''); // Clear the error after a successful task creation
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleCompletion = async (taskId, completed, updatedText) => {
    const updatedData = { text: updatedText, completed: !completed };
    try {
      const updatedTask = await updateTask(taskId, updatedData, token);
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditTask = async (taskId, updatedText) => {
    if (!taskId || !updatedText) return; // Prevent execution if taskId or updatedText is missing

    try {
      const updatedTask = await updateTask(taskId, { text: updatedText }, token);
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Task List</h2>

        {/* Show error message above task list */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Add new task */}
        <div className="mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddTask}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>

        {/* Task list */}
        <ul className="mt-6">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => {
              if (!task) return null;  // Prevent rendering null tasks
              return (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggleCompletion={handleToggleCompletion}
                  onEdit={handleEditTask} // Pass the handleEditTask function
                />
              );
            })
          ) : (
            <p className="text-center text-gray-500">No tasks available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
