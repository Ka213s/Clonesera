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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Add Lecture</h2>
        </div>
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-4">
            <button
              onClick={() => handleTabChange('basic')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'basic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Basic
            </button>
            <button
              onClick={() => handleTabChange('video')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'video' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Video
            </button>
            <button
              onClick={() => handleTabChange('attachments')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'attachments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Attachments
            </button>
          </nav>
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
        <div className="mt-6 flex justify-between space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">Close</button>
          <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Add Lecture</button>
        </div>
      </div>
    </div>
  );
};

export default LecturePopup;
