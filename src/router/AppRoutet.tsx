import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Test from '../pages/test';




const AppRouter: React.FC = () => {
  return (
    <Router>
    
        <Routes>
          {/* Routes with MainLayout */}
      
            <Route path="/" element={<Test />} />
   

          {/* Routes without MainLayout */}
        
        </Routes>
    
    </Router>
  );
}

export default AppRouter;
