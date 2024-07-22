import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { getPayouts } from '../../../services/Api';

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

const Rejected: React.FC = () => {
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
                    status: 'rejected', // Filter for rejected status
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

export default Rejected;
