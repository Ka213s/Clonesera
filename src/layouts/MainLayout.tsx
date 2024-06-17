import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import SidebarHome from '../components/Sidebar/SidebarHome';
import SidebarStudent from '../components/Sidebar/SidebarStudent';
import SidebarInstructor from '../components/Sidebar/SidebarInstructor';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import { Layout } from 'antd';
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [roleId, setRoleId] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setRoleId(parsedData.roleId);
      console.log(parsedData.roleId);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/home') {
      if (roleId === 1) {
        navigate('/admin_dashboard');
      } else {
        setShowMenu(true);
      }
    }
  }, [location.pathname, roleId, navigate]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderSidebar = () => {
    // Điều kiện kiểm tra nếu đường dẫn bắt đầu bằng "/home" hoặc "/course"
    const homeOrCoursePaths = /^\/(home|course|tests)/.test(location.pathname);

    if (homeOrCoursePaths || roleId === null) {
      return <SidebarHome showMenu={showMenu} />;
    }

    switch (roleId) {
      case 1:
        return <SidebarAdmin showMenu={showMenu} />;
      case 2:
        return <SidebarStudent showMenu={showMenu} />;
      case 3:
        return <SidebarInstructor showMenu={showMenu} />;
      default:
        return <SidebarHome showMenu={showMenu} />;
    }
  };

  return (
   
    <div className="flex flex-col min-h-screen">
      <Header toggleMenu={toggleMenu} />
      <div className="flex flex-1">
        {renderSidebar()}
        <div className={`flex flex-col flex-1 transition-all duration-300 ${showMenu ? 'ml-64' : 'ml-0'}`}>
          <div className="flex-1 pt-16 p-4 overflow-auto">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  
  );
};

export default MainLayout;