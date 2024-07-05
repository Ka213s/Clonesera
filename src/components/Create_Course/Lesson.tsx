import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, message, Modal, Form } from 'antd';
import FileUploader from './FileUploader'; // Adjust the path as needed

const { Option } = Select;

interface LessonData {
  name: string;
  description: string;
  lesson_type: string;
  full_time: number;
  position_order: number;
  video_url?: string;
  image_url?: string;
  session_id?: string;
  _id?: string;
}

interface SessionData {
  _id: string;
  title: string;
  course_id: string;
  is_position_order: boolean;
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
  const [lessons, setLessons] = useState<LessonData[]>([]);
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
        const sessionsResponse = await api.getSessions(
          { keyword: '', course_id: courseId || '', is_position_order: true, is_deleted: false },
          1,
          10
        );
        const sessionsData = Array.isArray(sessionsResponse.data.pageData) ? sessionsResponse.data.pageData : [];
        setSessions(sessionsData);

        const coursesResponse = await api.getCourses(
          { keyword: '', category: '', status: '', is_deleted: false },
          1,
          100 // Adjust the page size as needed to fetch all courses
        );
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

  const addLesson = () => {
    setLessons([...lessons, { name: '', description: '', lesson_type: 'video', full_time: 0, position_order: 0, session_id: '' }]);
  };

  const saveLesson = async (lesson: LessonData, lessonIndex: number) => {
    if (!courseId) {
      console.error('Course ID is required to save lesson.');
      return;
    }

    try {
      const payload = { ...lesson, course_id: courseId, session_id: lesson.session_id };
      console.log('Payload:', payload);
      const response = await api.createLesson(payload);
      const newLessons = [...lessons];
      newLessons[lessonIndex]._id = response.data._id;
      setLessons(newLessons);
      console.log('Lesson saved successfully');
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const handleAddSession = async (sessionId: string, courseId: string) => {
    console.log('Session ID:', sessionId);
    console.log('Course ID:', courseId);
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
      console.log('Modal Values:', values);
      console.log('Payload:', payload);
      await api.createLesson(payload);
      setIsModalVisible(false);
      modalForm.resetFields();
      setUploadedImageUrl(null);
      setUploadedVideoUrl(null);
      message.success('Lesson added successfully');
    } catch (error) {
      console.error('Error adding session:', error);
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
    {
      title: 'Course Name',
      dataIndex: 'course_id',
      key: 'course_id',
      render: (courseId: string) => getCourseNameById(courseId),
    },
    {
      title: 'Session Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Deleted',
      dataIndex: 'is_deleted',
      key: 'is_deleted',
      render: (text: boolean) => (text ? 'Yes' : 'No'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: SessionData) => (
        <Button onClick={() => handleAddSession(record._id, record.course_id)} type="primary">
          Add Session
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Lessons</h2>
      <Button onClick={addLesson} type="primary" style={{ marginBottom: '20px' }}>
        Add Lesson
      </Button>
      {lessons.map((lesson, lessonIndex) => (
        <div key={lessonIndex} style={{ marginBottom: '20px' }}>
          <Input
            placeholder="Lesson Name"
            value={lesson.name}
            onChange={(e) => {
              const newLessons = [...lessons];
              newLessons[lessonIndex].name = e.target.value;
              setLessons(newLessons);
            }}
          />
          <Input.TextArea
            placeholder="Lesson Description"
            value={lesson.description}
            onChange={(e) => {
              const newLessons = [...lessons];
              newLessons[lessonIndex].description = e.target.value;
              setLessons(newLessons);
            }}
            style={{ margin: '10px 0' }}
          />
          <Select
            placeholder="Lesson Type"
            value={lesson.lesson_type}
            onChange={(value) => {
              const newLessons = [...lessons];
              newLessons[lessonIndex].lesson_type = value;
              setLessons(newLessons);
            }}
            style={{ width: '100%', margin: '10px 0' }}
          >
            <Option value="video">Video</Option>
            <Option value="image">Image</Option>
          </Select>
          <Input
            type="number"
            placeholder="Full Time"
            value={lesson.full_time}
            onChange={(e) => {
              const newLessons = [...lessons];
              newLessons[lessonIndex].full_time = parseInt(e.target.value, 10);
              setLessons(newLessons);
            }}
            style={{ margin: '10px 0' }}
          />
          <Input
            type="number"
            placeholder="Position Order"
            value={lesson.position_order}
            onChange={(e) => {
              const newLessons = [...lessons];
              newLessons[lessonIndex].position_order = parseInt(e.target.value, 10);
              setLessons(newLessons);
            }}
          />
          <Select
            placeholder="Select Session"
            value={lesson.session_id}
            onChange={(value) => {
              const newLessons = [...lessons];
              newLessons[lessonIndex].session_id = value;
              setLessons(newLessons);
            }}
            style={{ width: '100%', margin: '10px 0' }}
          >
            {sessions.map((session) => (
              <Option key={session._id} value={session._id}>
                {session.title}
              </Option>
            ))}
          </Select>
          {lesson.lesson_type === 'image' ? (
            <>
              <FileUploader type="image" onUploadSuccess={(url) => {
                const newLessons = [...lessons];
                newLessons[lessonIndex].image_url = url;
                setLessons(newLessons);
              }} />
              {lesson.image_url && <img src={lesson.image_url} alt="Uploaded lesson content" style={{ marginTop: '10px', maxWidth: '100%' }} />}
            </>
          ) : (
            <>
              <FileUploader type="video" onUploadSuccess={(url) => {
                const newLessons = [...lessons];
                newLessons[lessonIndex].video_url = url;
                setLessons(newLessons);
              }} />
              {lesson.video_url && (
                <video controls style={{ marginTop: '10px', maxWidth: '100%' }}>
                  <source src={lesson.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}
          <Button onClick={() => saveLesson(lesson, lessonIndex)} type="primary" style={{ marginTop: '10px' }}>
            Save Lesson
          </Button>
        </div>
      ))}

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
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="lesson_type" label="Lesson Type" initialValue="video" rules={[{ required: true, message: 'Please select lesson type' }]}>
            <Select style={{ width: '100%' }}>
              <Option value="video">Video</Option>
              <Option value="image">Image</Option>
            </Select>
          </Form.Item>
          <Form.Item name="full_time" label="Full Time" rules={[{ required: true, message: 'Please enter full time' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="position_order" label="Position Order" rules={[{ required: true, message: 'Please enter position order' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="session_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="course_id" hidden>
            <Input />
          </Form.Item>
          {modalForm.getFieldValue('lesson_type') === 'image' ? (
            <>
              <Form.Item name="image_url" label="Upload Image">
                <FileUploader type="image" onUploadSuccess={handleImageUploadSuccess} />
              </Form.Item>
              {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded lesson content" style={{ marginTop: '10px', maxWidth: '100%' }} />}
            </>
          ) : (
            <>
              <Form.Item name="video_url" label="Upload Video">
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
