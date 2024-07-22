import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { getItemsByInstructor } from '../../utils/commonImports';
import { getStatusTag } from '../../utils/statusTagUtils';
import { createPayout } from '../../services/Api';
import { toast } from 'react-toastify';

interface PurchaseData {
  _id: string; // Add the _id field
  purchase_no: string;
  cart_no: string;
  course_name: string;
  status: string;
  price_paid: number;
  student_name: string;
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

  const handleCreatePayout = async (purchase: PurchaseData) => {
    try {
      const transactions = [{ purchase_id: purchase._id }]; // Use _id for transaction
      const response = await createPayout(transactions);
      console.log('Payout response:', response);
    } catch (error) {
      toast.error("Failed to create payout");
      console.error('Failed to create payout:', error);
    }
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
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Price Paid',
      dataIndex: 'price_paid',
      key: 'price_paid',
    },
    {
      title: 'Student Name',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: PurchaseData) => (
        <Button type="primary" onClick={() => handleCreatePayout(record)}>
          Create Payout
        </Button>
      ),
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
        rowKey="_id" // Use _id as the row key
      />
    </div>
  );
};

export default Purchase;
