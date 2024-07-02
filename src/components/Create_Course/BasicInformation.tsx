import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../../services/Api';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
}

const BasicInformation: React.FC<Props> = ({ formData, setFormData, nextStep }) => {
  const navigate = useNavigate();
  const api = createApiInstance(navigate);
  const [categories, setCategories] = useState<any[]>([]);
  const [childCategories, setChildCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const searchCondition = {
        keyword: '',
        is_delete: false,
      };
      const data = await api.getCategories(searchCondition, 1, 10);
      console.log('Categories:', data);
      const categoriesArray = Array.isArray(data) ? data : data.data.pageData || [];
      setCategories(categoriesArray);

      const childCategoriesArray = categoriesArray.filter((category: any) => category.parent_category_id);
      setChildCategories(childCategoriesArray);
      console.log('Child categories:', childCategoriesArray);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
            {categories.map((category: any) => (
              <React.Fragment key={category.id}>
                {!category.parent_category_id && (
                  <optgroup label={category.name}>
                    <option value={category.id}>{category.name}</option>
                    {childCategories
                      .filter((child: any) => child.parent_category_id === category.id)
                      .map((child: any) => (
                        <option key={child.id} value={child.id}>
                          {child.name}
                        </option>
                      ))}
                  </optgroup>
                )}
                {category.parent_category_id && (
                  <option value={category.id}>{category.name}</option>
                )}
              </React.Fragment>
            ))}
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
