// src/pages/Subscription.tsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Table, Pagination } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { toast } from 'react-toastify';
import { getSubscribeds, updateSubscribed } from '../../utils/commonImports';
import 'react-toastify/dist/ReactToastify.css';

interface Subscribed {
    _id: string;
    instructor_name: string;
    instructor_id: string;
    subscribed: boolean;
}

const Subscribed: React.FC = () => {
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
                setSubscriptions(data.pageData.map((sub: Subscribed) => ({ ...sub, subscribed: true }))); // Assuming initially all are subscribed
                setTotalItems(data.pageInfo.totalItems);
            } catch (error) {
                toast.error('Failed to fetch subscriptions');
            }
        },
        []
    );

    useEffect(() => {
        fetchSubscriptions(pageNum, pageSize);
    }, [pageNum, pageSize, fetchSubscriptions]);

    const handleSubscribeToggle = async (instructor_id: string, subscribed: boolean) => {
        try {
            await updateSubscribed(instructor_id); // Call the same API function
            toast.success(subscribed ? 'Unsubscribed successfully' : 'Subscribed successfully');
            setSubscriptions(prev => 
                prev.map((sub: Subscribed) => 
                    sub.instructor_id === instructor_id 
                        ? { ...sub, subscribed: !subscribed } 
                        : sub
                )
            );
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
                            onClick={() => handleSubscribeToggle(record.instructor_id, record.subscribed)}
                            className={record.subscribed ? 'text-red-500 hover:text-red-700' : 'text-blue-500 hover:text-blue-700'}
                        >
                            {record.subscribed ? 'Unsubscribe' : 'Subscribe'}
                        </Button>
                    </div>
                ),
            },
        ],
        [handleSubscribeToggle]
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

export default Subscribed;
