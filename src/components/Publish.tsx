import React from 'react';
import MainLayout from '../layouts/MainLayout';
interface PublishProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  prevStep: () => void;
}

const Publish: React.FC<PublishProps> = ({ formData, setFormData, prevStep }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <MainLayout>
    <div>
      <h2 className="text-2xl font-bold mb-4">Publish</h2>
      <form onSubmit={handleSubmit}>
        {/* Add your publish fields here */}
        <button type="button" onClick={prevStep} className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600">
          Previous
        </button>
        <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
          Publish
        </button>
      </form>
    </div>
    </MainLayout>
  );
};

export default Publish;
