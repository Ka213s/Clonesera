import React, { useState, useEffect } from 'react';
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
  useEffect(() => {
    sidebarMenuItemsData.menuItems.forEach((item: MenuItem) => {
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (location.pathname === subItem.url) {
            setExpandedMenus((prevExpandedMenus) => [...prevExpandedMenus, item.text]);
          }
        });
      }
    });
  }, [location.pathname]);

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
              <Link to={item.url} className={`flex items-center space-x-3 text-gray-700 ${location.pathname === item.url ? 'text-white' : 'hover:text-white'}`}>
                {item.icon && iconComponents[item.icon as keyof typeof iconComponents]}
                <span className={`${location.pathname === item.url ? 'text-white' : 'hover:text-white'}`}>{item.text}</span>
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
                    <Link to={subItem.url} className={`text-gray-700 ${location.pathname === subItem.url ? 'text-white' : 'hover:text-white'}`}>
                      {subItem.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

