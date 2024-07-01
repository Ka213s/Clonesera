import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import SubCategoryForm from './SubCategoryForm';

const { Search } = Input;

interface SubCategory {
  id: number;
  name: string;
  parentCategory: string;
}

const SubCategory: React.FC = () => {
  const [data, setData] = useState<SubCategory[]>([]);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [originalData, setOriginalData] = useState<SubCategory[]>([]);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await fetch('/src/data/subcategories.json'); 
      const result = await response.json();
      const subCategoriesWithId = result.subcategories.map((subCategory: any, index: number) => ({
        id: index + 1,
        name: subCategory.name,
        parentCategory: subCategory.parentCategory,
      }));
      setData(subCategoriesWithId);
      setOriginalData(subCategoriesWithId);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    }
  };

  const handleDelete = (id: number) => {
    const newData = data.filter(subCategory => subCategory.id !== id);
    setData(newData);
    setOriginalData(newData);
    message.success('SubCategory deleted successfully');
  };

  const handleEdit = (subCategory: SubCategory) => {
    setEditingSubCategory(subCategory);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: { name: string; parentCategory: string }) => {
    if (editingSubCategory) {
      const newData = data.map(subCat => (subCat.id === editingSubCategory.id ? { ...subCat, ...values } : subCat));
      setData(newData);
      setOriginalData(newData);
      message.success('SubCategory updated successfully');
    } else {
      const newSubCategory = {
        id: data.length ? Math.max(...data.map(subCat => subCat.id)) + 1 : 1,
        name: values.name,
        parentCategory: values.parentCategory,
      };
      const newData = [...data, newSubCategory];
      setData(newData);
      setOriginalData(newData);
      message.success('SubCategory added successfully');
    }
    setIsModalVisible(false);
    setEditingSubCategory(null);
  };

  const handleSearch = (value: string) => {
    const filteredData = originalData.filter(subCategory => subCategory.name.toLowerCase().includes(value.toLowerCase()));
    setData(filteredData);
  };

  return (
    <div className="pt-10 px-6">
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search subcategories"
          enterButton={<SearchOutlined />}
          onSearch={handleSearch}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add New SubCategory
        </Button>
      </Space>
      <Table dataSource={data} rowKey="id">
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Parent Category" dataIndex="parentCategory" key="parentCategory" />
        <Table.Column
          title="Action"
          key="action"
          render={(_, record: SubCategory) => (
            <Space size="middle">
              <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
              <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Delete</Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        title={editingSubCategory ? "Edit SubCategory" : "Add New SubCategory"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <SubCategoryForm
          initialValues={editingSubCategory || undefined}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default SubCategory;
