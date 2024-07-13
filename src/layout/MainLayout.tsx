import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import SidebarStudent from '../components/Sidebar/SidebarStudent';
import SidebarInstructor from '../components/Sidebar/SidebarInstructor';
import Sidebar from '../components/Sidebar/Sidebar';
import Loading from '../components/Loading';
import { setGlobalLoadingHandler } from '../services/axiosInstance';

type UserRole = 'admin' | 'student' | 'instructor';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setGlobalLoadingHandler(setIsLoading);

    const userData = localStorage.getItem('data');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setRole(parsedData.role);
    }
  }, []);

  let renderSidebar = null;

  switch (role) {
    case 'admin':
      renderSidebar = <SidebarAdmin showMenu={isMenuOpen} />;
      break;
    case 'student':
      renderSidebar = <SidebarStudent showMenu={isMenuOpen} />;
      break;
    case 'instructor':
      renderSidebar = <SidebarInstructor showMenu={isMenuOpen} />;
      break;
    default:
      renderSidebar = <Sidebar showMenu={isMenuOpen} />;
      break;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header toggleMenu={toggleMenu} />
      <div className="flex flex-1 overflow-hidden pt-14">
        {renderSidebar && (
          <aside className={`transition-all duration-300 ${isMenuOpen ? 'ml-0' : '-ml-56'} fixed left-0 top-14 bottom-0 z-50 overflow-y-auto bg-white w-56 border-r border-gray-200`}>
            {renderSidebar}
          </aside>
        )}
        <main className="flex-1 p-4 bg-white overflow-y-auto relative transition-all duration-300">
          <Loading isLoading={isLoading}>
            {children}
          </Loading>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
