import React, { useState } from 'react';
import Section from './Section';
import MainLayout from '../layouts/MainLayout';

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
  const [sections, setSections] = useState<number[]>([]);
  const [sectionCounter, setSectionCounter] = useState(0);

  const addSection = () => {
    setSections([...sections, sectionCounter]);
    setSectionCounter(sectionCounter + 1);
  };

  return (
    <MainLayout>
      <div>
        <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
        <button 
          type="button" 
          onClick={addSection} 
          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
          New Section
        </button>
        
        {sections.map((sectionId) => (
          <Section
            key={sectionId}
            sectionId={sectionId}
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
          <button type="button" onClick={nextStep} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Next
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Curriculum;
