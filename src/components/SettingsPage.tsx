import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import ApiService from '../services/ApiService';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
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

  const handleSaveChanges = async () => {
    const updatedProfile = {
      fullName,
      address,
      phonenumber: phoneNumber,
      description,
      email,
      avatar
    };

    try {
      await ApiService.updateAccount(userId, updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">Your Cursus Account</h2>
            <p>This is your public presence on Cursus. You need an account to upload your paid courses, comment on courses, purchased by students, or earning.</p>
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            </div>
          </div>
        );
      // Add cases for other tabs like Notification, Privacy, etc.
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Setting</h1>
        <div className="border-b border-gray-200">
          <ul className="flex -mb-px">
            <li className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === 'Account' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('Account')}
              >
                Account
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === 'Notification' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('Notification')}
              >
                Notification
              </button>
            </li>
            {/* Add other tabs here */}
          </ul>
        </div>
        <div className="mt-4">
          {renderTabContent()}
        </div>

      </div>
      <ToastContainer />
    </MainLayout>

  );
};

export default SettingsPage;
