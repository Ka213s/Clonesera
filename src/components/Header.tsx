import React, { useEffect, useState } from 'react';
import { Button, Badge, Dropdown, Avatar, MenuProps } from 'antd';
import { MenuOutlined, PlusOutlined, ShoppingCartOutlined, MailOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo-2.png';

type HeaderProps = {
  toggleMenu: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.avatar) {
        setAvatar(userData.avatar);
      }
      setRole(userData.role);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setAvatar(null);
    setRole(null);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (role === 'admin') {
      e.preventDefault();
      navigate('/request-management'); // or the current admin page
    }
  };

  const notificationMenuItems: MenuProps['items'] = [
    { key: '1', label: 'Notification 1' },
    { key: '2', label: 'Notification 2' },
    { key: '3', label: 'Notification 3' },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Link to="/profile">
          <UserOutlined /> Profile
        </Link>
      ),
    },
    {
      key: 'logout',
      label: (
        <span onClick={handleLogout}>
          <UserOutlined /> Logout
        </span>
      ),
    },
  ];

  return (
    <header className="flex items-center justify-between p-2.5 bg-white shadow-md fixed top-0 left-0 w-full z-30">
      <div className="flex items-center space-x-4">
        <Button icon={<MenuOutlined />} onClick={toggleMenu} shape="circle" className="bg-[#9997F5] text-[#ffffff]" />
        <Link to="/" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className="h-12 w-auto cursor-pointer" />
        </Link>
      </div>

      <div className="flex items-center ml-auto space-x-8 pr-4">
        {isLoggedIn ? (
          <>
            <Button type="primary" className="hidden md:block bg-[#9997F5] hover:bg-[#8886E5] border-none w-35 h-7 text-xs">
              Create New Course
            </Button>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              className="block md:hidden bg-[#9997F5] border-none hover:!bg-[#8886E5]"
            />

            <Badge count={2}>
              <ShoppingCartOutlined className="text-xl cursor-pointer" />
            </Badge>

            <Badge count={3}>
              <Dropdown menu={{ items: notificationMenuItems }} trigger={['click']}>
                <MailOutlined className="text-xl cursor-pointer" />
              </Dropdown>
            </Badge>

            <Badge count={5}>
              <Dropdown menu={{ items: notificationMenuItems }} trigger={['click']}>
                <BellOutlined className="text-xl cursor-pointer" />
              </Dropdown>
            </Badge>

            <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
              <Avatar
                size="large"
                src={avatar || 'default-avatar-path'} // Provide a default avatar path if avatar is null
                className="border-2 border-purple-400 hover:border-purple-700 transition duration-300 ease-in-out"
              />
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button type="primary" className="bg-[#9997F5] hover:bg-[#8886E5] border-none">Login</Button>
            </Link>
            <Link to="/register">
              <Button type="primary" className="bg-[#9997F5] hover:bg-[#8886E5] border-none">Register</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
