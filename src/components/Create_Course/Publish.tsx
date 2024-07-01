import React from 'react';

interface Props {
  prevStep: () => void;
  publishCourse: () => void;
}

const Publish: React.FC<Props> = ({ prevStep, publishCourse }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Publish</h3>
      <p className="mb-4">Review your course details and publish it.</p>
      <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
        Back
      </button>
      <button type="button" onClick={publishCourse} className="bg-green-500 text-white py-2 px-4 rounded">
        Publish
      </button>
    </div>
  );
};

export default Publish;
