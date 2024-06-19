import React from 'react';
import Toggle from './Toggle';

const PrivacySettings: React.FC<any> = ({
  profileVisibility,
  setProfileVisibility,
  showCourses,
  setShowCourses,
  handleSaveChanges
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Privacy</h2>
      <p>Modify your privacy settings here.</p>
      <h6 className="text-xl font-bold mb-2 mt-4">Profile page settings</h6>
      <div className="mt-6">
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 text-sm font-bold mr-4" htmlFor="profileVisibility">
            Show your profile on search engines
          </label>
          <Toggle
            checked={profileVisibility}
            onChange={() => setProfileVisibility(!profileVisibility)}
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 text-sm font-bold mr-4" htmlFor="showCourses">
            Show courses you're taking on your profile page
          </label>
          <Toggle
            checked={showCourses}
            onChange={() => setShowCourses(!showCourses)}
          />
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

export default PrivacySettings;
