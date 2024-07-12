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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-white">
      <div className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-2xl space-y-8 transition-all duration-500 ease-in-out transform hover:scale-105">
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
    </div>
  );
}

export default VerifyEmailDone;
