import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { getLessonById, updateLesson } from '../../../utils/commonImports';
import TinyMCEEditorComponent from '../../../utils/TinyMCEEditor'; 
import FileUploader from '../../FileUploader';

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

const UpdateLesson: React.FC<UpdateLessonProps> = ({ lesson_id }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonData: Lesson = await getLessonById(lesson_id);
        setLesson(lessonData);
        form.setFieldsValue(lessonData);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    if (isModalVisible) {
      fetchLesson();
    }
  }, [isModalVisible, lesson_id, form]);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleOk = async (values: Lesson): Promise<void> => {
    try {
      // Đảm bảo gửi "" nếu không có video_url hoặc image_url
      const updatedValues = {
        ...values,
        video_url: values.video_url || "",
        image_url: values.image_url || ""
      };

      console.log('updatedValues:', updatedValues);
      console.log('lesson_id:', lesson_id);
      
      await updateLesson(lesson_id, updatedValues);
      setIsModalVisible(false);
      console.log('Lesson updated:', updatedValues);
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  const handleUploadSuccess = (url: string, type: string) => {
    if (type === 'video') {
      form.setFieldsValue({ video_url: url });
    } else if (type === 'image') {
      form.setFieldsValue({ image_url: url });
    }
    message.success('File uploaded successfully');
  };

  return (
    <>
      <Button onClick={showModal}>Update</Button>
      <Modal title="Update Lesson" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {lesson && (
          <Form form={form} onFinish={handleOk} initialValues={lesson}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="course_id" label="Course ID" rules={[{ required: true, message: 'Please input the course ID!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="session_id" label="Session ID" rules={[{ required: true, message: 'Please input the session ID!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="user_id" label="User ID" rules={[{ required: true, message: 'Please input the user ID!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="lesson_type" label="Lesson Type" rules={[{ required: true, message: 'Please input the lesson type!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TinyMCEEditorComponent 
                value={lesson.description || ''} 
                onEditorChange={(content) => form.setFieldsValue({ description: content })} 
              />
            </Form.Item>
            <Form.Item name="full_time" label="Full Time" rules={[{ required: true, message: 'Please input the full time!' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="position_order" label="Position Order" rules={[{ required: true, message: 'Please input the position order!' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.lesson_type !== currentValues.lesson_type}>
              {({ getFieldValue }) =>
                getFieldValue('lesson_type') === 'video' ? (
                  <>
                    <Form.Item name="video_url" label="Video" rules={[{ required: true, message: 'Please upload a video!' }]}>
                      <Input hidden />
                    </Form.Item>
                    {getFieldValue('video_url') && (
                      <video controls style={{ width: '100%' }}>
                        <source src={getFieldValue('video_url')} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <FileUploader 
                      type="video" 
                      onUploadSuccess={(url) => handleUploadSuccess(url, 'video')}
                    />
                  </>
                ) : getFieldValue('lesson_type') === 'image' ? (
                  <>
                    <Form.Item name="image_url" label="Image" rules={[{ required: true, message: 'Please upload an image!' }]}>
                      <Input hidden />
                    </Form.Item>
                    {getFieldValue('image_url') && (
                      <img src={getFieldValue('image_url')} alt="Lesson Image" style={{ width: '100%' }} />
                    )}
                    <FileUploader 
                      type="image" 
                      onUploadSuccess={(url) => handleUploadSuccess(url, 'image')}
                    />
                  </>
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
