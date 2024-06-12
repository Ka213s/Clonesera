import React, { useState } from 'react';
import Sidebar from "../components/Sidebar/SidebarInstructor";
import Header from "../components/Header/Header";
import Footer from "../components/Instructor/Footer";

const InstructorSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showMenu, setShowMenu] = useState(false);
  
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
  
    return (
      <div className="flex overflow-hidden"> 
        <Header toggleMenu={toggleMenu} />
        <Sidebar showMenu={showMenu} />
        <div className={`flex flex-col flex-1 transition-all duration-300 ${showMenu ? 'ml-64' : 'ml-0'}`}>
          <div className="pt-16 p-4 overflow-auto">
            {children}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    );
  };
  
  export default InstructorSidebar;
