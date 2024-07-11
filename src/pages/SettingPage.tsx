import React, { useState } from 'react';
import AccountSetting from '../pages/AccountSetting';


const SettingPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Account');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Account':
                return <AccountSetting />;
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
                    </ul>
                </div>
                <div className="mt-4">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
