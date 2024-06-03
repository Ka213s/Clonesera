import React from 'react';
import Slider from 'react-slick';
import MainLayout from './MainLayout';
import CourseCard from '../components/CourseCard';
import coursesData from '../models/FileJson/courses.json';
import testimonialsData from '../models/FileJson/testimonials.json';
import instructorsData from '../models/FileJson/instructors.json';
import FeatureButtons from '../components/FeatureButtons';
import InstructorCard from '../components/InstructorCard';
import TestimonialCard from '../components/TestimonialCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HomePage: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };


  return (
    <MainLayout>
      <div className="p-4">
        <div className="p-4 relative flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800">Courses</h1>
          <button className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded">
            See all
          </button>
        </div>
        <div className="grid grid-cols-1">
          <Slider {...settings}>
            {coursesData.courses.map((course, index) => (
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
        <div className="p-4 relative flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800">Newest Courses</h1>
          <button className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded">
            See all
          </button>
        </div>
        <div className="grid grid-cols-1">
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
        <div className="p-4 relative flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800">Popular Instructors</h1>
          <button className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded">
            See all
          </button>
        </div>
        <div className="grid grid-cols-1">
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
          <button className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded">
            See all
          </button>
        </div>
        <div className="grid grid-cols-1">
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

    </MainLayout>
  );
};

export default HomePage;
