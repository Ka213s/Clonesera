import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { getLessons } from '../../../utils/commonImports';

interface Lesson {
  _id: string;
  name: string;
  course_id: string;
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
      setLessons(data.pageData); 
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
      title: 'Course ID',
      dataIndex: 'course_id',
      key: 'course_id',
    }
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
