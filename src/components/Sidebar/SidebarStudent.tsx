import React from 'react';
import studentSidebarItemData from '../../models/FileJson/studentSidebarItem.json';
import { FaHome, FaBook, FaComments, FaBell, FaCertificate, FaStar, FaCreditCard, FaFile, FaCogs, FaPaperPlane } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuItem {
  text: string;
  icon: string;
  url: string;
}

const iconComponents = {
  FaHome: <FaHome />,
  FaBook: <FaBook />,
  FaComments: <FaComments />,
  FaBell: <FaBell />,
  FaCertificate: <FaCertificate />,
  FaStar: <FaStar />,
  FaCreditCard: <FaCreditCard />,
  FaFile: <FaFile />,
  FaCogs: <FaCogs />,
  FaPaperPlane: <FaPaperPlane />
};

const StudentSidebar: React.FC<{ showMenu: boolean }> = ({ showMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return (
    <aside className={`fixed top-10 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
      <ul className="mt-8 max-h-full overflow-y-auto">
        {studentSidebarItemData.studentSidebarItem.map((item: MenuItem, index: number) => (
          <li
            key={index}
            className={`group flex items-center p-4 cursor-pointer ${location.pathname === item.url ? 'bg-[#8886e5d5]' : 'hover:bg-[#9997F5]'}`}
            onClick={() => handleNavigation(item.url)}
          >
            <span className={`flex-shrink-0 ${location.pathname === item.url ? 'text-white' : 'group-hover:text-white'}`}>
              {iconComponents[item.icon as keyof typeof iconComponents]}
            </span>
            <span className={`ml-3 ${location.pathname === item.url ? 'text-white' : 'group-hover:text-white'}`}>{item.text}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default StudentSidebar;
