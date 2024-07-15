import React, { useEffect, useState } from 'react';
import { Table, message, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getCourses, changeCourseStatus } from '../../../../utils/commonImports';
import EditButton from './EditCourse';
import DeleteButton from './DeleteCourse';
import SendToAdminButton from './SendToAdminButton';

const { Option } = Select;

interface Course {
  _id: number;
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

  const handleChangeStatus = async (courseId: number, newStatus: string) => {
    try {
      await changeCourseStatus({ course_id: courseId.toString(), new_status: newStatus });
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course._id === courseId ? { ...course, status: newStatus } : course
        )
      );
    } catch (error) {
      
      console.error('Error updating course status:', error);
    }
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
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <EditButton courseId={record._id} />
          <DeleteButton courseId={record._id} />
          <SendToAdminButton courseId={record._id} />
          <Select
            defaultValue={record.status}
            style={{ width: 120, marginLeft: 10 }}
            onChange={(value) => handleChangeStatus(record._id, value)}
          >
            <Option value="approve">Approve</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={courses} rowKey="_id" />;
};

export default CourseTable;
