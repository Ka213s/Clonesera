import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { logo } from '../utils/commonImports';

interface FormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'student' | 'instructor';
}

const Register: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleLoginClick = () => { navigate('/login') };

    const handleSubmit = async (values: FormValues): Promise<void> => {
        setIsButtonDisabled(true);
        
        const dataToSubmit = {
            name: values.fullName,
            password: values.password,
            email: values.email,
            role: values.role,
        };
        console.log('Data to submit:', dataToSubmit);
        // Perform API call or other actions here

        form.resetFields();
        navigate('/verify-email', { state: { email: values.email } });
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-purple-300 to-blue-200 relative">
            <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden relative z-10">
                <div className="w-full md:w-1/2 px-6 py-8 flex flex-col justify-center overflow-y-auto">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-10 w-auto mb-6 cursor-pointer" />
                    </Link>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">Register</h2>
                    <p className='text-sm text-gray-600 mb-4'>Welcome to Clonesera</p>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical"
                        className="flex flex-col gap-3"
                        initialValues={{ role: 'student' }}
                    >
                        <Form.Item
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input placeholder='Full Name' size="large" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input placeholder='Email' size="large" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 6, message: 'Password must be at least 6 characters long!' }
                            ]}
                        >
                            <Input.Password
                                placeholder='Password'
                                size="large"
                                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder='Confirm Password'
                                size="large"
                                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="role"
                            rules={[{ required: true, message: 'Please select a role!' }]}
                        >
                            <Radio.Group>
                                <Radio value="student">Student</Radio>
                                <Radio value="instructor">Instructor</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={isButtonDisabled}
                                className='w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700'
                            >
                                {isButtonDisabled ? 'Please wait...' : 'Register'}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='mt-2 text-base flex justify-between items-center'>
                        <p>Already have an account?</p>
                        <Button onClick={handleLoginClick} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                            Sign In
                        </Button>
                    </div>
                </div>
                <div className="relative w-1/2 hidden md:flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
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
    );
};

export default Register;
