import React from 'react';
import { Link } from 'react-router-dom';

const CertificationTestResult = () => {
  return (
    <div className="certification-test-result">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto text-center">
            <div className="result-card">
              <h3 className="result-title">Result Card</h3>
              <div className="result-content">
                <div className="result-details">
                  <div className="result-label">Exam Title:</div>
                  <div className="result-value">Sample Exam</div>
                </div>
                <div className="result-details">
                  <div className="result-label">Score:</div>
                  <div className="result-value">80%</div>
                </div>
                <div className="result-details">
                  <div className="result-label">Passing Score:</div>
                  <div className="result-value">70%</div>
                </div>
                <div className="result-details">
                  <div className="result-label">Status:</div>
                  <div className="result-value passed">Passed</div>
                </div>
                <div className="result-details">
                  <div className="result-label">Date:</div>
                  <div className="result-value">June 10, 2024</div>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/home" // Điều hướng quay lại trang chủ
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationTestResult;
