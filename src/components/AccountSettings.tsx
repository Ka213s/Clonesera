import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../services/Api';
import ResizableTextArea from "antd/lib/input";

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
        setAvatar(userDetail.avatar);
        setAvatarUrl(userDetail.data.avatar); 
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAvatarChange = async (info: any) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      try {
        const storageRef = ref(storage, `avatars/${userData.userId}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setAvatar(downloadURL);
        setAvatarUrl(downloadURL); // Cập nhật URL hiển thị avatar
      } catch (error) {
        console.error("Error handling avatar change:", error);
      }
    }
  };

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
        <div className="relative mt-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover cursor-pointer" onClick={() => document.getElementById('avatarUpload')?.click()} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400 cursor-pointer" onClick={() => document.getElementById('avatarUpload')?.click()}></div>
            )}
          </div>
          <Upload
            id="avatarUpload"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleAvatarChange}
          >
            <Button className='mt-3' icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
        </div>
      </div>
      <div className="mt-6">
        <Form layout="vertical" onFinish={handleSaveChanges} initialValues={userData}>
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
