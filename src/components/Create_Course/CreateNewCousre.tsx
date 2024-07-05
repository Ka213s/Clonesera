import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../../services/Api';
import { Tabs, Layout } from 'antd';
import BasicInformation from './BasicInformation';
import SessionComponent from './Session';
import LessonComponent from './Lesson';

const { Content } = Layout;
const { TabPane } = Tabs;

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


  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Basic Information" key="1">
              <BasicInformation
                formData={formData}
                setFormData={setFormData}
                api={api}
                setCourseId={setCourseId}
              />
            </TabPane>
            <TabPane tab="Session" key="2">
              <SessionComponent  api={api}  />
            </TabPane>
            <TabPane tab="Lesson" key="3">
              <LessonComponent api={api} courseId={courseId} />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateCourse;
