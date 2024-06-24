import React, { useState, useEffect, useCallback } from 'react';
import { MenuOutlined, SearchOutlined, PlusOutlined, ShoppingCartOutlined, MailOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { Layout, Input, Badge, Avatar, Menu, Dropdown, Button } from 'antd';
import logo from '../../assets/Logo-2.png';
import notificationsData from '../../models/FileJson/notificationsData.json';
import userMenuItemsData from '../../models/FileJson/userMenuItems.json';

const { Header: AntHeader } = Layout;
const { Search } = Input;

interface Notification {
  id: number;
  avatar: string;
  message: string;
  time: string;
}

interface UserData {
  roleId: number;
  name: string;
  email: string;
}

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    setNotifications(notificationsData);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData: UserData = JSON.parse(userData);
      setUserRole(parsedUserData.roleId);
      setIsLoggedIn(true);
      setUserName(parsedUserData.name);
      setUserEmail(parsedUserData.email);
    }
  }, []);

  const handleCreateCourse = useCallback(() => {
    navigate('/createCourse');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  }, [navigate]);

  const handleMenuClick = useCallback((url: string) => {
    navigate(url);
  }, [navigate]);

  const userMenu = (
    <Menu>
      <Menu.Item key="welcome" disabled>
        <div className="font-bold">
          Welcome, <span className="text-purple-500">{userName}</span>
        </div>
        <div className="text-gray-500">{userEmail}</div>
      </Menu.Item>
      <Menu.Divider />
      {userMenuItemsData.menuItems.map((item, index) => (
        <Menu.Item key={index} onClick={() => handleMenuClick(item.url)}>
          {item.text}
        </Menu.Item>
      ))}
    </Menu>
  );

  const notificationMenu = (
    <Menu>
      {notifications.map((notification) => (
        <Menu.Item key={notification.id}>
          <div className="flex items-center">
            <Avatar src={notification.avatar} size="small" />
            <div className="ml-2">
              <p>{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <AntHeader className="flex items-center justify-between p-2.5 bg-white shadow-md fixed top-0 left-0 w-full z-30">
      <Button icon={<MenuOutlined />} onClick={toggleMenu} shape="circle" className="bg-[#8886E5] text-[#ffffff]" />

      <Search
        placeholder="Search..."
        onSearch={(value) => console.log(value)}
        style={{ width: 220 }}
        className="mx-4"
      />

      <div className="flex items-center flex-grow justify-center">
        <Link to="/home">
          <img src={logo} alt="Logo" className="h-12 cursor-pointer" />
        </Link>
      </div>

      <div className="flex items-center ml-auto space-x-8 pr-4">
        {userRole === 3 && (
          <>
            <Button
              onClick={handleCreateCourse}
              type="primary"
              className="hidden md:block bg-[#9997F5] hover:bg-[#8886E5] border-none "
            >
              Create New Course
            </Button>
            <Button
              onClick={handleCreateCourse}
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              className="block md:hidden bg-[#9997F5] border-none hover:bg-[#8886E5]"
            />
          </>
        )}

        <Badge count={2}>
          <ShoppingCartOutlined className="text-xl cursor-pointer" />
        </Badge>

        <Badge count={3}>
          <Dropdown overlay={notificationMenu} trigger={['click']}>
            <MailOutlined className="text-xl cursor-pointer" />
          </Dropdown>
        </Badge>

        <Badge count={notifications.length}>
          <Dropdown overlay={notificationMenu} trigger={['click']}>
            <BellOutlined className="text-xl cursor-pointer" />
          </Dropdown>
        </Badge>

        {isLoggedIn ? (
          <Dropdown overlay={userMenu} trigger={['click']}>
            <UserOutlined className="text-2xl cursor-pointer" />
          </Dropdown>
        ) : (
          <Button type="primary" className="bg-[#9997F5] border-none hover:bg-[#8886E5]">
            <Link to="/login">Sign in</Link>
          </Button>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;