import React, { useEffect, useState } from 'react';
import { Table, Avatar, Tag, PaginationProps } from 'antd';
import { getUsers } from '../../utils/commonImports';

interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

const DisplayAccount: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });

  const fetchUsers = async (pageNum: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await getUsers({ keyword: '', role: '', status: true, is_deleted: false }, pageNum, pageSize);
      setData(response.users);
      setPagination({
        current: response.pageNum,
        pageSize: response.pageSize,
        total: response.total, 
      });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
  }, );

  const handleTableChange = (pagination: PaginationProps) => {
    fetchUsers(pagination.current!, pagination.pageSize!);
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (record: User) => <Avatar src={record.avatar} />,
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
      render: (role: string) => <Tag color="blue">{role}</Tag>,
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
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record: User) => record.id}
      dataSource={data}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default DisplayAccount;
