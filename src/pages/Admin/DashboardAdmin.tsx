import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { DollarOutlined, TagsOutlined, BookOutlined, TeamOutlined, CommentOutlined, AppstoreOutlined } from '@ant-design/icons';
import { getSettingDefault, getUsers, getCategories, getCourses, getBlogs } from '../../services/Api';


const AdminDashboard: React.FC = () => {
  const [TotalMoney, setTotalMoney] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalCategories, setTotalCategories] = useState<number | null>(null);
  const [totalCourses, setTotalCourses] = useState<number | null>(null);
  const [totalBlogs, setTotalBlogs] = useState<number | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingData = await getSettingDefault();
        setTotalMoney(settingData.balance_total);

        const searchConditionUsers = {
          keyword: '',
          role: 'all',
          status: true,
          is_deleted: false,
          is_verified: '',
        };
        const userData = await getUsers(searchConditionUsers, 1, 10);
        console.log("Test Total Users:", userData);
        setTotalUsers(userData.pageInfo.totalItems);

        const searchConditionCategories = {
          keyword: '',
          category: '',
          status: '',
          is_deleted: false,
        };
        const categoryData = await getCategories(searchConditionCategories, 1, 10);
        console.log("Test Total Categories:", categoryData);
        setTotalCategories(categoryData.pageInfo.totalItems);

        const searchConditionCourses = {
          keyword: '',
          category: '',
          status: '',
          is_deleted: false,
        };
        const courseData = await getCourses(searchConditionCourses, 1, 10);
        console.log("Test Total Courses:", courseData);
        setTotalCourses(courseData.pageInfo.totalItems);

        const searchConditionBlogs = {
          category_id: '',
          is_deleted: false,
        };
        const blogData = await getBlogs({ searchCondition: searchConditionBlogs, pageInfo: { pageNum: 1, pageSize: 10 } });
        console.log("Test Total Blogs:", blogData);
        setTotalBlogs(blogData.pageInfo.totalItems);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: 'Total Money',
      value: TotalMoney,
      icon: <DollarOutlined style={{ fontSize: '48px', color: '#faad14' }} />
    },
    {
      title: 'Total Categories',
      value: totalCategories,
      icon: <TagsOutlined style={{ fontSize: '48px', color: '#9254de' }} />
    },
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: <BookOutlined style={{ fontSize: '48px', color: '#ff85c0' }} />
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: <TeamOutlined style={{ fontSize: '48px', color: '#9254de' }} />
    },
    {
      title: 'Total Blogs',
      value: totalBlogs,
      icon: <CommentOutlined style={{ fontSize: '48px', color: '#9254de' }} />
    }
  ];

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <AppstoreOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
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

export default AdminDashboard;
