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
      await changeUserStatus({ user_id: userId, status: checked });
      onChange(userId, checked);
  };

  return (
    <Switch checked={status} onChange={handleStatusChange} />
  );
};

export default StatusToggle;
