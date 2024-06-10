import React from 'react';
import { useLocation } from 'react-router-dom';
import instructorSidebar from '../../models/FileJson/instructorSidebar.json';
import { FaHome, FaBook, FaChartLine, FaPlus, FaComments, FaBell, FaCertificate, FaStar, FaDollarSign, FaWallet, FaFile, FaCheck, FaCogs, FaPaperPlane } from 'react-icons/fa';

interface SidebarProps {
  showMenu: boolean;
}

interface MenuItem {
  text: string;
  icon: string;
  url: string;
}

const iconComponents = {
  FaHome: <FaHome />,
  FaBook: <FaBook />,
  FaChartLine: <FaChartLine />,
  FaPlus: <FaPlus />,
  FaComments: <FaComments />,
  FaBell: <FaBell />,
  FaCertificate: <FaCertificate />,
  FaStar: <FaStar />,
  FaDollarSign: <FaDollarSign />,
  FaWallet: <FaWallet />,
  FaFile: <FaFile />,
  FaCheck: <FaCheck />,
  FaCogs: <FaCogs />,
  FaPaperPlane: <FaPaperPlane />
};

const Sidebar: React.FC<SidebarProps> = ({ showMenu }) => {
  const location = useLocation();

  return (
    <aside className={`fixed top-10 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <ul className="mt-8 max-h-full overflow-y-auto">
        {instructorSidebar.insSidebarItem.map((item: MenuItem, index: number) => (
          <li key={index} className={`flex items-center p-4 ${location.pathname === item.url ? 'bg-[#8886E5]' : 'hover:bg-[#9997F5]'}`}>
            <a href={item.url} className={`flex items-center space-x-3 text-gray-700 ${location.pathname === item.url ? 'text-white' : ''}`}>
              {iconComponents[item.icon as keyof typeof iconComponents]}
               <span className={`${location.pathname === item.url ? 'text-white' : ''}`}>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
