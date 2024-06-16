import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Form, Space, Tag, Layout } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from 'react-icons/ai';
import usersData from '../../models/FileJson/Adminusers.json';
import MainLayout from '../../layouts/MainLayout';

const { Content } = Layout;
const { Option } = Select;

type UserType = {
  name: string;
  email: string;
  type: string;
  phone: string;
  dob: string;
  status: string;
};

const User: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <img
            src={`/path/to/profile/picture`}
            alt="profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          {text}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Online' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: UserType) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} />
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <Content style={{ margin: '16px' }}>
        <div className="mb-4 flex space-x-4">
          <Form layout="inline">
            <Form.Item>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Mobile" />
            </Form.Item>
            <Form.Item>
              <Select placeholder="Select Group" style={{ width: 120 }}>
                <Option value="group1">Group 1</Option>
                <Option value="group2">Group 2</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary">Filter</Button>
            </Form.Item>
            <Form.Item>
              <Button>Clear</Button>
            </Form.Item>
          </Form>
        </div>
        <Table columns={columns} dataSource={users} rowKey="email" />
        <Button
          type="primary"
          icon={<AiOutlinePlus />}
          className="mt-4"
        >
          Add User
        </Button>
      </Content>
    </MainLayout>
  );
};

export default User;
