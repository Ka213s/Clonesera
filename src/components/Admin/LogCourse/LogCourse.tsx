import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
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

  const columns = [
    {
      title: 'Log ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Course ID',
      dataIndex: 'course_id',
      key: 'course_id',
    },
    {
      title: 'Old Status',
      dataIndex: 'old_status',
      key: 'old_status',
    },
    {
      title: 'New Status',
      dataIndex: 'new_status',
      key: 'new_status',
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
