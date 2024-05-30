import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService, { UserData } from '../api/ApiService';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Artwork from '../assets/Artwork.jpg';

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
    const [showPassword, setShowPassword] = useState(false);
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
            const account = response.find((account: UserData) =>
                account.email === loginData.email &&
                account.password === loginData.password &&
                account.status === true
            );
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

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    const handleGoogleLogin = async (): Promise<void> => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user) {
                const user = result.user;
                const profile = user.providerData[0];
                const fullName = profile.displayName ?? '';
                const email = profile.email ?? ''; 
                const photoURL = profile.photoURL ?? ''; 

                const userData: UserData = {
                    fullName,
                    email,
                    avatar: photoURL,
                    createdAt: new Date().toISOString(),
                    status: true,
                    password: null,
                    address: null,
                    updateAt: null,
                    phonenumber: null,
                    walletId: null,
                    roleId: 2 
                };

                try {
                    await ApiService.saveGoogleUserData(userData);
                    toast.success("User logged in successfully!");

                    switch (userData.roleId) {
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
                } catch (error) {
                    toast.error('Error saving user data to API');
                    console.error('Error saving user data to API:', error);
                }
            }
        } catch (error) {
            toast.error('Error logging in with Google');
            console.error('Error logging in with Google:', error);
        }
    };    
    
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-5 items-center">
                <div className='md:w-1/2 px-16'>
                    <h2 className="font-bold text-2xl text-[#6C6EDD]">Login</h2>
                    <p className='text-base mt-4 text-[#4A4DC3]'>If you already a member, easily log in</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder='Email'
                            value={loginData.email}
                            onChange={handleChange}
                            required
                            className="p-2 mt-5 rounded-xl border"
                        />
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder='Password'
                                value={loginData.password}
                                onChange={handleChange}
                                required
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
                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                            className="px-5 py-2 bg-[#9997F5]
                                rounded-2xl text-white w-full
                                hover:scale-105 duration-300"
                        >
                            {isButtonDisabled ? 'Please wait...' : 'Login'}
                        </button>
                    </form>
                    <div className='mt-10 grid grid-cols-3 items-center text-gray-500'>
                        <hr className='border-gray-400' />
                        <p className='text-center'>OR</p>
                        <hr className='border-gray-400' />
                    </div>
                    <button
                        onClick={handleGoogleLogin}
                        className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center
                                items-center text-sm
                                hover:scale-110 duration-300"
                    >
                        <FaGoogle className="me-2" />
                        Login with Google
                    </button>
                    <div className='w-full mt-5 border-b border-gray-400'>
                        <button
                            className='text-base py-4 text-[#6C6EDD] text-left cursor-pointer'
                        >Forgot your password?</button>
                    </div>
                    <div className='mt-3 text-base flex justify-between items-center'>
                        <p>Don't have account?</p>
                        <button
                            onClick={handleRegisterClick}
                            className="py-2 px-5 bg-white border rounded-xl
                        hover:scale-110 duration-300 "
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className='md:block hidden w-1/2'>
                <img className='rounded-2xl' src={Artwork} alt="" />
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
