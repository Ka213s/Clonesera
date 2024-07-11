import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    // Gọi API xác thực email ở đây
    React.useEffect(() => {
        if (token) {
            verifyEmail(token)
                .then(response => {
                    console.log('Response:', response); // Ví dụ sử dụng response
                    toast.success('Email đã được xác thực thành công!');
                })
                .catch(error => {
                    console.error('Error:', error); // Ví dụ sử dụng error
                    toast.error('Xác thực email thất bại!');
                });
        }
    }, [token]);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-orange-400">
            <div className="bg-white rounded-xl shadow-md max-w-md mx-auto text-center py-16 px-8 space-y-6">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 4h.01M20.29 8.71A10.97 10.97 0 0112 2a10.97 10.97 0 00-8.29 6.71A10.97 10.97 0 002 12a10.97 10.97 0 006.71 8.29A10.97 10.97 0 0012 22a10.97 10.97 0 008.29-6.71A10.97 10.97 0 0022 12a10.97 10.97 0 00-1.71-3.29z"></path></svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-700">Welcome to your Clan</h2>
                <p className="text-gray-500">One last thing... click on the link we sent to your email to complete your account setup.</p>
                <button className="mt-4 px-6 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300">Gotcha, thanks!</button>
                <p className="text-sm text-gray-400">Didn't receive a link? <a href="#" className="text-purple-600 hover:underline">Click here to re-send</a></p>
            </div>
        </div>
    );
};

// Giả sử bạn có một hàm để gọi API xác thực email
const verifyEmail = async (token: string) => {
    // Thực hiện gọi API ở đây và trả về kết quả
    return fetch(`/api/verify-email?token=${token}`)
        .then(response => response.json());
};

export default VerifyEmail;
