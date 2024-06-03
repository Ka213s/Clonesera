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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <h1 className="text-3xl font-extrabold mt-12 mb-6 text-gray-800">Newest Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData.newestCourses.map((course, index) => (
            <CourseCard
              key={index}
              name={course.name}
              views={course.views}
              date={course.date}
              description={course.description}
              author={course.author}
              price={course.price}
            />
          ))}
        </div>

        <FeatureButtons />

        <h1 className="text-3xl font-extrabold mt-12 mb-6 text-gray-800">Popular Instructors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorsData.instructors.map((instructor, index) => (
            <InstructorCard
              key={index}
              name={instructor.name}
              avatar={instructor.avatar}
              content={instructor.content}
              social={instructor.social}
              followers={instructor.followers}
              courses={instructor.courses}
            />
          ))}
        </div>

        <h1 className="text-3xl font-extrabold mt-12 mb-6 text-gray-800">What Our Students Have to Say</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              avatar={testimonial.avatar}
              description={testimonial.description}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
