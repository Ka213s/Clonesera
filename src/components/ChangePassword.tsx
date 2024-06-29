import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import ApiService from '../services/ApiService';

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();

  const handleChangePassword = async (values: any) => {
    const { email, currentPassword, newPassword } = values;

    try {
      // await ApiService.changePassword(email, currentPassword, newPassword);
      notification.success({
        message: 'Success',
        description: 'Password changed successfully',
      });
    } catch (error) {
      console.error('Error changing password:', error);
      notification.error({
        message: 'Error',
        description: 'Error changing password',
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Change Password</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleChangePassword}
        initialValues={{ email: '', currentPassword: '', newPassword: '', confirmNewPassword: '' }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[{ required: true, message: 'Current Password is required' }]}
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'New Password is required' },
            { min: 8, message: 'New Password must be at least 8 characters' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Confirm New Password is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-[#9997F5] hover:bg-[#8886E5] text-white font-bold py-2 px-4 rounded">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
