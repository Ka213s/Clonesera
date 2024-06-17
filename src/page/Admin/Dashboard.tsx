import React, { useState } from 'react';
import { Card, Col, Row, Button, Modal, Form, Input } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import MainLayout from '../../layouts/MainLayout';
import PopularCourses from './PopularCourses';
import StudentsOverview from './StudentsOverview';
import TopInstructors from './TopInstructors';
import DashboardStatistics from './DashboardStatistics';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const pieData = [
  { name: 'In Progress', value: 400 },
  { name: 'Not Completed', value: 300 },
  { name: 'Completed', value: 300 },
];

const columns = [
  {
    title: 'Course Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <div>
        <img
          src={`/path/to/course/image`}
          alt="course"
          className="w-8 h-8 rounded-full mr-2"
        />
        {text}
      </div>
    ),
  },
  {
    title: 'Instructors',
    dataIndex: 'instructors',
    key: 'instructors',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Course Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'Active' ? 'green' : 'red'}>
        {status}
      </Tag>
    ),
  },
];

const coursesData = [
  {
    key: '1',
    name: 'Introduction of UI/UX',
    instructors: 'Esther Howard',
    category: 'Design',
    duration: '3 Month',
    amount: '$450',
    type: 'Online',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Introduction of UI/UX',
    instructors: 'Esther Howard',
    category: 'Design',
    duration: '3 Month',
    amount: '$450',
    type: 'Online',
    status: 'Active',
  },
  {
    key: '3',
    name: 'Introduction of UI/UX',
    instructors: 'Esther Howard',
    category: 'Design',
    duration: '3 Month',
    amount: '$450',
    type: 'Online',
    status: 'Active',
  },
];

const Dashboard: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalVisible(false);
        console.log('Received values of form: ', values);
        // Add the logic to handle the form submission here
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <MainLayout>
      <div className="site-statistic-demo-card pt-10">
        <div className="flex justify-end mb-4">
          <Button
            type="primary"
            icon={<AiOutlinePlus />}
            className="bg-[#9997F5] border-[#9997F5] mr-4"
          >
            Add Order
          </Button>
          <Button
            type="primary"
            icon={<AiOutlinePlus />}
            className="bg-[#9997F5] border-[#9997F5]"
            onClick={showModal}
          >
            Add User
          </Button>
        </div>
        <DashboardStatistics />
        <Row gutter={16} className="mb-6">
          <Col span={16}>
            <LineChartComponent />
          </Col>
          <Col span={8}>
            <PieChartComponent />
          </Col>
        </Row>
        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <PopularCourses />
          </Col>
          <Col span={8}>
            <StudentsOverview />
          </Col>
          <Col span={8}>
            <TopInstructors />
          </Col>
        </Row>
        <Row gutter={16} className="mb-6">
          <Col span={24}>
            <Card>
              <CourseTableColumns />
            </Card>
          </Col>
        </Row>
        <Modal title="Add User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} layout="vertical" name="add_user_form">
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input the username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
