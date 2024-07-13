// src/pages/Subscriber.tsx
import { React, useEffect, useState, useCallback, useMemo, getSubscribers, Table, Pagination } from '../../utils/commonImports';
import { toast } from 'react-toastify';
import { ColumnsType } from 'antd/es/table';
import 'react-toastify/dist/ReactToastify.css';

interface Subscriber {
    _id: string;
    subscriber_name: string;
}

const Subscriber: React.FC = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [pageNum, setPageNum] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);

    const fetchSubscribers = useCallback(
        async (page: number, pageSize: number) => {
            try {
                const data = await getSubscribers(
                    { keyword: '', is_delete: false },
                    page,
                    pageSize
                );
                setSubscribers(data.pageData);
                setTotalItems(data.pageInfo.totalItems);
            } catch (error) {
                toast.error('Failed to fetch subscribers');
            }
        },
        []
    );

    useEffect(() => {
        fetchSubscribers(pageNum, pageSize);
    }, [pageNum, pageSize, fetchSubscribers]);

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

    return (
        <div className="p-4">
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
