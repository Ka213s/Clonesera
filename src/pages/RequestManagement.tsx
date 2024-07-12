// requestManagement.tsx
import React, { useState } from 'react';
import Approved from '../components/RequestManagement/Approved';
import Rejected from '../components/RequestManagement/Rejected';
import Pending from '../components/RequestManagement/Pending';


const tabs = [
    { name: 'Pending', key: 'pending' },
    { name: 'Approved', key: 'approved' },
    { name: 'Rejected', key: 'rejected' },
];

const RequestManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('pending');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'pending':
                return <Pending />;
            case 'approved':
                return <Approved />;
            case 'rejected':
                return <Rejected />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            <nav className="flex justify-center space-x-4 border-b mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`py-2 px-4 text-sm font-medium ${activeTab === tab.key
                            ? 'text-red-500 border-b-2 border-red-500'
                            : 'text-gray-500'
                            }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </nav>
            {renderTabContent()}
        </div>
    );
};

export default RequestManagement;
