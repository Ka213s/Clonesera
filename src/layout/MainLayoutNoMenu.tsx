import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderNoMenu from '../components/HeaderNoMenu';
import Footer from '../components/Footer';
import { Layout } from 'antd';

const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
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
    if (location.pathname === '/home' && role === 'admin') {
      navigate('/admin/request-management');
    }
  }, [location.pathname, role, navigate]);

  return (
    <Layout className="overflow-hidden h-screen flex flex-col">
      <HeaderNoMenu />
      <Content className="transition-all duration-300 overflow-auto ml-0">
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 pt-16 mt-4 p-4 overflow-auto">
            {children}
          </div>
          <Footer />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
