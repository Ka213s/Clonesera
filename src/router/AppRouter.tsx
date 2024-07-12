import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';
import { ROLES, PATHS, ERROR } from '../utils/commonImports';

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
                        <Route path={PATHS.HOME} element={<HomePage />} />
                        <Route path={PATHS.LOGOUT} element={<Logout />} />
                        <Route path={PATHS.COURSE} element={<Course />} />
                        <Route path={PATHS.CATEGORY} element={<Category />} />
                        <Route path={PATHS.SETTING_PAGE} element={<SettingPage />} />
                        <Route path={PATHS.REQUEST_MANAGEMENT} element={<RequestManagement />} />
                        <Route path={PATHS.ERROR500} element={<PrivateRoute element={PageError500} allowedRoles={[ROLES.STUDENT]} />} />

                    </Route>

                    {/* Routes without MainLayout */}
                    {/* Public Routes */}
                    <Route path={ERROR.ER403} element={<PageError403 />} />
                    <Route path={ERROR.ER404} element={<PageError404 />} />
                    <Route path={ERROR.ER500} element={<PageError500 />} />
                    <Route path={PATHS.LOGIN} element={<Login />} />
                    <Route path={PATHS.REGISTER} element={<Register />} />
                    <Route path={PATHS.VERIFY_EMAIL} element={<VerifyEmail />} />
                    <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
                </Routes>
            </Suspense>
            <ToastContainer />
        </Router>
    );
}

export default AppRouter;