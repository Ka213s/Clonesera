import React, { useState } from 'react';
import LecturePopup from './LecturePopup';
import AddQuizPopup from './AddQuizPopup';

interface SectionProps {
  sectionId: number;
  sectionName: string;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  prevStep: () => void;
}

const Section: React.FC<SectionProps> = ({ sectionId, sectionName, formData, setFormData, nextStep, prevStep }) => {
  const [showLecturePopup, setShowLecturePopup] = useState(false);
  const [showQuizPopup, setShowQuizPopup] = useState(false);

  const toggleLecturePopup = () => setShowLecturePopup(!showLecturePopup);
  const toggleQuizPopup = () => setShowQuizPopup(!showQuizPopup);

  return (
    <div className="mt-4 p-4 border rounded-md">
      <h3 className="text-xl font-semibold">{sectionName}</h3>
      <div className="mt-2">
        <button 
          type="button" 
          onClick={toggleLecturePopup} 
          className="px-4 py-2 text-white bg-[#9997F5] rounded-md  hover:bg-[#8886E5] mr-2">
          Lecture
        </button>
        <button 
          type="button" 
          onClick={toggleQuizPopup} 
          className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 mr-2">
          Quiz
        </button>
      </div>

      {showLecturePopup && <LecturePopup formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} onClose={toggleLecturePopup} />}
      {showQuizPopup && <AddQuizPopup formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} onClose={toggleQuizPopup} />}
    </div>
  );
};

export default Section;