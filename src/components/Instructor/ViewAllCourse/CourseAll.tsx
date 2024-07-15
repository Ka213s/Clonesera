import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { getCourses, getSessions } from '../../../utils/commonImports';
import SessionAll from './SessionAll';

interface Course {
  _id: string;
  name: string;
  category_name: string;
  status: string;
  price: number;
  created_at: string;
}

interface Session {
  _id: string;
  name: string;
  course_id: string;
  course_name: string;
  created_at: string;
  description: string;
  is_deleted: boolean;
}

const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [view, setView] = useState<'courses' | 'sessions'>('courses');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses({ keyword: '', category: '', status: '', is_deleted: false }, 1, 10);
    setCourses(data.pageData);
  };

  const fetchSessions = async (courseId: string) => {
    const data = await getSessions({ keyword: '', course_id: courseId, is_position_order: false, is_deleted: false }, 1, 10);
    setSessions(data.pageData);
  };

  const courseColumns: ColumnsType<Course> = [
    { title: 'Course Name', dataIndex: 'name', key: 'name' },
    { title: 'Category Name', dataIndex: 'category_name', key: 'category_name' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleViewSessions(record._id)}>View Sessions</Button>
      ),
    },
  ];

  const handleViewSessions = (courseId: string) => {
    fetchSessions(courseId);
    setView('sessions');
  };

  const handleBackToCourses = () => {
    setView('courses');
  };

  return (
    <div>
      {view === 'courses' && (
        <Table columns={courseColumns} dataSource={courses} rowKey="_id" />
      )}
      {view === 'sessions' && (
        <SessionAll sessions={sessions} onBack={handleBackToCourses} />
      )}
    </div>
  );
};

export default CourseTable;
