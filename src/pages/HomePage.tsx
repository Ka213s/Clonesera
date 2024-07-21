import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, getPublicCourses, getCurrentLogin } from '../utils/commonImports';
import { InfoCircleOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import Statistic from './Statistic';
import PopularCourses from './PopularCourses';
import CustomCalendar from './CustomCalendar';

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

interface CourseResponse {
  _id: number;
  name: string;
  category_name: string;
  instructor_name: string;
  instructor_avatar: string;
  instructor_id: string;
  description: string;
  image_url: string;
  price_paid: number;
}

interface ApiResponse {
  pageData: CourseResponse[];
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
        const response: ApiResponse = await getPublicCourses(data);

        const coursePromises = response.pageData.map(async (course: CourseResponse) => {
          try {
            const userData = await getUserData(course.instructor_id);
            return { ...course, avatar: userData.avatar || course.instructor_avatar };
          } catch (error) {
            console.error('Error fetching instructor data for course', course._id, ':', error);
            return { ...course, avatar: course.instructor_avatar };
          }
        });

        const updatedCourses = await Promise.all(coursePromises);
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

  const handleViewDetails = (courseId: number) => navigate(`/course-detail/${courseId}`);

  const handlePrevClick = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 2);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleNextClick = () => {
    if (currentIndex + 2 < courses.length && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 2);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 relative bg-green-600 text-white p-4 rounded-lg overflow-hidden flex items-center h-40">
            <div className="z-10">
              <h1 className="text-2xl font-bold mb-4">Sharpen Your Skills with Professional Online Courses</h1>
              <button className="bg-black text-white px-6 py-2 rounded-full font-semibold inline-flex items-center">
                Join Now
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.707-9.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414l1.293-1.293V14a1 1 0 102 0V9.293l1.293 1.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden pointer-events-none">
              <div className="sparkle sparkle-1"></div>
              <div className="sparkle sparkle-2"></div>
              <div className="sparkle sparkle-3"></div>
            </div>
          </div>
          <div className="flex flex-col space-y-8">
            <Statistic user={user} />
          </div>
        </div>

        {/* Popular Courses and Calendar Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 flex flex-col space-y-8">
            <PopularCourses
              courses={courses}
              currentIndex={currentIndex}
              handlePrevClick={handlePrevClick}
              handleNextClick={handleNextClick}
              handleViewDetails={handleViewDetails}
              isAnimating={isAnimating}
            />
          </div>
          <div>
            <CustomCalendar />
          </div>
        </div>

        {/* Info Blocks */}
        <div className="grid grid-cols-3 gap-6 mt-8">
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
