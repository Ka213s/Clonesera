import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import FormValidator from '../components/FormValidator';
import ApiService from '../services/ApiService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Artwork from '../assets/Artwork.jpg';
import { FormData } from '../models/FormData';
import { Form, Input, Button, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(new FormData('', '', '', 'student'));
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoginClick = (): void => {
        navigate('/login');
    };

    const handleRoleChange = (e: any): void => {
        setFormData({
            ...formData,
            role: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsButtonDisabled(true);

        try {
            const isValid = FormValidator.validate(formData);
            if (!isValid) {
                setIsButtonDisabled(false);
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log('Registration successful:', userCredential.user);

            const dataToSubmit = {
                password: formData.password,
                email: formData.email,
                createdAt: formData.creationDate,
                roleId: formData.role === 'student' ? 2 : 3,
                status: true,
                walletId: null,
                phonenumber: null,
                avatar: null,
                updateAt: null,
                address: null,
                fullName: null,
            };

            const response = await ApiService.registerAccount(dataToSubmit);
            toast.success('Registration successful ');
            console.log('Registration successful with External API:', response.data);
            setFormData(new FormData('', '', '', 'student'));

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
                    <Form onFinish={handleSubmit} className="flex flex-col gap-4">
                        <Form.Item>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder='Email'
                                className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder='Password'
                                className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder='Confirm Password'
                                className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Radio.Group onChange={handleRoleChange} value={formData.role}>
                                <Radio value="student">Student</Radio>
                                <Radio value="instructor">Instructor</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="default"
                                htmlType="submit"
                                disabled={isButtonDisabled}
                                style={{
                                    backgroundColor: '#9997F5',
                                    borderColor: '#9997F5',
                                    color: '#fff',
                                }}
                                className="p-3 rounded-2xl w-full hover:bg-[#8886E5] hover:scale-105 duration-300 font-bold"
                            >
                                {isButtonDisabled ? 'Please wait...' : 'Register'}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='text-base flex justify-between items-center'>
                        <p>Already have an account?</p>
                        <Button
                            onClick={handleLoginClick}
                            className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Sign In
                        </Button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Register;
