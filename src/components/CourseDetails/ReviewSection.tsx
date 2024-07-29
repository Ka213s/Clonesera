import React from "react";
import { Button, Form, Input, message, Rate } from "antd";
import { createReview } from '../../utils/commonImports';

interface ReviewSectionProps {
  courseId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ courseId }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: { reviewer: string; comment: string; rating: number }) => {
    try {
      await createReview({
        course_id: courseId,
        comment: values.comment,
        rating: values.rating,
      });

      form.resetFields();
      message.success("Review submitted successfully");
    } catch (error) {
      message.error("Failed to submit review");
    }
  };

  return (
    <div className="mt-8 border-2 border-gray-100 p-4 rounded-lg">
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
          rules={[{ required: true, message: "Please enter your review" }]}
          className="flex-1"
        >
          <Input 
            placeholder="Add a public comment..." 
            className="border rounded-full px-4 py-2 w-full"
          />
        </Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="mb-4 custom-button p-4 bg-green-500 text-black"
        >
          Submit Review
        </Button>
      </Form>
    </div>
  );
};

export default ReviewSection;
