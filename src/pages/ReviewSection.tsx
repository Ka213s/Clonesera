import React, { useEffect, useState } from "react";
import { Button, Form, Input, List, message, Rate } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { createReview, getReviews, updateReview } from '../utils/commonImports';

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
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
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
        console.log(courseId);
        setReviews(data.pageData);
      } catch (error) {
        message.error("Error fetching reviews");
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [courseId]);

  const handleSubmit = async (values: { reviewer: string; comment: string; rating: number }) => {
    if (editingReview) {
      // Update review
      try {
        await updateReview(editingReview.id, {
          course_id: courseId,
          comment: values.comment,
          rating: values.rating,
        });

        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === editingReview.id
              ? { ...review, reviewer_name: values.reviewer, comment: values.comment, rating: values.rating, updated_at: new Date().toISOString() }
              : review
          )
        );

        message.success("Review updated successfully");
        setEditingReview(null);
        form.resetFields();
      } catch (error) {
        message.error("Error updating review");
        console.error("Error updating review:", error);
      }
    } else {
      // Create new review
      try {
        await createReview({
          course_id: courseId,
          comment: values.comment,
          rating: values.rating,
        });

        setReviews((prevReviews) => [
          ...prevReviews,
          {
            id: `${prevReviews.length + 1}`,
            reviewer_name: values.reviewer,
            comment: values.comment,
            rating: values.rating,
            updated_at: new Date().toISOString(),
          },
        ]);
        form.resetFields();
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    form.setFieldsValue({
      reviewer: review.reviewer_name,
      comment: review.comment,
      rating: review.rating,
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4">Reviews</h2>
      <List
        className="mt-4"
        header={`${reviews.length} reviews`}
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item
            actions={[<EditOutlined key="edit" onClick={() => handleEdit(review)} />]}
          >
            <List.Item.Meta
              title={
                <div className="flex justify-between">
                  <strong>{review.reviewer_name}</strong>
                  <span className="text-gray-500">{new Date(review.updated_at).toLocaleString()}</span>
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
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
     
       
        <Form.Item
          name="rating"
          label="Your Rating"
          rules={[{ required: true, message: "Please rate the course" }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Your Review"
          rules={[{ required: true, message: "Please enter your review" }]}
        >
          <Input.TextArea placeholder="Enter your review" rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {editingReview ? "Update Review" : "Submit Review"}
        </Button>
      </Form>
    </div>
  );
};

export default ReviewSection;
