import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { getSessions } from '../../../utils/commonImports';
import moment from 'moment';
interface Session {
  _id: string;
  name: string;
  course_name: string;
}

const DisplaySessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const fetchSessions = async () => {
    try {
      const response = await getSessions(
        {
          keyword: '',
          course_id: '',
          is_position_order: false,
          is_deleted: false,
        },
        1,
        10
      );
      setSessions(response.pageData);
    } catch (error) {
      console.error('Failed to fetch sessions', error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const columns: TableColumnsType<Session> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
   
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
     
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => moment(text).format('DD-MM-YYYY'),
      
    }
  ];

  return (
    <Table
      dataSource={sessions}
      columns={columns}
      rowKey="_id"
    />
  );
};

export default DisplaySessions;
