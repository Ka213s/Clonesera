import React, { useState } from 'react';
import BasicInformation from '../BasicInformation';
import Curriculum from './Curriculum';
import Media from './Media';
import Price from './Price';
import Publish from './Publish';

const CreateCourse: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    skillCourse: '',
    price: '',
    requirements: '',
    created_at: '',
  });

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInformation formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <Curriculum formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Media formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Price formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Publish formData={formData} prevStep={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Create New Course</h2>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex w-full items-center relative ml-20"> {/* Added left margin here */}
            {['BASIC', 'CURRICULUM', 'MEDIA', 'PRICE', 'PUBLISH'].map((label, index) => (
              <div key={index} className="flex items-center w-full">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${index < step ? 'bg-[#9997F5]' : 'bg-gray-300'}`}>
                    <span className="text-white font-semibold">{index + 1}</span>
                  </div>
                  <span className={`mt-2 text-sm font-medium ${index === step - 1 ? 'text-[#9997F5]' : ''}`}>{label}</span>
                </div>
                {index < 4 && (
                  <div className="flex-grow h-10 flex items-center relative mb-5 mx-4">
                    <div className={`h-1 w-full ${index < step - 1 ? 'bg-[#9997F5]' : 'bg-gray-300'}`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {renderStep()}
    </div>
  );
};

export default CreateCourse;
