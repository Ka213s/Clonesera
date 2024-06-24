import React from 'react';
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

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Price</h2>
      <form>
        <div className="mb-6">
          <div className="flex">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-l-md border ${formData.priceType === 'Free' ? 'bg-[#9997F5] text-white' : 'bg-white border-gray-300'}`}
              onClick={() => setFormData({ ...formData, priceType: 'Free' })}
            >
              Free
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-r-md border ${formData.priceType === 'Paid' ? 'bg-[#9997F5] text-white' : 'bg-white border-gray-300'}`}
              onClick={() => setFormData({ ...formData, priceType: 'Paid' })}
            >
              Paid
            </button>
          </div>
        </div>

        {formData.priceType === 'Free' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="requireLogin" className="block text-gray-700">Require Log In</label>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="requireLogin"
                  name="requireLogin"
                  checked={formData.requireLogin || false}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="requireEnroll" className="block text-gray-700">Require Enroll</label>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="requireEnroll"
                  name="requireEnroll"
                  checked={formData.requireEnroll || false}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-gray-500 mt-4">If the course is free, if student require to enroll your course, if not required enroll, if students required sign in to your website to take this course.</p>
          </div>
        )}

        {formData.priceType === 'Paid' && (
          <div className="mb-6">
            <div className="mb-4">
              <label htmlFor="regularPrice" className="block text-gray-700 mb-2">Regular Price*</label>
              <div className="flex">
                <input
                  type="number"
                  id="regularPrice"
                  name="regularPrice"
                  value={formData.regularPrice || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-l-md"
                  placeholder="$0"
                />
                <span className="inline-flex items-center px-3 border-t border-b border-r rounded-r-md bg-gray-50 border-gray-300 text-gray-500">USD</span>
              </div>
            </div>
            <div>
              <label htmlFor="discountPrice" className="block text-gray-700 mb-2">Discount Price*</label>
              <div className="flex">
                <input
                  type="number"
                  id="discountPrice"
                  name="discountPrice"
                  value={formData.discountPrice || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-l-md"
                  placeholder="$0"
                />
                <span className="inline-flex items-center px-3 border-t border-b border-r rounded-r-md bg-gray-50 border-gray-300 text-gray-500">USD</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button type="button" onClick={prevStep} className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600">
            Previous
          </button>
          <button type="button" onClick={nextStep} className="px-4 py-2 text-white bg-[#9997F5] rounded-md hover:bg-[#8886E5]">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Price;
