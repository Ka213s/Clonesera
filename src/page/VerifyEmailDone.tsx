import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Typography } from 'antd';
import { createApiInstance } from '../services/Api';
import { ReadOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

type Params = {
  token?: string;
};

function VerifyEmailDone() {
  const { token } = useParams<Params>();
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const api = createApiInstance(navigate);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || isVerified) {
        return;
      }

      try {
        const result = await api.verifyEmail(token);
        setVerificationResult(result);
        setIsVerified(true);
        message.success('Email verification successful');
      } catch (error) {
        message.error('Error verifying email');
      }
    };

    verifyEmail();
  }, [token, api, isVerified]);

  useEffect(() => {
    if (verificationResult) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        navigate('/login');
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [verificationResult, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-white">
      <div className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-2xl space-y-8 transition-all duration-500 ease-in-out transform hover:scale-105">
        <ReadOutlined className="text-7xl text-blue-600 mb-6" />
        <Typography.Title level={2} className="text-4xl font-extrabold text-blue-600">
          Email Verified!
        </Typography.Title>
        <Paragraph className="text-xl text-blue-500">
          Your email has been successfully verified.
        </Paragraph>
        {verificationResult && (
          <Paragraph className="text-lg text-blue-400 animate-pulse">
            Redirecting to login page in {countdown} seconds...
          </Paragraph>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailDone;
