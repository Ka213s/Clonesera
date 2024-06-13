import React from 'react';
import { Card, Col, Row, Table, Tag, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AiOutlinePlus } from 'react-icons/ai';
import MainLayout from '../../layouts/MainLayout';
import PopularCourses from './PopularCourses';
import StudentsOverview from './StudentsOverview';
import TopInstructors from './TopInstructors';
import DashboardStatistics from './DashboardStatistics';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const pieData = [
  { name: 'In Progress', value: 400 },
  { name: 'Not Completed', value: 300 },
  { name: 'Completed', value: 300 },
];

const columns = [
  {
    title: 'Course Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <div>
        <img
          src={`/path/to/course/image`}
          alt="course"
          className="w-8 h-8 rounded-full mr-2"
        />
        {text}
      </div>
    ),
  },
  {
    title: 'Instructors',
    dataIndex: 'instructors',
    key: 'instructors',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Course Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'Active' ? 'green' : 'red'}>
        {status}
      </Tag>
    ),
  },
];

const coursesData = [
  {
    key: '1',
    name: 'Introduction of UI/UX',
    instructors: 'Esther Howard',
    category: 'Design',
    duration: '3 Month',
    amount: '$450',
    type: 'Online',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Introduction of UI/UX',
    instructors: 'Esther Howard',
    category: 'Design',
    duration: '3 Month',
    amount: '$450',
    type: 'Online',
    status: 'Active',
  },
  {
    key: '3',
    name: 'Introduction of UI/UX',
    instructors: 'Esther Howard',
    category: 'Design',
    duration: '3 Month',
    amount: '$450',
    type: 'Online',
    status: 'Active',
  },
];

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="site-statistic-demo-card pt-10">
        <div className="flex justify-end mb-4">
          <Button
            type="primary"
            icon={<AiOutlinePlus />}
            className="bg-[#9997F5] border-[#9997F5] mr-4"
          >
            Add Order
          </Button>
          <Button
            type="primary"
            icon={<AiOutlinePlus />}
            className="bg-[#9997F5] border-[#9997F5]"
          >
            Add User
          </Button>
        </div>
        <DashboardStatistics />
        <Row gutter={16} className="mb-6">
          <Col span={16}>
            <Card>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'In Progress' ? '#8884d8' : entry.name === 'Not Completed' ? '#FF8042' : '#0088FE'} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <PopularCourses />
          </Col>
          <Col span={8}>
            <StudentsOverview />
          </Col>
          <Col span={8}>
            <TopInstructors />
          </Col>
        </Row>
        <Row gutter={16} className="mb-6">
          <Col span={24}>
            <Card>
              <Table columns={columns} dataSource={coursesData} pagination={false} />
            </Card>
          </Col>
        </Row>

      </div>
    </MainLayout>
  );
};

export default Dashboard;
