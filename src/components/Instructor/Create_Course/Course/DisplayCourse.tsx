import React, { useEffect, useState } from 'react';
import { Table, message, Select, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { getCourses, changeCourseStatus } from '../../../../utils/commonImports';
import EditButton from './EditCourse';
import DeleteButton from './DeleteCourse';
import { getStatusTag } from '../../../../utils/statusTagUtils'; // Adjust the import path accordingly

const { Option } = Select;

interface Course {
  _id: number;
  name: string;
  category_name: string;
  status: string;
  price: number;
  discount: number;
  created_at: string;
}

interface CourseTableProps {
  setSelectedCourseIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const CourseTable: React.FC<CourseTableProps> = ({ setSelectedCourseIds }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

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
        console.log('Fetched courses:', response.pageData);
      } catch (error) {
        message.error('Error fetching courses');
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    setSelectedCourseIds(selectedRowKeys);
    console.log('Selected Row Keys in CourseTable component:', selectedRowKeys);
  }, [selectedRowKeys, setSelectedCourseIds]);

  const handleChangeStatus = async (courseId: number, newStatus: string) => {
    try {
      await changeCourseStatus({ course_id: courseId.toString(), new_status: newStatus });
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course._id === courseId ? { ...course, status: newStatus } : course
        )
      );
      console.log('Changed status of course ID:', courseId, 'to:', newStatus);
    } catch (error) {
      console.error('Error updating course status:', error);
    }
  };

  const renderActions = (record: Course) => {
    const isWaitingApprove = ['new', 'waiting_approve'].includes(record.status);

    return (
      <>
        <EditButton courseId={record._id} />
        <DeleteButton courseId={record._id} />
        {isWaitingApprove ? (
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={() => message.info('Nhấn vào đây Send to admin để gửi tới admin duyệt')}
          >
            Chờ admin duyệt để kích hoạt
          </Button>
        ) : (
          <Select
            defaultValue={record.status}
            style={{ width: 120, marginLeft: 10 }}
            onChange={(value) => handleChangeStatus(record._id, value)}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        )}
      </>
    );
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
      render: getStatusTag,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => renderActions(record),
      align: 'center',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys as number[]);
    },
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={courses}
      rowKey="_id"
    />
  );
};

export default CourseTable;
