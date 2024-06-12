import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaVideo, FaCompass, FaThList, FaBook, FaSave, FaBell, FaCogs, FaQuestionCircle, FaHistory, FaPaperPlane, FaChevronDown, FaChevronUp, FaUserCircle } from 'react-icons/fa';
import sidebarMenuItemsData from '../../models/FileJson/sidebarMenuItems.json';

interface SidebarProps {
  showMenu: boolean;
}

interface MenuItem {
  text: string;
  icon?: string;
  url: string;
  subItems?: MenuItem[];
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
  FaPaperPlane: <FaPaperPlane />,
  FaUserCircle: <FaUserCircle />,
};

const Sidebar: React.FC<SidebarProps> = ({ showMenu }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [expandedUserMenu, setExpandedUserMenu] = useState(false);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(expandedMenus.includes(menu)
      ? expandedMenus.filter(item => item !== menu)
      : [...expandedMenus, menu]);
  };

  const toggleUserMenu = () => {
    setExpandedUserMenu(!expandedUserMenu);
  };

  return (
    <aside className={`fixed top-10 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <ul className="mt-8 max-h-full overflow-y-auto">
        {sidebarMenuItemsData.menuItems.map((item: MenuItem, index: number) => (
          <React.Fragment key={index}>
            <li className={`flex items-center p-4 ${location.pathname === item.url ? 'bg-[#8886e5d5]' : 'hover:bg-[#9997F5]'}`}>
              <Link to={item.url} className={`flex items-center space-x-3 text-gray-700 ${location.pathname === item.url ? 'text-white' : ''}`}>
                {item.icon && iconComponents[item.icon as keyof typeof iconComponents]}
                <span className={`${location.pathname === item.url ? 'text-white' : ''}`}>{item.text}</span>
                {item.subItems && (
                  <button onClick={() => toggleMenu(item.text)} className="ml-auto">
                    {expandedMenus.includes(item.text) ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                )}
              </Link>
            </li>
            {item.subItems && expandedMenus.includes(item.text) && (
              <ul className="ml-8">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className={`flex items-center p-2 ${location.pathname === subItem.url ? 'bg-[#8886e5d5]' : 'hover:bg-[#9997F5]'}`}>
                    <Link to={subItem.url} className={`text-gray-700 ${location.pathname === subItem.url ? 'text-white' : ''}`}>
                      {subItem.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>

      {/* User info and menu */}
      <div className="absolute bottom-8 left-0 right-0 px-4 flex items-center">
        <button onClick={toggleUserMenu} className="flex items-center space-x-2 focus:outline-none">
          <FaUserCircle size={24} className="text-gray-500" />
          <span className="text-gray-700">Joginder Singh</span>
          {expandedUserMenu ? <FaChevronUp size={20} className="text-gray-500" /> : <FaChevronDown size={20} className="text-gray-500" />}
        </button>

        {expandedUserMenu && (
          <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md border border-gray-200 w-48 py-2 z-10">
            <Link to="/instructor_profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Instructor Profile</Link>
            <a href="#!" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Night mode</a>
            <Link to="/cursus_dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cursus Dashboard</Link>
            <Link to="/sign_out" className="block px-4 py-2
            text-sm text-gray-700 hover:bg-gray-100">Sign Out</Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;