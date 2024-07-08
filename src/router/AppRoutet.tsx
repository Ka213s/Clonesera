import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Test = lazy(() => import('../pages/test'));

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Suspense fallback={<div>Loading...</div>}> <Test /> </Suspense>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
