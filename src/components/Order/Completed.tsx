import { React, useEffect, useState, useCallback, Table, Pagination, getCart } from '../../utils/commonImports';
import { toast } from 'react-toastify';
import { ColumnsType } from 'antd/es/table';
import 'react-toastify/dist/ReactToastify.css';

interface CartItem {
  _id: string;
  course_name: string;
  price_paid: number;
  created_at: string;
}

const Completed: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchCartItems = useCallback(
    async (page: number, pageSize: number) => {
      const data = {
        searchCondition: {
          status: 'completed',
          is_deleted: false,
        },
        pageInfo: {
          pageNum: page,
          pageSize: pageSize,
        },
      };

      try {
        const response = await getCart(data);
        setCartItems(response.pageData);
        setTotalItems(response.pageInfo.totalItems);
      } catch (error) {
        toast.error('Failed to fetch cart items');
      }
    },
    []
  );

  useEffect(() => {
    fetchCartItems(pageNum, pageSize);
  }, [pageNum, pageSize, fetchCartItems]);

  const columns: ColumnsType<CartItem> = [
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: 'Price',
      dataIndex: 'price_paid',
      key: 'price_paid',
      render: (price_paid: number) => `$${price_paid.toFixed(2)}`,
    },
    {
      title: 'Purchased Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => new Date(created_at).toLocaleString(),
    },
  ];

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={cartItems.map(item => ({ ...item, key: item._id }))}
        pagination={false}
        className="mb-4"
      />
      <Pagination
        current={pageNum}
        pageSize={pageSize}
        total={totalItems}
        onChange={(page, pageSize) => {
          setPageNum(page);
          setPageSize(pageSize);
          fetchCartItems(page, pageSize);
        }}
        showSizeChanger
        className="text-center"
      />
    </div>
  );
};

export default Completed;
