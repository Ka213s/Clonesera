import React, { useState, useEffect } from 'react';
import { Button, Modal, message, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CategoryForm from './CategoryForm';
import ParentTable from './ParentTable';
import SubTable from './SubTable';
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
  const [parentCategories, setParentCategories] = useState<{ id: string; name: string; numOfSubCategories: number }[]>([]);
  const [filterOption, setFilterOption] = useState<string>('parent');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubCategoryModal, setIsSubCategoryModal] = useState(false);
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
        
        const parentCategoriesWithCount = categories
          .filter(category => category.parent_category_id === null)
          .map(parent => {
            const numOfSubCategories = categories.filter(cat => cat.parent_category_id === parent._id).length;
            return {
              id: parent._id,
              name: parent.name,
              numOfSubCategories
            };
          });

        setData(categories);
        setFilteredCategories(categories);
        setParentCategories(parentCategoriesWithCount);
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
  }, []);

  useEffect(() => {
    if (filterOption === 'parent') {
      const filtered = data.filter(category => category.parent_category_id === null);
      setFilteredCategories(filtered);
    } else if (filterOption === 'sub') {
      const filtered = data.filter(category => category.parent_category_id !== null);
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(data);
    }
  }, [filterOption, data]);

  const handleFormSubmit = async (values: { name: string; parent_category_id?: string | null }) => {
    try {
      if (editingCategory) {
        await api.editCategory(editingCategory._id, values);
      } else {
        await api.createCategory(values);
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
    setIsSubCategoryModal(filterOption === 'sub');
  };

  const handleDeleteClick = async (categoryId: string) => {
    try {
      await api.deleteCategory(categoryId);
      fetchCategoriesData(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
    fetchCategoriesData(page, pageSize);
  };

  const handleAddSubCategoryClick = () => {
    setIsSubCategoryModal(true);
    setIsModalVisible(true);
  };

  return (
    <div className="pt-10 px-6">
      <div className="flex space-x-4 mb-5">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsSubCategoryModal(false); 
            setIsModalVisible(true);
          }}
          className='!bg-[#9997F5] hover:!bg-[#8886E5]'
        >
          Parent Category
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddSubCategoryClick}
          className='!bg-[#9997F5] hover:!bg-[#8886E5]'
        >
          Sub Category
        </Button>
        <Select
          placeholder="Select"
          style={{ width: 200 }}
          onChange={value => setFilterOption(value)}
          value={filterOption}
        >
          <Option value="parent">Parent Category</Option>
          <Option value="sub">Sub Category</Option>
        </Select>
      </div>
      {filterOption === 'parent' && (
        <ParentTable
          data={filteredCategories}
          parentCategories={parentCategories}
          pagination={pagination}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onPageChange={handlePageChange}
        />
      )}
      {filterOption === 'sub' && (
        <SubTable
          data={filteredCategories}
          parentCategories={parentCategories}
          pagination={pagination}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onPageChange={handlePageChange}
        />
      )}
      <Modal
        title={editingCategory 
          ? (isSubCategoryModal ? 'Edit Sub Category' : 'Edit Category') 
          : (isSubCategoryModal ? 'Add New SubCategory' : 'Add New Parent Category')}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingCategory(null);
        }}
        footer={null}
      >
        <CategoryForm
          onSubmit={handleFormSubmit}
          initialValues={
            editingCategory
              ? { name: editingCategory.name, parent_category_id: editingCategory.parent_category_id }
              : { name: '', parent_category_id: isSubCategoryModal ? '' : null } 
          }
          parentCategories={parentCategories}
          isSubCategory={isSubCategoryModal}
        />
      </Modal>
    </div>
  );
};

export default Category;
