// ListSubscription.tsx
import  { React, useState } from '../../utils/commonImports';
import Subscribed from '../../components/Subscription/Subscribed';
import Subscriber from '../../components/Subscription/Subscriber';

const tabs = [
    { name: 'Subscribed', key: 'subscribed' },
    { name: 'Subscriber', key: 'subscriber' },
];

const ListSubscription: React.FC = () => {
    const [activeTab, setActiveTab] = useState('subscribed');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'subscribed':
                return <Subscribed />;
            case 'subscriber':
                return <Subscriber />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            <nav className="flex space-x-4 border-b mb-4">
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

export default ListSubscription;
