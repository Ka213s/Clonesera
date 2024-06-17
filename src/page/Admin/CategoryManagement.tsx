import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import CategoryForm from './CategoryForm';
import MainLayout from '../../layouts/MainLayout';

const { Search } = Input;

interface Category {
  id: number;
  name: string;
}

const CategoryManagement: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [originalData, setOriginalData] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/src/data/categories.json'); // Đường dẫn đến file categories.json
      const result = await response.json();
      const categoriesWithId = result.categories.map((name: string, index: number) => ({ id: index + 1, name }));
      setData(categoriesWithId);
      setOriginalData(categoriesWithId);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleDelete = (id: number) => {
    const newData = data.filter(category => category.id !== id);
    setData(newData);
    setOriginalData(newData);
    message.success('Category deleted successfully');
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: { name: string }) => {
    if (editingCategory) {
      const newData = data.map(cat => (cat.id === editingCategory.id ? { ...cat, ...values } : cat));
      setData(newData);
      setOriginalData(newData);
      message.success('Category updated successfully');
    } else {
      const newCategory = { id: data.length ? Math.max(...data.map(cat => cat.id)) + 1 : 1, name: values.name };
      const newData = [...data, newCategory];
      setData(newData);
      setOriginalData(newData);
      message.success('Category added successfully');
    }
    setIsModalVisible(false);
    setEditingCategory(null);
  };

  const handleSearch = (value: string) => {
    const filteredData = originalData.filter(category => category.name.toLowerCase().includes(value.toLowerCase()));
    setData(filteredData);
  };

  return (
    <MainLayout>
      <div className="pt-10 px-6">
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Search categories"
            enterButton={<SearchOutlined />}
            onSearch={handleSearch}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add New Category
          </Button>
        </Space>
        <Table dataSource={data} rowKey="id">
          <Table.Column title="Name" dataIndex="name" key="name" />
          <Table.Column
            title="Action"
            key="action"
            render={(_, record: Category) => (
              <Space size="middle">
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
                <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Delete</Button>
              </Space>
            )}
          />
        </Table>
        <Modal
          title={editingCategory ? "Edit Category" : "Add New Category"}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <CategoryForm
            initialValues={editingCategory || undefined}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};

export default CategoryManagement;
