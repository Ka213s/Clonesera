import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getLessons } from '../../../utils/commonImports';


interface Lesson {
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

const DisplayLeesion: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const searchCondition: SearchCondition = {
        keyword: '',
        course_id: '',
        session_id: '',
        lesson_type: '',
        is_position_order: false,
        is_deleted: false
      };
      const pageNum = 1;
      const pageSize = 10;

      try {
        const data = await getLessons(searchCondition, pageNum, pageSize);
        setLessons(data.pageData); // Assuming the response has a lessons array
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, []);

  const columns = [
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
      render: (text: boolean) => (text ? 'Yes' : 'No'),
    },
  ];

  return (
    <div>
      <Table dataSource={lessons} columns={columns} rowKey="course_id" />
    </div>
  );
};

export default DisplayLeesion;