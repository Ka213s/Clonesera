import React, { useState, useEffect, useCallback } from 'react';
import { MenuOutlined, PlusOutlined, ShoppingCartOutlined, MailOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { Layout, Input, Badge, Avatar, Menu, Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import logo from '../../assets/Logo-2.png';
import notificationsData from '../../models/FileJson/notificationsData.json';
import userMenuItemsData from '../../models/FileJson/userMenuItems.json';

const { Header: AntHeader } = Layout;
const { Search } = Input;

type Notification = {
  id: number;
  avatar: string;
  message: string;
  time: string;
};

type UserData = {
  role: string;
  name: string;
  email: string;
};

type HeaderProps = {
  toggleMenu: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    setNotifications(notificationsData as Notification[]);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('data');
    if (userData) {
      const parsedUserData = JSON.parse(userData) as UserData;
      setUserRole(parsedUserData.role);
      setIsLoggedIn(true);
      setUserName(parsedUserData.name);
    }
  }, []);

  const handleCreateCourse = useCallback(() => {
    navigate('/createCourse');
  }, [navigate]);

  const handleMenuClick = useCallback((url: string) => {
    navigate(url);
  }, [navigate]);

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'welcome',
      label: (
        <div className="font-bold">
          Welcome, <span className="text-purple-500">{userName}</span>
        </div>
      ),
      disabled: true,
    },
    ...userMenuItemsData.menuItems.map((item) => ({
      key: item.text,
      label: item.text,
      onClick: () => handleMenuClick(item.url),
    })),
  ];

  const notificationMenuItems: MenuProps['items'] = notifications.map((notification) => ({
    key: notification.id,
    label: (
      <div className="flex items-center">
        <Avatar src={notification.avatar} size="small" />
        <div className="ml-2">
          <p>{notification.message}</p>
          <p className="text-xs text-gray-500">{notification.time}</p>
        </div>
      </div>
    ),
  }));

  return (
    <AntHeader className="flex items-center justify-between p-2.5 bg-white shadow-md fixed top-0 left-0 w-full z-30">
      <Button icon={<MenuOutlined />} onClick={toggleMenu} shape="circle" className="bg-[#9997F5] text-[#ffffff]" />

      <Search
        placeholder="Search..."
        onSearch={(value) => console.log(value)}
        style={{ width: 350 }}
        className="mx-4"
      />

      <div className="flex items-center flex-grow justify-center">
        <Link to="/home">
          <img src={logo} alt="Logo" className="h-16 w-30 cursor-pointer" />
        </Link>
      </div>

      <div className="flex items-center ml-auto space-x-8 pr-4">
        {userRole === 'instructor' && (
          <>
            <Button
              onClick={handleCreateCourse}
              type="primary"
              className="hidden md:block bg-[#9997F5] hover:bg-[#8886E5] border-none"
            >
              Create New Course
            </Button>
            <Button
              onClick={handleCreateCourse}
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              className="block md:hidden bg-[#9997F5] border-none hover:!bg-[#8886E5]"
            />
          </>
        )}

        <Badge count={2}>
          <ShoppingCartOutlined className="text-xl cursor-pointer" />
        </Badge>

        <Badge count={3}>
          <Dropdown menu={{ items: notificationMenuItems }} trigger={['click']}>
            <MailOutlined className="text-xl cursor-pointer" />
          </Dropdown>
        </Badge>

        <Badge count={notifications.length}>
          <Dropdown menu={{ items: notificationMenuItems }} trigger={['click']}>
            <BellOutlined className="text-xl cursor-pointer" />
          </Dropdown>
        </Badge>

        {isLoggedIn && userRole ? (
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <UserOutlined className="text-2xl cursor-pointer" />
          </Dropdown>
        ) : (
          <Button
            type="primary"
            className="!bg-[#9997F5] !border-none hover:!bg-[#8886E5] hover:!text-white"
          >
            <Link to="/login" className="hover:!text-white">Sign in</Link>
          </Button>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
