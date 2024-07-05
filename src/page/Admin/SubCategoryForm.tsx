import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Spin, Alert, message } from 'antd';
import { createApiInstance } from '../../services/Api';  
import { useNavigate } from 'react-router-dom';

interface Category {
  _id: string;
  name: string;
  parent_category_id: string | null;
}

interface SubCategoryFormProps {
  initialValues?: { name: string; parentCategory: string; description: string };
  onSubmit: (values: { name: string; parentCategory: string; description: string }) => void;
}

const SubCategoryForm: React.FC<SubCategoryFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{ current: number, pageSize: number }>({ current: 1, pageSize: 10 });
  const navigate = useNavigate();
  const api = createApiInstance(navigate); 

  
  const fetchCategories = async (pageNum: number = 1, pageSize: number = 10) => {
    try {
      const searchCondition = {};  
      const result = await api.getCategories(searchCondition, pageNum, pageSize);
      if (result && result.data) {
        const categories: Category[] = result.data.pageData || [];
        const filteredCategories = categories
          .filter(category => category.parent_category_id === null)
          .map(category => ({
            id: category._id,
            name: category.name,
          }));

        console.log('Categories:', filteredCategories);
        setCategories(filteredCategories);
        setPagination(prev => ({
          current: pageNum,
          pageSize,
          total: result.data.pageInfo.totalItems,
        }));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const handleFinish = (values: { name: string; parentCategory: string; description: string }) => {
    onSubmit(values);
  };

  if (loading) return <Spin />;

  if (error) return <Alert message={error} type="error" />;

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
        rules={[{ required: true, message: 'Please select the parent category' }]}
      >
        <Select placeholder="Select a parent category">
          {categories.map(category => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter the description' }]}
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
