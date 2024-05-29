import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import FormValidator from '../components/FormValidator';

interface FormData {
    password: string;
    confirmPassword: string;
    email: string;
    creationDate: string;
    role: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
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

            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            toast.success('Registration successful');
            console.log('Registration successful:', userCredential.user);

            setFormData({
                password: '',
                confirmPassword: '',
                email: '',
                creationDate: new Date().toISOString(),
                role: 'student',
            });

        } catch (error: any) {
            toast.error('Error registering: ' + error.message);
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
