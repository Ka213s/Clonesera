import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import ApiService from '../services/ApiService';

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${checked ? 'bg-green-400' : 'bg-gray-300'}`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-6' : ''}`}
      />
    </div>
  );
};

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

  type NotificationKeys = keyof typeof notifications;

  const handleToggleChange = (name: NotificationKeys) => {
    setNotifications(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  // const handleCloseAccount = async () => {
  //   try {
  //     // Call an API service to close the account with the provided password
  //     await ApiService.closeAccount(userId, password);
  //     toast.success('Account closed successfully');
  //     // Redirect or perform other necessary actions after account closure
  //   } catch (error) {
  //     console.error('Error closing account:', error);
  //     toast.error('Error closing account');
  //   }
  // };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">Your Cursus Account</h2>
            <p>This is your public presence on Cursus. You need an account to upload your paid courses, comment on courses, purchased by students, or earning...</p>
            <h2 className="text-xl font-bold mb-2 mt-10">Basic Profile</h2>
            <p>Add information about yourself</p>
            <div className="flex items-center mb-4">
              <div className="relative mt-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                  {avatar ? (
                    <img src={avatar as string} alt="Profile" className="w-full h-full object-cover cursor-pointer" onClick={() => document.getElementById('avatarUpload')?.click()} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400 cursor-pointer" onClick={() => document.getElementById('avatarUpload')?.click()}></div>
                  )}
                </div>
                <input
                  id="avatarUpload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <div className="mt-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fullName ? 'border-red-500' : ''}`}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        );
      case 'Security':
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">Security Settings</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Current Password
              </label>
              <input
                id="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to close your account?')) {
                  // handleCloseAccount();
                }
              }}
            >
              Close Account
            </button>
          </div>
        );
      case 'Notifications':
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">Notification Settings</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Subscriptions</label>
              <Toggle checked={notifications.subscriptions} onChange={() => handleToggleChange('subscriptions')} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Recommended Courses</label>
              <Toggle checked={notifications.recommendedCourses} onChange={() => handleToggleChange('recommendedCourses')} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Activity on My Comments</label>
              <Toggle checked={notifications.activityOnComments} onChange={() => handleToggleChange('activityOnComments')} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Replies to My Comments</label>
              <Toggle checked={notifications.repliesToComments} onChange={() => handleToggleChange('repliesToComments')} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <div className="flex mb-4">
          <button
            className={`mr-4 ${activeTab === 'Account' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('Account')}
          >
            Account
          </button>
          <button
            className={`mr-4 ${activeTab === 'Security' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('Security')}
          >
            Security
          </button>
          <button
            className={`mr-4 ${activeTab === 'Notifications' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('Notifications')}
          >
            Notifications
          </button>
        </div>
        <div>{renderTabContent()}</div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
