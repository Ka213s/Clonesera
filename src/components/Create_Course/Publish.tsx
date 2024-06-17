import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PublishProps {
  formData: any;
  prevStep: () => void;
}

const Publish: React.FC<PublishProps> = ({ formData, prevStep }) => {
  const [categoryData, setCategoryData] = useState<any>(null);
  const [subcategoryData, setSubcategoryData] = useState<any>(null);
  const [categoryListData, setCategoryListData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const categoryResponse = await axios.get('https://665fbf915425580055b0b389.mockapi.io/Category', {
        params: {
          Cate_name: formData.courseCategory
        }
      });
      setCategoryData(categoryResponse.data);

      const categoryId = categoryResponse.data.id;
      const subcategoryResponse = await axios.get('https://665fbf915425580055b0b389.mockapi.io/SubCategory', {
        params: {
          Category_Id: categoryId
        }
      });
      setSubcategoryData(subcategoryResponse.data);

      const categoryListResponse = await axios.get('https://665fbf915425580055b0b389.mockapi.io/CategoryList');
      setCategoryListData(categoryListResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = { ...formData };
    delete formDataToSend.courseCategory;
    delete formDataToSend.categoryName;

    const response = await axios.post('https://665fbf915425580055b0b389.mockapi.io/GR3_Crouse', formDataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

      const categoryResponse = await axios.post('https://665fbf915425580055b0b389.mockapi.io/Category', {
        Cate_name: formData.categoryName 
      });
      const categoryId = categoryResponse.data.id;

      const subcategoryResponse = await axios.post('https://665fbf915425580055b0b389.mockapi.io/SubCategory', {
        Category_Id: parseInt(categoryId),
        SubCate_name: formData.courseCategory
      });

      // Use the Course_Id from the response of GR3_Crouse API call
      const categoryListResponse = await axios.post('https://665fbf915425580055b0b389.mockapi.io/CategoryList', {
        Course_Id:parseInt( response.data.id),
        Cate_Id: parseInt(categoryId),
        SubCate_Id: parseInt(subcategoryResponse.data.id)
      });

      console.log('Response:', response.data);
      console.log('Category Response:', categoryResponse.data);
      console.log('Subcategory Response:', subcategoryResponse.data);
      console.log('CategoryList Response:', categoryListResponse.data);

      alert('Course published successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to publish course. Please try again later.');
    }
  };

  return (
   
      <div>
        <h2 className="text-2xl font-bold mb-4">Publish</h2>
        <form onSubmit={handleSubmit}>
          {/* Add your publish fields here */}
          <button type="button" onClick={prevStep} className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600">
            Previous
          </button>
          <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
            Publish
          </button>
        </form>
        {/* Display fetched data for checking */}
        <div>
          <h3>Category Data:</h3>
          <pre>{JSON.stringify(categoryData, null, 2)}</pre>
        </div>
        <div>
          <h3>Subcategory Data:</h3>
          <pre>{JSON.stringify(subcategoryData, null, 2)}</pre>
        </div>
        <div>
          <h3>Category List Data:</h3>
          <pre>{JSON.stringify(categoryListData, null, 2)}</pre>
        </div>
      </div>
   
  );
};

export default Publish;
