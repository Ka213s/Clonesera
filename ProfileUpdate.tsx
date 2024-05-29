import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'student',
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSubmit = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      createdAt: new Date().toISOString(),
      roleId: formData.role === 'student' ? 2 : 3,
      status: true,
      walletId: null,
      phonenumber: null,
      avatar: null,
      updateAt: null,
      address: null,
      fullName: null,
    };

    try {
      const response = await axios.post('/api/register', dataToSubmit);
      if (response.data.success) {
        alert('Registration successful');
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleInputChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
