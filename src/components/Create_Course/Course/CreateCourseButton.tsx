import { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import { createCourse, getCategories } from '../../../utils/commonImports';

import FileUploader from '../FileUploader'; // Ensure correct path
import TinyMCEEditorComponent from '../../../utils/TinyMCEEditor'; // Ensure correct path

const { Option, OptGroup } = Select;

type Category = {
  _id: string;
  name: string;
  parent_category_id?: string; // Assuming parent_category_id is optional
};

const CreateCourseButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ [key: string]: Category[] }>({});
  const [description, setDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      
        const data = await getCategories({ keyword: "", category: "", status: "", is_deleted: false }, 1, 100);
        const fetchedCategories: Category[] = data.pageData;

        const categoryTree: { [key: string]: Category[] } = {};

        // Organize categories into a tree structure
        fetchedCategories.forEach(category => {
          if (!category.parent_category_id) {
            if (!categoryTree[category._id]) {
              categoryTree[category._id] = [];
            }
          } else {
            if (!categoryTree[category.parent_category_id]) {
              categoryTree[category.parent_category_id] = [];
            }
            categoryTree[category.parent_category_id].push(category);
          }
        });

        setCategories(categoryTree);
     
    
      
    };

    fetchCategories();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
      const values = await form.validateFields();
      const courseData = {
        ...values,
        image_url: imageURL,
        video_url: videoURL,
        description,
        content,
      };
      await createCourse(courseData);
      setIsModalVisible(false);
      form.resetFields();
      setImageURL(null);
      setVideoURL(null);
      setDescription('');
      setContent('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImageURL(null);
    setVideoURL(null);
    setDescription('');
    setContent('');
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Course
      </Button>
      <Modal
        title="Create Course"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" initialValues={{ description, content }}>
          <Form.Item
            name="name"
            label="Course Name"
            rules={[{ required: true, message: 'Please input the course name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select placeholder="Select a category">
              {Object.keys(categories).map(parentId => (
                <OptGroup key={parentId} label={categories[parentId][0]?.name}>
                  {categories[parentId].map(category => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <TinyMCEEditorComponent
              value={description}
              onEditorChange={(content) => {
                setDescription(content);
                form.setFieldsValue({ description: content });
              }}
            />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please input the content!' }]}
          >
            <TinyMCEEditorComponent
              value={content}
              onEditorChange={(content) => {
                setContent(content);
                form.setFieldsValue({ content: content });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Upload Image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <FileUploader type="image" onUploadSuccess={setImageURL} />
            {imageURL && <img src={imageURL} alt="Uploaded Image" style={{ marginTop: '10px', maxWidth: '100%' }} />}
          </Form.Item>
          <Form.Item
            label="Upload Video"
            rules={[{ required: true, message: 'Please upload a video!' }]}
          >
            <FileUploader type="video" onUploadSuccess={setVideoURL} />
            {videoURL && <video src={videoURL} controls style={{ marginTop: '10px', maxWidth: '100%' }} />}
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount"
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCourseButton;
