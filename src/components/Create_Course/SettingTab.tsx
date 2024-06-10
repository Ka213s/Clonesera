import React from 'react';

interface SettingTabProps {
  formData: {
    quizGradable: boolean;
    showTime: boolean;
    timeLimit: number;
    passingScore: number;
    questionsLimit: number;
    // Define other properties if necessary
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    quizGradable: boolean;
    showTime: boolean;
    timeLimit: number;
    passingScore: number;
    questionsLimit: number;
    // Define other properties if necessary
  }>>;
}

const SettingTab: React.FC<SettingTabProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
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
  );
};

export default SettingTab;
