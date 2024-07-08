import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Modal, Space } from 'antd';
import TinyMCEEditor from '../../util/TinyMCEEditor'; 

interface SessionData {
  name: string;
  description: string;
  _id?: string;
}

interface Course {
  _id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  is_deleted: boolean;
  price: number;
  totalSessions?: number;
}

interface SessionProps {
  api: any;
}

const SessionComponent: React.FC<SessionProps> = ({ api }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState<SessionData>({ name: '', description: '' });
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.getCourses({
          keyword: '',
          category: '',
          status: 'new',
          is_deleted: false,
        }, 1, 10);
        console.log('Courses:', response);
        if (Array.isArray(response.data.pageData)) {
          const coursesWithSessionCount = await Promise.all(
            response.data.pageData.map(async (course: Course) => {
              const sessionCountResponse = await api.getSessions({
                keyword: '',
                course_id: course._id,
                is_position_order: false,
                is_deleted: false,
              }, 1, 1);
              return {
                ...course,
                totalSessions: sessionCountResponse.data.pageInfo.totalItems,
              };
            })
          );
          setCourses(coursesWithSessionCount);
        } else {
          console.error('Expected an array of courses, but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [api]);

  const addSession = (courseId: string) => {
    setCurrentCourseId(courseId);
    setCurrentSession({ name: '', description: '' });
    setIsAddingSession(true);
    setIsModalVisible(true);
    form.resetFields(); // Reset form fields when adding a new session
  };

  const viewSessions = async (courseId: string) => {
    try {
      const response = await api.getSessions({
        keyword: '',
        course_id: courseId,
        is_position_order: false,
        is_deleted: false,
      }, 1, 10);
      setSessions(response.data.pageData);
      setCurrentCourseId(courseId);
      setIsAddingSession(false);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isAddingSession && currentCourseId) {
        const response = await api.createSession({ ...values, course_id: currentCourseId });
        setSessions([...sessions, { ...values, _id: response.data._id }]);
        setIsModalVisible(false);
      } else {
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Course Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Total Sessions', dataIndex: 'totalSessions', key: 'totalSessions' },
    {
      title: 'Action', key: 'action', render: (text: any, record: Course) => (
        <Space>
          <Button type="primary" onClick={() => addSession(record._id)}>Add Session</Button>
          <Button type="default" onClick={() => viewSessions(record._id)}>Detail</Button>
        </Space>
      )
    }];

  return (
    <div>
      <h2>Sessions</h2>
      <Table 
        dataSource={courses} 
        columns={columns} 
        rowKey="_id" 
      />
      <Modal 
        title={isAddingSession ? "Add Session" : "Session Details"} 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        width={isAddingSession ? 520 : 800}
      >
        {isAddingSession ? (
          <Form form={form} layout="vertical" initialValues={currentSession}>
            <Form.Item 
              label="Session Name" 
              name="name" 
              rules={[{ required: true, message: 'Please enter the session name!' }]}
            >
              <Input 
                value={currentSession.name} 
                onChange={(e) => setCurrentSession({ ...currentSession, name: e.target.value })} 
              />
            </Form.Item>
            <Form.Item 
              label="Session Description" 
              name="description" 
              rules={[{ required: true, message: 'Please enter the session description!' }]}
            >
              <TinyMCEEditor
                value={currentSession.description}
                onEditorChange={(content: string) => {
                  setCurrentSession({ ...currentSession, description: content });
                  form.setFieldsValue({ description: content }); // Set the value in the form
                }}
              />
            </Form.Item>
          </Form>
        ) : (
          <Table 
            dataSource={sessions} 
            columns={[
              { title: 'Session Name', dataIndex: 'name', key: 'name' },
              { title: 'Description', dataIndex: 'description', key: 'description' }
            ]}
            rowKey="_id"
          />
        )}
      </Modal>
    </div>
  );
};

export default SessionComponent;
