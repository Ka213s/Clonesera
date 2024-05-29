import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  fullName: string;
  phoneNumber: string;
  avatar: string | File | null;
}

const ProfileUpdate: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    phoneNumber: '',
    avatar: null,
  });
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Fetch profile error', error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    if (files && files[0]) {
      setProfileData({ ...profileData, avatar: files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsButtonDisabled(true);

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('fullName', profileData.fullName);
    formData.append('phoneNumber', profileData.phoneNumber);
    if (profileData.avatar) {
      formData.append('avatar', profileData.avatar as File);
    }

    try {
      const response = await axios.put('/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        toast.success('Profile updated successfully');
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Update profile error', error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleBackClick = (): void => {
    navigate('/studenthome');
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Avatar:</label>
          <input type="file" name="avatar" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={isButtonDisabled}>
          {isButtonDisabled ? 'Please wait...' : 'Update Profile'}
        </button>
      </form>
      <button onClick={handleBackClick}>Back</button>
      <ToastContainer />
    </div>
  );
};

export default ProfileUpdate;
