import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <Sidebar showMenu={showMenu} />
      <div className="flex flex-col flex-1">
        <Header toggleMenu={toggleMenu} />
        <main className={`flex-1 p-4 transition-all duration-300 ${showMenu ? 'ml-64' : 'ml-0'}`}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
