import React from 'react';
import studentSidebarItemData from '../../models/FileJson/studentSidebarItem.json';
import { FaHome, FaBook, FaComments, FaBell, FaCertificate, FaStar, FaCreditCard, FaFile, FaCogs, FaPaperPlane } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

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
  return (
    <aside className={`fixed top-10 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <ul className="mt-8">
        {studentSidebarItemData.studentSidebarItem.map((item: MenuItem, index: number) => (
          <li key={index} className={`flex items-center p-4 ${location.pathname === item.url ? 'bg-[#8886e5d5]' : 'hover:bg-[#9997F5]'}`}>
            <a href={item.url} className={`flex items-center space-x-3 text-gray-700 hover:text-white ${location.pathname === item.url ? 'text-white' : ''}`}>
              <span className={`flex-shrink-0 ${location.pathname === item.url ? 'text-white' : 'hover:text-white'}`}>
                {iconComponents[item.icon as keyof typeof iconComponents]}
              </span>
              <span className={`${location.pathname === item.url ? 'text-white' : 'hover:text-white'}`}>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default StudentSidebar;
