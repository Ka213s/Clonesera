import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import MainLayout from '../../layouts/MainLayout';
import { AiOutlinePlus } from 'react-icons/ai';
import categoriesData from './../../models/FileJson/categories.json';

interface Category {
  key: number;
  name: string;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(categoriesData.categories.map((name, index) => ({ key: index, name })));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const showAddCategoryModal = () => {
    setEditingCategory(null);
    setIsModalVisible(true);
  };

  const showEditCategoryModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSaveCategory = (values: { name: string }) => {
    if (editingCategory) {
      // Update existing category
      const updatedCategories = categories.map(cat =>
        cat.key === editingCategory.key ? { ...cat, name: values.name } : cat
      );
      setCategories(updatedCategories);
    } else {
      // Add new category
      const newCategory: Category = { key: categories.length, name: values.name };
      setCategories([...categories, newCategory]);
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Category) => (
        <Button type="link" onClick={() => showEditCategoryModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="pt-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Category Management</h1>
          <Button type="primary" icon={<AiOutlinePlus />} onClick={showAddCategoryModal}>
            + Add New Category
          </Button>
        </div>
        <Table columns={columns} dataSource={categories} rowKey="key" />
        <Modal
          title={editingCategory ? 'Edit Category' : 'Add New Category'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            initialValues={{ name: editingCategory?.name || '' }}
            onFinish={handleSaveCategory}
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
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Category;
