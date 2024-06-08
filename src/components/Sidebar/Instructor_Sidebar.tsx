import React from 'react';
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
  return (
    <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <ul className="mt-8">
        {instructorSidebar.insSidebarItem.map((item: MenuItem, index: number) => (
          <li key={index} className="flex items-center p-4 hover:bg-gray-200">
            <a href={item.url} className="flex items-center space-x-3 text-gray-700">
              {iconComponents[item.icon as keyof typeof iconComponents]}
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
