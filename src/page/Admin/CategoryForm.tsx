import React from 'react';
import { Form, Input, Button } from 'antd';

interface CategoryFormProps {
  initialValues?: { id?: number; name: string };
  onSubmit: (values: { name: string }) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <Form
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the category name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
