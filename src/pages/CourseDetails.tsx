import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseDetail } from '../utils/commonImports';
import { message } from 'antd';
import { createCart } from '../services/Api';

interface Course {
  _id: string;
  name: string;
  category_name: string;
  instructor_name: string;
  status: string;
  price: number;
  description: string;
  image_url: string;
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!id) {
        message.error('Course ID is missing');
        navigate('/');
        return;
      }

      try {
        const data = await getCourseDetail(id);
        setCourse(data);
      } catch (error) {
        message.error('Error fetching course details');
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (course) {
      try {
        await createCart({ course_id: course._id });
      } catch (error) {
        message.error('Error adding course to cart');
        console.error('Error adding course to cart:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>No course details available</div>;
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <p><strong>Category:</strong> {course.category_name}</p>
      <p><strong>Instructor:</strong> {course.instructor_name}</p>
      <p><strong>Status:</strong> {course.status}</p>
      <p><strong>Price:</strong> ${course.price}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <img src={course.image_url} alt={course.name} style={{ width: '200px', height: '200px' }} />
      <button
        onClick={handleAddToCart}
        className="border border-orange-500 bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600"
      >
        Add to Cart
      </button>

    </div>
  );
};

export default CourseDetails;
