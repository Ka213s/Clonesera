import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { getCourses, getSessions, getLessons } from '../../../utils/commonImports';

interface Course {
  _id: string;
  name: string;
  sessions?: Session[];
}

interface Session {
  _id: string;
  name: string;
  course_id: string;
  lessons?: Lesson[];
}

interface Lesson {
  _id: string;
  name: string;
  session_id: string;
}

const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    console.log('fetchCourses');
    const data = await getCourses({ keyword: '', category: '', status: '', is_deleted: false }, 1, 10);
    setCourses(data.pageData);
  
  };

  const fetchSessions = async (courseId: string) => {
    const data = await getSessions({ keyword: '', course_id: courseId, is_position_order: false, is_deleted: false }, 1, 10);
    return data.pageData;
  };

  const fetchLessons = async (sessionId: string) => {
    const data = await getLessons({ keyword: '', course_id: '', session_id: sessionId, lesson_type: '', is_position_order: false, is_deleted: false }, 1, 10);
    return data.pageData;
  };

  const handleExpand = async (expanded: boolean, course: Course) => {
    if (expanded && !course.sessions) {
      const sessions = await fetchSessions(course._id);
      setCourses(prevCourses =>
        prevCourses.map(c =>
          c._id === course._id ? { ...c, sessions } : c
        )
      );
    }
  };

  const handleSessionExpand = async (expanded: boolean, session: Session, courseId: string) => {
    if (expanded && !session.lessons) {
      const lessons = await fetchLessons(session._id);
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course._id === courseId
            ? {
                ...course,
                sessions: course.sessions?.map(s =>
                  s._id === session._id ? { ...s, lessons } : s
                ),
              }
            : course
        )
      );
    }
  };

  const courseColumns: ColumnsType<Course> = [
    { title: 'Course Name', dataIndex: 'name', key: 'name' },
  ];

  const sessionColumns: ColumnsType<Session> = [
    { title: 'Session Name', dataIndex: 'name', key: 'name' },
  ];

  const lessonColumns: ColumnsType<Lesson> = [
    { title: 'Lesson Name', dataIndex: 'name', key: 'name' },
  ];

  const expandedRowRender = (course: Course) => (
    <Table
      columns={sessionColumns}
      dataSource={course.sessions}
      rowKey="_id"
      expandable={{
        expandedRowRender: session => (
          <Table
            columns={lessonColumns}
            dataSource={session.lessons}
            rowKey="_id"
            pagination={false}
          />
        ),
        onExpand: (expanded, record) => handleSessionExpand(expanded, record, course._id),
      }}
      pagination={false}
    />
  );

  return (
    <Table
      columns={courseColumns}
      dataSource={courses}
      rowKey="_id"
      expandable={{ expandedRowRender, onExpand: handleExpand }}
    />
  );
};

export default CourseTable;
