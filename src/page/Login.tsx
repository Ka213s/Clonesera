import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Input, Button } from 'antd';
import ApiService, { UserData } from '../services/ApiService';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Artwork from '../assets/Artwork.jpg';
import { LoginData } from '../models/LoginData';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// Ensure the clientId is never undefined
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>(new LoginData("", ""));
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/home");
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [navigate]);

  const onFinish = async (values: { email: string, password: string }) => {
    setIsButtonDisabled(true);

    try {
      const response = await ApiService.login(values);

      const account = response.find((account: UserData) =>
        account.email === values.email &&
        account.password === values.password &&
        account.status === true &&
        !account.isGoogle
      );

      if (account) {
        localStorage.setItem('userData', JSON.stringify(account));
        navigate('/home');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in');
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleRegisterClick = (): void => {
    navigate('/register');
  };

  const handleForgotPasswordClick = (): void => {
    navigate('/forgot-password');
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    const token = response.credential;
    try {
      const userProfile = await ApiService.verifyGoogleToken(token);
      if (userProfile) {
        const { email, name, picture } = userProfile;
        const existingUser = await ApiService.getUserByEmail(email);
        if (existingUser && existingUser.length > 0) {
          if (!existingUser[0].isGoogle) {
            toast.error('This email is already registered. Please use your password to log in.');
            return;
          }
          toast.success('Login successful');
          localStorage.setItem('userData', JSON.stringify(existingUser[0]));
          navigate('/home');
          return;
        }

        const userData: UserData = {
          fullName: name,
          email,
          avatar: picture,
          createdAt: new Date().toISOString(),
          status: true,
          password: null,
          address: null,
          updateAt: null,
          phonenumber: null,
          walletId: null,
          roleId: 2,
          isGoogle: true,
        };

        await ApiService.saveGoogleUserData(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate('/home');
      }
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleGoogleLoginError = () => {
    toast.error('Error logging in with Google');
    console.error('Error logging in with Google');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="loader"></div> {/* Replace with any spinner component */}
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-5 items-center">
          <div className='md:w-1/2 px-16'>
            <h2 className="font-bold text-3xl text-[#6C6EDD]">Login</h2>
            <p className='text-base mt-2 text-[#4A4DC3]'>If you already a member, easily log in</p>

            <Form
              name="login"
              initialValues={{ email: loginData.email, password: loginData.password }}
              onFinish={onFinish}
              className="flex flex-col gap-4 mt-6"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: "email", message: 'Format invalid email!' }
                ]}
              >
                <Input
                  type="text"
                  placeholder='Email'
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="p-3 rounded-xl border"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  placeholder='Password'
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
            <div className='w-full mt-5 border-b border-gray-400'>
              <Button
                onClick={handleForgotPasswordClick}
                type="link"
                className='text-base py-2 text-[#6C6EDD] text-left pl-0 font-bold hover:text-[#6C6EDD]'
              >Forgot your password?</Button>
            </div>
            <div className='mt-3 text-base flex justify-between items-center'>
              <p>Don't have an account?</p>
              <Button
                onClick={handleRegisterClick}
                className="py-2 px-5 bg-white border rounded-xl
                    hover:scale-110 duration-300"
              >
                Sign Up
              </Button>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={Artwork} alt="Artwork" />
          </div>
          <ToastContainer />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
