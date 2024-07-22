import { Table, Avatar, PaginationProps } from 'antd';
import { React, useEffect, useState, getUsers } from '../../../utils/commonImports';
import DeleteButton from './DeleteButton';
import StatusToggle from './StatusToggle';
import RoleSelect from './RoleSelect';
import EditButton from './EditButton';

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
      const response = await getUsers({ keyword: '', role: 'all', status, is_deleted: isDeleted, is_verified : "true" }, pageNum, pageSize);
      console.log('responsea:', response);
      setData(response.pageData);
      setPagination({
        current: response.pageInfo.pageNum,
        pageSize: response.pageInfo.pageSize,
        total: response.pageInfo.totalItems,
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

  const handleEdit = (_id: string) => {
    console.log(`Edit user with _id: ${_id}`);
  };

  const handleDelete = (_id: string) => {
    console.log(`Delete user with _id: ${_id}`);
  };

  const handleStatusChange = (_id: string, status: boolean) => {
    console.log(`Toggle status for user with _id: ${_id}, new status: ${status}`);
  };

  const handleRoleChange = (_id: string, role: string) => {
    console.log(`Change role for user with _id: ${_id}, new role: ${role}`);
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
      render: (role: string, record: User) => (
        <RoleSelect userId={record._id} role={role} onChange={handleRoleChange} />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: User) => (
        <StatusToggle userId={record._id} status={status} onChange={handleStatusChange} />
      ),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (record: User) => (
        <EditButton userId={record._id} onEdit={handleEdit} />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (record: User) => (
        <DeleteButton userId={record._id} onDelete={handleDelete} />
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