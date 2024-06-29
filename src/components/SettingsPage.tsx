import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AccountSettings from './AccountSettings';
import PrivacySettings from './PrivacySettings';
import NotificationSettings from './NotificationSettings';
import CloseAccount from './CloseAccount';
import ChangePassword from './ChangePassword';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const [password, setPassword] = useState<string>('');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userId = userData.id || '';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return <AccountSettings  />;
      case 'Privacy':
        return <PrivacySettings />;
      case 'Notification':
        return <NotificationSettings />;
      case 'Change Password':
        return <ChangePassword userId={userId} />;
      case 'Close Account':
        return <CloseAccount password={password} setPassword={setPassword} />;
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
    </div>
  );
};

export default SettingsPage;
