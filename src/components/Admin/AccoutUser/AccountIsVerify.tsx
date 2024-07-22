import React, { useEffect, useState } from 'react';
import { Table, Avatar, PaginationProps, Tag } from 'antd';
import { getUsers } from '../../../utils/commonImports';

interface User {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  is_verified: boolean; 
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

interface DisplayAccountProps {
  status?: boolean;
  isDeleted?: boolean;
}

const DisplayAccount: React.FC<DisplayAccountProps> = ({ status = true, isDeleted = false }) => {
  const [data, setData] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });

  const fetchUsers = async (pageNum: number, pageSize: number) => {
    try {
      const response = await getUsers({ keyword: '', role: 'all', status, is_deleted: isDeleted , is_verified: "false" }, pageNum, pageSize);
      console.log('response', response.pageData);
     

      setData(response.pageData);

      setPagination({
        current: response.pageNum,
        pageSize: response.pageSize,
        total: response.total, 
      });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize, status, isDeleted]);

  const handleTableChange = (pagination: PaginationProps) => {
    fetchUsers(pagination.current!, pagination.pageSize!);
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <Avatar src={avatar} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Verified',
      dataIndex: 'is_verified',
      key: 'is_verified',
      render: (is_verified: boolean) => (
        <Tag color={is_verified ? 'blue' : 'gray'}>
          {is_verified ? 'Verified' : 'Not Verified'}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record: User) => record._id}
      dataSource={data}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      onChange={handleTableChange}
    />
  );
};

export default DisplayAccount;
