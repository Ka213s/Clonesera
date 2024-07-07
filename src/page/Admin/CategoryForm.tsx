import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

interface CategoryFormProps {
  onSubmit: (values: { name: string; parent_category_id?: string | null }) => void;
  initialValues: { name: string; parent_category_id?: string | null };
  parentCategories: { id: string; name: string }[];
  isSubCategory: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  initialValues,
  parentCategories,
  isSubCategory,
}) => {
  return (
    <Form
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the category name!' }]}
      >
        <Input />
      </Form.Item>
      {isSubCategory && (
        <Form.Item
          name="parent_category_id"
          label="Parent Category"
          rules={[{ required: true, message: 'Please select a parent category!' }]}
        >
          <Select placeholder="Select a parent category">
            {parentCategories.map(cat => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
