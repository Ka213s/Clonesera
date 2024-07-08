import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Radio } from 'antd';
import { FaEyeSlash } from 'react-icons/fa';
import Lottie from 'react-lottie';
import logo from '../assets/Logo-2.png';
import { createApiInstance } from '../services/Api';
import Artwork from '../assets/Artwork.jpg';
import animationData from '../assets/Animation - 1719199926629.json';
import ReCAPTCHA from 'react-google-recaptcha';

const Register: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const api = createApiInstance(navigate);

    const handleLoginClick = () => { navigate('/login') };

    const handleSubmit = async (values: any): Promise<void> => {
        setIsButtonDisabled(true);

        if (!captchaValue) {
            form.setFields([{ name: 'captcha', errors: ['Please complete the CAPTCHA!'] }]);
            setIsButtonDisabled(false);
            return;
        }

        try {
            const dataToSubmit = {
                name: values.fullName,
                password: values.password,
                email: values.email,
                role: values.role,
                captcha: captchaValue,
            };
            console.log('Data to submit:', dataToSubmit);
            const response = await api.registerAccount(dataToSubmit);
            if (response.emailExists) {
                setIsButtonDisabled(false);
                form.setFields([{ name: 'email', errors: [response.message] }]);
                return;
            }

            console.log('Registration successful with External API:', response);
            form.resetFields();
            navigate('/verify-email', { state: { email: values.email } });
        } catch (error: any) {
            setIsButtonDisabled(false);
            if (error.response?.data?.message) {
                form.setFields([{ name: 'email', errors: [error.response.data.message] }]);
            } else if (error.emailExists) {
                form.setFields([{ name: 'email', errors: [error.message] }]);
            } else {
                console.error('Error registering:', error);
            }
        }
    };

    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const onCaptchaChange = (value: string | null) => {
        setCaptchaValue(value);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-5xl p-5 items-center">
                <div className="flex justify-center mb-5">
                    <Link to="/home">
                        <img src={logo} alt="Logo" className="h-24 w-31 cursor-pointer" />
                    </Link>
                </div>
                <div className="flex w-full">
                    <div className='md:block hidden w-1/2'>
                        <img className='rounded-2xl' src={Artwork} alt="Artwork" />
                    </div>
                    <div className='md:w-1/2 px-16'>
                        <div className="flex items-center">
                            <div>
                                <h2 className="font-bold text-3xl text-[#6C6EDD] mb-4">Register</h2>
                                <p className='text-base text-[#4A4DC3]'>Welcome to Clonesera</p>
                            </div>
                            <div className="md:block hidden ml-6">
                                <Lottie options={lottieOptions} height={150} width={150} />
                            </div>
                        </div>
                        <Form
                            form={form}
                            onFinish={handleSubmit}
                            layout="vertical"
                            className="flex flex-col gap-4"
                            initialValues={{ role: 'student' }}
                        >
                            <Form.Item
                                name="fullName"
                                rules={[{ required: true, message: 'Please input your full name!' }]}
                            >
                                <Input placeholder='Full Name' className="p-3 rounded-xl border" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email address!' }
                                ]}
                            >
                                <Input placeholder='Email' className="p-3 rounded-xl border" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    placeholder='Password'
                                    className="p-3 rounded-xl border"
                                    suffix={<FaEyeSlash />}
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
                                    className="p-3 rounded-xl border"
                                    suffix={<FaEyeSlash />}
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
                            <Form.Item
                                name="captcha"
                                rules={[{ required: true, message: 'Please complete the CAPTCHA!' }]}
                            >
                                <ReCAPTCHA
                                    sitekey="6LedsAoqAAAAAPbIjK2C0zrf5QidZKCuOvPC5eZu"
                                    onChange={onCaptchaChange}
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
                                    className='p-3 rounded-2xl w-full bg-[#9997F5] text-white hover:bg-[#8886E5] hover:scale-105 duration-300 font-bold'
                                >
                                    {isButtonDisabled ? 'Please wait...' : 'Register'}
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className='mt-4 text-base flex justify-between items-center'>
                            <p>Already have an account?</p>
                            <Button onClick={handleLoginClick} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
