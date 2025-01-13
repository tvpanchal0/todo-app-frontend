import React, { useState } from 'react';

const TaskItem = ({ task, onDelete, onToggleCompletion, onEdit }) => {
  if (!task) return null; // Prevent rendering if task is undefined or null

  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(task.text);

  const handleSaveEdit = () => {
    if (updatedText !== task.text) {
      // Only call update if the text has changed
      onEdit(task._id, updatedText);
    }
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-4 border-b border-gray-300">
    {isEditing ? (
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSaveEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    ) : (
      <div className="flex items-center space-x-4 w-full">
        {/* Task text with line-through if completed */}
        <span
          className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}
          onClick={() => onToggleCompletion(task._id, task.completed, task.text)}
        >
          {task.text}
        </span>
  
        {/* New button for Marking Task as Completed */}
        {!task.completed && (
          <button
            onClick={() => onToggleCompletion(task._id, task.completed, task.text)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Mark Task as Completed
          </button>
        )}
  
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onDelete(task._id)}
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
        </div>
      </div>
    )}
  </li>
  
  );
};

export default TaskItem;
