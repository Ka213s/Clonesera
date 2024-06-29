import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../services/Api';
import ResizableTextArea from "antd/lib/input";
import AvatarUpload from './AvatarUpload';

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const api = createApiInstance(navigate);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userDetail = await api.getDataUser(token);
      setUserData(userDetail.data);
      if (userDetail.data.avatar) {
        setAvatar(userDetail.data.avatar);
        setAvatarUrl(userDetail.data.avatar); 
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSaveChanges = async (values: any) => {
    setSaving(true);

    const updatedProfile = {
      ...userData,
      ...values,
      avatar,
    };

    try {
      await api.updateAccount(userData._id, updatedProfile);
      setUserData(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Your Cursus Account</h2>
      <p>This is your public presence on Cursus. You need an account to upload your paid courses, comment on courses, purchased by students, or earning...</p>
      <h2 className="text-xl font-bold mb-2 mt-10">Basic Profile</h2>
      <p>Add information about yourself</p>
      <div className="flex items-center mb-4">
        <AvatarUpload 
          userId={userData.userId}
          avatarUrl={avatarUrl}
          setAvatar={setAvatar}
          setAvatarUrl={setAvatarUrl}
        />
      </div>
      <div className="mt-6">
        <Form
          layout="vertical"
          onFinish={handleSaveChanges}
          initialValues={{
            ...userData,
            dob: userData.dob ? userData.dob.split('T')[0] : null, // Format date for input field
          }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Full Name is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              { required: true, message: 'Phone Number is required' },
              { pattern: /^\d{10}$/, message: 'Phone Number must be 10 digits' }
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: 'Date of Birth is required' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <ResizableTextArea />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AccountSettings;
