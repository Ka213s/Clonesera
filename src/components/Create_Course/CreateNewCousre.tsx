import React from 'react';
import { Tabs, Layout } from 'antd';
import BasicInformation from './Course/Course';
import SessionComponent from './Session/Session';
import LessonComponent from './Lesson';

const { Content } = Layout;
const CreateCourse: React.FC = () => {

  const tabItems = [
    { key: '1', label: 'Course', children: <BasicInformation /> },
    { key: '2', label: 'Session', children: <SessionComponent /> },
    { key: '3', label: 'Lesson', children: <LessonComponent /> },
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
