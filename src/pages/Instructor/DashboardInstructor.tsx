import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { BookOutlined, UsergroupAddOutlined, AppstoreOutlined } from '@ant-design/icons';
import { getCourses, getSubscribers } from '../../services/Api';

const InstructorDashboard: React.FC = () => {
    const [totalCourses, setTotalCourses] = useState<number | null>(null);
    const [totalSubscribers, setTotalSubscribers] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchConditionCourses = {
                    keyword: '',
                    category: '',
                    status: '',
                    is_deleted: false,
                };
                const courseData = await getCourses(searchConditionCourses, 1, 10);
                console.log("Total Courses:", courseData);
                setTotalCourses(courseData.pageInfo.totalItems);

                const searchConditionSubscribers = {
                    keyword: '',
                    is_delete: false,
                };
                const subscriberData = await getSubscribers(searchConditionSubscribers, 1, 10);
                console.log("Total Subscribers:", subscriberData);
                setTotalSubscribers(subscriberData.pageInfo.totalItems);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    const stats = [
        {
            title: 'Total Courses',
            value: totalCourses,
            icon: <BookOutlined style={{ fontSize: '48px', color: '#ff85c0' }} />
        },
        {
            title: 'Total Subscribers',
            value: totalSubscribers,
            icon: <UsergroupAddOutlined style={{ fontSize: '48px', color: '#9254de' }} />
        }
    ];

    return (
        <div className="p-4">
            <div className="flex items-center mb-4">
                <AppstoreOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
                <h2 className="text-xl font-semibold">Instructor Dashboard</h2>
            </div>
            <Row gutter={[16, 16]}>
                {stats.map((stat, index) => (
                    <Col key={index} xs={24} sm={12} lg={6}>
                        <Card className="hover:shadow-md">
                            <div className="flex justify-between items-center">
                                <div>{stat.icon}</div>
                                <div className="text-right">
                                    <div className="text-xl mb-4">{stat.title}</div>
                                    <div className="text-xl font-bold">{stat.value}</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default InstructorDashboard;
