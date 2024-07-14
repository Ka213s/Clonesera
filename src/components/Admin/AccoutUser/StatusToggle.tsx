import React from 'react';
import { Switch } from 'antd';
import { changeUserStatus } from '../../../utils/commonImports';


interface StatusToggleProps {
  userId: string;
  status: boolean;
  onChange: (userId: string, status: boolean) => void;
}

const StatusToggle: React.FC<StatusToggleProps> = ({ userId, status, onChange }) => {
  const handleStatusChange = async (checked: boolean) => {
    try {
      await changeUserStatus({ user_id: userId, status: checked });
      onChange(userId, checked);
   
    } catch (error) {
    
      console.error('Error changing user status:', error);
    }
  };

  return (
    <Switch checked={status} onChange={handleStatusChange} />
  );
};

export default StatusToggle;
