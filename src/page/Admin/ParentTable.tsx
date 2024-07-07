import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Category {
  _id: string;
  name: string;
  parent_category_id: string | null;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

interface ParentTableProps {
  data: Category[];
  parentCategories: { id: string; name: string; numOfSubCategories: number }[];
  pagination: any;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

const ParentTable: React.FC<ParentTableProps> = ({
  data,
  parentCategories,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
}) => {
  return (
    <Table
      dataSource={data}
      rowKey="id"
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: onPageChange,
      }}
    >
      <Table.Column title="Name" dataIndex="name" key="name" />
      <Table.Column
        title="Sub Category"
        key="numOfSubCategory"
        render={(text, record: Category) => {
          const parentCategory = parentCategories.find(category => category.id === record._id);
          return parentCategory ? parentCategory.numOfSubCategories : 0;
        }}
      />
      <Table.Column
        title="Action"
        key="action"
        render={(_, record: Category) => (
          <>
            <Button type="link" icon={<FaEdit />} onClick={() => onEdit(record)} />
            <Popconfirm
              title="Are you sure you want to delete this category?"
              onConfirm={() => onDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" icon={<FaTrash />} danger />
            </Popconfirm>
          </>
        )}
      />
    </Table>
  );
};

export default ParentTable;
