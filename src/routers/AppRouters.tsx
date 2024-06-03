import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../page/HomePage';
import Login from '../page/Login';
import Register from '../page/Register';
import AdminHome from '../page/Admin/AdminHome';
import StudentProfile from '../page/Student/StudentProfile';

import ProtectedRoute from './ProtectedRoute';
import StudentDashboard from '../page/Student/StudentDashboard';
import PurchasedCourses from '../page/Student/PurchasedCourse';
import StudentCertificates from '../page/Student/StudentCertificates';

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
        {/* <Route path="/profile-instructor" element={<ProtectedRoute allowedRoles={[3]}><InstructorProfile /></ProtectedRoute>} /> */}
        <Route path="/student_dashboard" element={<ProtectedRoute allowedRoles={[2]}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student_purchased_courses" element={<ProtectedRoute allowedRoles={[2]}><PurchasedCourses /></ProtectedRoute>} />
        <Route path="/student_my_certificates" element={<ProtectedRoute allowedRoles={[2]}><StudentCertificates /></ProtectedRoute>} />
        {/* <Route path="/studenthome" element={<ProtectedRoute allowedRoles={[2]}><StudentHome /></ProtectedRoute>} /> */}
      </Routes>
    </Router>
  );
}

export default AppRouters;
