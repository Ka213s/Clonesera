import React, { useEffect, useState } from 'react';
import { Tag, Skeleton } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getUserData, getPublicCourses } from '../utils/commonImports';
import { useNavigate } from 'react-router-dom';

interface Course {
  _id: number;
  name: string;
  category_name: string;
  instructor_name: string;
  avatar: string;
  description: string;
  image_url: string;
  price_paid: number;
  lesson_count: number;
  total_duration: number;
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
  lesson_count: number;
  total_duration: number;
}

interface ApiResponse {
  pageData: CourseResponse[];
}

const PopularCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchCourses();
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
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevClick}
          className={`bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition duration-300 ${currentIndex === 0 ? 'invisible' : 'visible'}`}
        >
          <LeftOutlined className="text-lg" />
        </button>
        <h2 className="text-3xl font-bold text-left">Popular Courses</h2>
        <button
          onClick={handleNextClick}
          className={`bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition duration-300 ${currentIndex + 2 >= courses.length ? 'invisible' : 'visible'}`}
        >
          <RightOutlined className="text-lg" />
        </button>
      </div>
      <div className="relative">
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 transition-transform duration-300 ${isAnimating ? 'transform -translate-x-full' : ''}`}>
          {loading ? (
            Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} active paragraph={{ rows: 5 }} />
            ))
          ) : (
            courses.slice(currentIndex, currentIndex + 2).map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 hover:shadow-2xl"
                style={{ height: '360px', width: '340px' }} // Updated dimensions
              >
                <img
                  src={course.image_url}
                  alt={course.name}
                  className="w-full h-40 object-cover" // Adjusted height for image
                />
                <div className="flex items-center mt-2 space-x-2 ml-2">
                  <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                    <span className="text-gray-500 text-sm">{course.lesson_count} Lessons</span>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                    <span className="text-gray-500 text-sm">
                      {course.total_duration > 0
                        ? `${Math.floor(course.total_duration / 60)}h ${course.total_duration % 60}m`
                        : '0h 0m'}
                    </span>
                  </div>
                </div>
                <div className="p-2 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold mt-1 h-10 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {course.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    <Tag color="blue">
                      {course.category_name || 'Default Category'}
                    </Tag>
                  </p>
                  <div className="flex items-center mb-2">
                    {course.avatar ? (
                      <img
                        src={course.avatar}
                        alt={course.instructor_name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
                        <span className="text-xs text-gray-600">No Avatar</span>
                      </div>
                    )}
                    <p className="text-sm text-gray-700">
                      <strong>{course.instructor_name}</strong>
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto mb-2">
                    <div className="text-lg font-semibold text-green-600">
                      <span className="text-xl">${course.price_paid}</span>
                      <span className="text-sm text-gray-500 ml-2">/year</span>
                    </div>
                    <button
                      onClick={() => handleViewDetails(course._id)}
                      className="bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-700 transition duration-300"
                    >
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularCourses;
