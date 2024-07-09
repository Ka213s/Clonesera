import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import logo from '../assets/Logo-2.png';
// import animationData from '../assets/Animation - 1719199926629.json'; 
import Artwork from '../assets/Artwork.jpeg';
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
  // const colors = {
  //   primary: "#060606",
  //   background: "#f5f5f5",
  //   disbaled: "#D9D9D9"
  // }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="w-full h-screen flex items-start">
        <div className="relative w-1/2 h-full flex flex-col">
          {/* <div className="absolute top-[20%] left-[10%] flex flex-col">
            <h1 className='text-4xl text-black font-bold my-4'>Turn your idea into reality</h1>
            <p className='text-xl text-black font-normal'>Start for free and get attractive offers from the community </p>
          </div> */}
          <img className="w-full h-full object-cover object-center" src={Artwork} />
        </div>

        <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
          <h1 className='text-base text-[#060606] font-semibold'>Clonesera</h1>
          <div className="w-full flex flex-col">
            <div className='w-full flex flex-col max-w-[500px]'>
              <h3 className="text-3xl font-semibold mb-5">Login</h3>
              <p className='text-base mb-2'>If you already a member, easily log in</p>
            </div>
            {/* <div className="md:block hidden ml-6">
              <Lottie
                    options={lottieOptions}
                    height={150}
                    width={150}
                  />
            </div> */}
            <div className='w-full flex flex-col'>
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
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none 
                            focus:outline-none"
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
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none 
                            focus:outline-none"
                    iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Form>
            </div>
            <div className='w-full flex items-center justify-between'>
              <div className='w-full flex items-center'>
                <input type="checkbox" className='w-4 h-4 mr-2' />
                <p className='text-sm'>Remember Me</p>
              </div>
              <Button
                type="link"
                className='text-sm font-medium whitespase-nowrap cursor-pointer
                            underline underline-offset-2'
              >
                Forgot your password?
              </Button>
            </div>
            <div className='w-full flex flex-col my-4'>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isButtonDisabled}
                  style={{
                    backgroundColor: '#060606',
                    borderColor: '#060606',
                    color: '#fff',
                  }}
                  className="w-full text-white bg-[#060606] rounded-md p-4 text-center
                              flex items-center justify-center"
                >
                  {isButtonDisabled ? 'Please wait...' : 'Login'}
                </Button>
              </Form.Item>
            </div>
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
      </div>
    </GoogleOAuthProvider >
  );
};

export default Login;
