import { React, useEffect, useState, useCallback, Table, Pagination, Input, message, getSessions, SearchOutlined } from '../../../../utils/commonImports';
import moment from 'moment';
import ButtonEdit from './EditSession';
import ButtonDelete from './DeleteSession';
import type { ColumnsType } from 'antd/es/table';

interface Session {
  _id: string;
  name: string;
  course_name: string;
  created_at: string;
}

const { Search } = Input;

const DisplaySessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const fetchSessions = useCallback(
    async (page: number, size: number, keyword: string) => {
      try {
        const response = await getSessions(
          {
            keyword: keyword,
            course_id: '',
            is_position_order: false,
            is_deleted: false,
          },
          page,
          size
        );
        setSessions(response.pageData);
        setTotalSessions(response.pageInfo.totalItems); // Assuming response contains pageInfo with totalItems
      } catch (error) {
        message.error('Failed to fetch sessions');
        console.error('Failed to fetch sessions', error);
      }
    },
    []
  );

  useEffect(() => {
    fetchSessions(pageNum, pageSize, searchKeyword);
  }, [pageNum, pageSize, searchKeyword, fetchSessions]);

  const columns: ColumnsType<Session> = [
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

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setPageNum(1); // Reset to first page on search
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by session name"
          enterButton={<SearchOutlined />}
          allowClear
          size="large"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <Table
        dataSource={sessions}
        columns={columns}
        rowKey="_id"
        style={{ textAlign: 'center' }}
        pagination={false}
      />
      <div className="flex justify-end mt-5">
        <Pagination
          current={pageNum}
          pageSize={pageSize}
          total={totalSessions}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          onChange={(page, pageSize) => {
            setPageNum(page);
            setPageSize(pageSize);
          }}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default DisplaySessions;
