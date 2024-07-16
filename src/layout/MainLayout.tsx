import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar/Sidebar';
import SidebarStudent from '../components/Sidebar/SidebarStudent';
import SidebarInstructor from '../components/Sidebar/SidebarInstructor';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import { Layout } from 'antd';
import { setGlobalLoadingHandler } from '../services/axiosInstance';

const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setRole(parsedData.role);
    }
  }, []);

  useEffect(() => {
    setGlobalLoadingHandler(setIsLoading);

    if (location.pathname === '/home' && role === 'admin') {
      navigate('/admin/request-management');
    }
  }, [location.pathname, role, navigate]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderSidebar = useMemo(() => {
    if (!role) {
      return <Sidebar showMenu={showMenu} />;
    }

    if (location.pathname === '/home') {
      switch (role) {
        case 'student':
          return <SidebarStudent showMenu={showMenu} />;
        case 'instructor':
          return <SidebarInstructor showMenu={showMenu} />;
        case 'admin':
          navigate('/admin/request-management');
          return null;
        default:
          return null;
      }
    }

    switch (role) {
      case 'admin':
        return <SidebarAdmin showMenu={showMenu} />;
      case 'student':
        return <SidebarStudent showMenu={showMenu} />;
      case 'instructor':
        return <SidebarInstructor showMenu={showMenu} />;
      default:
        return null;
    }
  }, [location.pathname, role, showMenu, navigate]);

  return (
    <Layout className="overflow-hidden h-screen flex flex-col">
      <Header toggleMenu={toggleMenu} />
        {renderSidebar}
        <Content className={`transition-all duration-300 overflow-auto ${showMenu ? 'ml-56' : 'ml-0'}`}>
          <div className="flex flex-col min-h-screen">
            <Loading isLoading={isLoading}>
              <div className="flex-1 pt-16 mt-4 p-4 overflow-auto">
                {children}
              </div>
            </Loading>
            <Footer/>
          </div>
        </Content>
    </Layout>
  );
};

export default MainLayout;
