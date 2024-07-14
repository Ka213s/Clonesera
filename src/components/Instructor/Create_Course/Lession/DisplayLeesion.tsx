import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { getLessons } from '../../../../utils/commonImports';
import UpdateLesson from './EditLesson';
import DeleteLesson from './DeleteLesson';

interface Lesson {
  _id: string;
  name: string;
  description: string;
  course_id: string;
  is_deleted: boolean;
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
      setLessons(data.pageData); // Assuming the response has a lessons array
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const columns: TableColumnsType<Lesson> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Course ID',
      dataIndex: 'course_id',
      key: 'course_id',
    },
    {
      title: 'Deleted',
      dataIndex: 'is_deleted',
      key: 'is_deleted',
      render: (is_deleted: boolean) => (is_deleted ? 'Yes' : 'No'),
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
      rowKey="lesson_id"
    />
  );
};

export default DisplayLesson;
