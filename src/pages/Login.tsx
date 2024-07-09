import { React, useState, GoogleOAuthProvider, GoogleLogin, loginAccount,getCurrentLogin , config, logo, Artwork, Form, Input, Button, EyeOutlined, EyeInvisibleOutlined } from '../utils/commonImports';
import {  CredentialResponse } from '@react-oauth/google';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (values: { email: string, password: string }) => {
    setIsButtonDisabled(true);
    try {
      const response = await loginAccount(values);
      console.log('Login successful:', response);
      const GetCurrentLogin = await getCurrentLogin();
      localStorage.setItem('userData', JSON.stringify(GetCurrentLogin));
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    console.log('Google login successful:', response);
  };

  const handleGoogleLoginError = () => {
    console.error('Error logging in with Google');
  };

  return (
    <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
      <div className="w-full h-screen flex items-start">
        <div className="relative w-1/2 h-full flex flex-col">
          <img className="w-full h-full object-cover object-center max-w-full max-h-full" src={Artwork} />
        </div>

        <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
        <img src={logo} alt="Logo" className="h-24 w-auto cursor-pointer" />
          <div className="w-full flex flex-col">
            <div className='w-full flex flex-col max-w-[500px]'>
              <h3 className="text-3xl font-semibold mb-5">Login</h3>
              <p className='text-base mb-2'>If you already a member, easily log in</p>
            </div>
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
    </GoogleOAuthProvider>
  );
};

export default Login;
