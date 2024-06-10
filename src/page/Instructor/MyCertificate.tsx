import React, { Component } from "react";
import { FaCertificate } from "react-icons/fa";

class MyCertificate extends Component {
    render() {
        return (
            <div className="bg-gray-100 p-10">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center space-x-2">
                        <FaCertificate className="h-6 w-6 text-gray-700" />
                        <h1 className="text-2xl font-bold">My Certificate</h1>
                    </div>
                </div>

                <div className="bg-white p-8 rounded shadow mb-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FaCertificate className="h-6 w-6 text-gray-700" />
                        <h2 className="text-xl">Jump Into New Certificate</h2>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                        New Certificate
                    </button>
                </div>

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
                                Marks
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                                Out Of
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                                Upload Date
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                                Certificate
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                                Controls
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">IT-001</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                WordPress Certificate
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                15
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">20</td>
                            <td className="py-2 px-4 border-b border-gray-200">6 April 2019</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-blue-600">view</td>
                            <td className="py-2 px-4 border-b border-gray-200">🗑️</td>

                        </tr>


                        <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">IT-002</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                WordPress Pro Certificate	                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                14
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">20</td>
                            <td className="py-2 px-4 border-b border-gray-200">9 April 2019</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-blue-600">view</td>
                            <td className="py-2 px-4 border-b border-gray-200">🗑️</td>

                        </tr>


                        <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">IT-003</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                HTML CSS Certificate
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                18
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">20</td>
                            <td className="py-2 px-4 border-b border-gray-200">20 April 2019</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-blue-600">view</td>
                            <td className="py-2 px-4 border-b border-gray-200">🗑️</td>

                        </tr>

                        <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">IT-004</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                HTML CSS Certificate
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                18
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">20</td>
                            <td className="py-2 px-4 border-b border-gray-200">20 April 2019</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-blue-600">view</td>
                            <td className="py-2 px-4 border-b border-gray-200">🗑️</td>

                        </tr>

                        <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">IT-005</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                HTML CSS Certificate
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                18
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">20</td>
                            <td className="py-2 px-4 border-b border-gray-200">20 April 2019</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-blue-600">view</td>
                            <td className="py-2 px-4 border-b border-gray-200">🗑️</td>

                        </tr>

                    </tbody>
                </table>
            </div>
        );
    }
}

export default MyCertificate;

