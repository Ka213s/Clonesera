import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createApiInstance } from '../services/Api'; 

type Params = {
  token?: string;
};

function VerifyEmailDone() {
  const { token } = useParams<Params>();
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        toast.error('Token is missing');
        return;
      }

      try {
        const result = await api.verifyEmail(token);
        setVerificationResult(result);
        toast.success('Email verification successful');
      } catch (error) {
        toast.error('Error verifying email');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, api]);

  return (
    <div>
      VerifyEmailDone
      <p>Token: {token}</p>
      {verificationResult && (
        <p>Email verification result: {JSON.stringify(verificationResult)}</p>
      )}
    </div>
  );
}

export default VerifyEmailDone;
