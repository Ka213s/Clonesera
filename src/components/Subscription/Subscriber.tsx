import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Table, Pagination, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { toast } from 'react-toastify';
import { getSubscribers } from '../../utils/commonImports';
import 'react-toastify/dist/ReactToastify.css';

interface Subscriber {
    _id: string;
    subscriber_name: string;
    is_subscribed: boolean;
}

const { Search } = Input;

const Subscriber: React.FC = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [allSubscribers, setAllSubscribers] = useState<Subscriber[]>([]);
    const [pageNum, setPageNum] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    const fetchSubscribers = useCallback(
        async (page: number, pageSize: number) => {
            try {
                // Fetch paginated data
                const data = await getSubscribers(
                    { keyword: '', is_delete: false },
                    page,
                    pageSize
                );
                console.log(data);

                // Filter out only subscribed users
                const filteredData = data.pageData.filter((sub: Subscriber) => sub.is_subscribed);

                // Store all data to filter locally
                setAllSubscribers(filteredData);

                // Update subscribers based on current page and page size
                const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
                setSubscribers(paginatedData);
                setTotalItems(filteredData.length); // Set total items based on subscribed users
            } catch (error) {
                toast.error('Failed to fetch subscribers');
            }
        },
        []
    );

    useEffect(() => {
        fetchSubscribers(pageNum, pageSize);
    }, [pageNum, pageSize, fetchSubscribers]);

    useEffect(() => {
        // Filter subscribers based on search keyword
        const filtered = allSubscribers.filter(sub =>
            sub.subscriber_name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        const paginatedFiltered = filtered.slice((pageNum - 1) * pageSize, pageNum * pageSize);
        setSubscribers(paginatedFiltered);
        setTotalItems(filtered.length); // Update total items based on filtered results
    }, [searchKeyword, allSubscribers, pageNum, pageSize]);

    const columns: ColumnsType<Subscriber> = useMemo(
        () => [
            {
                title: 'Subscriber Name',
                dataIndex: 'subscriber_name',
                key: 'subscriber_name',
            },
        ],
        []
    );

    const handleSearch = (value: string) => {
        setSearchKeyword(value);
        setPageNum(1); // Reset to the first page on search
    };

    return (
        <div className="p-4">
            <div style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Search by subscriber name"
                    enterButton="Search"
                    allowClear
                    size="large"
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                />
            </div>
            <Table
                columns={columns}
                dataSource={subscribers.map(sub => ({ ...sub, key: sub._id }))}
                pagination={false}
                className="mb-4"
            />
            <Pagination
                current={pageNum}
                pageSize={pageSize}
                total={totalItems}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                onChange={(page, pageSize) => {
                    setPageNum(page);
                    setPageSize(pageSize);
                    fetchSubscribers(page, pageSize);
                }}
                showSizeChanger
                className="text-center"
            />
        </div>
    );
};

export default Subscriber;
