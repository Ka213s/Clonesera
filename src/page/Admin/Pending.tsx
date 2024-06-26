import React from 'react';
import { Table, Tag, Button, Space } from 'antd';

const Pending: React.FC = () => {
  const data = [
    {
      userName: 'pendinguser1@gmail.com',
      description: 'Pending request 1',
      category: ['Category1', 'Category2'],
      status: 'Pending',
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
      render: (status: string) => <Tag color="orange">{status.toUpperCase()}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleApprove(record.userName)}>Approve</Button>
          <Button danger onClick={() => handleReject(record.userName)}>Reject</Button>
        </Space>
      ),
    },
  ];

  const handleApprove = (userName: string) => {
    console.log(`Approved: ${userName}`);
    // Implement the logic for approving the request here
  };

  const handleReject = (userName: string) => {
    console.log(`Rejected: ${userName}`);
    // Implement the logic for rejecting the request here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Requests</h1>
      <Table columns={columns} dataSource={data} rowKey="userName" />
    </div>
  );
};

export default Pending;
