import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicCourses } from '../utils/commonImports';

interface Course {
  _id: number;
  name: string;
  category_name: string;
  instructor_name: string;
  description: string;
  image_url: string;
  price_paid: number;
}

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
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

  const handleViewDetails = (courseId: number) => {
    navigate(`/course-detail/${courseId}`);
  };

  return (
    <div>
      <h1>HomePage</h1>
      <div>
        {courses.map(course => (
          <div key={course._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h2>{course.name}</h2>
            <p><strong>Category:</strong> {course.category_name}</p>
            <p><strong>Instructor:</strong> {course.instructor_name}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <img src={course.image_url} alt={course.name} style={{ width: '100px', height: '100px' }} />
            <p><strong>Price:</strong> ${course.price_paid}</p>
            <button onClick={() => handleViewDetails(course._id)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
