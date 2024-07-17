import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { getItemsByInstructor } from '../../../utils/commonImports';

interface PurchaseData {
  purchase_no: string;
  cart_no: string;
  course_id: string;
  status: string;
  // Add other fields as necessary
}

interface ApiResponse {
  pageData: PurchaseData[];
  total: number;
}

const Purchase: React.FC = () => {
  const [data, setData] = useState<PurchaseData[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchData({
      pageNum: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    });
  }, [pagination.current]);

  const fetchData = async (pageInfo: { pageNum: number; pageSize: number }) => {
    try {
      const result: ApiResponse = await getItemsByInstructor({
        searchCondition: {},
        pageInfo,
      });
      setData(result.pageData);
      console.log('result:', result);
      setPagination({
        ...pagination,
        total: result.total,
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      ...pagination,
      current: pagination.current || 1,
    });
  };

  const columns = [
    {
      title: 'Purchase No',
      dataIndex: 'purchase_no',
      key: 'purchase_no',
    },
    {
      title: 'Cart No',
      dataIndex: 'cart_no',
      key: 'cart_no',
    },
    {
      title: 'Course ID',
      dataIndex: 'course_id',
      key: 'course_id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    // Add other columns as needed
  ];

  return (
    <div>
      <Button type="primary" onClick={() => fetchData({
        pageNum: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
      })}>
        Reload
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="purchase_no"
      />
    </div>
  );
};

export default Purchase;
