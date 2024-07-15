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
}

const LessonAll: React.FC<LessonProps> = ({ lessons, onBack }) => {
  const lessonColumns: ColumnsType<Lesson> = [
    { title: 'Lesson Name', dataIndex: 'name', key: 'name' },
  ];

  return (
    <div>
      <Button onClick={onBack}>Back to Sessions</Button>
      <h2>Lessons</h2>
      <Table columns={lessonColumns} dataSource={lessons} rowKey="_id" />
    </div>
  );
};

export default LessonAll;
