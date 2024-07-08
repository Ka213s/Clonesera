import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, message, Modal, Form } from 'antd';
import TinyMCEEditor from '../../util/TinyMCEEditor';
import FileUploader from './FileUploader';

const { Option } = Select;

interface SessionData {
  _id: string;
  title: string;
  course_id: string;
  is_deleted: boolean;
}

interface CourseData {
  _id: string;
  name: string;
}

interface LessonProps {
  api: any;
  courseId: string | null;
}

const LessonComponent: React.FC<LessonProps> = ({ api, courseId }) => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalForm] = Form.useForm();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionsAndCourses = async () => {
      setLoading(true);
      try {
        const sessionsResponse = await api.getSessions({ keyword: '', course_id: courseId || '', is_position_order: true, is_deleted: false }, 1, 10);
        const sessionsData = Array.isArray(sessionsResponse.data.pageData) ? sessionsResponse.data.pageData : [];
        setSessions(sessionsData);
  
        const coursesResponse = await api.getCourses({ keyword: '', category: '', status: 'new', is_deleted: false }, 1, 100); 
        const coursesData = Array.isArray(coursesResponse.data.pageData) ? coursesResponse.data.pageData : [];
        setCourses(coursesData);
      } catch (error) {
        message.error('Error fetching sessions or courses');
      } finally {
        setLoading(false);
      }
    };
  
    fetchSessionsAndCourses();
  }, [api, courseId]);
  
  const getCourseNameById = (id: string) => {
    const course = courses.find(course => course._id === id);
    return course ? course.name : id;
  };

  const handleAddSession = (sessionId: string, courseId: string) => {
    setIsModalVisible(true);
    modalForm.setFieldsValue({ session_id: sessionId, course_id: courseId, lesson_type: 'video' });
  };

  const handleModalOk = async () => {
    try {
      const values = await modalForm.validateFields();
      const payload = {
        ...values,
        full_time: parseInt(values.full_time, 10),
        position_order: parseInt(values.position_order, 10),
      };
      await api.createLesson(payload);
      setIsModalVisible(false);
      modalForm.resetFields();
      setUploadedImageUrl(null);
      setUploadedVideoUrl(null);
      message.success('Lesson added successfully');
    } catch (error) {
      console.error('Error adding lesson:', error);
      message.error('Error adding lesson');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    modalForm.resetFields();
    setUploadedImageUrl(null);
    setUploadedVideoUrl(null);
  };

  const handleImageUploadSuccess = (url: string) => {
    modalForm.setFieldsValue({ image_url: url });
    setUploadedImageUrl(url);
    message.success('Image uploaded successfully');
  };

  const handleVideoUploadSuccess = (url: string) => {
    modalForm.setFieldsValue({ video_url: url });
    setUploadedVideoUrl(url);
    message.success('Video uploaded successfully');
  };

  const columns = [
    { title: 'Course Name', dataIndex: 'course_id', key: 'course_id', render: (courseId: string) => getCourseNameById(courseId) },
    { title: 'Session Name', dataIndex: 'name', key: 'name' },
    { title: 'Deleted', dataIndex: 'is_deleted', key: 'is_deleted', render: (text: boolean) => (text ? 'Yes' : 'No') },
    { title: 'Action', key: 'action', render: (text: any, record: SessionData) => <Button onClick={() => handleAddSession(record._id, record.course_id)} type="primary">Add Session</Button> },
  ];
  
  return (
    <div>
      <h2>Sessions</h2>
      <Table
        columns={columns}
        dataSource={sessions}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal title="Add Lesson" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
        <Form form={modalForm} layout="vertical">
          <Form.Item name="name" label="Lesson Name" rules={[{ required: true, message: 'Please enter lesson name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Lesson Description" rules={[{ required: true, message: 'Please enter lesson description' }]}>
            <TinyMCEEditor
              value={modalForm.getFieldValue('description') || ''}
              onEditorChange={(content: string) => {
                modalForm.setFieldsValue({ description: content });
              }}
            />
          </Form.Item>
          <Form.Item name="lesson_type" label="Lesson Type" initialValue="video" rules={[{ required: true, message: 'Please select lesson type' }]}>
            <Select style={{ width: '100%' }}>
              <Option value="video">Video</Option>
              <Option value="image">Image</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="full_time"
            label="Full Time"
            rules={[{ required: true, message: 'Please enter full time' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="position_order"
            label="Position Order"
            rules={[{ required: true, message: 'Please enter position order' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="session_id"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="course_id"
            hidden
          >
            <Input />
          </Form.Item>
          {modalForm.getFieldValue('lesson_type') === 'image' ? (
            <>
              <Form.Item name="image_url" label="Upload Image" rules={[{ required: true, message: 'Please upload an image' }]}>
                <FileUploader type="image" onUploadSuccess={handleImageUploadSuccess} />
              </Form.Item>
              {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded lesson content" style={{ marginTop: '10px', maxWidth: '100%' }} />}
            </>
          ) : (
            <>
              <Form.Item name="video_url" label="Upload Video" rules={[{ required: true, message: 'Please upload a video' }]}>
                <FileUploader type="video" onUploadSuccess={handleVideoUploadSuccess} />
              </Form.Item>
              {uploadedVideoUrl && (
                <video controls style={{ marginTop: '10px', maxWidth: '100%' }}>
                  <source src={uploadedVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default LessonComponent;
