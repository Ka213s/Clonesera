import React, { useEffect, useState } from 'react';
import { Button, Badge, Dropdown, Avatar, Typography, Divider } from 'antd';
import type { MenuProps } from 'antd';
import { MenuOutlined, PlusOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo-2.png';
import { useCartContext } from '../consts/CartContext'; // Import the custom hook

const { Text } = Typography;

type HeaderProps = {
  toggleMenu: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const { totalCartItems } = useCartContext();
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
      navigate('/display-account');
    } else {
      e.preventDefault();
      navigate('/homepage');
    }
  };

  const handleCreateCourse = () => {
    navigate('/courses');
  };

  const handleViewCart = () => {
    navigate('/view-cart');
  };

  const userMenu: MenuProps['items'] = [
    {
      key: 'welcome',
      label: <Text>Welcome, {username}!</Text>,
    },
    {
      type: 'divider',
    },
    {
      key: 'profile',
      label: (
        <Link to="/view-my-profile">
          <UserOutlined /> Profile
        </Link>
      ),
    },
    {
      key: 'logout',
      label: (
        <span onClick={() => navigate('/logout')}>
          <UserOutlined /> Logout
        </span>
      ),
    },
  ];

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
            <Button type="primary" className="custom-button" onClick={handleCreateCourse}>
              Create New Course
            </Button>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              className="block md:hidden bg-black border-none hover:bg-gray-800"
              onClick={handleCreateCourse}
            />

            <Badge count={totalCartItems}>
              <ShoppingCartOutlined
                className="icon-size text-2xl cursor-pointer text-black"
                onClick={handleViewCart}
              />
            </Badge>

            <Divider className="border-gray-400 h-9" type="vertical" />
            <div className="">
              <Dropdown menu={{ items: userMenu }} trigger={['click']}>
                <Avatar
                  size="large"
                  src={avatar || 'default-avatar-path'}
                  className="border-2 hover:border-gray-800 transition duration-300 ease-in-out"
                />
              </Dropdown>
            </div>
          </>
        ) : (
          <>
              <Link to="/login">
                <Button type="primary">Login</Button>
              </Link>
              <Link to="/register">
                <Button type="primary">Register</Button>
              </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
