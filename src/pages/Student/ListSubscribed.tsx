import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Table, Pagination } from 'antd';
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
                const filteredData = data.pageData.filter((item: Subscribed) => item.is_subscribed);
                setSubscriptions(filteredData);
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

    const handleSubscribeToggle = async (instructor_id: string, is_subscribed: boolean) => {
        try {
            await updateSubscribed(instructor_id);
            toast.success(is_subscribed ? 'Unsubscribed successfully' : 'Subscribed successfully');
            setSubscriptions(prev => 
                prev.map((sub: Subscribed) => 
                    sub.instructor_id === instructor_id 
                        ? { ...sub, is_subscribed: !is_subscribed } 
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
