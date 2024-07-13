// src/pages/Subscription.tsx
import { React, useEffect, useState, useCallback, useMemo, Button, Table, Pagination  } from '../../utils/commonImports';
import { toast } from 'react-toastify';
import { ColumnsType } from 'antd/es/table';
import 'react-toastify/dist/ReactToastify.css';
import { getSubscribeds, updateSubscribed } from '../../services/Api';

interface Subscribed {
    _id: string;
    instructor_name: string;
    instructor_id: string;
}

const ListSubscribed: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscribed[]>([]);
    const [pageNum, setPageNum] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);

    const fetchSubscriptions = useCallback(
        async (page: number, pageSize: number) => {
            try {
                const data = await getSubscribeds(
                    { keyword: '', is_delete: false },
                    page,
                    pageSize
                );
                setSubscriptions(data.pageData);
                setTotalItems(data.pageInfo.totalItems);
            } catch (error) {
                toast.error('Failed to fetch subscriptions');
            } finally {
            }
        },
        []
    );

    useEffect(() => {
        fetchSubscriptions(pageNum, pageSize);
    }, [pageNum, pageSize, fetchSubscriptions]);

    const handleSubscribe = async (instructor_id: string) => {
        try {
            await updateSubscribed(instructor_id);
            toast.success('Subscription updated successfully');
            fetchSubscriptions(pageNum, pageSize);
        } catch (error) {
            toast.error('Failed to update subscription');
        }
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
                            onClick={() => handleSubscribe(record.instructor_id)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Subscribe
                        </Button>
                    </div>
                ),
            },
        ],
        [handleSubscribe]
    );

    return (
        <div className="p-4">
            <Table
                columns={columns}
                dataSource={subscriptions.map(sub => ({ ...sub, key: sub._id }))}
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
                    fetchSubscriptions(page, pageSize);
                }}
                showSizeChanger
                className="text-center"
            />
        </div>
    );
};

export default ListSubscribed;
