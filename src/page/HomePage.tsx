import React, { useState } from 'react';
import Slider from 'react-slick';
import MainLayout from '../layouts/MainLayout';
import CourseCard from '../components/CourseCard';
import FeatureButtons from '../components/FeatureButtons';
import InstructorCard from '../components/InstructorCard';
import TestimonialCard from '../components/TestimonialCard';
import CategoryList from '../components/Create_Course/CategoryList';
import BecomeInstructor from '../components/BecomeInstructor';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import JSON data
import coursesData from '../models/FileJson/courses.json';
import testimonialsData from '../models/FileJson/testimonials.json';
import instructorsData from '../models/FileJson/instructors.json';

const HomePage: React.FC = () => {
  const [isTestSectionOpen, setIsTestSectionOpen] = useState(false);

  const handleTestSectionToggle = () => {
    setIsTestSectionOpen(!isTestSectionOpen);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <MainLayout>
      <div className="p-4 grid grid-cols-4 gap-4 bg-[#F7F7F7]">
        <div className="col-span-3">
          {/* Courses Section */}
          <div className="p-4 relative flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-800">Courses</h1>
            <button className="text-[#9997F5] hover:text-[#8886E5] font-bold py-2 px-4 rounded">
              See all
            </button>
          </div>
          <div className="w-full ">
            <Slider {...settings}>
              {coursesData.courses.map((course, index) => (
                <div key={index} className="px-2 h-full">
                  <CourseCard
                    name={course.name}
                    views={course.views}
                    date={course.date}
                    description={course.description}
                    author={course.author}
                    price={course.price}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Newest Courses Section */}
          <div className="p-4 relative flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-800">Newest Courses</h1>
            <button className="text-[#9997F5] hover:text-[#8886E5] font-bold py-2 px-4 rounded">
              See all
            </button>
          </div>
          <div className="w-full">
            <Slider {...settings}>
              {coursesData.newestCourses.map((course, index) => (
                <div key={index} className="px-2">
                  <CourseCard
                    name={course.name}
                    views={course.views}
                    date={course.date}
                    description={course.description}
                    author={course.author}
                    price={course.price}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <FeatureButtons />

          {/* Popular Instructors Section */}
          <div className="p-4 relative flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-800">Popular Instructors</h1>
            <button className="text-[#9997F5] hover:text-[#8886E5] font-bold py-2 px-4 rounded">
              See all
            </button>
          </div>
          <div className="w-full">
            <Slider {...settings}>
              {instructorsData.instructors.map((instructor, index) => (
                <div key={index} className="px-2">
                  <InstructorCard
                    name={instructor.name}
                    avatar={instructor.avatar}
                    content={instructor.content}
                    social={instructor.social}
                    followers={instructor.followers}
                    courses={instructor.courses}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Testimonials Section */}
          <div className="p-4 relative flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-800">What Our Students Have to Say</h1>
            <button className="text-[#9997F5] hover:text-[#8886E5] font-bold py-2 px-4 rounded">
              See all
            </button>
          </div>
          <div className="w-full">
            <Slider {...settings}>
              {testimonialsData.testimonials.map((testimonial, index) => (
                <div key={index} className="px-2">
                  <TestimonialCard
                    name={testimonial.name}
                    avatar={testimonial.avatar}
                    description={testimonial.description}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Test Section */}
          <div className="p-4 relative flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-800">Tests</h1>
            <button 
              onClick={handleTestSectionToggle}
              className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded"
            >
              {isTestSectionOpen ? 'Hide' : 'See all'}
            </button>
          </div>
          {isTestSectionOpen && (
            <div className="pl-8 space-y-2">
              <Link to="/tests/certification-center" className="text-blue-500 hover:text-blue-700">
                Certification Center
              </Link>
              <Link to="/tests/certification-fill-form" className="text-blue-500 hover:text-blue-700">
                Certification Fill Form
              </Link>
              <Link to="/tests/certification-test-view" className="text-blue-500 hover:text-blue-700">
                Test View
              </Link>
              <Link to="/tests/certification-test-result" className="text-blue-500 hover:text-blue-700">
                Test Result
              </Link>
              <Link to="/student_my_certificates" className="text-blue-500 hover:text-blue-700">
                My Certification
              </Link>
            </div>
          )}
        </div>
        
        <div className="col-span-1">
          <CategoryList />
          <BecomeInstructor />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
