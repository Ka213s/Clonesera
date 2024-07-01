import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Media: React.FC<Props> = ({ formData, setFormData, nextStep, prevStep }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const handleImageUpload = async (info: any) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      try {
        setImageLoading(true);
        const storageRef = ref(storage, `course_media/images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setFormData({ ...formData, image_url: downloadURL });
        setImageLoading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setImageLoading(false);
      }
    }
  };

  const handleVideoUpload = async (info: any) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      try {
        setVideoLoading(true);
        const storageRef = ref(storage, `course_media/videos/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setFormData({ ...formData, video_url: downloadURL });
        setVideoLoading(false);
      } catch (error) {
        console.error("Error uploading video:", error);
        setVideoLoading(false);
      }
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Media</h3>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Image</label>
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageUpload}
          >
            <Button loading={imageLoading} icon={<UploadOutlined />}>
              {imageLoading ? "Uploading" : "Upload Image"}
            </Button>
          </Upload>
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="Course"
              className="w-full h-auto mt-4"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Video</label>
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleVideoUpload}
          >
            <Button loading={videoLoading} icon={<UploadOutlined />}>
              {videoLoading ? "Uploading" : "Upload Video"}
            </Button>
          </Upload>
          {formData.video_url && (
            <video
              src={formData.video_url}
              controls
              className="w-full h-auto mt-4"
            />
          )}
        </div>
        <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
          Back
        </button>
        <button type="button" onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded">
          Next
        </button>
      </form>
    </div>
  );
};

export default Media;
