import React, { useState } from 'react';
import { Table, Button, Input, Select, Row, Col, Modal, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import data from '../../models/FileJson/allInstructor.json';
import img from '../../assets/Avatar03.jpg';

const { Option } = Select;

interface Instructor {
  id: string;
  profile: string;
  name: string;
  gender: string;
  mobile: string;
  email: string;
  joiningDate: string;
  password: string;
  role: string;
  isActive: boolean;
}

// Initialize data with isActive attribute
const initialData = data.map(item => ({ ...item, isActive: true }));

const AllInstructor: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Instructor[]>(initialData);
  const [filters, setFilters] = useState({
    name: '',
    gender: '',
    mobile: '',
    email: '',
    joiningDate: '',
    password: '',
    role: ''
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const applyFilters = () => {
    let filtered = initialData;
    if (filters.name) {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(filters.name.toLowerCase()));
    }
    if (filters.gender) {
      filtered = filtered.filter((item) => item.gender === filters.gender);
    }
    if (filters.mobile) {
      filtered = filtered.filter((item) => item.mobile.includes(filters.mobile));
    }
    if (filters.email) {
      filtered = filtered.filter((item) => item.email.toLowerCase().includes(filters.email.toLowerCase()));
    }
    if (filters.joiningDate) {
      filtered = filtered.filter((item) => item.joiningDate.includes(filters.joiningDate));
    }
    if (filters.role) {
      filtered = filtered.filter((item) => item.role === filters.role);
    }
    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      gender: '',
      mobile: '',
      email: '',
      joiningDate: '',
      password: '',
      role: ''
    });
    setFilteredData(initialData);
  };

  const showEditModal = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditChange = (key: string, value: string) => {
    if (editingInstructor) {
      setEditingInstructor({
        ...editingInstructor,
        [key]: value
      });
    }
  };



  const toggleActiveStatus = (instructor: Instructor) => {
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.id === instructor.id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      render: () => <img src={img} alt="profile" className="w-8 h-8 rounded-full" />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Joining Date',
      dataIndex: 'joiningDate',
      key: 'joiningDate'
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Active',
      key: 'isActive',
      render: (_: any, record: Instructor) => (
        <div style={{ position: 'relative', width: '60px', display: 'inline-block', textAlign: 'left', top: '5px' }}>
          <input
            style={{ display: 'none' }}
            id={`toggle-switch-${record.id}`}
            type="checkbox"
            checked={record.isActive}
            onChange={() => toggleActiveStatus(record)}
          />
          <label
            htmlFor={`toggle-switch-${record.id}`}
            style={{
              display: 'block',
              overflow: 'hidden',
              cursor: 'pointer',
              height: '32px',
              padding: '0',
              lineHeight: '32px',
              border: '2px solid #ddd',
              borderRadius: '32px',
              backgroundColor: record.isActive ? '#4caf50' : '#ddd',
              transition: 'background-color 0.3s ease-in',
            }}
          >
            <span
              style={{
                content: '',
                display: 'block',
                width: '32px',
                height: '32px',
                margin: '0',
                background: '#fff',
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: record.isActive ? '0px' : '28px',
                border: '2px solid #ddd',
                borderRadius: '32px',
                transition: 'all 0.3s ease-in 0s',
              }}
            />
          </label>
        </div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Instructor) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            style={{ backgroundColor: '#6A0DAD', borderColor: '#6A0DAD' }}
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
         
        </div>
      )
    }
  ];

  return (
    <div className="p-4 bg-white text-black min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">All Professors</h1>
        <Button type="primary" style={{ backgroundColor: '#6A0DAD', borderColor: '#6A0DAD' }}>+ Add new</Button>
      </div>
      <Row gutter={[16, 16]} className="mb-4">
        <Col span={3}>
          <Input placeholder="Name" value={filters.name} onChange={(e) => handleFilterChange('name', e.target.value)} />
        </Col>
        <Col span={3}>
          <Select placeholder="Gender" value={filters.gender} onChange={(value) => handleFilterChange('gender', value)} style={{ width: '100%' }}>
            <Option value="">Gender</Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Col>
        <Col span={3}>
          <Select placeholder="Role" value={filters.role} onChange={(value) => handleFilterChange('role', value)} style={{ width: '100%' }}>
            <Option value="">Role</Option>
            <Option value="Instructor">Instructor</Option>
            <Option value="Student">Student</Option>
          </Select>
        </Col>
        <Col span={3}>
          <Input placeholder="Mobile" value={filters.mobile} onChange={(e) => handleFilterChange('mobile', e.target.value)} />
        </Col>
        <Col span={3}>
          <Input placeholder="Email" value={filters.email} onChange={(e) => handleFilterChange('email', e.target.value)} />
        </Col>
        <Col span={3}>
          <Input placeholder="Joining Date" value={filters.joiningDate} onChange={(e) => handleFilterChange('joiningDate', e.target.value)} />
        </Col>
        <Col span={1.5}>
          <Button type="primary" style={{ backgroundColor: '#6A0DAD', borderColor: '#6A0DAD' }} onClick={applyFilters}>Filter</Button>
        </Col>
        <Col span={1.5}>
          <Button type="default" onClick={clearFilters}>Clear</Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        className="bg-white"
        rowClassName="bg-gray-100"
        rowKey="id"
      />
      <Modal title="Edit Instructor" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input value={editingInstructor?.name} onChange={(e) => handleEditChange('name', e.target.value)} />
          </Form.Item>
          <Form.Item label="Gender">
            <Select value={editingInstructor?.gender} onChange={(value) => handleEditChange('gender', value)} style={{ width: '100%' }}>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Mobile">
            <Input value={editingInstructor?.mobile} onChange={(e) => handleEditChange('mobile', e.target.value)} />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={editingInstructor?.email} onChange={(e) => handleEditChange('email', e.target.value)} />
          </Form.Item>
          <Form.Item label="Joining Date">
            <Input value={editingInstructor?.joiningDate} onChange={(e) => handleEditChange('joiningDate', e.target.value)} />
          </Form.Item>
          <Form.Item label="Password">
            <Input value={editingInstructor?.password} onChange={(e) => handleEditChange('password', e.target.value)} />
          </Form.Item>
          <Form.Item label="Role">
            <Select value={editingInstructor?.role} onChange={(value) => handleEditChange('role', value)} style={{ width: '100%' }}>
              <Option value="Instructor">Instructor</Option>
              <Option value="Student">Student</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllInstructor;
