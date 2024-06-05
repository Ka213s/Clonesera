import React from 'react';

interface PriceProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  prevStep: () => void;
}

const Price: React.FC<PriceProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Price</h2>
      <form>
        {/* Add your price fields here */}
        <button type="button" onClick={prevStep} className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600">
          Previous
        </button>
        <button type="button" onClick={nextStep} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Next
        </button>
      </form>
    </div>
  );
};

export default Price;
