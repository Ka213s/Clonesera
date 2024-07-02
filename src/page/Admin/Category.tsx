import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CategoryForm from './CategoryForm';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../../services/Api';

interface Category {
  _id: string;
  name: string;
  parent_category_id: string | null;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

const Category: React.FC = () => {
  const [data, setData] = useState<{ id: string; name: string }[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<{ id: string; name: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  const fetchCategoriesData = async (pageNum: number = 1, pageSize: number = 10) => {
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
        setData(filteredCategories);
        setFilteredCategories(filteredCategories);
        setPagination({
          current: pageNum,
          pageSize,
          total: result.data.pageInfo.totalItems,
        });
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      message.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategoriesData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const handleFormSubmit = async (values: { name: string }) => {
    try {
      await api.createCategory(values);
      fetchCategoriesData(pagination.current, pagination.pageSize);
      message.success('Category added successfully');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to handle form submission:', error);
      message.error('Failed to add category');
    }
  };

  return (
    <div className="pt-10 px-6">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        className='!bg-[#9997F5] hover:!bg-[#8886E5]'
      >
        Add New Category
      </Button>
      <Table
        dataSource={filteredCategories}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, size) => {
            setPagination(prev => ({ ...prev, current: page, pageSize: size }));
            fetchCategoriesData(page, size);
          },
        }}
      >
        <Table.Column title="Name" dataIndex="name" key="name" />
      </Table>
      <Modal
        title="Add New Category"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <CategoryForm onSubmit={handleFormSubmit} />
      </Modal>
    </div>
  );
};

export default Category;
