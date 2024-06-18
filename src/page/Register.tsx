import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Input, Button, Radio } from 'antd';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Artwork from '../assets/Artwork.jpg';
import ApiService from '../services/ApiService';
const Register: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleLoginClick = (): void => {
        navigate('/login');
    };

    const handleSubmit = async (values: any): Promise<void> => {
        setIsButtonDisabled(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            console.log('Registration successful:', userCredential.user);

            const dataToSubmit = {
                password: values.password,
                email: values.email,
                createdAt: new Date().toISOString(),
                roleId: values.role === 'student' ? 2 : 3,
                status: true,
                walletId: null,
                phonenumber: null,
                avatar: null,
                updateAt: null,
                address: null,
                fullName: null,
            };

            const response = await ApiService.registerAccount(dataToSubmit);
            toast.success('Registration successful');
            console.log('Registration successful with External API:', response.data);
            form.resetFields();

        } catch (error: any) {
            toast.error('Error registering: ' + error.message);
            console.error('Error registering:', error);
        } finally {
            setIsButtonDisabled(false);
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = (): void => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-5 items-center">
                <div className='md:block hidden w-1/2'>
                    <img className='rounded-2xl' src={Artwork} alt="" />
                </div>
                <div className='md:w-1/2 px-8 py-4'>
                    <h2 className="font-bold text-3xl text-[#6C6EDD] mb-4">Register</h2>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical" className="flex flex-col gap-4"
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                        >
                            <Input placeholder='Email' className="p-3 rounded-xl border" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                type={showPassword ? "text" : "password"}
                                placeholder='Password'
                                className="p-3 rounded-xl border"
                                suffix={
                                    <Button
                                        type="link"
                                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                        onClick={togglePasswordVisibility}
                                    />
                                }
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
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Confirm Password'
                                className="p-3 rounded-xl border"
                                suffix={
                                    <Button
                                        type="link"
                                        icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        onClick={toggleConfirmPasswordVisibility}
                                    />
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="role" rules={[{ required: true, message: 'Please select a role!' }]}
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
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Register;