// Sidebar.tsx
import React from 'react';
import sidebarMenuItemsData from '../../models/FileJson/sidebarMenuItems.json'
import { FaHome, FaVideo, FaCompass, FaThList, FaBook, FaSave, FaBell, FaCogs, FaQuestionCircle, FaHistory, FaPaperPlane } from 'react-icons/fa';

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

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-full bg-gray-100 shadow-md fixed top-0 left-0">
      <ul className="mt-8">
        {sidebarMenuItemsData.menuItems.map((item: MenuItem, index: number) => (
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
