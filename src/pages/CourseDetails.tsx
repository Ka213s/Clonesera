import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseDetail, updateSubscribed } from "../utils/commonImports";
import { message, Button, Card, Tag, Divider, Tooltip, List } from "antd";
import { PlayCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";

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
        message.error("Course ID is missing");
        navigate("/");
        return;
      }

      try {
        const data = await getCourseDetail(id);
        setCourse(data);
        setSubscribed(data.subscribed); // Giả sử API trả về trạng thái subscribed
      } catch (error) {
        message.error("Error fetching course details");
        console.error("Error fetching course details:", error);
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
      message.success(
        `Successfully ${subscribed ? "unsubscribed" : "subscribed"}`
      );
    } catch (error) {
      message.error(`Error ${subscribed ? "unsubscribing" : "subscribing"}`);
      console.error(
        `Error ${subscribed ? "unsubscribing" : "subscribing"}:`,
        error
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No course details available
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-start">
          <img
            src={course.image_url || "https://via.placeholder.com/400"}
            alt={course.name}
            className="w-full md:w-1/2 object-cover rounded-lg mb-4 md:mb-0"
          />
          <div className="md:ml-4 flex-1">
            <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
            <Tag color="blue" className="mb-4 text-lg">
              {course.category_name}
            </Tag>
            <p className="mb-2 text-lg">
              <strong>Instructor:</strong> {course.instructor_name}
            </p>
            <p className="mb-2 text-lg">
              <strong>Status:</strong> {course.status}
            </p>
            <p className="mb-2 text-lg">
              <strong>Price:</strong> ${course.price}
              {course.discount > 0 && (
                <span className="ml-2 text-red-500">
                  (Discount: {course.discount}%)
                </span>
              )}
            </p>
            <p className="mb-2 text-lg">
              <strong>Price Paid:</strong> ${course.price_paid}
            </p>
            <p className="mb-2 text-lg">
              <strong>Full Time:</strong> {course.full_time} minutes
            </p>
            <p className="mb-4 text-lg">
              <strong>Description:</strong>{" "}
              {course.description.replace(/<\/?p>/g, "")}
            </p>
            <Button
              type="primary"
              onClick={handleSubscribeToggle}
              className={`mb-4 text-lg custom-button`}
            >
              {subscribed ? "Unsubscribe" : "Subscribe"}
            </Button>
          </div>
        </div>
        <Divider />
        <div className="p-4">
          <h2 className="text-3xl font-bold mb-4">Sessions</h2>
          {course.session_list.map((session) => (
            <Card
              key={session._id}
              className="mb-4 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold">{session.name}</h3>
              <p className="mb-2 text-lg">
                <strong>Full Time:</strong> {session.full_time} minutes
              </p>
              <List
                dataSource={session.lesson_list}
                renderItem={(lesson) => (
                  <List.Item className="text-lg">
                    <Tooltip title={lesson.lesson_type}>
                      <InfoCircleOutlined className="mr-2" />
                    </Tooltip>
                    {lesson.name} - {lesson.full_time} minutes
                  </List.Item>
                )}
              />
            </Card>
          ))}
          <Divider />
          <div className="flex items-center">
            <Button
              type="default"
              icon={<PlayCircleOutlined />}
              href={course.video_url}
              target="_blank"
              className="mr-4 text-lg custom-button"
            >
              Watch Introduction
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseDetails;
