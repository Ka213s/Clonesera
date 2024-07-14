import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { changeCourseStatus } from '../../../../utils/commonImports';

interface SendToAdminButtonProps {
  courseId: number;
}

const SendToAdminButton: React.FC<SendToAdminButtonProps> = ({ courseId }) => {
  const handleClick = () => {
    Modal.confirm({
      title: 'Xác nhận gửi',
      content: 'Bạn có chắc chắn muốn gửi khóa học này lên admin để phê duyệt không?',
      okText: 'Gửi',
      cancelText: 'Hủy',
      onOk: async () => {
        console.log('Send course with id:', courseId, 'to admin for approval');
        try {
          await changeCourseStatus({ course_id: courseId.toString(), new_status: 'waiting_approve' });
          console.log('Course status changed to waiting_approve successfully');
        } catch (error) {
          console.error('Failed to change course status', error);
        }
      },
    });
  };

  return (
    <Button icon={<CheckOutlined />} onClick={handleClick} />
  );
};

export default SendToAdminButton;
