import React, { useState } from 'react';

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
            className={`px-4 py-2 ${activeTab === 'attachments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            Attachments
          </button>
        </div>
        <div>
          {activeTab === 'basic' && (
            <div>
              <label className="block mb-2">Lecture Title*</label>
              <input 
                type="text" 
                name="lectureTitle"
                value={formData.lectureTitle || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mb-4" 
                placeholder="Title here" 
              />
              <label className="block mb-2">Description*</label>
              <textarea 
                name="lectureDescription"
                value={formData.lectureDescription || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md" 
                placeholder="Description here" 
              />
              <div className="flex items-center mt-4">
                <input 
                  type="checkbox" 
                  id="freePreview" 
                  name="freePreview"
                  checked={formData.freePreview || false}
                  onChange={handleInputChange}
                  className="mr-2" 
                />
                <label htmlFor="freePreview">Free Preview</label>
              </div>
            </div>
          )}
          {activeTab === 'video' && (
            <div>
              <p>Select your preferred video type. (.mp4, YouTube, Vimeo etc.)</p>
              <select className="w-full p-2 border rounded-md mb-4" name="videoType" value={formData.videoType || ''} onChange={handleInputChange}>
                <option value="HTML5(mp4)">HTML5(mp4)</option>
                <option value="External URL">External URL</option>
                <option value="YouTube">YouTube</option>
                <option value="Vimeo">Vimeo</option>
                <option value="embedded">embedded</option>
              </select>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md">Upload Video</button>
              <div className="mt-4">
                <p>File Format: .mp4</p>
                <p>Uploaded ID : {formData.uploadedVideoId}</p>
                <p>VIDEO POSTER</p>
                <p>Uploaded ID : {formData.videoPoster}</p>
                <p>Size: 590x300 pixels. Supports: jpg,jpeg, or png</p>
                <p>Video Runtime - hh:mm:ss*</p>
                <div className="flex">
                  <input type="text" className="w-1/4 p-2 border rounded-md mr-2" name="videoRuntimeHours" value={formData.videoRuntimeHours || ''} onChange={handleInputChange} placeholder="00" />
                  <input type="text" className="w-1/4 p-2 border rounded-md mr-2" name="videoRuntimeMinutes" value={formData.videoRuntimeMinutes || ''} onChange={handleInputChange} placeholder="00" />
                  <input type="text" className="w-1/4 p-2 border rounded-md" name="videoRuntimeSeconds" value={formData.videoRuntimeSeconds || ''} onChange={handleInputChange} placeholder="00" />
                </div>
              </div>
            </div>
          )}
          {activeTab === 'attachments' && (
            <div>
              <p>Supports: jpg, jpeg, png, pdf or .zip</p>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md">Upload Attachment</button>
              <div className="mt-4">
                <p>Uploaded ID: {formData.attachmentId1}</p>
                <p>Uploaded ID: {formData.attachmentId2}</p>
                <p>Uploaded ID: {formData.attachmentId3}</p>
              </div>
            </div>
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
