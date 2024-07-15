import { createCourse, useState } from '../../../../utils/commonImports';
import { Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import FileUploader from '../../../FileUploader';
import TinyMCEEditorComponent from '../../../../utils/TinyMCEEditor';
import useCategories from '../../../useCategories';

const { Option } = Select;

const CreateCourseButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Use isOpen instead of isModalVisible
  const [form] = Form.useForm();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { categories, parents } = useCategories(); // Use the custom hook

  const showModal = () => {
    setIsOpen(true); // Use setIsOpen instead of setIsModalVisible
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
    setIsOpen(false); // Use setIsOpen instead of setIsModalVisible
    form.resetFields();
    setImageURL(null);
    setVideoURL(null);
    setDescription('');
    setContent('');
  };

  const handleCancel = () => {
    setIsOpen(false); // Use setIsOpen instead of setIsModalVisible
    form.resetFields();
    setImageURL(null);
    setVideoURL(null);
    setDescription('');
    setContent('');
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className='custom-button'>
        Create Course
      </Button>
      <Modal
        title="Create Course"
        open={isOpen} // Use open instead of visible
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
          </Form.Item>
          <Form.Item
            label="Upload Video"
            rules={[{ required: true, message: 'Please upload a video!' }]}
          >
            <FileUploader type="video" onUploadSuccess={setVideoURL} />
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
