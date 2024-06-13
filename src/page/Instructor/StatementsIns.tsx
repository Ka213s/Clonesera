import React from 'react';
import { FaDownload, FaSearch, FaFile } from 'react-icons/fa';
import instructorStatements from '../../models/FileJson/instructorStatements.json';
import MainLayout from '../../layouts/MainLayout';

const StatementsIns: React.FC = () => {
    const statements = instructorStatements.instructorStatements;

    return (
        <MainLayout>
            <div className="bg-gray-100 rounded-lg shadow-lg p-8">
                
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <FaFile className="h-6 w-6 text-gray-700" />
                        <h1 className="text-2xl font-bold">Statements</h1>
                    </div>
                </div>

                <div className="flex justify-between mb-8">

                    <div className="bg-white p-6 shadow-md w-3/4 mr-4">
                        <h5 className="text-lg font-semibold mb-4">Earning</h5>
                        <hr className="mb-4" />
                        <p className="text-gray-600 mb-4">Your sales earnings over the last 30 days</p>
                    </div>

                    <div className="bg-white p-6 shadow-md w-2/5 ml-4">
                        <h5 className="text-lg font-semibold mb-4">View Invoice</h5>
                        <hr className="mb-4" />
                        <div className="flex items-center space-x-4">
                            <select className="bg-white border border-gray-300 rounded-md py-2 px-3 w-48">
                                <option>Monthly Invoice</option>
                                <option>April 2020</option>
                                <option>March 2020</option>
                            </select>
                            <button className="bg-[#9997F5] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#8886E5] transition">
                                <FaDownload className="mr-2" />
                                Download
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-8 mt-16">
                    <div className="flex space-x-4 items-center">
                        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">This Month</button>
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
                                <th className="px-6 py-3 bg-purple-200 text-left text-gray-700">
                                    Date
                                </th>
                                <th className="px-6 py-3 bg-purple-200 text-left text-gray-700">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 bg-purple-200 text-left text-gray-700">
                                    Type
                                </th>
                                <th className="px-6 py-3 bg-purple-200 text-left text-gray-700">
                                    Title
                                </th>
                                <th className="px-6 py-3 bg-purple-200 text-right text-gray-700">
                                    Amount
                                </th>
                                <th className="px-6 py-3 bg-purple-200 text-right text-gray-700">
                                    Fees
                                </th>
                                <th className="px-6 py-3 bg-purple-200 text-right text-gray-700">
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
                                    <td className="px-6 py-4 whitespace-nowrap text-right">{statement.fees}</td>
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

export default StatementsIns;
