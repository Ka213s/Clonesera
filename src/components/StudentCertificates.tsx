import React from 'react';
import { FaTrash, FaCertificate } from 'react-icons/fa';
import studentCertificatesData from '../models/FileJson/studentCertificates.json';
import MainLayout from '../layouts/MainLayout';

interface Certificate {
    itemNo: number;
    title: string;
    marks: number;
    outOf: number;
    uploadDate: string;
    certificate: string;
}

const StudentCertificates: React.FC = () => {
    return (
        <MainLayout>
            <div className="flex flex-col p-6 bg-gray-100 h-screen">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">My Certificates</h1>
                <div className="bg-white p-6 rounded-md shadow-md mb-6 flex items-center justify-between">
                    <div className="flex items-center text-gray-700">
                        <FaCertificate className="text-2xl mr-4" />
                        <h1 className="text-xl font-bold">Jump Into New Certificate</h1>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none">
                        New Certificate
                    </button>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md overflow-auto">
                    <table className="min-w-full table-auto divide-y divide-gray-200">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border-b text-center">Item No.</th>
                                <th className="px-4 py-2 border-b text-center">Title</th>
                                <th className="px-4 py-2 border-b text-center">Marks</th>
                                <th className="px-4 py-2 border-b text-center">Out Of</th>
                                <th className="px-4 py-2 border-b text-center">Upload Date</th>
                                <th className="px-4 py-2 border-b text-center">Certificate</th>
                                <th className="px-4 py-2 border-b text-center">Controls</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentCertificatesData.certificates.map((certificate: Certificate, index: number) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2 text-center align-middle">{certificate.itemNo}</td>
                                    <td className="px-4 py-2 text-center align-middle">{certificate.title}</td>
                                    <td className="px-4 py-2 text-center align-middle">{certificate.marks}</td>
                                    <td className="px-4 py-2 text-center align-middle">{certificate.outOf}</td>
                                    <td className="px-4 py-2 text-center align-middle">{certificate.uploadDate}</td>
                                    <td className="px-4 py-2 text-blue-500 text-center align-middle">
                                        <a href={certificate.certificate} target="_blank" rel="noopener noreferrer">
                                            View
                                        </a>
                                    </td>
                                    <td className="px-4 py-2 text-center align-middle">
                                        <FaTrash className="text-xl text-red-500 hover:text-red-600 cursor-pointer mx-auto" />
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

export default StudentCertificates;
