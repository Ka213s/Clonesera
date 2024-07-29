import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { NT_getCourseDetail, getCourseDetail, createCart, getCart, formatCurrency } from '../../utils/commonImports';
import { message, Button, Card, Tag, Divider, Tooltip, List, Modal, Collapse, Skeleton } from 'antd';
import { PlayCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import 'tailwindcss/tailwind.css';
import ReviewSection from './ReviewSection';
import { useCartContext } from '../../consts/CartContext';
import { toast } from 'react-toastify';

const { Panel } = Collapse;

interface Lesson {
  _id: string;
  name: string;
  lesson_type: string;
  full_time: number;
  position_order: number;
}

interface Session {
  _id: string;
  name: string;
  position_order: number;
  full_time: number;
  lesson_list: Lesson[];
}

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
  video_url: string;
  discount?: number;
  price_paid: number;
  full_time: number;
  content: string;
  session_list: Session[];
  is_in_cart: boolean;
  is_purchased: boolean;
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { setTotalCartItems } = useCartContext();  

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!id) {
        message.error('Course ID is missing');
        navigate('/');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        let data: Course;
        if (token) {
          data = await getCourseDetail(id);
        } else {
          data = await NT_getCourseDetail(id);
        }
        setCourse(data);
      } catch (error) {
        message.error('Error fetching course details');
        console.error('Error fetching course details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to add course to cart');
      return;
    }

    if (course) {
      try {
        await createCart({ course_id: course._id });
        const cartData = await getCart({
          searchCondition: { status: 'new', is_deleted: false },
          pageInfo: { pageNum: 1, pageSize: 10 }
        });
        setTotalCartItems(cartData.pageInfo.totalItems);

        setCourse(prevCourse => {
          if (prevCourse) {
            return {
              ...prevCourse,
              is_in_cart: true,
            };
          }
          return prevCourse;
        });

      } catch (error) {
        message.error('Error adding course to cart');
        console.error('Error adding course to cart:', error);
      }
    }
  };

  const handleViewCart = () => {
    navigate('/view-cart');
  };

  const handleLearnCourse = (lessonId?: string) => {
    if (course) {
      const firstLessonId = lessonId || course.session_list[0]?.lesson_list[0]?._id;
      navigate(`/learn-course-detail/${course._id}/lesson/${firstLessonId}`);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formatFullTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };



  const renderCourseButton = () => {
    if (course?.is_purchased) {
      return (
        <Button
          type="default"
          onClick={() => handleLearnCourse()}
          className="mb-4 custom-button p-4 bg-green-500 text-black hover:bg-green-600"
        >
          Learn Course
        </Button>
      );
    } else {
      return (
        <Button
          type="default"
          onClick={course?.is_in_cart ? handleViewCart : handleAddToCart}
          className="mb-4 custom-button p-4 bg-green-500 text-black hover:bg-blue-600"
        >
          {course?.is_in_cart ? 'View Cart' : 'Add to Cart'}
        </Button>
      );
    }
  };

  const renderPrice = () => {
    if (course?.price === 0) {
      return <span className="ml-2 text-green-500 font-semibold">Free</span>;
    } else if (course?.discount && course.discount > 0) {
      return (
        <>
          <span className="line-through text-gray-500">{formatCurrency(course.price)}</span>
          <span className="ml-2 text-red-500 font-semibold">{formatCurrency(course.price_paid)}</span>
          <Tag color="red" className="ml-2">
            - {course.discount}%
          </Tag>
        </>
      );
    } else {
      return <span className="text-red-500 font-semibold">{formatCurrency(course?.price || 0)}</span>;
    }
  };

  return (
    <div className="container mx-auto p-4 text-sm">
      <Button onClick={() => navigate('/homepage')} className="mb-4 custom-button p-4 bg-green-500 text-black hover:bg-blue-600">
        Back to Homepage
      </Button>
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col md:flex-row items-start">
            <img
              src={course?.image_url || 'https://via.placeholder.com/400'}
              alt={course?.name}
              className="w-full md:w-1/3 object-cover rounded-lg mb-4 md:mb-0"
            />
            <div className="md:ml-4 flex-1">
              <h1 className="text-2xl font-bold mb-4">{course?.name}</h1>
              <Tag color="blue" className="mb-4">
                {course?.category_name}
              </Tag>
              <p className="mb-2">
                <strong>Instructor:</strong>
                <Link to={`/view-profile/${course?.instructor_id}`}>
                  <span className="text-blue-600 font-semibold hover:underline ml-2">{course?.instructor_name}</span>
                </Link>
              </p>
              <p className="mb-2 flex items-center">
                <strong className="mr-2">Price:</strong>
                {renderPrice()}
              </p>
              <p className="mb-2">
                <strong>Full Time:</strong> {formatFullTime(course?.full_time || 0)}
              </p>
              <p className="mb-4">
                <strong>Description:</strong> {course?.description.replace(/<\/?p>/g, '')}
              </p>
              <div className="flex space-x-4 mt-8">
                {renderCourseButton()}
                <Button
                  type="default"
                  icon={<PlayCircleOutlined />}
                  onClick={showModal}
                  className="mb-4 custom-button p-4 bg-green-500 text-black hover:bg-yellow-600"
                >
                  Watch Introduction
                </Button>
              </div>
            </div>
          </div>
        </Skeleton>
        <Divider />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Course Content</h2>
          <Editor
            apiKey="2yifh7kylzpd5szlkd3irl90etvaxhqgknrd2zfbdz4sjeox" 
            initialValue={course?.content || ''}
            init={{
              menubar: false,
              plugins: ['autoresize'],
              toolbar: false,
              autoresize_bottom_margin: 20,
              autoresize_overflow_padding: 10,
              setup: (editor) => {
                editor.on('init', () => {
                  editor.getContainer().style.overflow = 'hidden';
                  editor.getContainer().style.border = 'none'; // Remove the border
                });
              },
            }}
            disabled={true}
          />

          <h2 className="text-xl font-bold mb-4">Course Session</h2>
          <Collapse accordion>
            {course?.session_list.map((session) => (
              <Panel
                header={
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{session.name}</h3>
                    <p>
                      {session.lesson_list.length} lessons • {formatFullTime(session.full_time)}
                    </p>
                  </div>
                }
                key={session._id}
              >
                <List
                  dataSource={session.lesson_list}
                  renderItem={(lesson) => (
                    <List.Item
                      className="flex justify-between items-center cursor-pointer"
                      onClick={course?.is_purchased ? () => handleLearnCourse(lesson._id) : undefined}
                    >
                      <div>
                        <Tooltip title={lesson.lesson_type}>
                          <InfoCircleOutlined className="mr-2" />
                        </Tooltip>
                        {course?.is_purchased ? (
                          <span className="text-blue-600 hover:underline">{lesson.name}</span>
                        ) : (
                          <span>{lesson.name}</span>
                        )}
                      </div>
                      <div>{formatFullTime(lesson.full_time)}</div>
                    </List.Item>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
          <Divider />
          {course?.is_purchased && <ReviewSection courseId={course._id} />}
        </div>
      </Card>
      <Modal title="Course Introduction" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <iframe
          width="100%"
          height="400px"
          src={course?.video_url}
          title={course?.name}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
};

export default CourseDetails;
