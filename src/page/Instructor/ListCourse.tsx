import React, { Component } from "react";
import { FaBook } from "react-icons/fa";
import NavigationTabs from "../../components/Instructor/NavigationTabs";

class ListCourse extends Component {
  render() {
    return (

      <div className="bg-gray-100 p-10 shadow">

        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center space-x-2">
            <FaBook className="h-6 w-6 text-gray-700" />
            <h1 className="text-2xl font-bold">Course</h1>
          </div>
        </div>
        <div className="bg-white p-8 rounded shadow mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaBook className="h-6 w-6 text-gray-700" />
            <h2 className="text-xl">Jump Into Course Creation</h2>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Create Your Course
          </button>
        </div>
        <NavigationTabs />
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Item No.
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Title
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Publish Date
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Sales
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Parts
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Category
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Status
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 shadow">
              <td className="py-2 px-4 border-b border-gray-200">IT-001</td>
              <td className="py-2 px-4 border-b border-gray-200">
                Course Title Here
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                06 April 2020 | 08:31
              </td>
              <td className="py-2 px-4 border-b border-gray-200">15</td>
              <td className="py-2 px-4 border-b border-gray-200">5</td>
              <td className="py-2 px-4 border-b border-gray-200 text-blue-600">
                Web Development
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-red-600">
                Active
              </td>
              <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                <button className="p-1 text-blue-600 hover:text-blue-800">
                  ✏️
                </button>
                <button className="p-1 text-red-600 hover:text-red-800">
                  🗑️
                </button>
              </td>
            </tr>


            <tr className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b border-gray-200">IT-002</td>
              <td className="py-2 px-4 border-b border-gray-200">
                Course Title Here
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                06 April 2020 | 08:31
              </td>
              <td className="py-2 px-4 border-b border-gray-200">15</td>
              <td className="py-2 px-4 border-b border-gray-200">5</td>
              <td className="py-2 px-4 border-b border-gray-200 text-blue-600">
                Web Development
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-red-600">
                Active
              </td>
              <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                <button className="p-1 text-blue-600 hover:text-blue-800">
                  ✏️
                </button>
                <button className="p-1 text-red-600 hover:text-red-800">
                  🗑️
                </button>
              </td>
            </tr>


            <tr className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b border-gray-200">IT-003</td>
              <td className="py-2 px-4 border-b border-gray-200">
                Course Title Here
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                06 April 2020 | 08:31
              </td>
              <td className="py-2 px-4 border-b border-gray-200">15</td>
              <td className="py-2 px-4 border-b border-gray-200">5</td>
              <td className="py-2 px-4 border-b border-gray-200 text-blue-600">
                Web Development
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-red-600">
                Active
              </td>
              <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                <button className="p-1 text-blue-600 hover:text-blue-800">
                  ✏️
                </button>
                <button className="p-1 text-red-600 hover:text-red-800">
                  🗑️
                </button>
              </td>
            </tr>


          </tbody>
        </table>
      </div>
    );
  }
}

export default ListCourse;
