import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import Loading from '../components/Loading';
import { setGlobalLoadingHandler } from '../services/axiosInstance';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setGlobalLoadingHandler(setIsLoading);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header toggleMenu={toggleMenu} />
      <div className="flex flex-1 overflow-hidden pt-14">
        <Sidebar showMenu={isMenuOpen} />
        <main className="flex-1 p-4 bg-white overflow-y-auto relative">
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
