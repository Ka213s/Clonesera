import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Modal, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { changeCourseStatus, getCourses, getSessions, getLessons } from '../../../utils/commonImports';
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
const { Option } = Select;

const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses({ keyword: '', category: '', status: true, is_deleted: false }, 1, 10);
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

  const handleChangeStatus = async () => {
    if (selectedCourse) {
      await changeCourseStatus({ course_id: selectedCourse._id, new_status: newStatus, comment });
      setIsModalVisible(false);
      fetchCourses(); // Refresh courses after status change
    }
  };

  const showStatusModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const courseColumns: ColumnsType<Course> = [
    { title: 'Course Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_, course) => (
        <Button onClick={() => showStatusModal(course)}>Change Status</Button>
      ),
    },
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
    <>
      <Table
        columns={courseColumns}
        dataSource={courses}
        rowKey="_id"
        expandable={{ expandedRowRender, onExpand: handleExpand }}
      />
      <Modal
        title="Change Course Status"
        visible={isModalVisible}
        onOk={handleChangeStatus}
        onCancel={() => setIsModalVisible(false)}
      >
        <Select
          placeholder="Select new status"
          style={{ width: '100%', marginBottom: '1rem' }}
          onChange={value => setNewStatus(value)}
        >
          <Option value="approve">Approve</Option>
          <Option value="reject">Reject</Option>
         
        </Select>
        <Input.TextArea
          placeholder="Add a comment (optional)"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default CourseTable;
