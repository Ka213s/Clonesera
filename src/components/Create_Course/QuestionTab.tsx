import React from 'react';

interface QuestionTabProps {
  formData: {
    questionType: string;
    questionTitle: string;
    questionScore: number;
    // Define other properties if necessary
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    questionType: string;
    questionTitle: string;
    questionScore: number;
    // Define other properties if necessary
  }>>;
  handleAddQuestion: () => void;
}

const QuestionTab: React.FC<QuestionTabProps> = ({ formData, setFormData, handleAddQuestion }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <button 
        onClick={handleAddQuestion} 
        className="px-4 py-2 bg-green-500 text-white rounded-md mb-4"
      >
        Add Question
      </button>
      <div>
        <p>Question Type</p>
        <select
          name="questionType"
          onChange={handleInputChange}
          value={formData.questionType || ''}
          className="w-full p-2 border rounded-md mb-4"
        >
          <option value="">Select Question Type</option>
          <option value="single_choice">Single Choice</option>
          <option value="multiple_choice">Multiple Choice</option>
          <option value="single_line_text">Single Line Text</option>
          <option value="multi_line_text">Multi Line Text</option>
        </select>
        <label className="block mb-2">Question Title*</label>
        <input 
          type="text" 
          name="questionTitle"
          value={formData.questionTitle || ''}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md mb-4" 
          placeholder="Write question title" 
        />
        <label className="block mb-2">Score*</label>
        <input 
          type="number" 
          name="questionScore"
          value={formData.questionScore || ''}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md mb-4" 
          placeholder="Score" 
        />
        <button 
          onClick={handleAddQuestion} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Save Question
        </button>
      </div>
    </div>
  );
};

export default QuestionTab;
