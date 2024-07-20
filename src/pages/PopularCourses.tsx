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
        <div>
            <h2 className="text-2xl font-bold mb-4">Popular Courses</h2>
            <div className="relative">
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrevClick}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
                    >
                        <LeftOutlined />
                    </button>
                )}
                <div
                    className={`grid grid-cols-3 gap-4 pb-4 transition-transform duration-300 ${
                        isAnimating ? 'transform -translate-x-full' : ''
                    }`}
                >
                    {courses.slice(currentIndex, currentIndex + 3).map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                        >
                            <img
                                src={course.image_url}
                                alt={course.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold mb-2 h-16 overflow-hidden overflow-ellipsis">
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
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
                                            <span className="text-xs text-gray-600">No Avatar</span>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-600">
                                        <strong>{course.instructor_name}</strong>
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-lg font-semibold text-green-600">
                                        <span className="ml-2 text-2xl text-black">
                                            ${course.price_paid}.00
                                        </span>
                                        <span className="text-sm text-gray-500 ml-1">/year</span>
                                    </div>
                                    <button
                                        onClick={() => handleViewDetails(course._id)}
                                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
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
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
                    >
                        <RightOutlined />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PopularCourses;
