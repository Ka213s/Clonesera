import React from 'react';
import { Form, Input, Button } from 'antd';

interface SubCategoryFormProps {
  initialValues?: { name: string; parentCategory: string };
  onSubmit: (values: { name: string; parentCategory: string }) => void;
}

const SubCategoryForm: React.FC<SubCategoryFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { name: string; parentCategory: string }) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter the name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="parentCategory"
        label="Parent Category"
        rules={[{ required: true, message: 'Please enter the parent category' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubCategoryForm;
