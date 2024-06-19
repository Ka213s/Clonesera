import React from 'react';
import Toggle from './Toggle';

const NotificationSettings: React.FC<any> = ({
  notifications,
  handleToggleChange,
  handleSaveChanges
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Notifications - Choose when and how to be notified</h2>
      <p>Select push and email notifications you'd like to receive</p>
      <h3 className="text-lg font-bold mt-4">Choose when and how to be notified</h3>
      <div className="mt-6">
        <div className="mb-4 flex items-center">
          <Toggle
            checked={notifications.subscriptions}
            onChange={() => handleToggleChange('subscriptions')}
          />
          <div className="ml-4">
            <label className="text-gray-700 text-sm font-bold">Subscriptions</label>
            <p className="text-gray-500 text-sm">Notify me about activity from the profiles I'm subscribed to</p>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <Toggle
            checked={notifications.recommendedCourses}
            onChange={() => handleToggleChange('recommendedCourses')}
          />
          <div className="ml-4">
            <label className="text-gray-700 text-sm font-bold">Recommended Courses</label>
            <p className="text-gray-500 text-sm">Notify me of courses I might like based on what I watch</p>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <Toggle
            checked={notifications.activityOnComments}
            onChange={() => handleToggleChange('activityOnComments')}
          />
          <div className="ml-4">
            <label className="text-gray-700 text-sm font-bold">Activity on my comments</label>
            <p className="text-gray-500 text-sm">Notify me about activity on my comments on others’ courses</p>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <Toggle
            checked={notifications.repliesToComments}
            onChange={() => handleToggleChange('repliesToComments')}
          />
          <div className="ml-4">
            <label className="text-gray-700 text-sm font-bold">Replies to my comments</label>
            <p className="text-gray-500 text-sm">Notify me about replies to my comments</p>
          </div>
        </div>
      </div>
      <hr />
      <h3 className="text-lg font-bold mt-4">Email notifications</h3>
      <div className="mt-6">
        <div className="mb-4 flex items-center">
          <Toggle
            checked={notifications.subscriptions}
            onChange={() => handleToggleChange('subscriptions')}
          />
          <div className="ml-4">
            <label className="text-gray-700 text-sm font-bold">Subscriptions</label>
            <p className="text-gray-500 text-sm">Notify me about activity from the profiles I'm subscribed to</p>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <Toggle
            checked={notifications.recommendedCourses}
            onChange={() => handleToggleChange('recommendedCourses')}
          />
          <div className="ml-4">
            <label className="text-gray-700 text-sm font-bold">Recommended Courses</label>
            <p className="text-gray-500 text-sm">Notify me of courses I might like based on what I watch</p>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <Toggle
            checked={notifications.activityOnComments}
            onChange={() => handleToggleChange('activityOnComments')}
          />
          <div className="ml-4">
            <label className="text-gray-700 text-sm font-bold">Activity on my comments</label>
            <p className="text-gray-500 text-sm">Notify me about activity on my comments on others’ courses</p>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <Toggle
            checked={notifications.repliesToComments}
            onChange={() => handleToggleChange('repliesToComments')}
          />
          <div className="ml-4">
            <label className="text-gray-700 text-sm font-bold">Replies to my comments</label>
            <p className="text-gray-500 text-sm">Notify me about replies to my comments</p>
          </div>
        </div>
        <button
          onClick={handleSaveChanges}
          className="bg-[#9997F5] hover:bg-[#8886E5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
