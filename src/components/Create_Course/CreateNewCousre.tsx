import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../../services/Api';
import { Tabs, Layout } from 'antd';
import BasicInformation from './BasicInformation';
import SessionComponent from './Session';
import LessonComponent from './Lesson';

const { Content } = Layout;

interface FormData {
  title: string;
  description: string;
  content: string;
  category_id: string;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
}

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    content: '',
    category_id: '',
    video_url: '',
    image_url: '',
    price: 0,
    discount: 0,
  });

  const [courseId, setCourseId] = useState<string | null>(null);

  const tabItems = [
    {
      key: '1',
      label: 'Basic Information',
      children: (
        <BasicInformation
          formData={formData}
          setFormData={setFormData}
          api={api}
          setCourseId={setCourseId}
        />
      ),
    },
    {
      key: '2',
      label: 'Session',
      children: <SessionComponent api={api} />,
    },
    {
      key: '3',
      label: 'Lesson',
      children: <LessonComponent api={api} courseId={courseId} />,
    },
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
