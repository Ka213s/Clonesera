import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../../services/Api';
import 'tailwindcss/tailwind.css';

const { Option } = Select;

const AddUser: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const api = createApiInstance(navigate);

  const handleSubmit = async (values: any): Promise<void> => {
    setIsButtonDisabled(true);

    try {
      const dataToSubmit = {
        name: values.name,
        password: values.password,
        email: values.email,
        role: values.role,
      };

      console.log('Data to submit:', dataToSubmit);
      const response = await api.registerAccount(dataToSubmit);

      if (response.emailExists) {
        setIsButtonDisabled(false);
        form.setFields([{ name: 'email', errors: [response.message] }]);
        return;
      }

      console.log('User added successfully with External API:', response);
      form.resetFields();
      message.success('User added successfully!');
    } catch (error: any) {
      setIsButtonDisabled(false);
      if (error.response?.data?.message) {
        form.setFields([{ name: 'email', errors: [error.response.data.message] }]);
      } else if (error.emailExists) {
        form.setFields([{ name: 'email', errors: [error.message] }]);
      } else {
        console.error('Error adding user:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Add User</h2>
      <Form
        form={form}
        layout="vertical"
        className="bg-white p-10 rounded-lg shadow-lg"
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-6">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input size="large" placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input size="large" placeholder="Email Here" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select your role!' }]}
          >
            <Select size="large" placeholder="Role">
              <Option value="instructor">Instructor</Option>
              <Option value="student">Student</Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item className="flex justify-end space-x-4">
          <Button
            type="default"
            className="bg-[#9997F5] hover:!bg-[#8886E5] hover:!text-white border-none text-white text-lg px-6 py-2 mr-5"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isButtonDisabled}
            className="bg-[#9997F5] hover:!bg-[#8886E5] text-white border-none text-lg px-6 py-2"
          >
            {isButtonDisabled ? 'Please wait...' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
