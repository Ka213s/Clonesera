import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
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
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
      <form onSubmit={handleSubmit}>
      <div>
            <label className="block text-gray-700">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={100}
              placeholder="Course title here"
              className="w-full border border-gray-300 p-2 rounded-md"
              required
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
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">What will students learn in your course?*</label>
          <textarea
            name="skillCourse"
            value={formData.skillCourse}
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
            <label className="block text-gray-700">Course Category*</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full border border-gray-300 p-2 rounded-md"
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
        <button type="button" onClick={nextStep} className="px-4 py-2 text-white bg-[#9997F5] rounded-md hover:bg-[#8886E5]">
          Next
        </button>
      </form>
    </div>
  );
};

export default BasicInformation;