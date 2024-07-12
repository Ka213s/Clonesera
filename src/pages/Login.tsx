import { React, useState, GoogleOAuthProvider, GoogleLogin, Link, loginAccount, getCurrentLogin, registerUserByGoogle, loginUserByGoogle, config, logo, Form, Input, Button, EyeOutlined, useNavigate, EyeInvisibleOutlined } from '../utils/commonImports';
import { CredentialResponse } from '@react-oauth/google';
import { Radio } from 'antd';

const Login: React.FC = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [googleId, setGoogleId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => { navigate('/register'); };

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsButtonDisabled(true);
    try {
      const response = await loginAccount(values);
      console.log('Login response:', response);
      const currentLogin = await getCurrentLogin();
      localStorage.setItem('userData', JSON.stringify(currentLogin));
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      console.error('Error: Google credential is undefined');
      return;
    }

    try {
      const googleResponse = await loginUserByGoogle({ google_id: response.credential });
      console.log('Google login response:', googleResponse);
      if (googleResponse) {
        const token = googleResponse.token;
        localStorage.setItem('token', token);
        const userResponse = await getCurrentLogin();
        const dataUser = JSON.stringify(userResponse);
        localStorage.setItem('userData', dataUser);
        navigate('/');
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

  const handleRoleSelection = async () => {
    if (!googleId || !selectedRole) return;

    try {
      const response = await registerUserByGoogle({ google_id: googleId, role: selectedRole });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsRoleModalVisible(false);
      navigate('/home');
    } catch (error) {
      console.error('Error registering with Google:', error);
    }
  };

  const handleGoogleLoginError = () => {
    console.error('Error logging in with Google');
  };

  return (
    <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-purple-300 to-blue-200 relative">
        <div className="flex flex-col w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden relative z-10 md:flex-row">
          <div className="w-full md:w-1/2 px-4 md:px-20 py-10 flex flex-col justify-between">
            <div>
              <Link to={'/'}>
                <img src={logo} alt="Logo" className="h-10 w-auto mb-8 relative z-10" />
              </Link>
              <h3 className="text-3xl font-bold mb-1">Welcome Back</h3>
              <p className="text-sm text-gray-600 mb-6">Login to your account</p>

              <Form
                name="login"
                onFinish={handleSubmit}
                className="flex flex-col w-full"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Invalid email format!' },
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Username"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    placeholder="Password"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <div className="flex items-center justify-between w-full mb-6">
                  <div className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                    <p className="text-sm">Remember Me</p>
                  </div>
                  <Button type="link" className="text-sm font-medium text-gray-500 underline">
                    Forgot password?
                  </Button>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isButtonDisabled}
                  className="w-full py-3 mb-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {isButtonDisabled ? 'Please wait...' : 'Login'}
                </Button>

                <div className="flex items-center justify-center w-full mb-4">
                  <hr className="border-gray-300 flex-1" />
                  <p className="px-4 text-gray-500">OR</p>
                  <hr className="border-gray-300 flex-1" />
                </div>

                <div className="flex justify-center mb-4">
                  <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
                </div>
              </Form>
            </div>

            <div className="mt-3 text-base flex justify-between items-center">
              <p>Don't have an account?</p>
              <Button onClick={handleLoginClick} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Sign Up
              </Button>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <div className="blob bg-blue-400 w-full h-full"></div>
              <div className="blob bg-green-400 animation-delay-2000 w-full h-full"></div>
              <div className="blob bg-purple-400 animation-delay-4000 w-full h-full"></div>
            </div>
          </div>
        </div>
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>

      {isRoleModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Select Your Role</h2>
            <div className="flex justify-between mb-4">
              <Radio.Group
                onChange={(e) => setSelectedRole(e.target.value)}
                value={selectedRole}
                className="flex flex-row"
              >
                <Radio value="student">
                  <span className="text-base">Student</span>
                </Radio>
                <Radio value="instructor" className="ml-28">
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
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleRoleSelection}
                className="w-full py-2 bg-blue-600 text-white rounded-lg"
                disabled={!selectedRole}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </GoogleOAuthProvider>
  );
};

export default Login;
