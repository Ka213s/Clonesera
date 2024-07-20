import React, { useEffect, useState } from 'react';
import { Table, Tag, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getCourses } from '../../../utils/commonImports';

interface Course {
  _id: number;
  name: string;
  category_name: string;
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
          status: '',
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

  const getStatusTag = (status: string) => {
    let color;
    switch (status) {
      case 'active':
        color = 'green';
        break;
      case 'inactive':
        color = 'red';
        break;
      case 'approve':
        color = 'blue';
        break;
      default:
        color = 'default';
    }
    return <Tag color={color}>{status.toUpperCase()}</Tag>;
  };

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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    }
  ];

  return <Table columns={columns} dataSource={courses} rowKey="_id" />;
};

export default CourseTable;
