import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Pagination } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { createApiInstance } from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import UserStatusUpdater from '../../components/Admin/UserStatusUpdater';
import EditUserForm from '../../components/Admin/EditUserForm';
import UserFilter from '../../components/Admin/UserFilter';

const AllUser: React.FC = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchUsersData = async (pageNum = 1, pageSize = 10) => {
    try {
      const api = createApiInstance(navigate);
  
      const activeUsersSearchData = {
        keyword: '',
        role: 'all',
        status: true,
        is_delete: false,
      };
  
      const inactiveUsersSearchData = {
        keyword: '',
        role: 'all',
        status: false, 
        is_delete: false,
      };
  
      const [activeUsersResult, inactiveUsersResult] = await Promise.all([
        api.searchUsers(activeUsersSearchData, pageNum, pageSize),
        api.searchUsers(inactiveUsersSearchData, pageNum, pageSize),
      ]);
  
      const combinedResults = [
        ...activeUsersResult.data.pageData,
        ...inactiveUsersResult.data.pageData,
      ];
  console.log('combinedResults:', activeUsersResult );
      setUsersData(combinedResults);
      setFilteredUsers(combinedResults);
      setPagination({
        current: pageNum,
        pageSize,
        total: activeUsersResult.data.pageInfo.totalItems + inactiveUsersResult.data.pageInfo.totalItems, // Adjust total items count
      });
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };
  

  useEffect(() => {
    fetchUsersData(pagination.current, pagination.pageSize);
  }, [navigate, pagination.current, pagination.pageSize]);

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text: any, record: any, index: number) => (pagination.current! - 1) * pagination.pageSize! + index + 1,
      width: 50,
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <img src={avatar} alt="Avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />,
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: any) => (
        <UserStatusUpdater checked={status} userId={record._id} />
      ),
      width: 100,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          <Button type="link" onClick={() => showDetails(record)}>
            Details
          </Button>
          <Button type="link" onClick={() => editUser(record)}>
            Edit
          </Button>
        </>
      ),
      width: 150,
    },
  ];

  const showDetails = (record: any) => {
    setSelectedUser(record);
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const editUser = (record: any) => {
    setSelectedUser(record);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleSave = async (updatedUser: any) => {
    try {
      const api = createApiInstance(navigate);
      const response = await api.updateAccount(updatedUser._id, {
        name: updatedUser.name,
        phone_number: updatedUser.phone_number,
        description: updatedUser.description,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        role: updatedUser.role,
        video: updatedUser.video || '',
      });

      // Check if the update was successful
      if (response.success) {
        // Update local state with the updated user
        setUsersData((prevData) =>
          prevData.map((user) => (user._id === updatedUser._id ? { ...user, ...updatedUser } : user))
        );
        setFilteredUsers((prevData) =>
          prevData.map((user) => (user._id === updatedUser._id ? { ...user, ...updatedUser } : user))
        );

        // Close the modal after saving
        handleCancel();

        // Log the updated user data
        console.log('Saved user data:', updatedUser);
      } else {
        console.error('Failed to update user:', response.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const handleFilter = (filters: any) => {
    const { searchID, searchName, searchEmail, searchRole, searchStatus } = filters;
    const filtered = usersData.filter(user =>
      (!searchID || user._id.includes(searchID)) &&
      (!searchName || user.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (!searchEmail || user.email.toLowerCase().includes(searchEmail.toLowerCase())) &&
      (!searchRole || user.role.toLowerCase().includes(searchRole.toLowerCase())) &&
      (!searchStatus || (user.status ? 'active' : 'inactive').includes(searchStatus.toLowerCase()))
    );
    setFilteredUsers(filtered);
    setPagination({ ...pagination, total: filtered.length, current: 1 }); 
  };

  const handleClear = () => {
    setFilteredUsers(usersData);
    setPagination({ ...pagination, total: usersData.length, current: 1 });
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize });
    fetchUsersData(page, pageSize);
  };

  return (
    <div className="p-10 bg-white text-black min-h-screen">
      <UserFilter onFilter={handleFilter} onClear={handleClear} />
      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="_id"
        pagination={false}
        scroll={{ x: 1300 }}
      />

      <Pagination
        total={pagination.total}
        showTotal={(total) => `Total ${total} items`}
        pageSize={pagination.pageSize}
        current={pagination.current}
        onChange={handlePaginationChange}
      />

      <Modal
        title={isEditMode ? "Edit User" : "User Details"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        centered
        footer={null}
      >
        {selectedUser && !isEditMode && (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <img src={selectedUser.avatar} alt="Avatar" className="w-40 h-40 rounded-full" />
            </div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between md:w-3/4">
              <div className="md:w-1/2">
                <p><strong>ID:</strong> {selectedUser._id}</p>
                {selectedUser.google_id ? (
                  <p><strong>Google ID:</strong> {selectedUser.google_id}</p>
                ) : (
                  <p><strong>Google ID:</strong> <span className="text-yellow-500">Account not registered with Google</span></p>
                )}
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>Status: </strong>
                  <span className={selectedUser.status ? 'text-green-500' : 'text-red-500'}>
                    {selectedUser.status ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0">
                <p><strong>Description:</strong> {selectedUser.description}</p>
                <p><strong>Phone Number:</strong> {selectedUser.phone_number}</p>
                <p><strong>Date of Birth:</strong> {moment(selectedUser.dob).format('DD-MM-YYYY')}</p>
                <p><strong>Created At:</strong> {moment(selectedUser.created_at).format('DD-MM-YYYY HH:mm:ss')}</p>
                <p><strong>Updated At:</strong> {moment(selectedUser.updated_at).format('DD-MM-YYYY HH:mm:ss')}</p>
                <p>
                  <strong>Is Deleted:</strong>{' '}
                  <span className={selectedUser.is_deleted ? 'text-red-500' : 'text-green-500'}>
                    {selectedUser.is_deleted ? 'Yes' : 'No'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
        {selectedUser && isEditMode && (
          <EditUserForm user={selectedUser} onSave={handleSave} onCancel={handleCancel} />
        )}
      </Modal>
    </div>
  );
};

export default AllUser;
