import { toast } from 'react-toastify';

interface FormData {
    username: string;
    password: string;
}

class FormValidator {
    static validate(formData: FormData): boolean {
        const { username, password } = formData;

        if (username.length < 6) {
            toast.error('Username must be at least 6 characters long');
            return false;
        }

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

        return true;
    }
}

export default FormValidator;
