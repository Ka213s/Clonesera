import React, { useEffect, useState } from "react";
import { List, Rate } from "antd";
import { getReviews } from '../../utils/commonImports';

interface Review {
  id: string;
  reviewer_name: string;
  comment: string;
  rating: number;
  updated_at: string;
}

interface ReviewSectionProps {
  courseId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ courseId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews({
        searchCondition: {
          course_id: courseId,
          rating: 0,
          is_instructor: false,
          is_rating_order: false,
          is_deleted: false,
        },
        pageInfo: { pageNum: 1, pageSize: 10 },
      });
      setReviews(data.pageData);
    };

    fetchReviews();
  }, [courseId]);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4">Reviews</h2>
      <List
        className="mt-4"
        header={`${reviews.length} reviews`}
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div className="flex justify-between">
                  <strong>{review.reviewer_name}</strong>
                  <span className="text-gray-500">
                    {new Date(review.updated_at).toLocaleString()}
                  </span>
                </div>
              }
              description={
                <>
                  <Rate disabled defaultValue={review.rating} />
                  <p>{review.comment}</p>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

const ReviewSubmit: React.FC<{ courseId: string | null }> = ({ courseId }) => {
  if (!courseId) {
    return null;
  }

  return <ReviewSection courseId={courseId} />;
};

export default ReviewSubmit;
