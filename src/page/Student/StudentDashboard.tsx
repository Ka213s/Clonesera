import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import StudentSidebar from '../../components/Sidebar/Student_Sidebar';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import newsData from '../../models/FileJson/news.json';

const StudentDashboard: React.FC = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex === 0 ? newsData.news.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex === newsData.news.length - 1 ? 0 : prevIndex + 1));
  };

  const currentNews = newsData.news[currentNewsIndex];

  return (
    <div className="flex h-screen">
      <StudentSidebar />
      <div className="flex-grow flex flex-col">
        <Header toggleMenu={() => { }} />
        <main className="flex-grow p-6 bg-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-700">Student Dashboard</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Total Purchased Courses</h2>
              <p className="text-3xl mt-4">15 <span className="text-sm text-orange-500">New 5</span></p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Total Instructors Subscribing</h2>
              <p className="text-3xl mt-4">45 <span className="text-sm text-purple-500">New 3</span></p>
            </div>
          </div>
          <div className="mt-6 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">What's new in Cursus?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improved performance on Studio Dashboard</li>
              <li>See more Dashboard updates</li>
              <li>See issues-at-glance for Live</li>
            </ul>
          </div>
          <div className="mt-6">
            <div className="bg-white p-6 rounded-md shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">News</h2>
                <div>
                  <button onClick={handlePrevClick} className="text-gray-700 hover:text-gray-900 mr-2">
                    <FaArrowCircleLeft className="text-2xl" />
                  </button>
                  <button onClick={handleNextClick} className="text-gray-700 hover:text-gray-900">
                    <FaArrowCircleRight className="text-2xl" />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <img src={currentNews.media_url} alt="News" className="h-24 w-24 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{currentNews.title}</h3>
                  <p className="mt-2 text-gray-600">
                    {currentNews.description}
                  </p>
                  <a href="#" className="text-gray-700 hover:underline mt-2 inline-block">LEARN MORE</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
