import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SubCategoryForm from './SubCategoryForm';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../../services/Api';

interface SubCategory {
  _id: string;
  name: string;
  parent_category_id: string | null;
  description: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

interface DisplaySubCategory {
  id: string;
  name: string;
  parentCategory: string;
}

const SubCategory: React.FC = () => {
  const [data, setData] = useState<DisplaySubCategory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [parentCategories, setParentCategories] = useState<Record<string, string>>({});
  const [selectedParentCategory, setSelectedParentCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  const fetchParentCategories = async () => {
    try {
      const pageNum = 1;
      const pageSize = 100;
      const searchCondition = {};

      const result = await api.getCategories(searchCondition, pageNum, pageSize);

      if (result && result.data) {
        const parentCategoriesMap = result.data.pageData
          .filter((category: any) => category.parent_category_id === null)
          .reduce((acc: Record<string, string>, category: any) => {
            acc[category._id] = category.name;
            return acc;
          }, {});
        setParentCategories(parentCategoriesMap);
      }
    } catch (error) {
      console.error('Error fetching parent categories:', error);
      message.error('Failed to fetch parent categories');
    }
  };

  const fetchSubCategories = async (pageNum: number = 1, pageSize: number = 10) => {
    try {
      const searchCondition = selectedParentCategory ? { parent_category_id: selectedParentCategory } : {};
      const result = await api.getSubCategories(searchCondition, pageNum, pageSize);

      if (result && result.data) {
        const subcategories: SubCategory[] = result.data.pageData || [];

        const filteredSubcategories: DisplaySubCategory[] = subcategories
          .map(subcategory => ({
            id: subcategory._id,
            name: subcategory.name,
            parentCategory: parentCategories[subcategory.parent_category_id as string] || 'Null',
          }));

        setData(filteredSubcategories);
        setPagination({
          current: pageNum,
          pageSize,
          total: result.data.pageInfo.totalItems,
        });
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      message.error('Failed to fetch subcategories');
    }
  };

  useEffect(() => {
    fetchParentCategories().then(() => fetchSubCategories(pagination.current, pagination.pageSize));
  }, []);

  useEffect(() => {
    fetchSubCategories(pagination.current, pagination.pageSize);
  }, [selectedParentCategory, pagination.current, pagination.pageSize]);

  const handleFormSubmit = async (values: { name: string; parentCategory: string; description: string }) => {
    try {
      await api.createSubCategory({
        name: values.name,
        parent_category_id: values.parentCategory,
        description: values.description,
      });
      fetchSubCategories(pagination.current, pagination.pageSize);
      message.success('SubCategory added successfully');
    } catch (error) {
      message.error('Failed to add SubCategory');
    }
    setIsModalVisible(false);
  };

  const handleParentCategoryChange = (value: string | null) => {
    setSelectedParentCategory(value || null);
    setPagination(prev => ({ ...prev, current: 1 }));  // Reset trang về 1 khi bộ lọc thay đổi
  };

  return (
    <div className="pt-10 px-6">
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className='!bg-[#9997F5] hover:!bg-[#8886E5]'
        >
          Add New SubCategory
        </Button>
        <Select
          showSearch
          placeholder="Filter by Parent Category"
          style={{ width: 200 }}
          onChange={handleParentCategoryChange}
          filterOption={(input, option) =>
            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
          }
        >
          <Select.Option key="all" value={null}>
            All Categories
          </Select.Option>
          {Object.entries(parentCategories).map(([id, name]) => (
            <Select.Option key={id} value={id} label={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Space>
      <Table
        dataSource={data}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => {
            setPagination(prev => ({ ...prev, current: page, pageSize }));  // Cập nhật pageSize nếu thay đổi
          },
        }}
      >
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Parent Category" dataIndex="parentCategory" key="parentCategory" />
      </Table>
      <Modal
        title="Add New SubCategory"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <SubCategoryForm
          initialValues={undefined}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default SubCategory;
