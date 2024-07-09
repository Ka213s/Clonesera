import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Category from '../pages/Category';

// Page Public
const Test = lazy(() => import('../pages/test'));
const AnotherPage = lazy(() => import('../pages/AnotherPage'));
const Login = lazy(() => import('../pages/Login'));
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
            <Suspense >
                <Routes>
                    {/* Routes with MainLayout */}
                    <Route element={<LayoutRoute />}>
                        {/* Public Routes */}
                        <Route path="/403" element={<PageError403 />} />
                        <Route path="/404" element={<PageError404 />} />
                        <Route path="/500" element={<PageError500 />} />
                   

                        {/* Admin Routes */}

                        {/* Student Routes */}


                        {/* Instructor Routes */}
                        <Route path="/test" element={<Test />} />
                    </Route>

                    {/* Routes without MainLayout */}
                    {/* Public Routes */}


                    {/* Admin Routes */}


                    {/* Student Routes */}


                    {/* Instructor Routes */}F
                    <Route path="/another-page" element={<AnotherPage />} />
                    <Route path="/courses" element={<CoursesTable />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/categories" element={<Category />} />
                </Routes>
            </Suspense>
            <ToastContainer />
        </Router>
    );
}

export default AppRouter;
