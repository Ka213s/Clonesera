import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import { createApiInstance } from '../../services/Api'; // Import the API functions

interface Category {
  id: number;
  name: string;
}

const Category: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();
  const api = createApiInstance(navigate);
  const fetchCategoriesData = async (pageNum = 1, pageSize = 10) => {
    try {
      const searchCondition = {};
      const result = await api.getCategories(searchCondition, pageNum, pageSize);
      const categories = result.data.pageData;
      console.log('categories:', categories);
      setData(categories);
      setFilteredCategories(categories);
      setPagination({
        current: pageNum,
        pageSize,
        total: result.data.pageInfo.totalItems,
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      message.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategoriesData(pagination.current, pagination.pageSize);
  }, [navigate, pagination.current, pagination.pageSize]);

  const handleFormSubmit = async (values: { name: string }) => {
    try {
      const newCategory = await api.createCategory(values);
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
