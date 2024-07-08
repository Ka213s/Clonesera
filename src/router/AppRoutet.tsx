import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute'; 

const Test = lazy(() => import('../pages/test'));
const AnotherPage = lazy(() => import('../pages/AnotherPage'));
const Login = lazy(() => import('../pages/Login'));
const CoursesTable = lazy(() => import('../pages/CoursesTable'));

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense >
        <Routes>
          {/* Routes with MainLayout */}
          <Route element={<LayoutRoute />}>
            <Route path="/test" element={<Test />} />
          </Route>

          {/* Routes without MainLayout */}
          <Route path="/another-page" element={<AnotherPage />} />
          <Route path="/courses" element={<CoursesTable />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
