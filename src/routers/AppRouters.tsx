import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Components
import HomePage from '../page/HomePage';
import Login from '../page/Login';
import Logout from '../components/Logout';
import Register from '../page/Register';

// Admin Pages and Components
import Courses from '../page/Admin/Courses';
import CourseDetail from '../page/Admin/CourseDetail';
import AdminDashboard from '../page/Admin/Dashboard';
import AdminUser from '../page/Admin/User';
import CoursesPending from '../page/Admin/CoursesPending';
import Review from '../page/Admin/Review';
import CategoryManagement from '../page/Admin/CategoryManagement';

// Student Pages and Components
import StudentDashboard from '../page/Student/StudentDashboard';
import PurchasedCourses from '../page/Student/PurchasedCourse';
import StudentCertificates from '../components/StudentCertificates';
import SendFeedback from '../page/Student/SendFeedback';
import Statements from '../page/Student/Statements';
import MyCertificate from '../components/StudentCertificates';

// Instructor Pages and Components
import ListCourse from '../page/Instructor/ListCourse';
import Dashboard from '../page/Instructor/Dashboard';
import Analysis from '../page/Instructor/Analysis';
import CreateCourse from '../page/Instructor/CreateCourse';
import Verification from '../page/Instructor/Verification';
import ViewProfile from '../page/Instructor/ViewProfile';
import Earning from '../page/Instructor/Earning';
import PayOut from '../page/Instructor/PayOut';
import StatementsIns from "../page/Instructor/StatementsIns";

// Shared Components
import Messages from '../components/Messages';
import Notifications from '../components/Notifications';
import Reviews from '../components/Reviews';
import SettingsPage from '../components/SettingsPage';

// Certification Pages and Components
import CertificationCenter from '../page/CertificationCenter';
import CertificationForm from '../page/CertificationForm';
import CertificationTestView from '../page/CertificationTestView';
import CertificationTestResult from '../page/CertificationTestResult';

// Other Components
import CourseDetailPage from '../page/CourseDetailPage';
import HelpPage from '../page/HelpPage';
import ProtectedRoute from './ProtectedRoute';
import CreateNewCousre from '../components/Create_Course/CreateNewCousre';
import EnrollCourse from '../page/Student/EnrollCourse';

const AppRouters: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/course/:courseId" element={<CourseDetailPage />} />
        <Route path="/tests/certification-fill-form" element={<CertificationForm />} />
        <Route path="/help" element={<HelpPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={[1]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/user" element={<ProtectedRoute allowedRoles={[1]}><AdminUser /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={[1]}><Courses /></ProtectedRoute>} />
        <Route path="/admin/course/:id" element={<ProtectedRoute allowedRoles={[1]}><CourseDetail /></ProtectedRoute>} />
        <Route path="/admin/pending_courses" element={<ProtectedRoute allowedRoles={[1]}><CoursesPending /></ProtectedRoute>} />
        <Route path="/admin/reviews" element={<ProtectedRoute allowedRoles={[1]}><Review /></ProtectedRoute>} />
        <Route path="/admin/category-management" element={<ProtectedRoute allowedRoles={[1]}><CategoryManagement /></ProtectedRoute>} />

        {/* Student Routes */}
        <Route path="/student_dashboard" element={<ProtectedRoute allowedRoles={[2]}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student_purchased_courses" element={<ProtectedRoute allowedRoles={[2]}><PurchasedCourses /></ProtectedRoute>} />
        <Route path="/student_my_certificates" element={<ProtectedRoute allowedRoles={[2]}><StudentCertificates /></ProtectedRoute>} />
        <Route path="/student_notifications" element={<ProtectedRoute allowedRoles={[2]}><Notifications /></ProtectedRoute>} />
        <Route path="/student_reviews" element={<ProtectedRoute allowedRoles={[2]}><Reviews /></ProtectedRoute>} />
        <Route path="/student_messages" element={<ProtectedRoute allowedRoles={[2]}><Messages /></ProtectedRoute>} />
        <Route path="/student_statements" element={<ProtectedRoute allowedRoles={[2]}><Statements /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute allowedRoles={[2]}><SendFeedback /></ProtectedRoute>} />
        <Route path="/student_enroll_course" element={<ProtectedRoute allowedRoles={[2]}><EnrollCourse /></ProtectedRoute>} />
        
        {/* Instructor Routes */}
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
        <Route path="/instructor_statements" element={<ProtectedRoute allowedRoles={[3]}><StatementsIns /></ProtectedRoute>} />
        
        {/* Shared Routes */}
        <Route path="/view_instructor_profile" element={<ProtectedRoute allowedRoles={[2,3]}><ViewProfile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={[2, 3]}><SettingsPage /></ProtectedRoute>} />
        <Route path="/tests/certification-center" element={<ProtectedRoute allowedRoles={[2, 3]}><CertificationCenter /></ProtectedRoute>} />
        <Route path="/tests/test-view" element={<ProtectedRoute allowedRoles={[2, 3]}><CertificationTestView /></ProtectedRoute>} />
        <Route path="/tests/test-result" element={<ProtectedRoute allowedRoles={[2, 3]}><CertificationTestResult /></ProtectedRoute>} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default AppRouters;
