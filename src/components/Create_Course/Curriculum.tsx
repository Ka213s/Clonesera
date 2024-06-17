import React, { useState } from 'react';
import Section from './Section';

import SectionNamePopup from './SectionNamePopup';

interface SectionData {
  id: number;
  name: string;
}

interface CurriculumProps {
  formData: {
    title: string;
    shortDescription: string;
    description: string;
    skillCourse: string;
    price: string;
    requirements: string;
    created_at: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  prevStep: () => void;
}

const Curriculum: React.FC<CurriculumProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [sectionCounter, setSectionCounter] = useState(0);
  const [showSectionNamePopup, setShowSectionNamePopup] = useState(false);

  const addSection = () => {
    setShowSectionNamePopup(true);
  };

  const saveSectionName = (sectionName: string) => {
    setSections([...sections, { id: sectionCounter, name: sectionName }]);
    setSectionCounter(sectionCounter + 1);
    setShowSectionNamePopup(false);
  };

  return (
    <div>
      <div className="text-2x1 mb-4">
        <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
        <button 
          type="button" 
          onClick={addSection} 
          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
          New Section
        </button>
        
        {sections.map((sectionData) => (
          <Section
            key={sectionData.id}
            sectionId={sectionData.id}
            sectionName={sectionData.name}
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        ))}
        <div className="mt-4">
          <button type="button" onClick={prevStep} className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 mr-2">
            Previous
          </button>
          <button type="button" onClick={nextStep} className="px-4 py-2 text-white bg-[#9997F5] hover:bg-[#8886E5] rounded-md">
            Next
          </button>
        </div>
      </div>
      
      {showSectionNamePopup && (
        <SectionNamePopup
          onClose={() => setShowSectionNamePopup(false)}
          onSave={saveSectionName}
        />
      )}
  </div>
  );
};

export default Curriculum;