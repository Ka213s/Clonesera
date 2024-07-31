import React, { useState, useEffect } from 'react';
import { getCurrentLogin } from '../../utils/commonImports';
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
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCurrentLogin();
            setUserData(data);
        };

        fetchData();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen overflow-y-auto">
            <div className="flex space-x-8">
                {/* Left Section */}
                <div className="w-1/4 bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <img
                            src={userData?.avatar || '/default/avatar.jpg'}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full mb-4 shadow-lg"
                        />
                        <h1 className="text-2xl font-bold">{userData?.name || 'Your Name'}</h1>
                        <p className="text-gray-600">@{userData?.email || 'username'}</p>
                        <p className="text-gray-600 mt-2">{userData?.phone_number || 'Location'}</p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-3/4">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {userData ? <AboutTab userData={userData} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;
