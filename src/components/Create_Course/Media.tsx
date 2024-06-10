import React from 'react';
import MainLayout from '../../layouts/MainLayout';
interface MediaProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  prevStep: () => void;
}

const Media: React.FC<MediaProps> = ({ formData, setFormData, nextStep, prevStep }) => {

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
      <h2 className="text-2xl font-bold mb-4">Media</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="providerType" className="block mb-2">Course overview provider type*</label>
          <select
            id="providerType"
            name="providerType"
            value={formData.providerType || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="HTML5(mp4)">HTML5(mp4)</option>
            <option value="External URL">External URL</option>
            <option value="YouTube">YouTube</option>
            <option value="Vimeo">Vimeo</option>
            <option value="embedded">embedded</option>
          </select>
        </div>
        {(formData.providerType === 'embedded') && (
          <div className="mb-4">
            <label htmlFor="embeddedCode" className="block mb-2">Embedded Code*</label>
            <textarea
              id="embeddedCode"
              name="embeddedCode"
              value={formData.embeddedCode || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              placeholder="Place your embedded code here"
            ></textarea>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="courseThumbnail" className="block mb-2">Course thumbnail*</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            id="courseThumbnail"
            name="courseThumbnail"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
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

export default Media;
