import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';
import { ROLES } from '../utils/commonImports';
import { ADMIN, ERROR, INSTRUCTOR, PUBLIC } from '../consts';

// Public Pages and Components
const HomePage = lazy(() => import('../pages/HomePage'));
const Login = lazy(() => import('../pages/Login'));
const Logout = lazy(() => import('../components/Logout'));
const Register = lazy(() => import('../pages/Register'));
const Category = lazy(() => import('../pages/Category'));
const SettingPage = lazy(() => import('../pages/SettingPage'));
const Course = lazy(() => import('../pages/Instructor/ManagementCourse'));
const VerifyEmail = lazy(() => import('../components/VerifyEmailDone'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const RequestManagement = lazy(() => import('../pages/RequestManagement'));
const ListSubscription = lazy(() => import('../pages/Instructor/ListSubscription'));
const ListSubscribed = lazy(() => import('../pages/Student/ListSubscribed'));
const DisplayAccount = lazy(() => import('../components/AccoutUser/DisplayAccount'));

const PageError404 = lazy(() => import('../pages/Error/PageError404'));
const PageError500 = lazy(() => import('../pages/Error/PageError500'));
const PageError403 = lazy(() => import('../pages/Error/PageError403'));

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Suspense>
                <Routes>
                    /* Routes with MainLayout */
                    <Route element={<LayoutRoute />}>
                        <Route path={PUBLIC.HOME} element={<HomePage />} />
                        <Route path={PUBLIC.LOGOUT} element={<Logout />} />
                        <Route path={INSTRUCTOR.COURSE} element={<Course />} />
                        <Route path={PUBLIC.CATEGORY} element={<Category />} />
                        <Route path={PUBLIC.SETTING_PAGE} element={<SettingPage />} />
                        <Route path={PUBLIC.LIST_SUBSCRIBED} element={<PrivateRoute element={ListSubscribed} allowedRoles={[ROLES.STUDENT]} />} />
                        <Route path={INSTRUCTOR.LIST_SUBSCRIPTION} element={<PrivateRoute element={ListSubscription} allowedRoles={[ROLES.INSTRUCTOR]} />} />
                        <Route path={ADMIN.REQUEST_MANAGEMENT} element={<PrivateRoute element={RequestManagement} allowedRoles={[ROLES.ADMIN]} />} />
                        <Route path={ADMIN.DISPLAY_ACCOUNT} element={<PrivateRoute element={DisplayAccount} allowedRoles={[ROLES.ADMIN]} />} />
                        
                    </Route>

                    {/* Routes without MainLayout */}
                    {/* Public Routes */}
                    <Route path={ERROR.ERROR403} element={<PageError403 />} />
                    <Route path={ERROR.ERROR404} element={<PageError404 />} />
                    <Route path={ERROR.ERROR500} element={<PageError500 />} />
                    <Route path={PUBLIC.LOGIN} element={<Login />} />
                    <Route path={PUBLIC.REGISTER} element={<Register />} />
                    <Route path={PUBLIC.VERIFY_EMAIL} element={<VerifyEmail />} />
                    <Route path={PUBLIC.FORGOT_PASSWORD} element={<ForgotPassword />} />
                </Routes>
            </Suspense>
            <ToastContainer />
        </Router>
    );
}

export default AppRouter;