import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const DashboardStatistics: React.FC = () => {
  return (
    <Row gutter={16} className="mb-6 flex justify-between">
      <Col span={6}>
        <Card className="rounded-lg shadow-md">
          <Statistic
            title={<span className="text-lg">Total Students : <span className="font-bold">10580</span></span>}
            value={200}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
          <div className="mt-2 flex justify-center text-sm">
            <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-600">+2.6% than last week</span>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card className="rounded-lg shadow-md">
          <Statistic
            title={<span className="text-lg">Total Instructors : <span className="font-bold">350</span></span>}
            value={350}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
          <div className="mt-2 flex justify-center text-sm">
            <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-600">-2.6% than last week</span>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card className="rounded-lg shadow-md">
          <Statistic
            title={<span className="text-lg">Total Courses : <span className="font-bold">455</span></span>}
            value={455}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
          <div className="mt-2 flex justify-center text-sm">
            <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-600">+2.6% than last week</span>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card className="rounded-lg shadow-md">
          <Statistic
            title={<span className="text-lg">Total Book Sales : <span className="font-bold">95</span></span>}
            value={95}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
          <div className="mt-2 flex justify-center text-sm">
            <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-600">-2.6% than last week</span>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardStatistics;
