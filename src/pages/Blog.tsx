import React, { useEffect, useState } from 'react';
import {  Typography, Skeleton } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getBlogsPublic } from '../utils/commonImports';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

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
            pageSize: 100, // Fetch a large number to handle pagination client-side
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

  const handleClick = (id: string) => {
    navigate(`/blog-detail/${id}`);
  };

  const blogsPerPage = 4;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Title level={2} className="mb-4">Latest Blog Posts</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {currentBlogs.map(blog => (
          <div
            key={blog._id}
            onClick={() => handleClick(blog._id)}
            className="cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition duration-300 shadow-md"
          >
            <img width={272} alt="blog" src={blog.image_url} className="rounded-lg mb-4" />
            <div className="text-xl font-semibold mb-2">{blog.title}</div>
            <div className="text-gray-500">
              <div><strong>Author:</strong> {blog.user_name}</div>
              <div><strong>Specialties:</strong> {blog.category_name}</div>
              <div><strong>Update:</strong> {new Date(blog.updated_at).toLocaleDateString()}</div>
            </div>
            <p className="text-gray-700 mt-2">{blog.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <LeftOutlined
            onClick={handlePreviousPage}
            className="cursor-pointer text-lg mx-2 transform transition-transform duration-300 hover:scale-110"
          />
        )}
        <span className="text-lg">
          Page {currentPage}/{totalPages}
        </span>
        {currentPage < totalPages && (
          <RightOutlined
            onClick={handleNextPage}
            className="cursor-pointer text-lg mx-2 transform transition-transform duration-300 hover:scale-110"
          />
        )}
      </div>
    </div>
  );
};

export default Blog;
