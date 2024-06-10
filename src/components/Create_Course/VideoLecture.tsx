import React from 'react';

interface VideoLectureProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const VideoLecture: React.FC<VideoLectureProps> = ({ formData, handleInputChange }) => {
  return (
    <div>
      <p>Select your preferred video type. (.mp4, YouTube, Vimeo etc.)</p>
      <select className="w-full p-2 border rounded-md mb-4" name="videoType" value={formData.videoType || ''} onChange={handleInputChange}>
        <option value="HTML5(mp4)">HTML5(mp4)</option>
        <option value="External URL">External URL</option>
        <option value="YouTube">YouTube</option>
        <option value="Vimeo">Vimeo</option>
        <option value="embedded">embedded</option>
      </select>
      <button className="px-4 py-2 bg-green-500 text-white rounded-md">Upload Video</button>
      <div className="mt-4">
        <p>File Format: .mp4</p>
        <p>Uploaded ID : {formData.uploadedVideoId}</p>
        <p>VIDEO POSTER</p>
        <p>Uploaded ID : {formData.videoPoster}</p>
        <p>Size: 590x300 pixels. Supports: jpg,jpeg, or png</p>
        <p>Video Runtime - hh:mm:ss*</p>
        <div className="flex">
          <input type="text" className="w-1/4 p-2 border rounded-md mr-2" name="videoRuntimeHours" value={formData.videoRuntimeHours || ''} onChange={handleInputChange} placeholder="00" />
          <input type="text" className="w-1/4 p-2 border rounded-md mr-2" name="videoRuntimeMinutes" value={formData.videoRuntimeMinutes || ''} onChange={handleInputChange} placeholder="00" />
          <input type="text" className="w-1/4 p-2 border rounded-md" name="videoRuntimeSeconds" value={formData.videoRuntimeSeconds || ''} onChange={handleInputChange} placeholder="00" />
        </div>
      </div>
    </div>
  );
};

export default VideoLecture;
