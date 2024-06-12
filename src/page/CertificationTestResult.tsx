import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const CertificationTestResult: React.FC = () => {
  const result = {
    score: 85,
    totalQuestions: 10,
    passed: true,
  };

  const handleDownloadCertificate = () => {
    // Replace with your download logic here
    console.log('Downloading certificate...');
    // Example: window.open('/path_to_certificate.pdf', '_blank');
  };

  return (
    <MainLayout> 
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              Certification Test Result
            </h2>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-md">
            <div>
              <p className="text-xl text-center mb-8">
                You scored {result.score} out of {result.totalQuestions}.
              </p>
              <p className={result.passed ? 'text-green-500 text-2xl text-center font-semibold' : 'text-red-500 text-2xl font-semibold'}>
                {result.passed ? (
                  <>
                    Congratulation! <br /> You passed the test.
                  </>
                ) : (
                  <span className="text-red-500">
                    Unfortunately, you did not pass the test.
                  </span>
                )}
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleDownloadCertificate}
                className="py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              >
                Download Certificate
              </button>
              <Link
                to="/home"
                className="py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CertificationTestResult;
