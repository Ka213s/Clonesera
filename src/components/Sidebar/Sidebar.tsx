import React from 'react';
import { useLocation } from 'react-router-dom';
import sidebarMenuItemsData from '../../models/FileJson/sidebarMenuItems.json';
import { FaHome, FaVideo, FaCompass, FaThList, FaBook, FaSave, FaBell, FaCogs, FaQuestionCircle, FaHistory, FaPaperPlane } from 'react-icons/fa';

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
  FaVideo: <FaVideo />,
  FaCompass: <FaCompass />,
  FaThList: <FaThList />,
  FaBook: <FaBook />,
  FaSave: <FaSave />,
  FaBell: <FaBell />,
  FaCogs: <FaCogs />,
  FaQuestionCircle: <FaQuestionCircle />,
  FaHistory: <FaHistory />,
  FaPaperPlane: <FaPaperPlane />
};

const renderIcon = (icon: string) => {
  if (icon.startsWith("Fa")) {
    return iconComponents[icon as keyof typeof iconComponents];
  } else {
    return <img src={icon} alt="Avatar" className="w-6 h-6 rounded-full" />;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ showMenu }) => {
  const location = useLocation();
  return (
    <aside className={`fixed top-10 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <ul className="mt-8 max-h-full overflow-y-auto">
        {sidebarMenuItemsData.menuItems.map((item: MenuItem, index: number) => (
          <li key={index} className={`flex items-center p-4 ${location.pathname === item.url ? 'bg-[#8886e5d5]' : 'hover:bg-[#9997F5]'}`}>
            <a href={item.url} className={`flex items-center space-x-3 text-gray-700 ${location.pathname === item.url ? 'text-white' : ''}`}>
              {renderIcon(item.icon)}
              <span className={`${location.pathname === item.url ? 'text-white' : ''}`}>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
