import React from 'react';

interface AttachmentsLectureProps {
  formData: any;
}

const AttachmentsLecture: React.FC<AttachmentsLectureProps> = ({ formData }) => {
  return (
    <div>
      <p>Supports: jpg, jpeg, png, pdf or .zip</p>
      <button className="px-4 py-2 bg-green-500 text-white rounded-md">Upload Attachment</button>
      <div className="mt-4">
        <p>Uploaded ID: {formData.attachmentId1}</p>
        <p>Uploaded ID: {formData.attachmentId2}</p>
        <p>Uploaded ID: {formData.attachmentId3}</p>
      </div>
    </div>
  );
};

export default AttachmentsLecture;
