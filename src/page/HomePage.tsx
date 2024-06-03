// HomePage.tsx
import React from 'react';
import MainLayout from './MainLayout';
import CourseCard from '../components/CourseCard';
import coursesData from '../models/FileJson/courses.json';
import testimonialsData from '../models/FileJson/testimonials.json';
import instructorsData from '../models/FileJson/instructors.json';
import FeatureButtons from '../components/FeatureButtons';
import InstructorCard from '../components/InstructorCard';
import TestimonialCard from '../components/TestimonialCard';
const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Courses</h1>
        {coursesData.courses.map((course, index) => (
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
        
        <h1 className="text-2xl font-bold mt-8 mb-4">Newest Courses</h1>
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
        <FeatureButtons />
        <h1 className="text-2xl font-bold mt-8 mb-4">Popular Instructors</h1>
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
          <h1 className="text-2xl font-bold mt-8 mb-4">What Our Students Have to Say</h1>
        {testimonialsData.testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            avatar={testimonial.avatar}
            description={testimonial.description}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;
