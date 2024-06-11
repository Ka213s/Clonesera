import React, { useState } from 'react';
import BasicLecture from './BasicLecture';
import VideoLecture from './VideoLecture';
import AttachmentsLecture from './AttachmentsLecture';

interface LecturePopupProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  prevStep: () => void;
  onClose: () => void;
}

const LecturePopup: React.FC<LecturePopupProps> = ({ formData, setFormData, nextStep, prevStep, onClose }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-md p-6 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Lecture</h2>
          <button onClick={onClose} className="text-red-500">Close</button>
        </div>
        <div className="mb-4">
          <button
            onClick={() => handleTabChange('basic')}
            className={`px-4 py-2 mr-2 ${activeTab === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            Basic
          </button>
          <button
            onClick={() => handleTabChange('video')}
            className={`px-4 py-2 mr-2 ${activeTab === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            Video
          </button>
          <button
            onClick={() => handleTabChange('attachments')}
            className={`px-4 py-2 ${activeTab === 'attachments' ? 'bg-blue-500 text white' : 'bg-gray-200 text-gray-800'}`}>
            Attachments
          </button>
        </div>
        <div>
          {activeTab === 'basic' && (
            <BasicLecture formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />
          )}
          {activeTab === 'video' && (
            <VideoLecture formData={formData} handleInputChange={handleInputChange} />
          )}
          {activeTab === 'attachments' && (
            <AttachmentsLecture formData={formData} />
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Close</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Lecture</button>
        </div>
      </div>
    </div>
  );
};

export default LecturePopup;
