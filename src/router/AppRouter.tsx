import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';
import { ROLES, PATHS } from '../utils/commonImports';

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
                        <Route path={PATHS.HOME} element={<HomePage />} />
                        <Route path={PATHS.LOGOUT} element={<Logout />} />
                        <Route path={PATHS.COURSE} element={<Course />} />
                        <Route path={PATHS.CATEGORY} element={<Category />} />
                        <Route path={PATHS.SETTING_PAGE} element={<SettingPage />} />
                        <Route path={PATHS.ERROR500} element={<PrivateRoute element={PageError500} allowedRoles={[ROLES.STUDENT]} />} />

                    </Route>

                    {/* Routes without MainLayout */}
                    {/* Public Routes */}
                    <Route path={PATHS.ERROR403} element={<PageError403 />} />
                    <Route path={PATHS.ERROR404} element={<PageError404 />} />
                    <Route path={PATHS.ERROR500} element={<PageError500 />} />
                    <Route path={PATHS.ANOTHER_PAGE} element={<AnotherPage />} />
                    <Route path={PATHS.LOGIN} element={<Login />} />
                    <Route path={PATHS.REGISTER} element={<Register />} />
                    <Route path={PATHS.VERIFY_EMAIL} element={<VerifyEmail />} />
                </Routes>
            </Suspense>
            <ToastContainer />
        </Router>
    );
}

export default AppRouter;
