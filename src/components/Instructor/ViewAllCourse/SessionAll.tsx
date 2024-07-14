// Session.tsx
import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { getLessons } from '../../../utils/commonImports';
import LessonAll from './LessonAll';

interface SessionProps {
  sessions: Session[];
}

interface Session {
  _id: string;
  name: string;
  course_id: string;
  // Add other fields as needed
}

interface Lesson {
  _id: string;
  name: string;
  session_id: string;
  // Add other fields as needed
}

const Session: React.FC<SessionProps> = ({ sessions }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const sessionColumns: ColumnsType<Session> = [
    { title: 'Session Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleViewLessons(record._id)}>View Lessons</Button>
      ),
    },
  ];

  const handleViewLessons = async (sessionId: string) => {
    setSelectedSessionId(sessionId);
    const data = await getLessons({ keyword: '', course_id: '', session_id: sessionId, lesson_type: '', is_position_order: false, is_deleted: false }, 1, 10);
    setLessons(data.pageData);
  };

  return (
    <div>
      <h2>Sessions</h2>
      <Table columns={sessionColumns} dataSource={sessions} rowKey="_id" />
      {selectedSessionId && (
        <LessonAll lessons={lessons} />
      )}
    </div>
  );
};

export default Session;
