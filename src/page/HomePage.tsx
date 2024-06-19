import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel'; // Import CarouselRef type
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'; // Import icons
import CourseCard from '../components/CourseCard';
import FeatureButtons from '../components/FeatureButtons';
import InstructorCard from '../components/InstructorCard';
import TestimonialCard from '../components/TestimonialCard';
import CategoryList from '../components/Create_Course/CategoryList';
import BecomeInstructor from '../components/BecomeInstructor';
import coursesData from '../models/FileJson/courses.json';
import testimonialsData from '../models/FileJson/testimonials.json';
import instructorsData from '../models/FileJson/instructors.json';


const HomePage: React.FC = () => {
  const coursesCarouselRef = useRef<CarouselRef>(null);
  const newestCoursesCarouselRef = useRef<CarouselRef>(null);
  const instructorsCarouselRef = useRef<CarouselRef>(null);
  const testimonialsCarouselRef = useRef<CarouselRef>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <div className="p-4 grid grid-cols-10 gap-4 bg-[#F7F7F7]">
      <div className="col-span-8">
        <div className="p-4 relative flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800">Courses</h1>
          <Link to="/home" className="text-[#9997F5] hover:text-[#9997F5] font-bold py-2 px-4 rounded">
            See all
          </Link>
        </div>
        <div className="w-full relative">
          <Carousel ref={coursesCarouselRef} {...settings}>
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
          </Carousel>
          <CaretLeftOutlined
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 text-2xl cursor-pointer"
            onClick={() => coursesCarouselRef.current?.prev()}
          />
          <CaretRightOutlined
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 text-2xl cursor-pointer"
            onClick={() => coursesCarouselRef.current?.next()}
          />
        </div>
        <div className="p-4 relative flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800">Newest Courses</h1>
          <Link to="/home" className="text-[#9997F5] hover:text-[#9997F5] font-bold py-2 px-4 rounded">
            See all
          </Link>
        </div>
        <div className="w-full relative">
          <Carousel ref={newestCoursesCarouselRef} {...settings}>
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
          </Carousel>
          <CaretLeftOutlined
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 text-2xl cursor-pointer"
            onClick={() => newestCoursesCarouselRef.current?.prev()}
          />
          <CaretRightOutlined
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 text-2xl cursor-pointer"
            onClick={() => newestCoursesCarouselRef.current?.next()}
          />
        </div>
        <FeatureButtons />
        <div className="p-4 relative flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800">Popular Instructors</h1>
          <Link to="/home" className="text-[#9997F5] hover:text-[#9997F5] font-bold py-2 px-4 rounded">
            See all
          </Link>
        </div>
        <div className="w-full relative">
          <Carousel ref={instructorsCarouselRef} {...settings}>
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
          </Carousel>
          <CaretLeftOutlined
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 text-2xl cursor-pointer"
            onClick={() => instructorsCarouselRef.current?.prev()}
          />
          <CaretRightOutlined
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 text-2xl cursor-pointer"
            onClick={() => instructorsCarouselRef.current?.next()}
          />
        </div>
        <div className="p-4 relative flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800">What Our Students Have to Say</h1>
          <Link to="/home" className="text-[#9997F5] hover:text-[#9997F5] font-bold py-2 px-4 rounded">
            See all
          </Link>
        </div>
        <div className="w-full relative">
          <Carousel ref={testimonialsCarouselRef} {...settings}>
            {testimonialsData.testimonials.map((testimonial, index) => (
              <div key={index} className="px-2">
                <TestimonialCard
                  name={testimonial.name}
                  avatar={testimonial.avatar}
                  description={testimonial.description}
                />
              </div>
            ))}
          </Carousel>
          <CaretLeftOutlined
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 text-2xl cursor-pointer"
            onClick={() => testimonialsCarouselRef.current?.prev()}
          />
          <CaretRightOutlined
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 text-2xl cursor-pointer"
            onClick={() => testimonialsCarouselRef.current?.next()}
          />
        </div>
      </div>
      <div className="col-span-2">
        <CategoryList />
        <BecomeInstructor />
      </div>
    </div>
  );
};

export default HomePage;