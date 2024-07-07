import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Typography } from 'antd';
import { createApiInstance } from '../services/Api';
import { SmileOutlined } from '@ant-design/icons';

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
  const [isVerified, setIsVerified] = useState(false); // New state to control verification

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || isVerified) {
        return;
      }

      try {
        const result = await api.verifyEmail(token);
        setVerificationResult(result);
        setIsVerified(true); // Set verification flag
        message.success('Email verification successful');
      } catch (error) {
        message.error('Error verifying email');
      }
    };

    verifyEmail();
  }, [token, api, isVerified]); // Include isVerified in dependencies

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 animate-fadeIn">
      <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg">
        <SmileOutlined className="text-6xl text-green-500 mb-6" />
        <Typography.Title level={2} className="mb-4 text-2xl font-bold text-[#6C6EDD]">
          Email Verified
        </Typography.Title>
        <Paragraph className="mb-2 text-lg text-[#4A4DC3]">
          Your email has been successfully verified.
        </Paragraph>
        {verificationResult && (
          <Paragraph className="mt-4 text-base text-[#4A4DC3] animate-blink">
            Redirecting to login page in {countdown} seconds...
          </Paragraph>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailDone;
