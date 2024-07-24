import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getSessionById, updateSession, getCourses } from '../../../../utils/commonImports';
import TinyMCEEditorComponent from '../../../../utils/TinyMCEEditor'; // Import TinyMCE Editor component

const { Option } = Select;

interface Course {
  _id: string;
  name: string;
}

interface ButtonEditProps {
  _id: string;
}

const ButtonEdit: React.FC<ButtonEditProps> = ({ _id }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getCourses({ keyword: '', category: '', status: 'new', is_deleted: false }, 1, 100);
      setCourses(response.pageData);
      console.log('Fetched courses:', response.pageData);
    };
    fetchCourses();
  }, []);

  const showModal = async () => {
    setVisible(true);
    
    try {
      const session = await getSessionById(_id);
      console.log('Fetched session:', session);
      const course = courses.find(course => course._id === session.course_id);
      console.log('Fetched coursea:', course);
      const courseName = course ? course.name : '';
      form.setFieldsValue({
        ...session,
        course_name: courseName
      });
      console.log('Form values:', form.getFieldsValue());
      console.log('course_name:', courseName);
    } catch (error) {
      console.error('Failed to fetch session', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log('Form submit values:', values);
      const selectedCourse = courses.find(course => course.name === values.course_name);
      await updateSession(_id, { ...values, course_id: selectedCourse?._id });
    
      setVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to update session');
      console.error('Failed to update session', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button className='mr-2' icon={<EditOutlined />} onClick={showModal}>
        Edit
      </Button>
      <Modal
        visible={visible}
        title="Edit Session"
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        width={800} // Adjust the modal width
        style={{ top: '20px' }} // Adjust the modal margin-top
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="course_name"
            label="Course"
            rules={[{ required: true, message: 'Please select a course!' }]}
          >
            <Select
              placeholder="Select a course"
              onChange={(value) => {
                form.setFieldsValue({ course_name: value });
                console.log('Selected course name:', value);
              }}
            >
              {courses.map(course => (
                <Option key={course._id} value={course.name}>
                  {course.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <TinyMCEEditorComponent
              value={form.getFieldValue('description')}
              onEditorChange={(content) => form.setFieldsValue({ description: content })}
            />
          </Form.Item>
          <Form.Item
            name="position_order"
            label="Position Order"
            rules={[{ required: true, message: 'Please input the position order!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ButtonEdit;
