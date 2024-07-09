import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import logo from '../assets/Logo-2.png';
// import animationData from '../assets/Animation - 1719199926629.json'; 
import Artwork from '../assets/Artwork.jpg';
// import Lottie from 'react-lottie';
import { loginAccount } from '../services/Api';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (values: { email: string, password: string }) => {
    setIsButtonDisabled(true);
    try {
      const response = await loginAccount(values);
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    console.log('Google login successful:', response);
    // Handle Google login success logic
  };

  const handleGoogleLoginError = () => {
    console.error('Error logging in with Google');
    // Handle Google login error logic
  };

  // const lottieOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice'
  //   }
  // };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-7xl w-full p-10 items-center">
          <div className="flex justify-center mb-5">
            <img src={logo} alt="Logo" className="h-24 w-31 cursor-pointer" />
          </div>
          <div className="flex w-full">
            <div className='w-full md:w-1/2 px-16'>
              <div className="flex items-center">
                <div>
                  <h2 className="font-bold text-3xl text-[#6C6EDD]">Login</h2>
                  <p className='text-base mt-2 text-[#4A4DC3]'>If you already a member, easily log in</p>
                </div>
                <div className="md:block hidden ml-6">
                  {/* <Lottie
                    options={lottieOptions}
                    height={150}
                    width={150}
                  /> */}
                </div>
              </div>
              <Form
                name="login"
                initialValues={{ email, password }}
                onFinish={handleSubmit}
                className="flex flex-col gap-4 mt-6"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Invalid email format!' }
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-xl border"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 rounded-xl border w-full"
                    iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
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
                    {isButtonDisabled ? 'Please wait...' : 'Login'}
                  </Button>
                </Form.Item>
              </Form>
              <div className='mt-4 grid grid-cols-3 items-center text-gray-500'>
                <hr className='border-gray-400' />
                <p className='text-center'>OR</p>
                <hr className='border-gray-400' />
              </div>
              <div className="flex justify-center mt-4">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                />
              </div>
              <div className='w-full mt-5 border-b border-gray-400'>
                <Button
                  type="link"
                  className='text-base py-2 text-[#6C6EDD] text-left pl-0 font-bold hover:text-[#6C6EDD]'
                >
                  Forgot your password?
                </Button>
              </div>
              <div className='mt-3 text-base flex justify-between items-center'>
                <p>Don't have an account?</p>
                <Button
                  className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                >
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="w-1/2 hidden md:flex items-center justify-center">
              <img className="rounded-2xl w-full h-full object-cover" src={Artwork} alt="Artwork" />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
