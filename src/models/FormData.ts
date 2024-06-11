export class FormData {
    password: string;
    confirmPassword: string;
    email: string;
    creationDate: string;
    role: string;

    constructor(password: string, confirmPassword: string, email: string, role: string) {
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.email = email;
        this.creationDate = new Date().toISOString();
        this.role = role;
    }
}
