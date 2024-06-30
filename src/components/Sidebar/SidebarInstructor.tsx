import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  LineChartOutlined,
  MessageOutlined,
  BellOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  DollarOutlined,
  WalletOutlined,
  FileTextOutlined,
  CheckOutlined,
  SettingOutlined,
  SendOutlined
} from '@ant-design/icons';
import instructorSidebar from '../../models/FileJson/instructorSidebar.json';

interface SidebarProps {
  showMenu: boolean;
}

interface MenuItem {
  text: string;
  icon: string;
  url: string;
}

const iconComponents = {
  HomeOutlined: <HomeOutlined />,
  BookOutlined: <BookOutlined />,
  LineChartOutlined: <LineChartOutlined />,
  MessageOutlined: <MessageOutlined />,
  BellOutlined: <BellOutlined />,
  SafetyCertificateOutlined: <SafetyCertificateOutlined />,
  StarOutlined: <StarOutlined />,
  DollarOutlined: <DollarOutlined />,
  WalletOutlined: <WalletOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  CheckOutlined: <CheckOutlined />,
  SettingOutlined: <SettingOutlined />,
  SendOutlined: <SendOutlined />
};

const Sidebar: React.FC<SidebarProps> = ({ showMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  const handleClick = (url: string) => {
    navigate(url);
    setSelectedKeys([url]);
  };

  return (
    <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        style={{ height: '100%', borderRight: 0 }}
        className="custom-menu"
      >
        {instructorSidebar.insSidebarItem.map((item: MenuItem, index: number) => (
          <Menu.Item
            key={item.url}
            icon={iconComponents[item.icon as keyof typeof iconComponents]}
            onClick={() => handleClick(item.url)}
          >
            {item.text}
          </Menu.Item>
        ))}
      </Menu>
    </aside>
  );
};

export default Sidebar;
