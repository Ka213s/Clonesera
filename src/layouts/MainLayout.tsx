import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import SidebarStudent from '../components/Sidebar/Student_Sidebar';
import SidebarInstructor from '../components/Sidebar/Instructor_Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true); // Initialize to true to show the sidebar by default
  const [roleId, setRoleId] = useState<number | null>(null);
  const location = useLocation(); // Get the current location using useLocation

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setRoleId(parsedData.roleId);
    }
  }, []);

  useEffect(() => {
    // Check if the current path is "/home" and always show the sidebar in that case
    if (location.pathname === '/home') {
      setShowMenu(true);
    }
  }, [location.pathname]); // Listen for changes in the pathname

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderSidebar = () => {
    // Check if the current path is "/home" or if roleId is not set, then always show the default Sidebar
    if (location.pathname === '/home' || roleId === null) {
      return <Sidebar showMenu={showMenu} />;
    }

    switch (roleId) {
      case 2:
        return <SidebarStudent showMenu={showMenu} />;
      case 3:
        return <SidebarInstructor showMenu={showMenu} />;
      default:
        return <Sidebar showMenu={showMenu} />;
    }
  };

  return (
    <div className="flex overflow-hidden"> 
      <Header toggleMenu={toggleMenu} />
      {renderSidebar()}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${showMenu ? 'ml-64' : 'ml-0'}`}>
        <div className="pt-16 p-4 overflow-auto">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
