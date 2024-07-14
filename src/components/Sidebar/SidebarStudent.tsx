import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

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
import { SidebarStudentData } from '../../consts';

interface SidebarProps {
  showMenu: boolean;
}

const iconComponents: { [key: string]: JSX.Element } = {
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

const SidebarStudent: React.FC<SidebarProps> = ({ showMenu }) => {
  const navigate = useNavigate();
  const { studentSidebarItem } = SidebarStudentData;

  const renderMenuItems = (items: typeof studentSidebarItem) =>
    items.map((item) => (
      <Menu.Item key={item.url} icon={iconComponents[item.icon || '']} onClick={() => navigate(item.url)}>
        {item.text}
      </Menu.Item>
    ));

  return (
    <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
      <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
        {renderMenuItems(studentSidebarItem)}
      </Menu>
    </aside>
  );
};

export default SidebarStudent;