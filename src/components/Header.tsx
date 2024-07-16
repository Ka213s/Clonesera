import React, { useEffect, useState } from 'react';
import { Button, Badge, Dropdown, Avatar, Menu, Typography } from 'antd';
import { MenuOutlined, PlusOutlined, ShoppingCartOutlined, MailOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo-2.png';


const { Text } = Typography;

type HeaderProps = {
  toggleMenu: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.avatar) {
        setAvatar(userData.avatar);
      }
      setRole(userData.role);
      setUsername(userData.name);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (role === 'admin') {
      e.preventDefault();
      navigate('/request-management');
    }
  };

  const handleCreateCourse = () => {
    navigate('/courses');
  };

  const notificationMenuItems = (
    <Menu>
      <Menu.Item key="1">Notification 1</Menu.Item>
      <Menu.Item key="2">Notification 2</Menu.Item>
      <Menu.Item key="3">Notification 3</Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="welcome">
        <Text>Welcome, {username}!</Text>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile">
        <Link to="/view-profile">
          <UserOutlined /> Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <span onClick={() => navigate('/logout')}>
          <UserOutlined /> Logout
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="flex items-center justify-between p-2.5 bg-white shadow-md fixed top-0 left-0 w-full z-30">
      <div className="flex items-center space-x-4">
        <Button 
          icon={<MenuOutlined />} 
          onClick={toggleMenu} 
          shape="circle" 
          className="button-menu" 
        />
        <Link to="/" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className="h-12 w-auto cursor-pointer" />
        </Link>
      </div>

      <div className="flex items-center ml-auto space-x-8 pr-4">
        {isLoggedIn ? (
          <>
            <Button type="primary" className="custom-button">
              Create New Course
            </Button>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              className="block md:hidden bg-black border-none hover:bg-gray-800"
              onClick={handleCreateCourse}
            />

            <Badge count={2}>
              <ShoppingCartOutlined className="text-2xl icon-size  cursor-pointer text-black" />
            </Badge>

            <Badge count={3}>
              <Dropdown overlay={notificationMenuItems} trigger={['click']}>
                <MailOutlined className="icon-size text-2xl  cursor-pointer text-black" />
              </Dropdown>
            </Badge>

            <Badge count={5}>
              <Dropdown overlay={notificationMenuItems} trigger={['click']}>
                <BellOutlined className="icon-size text-2xl  cursor-pointer text-black" />
              </Dropdown>
            </Badge>

            <Dropdown overlay={userMenu} trigger={['click']}>
              <Avatar
                size="large"
                src={avatar || 'default-avatar-path'} 
                className="border-2 border-black hover:border-gray-800 transition duration-300 ease-in-out"
              />
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button type="primary" className="custom-button">Login</Button>
            </Link>
            <Link to="/register">
              <Button type="primary" className="custom-button">Register</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
