import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../page/HomePage';
import Login from '../page/Login';
import Logout from '../components/Logout';
import Register from '../page/Register';
import AdminHome from '../page/Admin/ManageAccount';
import AdminDashboard from '../page/Admin/Dashboard';
import AdminUser from '../page/Admin/User';
import ProtectedRoute from './ProtectedRoute';
import StudentDashboard from '../page/Student/StudentDashboard';
import PurchasedCourses from '../page/Student/PurchasedCourse';
import StudentCertificates from '../components/StudentCertificates';
import CreateNewCousre from '../components/Create_Course/CreateNewCousre';
import ListCourse from "../page/Instructor/ListCourse";
import Dashboard from "../page/Instructor/Dashboard";
import Analysis from "../page/Instructor/Analysis";
import Messages from "../components/Messages";
import Notifications from "../components/Notifications";
import MyCertificate from "../components/StudentCertificates";
import CreateCourse from "../page/Instructor/CreateCourse";
import Reviews from "../components/Reviews";
import Earning from "../page/Instructor/Earning";
import PayOut from "../page/Instructor/PayOut";
import Statements from "../page/Student/Statements";
import Verification from "../page/Instructor/Verification";
import SettingsPage from "../components/SettingsPage";
import SendFeedback from '../page/Student/SendFeedback';
import CourseDetailPage from '../page/CourseDetailPage';
import ViewProfile from '../page/Instructor/ViewProfile';
import CertificationCenter from '../page/CertificationCenter';
import CertificationForm from '../page/CertificationForm';
import CertificationTestView from '../page/CertificationTestView';
import CertificationTestResult from '../page/CertificationTestResult';

const AppRouters: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminhome" element={<ProtectedRoute allowedRoles={[1]}><AdminHome /></ProtectedRoute>} />
        <Route path="/admin_dashboard" element={<ProtectedRoute allowedRoles={[1]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin_user" element={<ProtectedRoute allowedRoles={[1]}><AdminUser /></ProtectedRoute>} />
        <Route path="/student_dashboard" element={<ProtectedRoute allowedRoles={[2]}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student_purchased_courses" element={<ProtectedRoute allowedRoles={[2]}><PurchasedCourses /></ProtectedRoute>} />
        <Route path="/student_my_certificates" element={<ProtectedRoute allowedRoles={[2]}><StudentCertificates /></ProtectedRoute>} />
        <Route path="/student_notifications" element={<ProtectedRoute allowedRoles={[2]}><Notifications /></ProtectedRoute>} />
        <Route path="/student_reviews" element={<ProtectedRoute allowedRoles={[2]}><Reviews /></ProtectedRoute>} />
        <Route path="/student_messages" element={<ProtectedRoute allowedRoles={[2]}><Messages /></ProtectedRoute>} />
        <Route path="/student_statements" element={<ProtectedRoute allowedRoles={[2]}><Statements /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute allowedRoles={[2]}><SendFeedback /></ProtectedRoute>} />
        <Route path="/create-course" element={<ProtectedRoute allowedRoles={[3]}><CreateNewCousre /></ProtectedRoute>} />
        <Route path="/instructor_courses" element={<ProtectedRoute allowedRoles={[3]}><ListCourse /></ProtectedRoute>} />
        <Route path="/instructor_dashboard" element={<ProtectedRoute allowedRoles={[3]}><Dashboard /></ProtectedRoute>} />
        <Route path="/instructor_analysis" element={<ProtectedRoute allowedRoles={[3]}><Analysis /></ProtectedRoute>} />
        <Route path="/instructor_messages" element={<ProtectedRoute allowedRoles={[3]}><Messages /></ProtectedRoute>} />
        <Route path="/instructor_notifications" element={<ProtectedRoute allowedRoles={[3]}><Notifications /></ProtectedRoute>} />
        <Route path="/instructor_my_certificates" element={<ProtectedRoute allowedRoles={[3]}><MyCertificate /></ProtectedRoute>} />
        <Route path="/instructor_create_course" element={<ProtectedRoute allowedRoles={[3]}><CreateCourse /></ProtectedRoute>} />
        <Route path="/instructor_verification" element={<ProtectedRoute allowedRoles={[3]}><Verification /></ProtectedRoute>} />
        <Route path="/instructor_reviews" element={<ProtectedRoute allowedRoles={[3]}><Reviews /></ProtectedRoute>} />
        <Route path="/instructor_earning" element={<ProtectedRoute allowedRoles={[3]}><Earning /></ProtectedRoute>} />
        <Route path="/instructor_payout" element={<ProtectedRoute allowedRoles={[3]}><PayOut /></ProtectedRoute>} />
        <Route path="/instructor_statements" element={<ProtectedRoute allowedRoles={[3]}><Statements /></ProtectedRoute>} />
        <Route path="/view_instructor_profile" element={<ProtectedRoute allowedRoles={[2,3]}><ViewProfile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={[2, 3]}><SettingsPage /></ProtectedRoute>} />
        <Route path="/course/:courseId" element={<CourseDetailPage />} />
        <Route path="/tests/certification-center" element={<ProtectedRoute allowedRoles={[2, 3]}><CertificationCenter /></ProtectedRoute>} />
        <Route path="/tests/certification-fill-form" element={<CertificationForm />} />
        <Route path="/tests/test-view" element={<ProtectedRoute allowedRoles={[2, 3]}><CertificationTestView /></ProtectedRoute>} />
        <Route path="/tests/test-result" element={<ProtectedRoute allowedRoles={[2, 3]}><CertificationTestResult /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default AppRouters;
