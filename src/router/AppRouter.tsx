import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';

// Import Public Pages and Components directly
import AnotherPage from '../pages/AnotherPage';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Logout from '../components/Logout';
import Register from '../pages/Register';
import Category from '../pages/Category';
import SettingPage from '../pages/SettingPage';
import Course from '../pages/Instructor/CreateCourse';
import VerifyEmail from '../components/VerifyEmailDone';

import PageError404 from '../pages/Error/PageError404';
import PageError500 from '../pages/Error/PageError500';
import PageError403 from '../pages/Error/PageError403';

const AppRouter: React.FC = () => {
    return (
        <Router>
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
            <ToastContainer />
        </Router>
    );
}

export default AppRouter;
