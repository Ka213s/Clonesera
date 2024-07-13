import { React, useEffect, useState, useCallback, useMemo, Button, Table, Pagination, Modal, Input } from '../../utils/commonImports';
import { toast } from 'react-toastify';
import { getUsers, reviewProfileInstructor } from '../../services/Api';
import { ColumnsType } from 'antd/es/table';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    _id: string;
    name: string;
    email: string;
    phone_number: string;
    description: string;
    avatar: string;
    status: boolean;
}

const Pending: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageNum, setPageNum] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [comment, setComment] = useState<string>('');

    const fetchUsers = useCallback(
        async (page: number, pageSize: number) => {
            setLoading(true);
            try {
                const data = await getUsers(
                    { keyword: '', role: 'instructor', status: false, is_deleted: false },
                    page,
                    pageSize
                );
                console.log('data:', data);
                setUsers(data.pageData);
                setTotalItems(data.pageInfo.totalItems);
            } catch (error) {
                toast.error('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        fetchUsers(pageNum, pageSize);
    }, [pageNum, pageSize, fetchUsers]);

    const handleApprove = async (userId: string) => {
        try {
            await reviewProfileInstructor({ user_id: userId, status: 'approve', comment: '' });
            fetchUsers(pageNum, pageSize);
        } catch (error) {
            toast.error(`Failed to approve user`);
        }
    };

    const handleReject = (userId: string) => {
        setCurrentUserId(userId);
        setIsModalVisible(true);
    };

    const handleConfirmReject = async () => {
        if (!currentUserId) return;

        try {
            await reviewProfileInstructor({ user_id: currentUserId, status: 'reject', comment });
            setIsModalVisible(false);
            fetchUsers(pageNum, pageSize);
        } catch (error) {
            toast.error(`Failed to reject user`);
        } finally {
            setCurrentUserId(null);
            setComment('');
        }
    };

    const columns: ColumnsType<User> = useMemo(
        () => [
            {
                title: 'Avatar',
                dataIndex: 'avatar',
                key: 'avatar',
                render: (avatar: string) => (
                    <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                ),
            },
            {
                title: 'User Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Phone',
                dataIndex: 'phone_number',
                key: 'phone_number',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Action',
                key: 'action',
                render: (record: User) => (
                    <div className="flex space-x-2">
                        <Button
                            type="default"
                            onClick={() => handleApprove(record._id)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Approve
                        </Button>
                        <Button
                            type="default"
                            onClick={() => handleReject(record._id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Reject
                        </Button>
                    </div>
                ),
            },
        ],
        [handleApprove, handleReject]
    );

    return (
        <div className="p-4">
            <Table
                columns={columns}
                dataSource={users.map(user => ({ ...user, key: user._id }))}
                loading={loading}
                pagination={false}
                className="mb-4"
            />
            <Pagination
                current={pageNum}
                pageSize={pageSize}
                total={totalItems}
                onChange={(page, pageSize) => {
                    setPageNum(page);
                    setPageSize(pageSize);
                    fetchUsers(page, pageSize);
                }}
                showSizeChanger
                className="text-center"
            />
            <Modal
                title="Reject Reason"
                visible={isModalVisible}
                onOk={handleConfirmReject}
                onCancel={() => setIsModalVisible(false)}
            >
                <Input.TextArea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Enter reason for rejection"
                    rows={4}
                />
            </Modal>
        </div>
    );
};

export default Pending;
