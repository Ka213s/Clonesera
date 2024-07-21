import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { createBlog } from '../../../utils/commonImports';
import useCategories from '../../useCategories'; // Adjust the path as needed
import TinyMCEEditorComponent from '../../../utils/TinyMCEEditor'; // Adjust the path as needed
import FileUploader from '../../FileUploader'; // Adjust the path as needed

const { Option } = Select;

// Define TypeScript interface for form values
interface BlogFormValues {
  title: string;
  content: string;
  category_id: string;
  description: string;
}

const CreateBlog: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editorContent, setEditorContent] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const { categories, parents } = useCategories(); // Use the hook to get categories

  useEffect(() => {
    form.setFieldsValue({
      content: editorContent,
    });
  }, [editorContent]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: BlogFormValues) => {
    console.log('Received values:', values);
    try {
      await createBlog({
        name: values.title,
        category_id: values.category_id,
        image_url: imageUrl, // Use the uploaded image URL
        description: values.description,
        content: editorContent,
      });
      // Handle successful blog creation (e.g., show a success message)
      setIsModalVisible(false); // Close the modal
      form.resetFields(); // Optionally reset the form
      setEditorContent(''); // Clear editor content
      setImageUrl(''); // Clear uploaded image URL
    } catch (error) {
      // Handle error (e.g., show an error message)
      message.error('Error creating blog');
      console.error('Error creating blog:', error);
    }
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleUploadSuccess = (url: string) => {
    setImageUrl(url);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Blog
      </Button>
      <Modal
        title="Create New Blog"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select placeholder="Select a category">
              {parents.map(parent => (
                <Select.OptGroup key={parent._id} label={parent.name}>
                  {categories[parent._id] && categories[parent._id].map(category => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please input the content!' }]}
            // This is a dummy item to hold the content; it's not used directly
          >
            <TinyMCEEditorComponent
              value={editorContent}
              onEditorChange={handleEditorChange}
            />
          </Form.Item>
          <Form.Item
            name="image_url"
            label="Upload Image"
          >
            <FileUploader
              type="image"
              onUploadSuccess={handleUploadSuccess}
              defaultImage={imageUrl} // Set default image if needed
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Blog
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBlog;
