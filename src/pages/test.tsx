import React, { useEffect } from 'react';

const Test: React.FC = () => {
  useEffect(() => {
    // Log the environment variables to the console
    console.log('GOOGLE_CLIENT_ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
    console.log('API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('TINYMCE_API_KEY:', import.meta.env.VITE_TINYMCE_API_KEY);
    console.log('RECAPTCHA_SITE_KEY:', import.meta.env.VITE_RECAPTCHA_SITE_KEY);
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      <p>Check the console for environment variable values.</p>
    </div>
  );
};

export default Test;
