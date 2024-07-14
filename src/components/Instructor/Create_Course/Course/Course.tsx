import React from 'react';
import CreateCourseButton from './CreateCourse';
import DisplayCourse from './DisplayCourse';

const Course: React.FC = () => {
  return (
    <div>
    
      
      {/* Thêm nút tạo course */}
      <CreateCourseButton />
      
      {/* Thêm bảng hiển thị course */}
      <DisplayCourse />
    </div>
  );
};

export default Course;
