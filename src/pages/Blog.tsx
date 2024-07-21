// src/components/Blog.tsx

import React, { useEffect, useState } from 'react';
import { List, Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getBlogsPublic } from '../utils/commonImports'; // Ensure the path is correct

const { Title } = Typography;

interface Blog {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  user_name: string;
  category_name: string;
  updated_at: string;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = {
          searchCondition: {
            category_id: '', // Add appropriate category_id if needed
            is_deleted: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 5, // Fetch a reasonable number of blogs, adjust as needed
          },
        };
        const response = await getBlogsPublic(data);
        setBlogs(response.pageData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  const handleClick = (id: string) => {
    navigate(`/blog-detail/${id}`); // Navigate to the BlogDetail page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Title level={2} className="mb-4">Latest Blog Posts</Title>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={blogs}
        renderItem={blog => (
          <List.Item
            key={blog._id}
            extra={<img width={272} alt="blog" src={blog.image_url} />}
            onClick={() => handleClick(blog._id)} // Handle click event
            style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
          >
            <List.Item.Meta
              title={blog.title}
              description={
                <>
                  <div><strong>Author:</strong> {blog.user_name}</div>
                  <div><strong>Category:</strong> {blog.category_name}</div>
                  <div><strong>Updated at:</strong> {new Date(blog.updated_at).toLocaleDateString()}</div>
                </>
              }
            />
            {blog.description}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Blog;
