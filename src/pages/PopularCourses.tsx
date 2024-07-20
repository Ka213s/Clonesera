import React from 'react';
import { Tag } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

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

interface PopularCoursesProps {
    courses: Course[];
    currentIndex: number;
    handlePrevClick: () => void;
    handleNextClick: () => void;
    handleViewDetails: (courseId: number) => void;
    isAnimating: boolean;
}

const PopularCourses: React.FC<PopularCoursesProps> = ({
    courses,
    currentIndex,
    handlePrevClick,
    handleNextClick,
    handleViewDetails,
    isAnimating,
}) => {
    return (
        <div className="relative">
            <h2 className="text-3xl font-bold mb-6 text-center">Popular Courses</h2>
            <div className="relative">
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrevClick}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-300 transition duration-300 z-10"
                    >
                        <LeftOutlined className="text-xl" />
                    </button>
                )}
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 transition-transform duration-300 ${
                        isAnimating ? 'transform -translate-x-full' : ''
                    }`}
                >
                    {courses.slice(currentIndex, currentIndex + 3).map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transition-transform transform hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src={course.image_url}
                                alt={course.name}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-2xl font-semibold mb-3 h-20 overflow-hidden overflow-ellipsis">
                                    {course.name}
                                </h2>
                                <p className="text-sm text-gray-600 mb-3">
                                    <Tag color="blue">
                                        {course.category_name || 'Default Category'}
                                    </Tag>
                                </p>
                                <div className="flex items-center mb-3">
                                    {course.avatar ? (
                                        <img
                                            src={course.avatar}
                                            alt={course.instructor_name}
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                                            <span className="text-xs text-gray-600">No Avatar</span>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-700">
                                        <strong>{course.instructor_name}</strong>
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="text-lg font-semibold text-green-600">
                                        <span className="text-3xl">${course.price_paid}.00</span>
                                        <span className="text-sm text-gray-500 ml-2">/year</span>
                                    </div>
                                    <button
                                        onClick={() => handleViewDetails(course._id)}
                                        className="bg-green-600 text-white py-2 px-5 rounded-md hover:bg-green-700 transition duration-300"
                                    >
                                        Join Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {currentIndex + 3 < courses.length && (
                    <button
                        onClick={handleNextClick}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-300 transition duration-300 z-10"
                    >
                        <RightOutlined className="text-xl" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PopularCourses;
