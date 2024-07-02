import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
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
  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  const fetchParentCategories = async () => {
    try {
      const pageNum = 1; 
      const pageSize = 100; 
      const searchCondition = {}; 
  
      const result = await api.getCategories(searchCondition, pageNum, pageSize);
      
      if (result && result.data) {
        return result.data.pageData.reduce((acc: Record<string, string>, category: any) => {
          acc[category._id] = category.name;
          return acc;
        }, {});
      }
    } catch (error) {
      console.error('Error fetching parent categories:', error);
      message.error('Failed to fetch parent categories');
      return {};
    }
  };
  
  const fetchSubCategories = async (pageNum: number = 1, pageSize: number = 10) => {
    try {
      const searchCondition = {};
      const result = await api.getSubCategories(searchCondition, pageNum, pageSize);
  
      if (result && result.data) {
        const subcategories: SubCategory[] = result.data.pageData || [];
        
        const parentCategoriesMap = await fetchParentCategories();
  
        const filteredSubcategories: DisplaySubCategory[] = subcategories
          .filter(subcategory => subcategory.parent_category_id !== null)
          .map(subcategory => ({
            id: subcategory._id,
            name: subcategory.name,
            parentCategory: parentCategoriesMap[subcategory.parent_category_id as string] || 'Unknown',
          }));
  
        console.log('Subcategories:', filteredSubcategories);
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
    fetchSubCategories(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);
  
  useEffect(() => {
    fetchSubCategories(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);
  
  const handleFormSubmit = async (values: { name: string; parentCategory: string; description: string }) => {
    try {
      await api.createSubCategory({
        name: values.name,
        parent_category_id: values.parentCategory,
        description: values.description,
      });
      console.log('Created SubCategory:', values);
      fetchSubCategories(pagination.current, pagination.pageSize);
      message.success('SubCategory added successfully');
    } catch (error) {
      message.error('Failed to add SubCategory');
    }
    setIsModalVisible(false);
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
      </Space>
      <Table
        dataSource={data}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => fetchSubCategories(page, pageSize),
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
