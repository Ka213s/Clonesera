import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

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
      <Title level={3}>About Me</Title>
      {userData?.video && (
        <Card className="mb-4" bordered={false}>
          <video className="w-full max-h-96" controls>
            <source src={userData.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card>
      )}
      <Editor
        apiKey="2yifh7kylzpd5szlkd3irl90etvaxhqgknrd2zfbdz4sjeox" // Replace with your actual TinyMCE API key
        initialValue={userData?.description || ''}
        init={{
          menubar: false,
          plugins: [
            'autoresize'
          ],
          toolbar: false,
          autoresize_bottom_margin: 20,
          autoresize_overflow_padding: 10,
          setup: (editor) => {
            editor.on('init', () => {
              editor.getContainer().style.overflow = 'hidden';
              editor.getContainer().style.border = 'none'; // Remove the border
            });
          }
        }}
        disabled={true}
      />
    </>
  );
};

export default AboutTab;
