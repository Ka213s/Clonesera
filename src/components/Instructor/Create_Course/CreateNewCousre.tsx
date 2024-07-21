import React from 'react';
import { Tabs, Layout, Tag, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import BasicInformation from './Course/Course';
import SessionComponent from './Session/Session';
import LessonComponent from './Lession/Lesson';

const { Content } = Layout;

const statusSteps = [
  { key: 'new', label: 'New', color: 'blue', description: '(This is a new course)' },
  { key: 'waiting_approve', label: 'Waiting Approve', color: 'gold', description: '(Awaiting approval from admin)' },
  { key: 'approve', label: 'Approve', color: 'green', description: '(Course has been approved)' },
  { key: 'reject', label: 'Reject', color: 'volcano', description: '(Course has been rejected)' },
  { key: 'active', label: 'Active', color: 'geekblue', description: '(Course is currently active)' },
  { key: 'inactive', label: 'Inactive', color: 'gray', description: '(Course is currently inactive)' },
];

const StatusMenu = () => (
  <Row justify="center" align="middle" style={{ marginBottom: '20px' }}>
    {statusSteps.map((step, index) => (
      <React.Fragment key={step.key}>
        <Col style={{ textAlign: 'center' }}>
          <Tag color={step.color} style={{ fontSize: '16px' }}>{step.label}</Tag>
          <div style={{ fontSize: '12px' }}>{step.description}</div>
        </Col>
        {index < statusSteps.length - 1 && (
          <Col>
            <ArrowRightOutlined style={{ fontSize: '16px', margin: '0 8px' }} />
          </Col>
        )}
      </React.Fragment>
    ))}
  </Row>
);

const CreateCourse: React.FC = () => {
  const tabItems = [
    { key: '1', label: 'Course', children: <BasicInformation /> },
    { key: '2', label: 'Session', children: <SessionComponent /> },
    { key: '3', label: 'Lesson', children: <LessonComponent /> },
  ];

  return (
    <Layout className="layout">
      <StatusMenu />
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Tabs defaultActiveKey="1" items={tabItems} />
        </div>
      </Content>
    </Layout>
  );
};

export default CreateCourse;
