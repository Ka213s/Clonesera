import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, message, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getLessonById, updateLesson, getCourses } from '../../../../utils/commonImports';
import TinyMCEEditorComponent from '../../../../utils/TinyMCEEditor';
import FileUploader from '../../../FileUploader';

const { Option } = Select;

interface UpdateLessonProps {
  lesson_id: string;
}

interface Lesson {
  name: string;
  course_id: string;
  session_id: string;
  user_id: string;
  lesson_type: string;
  description?: string;
  video_url?: string;
  image_url?: string;
  full_time: number;
  position_order: number;
}

interface Course {
  _id: string;
  name: string;
}

const UpdateLesson: React.FC<UpdateLessonProps> = ({ lesson_id }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCourses = async (): Promise<void> => {
      try {
        const response = await getCourses({
          keyword: '',
          category: '',
          status: 'new',
          is_deleted: false,
        }, 1, 100);
        setCourses(response.pageData);
        console.log('Fetched coaaurses:', response.pageData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchLesson = async (): Promise<void> => {
      try {
        const lessonData: Lesson = await getLessonById(lesson_id);
        setLesson(lessonData);
        const course = courses.find(course => course._id === lessonData.course_id);
        const courseName = course ? course.name : '';
        form.setFieldsValue({ ...lessonData, course_name: courseName });
        console.log('Fetched lesson:', lessonData);
        console.log('Form values:', form.getFieldsValue());
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchCourses();

    if (isModalVisible) {
      fetchLesson();
    }
  }, [isModalVisible, lesson_id, form]);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleOk = async (values: Omit<Lesson, 'course_id'> & { course_name: string; full_time: string }): Promise<void> => {
    try {
      const fullTimeString = values.full_time as unknown as string;
      const match = fullTimeString.match(/(\d+)h (\d+)m/) || [];
      const hours = match[1] ? parseInt(match[1], 10) : 0;
      const minutes = match[2] ? parseInt(match[2], 10) : parseInt(fullTimeString.replace('m', ''), 10);
      const fullTimeInMinutes = hours * 60 + minutes;

      const selectedCourse = courses.find(course => course.name === values.course_name);

      if (!selectedCourse) {
        throw new Error('Selected course not found');
      }

      const updatedValues: Lesson = {
        ...values,
        course_id: selectedCourse._id,
        full_time: fullTimeInMinutes,
        video_url: values.video_url || "",
        image_url: values.image_url || "",
      };

      await updateLesson(lesson_id, updatedValues);
      setIsModalVisible(false);
      message.success('Lesson updated successfully');
    } catch (error) {
      console.error('Error updating lesson:', error);
      message.error('Failed to update lesson');
    }
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  const handleUploadSuccess = (url: string, type: string): void => {
    if (type === 'video') {
      form.setFieldsValue({ video_url: url });
    } else if (type === 'image') {
      form.setFieldsValue({ image_url: url });
    }
    message.success('File uploaded successfully');
  };

  return (
    <>
      <Button className='mr-2' icon={<EditOutlined />} onClick={showModal}></Button>
      <Modal
        title="Update Lesson"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800} // Adjust the modal width
        style={{ top: '20px' }} // Adjust the modal margin-top
      >
        {lesson && (
          <Form form={form} onFinish={handleOk} initialValues={lesson}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="course_name" label="Course" rules={[{ required: true, message: 'Please input the course!' }]}>
                  <Select>
                    {courses.map(course => (
                      <Option key={course._id} value={course.name}>
                        {course.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="session_id" label="Session ID" rules={[{ required: true, message: 'Please input the session ID!' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lesson_type" label="Lesson Type" rules={[{ required: true, message: 'Please input the lesson type!' }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
            </Row>
            <Form.Item label="Description">
              <TinyMCEEditorComponent
                value={lesson.description || ''}
                onEditorChange={(content) => form.setFieldsValue({ description: content })}
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="full_time" label="Full Time" rules={[{ required: true, message: 'Please input the full time!' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="position_order" label="Position Order" rules={[{ required: true, message: 'Please input the position order!' }]}>
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.lesson_type !== currentValues.lesson_type}>
              {({ getFieldValue }) =>
                getFieldValue('lesson_type') === 'video' ? (
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="video_url" label="Video URL" rules={[{ required: true, message: 'Please upload a video!' }]}>
                        <Input hidden />
                      </Form.Item>
                      {getFieldValue('video_url') && (
                        <video controls style={{ width: '100%' }}>
                          <source src={getFieldValue('video_url')} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </Col>
                    <Col span={12}>
                      <FileUploader
                        type="video"
                        onUploadSuccess={(url: string) => handleUploadSuccess(url, 'video')}
                      />
                    </Col>
                  </Row>
                ) : getFieldValue('lesson_type') === 'image' ? (
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="image_url" label="Image URL" rules={[{ required: true, message: 'Please upload an image!' }]}>
                        <Input hidden />
                      </Form.Item>
                      {getFieldValue('image_url') && (
                        <img src={getFieldValue('image_url')} alt="Lesson Image" style={{ width: '100%' }} />
                      )}
                    </Col>
                    <Col span={12}>
                      <FileUploader
                        type="image"
                        onUploadSuccess={(url: string) => handleUploadSuccess(url, 'image')}
                      />
                    </Col>
                  </Row>
                ) : null
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Update</Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdateLesson;
