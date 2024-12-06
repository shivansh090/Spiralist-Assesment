import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskListPage from './pages/TaskListPage';
import AddEditTaskPage from './pages/AddEditTaskPage';
import Header from './components/Header';

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<TaskListPage />} />
              <Route path="/add-task" element={<AddEditTaskPage />} />
              <Route path="/edit-task/:id" element={<AddEditTaskPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;

