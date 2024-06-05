import React from 'react';
// import sidebarMenuItemsData from '../../models/FileJson/sidebarMenuItems.json';
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

const Sidebar: React.FC<SidebarProps> = ({ showMenu }) => {
  return (
    <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-64' : 'w-0 overflow-hidden'}`}>
      {/* <ul className="mt-8">
        {sidebarMenuItemsData.menuItems.map((item: MenuItem, index: number) => (
          <li key={index} className="flex items-center p-4 hover:bg-gray-200">
            <a href={item.url} className="flex items-center space-x-3 text-gray-700">
              {iconComponents[item.icon as keyof typeof iconComponents]}
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ul> */}
    </aside>
  );
};

export default Sidebar;
