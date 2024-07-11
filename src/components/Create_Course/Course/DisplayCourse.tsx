import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getCourses } from '../../../utils/commonImports';

interface Course {
  id: number;
  name: string;
  category_name: string;
  user_name: string;
  status: string;
  price: number;
}

const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const searchCondition = {
          keyword: '',
          category: '',
          status: 'new',
          is_deleted: false,
        };
        const pageNum = 1;
        const pageSize = 10;
        const response = await getCourses(searchCondition, pageNum, pageSize);
        setCourses(response.pageData);
      } catch (error) {
        message.error('Error fetching courses');
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const columns: ColumnsType<Course> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  return <Table columns={columns} dataSource={courses} rowKey="id" />;
};

export default CourseTable;
