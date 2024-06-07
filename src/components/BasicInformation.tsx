import React from 'react';
import MainLayout from '../layouts/MainLayout';
interface BasicInformationProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <MainLayout>
    <div>
      <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
      <form>
        <div>
          <label className="block text-gray-700">Course Title</label>
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            maxLength={100}
            placeholder="Course title here"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <p className="text-sm text-gray-500">60 / 100 characters</p>
          <p className="text-sm text-gray-500">(Please make this a maximum of 100 characters and unique.)</p>
        </div>
        <div>
          <label className="block text-gray-700">Short Description*</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Item description here..."
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <p className="text-sm text-gray-500">220 words</p>
        </div>
        <div>
          <label className="block text-gray-700">Course Description*</label>
          <textarea
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">What will students learn in your course?*</label>
          <textarea
            name="learningObjectives"
            value={formData.learningObjectives}
            onChange={handleChange}
            placeholder="Student will gain this skills, knowledge after completing this course. (One per line)."
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Requirements*</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="What knowledge, technology, tools required by users to start this course. (One per line)."
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Close Caption*</label>
          <input
            type="text"
            name="closeCaption"
            value={formData.closeCaption}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Course Category*</label>
          <input
            type="text"
            name="courseCategory"
            value={formData.courseCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button type="button" onClick={nextStep} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Next
        </button>
      </form>
    </div>
    </MainLayout>
  );
};

export default BasicInformation;
