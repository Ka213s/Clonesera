import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import CategoryForm from './CategoryForm';
import ApiService from '../../services/ApiService';
import { Category } from '../../Category';

const { Search } = Input;

const CategoryManagement: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categories = await ApiService.getCategories();
    setData(categories);
  };

  const handleDelete = async (id: number) => {
    await ApiService.deleteCategory(id);
    message.success('Category deleted successfully');
    fetchCategories();
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: Category) => {
    if (editingCategory) {
      await ApiService.updateCategory(editingCategory.id, values);
      message.success('Category updated successfully');
    } else {
      await ApiService.addCategory(values);
      message.success('Category added successfully');
    }
    setIsModalVisible(false);
    setEditingCategory(null);
    fetchCategories();
  };

  const handleSearch = async (value: string) => {
    const categories = await ApiService.getCategories(value);
    setData(categories);
  };

  return (
    <div>
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
        <Table.Column title="Description" dataIndex="description" key="description" />
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
  );
};

export default CategoryManagement;
