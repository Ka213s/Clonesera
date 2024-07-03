import React, { Component } from 'react';
import { Form, Input, Button, Upload, Row, Col, Tabs, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../util/firebaseConfig';
import TinyMCEEditor from '../../util/TinyMCEEditor';

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

interface BasicInformationProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  api: any;
  setCourseId: React.Dispatch<React.SetStateAction<string | null>>;
}

interface BasicInformationState {
  uploadingImage: boolean;
  uploadingVideo: boolean;
  isPaid: boolean;
  categories: Category[];
  categoryTree: { [key: string]: Category[] };
  videoUrl: string;
}

class BasicInformation extends Component<BasicInformationProps, BasicInformationState> {
  formRef: React.RefObject<any> = React.createRef();

  state: BasicInformationState = {
    uploadingImage: false,
    uploadingVideo: false,
    isPaid: false,
    categories: [],
    categoryTree: {},
    videoUrl: this.props.formData.video_url,
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const { api } = this.props;
    try {
      const data = await api.getCategories({ keyword: "", is_delete: false }, 1, 10);
      const fetchedCategories: Category[] = data.data.pageData;

      const tree: { [key: string]: Category[] } = {};
      fetchedCategories.forEach((category: Category) => {
        if (!category.parent_category_id) {
          tree[category._id] = [];
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

  onFinish = async (values: FormData) => {
    const { api, setCourseId } = this.props;
    const { isPaid } = this.state;

    try {
      const courseData = {
        name: values.title,
        category_id: values.category_id,
        description: values.description,
        content: values.content,
        video_url: this.state.videoUrl,
        image_url: this.props.formData.image_url,
        price: isPaid ? Number(values.price) : 0,
        discount: isPaid ? Number(values.discount) : 0,
      };

      console.log('courseData:', courseData);
      const response = await api.createCourse(courseData);
      setCourseId(response.data._id);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  handleUpload = async (file: File, type: 'image' | 'video') => {
    if (!file) return;
    const { setFormData } = this.props;

    if (type === 'image') this.setState({ uploadingImage: true });
    if (type === 'video') this.setState({ uploadingVideo: true });

    try {
      const storageRef = ref(storage, `${type}s/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log(`${type.toUpperCase()} upload state:`, snapshot.state);
        },
        (error) => {
          console.error('Upload error:', error);
          if (type === 'image') this.setState({ uploadingImage: false });
          if (type === 'video') this.setState({ uploadingVideo: false });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData((prev) => ({
            ...prev,
            [`${type}_url`]: downloadURL,
          }));
          if (type === 'video') {
            this.setState({ videoUrl: downloadURL });
          }
          if (type === 'image') this.setState({ uploadingImage: false });
          if (type === 'video') this.setState({ uploadingVideo: false });
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      if (type === 'image') this.setState({ uploadingImage: false });
      if (type === 'video') this.setState({ uploadingVideo: false });
    }
  };

  uploadProps = (type: 'image' | 'video') => ({
    beforeUpload: (file: File) => {
      this.handleUpload(file, type);
      return false;
    },
    showUploadList: false,
  });

  onValuesChange = (_changedValues: any, allValues: any) => {
    const { formData, setFormData } = this.props;
    setFormData({
      ...allValues,
      image_url: formData.image_url,
      video_url: this.state.videoUrl,
    });
  };

  render() {
    const { formData } = this.props;
    const { uploadingImage, uploadingVideo, isPaid, categories, categoryTree, videoUrl } = this.state;

    return (
      <div>
        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.onFinish}
          initialValues={formData}
          onValuesChange={this.onValuesChange}
        >
          <Form.Item label="Course Title" name="title" rules={[{ required: true, message: 'Please enter the course title' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TinyMCEEditor
              value={formData.description}
              onEditorChange={(content) => {
                this.props.setFormData({ ...formData, description: content });
                this.formRef.current?.setFieldsValue({ description: content });
              }}
            />
          </Form.Item>
          <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please enter the content' }]}>
            <TinyMCEEditor
              value={formData.content}
              onEditorChange={(content) => {
                this.props.setFormData({ ...formData, content: content });
                this.formRef.current?.setFieldsValue({ content: content });
              }}
            />
          </Form.Item>
          <Form.Item label="Category ID" name="category_id" rules={[{ required: true, message: 'Please enter the category ID' }]}>
            <Select>
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
              <Form.Item label="Video URL">
                <Upload {...this.uploadProps('video')}>
                  <Button icon={<UploadOutlined />} loading={uploadingVideo}>Upload Video</Button>
                </Upload>
                {videoUrl && (
                  <video width="100%" controls style={{ marginTop: '10px' }}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Image URL">
                <Upload {...this.uploadProps('image')}>
                  <Button icon={<UploadOutlined />} loading={uploadingImage}>Upload Image</Button>
                </Upload>
                {formData.image_url && <img src={formData.image_url} alt="Course" style={{ width: '100%', marginTop: '10px' }} />}
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
                <Form.Item name="price" rules={[{ required: isPaid, message: 'Please enter the price' }]}>
                  <Input type="number" />
                </Form.Item>
                {isPaid && (
                  <Form.Item label="Discount" name="discount">
                    <Input type="number" />
                  </Form.Item>
                )}
              </TabPane>
            </Tabs>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={uploadingImage || uploadingVideo}>
              Save Basic Information
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default BasicInformation;
