import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, Row, Col, Typography, Divider } from 'antd';
import { createUser } from '../../../utils/commonImports';
import { toast } from 'react-toastify'; // Đảm bảo bạn đã cài đặt và cấu hình react-toastify
import TinyMCEEditorComponent from '../../../utils/TinyMCEEditor'; // Đảm bảo đường dẫn đúng
import FileUploader from '../../FileUploader'; // Đảm bảo đường dẫn đúng

const { Option } = Select;
const { Title } = Typography;

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: string;
  description?: string;
  phone_number?: string;
  avatar?: string;
  video?: string;
}

const CreateAccount: React.FC = () => {
  const [form] = Form.useForm();
  const [role, setRole] = useState<string>('student');
  const [description, setDescription] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');

  const onFinish = async (values: FormValues) => {
    const { name, email, password, role, phone_number } = values;
    let userData: {
      name: string;
      email: string;
      password: string;
      role: string;
      description?: string;
      phone_number?: string;
      avatar?: string;
      video?: string;
    } = { name, email, password, role, phone_number };

    if (role !== 'student' && role !== 'admin') {
      userData = { ...userData, description };
    }

    if (role !== 'student') {
      userData = { ...userData, avatar: avatarUrl, video: videoUrl };
    }

    try {
      await createUser(userData);
      form.resetFields();
      setDescription('');
      setAvatarUrl('');
      setVideoUrl('');
    } catch (error) {
      toast.error('Failed to create user');
      console.error('Error creating user:', error);
    }
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
  };

  return (
    <Row justify="center" style={{ padding: '20px' }}>
      <Col span={16}>
        <Card style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Create New Account</Title>
          <Divider />
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input the password!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role!' }]}>
              <Select onChange={handleRoleChange}>
                <Option value="admin">Admin</Option>
                <Option value="student">Student</Option>
                <Option value="instructor">Instructor</Option>
              </Select>
            </Form.Item>
            {role !== 'student' && role !== 'admin' && (
              <Form.Item name="description" label="Description">
                <TinyMCEEditorComponent value={description} onEditorChange={setDescription} />
              </Form.Item>
            )}
            <Form.Item name="phone_number" label="Phone Number">
              <Input />
            </Form.Item>
            {role !== 'student' && (
              <>
                <Form.Item name="avatar" label="Avatar">
                  <FileUploader type="image" onUploadSuccess={setAvatarUrl} />
                </Form.Item>
                <Form.Item name="video" label="Video">
                  <FileUploader type="video" onUploadSuccess={setVideoUrl} />
                </Form.Item>
              </>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateAccount;
