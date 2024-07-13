import React from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  BookOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { SidebarAdminData } from '../../consts'; 

interface SidebarProps {
  showMenu: boolean;
}
const iconComponents: { [key: string]: JSX.Element } = {
  UserOutlined: <UserOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  BookOutlined: <BookOutlined />,
  TeamOutlined: <TeamOutlined />
};

const renderMenuItems = (items: any[]) => 
  items.map((item) => (
    item.children ? (
      <Menu.SubMenu key={item.key} icon={iconComponents[item.icon || '']} title={item.label}>
        {renderMenuItems(item.children)}
      </Menu.SubMenu>
    ) : (
      <Menu.Item key={item.key} icon={iconComponents[item.icon || '']}>
        {item.label}
      </Menu.Item>
    )
  ));

const SidebarAdmin: React.FC<SidebarProps> = ({ showMenu }) => {
    const { menuItems } = SidebarAdminData;
  
    return (
      <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
        <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
          {renderMenuItems(menuItems)}
        </Menu>
      </aside>
    );
  };

export default SidebarAdmin;
