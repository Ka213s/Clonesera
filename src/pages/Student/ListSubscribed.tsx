import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Table, Pagination, Input } from 'antd';
import { toast } from 'react-toastify';
import { getSubscribeds, updateSubscribed } from '../../utils/commonImports';
import { ColumnsType } from 'antd/es/table';
import 'react-toastify/dist/ReactToastify.css';

interface Subscribed {
    _id: string;
    instructor_name: string;
    instructor_id: string;
    is_subscribed: boolean;
}

const { Search } = Input;

const ListSubscribed: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscribed[]>([]);
    const [pageNum, setPageNum] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [allSubscriptions, setAllSubscriptions] = useState<Subscribed[]>([]);

    const fetchSubscriptions = useCallback(
        async (page: number, pageSize: number) => {
                const data = await getSubscribeds(
                    { keyword: '', is_delete: false },
                    page,
                    pageSize
                );
                const filteredData = data.pageData.filter((item: Subscribed) => item.is_subscribed);
                setAllSubscriptions(filteredData);
                const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
                setSubscriptions(paginatedData);
                setTotalItems(filteredData.length);
        },
        []
    );

    useEffect(() => {
        fetchSubscriptions(pageNum, pageSize);
    }, [pageNum, pageSize, fetchSubscriptions]);

    useEffect(() => {
        const filtered = allSubscriptions.filter(sub =>
            sub.instructor_name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setSubscriptions(filtered.slice((pageNum - 1) * pageSize, pageNum * pageSize));
        setTotalItems(filtered.length);
        setPageNum(1);
    }, [searchKeyword, allSubscriptions, pageNum, pageSize]);

    const handleSubscribeToggle = async (instructor_id: string, is_subscribed: boolean) => {
            await updateSubscribed(instructor_id);
            toast.success(is_subscribed ? 'Unsubscribed successfully' : 'Subscribed successfully');
            setAllSubscriptions(prev =>
                prev.map((sub: Subscribed) =>
                    sub.instructor_id === instructor_id
                        ? { ...sub, is_subscribed: !is_subscribed }
                        : sub
                )
            );
    };

    const columns: ColumnsType<Subscribed> = useMemo(
        () => [
            {
                title: 'Instructor Name',
                dataIndex: 'instructor_name',
                key: 'instructor_name',
            },
            {
                title: 'Action',
                key: 'action',
                render: (record: Subscribed) => (
                    <div className="flex space-x-2">
                        <Button
                            type="default"
                            onClick={() => handleSubscribeToggle(record.instructor_id, record.is_subscribed)}
                            className={record.is_subscribed ? 'text-red-500 hover:text-red-700' : 'text-blue-500 hover:text-blue-700'}
                        >
                            {record.is_subscribed ? 'Unsubscribe' : 'Subscribe'}
                        </Button>
                    </div>
                ),
            },
        ],
        [handleSubscribeToggle]
    );

    const handleSearch = (value: string) => {
        setSearchKeyword(value);
        setPageNum(1);
    };

    return (
        <div className="p-4">
            <div style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Search by instructor name"
                    enterButton="Search"
                    allowClear
                    size="large"
                    onSearch={handleSearch}
                    style={{ width: 400 }}
                />
            </div>
            <Table
                columns={columns}
                dataSource={subscriptions.map(sub => ({ ...sub, key: sub._id }))}
                pagination={false}
                className="mb-4"
            />
            <div className="flex justify-end mt-5">
                <Pagination
                    current={pageNum}
                    pageSize={pageSize}
                    total={totalItems}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    onChange={(page, pageSize) => {
                        setPageNum(page);
                        setPageSize(pageSize);
                        fetchSubscriptions(page, pageSize);
                    }}
                    showSizeChanger
                    className="text-center"
                />
            </div>
        </div>
    );
};

export default ListSubscribed;
