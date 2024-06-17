import React, { useState } from 'react';
import { Card, Col, Row, Button, Modal, Form, Input } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import MainLayout from '../../layouts/MainLayout';
import PopularCourses from './PopularCourses';
import StudentsOverview from './StudentsOverview';
import TopInstructors from './TopInstructors';
import DashboardStatistics from './DashboardStatistics';
import LineChartComponent from './LineChartComponent';
import PieChartComponent from './PieChartComponent';
import CourseTableColumns from './CourseTableColumns';

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
