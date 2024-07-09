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

interface SidebarProps {
  showMenu: boolean;
}

interface MenuItem {
  text: string;
  icon?: JSX.Element;
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
};

const Sidebar: React.FC<SidebarProps> = ({ showMenu }) => {
  const menuItems: MenuItem[] = [
    { text: 'Home', icon: iconComponents['HomeOutlined'], url: '/home' },
    { text: 'LiveStream', icon: iconComponents['VideoCameraOutlined'], url: '/livestream' },
    { text: 'Explore', icon: iconComponents['CompassOutlined'], url: '/explore' },
    {
      text: 'Categories',
      icon: iconComponents['UnorderedListOutlined'],
      url: '#',
      subItems: [
        { text: 'Development', url: '/categories/development' },
        { text: 'Business', url: '/categories/business' },
        { text: 'Finance & Accounting', url: '/categories/finance-accounting' },
        { text: 'IT & Software', url: '/categories/it-software' },
        { text: 'Office Productivity', url: '/categories/office-productivity' },
        { text: 'Personal Development', url: '/categories/personal-development' },
        { text: 'Design', url: '/categories/design' },
        { text: 'Marketing', url: '/categories/marketing' },
        { text: 'Lifestyle', url: '/categories/lifestyle' },
        { text: 'Photography', url: '/categories/photography' },
        { text: 'Health & Fitness', url: '/categories/health-fitness' },
        { text: 'Music', url: '/categories/music' },
        { text: 'Teaching & Academics', url: '/categories/teaching-academics' },
      ],
    },
    {
      text: 'Tests',
      icon: iconComponents['BookOutlined'],
      url: '#',
      subItems: [
        { text: 'Certification Center', url: '/tests/certification-center' },
        { text: 'Certification Fill Form', url: '/tests/certification-fill-form' },
        { text: 'Test View', url: '/tests/test-view' },
        { text: 'Test Result', url: '/tests/test-result' },
        { text: 'My Certification', url: '/tests/my-certification' },
      ],
    },
    { text: 'Saved Course', icon: iconComponents['SaveOutlined'], url: '/saved' },
    { text: 'Page Subscription', icon: iconComponents['BellOutlined'], url: '/subscription' },
    { text: 'Setting', icon: iconComponents['SettingOutlined'], url: '/settings' },
    { text: 'Help', icon: iconComponents['QuestionCircleOutlined'], url: '/help' },
    { text: 'Report History', icon: iconComponents['HistoryOutlined'], url: '/report-history' },
    { text: 'Send Feedback', icon: iconComponents['SendOutlined'], url: '/feedback' },
  ];

  const renderMenuItems = (items: MenuItem[]) =>
    items.map((item) =>
      item.subItems ? (
        <Menu.SubMenu key={item.text} title={item.text} icon={item.icon}>
          {item.subItems.map((subItem) => (
            <Menu.Item key={subItem.url} onClick={() => console.log('Navigate to:', subItem.url)}>
              {subItem.text}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item.url} icon={item.icon} onClick={() => console.log('Navigate to:', item.url)}>
          {item.text}
        </Menu.Item>
      )
    );

  return (
    <aside className={`fixed top-24 left-0 h-full bg-white shadow-md transition-all duration-300 ${showMenu ? 'w-56' : 'w-0 overflow-hidden'}`}>
      <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
        {renderMenuItems(menuItems)}
      </Menu>
    </aside>
  );
};

export default Sidebar;
