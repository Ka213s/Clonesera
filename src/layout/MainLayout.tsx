import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar/Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleMenu={toggleMenu} /> {/* Cung cấp prop toggleMenu */}
      <div className="flex flex-1">
        <Sidebar showMenu={isMenuOpen} /> {/* Cung cấp prop showMenu */}
        <main className="flex-1 p-4 bg-white">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
