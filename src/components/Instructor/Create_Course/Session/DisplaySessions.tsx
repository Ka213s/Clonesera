import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import moment from 'moment';
import { getSessions } from '../../../../utils/commonImports';
import ButtonEdit from './EditSession';
import ButtonDelete from './DeleteSession';
  
interface Session {
  _id: string;
  name: string;
  course_name: string;
  created_at: string;
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
      
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Session) => (
        <>
          <ButtonEdit _id={record._id} />
          <ButtonDelete _id={record._id} />
        </>
      ),
      align: 'center',
    },
  ];

  return (
    <Table
      dataSource={sessions}
      columns={columns}
      rowKey="_id"
      style={{ textAlign: 'center' }}
    />
  );
};

export default DisplaySessions;
