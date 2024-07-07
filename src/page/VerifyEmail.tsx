import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button, message } from 'antd';
import { FaEnvelope } from 'react-icons/fa';
import { createApiInstance } from '../services/Api';
import { useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || 'your email';
    const api = createApiInstance(navigate);

    const handleResendEmail = async () => {
        try {
            await api.resendVerifyEmail({ email });
        } catch (error) {
            message.error('Error resending verification email');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <FaEnvelope size={64} color="#6C6EDD" className="mb-4" />
                <h2 className="font-bold text-3xl text-[#6C6EDD] mb-4">Verify your email address</h2>
                <p className="text-base text-[#4A4DC3] mb-2">
                    We have sent a verification link to <strong>{email}</strong>.
                </p>
                <p className="text-base text-[#4A4DC3] mb-6">
                    Click on the link to complete the verification process. You might need to check your spam folder.
                </p>
                <Button
                    type="primary"
                    style={{
                        backgroundColor: '#9997F5',
                        borderColor: '#9997F5',
                        color: '#fff',
                    }}
                    className="p-3 rounded-2xl w-full bg-[#9997F5] text-white hover:bg-[#8886E5] hover:scale-105 duration-300 font-bold mb-4"
                    onClick={handleResendEmail}
                >
                    Resend email
                </Button>
                <Link to="/login" className="text-base text-[#4A4DC3]">
                    Go back to Login →
                </Link>
            </div>
        </div>
    );
};

export default VerifyEmail;
