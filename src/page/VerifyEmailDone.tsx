import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Typography, Spin } from 'antd';
import { createApiInstance } from '../services/Api';

const { Title, Paragraph } = Typography;

type Params = {
  token?: string;
};

function VerifyEmailDone() {
  const { token } = useParams<Params>();
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        message.error('Token is missing');
        return;
      }

      setLoading(true);

      try {
        const result = await api.verifyEmail(token);
        setVerificationResult(result);
        message.success('Email verification successful');
      } catch (error) {
        message.error('Error verifying email');
      } finally {
        setLoading(false);
      }
    };

    if (token && !verificationResult) {
      verifyEmail();
    }
  }, [token, api, verificationResult]);

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Spin spinning={loading}>
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg">
          <img src="/path/to/your/image.png" alt="Verified Email" className="w-24 h-24 mb-6" />
          <Title level={2} className="mb-4 text-2xl font-bold text-[#6C6EDD]">Email Verified</Title>
          <Paragraph className="mb-2 text-lg text-[#4A4DC3]">Your email has been successfully verified.</Paragraph>
          {verificationResult && (
            <Paragraph className="mt-4 text-base text-[#4A4DC3]">
              Redirecting to login page in {countdown} seconds...
            </Paragraph>
          )}
        </div>
      </Spin>
    </div>
  );
}

export default VerifyEmailDone;
