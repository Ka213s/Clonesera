import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
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

const RequestPayout: React.FC = () => {
    const [data, setData] = useState<PayoutData[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
            // Filter data to include only request_payout and rejected statuses
            const filteredData = result.pageData.filter(payout =>
                payout.status === 'new' || payout.status === 'rejected' || payout.status === 'request_payout'
            );
            
            setData(filteredData);
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

    const handleSelectChange = (selectedKeys: React.Key[]) => {
        setSelectedRowKeys(selectedKeys);
    };

    const handleRequestPayout = async () => {
        try {
            const selectedPayouts = selectedRowKeys.map(key => key.toString());
            for (const payoutId of selectedPayouts) {
                await updatePayout(payoutId, {
                    status: 'request_payout',
                    comment: ''
                });
            }
            toast.success('Payout request successfully. Please wait admin for approval!');
            fetchData({
                pageNum: pagination.current || 1,
                pageSize: pagination.pageSize || 10,
            });
            setSelectedRowKeys([]); // Clear selection after request
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
            render: (record: PayoutData) => (
                <Link to={`/transaction/${record._id}`}>
                    View
                </Link>
            ),
        },
        {
            title: 'Price Paid',
            key: 'price_paid',
            render: (record: PayoutData) => record.transactions.reduce((total, transaction) => total + transaction.price_paid, 0),
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
            <Button
                type="primary"
                onClick={handleRequestPayout}
                disabled={selectedRowKeys.length === 0} // Disable if no rows are selected
                style={{ marginLeft: 10 }}
            >
                Request Payout
            </Button>
            <Table
                rowSelection={{
                    selectedRowKeys,
                    onChange: handleSelectChange,
                }}
                columns={columns}
                dataSource={data}
                pagination={pagination}
                onChange={handleTableChange}
                rowKey="_id" // Use _id as the row key
            />
        </div>
    );
};

export default RequestPayout;
