import React from 'react';
import { FaDownload, FaSearch } from 'react-icons/fa';
import studentStatements from '../../models/FileJson/studentStatements.json';
import MainLayout from '../../layouts/MainLayout';

const Statements: React.FC = () => {
  const statements = studentStatements.studentStatements;

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Statements</h1>
        <div className="flex justify-between mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-3/4 mr-4">
            <h5 className="text-lg font-semibold mb-4">Earning</h5>
            <hr className="mb-4"/>
            <p className="text-gray-600 mb-4">If you are not an instructor, you can't use this section.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Become an instructor</button>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-2/5 ml-4">
            <h5 className="text-lg font-semibold mb-4">View Invoice</h5>
            <hr className="mb-4"/>
            <div className="flex items-center space-x-4">
              <select className="bg-white border border-gray-300 rounded-md py-2 px-3 w-48">
                <option>Monthly Invoice</option>
                <option>April 2020</option>
                <option>March 2020</option>
              </select>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition">
                <FaDownload className="mr-2"/>
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8 mt-16">
          <div className="flex space-x-4 items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">This Month</button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition">Last Month</button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring focus:border-blue-300"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {statements.map((statement, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{statement.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{statement.orderID}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{statement.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{statement.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{statement.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Statements;
