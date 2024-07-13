import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { deleteCourse } from '../../../utils/commonImports';

interface DeleteButtonProps {
  courseId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ courseId }) => {
  const handleClick = () => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa khóa học này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteCourse(courseId.toString());
          console.log('Course deleted successfully');
        } catch (error) {
          console.error('Failed to delete course', error);
        }
      },
    });
  };

  return (
    <Button icon={<DeleteOutlined />} onClick={handleClick} />
  );
};

export default DeleteButton;
