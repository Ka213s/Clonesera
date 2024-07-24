import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import { createSession, getCourses } from '../../../../utils/commonImports'; // Import common functions
import TinyMCEEditorComponent from '../../../../utils/TinyMCEEditor'; // Import TinyMCEEditorComponent

const { Option } = Select;

interface Course {
  _id: string;
  name: string;
}

const AddSession: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getCourses({ keyword: '', category: '', status: 'new', is_deleted: false }, 1, 100);
      console.log('Fetched coursesaaa:', response.pageData);
      setCourses(response.pageData);
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (values: { name: string; course_id: string; description: string; }) => {
    try {
      await createSession(values);
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Error creating session');
    }
  };

  return (
    <div>
      <Button type="primary" className='custom-button' onClick={() => setIsOpen(true)}>Add Session</Button>
      <Modal
        title="Add Session"
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        width={800} // Adjust the modal width
        style={{ top: '20px' }} // Adjust the modal margin-top
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Session Name"
            name="name"
            rules={[{ required: true, message: 'Please input the session name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Course"
            name="course_id"
            rules={[{ required: true, message: 'Please select a course!' }]}
          >
            <Select
              placeholder="Select a course"
              onChange={(value) => {
                console.log('Selected course ID:', value); // Log the selected course ID
                form.setFieldsValue({ course_id: value });
              }}
            >
              {courses.map(course => (
                <Option key={course._id} value={course._id}>
                  {course.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <TinyMCEEditorComponent
              value=""
              onEditorChange={(content) => form.setFieldsValue({ description: content })}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Session
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddSession;
