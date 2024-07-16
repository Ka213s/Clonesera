import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseDetail, updateSubscribed } from '../utils/commonImports';
import { message, Button } from 'antd';

interface Course {
  _id: string;
  name: string;
  category_name: string;
  instructor_name: string;
  instructor_id: string; // Thêm trường này để lấy từ API
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
    </div>
  );
};

export default CourseDetails;
