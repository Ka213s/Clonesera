import React, { useState } from 'react';
import BasicInformation from './BasicInformation';
import Curriculum from './Curriculum';
import Media from './Media';
import Price from './Price';
import Publish from './Publish';

const CreateCourse: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    courseTitle: '',
    shortDescription: '',
    courseDescription: '',
    learningObjectives: '',
    requirements: '',
    closeCaption: '',
    courseCategory: '',
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
        return <Publish formData={formData} setFormData={setFormData} prevStep={prevStep} />;
      default:
        return null;
    }
  };

  // Tính toán tiến trình (progress) dựa trên step
  const progress = ((step - 1) / 4) * 100;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        {/* Thanh tiến trình */}
        <div className="bg-gray-200 h-2 w-full rounded-md">
          <div className="bg-blue-500 h-2 rounded-md" style={{ width: `${progress}%` }}></div>
        </div>
        {/* Hiển thị số bước đã hoàn thành */}
        <div className="flex justify-between mt-2">
          <span>Step {step} of 5</span>
          {/* Bạn có thể thêm các biểu tượng hoặc thông tin khác ở đây */}
        </div>
      </div>
      {renderStep()}
    </div>
  );
};

export default CreateCourse;
