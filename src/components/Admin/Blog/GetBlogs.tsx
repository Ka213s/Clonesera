import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Button } from 'antd';
import { getBlogs } from '../../../utils/commonImports';
import EditBlog from './EditBlog'; // Ensure the path is correct
import DeleteBlog from './DeleteBlog'; // Ensure the path is correct

interface Blog {
  _id: string;
  name: string;
  category_name: string;
  description: string;
  image_url: string;
  content: string; // Added content field
}

const GetBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = {
          searchCondition: { category_id: '', is_deleted: false },
          pageInfo: { pageNum: 1, pageSize: 10 },
        };
        const result = await getBlogs(data);
        setBlogs(result.pageData);
      } catch (err) {
        setError('Failed to fetch blogs');
        message.error('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
      render: (_:undefined, record: Blog) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record._id)}>Edit</Button>
          <Button type="link" danger onClick={() => setDeletingBlogId(record._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <Spin tip="Loading..." />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Table dataSource={blogs} columns={columns} rowKey="_id" />
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
