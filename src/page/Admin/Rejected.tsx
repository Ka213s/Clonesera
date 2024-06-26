// Rejected.tsx
import React from 'react';
import { Table, Tag, Button } from 'antd';

const Rejected: React.FC = () => {
  const data = [
    {
      userName: 'rejecteduser1@gmail.com',
      description: 'Rejected request 1',
      category: ['Category1', 'Category2'],
      status: 'Rejected',
      action: 'View Detail',
    },
  ];

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => <Tag color="red">{status.toUpperCase()}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Button type="primary">{record.action}</Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rejected Requests</h1>
      <Table columns={columns} dataSource={data} rowKey="userName" />
    </div>
  );
};

export default Rejected;
