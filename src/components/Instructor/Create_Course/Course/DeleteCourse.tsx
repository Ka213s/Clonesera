import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { deleteCourse } from '../../../../utils/commonImports';

interface DeleteButtonProps {
  courseId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ courseId }) => {
  const handleClick = () => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this course?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: async () => {
          await deleteCourse(courseId.toString());
      },
    });
  };

  return (
    <Button icon={<DeleteOutlined />} onClick={handleClick} danger />
  );
};

export default DeleteButton;
