import { toast } from 'react-toastify';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

class FormValidator {
    static validate(formData: FormData): boolean {
        const { email, password, confirmPassword } = formData;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return false;
        }

        // Validate password length
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return false;
        }

        // Check for special character in password
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharacterRegex.test(password)) {
            toast.error('Password must contain at least one special character');
            return false;
        }

        // Check for uppercase letter in password
        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(password)) {
            toast.error('Password must contain at least one uppercase letter');
            return false;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }

        return true;
    }
}

export default FormValidator;
