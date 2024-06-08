import React, { useState } from 'react';

interface AddQuizPopupProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  prevStep: () => void;
  onClose: () => void;
}

const AddQuizPopup: React.FC<AddQuizPopupProps> = ({ formData, setFormData, nextStep, prevStep, onClose }) => {
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
          <h2 className="text-xl font-bold">Add Quiz</h2>
          <button onClick={onClose} className="text-red-500">Close</button>
        </div>
        <div className="mb-4">
          <button 
            onClick={() => handleTabChange('basic')} 
            className={`px-4 py-2 mr-2 ${activeTab === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            Basic
          </button>
          <button 
            onClick={() => handleTabChange('questions')} 
            className={`px-4 py-2 mr-2 ${activeTab === 'questions' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            Questions
          </button>
          <button 
            onClick={() => handleTabChange('setting')} 
            className={`px-4 py-2 ${activeTab === 'setting' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            Setting
          </button>
        </div>
        <div>
          {activeTab === 'basic' && (
            <div>
              <label className="block mb-2">Quiz Title*</label>
              <input 
                type="text" 
                name="quizTitle"
                value={formData.quizTitle || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mb-4" 
                placeholder="Title here" 
              />
              <label className="block mb-2">Description*</label>
              <textarea 
                name="quizDescription"
                value={formData.quizDescription || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md" 
                placeholder="Description here" 
              />
            </div>
          )}
          {activeTab === 'questions' && (
            <div>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md mb-4">Add Question</button>
              <div>
                <p>Question Title</p>
                <p>Question Title</p>
                <p>Question Title</p>
                <p>Question Title</p>
              </div>
            </div>
          )}
          {activeTab === 'setting' && (
            <div>
              <div className="mb-4">
                <label className="block mb-2">Gradable</label>
                <input 
                  type="checkbox" 
                  name="quizGradable"
                  checked={formData.quizGradable || false}
                  onChange={handleInputChange}
                  className="mr-2" 
                />
                <span>Quiz Gradable</span>
                <p className="text-gray-600">If this quiz test affects the students' grading system for this course.</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Remaining time display</label>
                <input 
                  type="checkbox" 
                  name="showTime"
                  checked={formData.showTime || false}
                  onChange={handleInputChange}
                  className="mr-2" 
                />
                <span>Show Time</span>
                <p className="text-gray-600">By enabling this option, quiz taker will show remaining time during attempt.</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Time Limit*</label>
                <input 
                  type="number" 
                  name="timeLimit"
                  value={formData.timeLimit || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md" 
                  placeholder="Minutes" 
                />
                <p className="text-gray-600">Set zero to disable time limit.</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Passing Score(%)*</label>
                <input 
                  type="number" 
                  name="passingScore"
                  value={formData.passingScore || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md" 
                  placeholder="%" 
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Questions Limit*</label>
                <input 
                  type="number" 
                  name="questionsLimit"
                  value={formData.questionsLimit || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md" 
                  placeholder="Number of questions" 
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Close</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizPopup;
