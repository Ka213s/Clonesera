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
import InstructorLayout from '../layouts/InstructorLayout';
import ListCourse from "../page/Instructor/ListCourse";
import Dashboard from "../page/Instructor/Dashboard";
import Analyics from "../page/Instructor/Analyics";
import Messages from "../page/Instructor/Messages";
import Notifications from "../page/Instructor/Notifications";
import MyCertificate from "../page/Instructor/MyCertificate";
import CreateCourse from "../page/Instructor/CreateCourse";
import Reviews from "../page/Instructor/Reviews";
import Earning from "../page/Instructor/Earning";
import PayOut from "../page/Instructor/PayOut";
import Statements from "../page/Instructor/Statements";
import Verification from "../page/Instructor/Verification";
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
        <Route path="/instructor_courses" element={<InstructorLayout><ListCourse /></InstructorLayout>} />
        <Route path="/instructor_dashboard" element={<InstructorLayout><Dashboard /></InstructorLayout>} />
        <Route path="/instructor_analyics" element={<InstructorLayout><Analyics /></InstructorLayout>} />
        <Route path="/instructor_messages" element={<InstructorLayout><Messages /></InstructorLayout>} />
        <Route path="/instructor_notifications" element={<InstructorLayout><Notifications /></InstructorLayout>} />
        <Route path="/instructor_my_certificates" element={<InstructorLayout><MyCertificate /></InstructorLayout>} />
        <Route path="/instructor_create_course" element={<InstructorLayout><CreateCourse /></InstructorLayout>} />
        <Route path="/instructor_reviews" element={<InstructorLayout><Reviews /></InstructorLayout>} />
        <Route path="/instructor_earning" element={<InstructorLayout><Earning /></InstructorLayout>} />
        <Route path="/instructor_payout" element={<InstructorLayout><PayOut /></InstructorLayout>} />
        <Route path="/instructor_statements" element={<InstructorLayout><Statements /></InstructorLayout>} />
        <Route path="/instructor_verification" element={<InstructorLayout><Verification /></InstructorLayout>} />
        <Route path="/setting" element={<ProtectedRoute allowedRoles={[2]}><SettingsPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default AppRouters;
