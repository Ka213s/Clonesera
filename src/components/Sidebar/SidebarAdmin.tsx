import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  BookOutlined,
  TeamOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import sidebarMenuItems from '../../models/FileJson/AdminSidebar.json'; // Adjust the path as needed

interface SidebarProps {
  showMenu: boolean;
}

interface MenuItem {
  key: string;
  icon?: string;
  label: string;
  children?: MenuItem[];
}

const iconComponents = {
  UserOutlined: <UserOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  BookOutlined: <BookOutlined />,
  TeamOutlined: <TeamOutlined />,
  UsergroupAddOutlined: <UsergroupAddOutlined />
};

const SidebarAdmin: React.FC<SidebarProps> = ({ showMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedKeys = [location.pathname];

  const renderMenuItems = (items: MenuItem[]): MenuProps['items'] => {
    return items.map(item => ({
      key: item.key,
      icon: item.icon ? iconComponents[item.icon as keyof typeof iconComponents] : undefined,
      label: item.label,
      children: item.children ? renderMenuItems(item.children) : undefined
    }));
  };

  const handleClick: MenuProps['onClick'] = (e) => {
    navigate(e.key, { replace: true }); // Ensure no reload
  };

  return (
    <aside className={`fixed top-16 left-0 h-full bg-white shadow-lg transition-all duration-300 ${showMenu ? 'w-56 overflow-y-auto' : 'w-0 overflow-hidden'}`}>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={sidebarMenuItems.menuItems.map(item => item.key)}
        style={{ height: '100%', borderRight: 0 }}
        items={renderMenuItems(sidebarMenuItems.menuItems)}
        onClick={handleClick}
      />
    </aside>
  );
};

export default SidebarAdmin;
