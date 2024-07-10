import React from 'react';
import CreateCourseButton from './CreateCourseButton';
import CourseTable from './CourseTable';

const Course: React.FC = () => {
  return (
    <div>
    
      
      {/* Thêm nút tạo course */}
      <CreateCourseButton />
      
      {/* Thêm bảng hiển thị course */}
      <CourseTable />
    </div>
  );
};

export default Course;
