import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Input, Select, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
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
}

const AllInstructor: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Instructor[]>(data);
  const [filters, setFilters] = useState({
    name: '',
    gender: '',
    mobile: '',
    email: '',
    joiningDate: ''
  });

  const navigate = useNavigate();

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const applyFilters = () => {
    let filtered = data;
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
    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      gender: '',
      mobile: '',
      email: '',
      joiningDate: ''
    });
    setFilteredData(data);
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-instructor/${id}`);
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
      title: 'Action',
      key: 'action',
      render: (_: any, record: Instructor) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            style={{ backgroundColor: '#6A0DAD', borderColor: '#6A0DAD' }}
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          />
          <Button
            type="primary"
            danger
            style={{ backgroundColor: '#6A0DAD', borderColor: '#6A0DAD' }}
            icon={<DeleteOutlined />}
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
        <Col span={4}>
          <Input placeholder="Name" value={filters.name} onChange={(e) => handleFilterChange('name', e.target.value)} />
        </Col>
        <Col span={4}>
          <Select placeholder="Gender" value={filters.gender} onChange={(value) => handleFilterChange('gender', value)} style={{ width: '100%' }}>
            <Option value="">All</Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Col>
        <Col span={4}>
          <Input placeholder="Mobile" value={filters.mobile} onChange={(e) => handleFilterChange('mobile', e.target.value)} />
        </Col>
        <Col span={4}>
          <Input placeholder="Email" value={filters.email} onChange={(e) => handleFilterChange('email', e.target.value)} />
        </Col>
        <Col span={4}>
          <Input placeholder="Joining Date" value={filters.joiningDate} onChange={(e) => handleFilterChange('joiningDate', e.target.value)} />
        </Col>
        <Col span={1}>
          <Button type="primary" style={{ backgroundColor: '#6A0DAD', borderColor: '#6A0DAD' }} onClick={applyFilters}>Filter</Button>
        </Col>
        <Col span={1}>
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
    </div>
  );
};

export default AllInstructor;
