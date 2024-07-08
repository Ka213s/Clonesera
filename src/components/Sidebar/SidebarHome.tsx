import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
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
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const currentOpenKeys: string[] = [];
    const selectedKeys: string[] = [location.pathname];
    sidebarMenuItemsData.menuItems.forEach((item: MenuItem) => {
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (location.pathname === subItem.url) {
            currentOpenKeys.push(item.text);
            selectedKeys.push(item.text);
          }
        });
      }
    });
    setOpenKeys(currentOpenKeys);
    setSelectedKeys(selectedKeys);
  }, [location.pathname]);

  const handleClick = (url: string, parentKey?: string) => {
    navigate(url);
    if (parentKey) {
      setSelectedKeys([url, parentKey]);
    } else {
      setSelectedKeys([url]);
    }
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const menuItems = sidebarMenuItemsData.menuItems.map((item: MenuItem) => {
    if (item.subItems) {
      return {
        key: item.text,
        icon: item.icon ? iconComponents[item.icon] : null,
        label: item.text,
        children: item.subItems.map((subItem) => ({
          key: subItem.url,
          label: subItem.text,
          onClick: () => handleClick(subItem.url, item.text),
        })),
      };
    } else {
      return {
        key: item.url,
        icon: item.icon ? iconComponents[item.icon] : null,
        label: item.text,
        onClick: () => handleClick(item.url),
      };
    }
  });

  return (
    <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'} overflow-y-auto`}>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        style={{ height: '100%', borderRight: 0 }}
        className="custom-menu"
        items={menuItems}
      />
    </aside>
  );
};

export default Sidebar;
