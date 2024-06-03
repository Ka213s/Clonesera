import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../page/HomePage';
import Login from '../page/Login';
import Register from '../page/Register';
import AdminHome from '../page/Admin/AdminHome';
import StudentProfile from '../page/Student/StudentProfile';
import InstructorProfile from '../page/Instructor/InstructorProfile';
import StudentHome from '../page/Student/StudentHome';
import ProtectedRoute from './ProtectedRoute';

const AppRouters: React.FC = () => {
  return (
    // ADMIN LÀ 1 - STUDENT LÀ 2 - INSTRUCTOR LÀ 3
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminhome" element={<ProtectedRoute allowedRoles={[1]}><AdminHome /></ProtectedRoute>} />
        <Route path="/profile-student" element={<ProtectedRoute allowedRoles={[2]}><StudentProfile /></ProtectedRoute>} />
        <Route path="/profile-instructor" element={<ProtectedRoute allowedRoles={[3]}><InstructorProfile /></ProtectedRoute>} />
        <Route path="/studenthome" element={<ProtectedRoute allowedRoles={[2]}><StudentHome /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default AppRouters;
