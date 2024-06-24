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
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-5 items-center">
        <div className='md:w-1/2 px-16'>
          <h2 className="font-bold text-3xl text-[#6C6EDD]">Forgot Password</h2>
          <p className='text-base mt-2 text-[#4A4DC3]'>Enter your email to reset your password</p>

          <Form
            name="forgot-password"
            onFinish={onFinish}
            className="flex flex-col gap-4 mt-6"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }, { type: "email", message: 'Invalid email format!' }]}
            >
              <Input
                type="text"
                placeholder='Email'
                className="p-3 rounded-xl border"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled}
                style={{
                  backgroundColor: '#9997F5',
                  borderColor: '#9997F5',
                  color: '#fff',
                }}
                className="p-3 rounded-2xl w-full hover:bg-[#8886E5] hover:scale-105 duration-300 font-bold"
              >
                {isButtonDisabled ? 'Please wait...' : 'Send Reset Email'}
              </Button>
            </Form.Item>
          </Form>
          <div className='mt-3 text-base flex justify-between items-center'>
            <Button
              onClick={() => navigate('/login')}
              className="py-2 px-5 bg-white border rounded-xl
                  hover:scale-110 duration-300"
            >
              Back to Login
            </Button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
