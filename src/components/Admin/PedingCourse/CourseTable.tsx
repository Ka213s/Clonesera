import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { getCourses, getCourseDetail } from '../../../utils/commonImports';

interface Course {
  _id: string;
  name: string;
  category_name: string;
  status: string;
  price: number;
  discount: number;
  created_at: string;
  sessions?: Session[];
}

interface Session {
  _id: string;
  name: string;
}

interface CourseTableProps {
  selectedCourseIds: string[];
  onSelectionChange: (selectedCourseIds: string[]) => void;
}

const getStatusTag = (status: string) => {
  return status;
};

const CourseTable: React.FC<CourseTableProps> = ({ selectedCourseIds, onSelectionChange }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses({ keyword: '', category: '', status: 'waiting_approve', is_deleted: false }, 1, 10);
    const coursesWithDetails = await Promise.all(data.pageData.map(async (course: Course) => {
      const courseDetail = await fetchCourseDetail(course._id);
      return { ...course, sessions: courseDetail.session_list };
    }));
    setCourses(coursesWithDetails);
  };

  const fetchCourseDetail = async (courseId: string) => {
    const data = await getCourseDetail(courseId);
    return data;
  };

  const courseColumns: ColumnsType<Course> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category Name', dataIndex: 'category_name', key: 'category_name' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: getStatusTag },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Discount', dataIndex: 'discount', key: 'discount' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text: string) => moment(text).format('DD-MM-YYYY') },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      onSelectionChange(selectedRowKeys as string[]);
    },
    selectedRowKeys: selectedCourseIds,
  };

  return (
    <Table
      columns={courseColumns}
      dataSource={courses}
      rowKey="_id"
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
    />
  );
};

export default CourseTable;
