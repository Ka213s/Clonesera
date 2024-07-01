import React from 'react';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
}

const BasicInformation: React.FC<Props> = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Basic Information</h3>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select a category</option>
            <option value="66824eb4ea293ed5060ba207">66824eb4ea293ed5060ba207 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>
        <button type="button" onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded">
          Next
        </button>
      </form>
    </div>
  );
};

export default BasicInformation;
