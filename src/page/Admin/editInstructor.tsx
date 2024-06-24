import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../../models/FileJson/allInstructor.json';
import 'tailwindcss/tailwind.css';
import moment from 'moment';

const { Option } = Select;

const EditInstructor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [instructor, setInstructor] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const instructorData = data.find((item) => item.id === id);
    setInstructor(instructorData);
  }, [id]);

  if (!instructor) {
    return <div>Loading...</div>;
  }

  const handleFinish = (values: any) => {
    console.log('Form Values:', values);
    // Process the form values here
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-center">Edit Professor</h2>
        <Button type="default" onClick={handleBack} className="bg-gray-500 text-white border-none text-lg px-6 py-2">
          Back
        </Button>
      </div>
      <Form
        layout="vertical"
        className="bg-white p-10 rounded-lg shadow-lg"
        initialValues={{
          ...instructor,
          joiningDate: instructor.joiningDate ? moment(instructor.joiningDate) : null,
        }}
        onFinish={handleFinish}
      >
        <div className="grid grid-cols-2 gap-6">
          <Form.Item label="Name" className="col-span-1" name="name">
            <Input size="large" placeholder="Enter Name" />
          </Form.Item>
          <Form.Item label="Email" className="col-span-1" name="email">
            <Input size="large" placeholder="Email Here" />
          </Form.Item>
          <Form.Item label="Joining Date" className="col-span-1" name="joiningDate">
            <DatePicker className="w-full" size="large" />
          </Form.Item>
          <Form.Item label="Password" className="col-span-1" name="password">
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item label="Confirm Password" className="col-span-1" name="confirmPassword">
            <Input.Password size="large" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item label="Mobile Number" className="col-span-1" name="mobile">
            <Input size="large" placeholder="Mobile Number" />
          </Form.Item>
          <Form.Item label="Gender" className="col-span-1" name="gender">
            <Select size="large" placeholder="Gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Profile Picture" className="col-span-2">
            <Upload>
              <Button size="large" icon={<UploadOutlined />}>Chọn tệp</Button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item className="flex justify-end space-x-4">
          <Button type="primary" htmlType="submit" className="bg-purple-500 border-none text-white text-lg px-6 py-2">
            Save Changes
          </Button>
          <Button type="default" className="bg-gray-500 text-white border-none text-lg px-6 py-2">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditInstructor;
