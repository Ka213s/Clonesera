import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { getLessons } from '../../../utils/commonImports';
import LessonAll from './LessonAll';

interface SessionProps {
  sessions: Session[];
  onBack: () => void;
}

interface Session {
  _id: string;
  name: string;
  course_id: string;
  course_name: string;
  created_at: string;
  description: string;
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

const SessionAll: React.FC<SessionProps> = ({ sessions, onBack }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [view, setView] = useState<'sessions' | 'lessons'>('sessions');

  const sessionColumns: ColumnsType<Session> = [
    { title: 'Session Name', dataIndex: 'name', key: 'name' },
    { title: 'Course Name', dataIndex: 'course_name', key: 'course_name' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleViewLessons(record._id)}>View Lessons</Button>
      ),
    },
  ];

  const handleViewLessons = async (sessionId: string) => {
    const data = await getLessons({ keyword: '', course_id: '', session_id: sessionId, lesson_type: '', is_position_order: false, is_deleted: false }, 1, 10);
    setLessons(data.pageData.map((lesson: any) => ({
      ...lesson,
      session_name: lesson.session_name,
      lesson_type: lesson.lesson_type,
      full_time: lesson.full_time,
      created_at: lesson.created_at,
    })));
    setView('lessons');
  };

  const handleBackToSessions = () => {
    setView('sessions');
  };

  return (
    <div>
      {view === 'sessions' && (
        <>
          <Button onClick={onBack}>Back to Courses</Button>
          <Table columns={sessionColumns} dataSource={sessions} rowKey="_id" />
        </>
      )}
      {view === 'lessons' && (
        <LessonAll lessons={lessons} onBack={handleBackToSessions} />
      )}
    </div>
  );
};

export default SessionAll;
