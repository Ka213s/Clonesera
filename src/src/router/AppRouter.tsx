import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutRoute from '../layout/LayoutRoute'; 

const Test = lazy(() => import('../page/test'));
const AnotherPage = lazy(() => import('../page/AnotherPage'));
const Login = lazy(() => import('../page/Login'));
const CoursesTable = lazy(() => import('../page/CoursesTable'));

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
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
