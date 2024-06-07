import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../page/HomePage';
import Login from '../page/Login';
import Register from '../page/Register';
import AdminHome from '../page/Admin/AdminHome';
import ProtectedRoute from './ProtectedRoute';
import StudentDashboard from '../page/Student/StudentDashboard';
import PurchasedCourses from '../page/Student/PurchasedCourse';
import StudentCertificates from '../page/Student/StudentCertificates';
import CreateNewCousre from '../components/CreateNewCousre';
import ListCourse from "../page/Instructor/ListCourse";
import Dashboard from "../page/Instructor/Dashboard";
import SettingsPage from "../components/SettingsPage";

const AppRouters: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminhome" element={<ProtectedRoute allowedRoles={[1]}><AdminHome /></ProtectedRoute>} />
        <Route path="/student_dashboard" element={<ProtectedRoute allowedRoles={[2]}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student_purchased_courses" element={<ProtectedRoute allowedRoles={[2]}><PurchasedCourses /></ProtectedRoute>} />
        <Route path="/student_my_certificates" element={<ProtectedRoute allowedRoles={[2]}><StudentCertificates /></ProtectedRoute>} />
        <Route path="/create-course" element={<ProtectedRoute allowedRoles={[3]}><CreateNewCousre /></ProtectedRoute>} />
        <Route path="/instructorhome/list-courses" element={<ProtectedRoute allowedRoles={[3]}><ListCourse /></ProtectedRoute>} />
        <Route path="/instructorhome" element={<ProtectedRoute allowedRoles={[3]}><Dashboard /></ProtectedRoute>} />
        <Route path="/setting" element={<ProtectedRoute allowedRoles={[2]}><SettingsPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default AppRouters;
