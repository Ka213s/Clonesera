import React, { useState, useEffect } from 'react';

interface Option {
  id: number;
  optionTitle: string;
  isCorrect: boolean;
}

interface QuestionTabProps {
  formData: {
    questionType: string;
    questionTitle: string;
    questionScore: number;
    options?: Option[];
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    questionType: string;
    questionTitle: string;
    questionScore: number;
    options?: Option[];
  }>>;
  handleAddQuestion: (newQuestion: any) => void;
}

const QuestionTab: React.FC<QuestionTabProps> = ({ formData, setFormData, handleAddQuestion }) => {
  const [options, setOptions] = useState<Option[]>(formData.options || []);

  useEffect(() => {
    setOptions(formData.options || []);
  }, [formData.options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionChange = (id: number, field: string, value: string | boolean) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, [field]: value } : option
    );
    setOptions(updatedOptions);
    setFormData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  };

  const addOption = () => {
    const newOption: Option = { id: options.length + 1, optionTitle: '', isCorrect: false };
    const updatedOptions = [...options, newOption];
    setOptions(updatedOptions);
    setFormData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  };

  const saveQuestion = () => {
    const newQuestion = { ...formData, options };
    handleAddQuestion(newQuestion);
    setFormData({
      questionType: '',
      questionTitle: '',
      questionScore: 0,
      options: [],
    });
    setOptions([]);
  };

  return (
    <div>
      <button onClick={saveQuestion} className="px-4 py-2 bg-green-500 text-white rounded-md mb-4">
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

        {['single_choice', 'multiple_choice'].includes(formData.questionType) && (
          <>
            <label className="block mb-2">Options</label>
            {options.map((option) => (
              <div key={option.id} className="mb-4">
                <label className="block mb-2">Option {option.id}</label>
                <input
                  type="text"
                  value={option.optionTitle}
                  onChange={(e) => handleOptionChange(option.id, 'optionTitle', e.target.value)}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="Option title"
                />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(option.id, 'isCorrect', e.target.checked)}
                    className="mr-2"
                  />
                  Correct answer
                </label>
              </div>
            ))}
            <button onClick={addOption} className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4">
              Add Option
            </button>
          </>
        )}
        <button onClick={saveQuestion} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Save Question
        </button>
      </div>
    </div>
  );
};

export default QuestionTab;
