import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';

interface EditDeleteIconsProps {
  userId: string;
  onEdit: (userId: string) => void;
}

const EditDeleteIcons: React.FC<EditDeleteIconsProps> = ({ userId, onEdit }) => {
  console.log('EditDeleteIcons userId:', userId);
  return (
    <Tooltip title="Edit">
      <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(userId)} />
    </Tooltip>
  );
};

export default EditDeleteIcons;
