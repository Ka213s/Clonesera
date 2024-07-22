import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { getPayouts, updatePayout } from '../../../services/Api';
import { toast } from 'react-toastify';

interface Transaction {
    _id: string; // Transaction ID
    price: number;
    discount: number;
    price_paid: number;
    purchase_id: string;
    created_at: string;
}

interface PayoutData {
    _id: string;
    payout_no: string;
    status: string;
    transactions: Transaction[];
    instructor_id: string;
    balance_origin: number;
    balance_instructor_paid: number;
    balance_instructor_received: number;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    instructor_name: string;
    instructor_email: string;
}

interface ApiResponse {
    pageData: PayoutData[];
    pageInfo: {
        pageNum: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}

const RequestPaid: React.FC = () => {
    const [data, setData] = useState<PayoutData[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [rejectComment, setRejectComment] = useState('');
    const [currentPayoutId, setCurrentPayoutId] = useState<string | null>(null);

    useEffect(() => {
        fetchData({
            pageNum: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
        });
    }, [pagination.current]);

    const fetchData = async (pageInfo: { pageNum: number; pageSize: number }) => {
        try {
            const result: ApiResponse = await getPayouts({
                searchCondition: {
                    payout_no: '',
                    instructor_id: '',
                    status: 'request_payout',
                    is_instructor: false,
                    is_delete: false,
                },
                pageInfo
            });

            setData(result.pageData);
            setPagination({
                ...pagination,
                total: result.pageInfo.totalItems,
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPagination({
            ...pagination,
            current: pagination.current || 1,
        });
    };

    const handleApprove = async (payoutId: string) => {
        try {
            await updatePayout(payoutId, {
                status: 'completed',
                comment: ''
            });
            toast.success('Payout approved successfully');
            fetchData({
                pageNum: pagination.current || 1,
                pageSize: pagination.pageSize || 10,
            });
        } catch (error) {
            toast.error('Failed to approve payout');
            console.error('Failed to approve payout:', error);
        }
    };

    const handleRejectClick = (payoutId: string) => {
        setCurrentPayoutId(payoutId);
        setRejectModalVisible(true);
    };

    const handleReject = async () => {
        if (!currentPayoutId) return;

        try {
            await updatePayout(currentPayoutId, {
                status: 'rejected',
                comment: rejectComment
            });
            toast.success('Payout rejected successfully');
            fetchData({
                pageNum: pagination.current || 1,
                pageSize: pagination.pageSize || 10,
            });
            setRejectModalVisible(false);
            setRejectComment('');
        } catch (error) {
            toast.error('Failed to reject payout');
            console.error('Failed to reject payout:', error);
        }
    };

    const columns = [
        {
            title: 'Payout No',
            dataIndex: 'payout_no',
            key: 'payout_no',
        },
        {
            title: 'Instructor Name',
            dataIndex: 'instructor_name',
            key: 'instructor_name',
        },
        {
            title: 'Balance Origin',
            dataIndex: 'balance_origin',
            key: 'balance_origin',
        },
        {
            title: 'Balance Instructor Paid',
            dataIndex: 'balance_instructor_paid',
            key: 'balance_instructor_paid',
        },
        {
            title: 'Balance Instructor Received',
            dataIndex: 'balance_instructor_received',
            key: 'balance_instructor_received',
        },
        {
            title: 'Transaction',
            key: 'transaction_id',
            render: (record: PayoutData) => (
                <Link to={`/transaction/${record._id}`}>View</Link>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: PayoutData) => (
                <>
                    <Button type="primary" onClick={() => handleApprove(record._id)} style={{ marginRight: 8 }}>
                        Approve
                    </Button>
                    <Button type="default" onClick={() => handleRejectClick(record._id)}>
                        Reject
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Button
                type="primary"
                onClick={() => fetchData({
                    pageNum: pagination.current || 1,
                    pageSize: pagination.pageSize || 10,
                })}
            >
                Reload
            </Button>
            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                onChange={handleTableChange}
                rowKey="_id"
            />
            <Modal
                title="Reject Payout"
                visible={rejectModalVisible}
                onOk={handleReject}
                onCancel={() => setRejectModalVisible(false)}
            >
                <Input.TextArea
                    value={rejectComment}
                    onChange={(e) => setRejectComment(e.target.value)}
                    placeholder="Enter the reason for rejection"
                    rows={4}
                />
            </Modal>
        </div>
    );
};

export default RequestPaid;
