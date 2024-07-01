// UserStatusUpdater.tsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { createApiInstance } from '../../services/Api';
import { useNavigate } from 'react-router-dom';

interface UserStatusUpdaterProps {
  checked: boolean;
  userId: string;
}

const UserStatusUpdater: React.FC<UserStatusUpdaterProps> = ({ checked, userId }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(checked);

  const handleStatusChange = async (checked: boolean, userId: string) => {
    try {
      const api = createApiInstance(navigate); 
      const payload = {
        user_id: userId,
        status: checked
      };
      console.log('Sending payload:', payload);
      await api.changeUserStatus(userId, checked);
      setStatus(checked); 
    } catch (error) {
      console.error('Error updating user status:', error);
      setStatus(!checked); 
    }
  };

  return (
    <Switch
      checked={status}
      onChange={(checked) => handleStatusChange(checked, userId)}
      checkedChildren="Active"
      unCheckedChildren="Inactive"
    />
  );
};

export default UserStatusUpdater;
