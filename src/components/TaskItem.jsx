import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { CheckCircle, Edit, Trash2, Clock } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleStatusToggle = () => {
    updateTask(task.id, { status: task.status === 'Pending' ? 'Completed' : 'Pending' });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteTask(task.id);
    setShowDeleteModal(false);
  };

  const priorityColor = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
  }[task.priority];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${priorityColor}`}>
            {task.priority}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock size={16} className="mr-1" />
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
            task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {task.status}
          </span>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
        <button
          onClick={handleStatusToggle}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          title={task.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
        >
          <CheckCircle size={20} />
        </button>
        <Link to={`/edit-task/${task.id}`} className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200" title="Edit Task">
          <Edit size={20} />
        </Link>
        <button onClick={handleDelete} className="text-red-600 hover:text-red-800 transition-colors duration-200" title="Delete Task">
          <Trash2 size={20} />
        </button>
      </div>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
};

export default TaskItem;

