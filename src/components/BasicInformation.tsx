import React, { useState, useEffect } from 'react';
import categoriesData from '../models/FileJson/categoriesCreateCouse.json';

interface BasicInformationProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
}

interface Category {
  name: string;
  subcategories: string[];
}

const BasicInformation: React.FC<BasicInformationProps> = ({ formData, setFormData, nextStep }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    setCategories(categoriesData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubcategory = e.target.value;
    let categoryName = '';
    categoriesData.forEach(category => {
      if (category.subcategories.includes(selectedSubcategory)) {
        categoryName = category.name;
      }
    });
    setSelectedCategory(selectedSubcategory);
    setFormData({ ...formData, courseCategory: selectedSubcategory, categoryName: categoryName });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription || !formData.description || !formData.courseCategory) {
      alert('Please fill in all required fields.');
      return;
    }
    nextStep();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Basic Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={100}
            placeholder="Course title here"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8886E5]"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Please make this a maximum of 100 characters and unique.</p>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Short Description</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Item description here..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8886E5]"
          />
          <p className="text-sm text-gray-500 mt-1">220 words</p>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Course Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8886E5]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">What will students learn in your course?</label>
            <textarea
              name="skillCourse"
              value={formData.skillCourse}
              onChange={handleChange}
              placeholder="Student will gain these skills, knowledge after completing this course. (One per line)."
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8886E5]"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="What knowledge, technology, tools required by users to start this course. (One per line)."
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8886E5]"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Course Level</label>
            <select
              name="courseLevel"
              value={formData.courseLevel}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8886E5]"
            >
              <option value="">Nothing selected</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Audio Language</label>
            <select
              name="audioLanguage"
              value={formData.audioLanguage}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8886E5]"
            >
              <option value="">Select Audio</option>
              <option value="english">English</option>
              <option value="vietnamese">Vietnamese</option>
              {/* Add more languages as needed */}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Close Caption</label>
            <select
              name="closeCaption"
              value={formData.closeCaption}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8886E5]"
            >
              <option value="">Select Caption</option>
              <option value="english">English</option>
              <option value="vietnamese">Vietnamese</option>
              {/* Add more captions as needed */}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Course Category</label>
            <select
              value={selectedCategory}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8886E5]"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <optgroup key={category.name} label={category.name}>
                  {category.subcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full py-3 bg-[#9997F5] text-white font-semibold rounded-md hover:bg-[#8886E5] focus:outline-none focus:bg-red-800">
          Next
        </button>
      </form>
    </div>
  );
};

export default BasicInformation;
