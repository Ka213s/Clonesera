// FileUploader.tsx

import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../util/firebaseConfig';

interface FileUploaderProps {
  type: 'image' | 'video';
  onUploadSuccess: (url: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ type, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file) return;
  
    // Lấy phần mở rộng của file
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const allowedVideoExtensions = ['mp4', 'avi', 'mov', 'mkv'];
  
    if (type === 'image' && !allowedImageExtensions.includes(fileExtension!)) {
      console.error('File type does not match. Only images are allowed.');
      return;
    }
  
    if (type === 'video' && !allowedVideoExtensions.includes(fileExtension!)) {
      console.error('File type does not match. Only videos are allowed.');
      return;
    }
  
    setUploading(true);
  
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
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadSuccess(downloadURL);
          setUploading(false);
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };
  

  const uploadProps = {
    beforeUpload: (file: File) => {
      handleUpload(file);
      return false;
    },
    showUploadList: false,
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />} loading={uploading}>
        Upload {type.charAt(0).toUpperCase() + type.slice(1)}
      </Button>
    </Upload>
  );
};

export default FileUploader;
