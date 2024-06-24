import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import ApiService from '../services/ApiService';
import AccountSettings from './AccountSettings';
import PrivacySettings from './PrivacySettings';
import NotificationSettings from './NotificationSettings';
import CloseAccount from './CloseAccount';
import ChangePassword from './ChangePassword';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState<string>('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [showCourses, setShowCourses] = useState(false);
  const [notifications, setNotifications] = useState({
    subscriptions: true,
    recommendedCourses: false,
    activityOnComments: false,
    repliesToComments: true,
  });
  const [errors, setErrors] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    description: ''
  });
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userId = userData.id || '';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await ApiService.getAccountById(userId);
        setFullName(data.fullName || '');
        setAddress(data.address || '');
        setPhoneNumber(data.phonenumber || '');
        setDescription(data.description || '');
        setEmail(data.email || '');
        setAvatar(data.avatar || null);
        setProfileVisibility(data.profileVisibility !== undefined ? data.profileVisibility : true);
        setShowCourses(data.showCourses !== undefined ? data.showCourses : false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userId]);

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
    let errors = { fullName: '', address: '', phoneNumber: '', email: '', description: '' };

    if (!fullName) {
      formValid = false;
      errors.fullName = 'Full Name is required';
    }
    if (!address) {
      formValid = false;
      errors.address = 'Address is required';
    }
    if (!phoneNumber) {
      formValid = false;
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      formValid = false;
      errors.phoneNumber = 'Phone Number must be 10 digits';
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
      fullName,
      address,
      phonenumber: phoneNumber,
      description,
      email,
      avatar,
      profileVisibility,
      showCourses
    };

    try {
      await ApiService.updateAccount(userId, updatedProfile);
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
            fullName={fullName}
            setFullName={setFullName}
            address={address}
            setAddress={setAddress}
            phoneNumber={phoneNumber}
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
            profileVisibility={profileVisibility}
            setProfileVisibility={setProfileVisibility}
            showCourses={showCourses}
            setShowCourses={setShowCourses}
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
            // handleCloseAccount={handleCloseAccount}
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
