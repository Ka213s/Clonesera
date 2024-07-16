import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicCourses, getCurrentLogin } from '../utils/commonImports'; 

interface Course {
  _id: number;
  name: string;
  category_name: string;
  instructor_name: string;
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = {
          searchCondition: {
            keyword: '',
            category_id: '',
            is_deleted: false
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10
          }
        };
        const response = await getPublicCourses(data);
        console.log('response:', response);
        setCourses(response.pageData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentLogin();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleViewDetails = (courseId: number) => {
    navigate(`/course-detail/${courseId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Banner */}
        <div className="relative bg-green-500 text-white p-6 rounded-lg mb-8 overflow-hidden">
          <h1 className="text-4xl font-bold mb-4">Sharpen Your Skills with Professional Online Courses</h1>
          <button className="bg-black text-white px-6 py-2 rounded-full font-semibold inline-flex items-center">
            Join Now
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.707-9.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414l1.293-1.293V14a1 1 0 102 0V9.293l1.293 1.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-purple-700 opacity-20"></div>
          <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden pointer-events-none">
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Tabs */}
            <div className="flex space-x-4 mb-8">
              <button className="bg-white shadow-md rounded-full px-4 py-2">2/8 watched UI/UX Design</button>
              <button className="bg-white shadow-md rounded-full px-4 py-2">3/8 watched Branding</button>
              <button className="bg-white shadow-md rounded-full px-4 py-2">6/12 watched Front End</button>
            </div>

            {/* Continue Watching */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Continue Watching</h2>
              <div className="flex space-x-4 overflow-x-scroll pb-4">
                {courses.map(course => (
                  <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden w-80 flex-shrink-0 flex flex-col">
                    <img src={course.image_url} alt={course.name} className="w-full h-48 object-cover" />
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-xl font-semibold mb-2 h-16 overflow-hidden overflow-ellipsis">{course.name}</h2>
                      <p className="text-sm text-gray-600 mb-2"><strong>Category:</strong> {course.category_name}</p>
                      <p className="text-sm text-gray-600 mb-2"><strong>Instructor:</strong> {course.instructor_name}</p>
                      <p className="text-lg font-semibold text-green-600 mb-4"><strong>Price:</strong> ${course.price_paid}</p>
                      <button 
                        onClick={() => handleViewDetails(course._id)} 
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 mt-auto"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Statistic */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Statistic</h2>
              {user && (
                <div className="flex items-center mb-4">
                  <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">Good Morning, {user.name}</h3>
                    <p className="text-sm text-gray-600">Continue your learning to achieve your target!</p>
                  </div>
                </div>
              )}
              <div className="bg-green-100 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-600 mb-2">32%</p>
                <div className="flex space-x-2">
                  <div className="bg-green-600 h-2 rounded-lg w-1/3"></div>
                  <div className="bg-green-600 h-2 rounded-lg w-1/4"></div>
                  <div className="bg-green-600 h-2 rounded-lg w-1/5"></div>
                </div>
              </div>
            </div>

            {/* Your Mentor */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Your Mentor</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="/path/to/mentor1.jpg" alt="Mentor" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">Padhang Satrio</h3>
                      <p className="text-sm text-gray-600">Mentor</p>
                    </div>
                  </div>
                  <button className="custom-button">Follow</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="/path/to/mentor2.jpg" alt="Mentor" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">Zakir Horizontal</h3>
                      <p className="text-sm text-gray-600">Mentor</p>
                    </div>
                  </div>
                  <button className="custom-button">Follow</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="/path/to/mentor3.jpg" alt="Mentor" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">Leonardo Samsul</h3>
                      <p className="text-sm text-gray-600">Mentor</p>
                    </div>
                  </div>
                  <button className="custom-button">Follow</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
