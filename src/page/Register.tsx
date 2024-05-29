import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormValidator from '../components/FormValidator';
import ApiService from '../api/ApiService';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FormData {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    creationDate: string;
    role: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        creationDate: new Date().toISOString(),
        role: 'student',
    });
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleLoginClick = (): void => {
        navigate('/');
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

            const accounts = await ApiService.getAccounts();
            const findUsername = accounts.find((account: FormData) => account.username === formData.username);


            if (findUsername) {
                toast.error('Username already exists');
                setIsButtonDisabled(false);
                return;
            }

            const dataToSubmit = {
                username: formData.username,
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
            };

            const response = await ApiService.registerAccount(dataToSubmit);
            toast.success('Registration successful');
            console.log('Registration successful:', response.data);
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                creationDate: new Date().toISOString(),
                role: 'student',
            });
        } catch (error) {
            toast.error('Error registering');
            console.error('Error registering:', error);
        } finally {
            setIsButtonDisabled(false);
        }
    };
    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-5 items-center">
                <div className='md:block hidden w-1/2'>
                    <img className='rounded-2xl' src="Artwork.jpg" alt="" />
                </div>
                <div className='md:w-1/2 px-16'>
                    <h2 className="font-bold text-2xl text-[#6C6EDD]">Register</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder='Username'
                            className="p-2 mt-5 rounded-xl border"
                        />
                        <div className='relative'>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder='Password'
                                className="p-2 mt-5 rounded-xl border w-full"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-1/2 right-3 transform -translate-y-1/5"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className='relative'>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder='Confirm Password'
                                className="p-2 mt-5 rounded-xl border w-full"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-1/2 right-3 transform -translate-y-1/5"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder='Email'
                            className="p-2 mt-5 rounded-xl border"
                        />
                        <div className="flex items-center">
                            <label htmlFor="role" className="mr-2 text-gray-700">Role:</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleSelectChange}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                            >
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                            </select>
                        </div>


                        <button type="submit"
                            disabled={isButtonDisabled}
                            className='px-5 py-2 bg-[#9997F5]
                                rounded-2xl text-white w-full
                                hover:scale-105 duration-300'>
                            {isButtonDisabled ? 'Please wait...' : 'Register'}
                        </button>
                    </form>
                    <div className='mt-3 text-base flex justify-between items-center'>
                        <p>Already have an account?</p>
                        <button onClick={handleLoginClick}
                            className="py-2 px-5 bg-white border rounded-xl
                    hover:scale-110 duration-300 ">Sign Up</button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Register;
