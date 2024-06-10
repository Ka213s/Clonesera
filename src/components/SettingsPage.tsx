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

  const handleSaveChanges = async () => {
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
      toast.success('Profile updated successfully');
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
      case 'Privacy':
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">Privacy</h2>
            <p>Modify your privacy settings here.</p>
            <h6 className="text-xl font-bold mb-2 mt-4">Profile page settings</h6>
            <div className="mt-6">
              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 text-sm font-bold mr-4" htmlFor="profileVisibility">
                  Show your profile on search engines
                </label>
                <Toggle
                  checked={profileVisibility}
                  onChange={() => setProfileVisibility(!profileVisibility)}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 text-sm font-bold mr-4" htmlFor="showCourses">
                  Show courses you're taking on your profile page
                </label>
                <Toggle
                  checked={showCourses}
                  onChange={() => setShowCourses(!showCourses)}
                />
              </div>
              <button
                onClick={handleSaveChanges}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            </div>
          </div>
        );
      case 'Notification':
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">Notifications - Choose when and how to be notified</h2>
            <p>Select push and email notifications you'd like to receive</p>
            <h3 className="text-lg font-bold mt-4">Choose when and how to be notified</h3>
            <div className="mt-6">
              <div className="mb-4 flex items-center">
                <Toggle
                  checked={notifications.subscriptions}
                  onChange={() => handleToggleChange('subscriptions')}
                />
                <div className="ml-4">
                  <label className="text-gray-700 text-sm font-bold">Subscriptions</label>
                  <p className="text-gray-500 text-sm">Notify me about activity from the profiles I'm subscribed to</p>
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <Toggle
                  checked={notifications.recommendedCourses}
                  onChange={() => handleToggleChange('recommendedCourses')}
                />
                <div className="ml-4">
                  <label className="text-gray-700 text-sm font-bold">Recommended Courses</label>
                  <p className="text-gray-500 text-sm">Notify me of courses I might like based on what I watch</p>
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <Toggle
                  checked={notifications.activityOnComments}
                  onChange={() => handleToggleChange('activityOnComments')}
                />
                <div className="ml-4">
                  <label className="text-gray-700 text-sm font-bold">Activity on my comments</label>
                  <p className="text-gray-500 text-sm">Notify me about activity on my comments on others’ courses</p>
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <Toggle
                  checked={notifications.repliesToComments}
                  onChange={() => handleToggleChange('repliesToComments')}
                />
                <div className="ml-4">
                  <label className="text-gray-700 text-sm font-bold">Replies to my comments</label>
                  <p className="text-gray-500 text-sm">Notify me about replies to my comments</p>
                </div>
              </div>
            </div>
            <hr />
            <h3 className="text-lg font-bold mt-4">Email notifications</h3>
            <div className="mt-6">
              <div className="mb-4 flex items-center">
                <Toggle
                  checked={notifications.subscriptions}
                  onChange={() => handleToggleChange('subscriptions')}
                />
                <div className="ml-4">
                  <label className="text-gray-700 text-sm font-bold">Subscriptions</label>
                  <p className="text-gray-500 text-sm">Notify me about activity from the profiles I'm subscribed to</p>
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <Toggle
                  checked={notifications.recommendedCourses}
                  onChange={() => handleToggleChange('recommendedCourses')}
                />
                <div className="ml-4">
                  <label className="text-gray-700 text-sm font-bold">Recommended Courses</label>
                  <p className="text-gray-500 text-sm">Notify me of courses I might like based on what I watch</p>
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <Toggle
                  checked={notifications.activityOnComments}
                  onChange={() => handleToggleChange('activityOnComments')}
                />
                <div className="ml-4">
                  <label className="text-gray-700 text-sm font-bold">Activity on my comments</label>
                  <p className="text-gray-500 text-sm">Notify me about activity on my comments on others’ courses</p>
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <Toggle
                  checked={notifications.repliesToComments}
                  onChange={() => handleToggleChange('repliesToComments')}
                />
                <div className="ml-4">
                  <label className="text-gray-700 text-sm font-bold">Replies to my comments</label>
                  <p className="text-gray-500 text-sm">Notify me about replies to my comments</p>
                </div>
              </div>
              <button
                onClick={handleSaveChanges}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            </div>
          </div>
        );
      case 'Close Account':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-2 mt-8">Close Account</h2>
            <p className="text-gray-700 mt-4 mb-4">
              <span className="font-bold">Warning:</span> If you close your account, you will be unsubscribed from all your 5 courses, and will lose access forever.
            </p>
            <div className="mt-6">
              <input
                id="password"
                type="password"
                className="appearance-none border rounded w-1/2 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1 mb-5">Are you sure you want to close your account?</p>
            </div>
            <button
              // onClick={handleCloseAccount}  
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Close Account
            </button>
          </div>

        );

      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Settings</h1>
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
            <li className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === 'Privacy' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('Privacy')}
              >
                Privacy
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 ${activeTab === 'Close Account' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'}`}
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
    </MainLayout>
  );
};

export default SettingsPage;
