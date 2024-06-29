import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { createApiInstance } from '../services/Api';
import AccountSettings from './AccountSettings';
import PrivacySettings from './PrivacySettings';
import NotificationSettings from './NotificationSettings';
import CloseAccount from './CloseAccount';
import ChangePassword from './ChangePassword';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [phone_number, setPhoneNumber] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [description, setDescription] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    subscriptions: true,
    recommendedCourses: false,
    activityOnComments: false,
    repliesToComments: true,
  });
  const [errors, setErrors] = useState({
    name: '',
    phone_number: '',
    email: '',
    description: ''
  });

  const userIdFromLocalStorage = localStorage.getItem('data');
  const userId = userIdFromLocalStorage ? JSON.parse(userIdFromLocalStorage)._id : '';

  const api = createApiInstance(useNavigate());

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const storageRef = ref(storage, `avatars/${userId}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setAvatar(downloadURL);
      } catch (error) {
        console.error("Error handling avatar change:", error);
        toast.error("Error handling avatar change");
      }
    }
  };

  const validateForm = () => {
    let formValid = true;
    let errors = { name: '', phone_number: '', email: '', description: '' };

    if (!name) {
      formValid = false;
      errors.name = 'Name is required';
    }
    if (!phone_number) {
      formValid = false;
      errors.phone_number = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(phone_number)) {
      formValid = false;
      errors.phone_number = 'Phone Number must be 10 digits';
    }
    if (!email) {
      formValid = false;
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formValid = false;
      errors.email = 'Email address is invalid';
    }
    if (!description) {
      formValid = false;
      errors.description = 'Description is required';
    }

    setErrors(errors);
    return formValid;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }

    const updatedProfile = {
      name: name || null,
      phone_number: phone_number || null,
      description: description || null,
      email: email || null,
      avatar: avatar || null,
      video: video || null,
    };
console.log(updatedProfile);
    try {
      await api.updateAccount(userId, updatedProfile);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  const handleToggleChange = (name: keyof typeof notifications) => {
    setNotifications(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return (
          <AccountSettings 
            avatar={avatar}
            handleAvatarChange={handleAvatarChange}
            name={name}
            setName={setName}
            phone_number={phone_number}
            setPhoneNumber={setPhoneNumber}
            email={email}
            setEmail={setEmail}
            description={description}
            setDescription={setDescription}
            errors={errors}
            handleSaveChanges={handleSaveChanges}
          />
        );
      case 'Privacy':
        return (
          <PrivacySettings 
            handleSaveChanges={handleSaveChanges}
          />
        );
      case 'Notification':
        return (
          <NotificationSettings 
            notifications={notifications}
            handleToggleChange={handleToggleChange}
            handleSaveChanges={handleSaveChanges}
          />
        );
      case 'Change Password':
        return (
          <ChangePassword 
            userId={userId}
          />
        );
      case 'Close Account':
        return (
          <CloseAccount 
            password={password}
            setPassword={setPassword}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Settings</h1>
        <div className="border-b border-gray-200">
          <ul className="flex -mb-px">
            <li className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === 'Account' ? 'border-[#9997F5] text-[#9997F5]' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('Account')}
              >
                Account
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === 'Notification' ? 'border-[#9997F5] text-[#9997F5]' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('Notification')}
              >
                Notification
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === 'Privacy' ? 'border-[#9997F5] text-[#9997F5]' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('Privacy')}
              >
                Privacy
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === 'Change Password' ? 'border-[#9997F5] text-[#9997F5]' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('Change Password')}
              >
                Change Password
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === 'Close Account' ? 'border-[#9997F5] text-[#9997F5]' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('Close Account')}
              >
                Close Account
              </button>
            </li>
          </ul>
        </div>
        <div className="mt-4">
          {renderTabContent()}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SettingsPage;
