import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { getLessons } from '../../../../utils/commonImports';
import UpdateLesson from './EditLesson';
import DeleteLesson from './DeleteLesson';

interface Lesson {
  _id: string;
  name: string;
  course_id: string;
  lesson_type: string;
  full_time: number; // Updated to number
}

interface SearchCondition {
  keyword: string;
  course_id: string;
  session_id: string;
  lesson_type: string;
  is_position_order: boolean;
  is_deleted: boolean;
}

const DisplayLesson: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const fetchLessons = async () => {
    try {
      const searchCondition: SearchCondition = {
        keyword: '',
        course_id: '',
        session_id: '',
        lesson_type: '',
        is_position_order: false,
        is_deleted: false,
      };
      const pageNum = 1;
      const pageSize = 10;

      const data = await getLessons(searchCondition, pageNum, pageSize);
      setLessons(data.pageData); // Ensure `data.pageData` includes `full_time`
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const formatFullTime = (minutes: number) => {
    if (minutes > 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const columns: TableColumnsType<Lesson> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Course ID',
      dataIndex: 'course_id',
      key: 'course_id',
    },
    {
      title: 'Type',
      dataIndex: 'lesson_type',
      key: 'lesson_type',
    },
    {
      title: 'Full Time',
      dataIndex: 'full_time',
      key: 'full_time',
      render: (value: number) => formatFullTime(value),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Lesson) => (
        <>
          <UpdateLesson lesson_id={record._id} />
          <DeleteLesson lesson_id={record._id} />
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={lessons}
      columns={columns}
      rowKey="_id"
    />
  );
};

export default DisplayLesson;
