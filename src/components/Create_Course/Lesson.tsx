import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, message, Modal, Form } from 'antd';
import TinyMCEEditor from '../../util/TinyMCEEditor';
import FileUploader from './FileUploader';

const { Option } = Select;

interface SessionData {
  _id: string;
  name: string;
  course_id: string;
}

interface LessonData {
  _id: string;
  name: string;
  description: string;
  course_id: string;
  session_id: string;
  lesson_type: string;
  full_time: number;
  position_order: number;
  image_url?: string;
  video_url?: string;
}

interface LessonProps {
  api: any;
}

const LessonComponent: React.FC<LessonProps> = ({ api }) => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalForm] = Form.useForm();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionsAndLessons = async () => {
      setLoading(true);
      try {
        const sessionsResponse = await api.getSessions({ keyword: '', is_deleted: false }, 1, 100);
        const sessionsData = Array.isArray(sessionsResponse.data.pageData) ? sessionsResponse.data.pageData : [];
        setSessions(sessionsData);

        const lessonsResponse = await api.getLessons({ keyword: '', is_deleted: false }, 1, 10);
        const lessonsData = Array.isArray(lessonsResponse.data.pageData) ? lessonsResponse.data.pageData : [];
        setLessons(lessonsData);
      } catch (error) {
        message.error('Error fetching sessions or lessons');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionsAndLessons();
  }, [api]);

  const handleAddLesson = () => {
    setIsModalVisible(true);
    modalForm.setFieldsValue({ lesson_type: 'video' });
  };

  const handleModalOk = async () => {
    try {
      const values = await modalForm.validateFields();
      const payload = {
        ...values,
        full_time: parseInt(values.full_time, 10),
        position_order: parseInt(values.position_order, 10),
      };
      console.log('Payload to be sent to createLesson API:', payload); // Log payload
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

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.session_id) {
      const selectedSession = sessions.find(session => session._id === changedValues.session_id);
      if (selectedSession) {
        modalForm.setFieldsValue({ course_id: selectedSession.course_id });
      }
    }
  };

  const columns = [
    { title: 'Course ID', dataIndex: 'course_id', key: 'course_id' },
    { title: 'Lesson Name', dataIndex: 'name', key: 'name' },
    { title: 'Lesson Type', dataIndex: 'lesson_type', key: 'lesson_type' },
    { title: 'Full Time', dataIndex: 'full_time', key: 'full_time' },
    { title: 'Position Order', dataIndex: 'position_order', key: 'position_order' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2>Lessons</h2>
        <Button type="primary" onClick={handleAddLesson}>Add Lesson</Button>
      </div>
      <Table
        columns={columns}
        dataSource={lessons}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal title="Add Lesson" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
        <Form form={modalForm} layout="vertical" onValuesChange={handleValuesChange}>
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
            label="Session"
            rules={[{ required: true, message: 'Please select a session' }]}
          >
            <Select style={{ width: '100%' }}>
              {sessions.map(session => (
                <Option key={session._id} value={session._id}>
                  {session.name}
                </Option>
              ))}
            </Select>
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
