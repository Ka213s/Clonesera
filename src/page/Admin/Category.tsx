import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message, Select, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CategoryForm from './CategoryForm';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../../services/Api';

const { Option } = Select;

interface Category {
  _id: string;
  name: string;
  parent_category_id: string | null;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

const Category: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [parentCategories, setParentCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  const fetchCategoriesData = async (pageNum: number = 1, pageSize: number = 10) => {
    try {
      const searchCondition = {};
      const result = await api.getCategories(searchCondition, pageNum, pageSize);
      if (result && result.data) {
        const categories: Category[] = result.data.pageData || [];
        setData(categories);
        setFilteredCategories(categories);
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

  const fetchParentCategories = async () => {
    try {
      const result = await api.getCategories({}, 1, 100); // Fetch all parent categories
      if (result && result.data) {
        const categories: Category[] = result.data.pageData || [];
        const parentCategories = categories
          .filter(category => category.parent_category_id === null)
          .map(category => ({
            id: category._id,
            name: category.name,
          }));
        setParentCategories(parentCategories);
      }
    } catch (error) {
      console.error('Error fetching parent categories:', error);
      message.error('Failed to fetch parent categories');
    }
  };

  useEffect(() => {
    fetchCategoriesData(pagination.current, pagination.pageSize);
    fetchParentCategories();
  }, []);

  useEffect(() => {
    if (selectedParentCategory) {
      const filtered = data.filter(category => category.parent_category_id === selectedParentCategory);
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(data);
    }
  }, [selectedParentCategory, data]);

  const handleFormSubmit = async (values: { name: string }) => {
    try {
      if (editingCategory) {
        await api.editCategory(editingCategory._id, values);
        message.success('Category updated successfully');
      } else {
        await api.createCategory(values);
        message.success('Category added successfully');
      }
      fetchCategoriesData(pagination.current, pagination.pageSize);
      setIsModalVisible(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to handle form submission:', error);
      message.error('Failed to submit form');
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleDeleteClick = async (categoryId: string) => {
    try {
      await api.deleteCategory(categoryId);
      fetchCategoriesData(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error('Failed to delete category:', error);
      message.error('Failed to delete category');
    }
  };

  return (
    <div className="pt-10 px-6">
      <div className="flex space-x-4 mb-5">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className='!bg-[#9997F5] hover:!bg-[#8886E5]'
        >
          New Category
        </Button>
        <Select
          placeholder="Filter by Parent Category"
          style={{ width: 200 }}
          onChange={value => setSelectedParentCategory(value)}
          allowClear
        >
          {parentCategories.map(category => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>
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
        <Table.Column
          title="Parent Category"
          dataIndex="parent_category_id"
          key="parent_category_id"
          render={parent_category_id => {
            const parentCategory = parentCategories.find(category => category.id === parent_category_id);
            return parentCategory ? parentCategory.name : 'Null';
          }}
        />
        <Table.Column
          title="Action"
          key="action"
          render={(_, record: Category) => (
            <>
              <Button type="link" icon={<FaEdit />} onClick={() => handleEditClick(record)} />
              <Popconfirm
                title="Are you sure you want to delete this category?"
                onConfirm={() => handleDeleteClick(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" icon={<FaTrash />} danger />
              </Popconfirm>
            </>
          )}
        />
      </Table>
      <Modal
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingCategory(null);
        }}
        footer={null}
      >
        <CategoryForm
          onSubmit={handleFormSubmit}
          initialValues={editingCategory ? { name: editingCategory.name } : { name: '' }}
        />
      </Modal>
    </div>
  );
};

export default Category;
