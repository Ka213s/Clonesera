import React from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface LessonProps {
  lessons: Lesson[];
  onBack: () => void;
}

interface Lesson {
  _id: string;
  name: string;
  session_id: string;
  session_name: string;
  lesson_type: string;
  full_time: number;
  created_at: string;
}

const LessonAll: React.FC<LessonProps> = ({ lessons, onBack }) => {
  const lessonColumns: ColumnsType<Lesson> = [
    { title: 'Lesson Name', dataIndex: 'name', key: 'name' },
    { title: 'Session Name', dataIndex: 'session_name', key: 'session_name' },
    { title: 'Lesson Type', dataIndex: 'lesson_type', key: 'lesson_type' },
    { title: 'Full Time', dataIndex: 'full_time', key: 'full_time' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
  ];

  return (
    <div>
      <Button onClick={onBack}>Back to Sessions</Button>
      <Table columns={lessonColumns} dataSource={lessons} rowKey="_id" />
    </div>
  );
};

export default LessonAll;
