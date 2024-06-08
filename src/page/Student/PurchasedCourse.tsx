import React from 'react';
import purchasedCourseData from '../../models/FileJson/purchasedCourse.json'; 
import { FaTrash, FaPrint, FaDownload } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';

interface Course {
  itemNo: string;
  title: string;
  vendor: string;
  category: string;
  deliveryType: string;
  price: string;
  purchaseDate: string;
}

const PurchasedCourses: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex-grow flex flex-col p-6 bg-gray-100 h-screen">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Purchased Courses</h1>
        <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Item No.</th>
                <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Title</th>
                <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Vendor</th>
                <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Category</th>
                <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Delivery Type</th>
                <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Price</th>
                <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Purchase Date</th>
                <th className="px-4 py-2 border-b-2 border-gray-200 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {purchasedCourseData.courses.map((course: Course, index: number) => (
                <tr key={index} className="odd:bg-gray-50 even:bg-white border-b">
                  <td className="px-4 py-2 text-left">{course.itemNo}</td>
                  <td className="px-4 py-2 text-left">{course.title}</td>
                  <td className="px-4 py-2 text-left">{course.vendor}</td>
                  <td className="px-4 py-2 text-left text-blue-500">{course.category}</td>
                  <td className="px-4 py-2 text-left text-red-500">{course.deliveryType}</td>
                  <td className="px-4 py-2 text-left">{course.price}</td>
                  <td className="px-4 py-2 text-left">{course.purchaseDate}</td>
                  <td className="px-4 py-2 text-center flex justify-around">
                    <FaDownload className="text-xl text-blue-500 cursor-pointer hover:text-blue-700" />
                    <FaTrash className="text-xl text-red-500 cursor-pointer hover:text-red-700" />
                    <FaPrint className="text-xl text-gray-500 cursor-pointer hover:text-gray-700" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default PurchasedCourses;
