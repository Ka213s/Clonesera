import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from '../services/ApiService';

const ForgotPassword: React.FC = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string }) => {
    setIsButtonDisabled(true);
    try {
      const response = await ApiService.forgotPassword(values.email);
      if (response.success) {
        toast.success('Password reset email sent successfully');
        navigate('/login');
      } else {
        toast.error('Error sending password reset email');
      }
    } catch (error) {
      toast.error('Error sending password reset email');
      console.error('Error:', error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#6C6EDD] mb-4">Forgot Password</h2>
        <p className="text-base text-[#4A4DC3] mb-6">Enter your email to reset your password</p>

        <Form
          name="forgot-password"
          onFinish={onFinish}
          className="flex flex-col gap-4"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Invalid email format!' }
            ]}
          >
            <Input
              type="text"
              placeholder="Email"
              className="p-3 rounded-xl border"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isButtonDisabled}
              className="p-3 rounded-2xl w-full bg-[#9997F5] border-none text-white hover:bg-[#8886E5] hover:scale-105 transition duration-300 font-bold"
            >
              {isButtonDisabled ? 'Please wait...' : 'Send Reset Email'}
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-3 flex justify-between items-center">
          <Button
            onClick={() => navigate('/login')}
            className="py-2 px-5 bg-white border rounded-xl hover:scale-110 transition duration-300"
          >
            Back to Login
          </Button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
