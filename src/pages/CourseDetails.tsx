import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseDetail, updateSubscribed, createCart } from '../utils/commonImports';
import { message, Button } from 'antd';

interface Course {
  _id: string;
  name: string;
  category_name: string;
  instructor_name: string;
  instructor_id: string; 
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
  const [subscribed, setSubscribed] = useState<boolean>(false);

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
        setSubscribed(data.subscribed); // Giả sử API trả về trạng thái subscribed
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

  const handleSubscribeToggle = async () => {
    if (!course) {
      return;
    }

    try {
      await updateSubscribed(course.instructor_id);
      setSubscribed(!subscribed);
      message.success(`Successfully ${subscribed ? 'unsubscribed' : 'subscribed'}`);
    } catch (error) {
      message.error(`Error ${subscribed ? 'unsubscribing' : 'subscribing'}`);
      console.error(`Error ${subscribed ? 'unsubscribing' : 'subscribing'}:`, error);
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
      <Button onClick={handleSubscribeToggle}>
        {subscribed ? 'Unsubscribe' : 'Subscribe'}
      </Button>
      <Button
        onClick={handleAddToCart}
        className="border border-orange-500 bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default CourseDetails;
