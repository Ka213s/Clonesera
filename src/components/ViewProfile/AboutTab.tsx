import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface UserData {
  _id: string;
  name: string;
  email: string;
  google_id: string;
  role: string;
  status: boolean;
  description: string;
  phone_number: string;
  avatar: string;
  video: string;
  dob: Date;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

interface AboutTabProps {
  userData: UserData | null;
}

const AboutTab: React.FC<AboutTabProps> = ({ userData }) => {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-4">About Me</h3>
      {userData?.video && (
        <div className="mb-4">
          <video className="w-full max-h-96" controls>
            <source src={userData.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <Editor
        initialValue={userData?.description || ''}
        init={{
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'autoresize'
          ],
          toolbar: false,
          autoresize_bottom_margin: 20,
          autoresize_overflow_padding: 10,
          setup: (editor) => {
            editor.on('init', () => {
              editor.getContainer().style.overflow = 'hidden';
            });
          }
        }}
        disabled={true}
      />
    </>
  );
};

export default AboutTab;
