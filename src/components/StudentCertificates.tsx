import React from 'react';
import { FaCertificate } from 'react-icons/fa';
import studentCertificatesData from '../models/FileJson/studentCertificates.json';
import Certificate from '../assets/Certificate.png';

interface Certificate {
    title: string;
    certificate: string;
}

const StudentCertificates: React.FC = () => {
    const certificates: Certificate[] = studentCertificatesData.certificates;

    return (
        <div className="bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                    <FaCertificate className="h-6 w-6 text-gray-700" />
                    <h1 className="text-2xl font-bold">My Certificates</h1>
                </div>
            </div>

            <div className="gap-4 flex flex-col">
                {certificates.map((certificate, index) => (
                    <div key={index} className="bg-white rounded-md shadow-md p-6 flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center">
                                <img
                                    src={Certificate}
                                    alt="Certificate Icon"
                                    className="mr-2 h-20 w-20" 
                                />
                                <h2 className="text-xl font-semibold mb-2">{certificate.title}</h2>
                            </div>
                        </div>
                        <div className="ml-4">
                            <a
                                href={certificate.certificate}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                View Certificate
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default StudentCertificates;
