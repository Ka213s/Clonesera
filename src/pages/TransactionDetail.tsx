import React, { useEffect, useState } from 'react';
import { Table, Spin, message } from 'antd';
import { useParams } from 'react-router-dom';
import { getPayouts } from '../services/Api';

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

const TransactionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result: ApiResponse = await getPayouts({
                    searchCondition: {
                        payout_no: '',
                        instructor_id: '',
                        status: '',
                        is_instructor: false,
                        is_delete: false,
                    },
                    pageInfo: {
                        pageNum: 1,
                        pageSize: 10,
                    }
                });

                // Find the payout that matches the payout ID
                const payout = result.pageData.find(payout => payout._id === id);

                if (payout) {
                    setTransactions(payout.transactions);
                } else {
                    message.error('Payout not found');
                }
            } catch (error) {
                message.error('Failed to fetch transaction details');
                console.error('Failed to fetch transaction details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (value: number) => `$${value.toFixed(2)}`,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (value: number) => `${value}%`,
        },
        {
            title: 'Price Paid',
            dataIndex: 'price_paid',
            key: 'price_paid',
            render: (value: number) => `$${value.toFixed(2)}`,
        },
        {
            title: 'Purchase ID',
            dataIndex: 'purchase_id',
            key: 'purchase_id',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (value: string) => new Date(value).toLocaleString(),
        },
    ];

    return (
        <div>
            {loading ? (
                <Spin tip="Loading..." />
            ) : (
                <Table
                    columns={columns}
                    dataSource={transactions}
                    rowKey="_id"
                    pagination={false}
                />
            )}
        </div>
    );
};

export default TransactionDetail;
