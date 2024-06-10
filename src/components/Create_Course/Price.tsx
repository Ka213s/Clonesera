import React from 'react';
import MainLayout from '../../layouts/MainLayout';
interface PriceProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  prevStep: () => void;
}

const Price: React.FC<PriceProps> = ({ formData, setFormData, nextStep, prevStep }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <MainLayout>
    <div>
      <h2 className="text-2xl font-bold mb-4">Price</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <select
            name="priceType"
            value={formData.priceType || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        {(formData.priceType === 'Paid') && (
          <div>
            <div className="mb-4">
              <label className="block mb-2">Regular Price*</label>
              <input
                type="number"
                name="regularPrice"
                value={formData.regularPrice || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="$0"
              />
              <select
                name="currency"
                value={formData.currency || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-2"
              >
                <option value="USD">USD</option>
                {/* Add other currency options here */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Discount Price*</label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="$0"
              />
              <select
                name="discountCurrency"
                value={formData.discountCurrency || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-2"
              >
                <option value="USD">USD</option>
                {/* Add other currency options here */}
              </select>
            </div>
          </div>
        )}
        {(formData.priceType === 'Free') && (
          <div>
            <div className="mb-4">
              <label className="block mb-2">Require Log In</label>
              <select
                name="requireLogin"
                value={formData.requireLogin || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Require Enroll</label>
              <select
                name="requireEnroll"
                value={formData.requireEnroll || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        )}
        <button type="button" onClick={prevStep} className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600">
          Previous
        </button>
        <button type="button" onClick={nextStep} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Next
        </button>
      </form>
    </div>
    </MainLayout>
  );
};

export default Price;
