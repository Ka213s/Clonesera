import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import coursesData from '../models/FileJson/courses.json';
import MainLayout from '../layouts/MainLayout';
import { FaEye, FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa';
import {
  PlayCircleOutlined,
  HeartOutlined,
  ExclamationCircleOutlined,
  StarOutlined,
  CommentOutlined
} from '@ant-design/icons';

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
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
      <div className="bg-gray-800 text-white rounded-lg">
        <div className="container mx-auto p-6">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Video */}
            <div className="relative w-full mb-4 lg:w-1/3 lg:mb-0">
              <div className="relative">
                <a onClick={showModal} className="block">
                  <img src="https://www.paulbrowning.com/wp-content/uploads/2012/09/successful-online-courses-featured-image.jpg" alt="" className="w-full p-2 bg-white" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <div className="absolute top-0 right-0 p-1 m-2 mt-3 text-lg font-semibold text-white bg-orange-500 rounded">Bestseller</div>
                    <PlayCircleOutlined className="text-4xl text-white" />
                    <span className="absolute bottom-0 w-full py-2 text-xl font-semibold text-center text-white bg-black bg-opacity-75">Preview this course</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="w-full mt-8 lg:w-2/3 lg:ml-8 lg:mt-0">
              <h2 className="text-2xl font-bold">{course.name}</h2>
              <p className="mt-3 text-lg">{course.description}</p>
              <p className="mt-3 text-lg">114,521 students enrolled</p>
              <div className="flex items-center mt-4 mb-3 text-lg">
                <CommentOutlined className="" />
                <span className="ml-2">English</span>
              </div>
              <p className="mt-2 text-lg">Last updated {course.date}</p>
              <div className="mt-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Buy Now</button>
              </div>
              <p className="mt-2 text-lg">30-Day Money-Back Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between">
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
            <li className="mr-1 flex-grow">
              <button
                className={`block py-2 px-4 font-semibold focus:outline-none ${activeTab === 'about' ? 'bg-[#9997F5] text-white' : ''}`}
                onClick={() => handleTabClick('about')}
              >
                About
              </button>
            </li>
            <li className="mr-1 flex-grow">
              <button
                className={`block py-2 px-4 font-semibold focus:outline-none ${activeTab === 'content' ? 'bg-[#9997F5] text-white' : ''}`}
                onClick={() => handleTabClick('content')}
              >
                Course Content
              </button>
            </li>
            <li className="flex-grow">
              <button
                className={`block py-2 px-4 font-semibold focus:outline-none ${activeTab === 'review' ? 'bg-[#9997F5] text-white' : ''}`}
                onClick={() => handleTabClick('review')}
              >
                Review
              </button>
            </li>
          </ul>

          <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
            {activeTab === 'about' && (
              <div id="about">
                <h2 className="text-2xl font-bold">About</h2>
                <p className="text-gray-700 mt-2">Requirements</p>
                <p className="text-gray-700">Description</p>
                <p className="text-gray-700">Just updated to include Bootstrap 4.1.3!</p>
                <p className="text-gray-700">Who this course is for :</p>
              </div>
            )}
            {activeTab === 'content' && (
              <div id="content">
                <h2 className="text-2xl font-bold">Course Content</h2>
                {/* Add your course content details here */}
              </div>
            )}
            {activeTab === 'review' && (
              <div id="review">
                <h2 className="text-2xl font-bold">Review</h2>
                {/* Add your review details here */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <video width="100%" controls>
          <source src="your-video-url.mp4" type="video/mp4" />
        </video>
      </Modal> */}
    </MainLayout>
  );
};

export default CourseDetailPage;
