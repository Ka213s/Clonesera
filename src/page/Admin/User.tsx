import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Form, Space, Layout, Modal, Switch } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from 'react-icons/ai';
import usersData from '../../models/FileJson/Adminusers.json';
import img from '../../assets/Avatar03.jpg'

const { Content } = Layout;
const { Option } = Select;

type UserType = {
  id: string;
  name: string;
  email: string;
  type: string;
  phone: string;
  dob: string;
  status: string;
};

const User: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleToggleStatus = (id: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, status: user.status === 'Active' ? 'Offline' : 'Active' } : user
      )
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === values.id ? { ...user, ...values } : user))
      );
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <img
            src={img}
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
      render: (status: string, record: UserType) => (
        <Switch
          checked={status === 'Active'}
          onChange={() => handleToggleStatus(record.id)}
          checkedChildren="Active"
          unCheckedChildren="Offline"
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: UserType) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        </Space>
      ),
    },
  ];

  return (
 
      <Content style={{ margin: '16px' }}>
        <div className="mb-4 flex">
          <Form layout="inline">
            <Form.Item>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Select placeholder="Type" style={{ width: 120 }}>
                <Option value="Admin">Admin</Option>
                <Option value="User">User</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="DOB" />
            </Form.Item>
            <Form.Item>
              <Select placeholder="Status" style={{ width: 120 }}>
                <Option value="Active">Active</Option>
                <Option value="Offline">Offline</Option>
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
        <Table columns={columns} dataSource={users} rowKey="id" />
        <Button
          type="primary"
          icon={<AiOutlinePlus />}
          className="mt-4"
        >
          Add User
        </Button>

        <Modal
          title="Edit User"
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={handleSave}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="id" label="ID" style={{ display: 'none' }}>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
              <Input />
              </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the type!' }]}>
              <Select>
                <Option value="Admin">Admin</Option>
                <Option value="User">User</Option>
              </Select>
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone number!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="dob" label="DOB" rules={[{ required: true, message: 'Please input the date of birth!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Offline">Offline</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
  );
};

export default User;

