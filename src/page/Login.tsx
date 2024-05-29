import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from '../api/ApiService';

interface LoginData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsButtonDisabled(true);

        try {
            const response = await ApiService.login(loginData);
            const account = response.find((account: any) =>
                account.email === loginData.email &&
                account.password === loginData.password &&
                account.status === true
            );
            console.log(account);
            if (account) {
                toast.success('Login successful');
                localStorage.setItem('userData', JSON.stringify(account));
                switch (account.roleId) {
                    case 1:
                        navigate('/adminhome');
                        break;
                    case 2:
                        navigate('/studenthome');
                        break;
                    case 3:
                        navigate('/instructorhome');
                        break;
                    default:
                        break;
                }
            } else {
                toast.error('Invalid email or password, or account is inactive');
            }
        } catch (error) {
            toast.error('Error logging in');
            console.error('Error logging in:', error);
        } finally {
            setIsButtonDisabled(false);
        }
    };

    const handleRegisterClick = (): void => {
        navigate('/register');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={loginData.email}
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
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isButtonDisabled}>
                    {isButtonDisabled ? 'Please wait...' : 'Login'}
                </button>
            </form>
            <button onClick={handleRegisterClick}>Register</button>
            <ToastContainer />
        </div>
    );
};

export default Login;
