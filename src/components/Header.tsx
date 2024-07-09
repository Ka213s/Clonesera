import React from 'react';
import { Button, Badge, Dropdown, Avatar, Menu, Input } from 'antd';
import {
  MenuOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  MailOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo-2.png';

const { Search } = Input;

type HeaderProps = {
  toggleMenu: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  return (
    <header className="flex items-center justify-between p-2.5 bg-white shadow-md fixed top-0 left-0 w-full z-30">
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
        <Button type="primary" className="hidden md:block bg-[#9997F5] hover:bg-[#8886E5] border-none">
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
          <Dropdown overlay={<Menu>{/* Notification Menu Items */}</Menu>} trigger={['click']}>
            <MailOutlined className="text-xl cursor-pointer" />
          </Dropdown>
        </Badge>

        <Badge count={5}>
          <Dropdown overlay={<Menu>{/* Notification Menu Items */}</Menu>} trigger={['click']}>
            <BellOutlined className="text-xl cursor-pointer" />
          </Dropdown>
        </Badge>

        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="profile">
                <Link to="/profile">
                  <UserOutlined /> Profile
                </Link>
              </Menu.Item>
              <Menu.Item key="logout">
                <Link to="/logout">
                  <UserOutlined /> Logout
                </Link>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
