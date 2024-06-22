import React, { useState, useEffect } from 'react';
import BasicTab from './BasicTab';
import QuestionTab from './QuestionTab';
import SettingTab from './SettingTab';

interface AddQuizPopupProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  prevStep: () => void;
  onClose: () => void;
}

const AddQuizPopup: React.FC<AddQuizPopupProps> = ({ formData, setFormData, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [questions, setQuestions] = useState<any[]>(formData.questions || []);

  const handleTabChange = (tab: string) => setActiveTab(tab);

  const handleAddQuestion = (newQuestion: any) => {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleAddQuiz = () => {
    const quizData = { ...formData, questions };
    console.log(quizData);
    // Optionally, clear the form and questions here
    setFormData({});
    setQuestions([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Add Quiz</h2>
        </div>
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-4">
            {['basic', 'questions', 'setting'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-[#9997F5] text-[#9997F5]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        <div>
          {activeTab === 'basic' && <BasicTab formData={formData} setFormData={setFormData} />}
          {activeTab === 'questions' && <QuestionTab formData={formData} setFormData={setFormData} handleAddQuestion={handleAddQuestion} />}
          {activeTab === 'setting' && <SettingTab formData={formData} setFormData={setFormData} />}
        </div>
        <div className="mt-6 flex justify-between space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">Close</button>
          <button onClick={handleAddQuiz} className="px-4 py-2 text-white rounded-md bg-[#9997F5] hover:bg-[#8886E5] transition">Add Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizPopup;
