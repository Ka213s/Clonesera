import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { getLessons } from '../../../utils/commonImports';
import LessonAll from './LessonAll';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment';

interface SessionProps {
  sessions: Session[];
  onBack: () => void;
}

interface Session {
  _id: string;
  name: string;
  course_id: string;
  created_at: string;
  is_deleted: boolean;
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
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (date: string) => moment(date).format('DD-MM-YYYY') },
    { title: 'Is Deleted', dataIndex: 'is_deleted', key: 'is_deleted', render: (is_deleted: boolean) => (is_deleted ? 'Yes' : 'No') },
    {
      title: 'View Lesson',
      key: 'action',
      render: (_, record) => (
        <Button icon={<EyeOutlined />} onClick={() => handleViewLessons(record._id)} />
      ),
    },
  ];

  const handleViewLessons = async (sessionId: string) => {
    const data = await getLessons({
      keyword: '',
      course_id: '',
      session_id: sessionId,
      lesson_type: '',
      is_position_order: false,
      is_deleted: false
    }, 1, 10);

    // Log the API response to the console
    console.log('API response:', data);

    setLessons(data.pageData.map((lesson: Lesson) => ({
      _id: lesson._id,
      name: lesson.name,
      session_id: lesson.session_id,
      session_name: lesson.session_name,
      lesson_type: lesson.lesson_type,
      full_time: lesson.full_time,
      created_at: lesson.created_at,
    })));
    console.log('Lessons:', lessons);
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
