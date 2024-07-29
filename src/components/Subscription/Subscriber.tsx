import { React, useEffect, useState, useCallback, useMemo, Table, Pagination, Input, getSubscribers, SearchOutlined } from '../../utils/commonImports';
import { ColumnsType } from 'antd/es/table';

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
                const data = await getSubscribers(
                    { keyword: '', is_delete: false },
                    page,
                    pageSize
                );
                const filteredData = data.pageData.filter((sub: Subscriber) => sub.is_subscribed);
                setAllSubscribers(filteredData);
                const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
                setSubscribers(paginatedData);
                setTotalItems(filteredData.length); // Set total items based on subscribed users
        },
        []
    );

    useEffect(() => {
        fetchSubscribers(pageNum, pageSize);
    }, [pageNum, pageSize, fetchSubscribers]);

    useEffect(() => {
        const filtered = allSubscribers.filter(sub =>
            sub.subscriber_name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        const paginatedFiltered = filtered.slice((pageNum - 1) * pageSize, pageNum * pageSize);
        setSubscribers(paginatedFiltered);
        setTotalItems(filtered.length);
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
                    enterButton={<SearchOutlined />}
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
