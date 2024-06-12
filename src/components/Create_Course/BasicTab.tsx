import React from 'react';

interface BasicTabProps {
  formData: {
    quizTitle: string;
    quizDescription: string;
    // Define other properties if necessary
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    quizTitle: string;
    quizDescription: string;
    // Define other properties if necessary
  }>>;
}

const BasicTab: React.FC<BasicTabProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
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
  );
};

export default BasicTab;
