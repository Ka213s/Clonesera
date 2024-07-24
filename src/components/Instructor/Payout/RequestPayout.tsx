import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Pagination, Input, message } from 'antd';
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

const { Search } = Input;

const RequestPayout: React.FC = () => {
    const [data, setData] = useState<PayoutData[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
                    status: '',
                    is_instructor: false,
                    is_delete: false
                },
                pageInfo: {
                    pageNum: page,
                    pageSize: size
                }
            });
            // Filter data to include only request_payout and rejected statuses
            const filteredData = result.pageData.filter(payout =>
                payout.status === 'new' || payout.status === 'rejected'
            );
            setData(filteredData);
            setTotalPayouts(result.pageInfo.totalItems); 
        } catch (error) {
            message.error('Failed to fetch data');
            console.error('Failed to fetch data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData(pageNum, pageSize, searchKeyword);
    }, [pageNum, pageSize, searchKeyword, fetchData]);

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
            fetchData(pageNum, pageSize, searchKeyword); 
            setSelectedRowKeys([]); 
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

    const handleSearch = (value: string) => {
        setSearchKeyword(value);
        setPageNum(1); 
    };

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
                <Button
                    type="primary"
                    onClick={handleRequestPayout}
                    disabled={selectedRowKeys.length === 0} 
                >
                    Request Payout
                </Button>
            </div>
            <Table
                rowSelection={{
                    selectedRowKeys,
                    onChange: handleSelectChange,
                }}
                columns={columns}
                dataSource={data}
                rowKey="_id" 
                pagination={false}
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

export default RequestPayout;
