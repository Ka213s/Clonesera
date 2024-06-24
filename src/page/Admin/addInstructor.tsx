import React from 'react';
import { Form, Input, Button, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const { Option } = Select;

const AddInstructor: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Add Professor</h2>
      <Form layout="vertical" className="bg-white p-10 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          <Form.Item label="First Name" className="col-span-1">
            <Input size="large" placeholder="Enter First Name" />
          </Form.Item>
          <Form.Item label="Last Name" className="col-span-1">
            <Input size="large" placeholder="Enter Last Name" />
          </Form.Item>
          <Form.Item label="Email" className="col-span-1">
            <Input size="large" placeholder="Email Here" />
          </Form.Item>
          <Form.Item label="Joining Date" className="col-span-1">
            <DatePicker className="w-full" size="large" />
          </Form.Item>
          <Form.Item label="Password" className="col-span-1">
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item label="Confirm Password" className="col-span-1">
            <Input.Password size="large" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item label="Mobile Number" className="col-span-1">
            <Input size="large" placeholder="Mobile Number" />
          </Form.Item>
          <Form.Item label="Gender" className="col-span-1">
            <Select size="large" placeholder="Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date of Birth" className="col-span-1">
            <DatePicker className="w-full" size="large" />
          </Form.Item>
          <Form.Item label="Profile Picture" className="col-span-2">
            <Upload>
              <Button size="large" icon={<UploadOutlined />}>Chọn tệp</Button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item className="flex justify-end space-x-4">
          <Button type="primary" htmlType="submit" className="bg-purple-500 border-none text-white text-lg px-6 py-2 mr-5">
            Submit
          </Button>
          <Button type="default" className="bg-purple-500 text-white border-none text-lg px-6 py-2">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddInstructor;
