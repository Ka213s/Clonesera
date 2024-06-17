import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import instructorSidebar from '../../models/FileJson/instructorSidebar.json';
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

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return (
    <aside className={`fixed top-10 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <ul className="mt-8 max-h-full overflow-y-auto">
        {instructorSidebar.insSidebarItem.map((item: MenuItem, index: number) => (
          <li
            key={index}
            className={`group flex items-center p-4 cursor-pointer ${location.pathname === item.url ? 'bg-[#8886e5d5]' : 'hover:bg-[#9997F5]'}`}
            onClick={() => handleNavigation(item.url)}
          >
            <span className={`flex-shrink-0 ${location.pathname === item.url ? 'text-white' : 'group-hover:text-white'}`}>
              {iconComponents[item.icon as keyof typeof iconComponents]}
            </span>
            <span className={`ml-3 ${location.pathname === item.url ? 'text-white' : 'group-hover:text-white'}`}>{item.text}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
