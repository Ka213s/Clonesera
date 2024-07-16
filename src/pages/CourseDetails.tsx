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
        setSubscribed(data.subscribed);
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
        message.success('Course added to cart successfully');
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
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img className="w-full h-64 object-cover object-center" src={course.image_url} alt={course.name} />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">{course.name}</h1>
          <p className="text-gray-700"><strong>Category:</strong> {course.category_name}</p>
          <p className="text-gray-700"><strong>Instructor:</strong> {course.instructor_name}</p>
          <p className="text-gray-700"><strong>Status:</strong> {course.status}</p>
          <p className="text-gray-700"><strong>Price:</strong> ${course.price}</p>
          <p className="mt-4 text-gray-700"><strong>Description:</strong> {course.description}</p>
          <div className="mt-4">
            <Button onClick={handleSubscribeToggle} className="mr-2">
              {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
            <Button onClick={handleAddToCart} type="primary">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
