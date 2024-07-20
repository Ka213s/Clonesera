import React from 'react';
import { Button, Modal } from 'antd';
import { changeCourseStatus } from '../../../../utils/commonImports';
import { toast } from 'react-toastify';

interface SendToAdminButtonProps {
  courseIds: number[];
}

const SendToAdminButton: React.FC<SendToAdminButtonProps> = ({ courseIds }) => {
  const handleClick = () => {
    Modal.confirm({
      title: 'Confirm Send',
      content: `Are you sure you want to send ${courseIds.length} course(s) to admin for approval?`,
      okText: 'Send',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          // Sending each course to admin for approval
          await Promise.all(
            courseIds.map(courseId => 
              changeCourseStatus({ course_id: courseId.toString(), new_status: 'waiting_approve' })
            )
          );
          toast.success('Courses have been sent. Please wait for admin review!');
          console.log('Courses status changed to waiting_approve successfully');
        } catch (error) {
          console.error('Failed to change course statuses', error);
          toast.error('Failed to send courses to admin.');
        }
      },
    });
  };

  return (
    <Button type="primary" className='custom-button' onClick={handleClick} disabled={courseIds.length === 0}>
      Send to Admin
    </Button>
  );
};

export default SendToAdminButton;
