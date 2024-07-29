import React from 'react';
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
} from '@ant-design/icons';
import { sidebarMenuItemsData } from '../../consts';

interface SidebarProps {
  showMenu: boolean;
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
};

const Sidebar: React.FC<SidebarProps> = ({ showMenu }) => {
  const { menuItems } = sidebarMenuItemsData;

  const renderMenuItems = (items: typeof menuItems) =>
    items.map((item) =>
      item.subItems ? (
        <Menu.SubMenu key={item.text} title={item.text} icon={iconComponents[item.icon || '']}>
          {item.subItems.map((subItem) => (
            <Menu.Item key={subItem.url} onClick={() => window.location.href = subItem.url}>
              {subItem.text}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item.url} icon={iconComponents[item.icon || '']}>
          {item.text}
        </Menu.Item>
      )
    );

  return (
    <aside className={`fixed top-16 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
      <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
        {renderMenuItems(menuItems)}
      </Menu>
    </aside>
  );
};

export default Sidebar;
