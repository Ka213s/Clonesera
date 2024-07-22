import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'antd';
import moment from 'moment';
import { getItemsByStudent } from '../../utils/commonImports';

interface Course {
  _id: string;
  purchase_no: string;
  status: string;
  price_paid: number;
  price: number;
  discount: number;
  cart_id: string;
  course_id: string;
  student_id: string;
  instructor_id: string;
  created_at: string;
  is_deleted: boolean;
  cart_no: string;
  course_name: string;
  student_name: string;
  instructor_name: string;
}

interface FetchData {
  searchCondition: {
    purchase_no: string;
    cart_no: string;
    course_id: string;
    status: string;
    is_delete: boolean;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
}

const PurchasedCours: React.FC = () => {
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      const data: FetchData = {
        searchCondition: {
          purchase_no: "",
          cart_no: "",
          course_id: "",
          status: "",
          is_delete: false
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10
        }
      };

      try {
        const response = await getItemsByStudent(data);
        console.log('response:', response);
        setPurchasedCourses(response.pageData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: 'Purchase Number',
      dataIndex: 'purchase_no',
      key: 'purchase_no',
    },
    {
      title: 'Price Paid',
      dataIndex: 'price_paid',
      key: 'price_paid',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Student Name',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: 'Instructor Name',
      dataIndex: 'instructor_name',
      key: 'instructor_name',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => moment(text).format('DD/MM/YYYY'),
    },
  ];

  if (loading) return null;
  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

  return (
    <div>
   
      <Table columns={columns} dataSource={purchasedCourses} rowKey="_id" />
    </div>
  );
};

export default PurchasedCours;
