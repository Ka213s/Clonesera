import React from 'react';
import { FaTrash, FaCertificate } from 'react-icons/fa';
import StudentSidebar from '../../components/Sidebar/Student_Sidebar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import studentCertificatesData from '../../models/FileJson/studentCertificates.json';

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
        <div className="flex h-screen">
            <StudentSidebar />
            <div className="flex-grow flex flex-col">
                <Header toggleMenu={() => { }} />
                <main className="flex-grow p-6 bg-gray-100">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4">My Certificates</h1>
                    <div className="bg-white p-6 rounded-md shadow-md mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <FaCertificate className="text-2xl text-gray-700 mr-4" />
                            <h1 className="text-2xl font-bold text-gray-700">Jump Into New Certificate</h1>
                        </div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            New Certificate
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b-2 border-gray-200">Item No.</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200">Title</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200">Marks</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200">Out Of</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200">Upload Date</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200">Certificate</th>
                                    <th className="px-4 py-2 border-b-2 border-gray-200">Controls</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentCertificatesData.certificates.map((certificate: Certificate, index: number) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border-b">{certificate.itemNo}</td>
                                        <td className="px-4 py-2 border-b">{certificate.title}</td>
                                        <td className="px-4 py-2 border-b">{certificate.marks}</td>
                                        <td className="px-4 py-2 border-b">{certificate.outOf}</td>
                                        <td className="px-4 py-2 border-b">{certificate.uploadDate}</td>
                                        <td className="px-4 py-2 border-b text-blue-500">
                                            <a href={certificate.certificate} target="_blank" rel="noopener noreferrer">
                                                View
                                            </a>
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <FaTrash className="text-xl text-red-500 cursor-pointer" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default StudentCertificates;
