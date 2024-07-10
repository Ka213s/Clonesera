import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';
import {roles} from '../utils/commonImports';
import Category from '../pages/Category';
const AnotherPage = lazy(() => import('../pages/AnotherPage'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const CoursesTable = lazy(() => import('../pages/CoursesTable'));
const PageError404 = lazy(() => import('../pages/Error/PageError404'));
const PageError500 = lazy(() => import('../pages/Error/PageError500'));
const PageError403 = lazy(() => import('../pages/Error/PageError403'));
// Admin Pages and Components

// Student Pages and Components

// Instructor Pages and Components

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Suspense>
                <Routes>
                    {/* Routes with MainLayout */}
                    <Route element={<LayoutRoute />}>
                        {/* Public Routes */}
                        <Route path="/403" element={<PageError403 />} />
                        {/* <Route path="/404" element={<PageError404 />} /> */}
                        {/* <Route path="/500" element={<PageError500 />} /> */}

                        {/* Admin Routes */}
                        <Route path="/404" element={<PrivateRoute element={PageError404} allowedRoles={[roles.ADMIN]} />} />

                        {/* Student Routes */}
                        <Route path="/500" element={<PrivateRoute element={PageError500} allowedRoles={[roles.STUDENT]} />} />

                        {/* Instructor Routes */}
                       
                    </Route>

                    {/* Routes without MainLayout */}
                    {/* Public Routes */}
                    <Route path="/another-page" element={<AnotherPage />} />
                    <Route path="/courses" element={<CoursesTable />} />
                    <Route path="/categories" element={<Category />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Suspense>
            <ToastContainer />
        </Router>
    );
}

export default AppRouter;
