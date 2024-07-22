import React, { useEffect, useState } from 'react';
import defaultAvatar from '../assets/Avatar01.jpg';
import { getCurrentLogin } from '../utils/commonImports';
import { Skeleton } from 'antd';

interface User {
  name: string;
  avatar: string;
}

const Statistic: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
   
    if (token) {
      const fetchUser = async () => {
        try {
          const userData = await getCurrentLogin();
          console.log('User data:', userData);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Statistic</h2>
      {loading ? (
        <Skeleton active avatar paragraph={{ rows: 2 }} />
      ) : user ? (
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold">
              Good Morning, {user.name} <span className="text-red-500">🔥</span>
            </h3>
            <p className="text-sm text-gray-600">Continue your learning to achieve your target!</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img src={defaultAvatar} alt="Default Avatar" className="w-24 h-24 rounded-full" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold">
              Good Morning, User <span className="text-red-500">🔥</span>
            </h3>
            <p className="text-sm text-gray-600">Continue your learning to achieve your target!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistic;