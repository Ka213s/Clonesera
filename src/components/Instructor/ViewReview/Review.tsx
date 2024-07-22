import React, { useEffect, useState } from 'react';
import { Table, Rate, message } from 'antd';
import { getReviews, getReviewById } from '../../../utils/commonImports';

interface ReviewData {
  _id: string;
  reviewer_name: string;
  course_name: string;
  comment: string;
  rating: number;
  updated_at: string;
}

const Review: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewData = await getReviews({
          searchCondition: {
            course_id: "",
            rating: 0,
            is_instructor: false,
            is_rating_order: false,
            is_deleted: false,
          },
          pageInfo: { pageNum: 1, pageSize: 10 },
        });
  
        const detailedReviews: ReviewData[] = await Promise.all(
          reviewData.pageData.map(async (review: { _id: string }) => {
            const detailedReview = await getReviewById(review._id);
            return {
              _id: detailedReview._id,
              reviewer_name: detailedReview.reviewer_name,
              course_name: detailedReview.course_name,
              comment: detailedReview.comment,
              rating: detailedReview.rating,
              updated_at: detailedReview.updated_at,
            };
          })
        );

        setReviews(detailedReviews);
      } catch (error) {
        message.error('Error fetching reviews');
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

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
      <h2 className="text-3xl font-bold mb-4">Reviews</h2>
      <Table
        columns={columns}
        dataSource={reviews}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
};

export default Review;
