import React from 'react';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Price: React.FC<Props> = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Price</h3>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Discount</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
          Back
        </button>
        <button type="button" onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded">
          Next
        </button>
      </form>
    </div>
  );
};

export default Price;
