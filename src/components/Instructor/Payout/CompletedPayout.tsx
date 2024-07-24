import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Input, Pagination, message } from 'antd';
import { Link } from 'react-router-dom';
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

const { Search } = Input;

const CompletedPayout: React.FC = () => {
    const [data, setData] = useState<PayoutData[]>([]);
    const [pageNum, setPageNum] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalPayouts, setTotalPayouts] = useState<number>(0);
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    const fetchData = useCallback(async (page: number, size: number, keyword: string) => {
        try {
            const result: ApiResponse = await getPayouts({
                searchCondition: {
                    payout_no: keyword,
                    instructor_id: '',
                    status: 'completed', // Filter for completed status
                    is_instructor: false,
                    is_delete: false
                },
                pageInfo: {
                    pageNum: page,
                    pageSize: size
                }
            });
            setData(result.pageData);
            setTotalPayouts(result.pageInfo.totalItems);
        } catch (error) {
            message.error('Failed to fetch data');
            console.error('Failed to fetch data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData(pageNum, pageSize, searchKeyword);
    }, [pageNum, pageSize, searchKeyword, fetchData]);

    const handleSearch = (value: string) => {
        setSearchKeyword(value);
        setPageNum(1); // Reset to the first page on search
    };

    const handleTableChange = (pagination: any) => {
        setPageNum(pagination.current || 1);
        setPageSize(pagination.pageSize || 10);
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
                <Link to={`/transaction/${record._id}`}>
                    View
                </Link>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center mb-4">
                <Search
                    placeholder="Search by payout number"
                    enterButton="Search"
                    allowClear
                    size="large"
                    onSearch={handleSearch}
                    className="mr-4 w-80"
                />
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey="_id"
                onChange={handleTableChange}
            />
            <div className="flex justify-end mt-5">
                <Pagination
                    current={pageNum}
                    pageSize={pageSize}
                    total={totalPayouts}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    onChange={(page, pageSize) => {
                        setPageNum(page);
                        setPageSize(pageSize);
                    }}
                    showSizeChanger
                />
            </div>
        </div>
    );
};

export default CompletedPayout;
