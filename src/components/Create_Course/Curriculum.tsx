import React, { useState } from 'react';
import { Button, Typography } from 'antd';
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

const { Title } = Typography;

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
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <Title level={2} className="text-gray-800 mb-6">Curriculum</Title>
      <Button 
        type="primary" 
        onClick={addSection} 
        className="mb-4 bg-[#9997F5] hover:bg-[#8886E5] border-none"
      >
        New Section
      </Button>
      
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
      
      <div className="flex justify-between mt-4">
        <Button type="default" onClick={prevStep} className="bg-gray-500 text-white border-none hover:bg-gray-500">
          Previous
        </Button>
        <Button type="primary" onClick={nextStep} className="bg-[#9997F5] hover:bg-[#8886E5] border-none">
          Next
        </Button>
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
