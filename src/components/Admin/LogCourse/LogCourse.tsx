import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { getCourses, getCourseLogs } from '../../../utils/commonImports';

interface Course {
  _id: string;
  name: string;
  category: string;
  status: string;
  is_deleted: boolean;
}

interface Log {
  _id: string;
  course_id: string;
  old_status: string;
  new_status: string;
  comment: string;
}

const LogCourse: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCoursesAndLogs = async () => {
      try {
        // Fetch courses
        const coursesData = await getCourses(
          { keyword: '', category: '', status: '', is_deleted: false },
          1,
          10
        );
        console.log('Courses Data:', coursesData);

        if (coursesData && coursesData.pageData) {
          setCourses(coursesData.pageData);

          // Extract course IDs
          const courseIds: string[] = coursesData.pageData.map((course: Course) => course._id);

          // Fetch logs for each course ID
          const logsDataPromises = courseIds.map((courseId: string) =>
            getCourseLogs({
              searchCondition: { course_id: courseId },
              pageInfo: { pageNum: 1, pageSize: 10 }
            })
          );

          const logsDataArray = await Promise.all(logsDataPromises);
          console.log('Logs Data Array:', logsDataArray);

          const allLogs = logsDataArray.flatMap((logData) => logData.pageData);
          setLogs(allLogs);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCoursesAndLogs();
  }, []);

  const getStatusTag = (status: string) => {
    let color;
    switch (status) {
      case 'new':
        color = 'blue';
        break;
      case 'waiting_approve':
        color = 'orange';
        break;
      case 'approve':
        color = 'green';
        break;
      case 'reject':
        color = 'red';
        break;
      case 'active':
        color = 'green';
        break;
      case 'inactive':
        color = 'gray';
        break;
      default:
        color = 'blue';
        break;
    }
    return <Tag color={color}>{status}</Tag>;
  };

  const getCourseName = (courseId: string) => {
    const course = courses.find((course) => course._id === courseId);
    return course ? course.name : 'Unknown';
  };

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'course_id',
      key: 'course_id',
      render: (text: string) => getCourseName(text),
    },
    {
      title: 'Old Status',
      dataIndex: 'old_status',
      key: 'old_status',
      render: (text: string) => getStatusTag(text),
    },
    {
      title: 'New Status',
      dataIndex: 'new_status',
      key: 'new_status',
      render: (text: string) => getStatusTag(text),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={logs} rowKey="_id" />
    </div>
  );
};

export default LogCourse;
