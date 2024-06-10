import React, { Component } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Importing the trash icon
import MainLayout from "../../layouts/MainLayout";

class MyCertificate extends Component {
    render() {
        return (
            <MainLayout>
                <div className="bg-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-2">
                            <FaTrashAlt className="h-6 w-6 text-gray-700" /> {/* Replaced with trash icon */}
                            <h1 className="text-2xl font-bold">My Certificate</h1>
                        </div>
                    </div>

                    {/* Table for displaying certificate items */}
                    <div className="bg-white p-4 rounded shadow mb-6">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left">Item No.</th>
                                    <th className="px-4 py-2 text-left">Title</th>
                                    <th className="px-4 py-2 text-left">Marks</th>
                                    <th className="px-4 py-2 text-left">Out Of</th>
                                    <th className="px-4 py-2 text-left">Upload Date</th>
                                    <th className="px-4 py-2 text-left">Certificate</th>
                                    <th className="px-4 py-2 text-left">Controls</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-4 py-2">1</td>
                                    <td className="px-4 py-2">WordPress Certificate</td>
                                    <td className="px-4 py-2">15</td>
                                    <td className="px-4 py-2">20</td>
                                    <td className="px-4 py-2">6 April 2019</td>
                                    <td className="px-4 py-2">View</td>
                                    <td className="px-4 py-2">
                                        <FaTrashAlt className="h-6 w-6 text-red-500 cursor-pointer" /> {/* Trash icon */}
                                    </td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </MainLayout>
        );
    }
}

export default MyCertificate;
