import React, { useEffect, useState, useCallback } from 'react';
import { Table, Rate, Input, Pagination } from 'antd';
import { getReviews } from '../../../utils/commonImports';
import { SearchOutlined } from '@ant-design/icons';

interface ReviewData {
  _id: string;
  reviewer_name: string;
  course_name: string;
  comment: string;
  rating: number;
  updated_at: string;
}

interface ReviewResponse {
  pageData: ReviewData[];
  pageInfo: {
    totalItems: number;
  };
}

const { Search } = Input;

const Review: React.FC = () => {
  const [filteredReviews, setFilteredReviews] = useState<ReviewData[]>([]);

  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const fetchReviews = useCallback(
    async (page: number, size: number) => {
  
        const reviewData: ReviewResponse = await getReviews({
          searchCondition: {
            course_id: "", 
            rating: 0,
            is_instructor: false,
            is_rating_order: false,
            is_deleted: false,
          },
          pageInfo: { pageNum: page, pageSize: size },
        });
        const filtered = reviewData.pageData.filter(review =>
          review.course_name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setFilteredReviews(filtered);
        setTotalReviews(reviewData.pageInfo.totalItems);
    
    },
    [searchKeyword]
  );

  useEffect(() => {
    fetchReviews(pageNum, pageSize);
  }, [pageNum, pageSize, fetchReviews]);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setPageNum(1); 
  };

  const columns = [
    {
      title: 'Reviewer Name',
      dataIndex: 'reviewer_name',
      key: 'reviewer_name',
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (updated_at: string) => new Date(updated_at).toLocaleString(),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by course name"
          enterButton={<SearchOutlined />}
          allowClear
          size="large"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredReviews}
        rowKey="_id"
      
        pagination={false} 
      />
      <div className="flex justify-end mt-5">
        <Pagination
          current={pageNum}
          pageSize={pageSize}
          total={totalReviews}
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

export default Review;
