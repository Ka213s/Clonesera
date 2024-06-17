import React from 'react';
import { Form, Input, Button } from 'antd';

interface CategoryFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Category Name"
        rules={[{ required: true, message: 'Please input the category name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
