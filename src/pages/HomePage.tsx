import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicCourses, getCurrentLogin } from '../utils/commonImports';
import { Button } from 'antd'; 
import { InfoCircleOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import Statistic from './Statistic';
import PopularInstructors from './PopularInstructors';
import PopularCourses from './PopularCourses';

interface Course {
  _id: number;
  name: string;
  category_name: string;
  instructor_name: string;
  avatar: string;
  description: string;
  image_url: string;
  price_paid: number;
}

interface User {
  name: string;
  avatar: string;
}

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = {
          searchCondition: {
            keyword: '',
            category_id: '',
            is_deleted: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        };
        const response = await getPublicCourses(data);
        console.log('response:', response);
        // Update the courses with avatar information
        const updatedCourses = response.pageData.map((course: any) => ({
          ...course,
          avatar: course.instructor_avatar, // Assuming the API response includes instructor_avatar
        }));
        console.log('updatedCourses:', updatedCourses); // Kiểm tra dữ liệu courses
        setCourses(updatedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const userData = await getCurrentLogin();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUser();
    }
  }, []);

  const handleViewDetails = (courseId: number) => {
    navigate(`/course-detail/${courseId}`);
  };

  const popularInstructors = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://example.com/avatar1.jpg",
      coursesTaught: 10,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://example.com/avatar2.jpg",
      coursesTaught: 8,
    },
    // Add more instructors as needed
  ];

  const uniqueCategories = Array.from(new Set(courses.map(course => course.category_name)));

  const handlePrevClick = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 3);
        setIsAnimating(false);
      }, 300); // Thời gian hiệu ứng chuyển đổi là 300ms
    }
  };

  const handleNextClick = () => {
    if (currentIndex + 3 < courses.length && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 3);
        setIsAnimating(false);
      }, 300); // Thời gian hiệu ứng chuyển đổi là 300ms
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
        {/* Main Content Block */}
        <div className="col-span-2 relative bg-green-600 text-white p-6 rounded-lg mb-8 overflow-hidden flex items-center">
          <div className="z-10">
            <h1 className="text-4xl font-bold mb-4">Sharpen Your Skills with Professional Online Courses</h1>
            <button className="bg-black text-white px-6 py-2 rounded-full font-semibold inline-flex items-center">
              Join Now
              <svg
                className="ml-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.707-9.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414l1.293-1.293V14a1 1 0 102 0V9.293l1.293 1.293a1 1 0 001.414-1.414l-3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-green-700 opacity-20"></div>
          <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden pointer-events-none">
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
          </div>
        </div>
        
        {/* User Statistic */}
        <div className="space-y-8">
          <Statistic user={user} />
        </div>

        {/* Popular Courses */}
        <div className="col-span-3">
          <div className="flex space-x-4 mb-8">
            {uniqueCategories.map(category => (
              <button key={category} className="bg-white shadow-md rounded-full px-4 py-2">
                {category}
              </button>
            ))}
          </div>
          
          <PopularCourses
            courses={courses}
            currentIndex={currentIndex}
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
            handleViewDetails={handleViewDetails}
            isAnimating={isAnimating}
          />

          {courses.length > 4 && (
            <div className="flex justify-between mt-4">
              <Button type="primary" icon={<InfoCircleOutlined />} size="large">
                Button 1
              </Button>
              <Button type="primary" icon={<CheckCircleOutlined />} size="large">
                Button 2
              </Button>
            </div>
          )}
        </div>

        {/* Popular Instructors */}
        <div className="col-span-3">
          <PopularInstructors instructors={popularInstructors} />
        </div>

        {/* Info Blocks */}
        <div className="col-span-3 grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <InfoCircleOutlined className="text-4xl text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">About us</h2>
            <p className="text-gray-600 text-center">when an unknown printer took a galley of type and scrambled it</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <CheckCircleOutlined className="text-4xl text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Certification</h2>
            <p className="text-gray-600 text-center">when an unknown printer took a galley of type and scrambled it</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <UserOutlined className="text-4xl text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Member</h2>
            <p className="text-gray-600 text-center">when an unknown printer took a galley of type and scrambled it</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;
