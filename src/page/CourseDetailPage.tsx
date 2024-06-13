import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import coursesData from '../models/FileJson/courses.json';
import MainLayout from '../layouts/MainLayout';
import { FaEye, FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa';

interface Course {
  id: string;
  name: string;
  views: number;
  date: string;
  description: string;
  author: string;
  price: number;
  vid: string;
}

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>('about');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Find course in both courses and newestCourses
  const loadCourse = (id: string): Course | undefined => {
    return (
      coursesData.courses.find((course) => course.id === id) ||
      coursesData.newestCourses.find((course) => course.id === id)
    );
  };

  // Load initial course
  useEffect(() => {
    const loadedCourse = loadCourse(courseId!);
    setCourse(loadedCourse);
  }, [courseId]);

  if (!course) {
    return <div>Không tìm thấy khóa học.</div>;
  }

  const defaultAvatar = "../static/media/Avatar02.715a35cf5d30280dd60a.jpg"; 

  return (
    <MainLayout>
      <div className="">
        <div className="bg-gray-800 text-white rounded-lg">
          <div className="container mx-auto p-6 flex flex-wrap items-center">
            {/* Video */}
            <div className="w-full md:w-1/2 bg-white p-2 rounded-lg mb-4 md:mb-0 relative">
              <div className="aspect-w-16 aspect-h-9">
                <video controls className="w-full h-full object-cover rounded-lg shadow-lg" poster={course.vid}>
                  <source src={`https://path.to/videos/${course.id}.mp4`} type="video/mp4" />
                  {/* Fallback for browsers that don't support HTML5 video */}
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-extrabold">{course.name}</h1>
                <p className="text-lg">The only course you need to learn web development - HTML, CSS, JS, Node, and More!</p>
                <p className="text-md">114,521 students enrolled</p>
                <p className="text-md">Language: English</p>
                <p className="text-md">Subtitles: English, Dutch + 12 more</p>
                <p className="text-md">Last updated: 1/2024</p>
                <div className="flex space-x-4">
                  <button className="bg-[#9997F5] hover:bg-[#8886E5] text-white font-bold py-2 px-4 rounded">Add to Cart</button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Buy Now</button>
                </div>
                <p className="text-sm mt-2">30-Day Money-Back Guarantee</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-6 flex items-center justify-between">
          {/* Avatar and Author Name */}
          <div className="flex items-center space-x-4">
            <img src={defaultAvatar} alt={course.author} className="w-12 h-12 rounded-full" />
            <div>
              <p className="text-lg font-semibold text-gray-700">{course.author}</p>
              <button className="bg-[#9997F5] text-white font-bold py-2 px-4 rounded">
                <span>Subscribe</span>
              </button>
            </div>
          </div>
          {/* Additional Icons */}
          <div className="flex items-center space-x-1 text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="border border-gray-200 rounded p-1 flex flex-col items-center justify-center">
                <FaEye />
                <span>{course.views}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="border border-gray-200 rounded p-1 flex flex-col items-center justify-center">
                <FaThumbsUp />
                <span>Like</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="border border-gray-200 rounded p-1 flex flex-col items-center justify-center">
                <FaThumbsDown />
                <span>Dislike</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="border border-gray-200 rounded p-1 flex flex-col items-center justify-center">
                <FaShare />
                <span>Share</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <ul className="flex border-b">
            <li className="mr-1">
              <button
                className={` inline-block py-2 px-4 font-semibold ${activeTab === 'about' ? 'bg-[#9997F5] text-white' : ''}`}
                onClick={() => handleTabClick('about')}
              >
                About
              </button>
            </li>
            <li className="mr-1">
              <button
                className={`inline-block py-2 px-4 font-semibold ${activeTab === 'content' ? 'bg-[#9997F5] text-white' : ''}`}
                onClick={() => handleTabClick('content')}
              >
                Course Content
              </button>
            </li>
            <li className="mr-1">
              <button
                className={`inline-block py-2 px-4 font-semibold ${activeTab === 'review' ? 'bg-[#9997F5] text-white' : ''}`}
                onClick={() => handleTabClick('review')}
              >
                Review
              </button>
            </li>
          </ul>
          <div id="about" className={`p-4 ${activeTab === 'about' ? '' : 'hidden'}`}>
            <h2 className="text-2xl font-bold">About</h2>
            <p className="text-gray-700 mt-2">Requirements</p>
            <p className="text-gray-700">Description</p>
            <p className="text-gray-700">Just updated to include Bootstrap 4.1.3!</p>
            <p className="text-gray-700">Who this course is for :</p>
          </div>
          <div id="content" className={`p-4 ${activeTab === 'content' ? '' : 'hidden'}`}>
            <h2 className="text-2xl font-bold">Course Content</h2>
            {/* Add your course content details here */}
          </div>
          <div id="review" className={`p-4 ${activeTab === 'review' ? '' : 'hidden'}`}>
            <h2 className="text-2xl font-bold">Review</h2>
            {/* Add your review details here */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetailPage;
