import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  VideoCameraOutlined,
  CompassOutlined,
  UnorderedListOutlined,
  BookOutlined,
  SaveOutlined,
  BellOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  HistoryOutlined,
  SendOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
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

const iconComponents: { [key: string]: JSX.Element } = {
  HomeOutlined: <HomeOutlined />,
  VideoCameraOutlined: <VideoCameraOutlined />,
  CompassOutlined: <CompassOutlined />,
  UnorderedListOutlined: <UnorderedListOutlined />,
  BookOutlined: <BookOutlined />,
  SaveOutlined: <SaveOutlined />,
  BellOutlined: <BellOutlined />,
  SettingOutlined: <SettingOutlined />,
  QuestionCircleOutlined: <QuestionCircleOutlined />,
  HistoryOutlined: <HistoryOutlined />,
  SendOutlined: <SendOutlined />,
  DownOutlined: <DownOutlined />,
  UpOutlined: <UpOutlined />,
};

const Sidebar: React.FC<SidebarProps> = ({ showMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

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

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return (
    <aside className={`fixed top-10 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
      <ul className="mt-8 max-h-full overflow-y-auto">
        {sidebarMenuItemsData.menuItems.map((item: MenuItem, index: number) => (
          <React.Fragment key={index}>
            <li
              className={`group flex items-center p-4 cursor-pointer ${location.pathname === item.url ? 'bg-[#9997F5] text-white' : 'hover:bg-[#9997F5] hover:text-white'}`}
              onClick={() => handleNavigation(item.url)}
            >
              <span className="flex items-center space-x-3 ${location.pathname === item.url ? 'text-white' : 'text-gray-700'} group-hover:text-white">
                {item.icon && <span className="group-hover:text-white">{iconComponents[item.icon]}</span>}
                <span className="group-hover:text-white">{item.text}</span>
                {item.subItems && (
                  <button onClick={(e) => { e.stopPropagation(); toggleMenu(item.text); }} className="ml-auto">
                    {expandedMenus.includes(item.text) ? <UpOutlined className="group-hover:text-white" /> : <DownOutlined className="group-hover:text-white" />}
                  </button>
                )}
              </span>
            </li>
            {item.subItems && expandedMenus.includes(item.text) && (
              <ul className="ml-8">
                {item.subItems.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`group flex items-center p-2 cursor-pointer ${location.pathname === subItem.url ? 'bg-[#8886e5] text-white' : 'hover:bg-[#9997F5] hover:text-white'}`}
                    onClick={() => handleNavigation(subItem.url)}
                  >
                    <span className="flex items-center space-x-3 ${location.pathname === subItem.url ? 'text-white' : 'text-gray-700'} group-hover:text-white">
                      <span className="group-hover:text-white">{subItem.text}</span>
                    </span>
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
