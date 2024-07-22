import React from 'react';
import { Button, Modal } from 'antd';
import { changeCourseStatus } from '../../../../utils/commonImports';
interface SendToAdminButtonProps {
  courseIds: number[];
}

const SendToAdminButton: React.FC<SendToAdminButtonProps> = ({ courseIds }) => {
  const handleClick = () => {
    console.log('Sending to admin the following course IDs:', courseIds);

    Modal.confirm({
      title: 'Confirm Send',
      content: `Are you sure you want to send ${courseIds.length} course(s) to admin for approval?`,
      okText: 'Send',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await Promise.all(
            courseIds.map(courseId => 
              changeCourseStatus({ course_id: courseId.toString(), new_status: 'waiting_approve' })
            )
          );
          console.log('Courses status changed to waiting_approve successfully');
        } catch (error) {
          console.error('Failed to change course statuses', error);
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
