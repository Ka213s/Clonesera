import React, { useEffect, useState } from 'react';
import { Button, Badge, Dropdown, Avatar, Typography, Divider, Input } from 'antd';
import { PlusOutlined, ShoppingCartOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import logo from '../assets/Logo-2.png';
import { useCartContext } from '../consts/CartContext';

const { Text } = Typography;
const { Search } = Input;

const HeaderNoMenu: React.FC = () => {
  const [userState, setUserState] = useState({
    avatar: null,
    isLoggedIn: false,
    role: null,
    username: null
  });
  const { totalCartItems } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserState({
        avatar: userData.avatar || null,
        isLoggedIn: true,
        role: userData.role,
        username: userData.name
      });
    } else {
      setUserState(prevState => ({
        ...prevState,
        isLoggedIn: false
      }));
    }
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (userState.role === 'admin') {
      navigate('/display-account');
    } else {
      navigate('/homepage');
    }
  };

  const handleCreateCourse = () => {
    navigate('/courses');
  };

  const handleViewCart = () => {
    navigate('/view-cart');
  };

  const handleSearch = (value: string) => {
    navigate(`/homepage/view-all-course?search=${value}`);
  };

  const userMenu: MenuProps['items'] = [
    {
      key: 'welcome',
      label: (
        <Text>Welcome, {userState.username}!</Text>
      )
    },
    { type: 'divider' },
    {
      key: 'profile',
      label: (
        <Link to="/view-my-profile">
          <UserOutlined /> Profile
        </Link>
      )
    },
    {
      key: 'logout',
      label: (
        <span onClick={() => navigate('/logout')}>
          <UserOutlined /> Logout
        </span>
      )
    }
  ];

  return (
    <header className="flex items-center justify-between p-2.5 bg-white shadow-md fixed top-0 left-0 w-full z-30">
      <div className="flex items-center space-x-4 ml-5">
        <Link to="/" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className="h-12 w-auto cursor-pointer" />
        </Link>
      </div>

      <div className="flex-grow flex justify-center">
        <Search
          placeholder="Search courses"
          enterButton={
            <Button type="primary" style={{ backgroundColor: '#22c55e', borderColor: '#22c55e' }}>
              <SearchOutlined />
            </Button>
          }
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      <div className="flex items-center ml-auto space-x-8 pr-4">
        {userState.isLoggedIn ? (
          <>
            {userState.role === 'instructor' && (
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
              </>
            )}
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
                  src={userState.avatar || 'default-avatar-path'}
                  className="border-2 hover:border-gray-800 transition duration-300 ease-in-out"
                />
              </Dropdown>
            </div>
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

export default HeaderNoMenu;
