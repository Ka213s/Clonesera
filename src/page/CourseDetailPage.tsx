import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import coursesData from '../models/FileJson/courses.json';
import MainLayout from '../layouts/MainLayout';

interface Course {
  id: string;
  name: string;
  views: number;
  date: string;
  description: string;
  author: string;
  price: number;
  vid: string;
}

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | undefined>(undefined);

  // Tìm khóa học trong danh sách courses
  const findCourse = (id: string): Course | undefined => {
    return coursesData.courses.find(course => course.id === id);
  };

  // Tìm khóa học trong danh sách newestCourses
  const findNewestCourse = (id: string): Course | undefined => {
    return coursesData.newestCourses.find(course => course.id === id);
  };

  // Kiểm tra khóa học trong cả courses và newestCourses
  const loadCourse = (id: string): Course | undefined => {
    return findCourse(id) || findNewestCourse(id);
  };

  // Load khóa học ban đầu
  useEffect(() => {
    const loadedCourse = loadCourse(courseId!); // Sử dụng ! để bỏ qua lỗi undefined
    if (loadedCourse) {
      setCourse(loadedCourse);
    } else {
      setCourse(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]); // Xóa `loadCourse` khỏi mảng dependency để loại bỏ cảnh báo

  if (!course) {
    return <div>Không tìm thấy khóa học.</div>;
  }

  return (
    <MainLayout>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-gray-800">{course.name}</h1>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-sm text-gray-500">Ngày đăng: {course.date}</p>
            <p className="text-sm text-gray-500">Tác giả: {course.author}</p>
            <p className="text-sm text-gray-500">Lượt xem: {course.views}</p>
            <p className="text-lg font-bold text-gray-900">Giá: ${course.price.toFixed(2)}</p>
          </div>
          <div className="aspect-w-16 aspect-h-9">
            <video controls className="w-full h-full object-cover rounded-lg shadow-lg" poster={course.vid}>
              <source src={`https://path.to/videos/${course.id}.mp4`} type="video/mp4" />
              {/* Fallback for browsers that don't support HTML5 video */}
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetailPage;
