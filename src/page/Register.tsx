import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormValidator from '../components/FormValidator';
import ApiService from '../api/ApiService';
import { useNavigate } from 'react-router-dom';

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


    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
                fullName: null,
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

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <div>
                        <input
                            type="radio"
                            id="student"
                            name="role"
                            value="student"
                            checked={formData.role === 'student'}
                            onChange={handleChange}
                        />
                        <label htmlFor="student">Student</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="instructor"
                            name="role"
                            value="instructor"
                            checked={formData.role === 'instructor'}
                            onChange={handleChange}
                        />
                        <label htmlFor="instructor">Instructor</label>
                    </div>
                </div>
                <button type="submit" disabled={isButtonDisabled}>
                    {isButtonDisabled ? 'Please wait...' : 'Register'}
                </button>
            </form>
            <button onClick={handleLoginClick}>Login</button>
            <ToastContainer />
        </div>
    );
};

export default Register;
