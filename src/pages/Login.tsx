import { React, useState, GoogleOAuthProvider, GoogleLogin, Link, loginAccount, getCurrentLogin, registerUserByGoogle, loginUserByGoogle, config, logo, Form, Input, Button, EyeOutlined, useNavigate, EyeInvisibleOutlined } from '../utils/commonImports';
import { CredentialResponse } from '@react-oauth/google';
import FileUploader from '../components/FileUploader'; 

const Login: React.FC = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [googleId, setGoogleId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => { navigate('/register'); };
  const handleForgotPasswordClick = () => { navigate('/forgot-password'); };

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsButtonDisabled(true);
    try {
      const response = await loginAccount(values);
      console.log('Login response:', response);
      const currentLogin = await getCurrentLogin();
      localStorage.setItem('userData', JSON.stringify(currentLogin));
      if (currentLogin.role === 'admin') {
        navigate('/request-management');
      } else {
        navigate('/');
      }
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
        if (userResponse.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
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
    if (!googleId || !selectedRole || !avatar || !description || !video || !phoneNumber) return;

    try {
      const response = await registerUserByGoogle({
        google_id: googleId,
        role: selectedRole,
        description: description,
        video: video,
        phone_number: phoneNumber,
      });
      const token = response.token;
      localStorage.setItem('token', token);
      setIsRoleModalVisible(false);
      navigate('/homepage');
    } catch (error) {
      console.error('Error registering with Google:', error);
    }
  };

  const handleGoogleLoginError = () => {
    console.error('Error logging in with Google');
  };

  const handleAvatarUploadSuccess = (url: string) => {
    setAvatar(url);
  };

  const handleVideoUploadSuccess = (url: string) => {
    setVideo(url);
  };

  return (
    <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-green-400 to-white-500 relative">
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
                  <Button type="link" className="text-sm font-medium text-gray-500 underline" onClick={handleForgotPasswordClick}>
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
          <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl relative">
            <button
              onClick={() => setIsRoleModalVisible(false)}
              className="absolute top-3 right-7 text-gray-500 hover:text-gray-700 transition duration-300 text-3xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sign up with google</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <select
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <FileUploader type="image" onUploadSuccess={handleAvatarUploadSuccess} />
                {avatar && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Image selected:</p>
                    <img src={avatar} alt="Selected avatar" className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>
              <div>
                <FileUploader type="video" onUploadSuccess={handleVideoUploadSuccess} />
                {video && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Video selected:</p>
                    <video src={video} controls className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <button
                  onClick={handleRoleSelection}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </GoogleOAuthProvider>
  );
};

export default Login;
