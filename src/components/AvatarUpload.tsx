import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface AvatarUploadProps {
  userId: string;
  avatarUrl: string | null;
  setAvatar: (url: string) => void;
  setAvatarUrl: (url: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ userId, avatarUrl, setAvatar, setAvatarUrl }) => {
  const handleAvatarChange = async (info: any) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      try {
        const storageRef = ref(storage, `avatars/${userId}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setAvatar(downloadURL);
        setAvatarUrl(downloadURL);
      } catch (error) {
        console.error("Error handling avatar change:", error);
      }
    }
  };

  return (
    <div className="relative mt-4">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => document.getElementById('avatarUpload')?.click()}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl text-gray-400 cursor-pointer"
            onClick={() => document.getElementById('avatarUpload')?.click()}
          ></div>
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
  );
};

export default AvatarUpload;
