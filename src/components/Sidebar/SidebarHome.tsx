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

  return (
    <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        style={{ height: '100%', borderRight: 0 }}
        className="custom-menu"
      >
        {sidebarMenuItemsData.menuItems.map((item: MenuItem) =>
          item.subItems ? (
            <Menu.SubMenu
              key={item.text}
              icon={item.icon ? iconComponents[item.icon] : null}
              title={item.text}
              className="custom-menu-item"
            >
              {item.subItems.map((subItem) => (
                <Menu.Item key={subItem.url} onClick={() => handleClick(subItem.url, item.text)} className="custom-menu-item">
                  {subItem.text}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.url} icon={item.icon ? iconComponents[item.icon] : null} onClick={() => handleClick(item.url)} className="custom-menu-item">
              {item.text}
            </Menu.Item>
          )
        )}
      </Menu>
    </aside>
  );
};

export default Sidebar;