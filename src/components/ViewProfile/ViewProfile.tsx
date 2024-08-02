import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserData, updateSubscribed, getCurrentLogin, NT_getUserData } from '../../utils/commonImports';
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
    is_subscribed: boolean;
}

const ViewProfile: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const token = localStorage.getItem('token');
                const [userData, currentUser] = token
                    ? await Promise.all([getUserData(id), getCurrentLogin()])
                    : [await NT_getUserData(id), null];

                setUserData(userData);
                setIsSubscribed(userData.is_subscribed);

                if (currentUser) {
                    setCurrentUserId(currentUser._id);
                }
            } else {
                console.error('No user ID provided');
            }
        };

        fetchData();
    }, [id]);

    const handleSubscribe = async () => {
        if (userData) {
            await updateSubscribed(userData._id);
            setIsSubscribed(true);
        }
    };

    const handleUnsubscribe = async () => {
        if (userData) {
            await updateSubscribed(userData._id);
            setIsSubscribed(false);
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
                    {currentUserId !== userData?._id && userData?.role !== 'student' && (
                        <button
                            className={`px-4 py-2 ${isSubscribed ? 'bg-red-600' : 'bg-green-600'} text-white rounded-lg`}
                            onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
                        >
                            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                        </button>
                    )}
                </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                {userData ? <AboutTab userData={userData} /> : null}
            </div>
        </div>
    );
};

export default ViewProfile;
