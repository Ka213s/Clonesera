import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { getItemsByInstructor } from '../../utils/commonImports';
import { getStatusTag } from '../../utils/statusTagUtils';
import { createPayout } from '../../services/Api';
import { toast } from 'react-toastify';

interface PurchaseData {
  _id: string; // Use _id field
  purchase_no: string;
  cart_no: string;
  course_name: string;
  status: string;
  price_paid: number;
  student_name: string;
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

  const handleSelectChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleCreatePayout = async () => {
    try {
      const transactions = selectedRowKeys.map((id) => ({ purchase_id: id as string }));
      const response = await createPayout(transactions);
      console.log('Payout response:', response);
      toast.success("Payout created successfully!");
      setSelectedRowKeys([]); // Clear selection after creation
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
  ];

  return (
    <div>
      <Button type="primary" onClick={() => fetchData({
        pageNum: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
      })}>
        Reload
      </Button>
      <Button
        type="primary"
        onClick={handleCreatePayout}
        disabled={selectedRowKeys.length === 0} // Disable if no rows are selected
        style={{ marginLeft: 10 }}
      >
        Create Payout
      </Button>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectChange,
        }}
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
