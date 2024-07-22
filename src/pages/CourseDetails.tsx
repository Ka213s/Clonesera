import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NT_getCourseDetail, getCourseDetail, createCart } from "../utils/commonImports";
import { message, Button, Card, Tag, Divider, Tooltip, List, Modal, Collapse } from "antd";
import { PlayCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Editor } from '@tinymce/tinymce-react';
import "tailwindcss/tailwind.css";
import ReviewSection from "./ReviewSection";

const { Panel } = Collapse;

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
  discount: number;
  price_paid: number;
  full_time: number;
  content: string;
  session_list: {
    _id: string;
    name: string;
    position_order: number;
    full_time: number;
    lesson_list: {
      _id: string;
      name: string;
      lesson_type: string;
      full_time: number;
      position_order: number;
    }[];
  }[];
  is_in_cart: boolean;
  is_purchased: boolean;
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!id) {
        message.error("Course ID is missing");
        navigate("/");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        let data;
        if (token) {
          data = await getCourseDetail(id);
        } else {
          data = await NT_getCourseDetail(id);
        }
        setCourse(data);
      } catch (error) {
        message.error("Error fetching course details");
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetail();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (course) {
      try {
        await createCart({ course_id: course._id });
        message.success('Course added to cart successfully');
        setCourse(prevCourse => {
          if (prevCourse) {
            return {
              ...prevCourse,
              is_in_cart: true
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLearnCourse = () => {
    if (course) {
      navigate(`/learn-course-detail/${course._id}`);
    }
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen text-sm">
        No course details available
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-sm">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-start">
          <img
            src={course.image_url || "https://via.placeholder.com/400"}
            alt={course.name}
            className="w-full md:w-1/3 object-cover rounded-lg mb-4 md:mb-0"
          />
          <div className="md:ml-4 flex-1">
            <h1 className="text-2xl font-bold mb-4">{course.name}</h1>
            <Tag color="blue" className="mb-4">
              {course.category_name}
            </Tag>
            <p className="mb-2">
              <strong>Instructor:</strong>
              <Link to={`/view-profile/${course.instructor_id}`}>
                <span className="text-blue-600 font-semibold hover:underline ml-2">{course.instructor_name}</span>
              </Link>
            </p>
            <p className="mb-2 flex items-center">
              <strong className="mr-2">Price:</strong>
              <span className="line-through text-gray-500">
                ${course.price}
              </span>
              <span className="ml-2 text-red-500 font-semibold">
                ${course.price_paid}
              </span>
              {course.discount > 0 && (
                <Tag color="red" className="ml-2">
                  - {course.discount}%
                </Tag>
              )}
            </p>
            <p className="mb-2">
              <strong>Full Time:</strong> {course.full_time} minutes
            </p>
            <p className="mb-4">
              <strong>Description:</strong>{" "}
              {course.description.replace(/<\/?p>/g, "")}
            </p>
            <div className="flex space-x-4 mt-8">
              {(!course.is_purchased) && (
                <Button
                  type="default"
                  onClick={handleAddToCart}
                  className="mb-4 custom-button p-4 bg-blue-500 text-white hover:bg-blue-600"
                >
                  Add to Cart
                </Button>
              )}
              {(course.is_purchased) && (
                <Button
                  type="default"
                  onClick={handleLearnCourse}
                  className="mb-4 custom-button p-4 bg-green-500 text-white hover:bg-green-600"
                >
                  Learn Course
                </Button>
              )}
              <Button
                type="default"
                icon={<PlayCircleOutlined />}
                onClick={showModal}
                className="mb-4 custom-button p-4 bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Watch Introduction
              </Button>
            </div>
          </div>
        </div>
        <Divider />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Course Content</h2>
          <Editor
            apiKey="2yifh7kylzpd5szlkd3irl90etvaxhqgknrd2zfbdz4sjeox" // Replace with your actual TinyMCE API key
            initialValue={course.content || ''}
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
              }
            }}
            disabled={true}
          />

          <h2 className="text-xl font-bold mb-4">Course Session</h2>
          <Collapse accordion>
            {course.session_list.map((session) => (
              <Panel
                header={
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{session.name}</h3>
                    <p>
                      {session.lesson_list.length} lessons • {session.full_time} minutes
                    </p>
                  </div>
                }
                key={session._id}
              >
                <List
                  dataSource={session.lesson_list}
                  renderItem={(lesson) => (
                    <List.Item className="flex justify-between items-center">
                      <div>
                        <Tooltip title={lesson.lesson_type}>
                          <InfoCircleOutlined className="mr-2" />
                        </Tooltip>
                        {lesson.name}
                      </div>
                      <div>
                        {lesson.full_time} minutes
                      </div>
                    </List.Item>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
          <Divider />
          {course.is_purchased && <ReviewSection courseId={course._id} />}
        </div>
      </Card>
      <Modal
        title="Course Introduction"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <iframe
          width="100%"
          height="400px"
          src={course.video_url}
          title={course.name}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
};

export default CourseDetails;
