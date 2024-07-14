import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Typography, Input, Button, Form } from 'antd';
import { verifyEmail, resendVerifyEmail } from '../utils/commonImports';
import { ReadOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

type Params = {
  token?: string;
};

type VerificationResult = {
  success: boolean;
  message?: string;
};

function VerifyEmailDone() {
  const { token } = useParams<Params>();
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [countdown, setCountdown] = useState<number>(5);
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [resendEmail, setResendEmail] = useState<string>('');

  useEffect(() => {
    const verifyEmailToken = async () => {
      if (!token || isVerified) {
        return;
      }

      const result = await verifyEmail(token);
      if (result.success) {
        setVerificationResult(result);
        setIsVerified(true);
      } else if (result.message === 'Token expired') {
        setIsTokenExpired(true);
      } else {
        message.error('Error verifying email');
      }
    };

    verifyEmailToken();
  }, [token, isVerified]);

  useEffect(() => {
    if (verificationResult?.success) {
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

  const handleResendVerificationEmail = async () => {
    await resendVerifyEmail({ email: resendEmail });
    message.success('Verification email resent successfully');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 to-blue-200 relative">
      <div className="flex flex-col items-center p-20 md:p-34 bg-white rounded-3xl shadow-2xl space-y-6 md:space-y-8 transition-all duration-500 ease-in-out transform hover:scale-105">
        <ReadOutlined className="text-7xl text-blue-600 mb-6" />
        {!isTokenExpired ? (
          <>
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
          </>
        ) : (
          <>
            <Typography.Title level={2} className="text-4xl font-extrabold text-red-600">
              Verification Failed
            </Typography.Title>
            <Paragraph className="text-xl text-red-500">
              The verification link has expired.
            </Paragraph>
            <Form
              layout="inline"
              onFinish={handleResendVerificationEmail}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please enter your email!' }]}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Resend Verification Email
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-max pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 250"
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
}

export default VerifyEmailDone;
