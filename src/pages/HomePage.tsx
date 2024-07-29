import React from 'react';
import PopularCourses from './PopularCourses';
import Blog from './Blog';
import RightSidebar from './RightSidebar';
import JoinAvatar from '../assets/Course.png';
import { InfoCircleOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          {/* Header Section */}
          <div className="relative bg-green-600 text-white p-4 rounded-lg overflow-hidden flex flex-col justify-between h-50">
            <div className="z-10 relative">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-black">Sharpen Your Skills with Professional Online Courses</h1>
              <p className="text-lg mb-4 text-black">
                Join our platform to access high-quality courses taught by industry experts and enhance your skills from anywhere at any time.
              </p>
              <button className="bg-black text-white px-6 py-2 rounded-full font-semibold inline-flex items-center">
                Join Now
              </button>
            </div>
            <div className="absolute top-0 right-0 bottom-0 flex items-center justify-end p-4">
              <img
                src={JoinAvatar}
                alt="Online Learning"
                className="object-cover h-auto opacity-50 ml-auto"
                style={{ marginRight: '-50px' }}
              />
            </div>
            <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden pointer-events-none">
              <div className="sparkle sparkle-1"></div>
              <div className="sparkle sparkle-2"></div>
              <div className="sparkle sparkle-3"></div>
            </div>
          </div>

          {/* Popular Courses Section */}
          <div>
            <PopularCourses />
          </div>

          {/* Blog Section */}
          <div>
            <Blog />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <InfoCircleOutlined className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">About us</h2>
              <p className="text-gray-600 text-center">When an unknown printer took a galley of type and scrambled it</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <CheckCircleOutlined className="text-4xl text-green-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Certification</h2>
              <p className="text-gray-600 text-center">When an unknown printer took a galley of type and scrambled it</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <UserOutlined className="text-4xl text-gray-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Member</h2>
              <p className="text-gray-600 text-center">When an unknown printer took a galley of type and scrambled it</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
