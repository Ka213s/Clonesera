import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

interface Session {
  _id: string;
  name: string;
  course_name: string;
  created_at: string;
}

interface SessionTableProps {
  sessions: Session[];
}

const SessionTable: React.FC<SessionTableProps> = ({ sessions }) => {
  const sessionColumns: ColumnsType<Session> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Course Name', dataIndex: 'course_name', key: 'course_name' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (text: string) => moment(text).format('DD-MM-YYYY') },
  ];

  return (
    <Table
      columns={sessionColumns}
      dataSource={sessions}
      rowKey="_id"
    />
  );
};

export default SessionTable;
