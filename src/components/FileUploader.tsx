import React, { useState } from 'react';
import { Upload, Button, Image, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';
import type { UploadFile, UploadProps } from 'antd';

interface FileUploaderProps {
  type: 'image' | 'video';
  onUploadSuccess: (url: string) => void;
}

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FileUploader: React.FC<FileUploaderProps> = ({ type, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleUpload = async (file: File) => {
    if (!file) return;

    // Get file extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const allowedVideoExtensions = ['mp4', 'avi', 'mov', 'mkv'];

    if (type === 'image' && !allowedImageExtensions.includes(fileExtension!)) {
      message.error('File type does not match. Only images are allowed.');
      return;
    }

    if (type === 'video' && !allowedVideoExtensions.includes(fileExtension!)) {
      message.error('File type does not match. Only videos are allowed.');
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
          message.error('Upload error');
          console.error('Upload error:', error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadSuccess(downloadURL);
          message.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
          setUploading(false);
        }
      );
    } catch (error) {
      message.error('Error uploading file');
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file: File) => {
      handleUpload(file);
      return false;
    },
    fileList,
    onPreview: handlePreview,
    onChange: handleChange,
    listType: 'picture-circle',
    showUploadList: {
      showRemoveIcon: !uploading,
    },
  };

  const uploadButton = (
    <Button icon={<PlusOutlined />} loading={uploading} style={{ border: 0, background: 'none' }}>
      <div style={{ marginTop: 3 }}>Upload</div>
    </Button>
  );

  return (
    <>
      <Upload {...uploadProps}>
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default FileUploader;
