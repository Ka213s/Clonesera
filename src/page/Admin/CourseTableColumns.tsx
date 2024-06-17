import React from 'react';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'Course Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <div>
        <img
          src={`/path/to/course/image`}
          alt="course"
          className="w-8 h-8 rounded-full mr-2"
        />
        {text}
      </div>
    ),
  },
  {
    title: 'Instructors',
    dataIndex: 'instructors',
    key: 'instructors',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Course Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'Active' ? 'green' : 'red'}>
        {status}
      </Tag>
    ),
  },
];

const coursesData = [
  {
    key: '1',
    name: 'Introduction of UI/UX',
    instructors: 'Esther Howard',
    category: 'Design',
    duration: '3 Month',
    amount: '$450',
    type: 'Online',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Introduction of UI/UX',
    instructors: 'Esther Howard',
    category: 'Design',
    duration: '3 Month',
    amount: '$450',
    type: 'Online',
    status: 'Active',
  },
  {
    key: '3',
    name: 'Introduction of UI/UX',
    instructors: 'Esther Howard',
    category: 'Design',
    duration: '3 Month',
    amount: '$450',
    type: 'Online',
    status: 'Active',
  },
];

const CourseTableColumns: React.FC = () => {
  return (
    <Table columns={columns} dataSource={coursesData} pagination={false} />
  );
};

export default CourseTableColumns;
