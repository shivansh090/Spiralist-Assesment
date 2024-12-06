import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

const AddEditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTask, updateTask, getTaskById } = useTaskContext();

  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const existingTask = getTaskById(Number(id));
      if (existingTask) {
        setTask(existingTask);
      }
    }
  }, [id, getTaskById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!task.title.trim()) newErrors.title = 'Title is required';
    if (!task.description.trim()) newErrors.description = 'Description is required';
    if (!task.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (id) {
        updateTask(Number(id), task);
      } else {
        addTask(task);
      }
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <div className="flex items-center">
            <button onClick={() => navigate('/')} className="mr-4 text-white hover:text-indigo-100 transition-colors duration-200">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-white">{id ? 'Edit Task' : 'Add New Task'}</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200`}
              placeholder="Enter task title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500 flex items-center"><AlertCircle size={16} className="mr-1" /> {errors.title}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200`}
              rows={4}
              placeholder="Describe your task"
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-500 flex items-center"><AlertCircle size={16} className="mr-1" /> {errors.description}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full border ${errors.dueDate ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200`}
              />
              {errors.dueDate && <p className="mt-1 text-sm text-red-500 flex items-center"><AlertCircle size={16} className="mr-1" /> {errors.dueDate}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="flex space-x-4">
              {['Pending', 'In Progress', 'Completed'].map((status) => (
                <label key={status} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={task.status === status}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2">{status}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center"
          >
            <Save size={20} className="mr-2" />
            {id ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditTaskPage;

