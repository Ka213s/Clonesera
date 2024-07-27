import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserData, updateSubscribed, getSubscribeds } from '../../utils/commonImports';
import CourseTab from './CourseTab';
import SubscriptionTab from './SubscriptionTab';
import AboutTab from './AboutTab';

interface UserData {
    _id: string;
    name: string;
    email: string;
    google_id: string;
    role: string;
    status: boolean;
    description: string;
    phone_number: string;
    avatar: string;
    video: string;
    dob: Date;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
}

const ViewProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState('About');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const data = await getUserData(id);
                    setUserData(data);
                    const subscribeds = await getSubscribeds({ keyword: "", is_delete: false }, 1, 10);
                    console.log('Subscribeds:', subscribeds);
                    setIsSubscribed(subscribeds.total > 0);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                console.error('No user ID provided');
            }
        };

        fetchData();
    }, [id]);

    const handleSubscribe = async () => {
        if (userData) {
            try {
                await updateSubscribed(userData._id);
                setIsSubscribed(true);
                alert('Subscribed successfully!');
            } catch (error) {
                console.error('Error subscribing:', error);
                alert('Failed to subscribe.');
            }
        }
    };

    const handleUnsubscribe = async () => {
        if (userData) {
            try {
                await updateSubscribed(userData._id);
                setIsSubscribed(false);
                alert('Unsubscribed successfully!');
            } catch (error) {
                console.error('Error unsubscribing:', error);
                alert('Failed to unsubscribe.');
            }
        }
    };

    const renderTabContent = () => {
        if (!userData) return null;

        switch (activeTab) {
            case 'About':
                return <AboutTab userData={userData} />;
            case 'Course':
                return <CourseTab />;
            case 'Subscription':
                return <SubscriptionTab />;
            default:
                return null;
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen overflow-y-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src={userData?.avatar || '/default/avatar.jpg'}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full border-4 border-white -mt-16 mb-5 shadow-lg"
                        />
                        <div className="ml-8">
                            <h1 className="text-3xl font-bold">{userData?.name || 'Your Name'}</h1>
                            <p className="text-gray-600">@{userData?.email || 'username'}</p>
                            <p className="text-gray-600 mt-2">{userData?.phone_number || 'Location'}</p>
                        </div>
                    </div>
                    <button
                        className={`px-4 py-2 ${isSubscribed ? 'bg-red-600' : 'bg-green-600'} text-white rounded-lg`}
                        onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
                    >
                        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex space-x-6 border-b border-gray-200 pb-3">
                    {['About', 'Course', 'Subscription'].map((tab) => (
                        <button
                            key={tab}
                            className={`text-gray-600 pb-2 focus:outline-none ${activeTab === tab ? 'border-b-2 border-[#9997F5] font-semibold text-[#9997F5]' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default ViewProfile;
