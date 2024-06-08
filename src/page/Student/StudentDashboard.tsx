import React, { useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import newsData from '../../models/FileJson/news.json';
import MainLayout from '../../layouts/MainLayout';

const StudentDashboard: React.FC = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const totalNewsItems = newsData.news.length;
  const goToNextNews = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % totalNewsItems);
  };

  const goToPreviousNews = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + totalNewsItems) % totalNewsItems);
  };

  const getNewsItem = (index: number) => newsData.news[index];

  return (
    <MainLayout>
      <div className="flex-grow flex flex-col p-6 bg-gray-100 h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Student Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-md shadow-md relative">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Purchased Courses</h2>
            <p className="text-3xl text-gray-800 mt-4 mb-4">
              15
            </p>
            <span className="text-sm border border-orange-500 bg-orange-500 text-white rounded-md py-0.5 px-2 mb-2">New 5</span>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md relative">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Instructors Subscribing</h2>
            <p className="text-3xl text-gray-800 mt-4 mb-4">
              45
            </p>
            <span className="text-sm border border-purple-500 bg-purple-500 text-white rounded-md py-0.5 px-2 mt-2">New 3</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 mt-10">
          <h1 className="text-2xl font-semibold text-gray-700">What's new in Clonsera?</h1>
          <div className="flex space-x-2">
            <button onClick={goToPreviousNews} className="text-gray-500 hover:text-gray-700">
              <FaArrowCircleLeft size={24} />
            </button>
            <button onClick={goToNextNews} className="text-gray-500 hover:text-gray-700">
              <FaArrowCircleRight size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => {
            const newsItemIndex = (currentNewsIndex + index) % totalNewsItems;
            const newsItem = getNewsItem(newsItemIndex);

            return (
              <div key={newsItemIndex} className="bg-white p-6 rounded-md shadow-md">
                <img
                  src={newsItem.media_url}
                  alt={newsItem.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{newsItem.title}</h3>
                <p className="text-gray-600">{newsItem.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </MainLayout>
  );
};

export default StudentDashboard;
