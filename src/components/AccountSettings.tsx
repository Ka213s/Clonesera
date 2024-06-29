import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { createApiInstance } from '../services/Api';

const getUserDataFromLocalStorage = () => {
  const userIdFromLocalStorage = localStorage.getItem('data');
  if (userIdFromLocalStorage) {
    const userData = JSON.parse(userIdFromLocalStorage);
    return {
      userId: userData._id,
      role: userData.role,
      email: userData.email,
    };
  }
  return { userId: '', role: 'user', email: '' };
};

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const api = createApiInstance(navigate);
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [saving, setSaving] = useState(false); 
  const { userId, role, email } = getUserDataFromLocalStorage();

  const handleAvatarChange = async (info: any) => {
    console.log("Upload info:", info);
    const file = info.fileList[0]?.originFileObj;
    console.log("Selected file:", file);
    if (file) {
      try {
        const storageRef = ref(storage, `avatars/${userId}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        console.log("File uploaded snapshot:", snapshot);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("Download URL:", downloadURL);
        setAvatar(downloadURL);
      } catch (error) {
        console.error("Error handling avatar change:", error);
      }
    } else {
      console.error("File is undefined");
    }
  };

  const handleSaveChanges = async (values: any) => {
    setSaving(true); // Set saving state to true when saving starts

    const updatedProfile = {
      name: values.name,
      phone_number: values.phone_number,
      description: values.description,
      email: email,
      avatar,
      role,
      video: "",
    };
    console.log("Updated profile:", updatedProfile);
    console.log("User ID:", userId);
    try {
      await api.updateAccount(userId, updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false); // Set saving state back to false after API call completes
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Your Cursus Account</h2>
      <p>This is your public presence on Cursus. You need an account to upload your paid courses, comment on courses, purchased by students, or earning...</p>
      <h2 className="text-xl font-bold mb-2 mt-10">Basic Profile</h2>
      <p>Add information about yourself</p>
      <div className="flex items-center mb-4">
        <div className="relative mt-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            {avatar ? (
              <img src={avatar as string} alt="Profile" className="w-full h-full object-cover cursor-pointer" onClick={() => document.getElementById('avatarUpload')?.click()} />
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
            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
        </div>
      </div>
      <div className="mt-6">
        <Form layout="vertical" onFinish={handleSaveChanges}>
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
         <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#9997F5] hover:bg-[#8886E5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              loading={saving} // Apply loading state to button
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
