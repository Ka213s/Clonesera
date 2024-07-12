import React from 'react';
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
import { SidebarIntructorData } from '../../consts';

interface SidebarProps {
  showMenu: boolean;
}

const iconComponents: { [key: string]: JSX.Element } = {
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

const SidebarIntructor: React.FC<SidebarProps> = ({ showMenu }) => {
  const { insSidebarItem } = SidebarIntructorData;

  const renderMenuItems = (items: typeof insSidebarItem) =>
    items.map((item) => (
      <Menu.Item key={item.url} icon={iconComponents[item.icon || '']}>
        {item.text}
      </Menu.Item>
    ));

  return (
    <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
      <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
        {renderMenuItems(insSidebarItem)}
      </Menu>
    </aside>
  );
};

export default SidebarIntructor;
