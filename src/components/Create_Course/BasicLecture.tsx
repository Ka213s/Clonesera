import React from 'react';

interface BasicLectureProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BasicLecture: React.FC<BasicLectureProps> = ({ formData, setFormData, handleInputChange }) => {
  return (
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
  );
};

export default BasicLecture;
