import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from '../layouts/MainLayout';
// Page Components
import HomePage from '../page/HomePage';
import Login from '../page/Login';
import ForgotPassword from '../page/ForgotPassword';
import Logout from '../components/Logout';
import Register from '../page/Register';
import VerifiMail from '../page/VerifyEmail';
import VerifyEmailDone from '../page/VerifyEmailDone';
import PageError201 from '../page/Error/PageError201';
import PageError202 from '../page/Error/PageError202';
import PageError204 from '../page/Error/PageError204';
import PageError404 from '../page/Error/PageError404';
import PageError403 from '../page/Error/PageError403';
import PageError400 from '../page/Error/PageError400';
import PageError401 from '../page/Error/PageError401';
import PageError500 from '../page/Error/PageError500';
import PageError501 from '../page/Error/PageError501';
import BecomeInstructor from '../page/BecomeInstructor';
// Admin Pages and Components
import Courses from '../page/Admin/Courses';
import CourseDetail from '../page/Admin/CourseDetail';
import AdminDashboard from '../page/Admin/Dashboard';
import CoursesPending from '../page/Admin/CoursesPending';
import Review from '../page/Admin/Review';
// import CategoryManagement from '../page/Admin/CategoryManagement';
import AllInstructor from '../page/Admin/allIUser';
import AddInstructor from '../page/Admin/addIUser';
import EditCourse from '../page/Admin/EditCourse';
import RequestManagement from '../page/Admin/RequestManagement';
// Student Pages and Components
import StudentDashboard from '../page/Student/StudentDashboard';
import PurchasedCourses from '../page/Student/PurchasedCourse';
import StudentCertificates from '../components/StudentCertificates';
import SendFeedback from '../page/Student/SendFeedback';
import Statements from '../page/Student/Statements';
import EnrollCourse from '../page/Student/EnrollCourse';
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
import StatementsIns from '../page/Instructor/StatementsIns';
import MyLesson from '../page/Instructor/MyLesson';

// Shared Components
import Messages from '../components/Messages';
import Notifications from '../components/Notifications';
import Reviews from '../components/Reviews';
import SettingsPage from '../page/SettingsPage';

// Certification Pages and Components
import CertificationCenter from '../page/CertificationCenter';
import CertificationForm from '../page/CertificationForm';
import CertificationTestView from '../page/CertificationTestView';
import CertificationTestResult from '../page/CertificationTestResult';

// Other Components
import CourseDetailPage from '../page/CourseDetailPage';
import HelpPage from '../page/HelpPage';
import ProtectedRoute from './ProtectedRoute';
import PurchasedCourseDetail from '../page/Student/PurchasedCourseDetail';
import PaymentPage from '../components/PaymentPage';
import Category from '../page/Admin/Category';


const AppRouters: React.FC = () => {
  return (
    <Router>
        <RoutesWrapper />
        <ToastContainer />
    </Router>
  );
};

const RoutesWrapper: React.FC = () => {
  const location = useLocation();
  const noSidebarPaths = ['/login', '/register', '/forgot-password', '/verify-email','/201', '/202', '/204', '/404', '/403', '/400', '/401', '/500', '/501'];

  const renderRoutes = () => (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifiMail />} />
      <Route path="/course/:courseId" element={<CourseDetailPage />} />
      <Route path="/tests/certification-fill-form" element={<CertificationForm />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/become-instructor" element={<BecomeInstructor />} />
      <Route path="https://clonesera.vercel.app/verify-email/b0142e5e78d035d2edb906d2b944d4e5" element={<VerifyEmailDone />} />
      <Route path="https://clonesera.vercel.app/verify-email/:id" element={<VerifyEmailDone />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/201" element={<PageError201 />} />
      <Route path="/202" element={<PageError202 />} />
      <Route path="/204" element={<PageError204 />} />
      <Route path="/404" element={<PageError404 />} />
      <Route path="/403" element={<PageError403 />} />
      <Route path="/401" element={<PageError401 />} />
      <Route path="/400" element={<PageError400 />} />
      <Route path="/500" element={<PageError500 />} />
      <Route path="/501" element={<PageError501 />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={['admin']}><Courses /></ProtectedRoute>} />
      <Route path="/admin/course/:id" element={<ProtectedRoute allowedRoles={['admin']}><CourseDetail /></ProtectedRoute>} />
      <Route path="/admin/pending_courses" element={<ProtectedRoute allowedRoles={['admin']}><CoursesPending /></ProtectedRoute>} />
      <Route path="/admin/reviews" element={<ProtectedRoute allowedRoles={['admin']}><Review /></ProtectedRoute>} />
      <Route path="/admin/category-management" element={<ProtectedRoute allowedRoles={['admin']}><Category /></ProtectedRoute>} />
      <Route path="/admin/allIUser" element={<ProtectedRoute allowedRoles={['admin']}><AllInstructor /></ProtectedRoute>} />
      <Route path="/admin/addUser" element={<ProtectedRoute allowedRoles={['admin']}><AddInstructor /></ProtectedRoute>} />
      <Route path="/admin/editCourse/:id" element={<ProtectedRoute allowedRoles={['admin']}><EditCourse /></ProtectedRoute>} />
      <Route path="/admin/requestManagement" element={<ProtectedRoute allowedRoles={['admin']}><RequestManagement /></ProtectedRoute>} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/purchasedCourses" element={<ProtectedRoute allowedRoles={['student']}><PurchasedCourses /></ProtectedRoute>} />
      <Route path="/student/myCertificates" element={<ProtectedRoute allowedRoles={['student']}><StudentCertificates /></ProtectedRoute>} />
      <Route path="/student/notifications" element={<ProtectedRoute allowedRoles={['student']}><Notifications /></ProtectedRoute>} />
      <Route path="/student/reviews" element={<ProtectedRoute allowedRoles={['student']}><Reviews /></ProtectedRoute>} />
      <Route path="/student/messages" element={<ProtectedRoute allowedRoles={['student']}><Messages /></ProtectedRoute>} />
      <Route path="/student/statements" element={<ProtectedRoute allowedRoles={['student']}><Statements /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute allowedRoles={['student']}><SendFeedback /></ProtectedRoute>} />

      {/* Instructor Routes */}
      <Route path="/createCourse" element={<ProtectedRoute allowedRoles={['instructor']}><CreateCourse /></ProtectedRoute>} />
      <Route path="/instructor/courses" element={<ProtectedRoute allowedRoles={['instructor']}><ListCourse /></ProtectedRoute>} />
      <Route path="/instructor/dashboard" element={<ProtectedRoute allowedRoles={['instructor']}><Dashboard /></ProtectedRoute>} />
      <Route path="/instructor/analysis" element={<ProtectedRoute allowedRoles={['instructor']}><Analysis /></ProtectedRoute>} />
      <Route path="/instructor/messages" element={<ProtectedRoute allowedRoles={['instructor']}><Messages /></ProtectedRoute>} />
      <Route path="/instructor/notifications" element={<ProtectedRoute allowedRoles={['instructor']}><Notifications /></ProtectedRoute>} />
      <Route path="/instructor/myCertificates" element={<ProtectedRoute allowedRoles={['instructor']}><MyCertificate /></ProtectedRoute>} />
      <Route path="/instructor/verification" element={<ProtectedRoute allowedRoles={['instructor']}><Verification /></ProtectedRoute>} />
      <Route path="/instructor/reviews" element={<ProtectedRoute allowedRoles={['instructor']}><Reviews /></ProtectedRoute>} />
      <Route path="/instructor/earning" element={<ProtectedRoute allowedRoles={['instructor']}><Earning /></ProtectedRoute>} />
      <Route path="/instructor/payout" element={<ProtectedRoute allowedRoles={['instructor']}><PayOut /></ProtectedRoute>} />
      <Route path="/instructor/statements" element={<ProtectedRoute allowedRoles={['instructor']}><StatementsIns /></ProtectedRoute>} />
      <Route path="/instructor/myLesson" element={<ProtectedRoute allowedRoles={['instructor']}><MyLesson /></ProtectedRoute>} />

      {/* Shared Routes */}
      <Route path="/view_instructor_profile" element={<ProtectedRoute allowedRoles={['student', 'instructor']}><ViewProfile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute allowedRoles={['student', 'instructor']}><SettingsPage /></ProtectedRoute>} />
      <Route path="/tests/certification-center" element={<ProtectedRoute allowedRoles={['student', 'instructor']}><CertificationCenter /></ProtectedRoute>} />
      <Route path="/tests/test-view" element={<ProtectedRoute allowedRoles={['student', 'instructor']}><CertificationTestView /></ProtectedRoute>} />
      <Route path="/tests/test-result" element={<ProtectedRoute allowedRoles={['student', 'instructor']}><CertificationTestResult /></ProtectedRoute>} />
      <Route path="/purchasedCourse/:courseId" element={<ProtectedRoute allowedRoles={['student', 'instructor']}><PurchasedCourseDetail /></ProtectedRoute>} />
      <Route path="/enrollCourse" element={<ProtectedRoute allowedRoles={['student', 'instructor']}><EnrollCourse /></ProtectedRoute>} />
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );

  return (
    noSidebarPaths.includes(location.pathname) ? renderRoutes() : (
      <MainLayout>
        {renderRoutes()}
      </MainLayout>
    )
  );
};

export default AppRouters;
