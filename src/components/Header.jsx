import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, PlusCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center text-indigo-600">
          <CheckSquare className="mr-2" size={28} />
          <span className="hidden sm:inline">Task Master</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Tasks</Link>
          <Link to="/add-task" className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-200 flex items-center">
            <PlusCircle size={20} className="mr-1" />
            <span className="hidden sm:inline">Add Task</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

