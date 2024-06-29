import React, { useState } from 'react';
import { Form, Input, Button, Switch, DatePicker, Select } from 'antd';
import moment from 'moment';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import AvatarUpload from '../../components/AvatarUpload'; // Import the AvatarUpload component

const { Option } = Select;

const EditUserForm: React.FC<any> = ({ user, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<string | null>(user.avatar || null);

  const onFinish = (values: any) => {
    onSave({ ...user, ...values, dob: values.dob.toISOString(), avatar });
  };

  return (
    <Form
    form={form}
    layout="vertical"
    initialValues={{
      ...user,
      dob: moment(user.dob),
      status: user.status,
      is_deleted: user.is_deleted,
    }}
    onFinish={onFinish}
  >
    <Form.Item label="Avatar" name="avatar">
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <AvatarUpload
      userId={user._id}
      avatarUrl={avatar}
      setAvatar={setAvatar}
      setAvatarUrl={setAvatar}
    />
  </div>
</Form.Item>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <Form.Item label="Name" name="name">
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select>
            <Option value="student">Student</Option>
            <Option value="instructor">Instructor</Option>
          </Select>
        </Form.Item>
      </div>
      <div>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone_number">
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item  label="Date of Birth" name="dob">
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>
      </div>
    </div>
    <div className="flex gap-4">
      <Form.Item className="flex-1" label="Status" name="status" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item className="flex-1" label="Is Deleted" name="is_deleted" valuePropName="checked">
        <Switch />
      </Form.Item>
    
    </div>
    <Form.Item className="mt-4">
      <Button type="primary" htmlType="submit">
        Save
      </Button>
      <Button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded">
        Cancel
      </Button>
    </Form.Item>
  </Form>
  
  );
};

export default EditUserForm;
