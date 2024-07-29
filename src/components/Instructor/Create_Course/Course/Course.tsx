import React, { useState } from 'react';
import CreateCourseButton from './CreateCourse';
import DisplayCourse from './DisplayCourse';
import SendToAdminButton from './SendToAdminButton';

const Course: React.FC = () => {
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  return (
    <div>
      <div className="flex justify-end mb-4">
        <CreateCourseButton />
        <SendToAdminButton courseIds={selectedCourseIds} />
      </div>
      <DisplayCourse setSelectedCourseIds={setSelectedCourseIds} />
    </div>
  );
};

export default Course;
