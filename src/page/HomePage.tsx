import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import FeatureButtons from '../components/FeatureButtons';
import InstructorCard from '../components/InstructorCard';
import TestimonialCard from '../components/TestimonialCard';
import CategoryList from '../components/Create_Course/CategoryList';
import BecomeInstructor from '../components/BecomeInstructor';
import coursesData from '../models/FileJson/courses.json';
import testimonialsData from '../models/FileJson/testimonials.json';
import instructorsData from '../models/FileJson/instructors.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage: React.FC = () => {
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-[50%] right-0 transform -translate-y-1/2 -translate-x-1/6 bg-gray-500 rounded-full w-5 h-5 flex justify-center items-center cursor-pointer z-10"
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-[50%] left-2 transform -translate-y-1/2 -translate-x-1/2 bg-gray-500 rounded-full w-5 h-5 flex justify-center items-center cursor-pointer z-10"
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
    appendArrows: document.getElementsByClassName("slick-slider")[0],
  };

  return (
  
      <div className="p-4 grid grid-cols-4 gap-4 bg-[#F7F7F7]">
        <div className="col-span-3">
          <div className="p-4 relative flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-800">Courses</h1>
            <Link to="/home" className="text-[#9997F5] hover:text-[#9997F5] font-bold py-2 px-4 rounded">
              See all
            </Link>
          </div>
          <div className="w-full ">
            <Slider {...settings}>
              {coursesData.courses.map((course, index) => (
                <div key={index} className="px-2 h-full">
                  <Link to={`/course/${course.id}`}>
                    <CourseCard
                      name={course.name}
                      views={course.views}
                      date={course.date}
                      description={course.description}
                      author={course.author}
                      price={course.price}
                    />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
          <div className="p-4 relative flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-800">Newest Courses</h1>
            <Link to="/home" className="text-[#9997F5] hover:text-[#9997F5] font-bold py-2 px-4 rounded">
              See all
            </Link>
          </div>
          <div className="w-full">
            <Slider {...settings}>
              {coursesData.newestCourses.map((course, index) => (
                <div key={index} className="px-2">
                  <Link to={`/course/${course.id}`}>
                    <CourseCard
                      name={course.name}
                      views={course.views}
                      date={course.date}
                      description={course.description}
                      author={course.author}
                      price={course.price}
                    />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
          <FeatureButtons />
          <div className="p-4 relative flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-800">Popular Instructors</h1>
            <Link to="/home" className="text-[#9997F5] hover:text-[#9997F5] font-bold py-2 px-4 rounded">
              See all
            </Link>
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
          <div className="p-4 relative flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-800">What Our Students Have to Say</h1>
            <Link to="/home" className="text-[#9997F5] hover:text-[#9997F5] font-bold py-2 px-4 rounded">
              See all
            </Link>
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
        </div>
        <div className="col-span-1">
          <CategoryList />
          <BecomeInstructor />
        </div>
      </div>
   
  );
};

export default HomePage;
