import React from 'react';
// import purchasedCourseData from '../../models/FileJson/purchasedCourse.json'; 
import { FaTrash, FaPrint, FaDownload } from 'react-icons/fa';
// import StudentSidebar from '../../components/Sidebar/Student_Sidebar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
    <div className="flex h-screen">
      {/* <StudentSidebar /> */}
      <div className="flex-grow flex flex-col">
      <Header toggleMenu={() => {}} />
        <main className="flex-grow p-6 bg-gray-100">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Purchased Courses</h1>
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-200">Item No.</th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">Title</th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">Vendor</th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">Category</th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">Delivery Type</th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">Price</th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">Purchase Date</th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* {purchasedCourseData.courses.map((course: Course, index: number) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{course.itemNo}</td>
                    <td className="px-4 py-2 border-b">{course.title}</td>
                    <td className="px-4 py-2 border-b">{course.vendor}</td>
                    <td className="px-4 py-2 border-b text-blue-500">{course.category}</td>
                    <td className="px-4 py-2 border-b text-red-500">{course.deliveryType}</td>
                    <td className="px-4 py-2 border-b">{course.price}</td>
                    <td className="px-4 py-2 border-b">{course.purchaseDate}</td>
                    <td className="px-4 py-2 border-b flex justify-around">
                      <FaDownload className="text-xl cursor-pointer" />
                      <FaTrash className="text-xl cursor-pointer" />
                      <FaPrint className="text-xl cursor-pointer" />
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PurchasedCourses;
