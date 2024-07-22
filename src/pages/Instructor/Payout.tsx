import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { getPayouts, updatePayout } from '../../services/Api';
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

const Payout: React.FC = () => {
    const [data, setData] = useState<PayoutData[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

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
                    status: '',
                    is_instructor: false,
                    is_delete: false
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

    const handleRequestPayout = async (payout: PayoutData) => {
        try {
            await updatePayout(payout._id, {
                status: 'request_payout',
                comment: ''
            });
            toast.success('Payout request successfully. Please wait admin for approval!');
            fetchData({
                pageNum: pagination.current || 1,
                pageSize: pagination.pageSize || 10,
            });
        } catch (error) {
            toast.error('Failed to request payout');
            console.error('Failed to request payout:', error);
        }
    };

    const columns = [
        {
            title: 'Payout No',
            dataIndex: 'payout_no',
            key: 'payout_no',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Transaction ID',
            key: 'transaction_id',
            render: (record: PayoutData) => record.transactions.map(transaction => transaction._id).join(', '),
        },
        {
            title: 'Price Paid',
            key: 'price_paid',
            render: (record: PayoutData) => record.transactions.reduce((total, transaction) => total + transaction.price_paid, 0),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: PayoutData) => (
                <Button type="primary" onClick={() => handleRequestPayout(record)}>
                    Request Payout
                </Button>
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
        </div>
    );
};

export default Payout;
