// src/components/BlogDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Spin } from 'antd';
import { getBlogByIdPublic } from '../utils/commonImports';
import { Editor } from '@tinymce/tinymce-react';

const { Title, Paragraph } = Typography;

interface BlogDetail {
  name: string;
  description: string;
  content: string;
  image_url: string;
  updated_at: string;
  user_name: string;
  category_name: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the blog ID from the URL
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id) {
          const response = await getBlogByIdPublic(id);
          setBlog(response);
        }
      } catch (error) {
        console.error('Error fetching blog detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      {blog ? (
        <>
          <Title level={2}>{blog.name}</Title>
          <img src={blog.image_url} alt={blog.name} style={{ width: '100%', height: 'auto', marginBottom: '16px' }} />
          <Paragraph><strong>Author:</strong> {blog.user_name}</Paragraph>
          <Paragraph><strong>Category:</strong> {blog.category_name}</Paragraph>
          <Paragraph><strong>Updated at:</strong> {new Date(blog.updated_at).toLocaleDateString()}</Paragraph>
          <Paragraph><strong>Description:</strong> {blog.description}</Paragraph>
          <Editor
            apiKey="2yifh7kylzpd5szlkd3irl90etvaxhqgknrd2zfbdz4sjeox" // Replace with your actual TinyMCE API key
            initialValue={blog.content || ''}
            init={{
              menubar: false,
              plugins: 'autoresize',
              toolbar: false,
              autoresize_bottom_margin: 20,
              autoresize_overflow_padding: 10,
              content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }', // Adjust font styles if needed
              setup: (editor) => {
                editor.on('init', () => {
                  editor.getContainer().style.overflow = 'hidden';
                  editor.getContainer().style.border = 'none'; // Remove the border
                });
              },
            }}
            disabled={true}
          />
        </>
      ) : (
        <p>Blog not found</p>
      )}
    </div>
  );
};

export default BlogDetail;
