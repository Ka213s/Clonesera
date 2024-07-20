import React from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteLesson } from '../../../../utils/commonImports';
const { confirm } = Modal;

interface DeleteLessonProps {
  lesson_id: string;
}

const DeleteLesson: React.FC<DeleteLessonProps> = ({ lesson_id }) => {
  const showDeleteConfirm = () => {
    console.log('Delete Lesson ID:', lesson_id);
    confirm({
      title: 'Are you sure delete this lesson?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        return handleDeleteLesson(lesson_id);
      },
    });
  };

  const handleDeleteLesson = async (id: string) => {
    try {
      await deleteLesson(id);
      console.log('Lesson deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  return (
    <Button
      icon={<DeleteOutlined />}
      onClick={showDeleteConfirm}
      danger
    >
      Delete
    </Button>
  );
};

export default DeleteLesson;
