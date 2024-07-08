import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../../services/Api';
import { Tabs, Layout } from 'antd';
import BasicInformation from './Course';
import SessionComponent from './Session';
import LessonComponent from './Lesson';

const { Content } = Layout;

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  const tabItems = [
    { key: '1', label: 'Course', children: <BasicInformation api={api} /> },
    { key: '2', label: 'Session', children: <SessionComponent api={api} /> },
    { key: '3', label: 'Lesson', children: <LessonComponent api={api} /> },
  ];

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Tabs defaultActiveKey="1" items={tabItems} />
        </div>
      </Content>
    </Layout>
  );
};

export default CreateCourse;
