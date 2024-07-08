import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaComponentProps {
    onChange: (token: string | null) => void;
}

const RecaptchaComponent: React.FC<RecaptchaComponentProps> = ({ onChange }) => {
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '';

    if (!siteKey) {
        console.error("Missing ReCAPTCHA site key. Please set REACT_APP_RECAPTCHA_SITE_KEY in your environment variables.");
        return null;
    }

    return (
        <ReCAPTCHA
            sitekey={siteKey}
            onChange={onChange}
        />
    );
};

export default RecaptchaComponent;
