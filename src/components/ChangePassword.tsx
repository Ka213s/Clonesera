import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { createApiInstance } from '../services/Api';
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const api = createApiInstance(navigate);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const userData = await api.getDataUser(token);
        setUserId(userData.data._id);
      } catch (error) {
        console.error('Error fetching user data:', error);
        notification.error({
          message: 'Error',
          description: 'Error fetching user data',
        });
      }
    };

    fetchUserData();
  }, [api]);

  const handleChangePassword = async (values: any) => {
    const { currentPassword, newPassword } = values;

    if (!userId) {
      notification.error({
        message: 'Error',
        description: 'User ID not found',
      });
      return;
    }

    try {
      await api.changePassword(userId, currentPassword, newPassword);
      notification.success({
        message: 'Success',
        description: 'Password changed successfully',
      });
      form.resetFields(); 
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
        initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
      >
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
