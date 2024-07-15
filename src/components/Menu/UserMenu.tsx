import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

export const UserMenu: React.FC = () => (
  <Menu>
    <Menu.Item key="profile">
      <Link to="/view-profile">
        <UserOutlined /> Profile
      </Link>
    </Menu.Item>
    <Menu.Item key="logout">
      <Link to="/logout">
        <UserOutlined /> Logout
      </Link>
    </Menu.Item>
  </Menu>
);
