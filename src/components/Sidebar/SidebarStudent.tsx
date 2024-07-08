import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  CommentOutlined,
  BellOutlined,
  TrophyOutlined,
  StarOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  SettingOutlined,
  SendOutlined,
} from '@ant-design/icons';
import studentSidebarItemData from '../../models/FileJson/studentSidebarItem.json';

interface MenuItem {
  text: string;
  icon: string;
  url: string;
}

const iconComponents = {
  FaHome: <HomeOutlined />,
  FaBook: <BookOutlined />,
  FaComments: <CommentOutlined />,
  FaBell: <BellOutlined />,
  FaCertificate: <TrophyOutlined />,
  FaStar: <StarOutlined />,
  FaCreditCard: <CreditCardOutlined />,
  FaFile: <FileTextOutlined />,
  FaCogs: <SettingOutlined />,
  FaPaperPlane: <SendOutlined />,
};

const StudentSidebar: React.FC<{ showMenu: boolean }> = ({ showMenu }) => {
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

  const menuItems = studentSidebarItemData.studentSidebarItem.map((item: MenuItem) => ({
    key: item.url,
    icon: iconComponents[item.icon as keyof typeof iconComponents],
    label: item.text,
    onClick: () => handleClick(item.url),
  }));

  return (
    <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        style={{ height: '100%', borderRight: 0 }}
        className="custom-menu"
        items={menuItems}
      />
    </aside>
  );
};

export default StudentSidebar;
