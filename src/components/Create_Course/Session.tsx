import React, { useEffect, useState, useCallback } from 'react';
import { Form, Input, Button, Table, Modal, Select } from 'antd';
import TinyMCEEditor from '../../util/TinyMCEEditor'; 

interface SessionData {
  name: string;
  description: string;
  _id?: string;
  course_id?: string;
  course_name?: string;
}

interface Course {
  _id: string;
  name: string;
}

interface SessionProps {
  api: any;
}

const SessionComponent: React.FC<SessionProps> = ({ api }) => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSession, setCurrentSession] = useState<SessionData>({ name: '', description: '', course_id: '' });
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({ sessionName: '', courseName: '' });

  const fetchSessions = useCallback(async (sessionName: string, courseName: string) => {
    try {
      const response = await api.getSessions({
        keyword: sessionName,
        is_position_order: false,
        is_deleted: false,
      }, 1, 10);

      const sessionsWithCourseNames = response.data.pageData.map((session: SessionData) => {
        const course = courses.find((c: Course) => c._id === session.course_id);
        if (course && course.name.includes(courseName)) {
          return { ...session, course_name: course.name };
        }
        return null;
      }).filter((session: SessionData | null): session is SessionData => session !== null);

      setSessions(sessionsWithCourseNames);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  }, [api, courses]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await api.getCourses({
        keyword: '',
        is_deleted: false,
        status: 'new',
      }, 1, 50);
      setCourses(response.data.pageData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }, [api]);

  useEffect(() => {
    fetchCourses().then(() => fetchSessions('', ''));
  }, [fetchCourses, fetchSessions]);

  const addSession = () => {
    setCurrentSession({ name: '', description: '', course_id: '' });
    setIsAddingSession(true);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isAddingSession) {
        const response = await api.createSession({ ...values });
        const course = courses.find((c: Course) => c._id === values.course_id);
        setSessions([...sessions, { ...values, _id: response.data._id, course_name: course ? course.name : '' }]);
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

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    fetchSessions(filters.sessionName, filters.courseName);
  };

  const clearFilters = () => {
    setFilters({ sessionName: '', courseName: '' });
    fetchSessions('', '');
  };

  const columns = [
    { title: 'Session Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Course Name', dataIndex: 'course_name', key: 'course_name' }
  ];

  return (
    <div>
      <h2>Sessions</h2>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Input 
            placeholder="Filter by Session Name" 
            value={filters.sessionName} 
            onChange={(e) => handleFilterChange('sessionName', e.target.value)} 
            style={{ width: '200px', marginRight: '8px' }} 
          />
          <Input 
            placeholder="Filter by Course Name" 
            value={filters.courseName} 
            onChange={(e) => handleFilterChange('courseName', e.target.value)} 
            style={{ width: '200px', marginRight: '8px' }} 
          />
          <Button type="primary" onClick={applyFilters} style={{ marginRight: '8px' }}>Filter</Button>
          <Button onClick={clearFilters}>Clear</Button>
        </div>
        <Button type="primary" onClick={addSession}>Add Session</Button>
      </div>
      <Table 
        dataSource={sessions} 
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
        <Form form={form} layout="vertical" initialValues={currentSession}>
          <Form.Item 
            label="Course" 
            name="course_id" 
            rules={[{ required: true, message: 'Please select a course!' }]}
          >
            <Select
              value={currentSession.course_id}
              onChange={(value) => setCurrentSession({ ...currentSession, course_id: value })}
            >
              {courses.map(course => (
                <Select.Option key={course._id} value={course._id}>
                  {course.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
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
                form.setFieldsValue({ description: content }); 
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SessionComponent;
