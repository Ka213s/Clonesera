import React, { useEffect, useState } from 'react';
import { Table, message, Button, Input, Row, Col, Pagination } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { getBlogs } from '../../../utils/commonImports';
import EditBlog from './EditBlog'; // Ensure the path is correct
import DeleteBlog from './DeleteBlog'; // Ensure the path is correct

interface Blog {
  _id: string;
  name: string;
  category_id: string;
  category_name: string;
  description: string;
  image_url: string;
  content: string;
}

const GetBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [searchCategoryName, setSearchCategoryName] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchBlogs = async (category_id = '', pageNum = 1, pageSize = 10) => {
    try {
      const data = {
        searchCondition: { category_id, is_deleted: false },
        pageInfo: { pageNum, pageSize },
      };
      const result = await getBlogs(data);
      setBlogs(result.pageData);
      setAllBlogs(result.pageData); // Save all blogs to state
      setTotalItems(result.pageInfo.totalItems); // Set total items for pagination
    } catch (err) {
      setError('Failed to fetch blogs');
      message.error('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    fetchBlogs('', currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handleEdit = (id: string) => {
    setEditingBlogId(id);
  };

  const handleSave = (id: string) => {
    // Implement your save logic here
    console.log('Save blog with ID:', id);
    setEditingBlogId(null);
  };

  const handleDelete = (id: string) => {
    // Implement your delete logic here
    console.log('Delete blog with ID:', id);
    setDeletingBlogId(null);
  };

  const handleSearch = (value: string) => {
    setSearchCategoryName(value);
    const matchedBlog = allBlogs.find(blog => blog.category_name.toLowerCase() === value.toLowerCase());
    if (matchedBlog) {
      fetchBlogs(matchedBlog.category_id, currentPage, pageSize);
    } else {
      setBlogs([]);
    }
  };

  const handleReset = () => {
    setSearchCategoryName('');
    setCurrentPage(1);
    setPageSize(10);
    fetchBlogs('', 1, 10);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (image_url: string) => <img src={image_url} alt="Blog" style={{ width: 100 }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: undefined, record: Blog) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record._id)}>Edit</Button>
          <Button type="link" danger onClick={() => setDeletingBlogId(record._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col flex="auto">
          <Input.Search
            placeholder="Search by category name"
            value={searchCategoryName}
            onChange={e => setSearchCategoryName(e.target.value)}
            onSearch={handleSearch}
            allowClear
          />
        </Col>
        <Col>
          <Button 
            icon={<CloseCircleOutlined />} 
            onClick={handleReset} 
            style={{ marginLeft: 8 }}
          />
        </Col>
      </Row>

      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          <Table dataSource={blogs} columns={columns} rowKey="_id" pagination={false} />
          <div className="flex justify-end items-center mt-6">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              onChange={(page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
                fetchBlogs(searchCategoryName, page, pageSize);
              }}
              showSizeChanger
              className="text-center"
            />
          </div>
        </div>
      )}

      <EditBlog
        visible={!!editingBlogId}
        id={editingBlogId}
        onClose={() => setEditingBlogId(null)}
        onSave={handleSave}
      />

      <DeleteBlog
        visible={!!deletingBlogId}
        id={deletingBlogId}
        onClose={() => setDeletingBlogId(null)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default GetBlogs;
