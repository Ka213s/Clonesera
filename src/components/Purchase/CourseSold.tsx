import React, { useCallback, useEffect, useState } from 'react';
import { Table, Button, Input, message, Pagination } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { getItemsByInstructor } from '../../utils/commonImports';
import { getStatusTag } from '../../utils/statusTagUtils';
import { createPayout } from '../../services/Api';
import { toast } from 'react-toastify';

interface PurchaseData {
  _id: string;
  purchase_no: string;
  cart_no: string;
  course_name: string;
  status: string;
  price_paid: number;
  student_name: string;
}

interface ApiResponse {
  pageData: PurchaseData[];
  pageInfo: {
    totalItems: number;
    pageNum: number;
    pageSize: number;
  };
}

const Purchase: React.FC = () => {
  const [data, setData] = useState<PurchaseData[]>([]);
  const [filteredData, setFilteredData] = useState<PurchaseData[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const fetchData = useCallback(async (pageInfo: { pageNum: number; pageSize: number }) => {
    try {
      const result: ApiResponse = await getItemsByInstructor({
        searchCondition: { // Adapt this as necessary for your API
          purchase_no: '',
          cart_no: '',
          course_id: '',
          status: '',
          is_delete: false,
        },
        pageInfo,
      });
      setData(result.pageData);
      setPagination((prev) => ({
        ...prev,
        total: result.pageInfo.totalItems,
        current: result.pageInfo.pageNum,
        pageSize: result.pageInfo.pageSize,
      }));
    } catch (error) {
      message.error('Failed to fetch data');
      console.error('Failed to fetch data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData({
      pageNum: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    });
  }, [pagination.current, pagination.pageSize, fetchData]);

  useEffect(() => {
    // Apply client-side search filtering
    if (searchKeyword) {
      const keywordLower = searchKeyword.toLowerCase();
      const filtered = data.filter(item =>
        item.course_name.toLowerCase().includes(keywordLower)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchKeyword, data]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
      total: pagination.total || 0,
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

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    // Reset to first page on search
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination({
      current: page,
      pageSize: pageSize || pagination.pageSize,
      total: pagination.total,
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
      <Input.Search
        placeholder="Search by course name"
        enterButton="Search"
        allowClear
        onSearch={handleSearch}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Button
        type="primary"
        onClick={handleCreatePayout}
        disabled={selectedRowKeys.length === 0} 
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
        dataSource={filteredData}
        pagination={false} 
        onChange={handleTableChange}
        rowKey="_id"
      />
      <div className="flex justify-end mt-5">
        <Pagination
          total={pagination.total}
          current={pagination.current}
          pageSize={pagination.pageSize}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          onChange={handlePaginationChange}
          style={{ marginTop: 16 }}
        />
      </div>
    </div>
  );
};

export default Purchase;
