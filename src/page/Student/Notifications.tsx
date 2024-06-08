import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import notificationsData from '../../models/FileJson/studentNotifications.json';

const Notifications: React.FC = () => {
  const { studentNotifications } = notificationsData;

  return (
    <MainLayout>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Notifications</h2>
        <div className="mb-8 flex justify-between items-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Notification Settings
          </button>
        </div>
        <div className="space-y-6">
          {studentNotifications.map(notification => (
            <div
              key={notification.id}
              className="flex items-start space-x-6 p-6 bg-gray-100 rounded-lg shadow-sm"
            >
              <img
                src={notification.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-800">
                  <span className="font-semibold">{notification.user}</span> {notification.action}
                  {notification.target && (
                    <span className="font-semibold"> {notification.target}</span>
                  )}
                </p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;
