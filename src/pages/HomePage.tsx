import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, getPublicCourses, getCurrentLogin } from '../utils/commonImports';
import { InfoCircleOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import Statistic from './Statistic';
import PopularCourses from './PopularCourses';
import CustomCalendar from './CustomCalendar';
import Blog from './Blog';
import JoinAvatar from '../assets/Course.png';

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2 relative bg-green-600 text-white p-4 rounded-lg overflow-hidden flex flex-col justify-between h-50">
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
          <div className="flex flex-col space-y-8">
            <Statistic user={user} />
          </div>
        </div>

        {/* Popular Courses and Calendar Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2 flex flex-col space-y-8">
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
        <div className="mt-12">
          <Blog />
        </div>
        {/* Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
    </div>
  );
};

export default HomePage;
