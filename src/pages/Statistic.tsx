import React from 'react';
import defaultAvatar from '../assets/Avatar01.jpg';

interface User {
  name: string;
  avatar: string;
}

interface StatisticProps {
  user: User | null;
}

const Statistic: React.FC<StatisticProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mx-2 sm:mx-auto max-w-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Statistic</h2>
      {user ? (
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img src={user.avatar} alt="Avatar" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg sm:text-xl font-bold">
              Good Morning, {user.name} <span className="text-red-500">🔥</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">Continue your learning to achieve your target!</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img src={defaultAvatar} alt="Default Avatar" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg sm:text-xl font-bold">
              Good Morning, User <span className="text-red-500">🔥</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">Continue your learning to achieve your target!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistic;
