import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    React.useEffect(() => {
        if (token) {
            verifyEmail(token)
                .then(response => {
                    console.log('Response:', response);
                    toast.success('Email đã được xác thực thành công!');
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.error('Xác thực email thất bại!');
                });
        }
    }, [token]);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-orange-400 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 w-full max-w-5xl mx-auto text-center py-36 px-32 space-y-10">
                {/* Phần nội dung */}
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 4h.01M20.29 8.71A10.97 10.97 0 0112 2a10.97 10.97 0 00-8.29 6.71A10.97 10.97 0 002 12a10.97 10.97 0 006.71 8.29A10.97 10.97 0 0012 22a10.97 10.97 0 008.29-6.71A10.97 10.97 0 0022 12a10.97 10.97 0 00-1.71-3.29z"></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-semibold text-white">Welcome to your Clan</h2>
                <p className="text-gray-100">One last thing... click on the link we sent to your email to complete your account setup.</p>
                <button className="mt-4 px-6 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300">Gotcha, thanks!</button>
                <p className="text-sm text-gray-200">Didn't receive a link? <a href="#" className="text-purple-300 hover:underline">Click here to re-send</a></p>
            </div>
            {/* Gradient */}
            <svg
                className="absolute inset-x-0 top-0 w-full h-max"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="url(#gradient)"
                    fillOpacity="1"
                    d="M0,0L48,21.3C96,42,192,85,288,96C384,107,480,53,576,42.7C672,32,768,64,864,64C960,64,1056,32,1152,53.3C1248,75,1344,149,1392,186.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ></path>
                <defs>
                    <linearGradient id="gradient" x1="0" x2="1" y1="1" y2="1">
                        <stop offset="0%" stopColor="#6b46c1" />
                        <stop offset="100%" stopColor="#ed64a6" />
                    </linearGradient>
                </defs>
            </svg>

            <svg
                className="absolute inset-x-0 bottom-0 w-full h-max pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="url(#gradient2)"
                    fillOpacity="1"
                    d="M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,170.7C672,160,768,192,864,197.3C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,154.7L1440,149.3L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
                <defs>
                    <linearGradient id="gradient2" x1="0" x2="1" y1="1" y2="1">
                        <stop offset="0%" stopColor="#ed64a6" />
                        <stop offset="100%" stopColor="#6b46c1" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

const verifyEmail = async (token: string) => {
    return fetch(`/api/verify-email?token=${token}`)
        .then(response => response.json());
};

export default VerifyEmail;
