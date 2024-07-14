import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import { deleteUser } from '../../utils/commonImports';

interface DeleteButtonProps {
  userId: string;
  onDelete: (userId: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ userId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      onDelete(userId);
     
    } catch (error) {
   
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Tooltip title="Delete">
      <Button type="link" icon={<DeleteOutlined />} onClick={handleDelete} />
    </Tooltip>
  );
};

export default DeleteButton;
