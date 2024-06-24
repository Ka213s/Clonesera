import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  DashboardOutlined,
  BookOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  CarOutlined,
  SettingOutlined,
  FileTextOutlined,
  ProfileOutlined,
  MessageOutlined
} from '@ant-design/icons';
import sidebarMenuItems from '../../models/FileJson/AdminSidebar.json'; // Adjust the path as needed

interface SidebarProps {
  showMenu: boolean;
}

interface MenuItem {
  key: string;
  icon?: string;
  label: string;
  url?: string;
}

const iconComponents = {
  UserOutlined: <UserOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  BookOutlined: <BookOutlined />,
  TeamOutlined: <TeamOutlined />,
  UsergroupAddOutlined: <UsergroupAddOutlined />,
  CarOutlined: <CarOutlined />,
  SettingOutlined: <SettingOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  ProfileOutlined: <ProfileOutlined />,
  MessageOutlined: <MessageOutlined />
};

const SidebarAdmin: React.FC<SidebarProps> = ({ showMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (url: string) => {
    navigate(url, { replace: true }); // Ensure no reload
  };

  return (
    <aside className={`fixed top-10 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
      <ul className="mt-8 max-h-full overflow-y-auto">
        {sidebarMenuItems.sidebarMenuItems.map((item: MenuItem, index: number) => (
          <li
            key={index}
            className={`group flex items-center p-4 cursor-pointer ${location.pathname === item.url ? 'bg-[#8886e5d5]' : 'hover:bg-[#9997F5]'}`}
            onClick={() => handleNavigation(item.url!)}
          >
            <span className={`flex-shrink-0 ${location.pathname === item.url ? 'text-white' : 'group-hover:text-white'}`}>
              {item.icon && iconComponents[item.icon as keyof typeof iconComponents]}
            </span>
            <span className={`ml-3 ${location.pathname === item.url ? 'text-white' : 'group-hover:text-white'}`}>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
