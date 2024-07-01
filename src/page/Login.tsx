import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Modal, Radio } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Input, Button } from 'antd';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Artwork from '../assets/Artwork.jpg';
import Lottie from 'react-lottie';
import animationData from '../assets/Animation - 1719199926629.json';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { createApiInstance } from '../services/Api';
import useAuthCheck from '../hooks/useAuthCheck';
import logo from '../assets/Logo-2.png';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [googleId, setGoogleId] = useState<string | null>(null);
  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  useAuthCheck();

  const loginWithEmail = async (values: { email: string, password: string }) => {
    setIsButtonDisabled(true);

    try {
      const response = await api.loginAccount(values);
      
      const token = response.data.token;
      localStorage.setItem('token', token);
      const getDataUser = await api.getDataUser(token);
      const dataUser = JSON.stringify(getDataUser.data);
      localStorage.setItem('data', dataUser);
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
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
    try {
      const googleResponse = await api.loginUserByGoogle({ google_id: response.credential });
      if (googleResponse) {
       
        const token = googleResponse.data.token;
        localStorage.setItem('token', token);
        const getDataUser = await api.getDataUser(token);
        const dataUser = JSON.stringify(getDataUser.data);
        localStorage.setItem('data', dataUser);
        navigate('/home');
      } else {
        setGoogleId(response.credential);
        setIsRoleModalVisible(true);
      }
    } catch (error) {
      console.error('Error logging in with Google:', error);
      setGoogleId(response.credential);
      setIsRoleModalVisible(true);
    }
  };

  const handleGoogleLoginError = () => {
    console.error('Error logging in with Google');
  };

  const handleRoleSelection = async () => {
    if (!googleId || !selectedRole) return;

    try {
      const googleLoginResponse = await api.registerUserByGoogle({ google_id: googleId, role: selectedRole });
      const token = googleLoginResponse.data.token;
      localStorage.setItem('token', token);
      setIsRoleModalVisible(false);
    } catch (error) {
      console.error('Error registering with Google:', error);
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-5xl p-5 items-center">
          <div className="flex justify-center mb-5">
            <Link to="/home">
              <img src={logo} alt="Logo" className="h-24 w-31 cursor-pointer" />
            </Link>
          </div>
          <div className="flex w-full">
            <div className='md:w-1/2 px-16'>
              <div className="flex items-center">
                <div>
                  <h2 className="font-bold text-3xl text-[#6C6EDD]">Login</h2>
                  <p className='text-base mt-2 text-[#4A4DC3]'>If you already a member, easily log in</p>
                </div>
                <div className="md:block hidden ml-6">
                  <Lottie
                    options={lottieOptions}
                    height={150}
                    width={150}
                  />
                </div>
              </div>
              <Form
                name="login"
                initialValues={{ email: loginData.email, password: loginData.password }}
                onFinish={loginWithEmail}
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
              <div className="flex justify-center mt-4">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                />
              </div>
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
          </div>
        </div>
      </div>

      <Modal
      open={isRoleModalVisible}
      onOk={handleRoleSelection}
      onCancel={() => setIsRoleModalVisible(false)}
      okText="Submit"
      width={900}
      className="p-6 rounded-lg shadow-lg"
    >
      <div className="text-center mb-6">
        <p className="text-lg font-bold">Sign up with Google</p>
      </div>
      <p className="mb-2 text-base font-semibold">Select Your Role</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Radio.Group 
          onChange={(e) => setSelectedRole(e.target.value)} 
          value={selectedRole}
          className="flex flex-col items-start"
        >
          <Radio value="student">
            <span className="text-base">Student</span>
          </Radio>
        </Radio.Group>
        <Radio.Group 
          onChange={(e) => setSelectedRole(e.target.value)} 
          value={selectedRole}
          className="flex flex-col items-start"
        >
          <Radio value="instructor">
            <span className="text-base">Instructor</span>
          </Radio>
        </Radio.Group>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-base font-semibold mb-2">Benefits of being a Student:</p>
          <ul className="list-disc list-inside ml-4">
            <li className="mb-2">Access to exclusive student resources</li>
            <li className="mb-2">Join student communities and groups</li>
            <li className="mb-2">Get personalized study plans</li>
          </ul>
        </div>
        <div>
          <p className="text-base font-semibold mb-2">Benefits of being an Instructor:</p>
          <ul className="list-disc list-inside ml-4">
            <li className="mb-2">Access to teaching tools and resources</li>
            <li className="mb-2">Join instructor communities and forums</li>
            <li className="mb-2">Get insights and analytics on student progress</li>
          </ul>
        </div>
      </div>
    </Modal>

    </GoogleOAuthProvider>
  );
};

export default Login;
