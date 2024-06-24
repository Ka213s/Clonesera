import React from 'react';

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files && files[0],
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Media</h2>
      <form>
        <div className="mb-6">
          <label htmlFor="providerType" className="block mb-2">Intro Course overview provider type*</label>
          <div className="flex space-x-2">
            <button type="button" className={`py-2 px-4 rounded-md border ${formData.providerType === 'HTML5(mp4)' ? 'bg-[#9997F5] text-white' : 'bg-white border-gray-300'}`} onClick={() => setFormData({ ...formData, providerType: 'HTML5(mp4)' })}>HTML5(mp4)</button>
            <button type="button" className={`py-2 px-4 rounded-md border ${formData.providerType === 'External URL' ? 'bg-[#9997F5] text-white' : 'bg-white border-gray-300'}`} onClick={() => setFormData({ ...formData, providerType: 'External URL' })}>External URL</button>
            <button type="button" className={`py-2 px-4 rounded-md border ${formData.providerType === 'YouTube' ? 'bg-[#9997F5]text-white' : 'bg-white border-gray-300'}`} onClick={() => setFormData({ ...formData, providerType: 'YouTube' })}>YouTube</button>
            <button type="button" className={`py-2 px-4 rounded-md border ${formData.providerType === 'Vimeo' ? 'bg-[#9997F5]text-white' : 'bg-white border-gray-300'}`} onClick={() => setFormData({ ...formData, providerType: 'Vimeo' })}>Vimeo</button>
            <button type="button" className={`py-2 px-4 rounded-md border ${formData.providerType === 'embedded' ? 'bg-[#9997F5] text-white' : 'bg-white border-gray-300'}`} onClick={() => setFormData({ ...formData, providerType: 'embedded' })}>embedded</button>
          </div>
        </div>
        {formData.providerType === 'embedded' && (
          <div className="mb-6">
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
        {formData.providerType === 'HTML5(mp4)' && (
          <div className="mb-6">
            <label htmlFor="uploadVideo" className="block mb-2">Upload Video (File Format: .mp4)</label>
            <input
              type="file"
              accept=".mp4"
              id="uploadVideo"
              name="uploadVideo"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}
        <div className="mb-6">
          <label htmlFor="courseThumbnail" className="block mb-2">Course thumbnail* (Size: 590x300 pixels, Supports: .jpg, .jpeg, or .png)</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            id="courseThumbnail"
            name="courseThumbnail"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={prevStep} className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600">
            Previous
          </button>
          <button type="button" onClick={nextStep} className="px-4 py-2 text-white bg-[#9997F5] hover:bg-[#8886E5] rounded-md">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Media;
