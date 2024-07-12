import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';

// Public Pages and Components
const AnotherPage = lazy(() => import('../pages/AnotherPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const Login = lazy(() => import('../pages/Login'));
const Logout = lazy(() => import('../components/Logout'));
const Register = lazy(() => import('../pages/Register'));
const Category = lazy(() => import('../pages/Category'));
const SettingPage = lazy(() => import('../pages/SettingPage'));
const Course = lazy(() => import('../pages/Instructor/CreateCourse'));
const VerifyEmail = lazy(() => import('../components/VerifyEmailDone'));

const PageError404 = lazy(() => import('../pages/Error/PageError404'));
const PageError500 = lazy(() => import('../pages/Error/PageError500'));
const PageError403 = lazy(() => import('../pages/Error/PageError403'));

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Suspense>
                <Routes>
                    {/* Routes with MainLayout */}
                    <Route element={<LayoutRoute />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/courses" element={<Course />} />
                        <Route path="/categories" element={<Category />} />
                        <Route path="/setting-page" element={<SettingPage />} />
                        <Route path="/500" element={<PrivateRoute element={PageError500} allowedRoles={['student']} />} />
                    </Route>

                    {/* Routes without MainLayout */}
                    {/* Public Routes */}
                    <Route path="/403" element={<PageError403 />} />
                    <Route path="/404" element={<PageError404 />} />
                    <Route path="/500" element={<PageError500 />} />
                    <Route path="/another-page" element={<AnotherPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email/:token" element={<VerifyEmail />} />
                </Routes>
            </Suspense>
            <ToastContainer />
        </Router>
    );
}

export default AppRouter;
