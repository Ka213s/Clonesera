import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Select, Table, Modal, Tabs } from 'antd';
import TinyMCEEditor from '../../util/TinyMCEEditor';
import FileUploader from './FileUploader';

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

interface Category {
  _id: string;
  name: string;
  parent_category_id?: string;
}

interface FormData {
  title: string;
  description: string;
  content: string;
  category_id: string;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
}

interface Course {
  _id: string;
  name: string;
  category: string;
  price: number;
  discount: number;
}

interface BasicInformationProps {
  api: any;
}

interface BasicInformationState {
  isPaid: boolean;
  categories: Category[];
  categoryTree: { [key: string]: Category[] };
  videoUrl: string;
  imageUrl: string;
  courses: Course[];
  loadingCourses: boolean;
  open: boolean;
  formData: FormData;
}

class BasicInformation extends Component<BasicInformationProps, BasicInformationState> {
  formRef: React.RefObject<any> = React.createRef();

  state: BasicInformationState = {
    isPaid: false,
    categories: [],
    categoryTree: {},
    videoUrl: '',
    imageUrl: '',
    courses: [],
    loadingCourses: true,
    open: false,
    formData: {
      title: '',
      description: '',
      content: '',
      category_id: '',
      video_url: '',
      image_url: '',
      price: 0,
      discount: 0,
    },
  };

  componentDidMount() {
    this.fetchCategories();
    this.fetchCourses();
  }

  fetchCategories = async () => {
    const { api } = this.props;
    try {
      const data = await api.getCategories({ keyword: "", is_delete: false }, 1, 10);

      const fetchedCategories: Category[] = data.data.pageData;

      const tree: { [key: string]: Category[] } = {};

      fetchedCategories.forEach((category: Category) => {
        if (!category.parent_category_id) {
          if (!tree[category._id]) {
            tree[category._id] = [];
          }
        } else {
          if (!tree[category.parent_category_id]) {
            tree[category.parent_category_id] = [];
          }
          tree[category.parent_category_id].push(category);
        }
      });

      this.setState({
        categories: fetchedCategories,
        categoryTree: tree,
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  fetchCourses = async () => {
    const { api } = this.props;
    try {
      const data = await api.getCourses({ keyword: '', category: '', status: 'new', is_deleted: false }, 1, 10);
      this.setState({ courses: data.data.pageData, loadingCourses: false });
    } catch (error) {
      console.error('Error fetching courses:', error);
      this.setState({ loadingCourses: false });
    }
  };

  onFinish = async (values: FormData) => {
    const { api } = this.props;
    const { isPaid, videoUrl, imageUrl } = this.state;

    try {
      const courseData = {
        ...values,
        video_url: videoUrl,
        image_url: imageUrl,
        price: isPaid ? Number(values.price) : 0,
        discount: isPaid ? Number(values.discount) : 0,
      };
      console.log('Course data:', courseData);
      await api.createCourse(courseData);
      this.setState({ open: false });
      this.fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  onValuesChange = (_changedValues: any, allValues: any) => {
    this.setState({ formData: allValues });
  };

  showModal = () => {
    this.setState({ open: true });
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleUploadSuccess = (url: string, type: 'image' | 'video') => {
    if (type === 'video') {
      this.setState({ videoUrl: url });
    } else {
      this.setState({ imageUrl: url });
    }
  };

  render() {
    const { categories, categoryTree, videoUrl, imageUrl, courses, loadingCourses, open, formData } = this.state;

    const columns = [
      { title: 'Title', dataIndex: 'name', key: 'name' },
      { title: 'Category', dataIndex: 'category_name', key: 'category' },
      { title: 'Price', dataIndex: 'price', key: 'price' },
      { title: 'Discount', dataIndex: 'discount', key: 'discount' },
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: Course) => (
          <Button type="link" onClick={() => console.log(`Editing ${record._id}`)}>Edit</Button>
        ),
      },
    ];

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Add Course</Button>
        <Table
          columns={columns}
          dataSource={courses}
          loading={loadingCourses}
          rowKey="_id"
          style={{ marginTop: 20 }}
        />
        <Modal
          title="Add Course"
          open={open}
          onCancel={this.handleCancel}
          footer={null}
          width={1000}
        >
          <Form
            ref={this.formRef}
            layout="vertical"
            onFinish={this.onFinish}
            initialValues={formData}
            onValuesChange={this.onValuesChange}
          >
            <Form.Item label="Course Title" name="name" rules={[{ required: true, message: 'Please enter the course title' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter a description' }]}>
              <TinyMCEEditor
                value={formData.description}
                onEditorChange={(content) => {
                  this.setState((prevState) => ({
                    formData: { ...prevState.formData, description: content },
                  }));
                  this.formRef.current?.setFieldsValue({ description: content });
                }}
              />
            </Form.Item>
            <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please enter the content' }]}>
              <TinyMCEEditor
                value={formData.content}
                onEditorChange={(content) => {
                  this.setState((prevState) => ({
                    formData: { ...prevState.formData, content: content },
                  }));
                  this.formRef.current?.setFieldsValue({ content: content });
                }}
              />
            </Form.Item>
            <Form.Item label="Category" name="category_id" rules={[{ required: true, message: 'Please select a category' }]}>
              <Select placeholder="Select a category">
                {Object.entries(categoryTree).map(([parentId, children]) => (
                  <OptGroup key={parentId} label={categories.find(category => category._id === parentId)?.name}>
                    {children.map((child) => (
                      <Option key={child._id} value={child._id}>{child.name}</Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Video URL" name="video_url" rules={[{ required: !videoUrl, message: 'Please upload a video' }]}>
                  <FileUploader type="video" onUploadSuccess={(url) => this.handleUploadSuccess(url, 'video')} />
                  {videoUrl && (
                    <video width="100%" controls style={{ marginTop: '10px' }}>
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Image URL" name="image_url" rules={[{ required: !imageUrl, message: 'Please upload an image' }]}>
                  <FileUploader type="image" onUploadSuccess={(url) => this.handleUploadSuccess(url, 'image')} />
                  {imageUrl && <img src={imageUrl} alt="Course" style={{ width: '100%', marginTop: '10px' }} />}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Price">
              <Tabs defaultActiveKey="free" onChange={(key) => this.setState({ isPaid: key === 'paid' })}>
                <TabPane tab="Free" key="free">
                  <div style={{ padding: '8px 0', color: 'green' }}>This course is free.</div>
                  <Input type="hidden" value={0} />
                </TabPane>
                <TabPane tab="Paid" key="paid">
                  <Form.Item name="price" rules={[{ required: this.state.isPaid, message: 'Please enter the price' }]}>
                    <Input type="number" />
                  </Form.Item>
                  {this.state.isPaid && (
                    <Form.Item label="Discount" name="discount">
                      <Input type="number" />
                    </Form.Item>
                  )}
                </TabPane>
              </Tabs>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Save Basic Information</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default BasicInformation;
