// Lesson.tsx
import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface LessonProps {
  lessons: Lesson[];
}

interface Lesson {
  _id: string;
  name: string;
  session_id: string;
  // Add other fields as needed
}

const Lesson: React.FC<LessonProps> = ({ lessons }) => {
  const lessonColumns: ColumnsType<Lesson> = [
    { title: 'Lesson Name', dataIndex: 'name', key: 'name' },
    // Add other columns as needed
  ];

  return (
    <div>
      <h2>Lessons</h2>
      <Table columns={lessonColumns} dataSource={lessons} rowKey="_id" />
    </div>
  );
};

export default Lesson;
