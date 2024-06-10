import React, { useState, useEffect, useRef } from 'react';
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
  let activeTab2 = 'basic';
  const activeTab3 = useRef(false);
  useEffect(() => {
  setActiveTab('basic2');
  activeTab2 = 'basic3';
  activeTab3.current = true;
  },[])
  console.log('activetab2 : ',activeTab2);
  console.log('activetab : ' , activeTab);
  console.log('activetab3 : ' , activeTab3.current);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-md p-6 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Quiz</h2>
          <button onClick={onClose} className="text-red-500">Close</button>
        </div>
        <div className="mb-4">
          {['basic', 'questions', 'setting'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 mr-2 ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div>
          {activeTab === 'basic' && <BasicTab formData={formData} setFormData={setFormData} />}
          {activeTab === 'questions' && <QuestionTab formData={formData} setFormData={setFormData} handleAddQuestion={handleAddQuestion} />}
          {activeTab === 'setting' && <SettingTab formData={formData} setFormData={setFormData} />}
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Close</button>
          <button onClick={handleAddQuiz} className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizPopup;
