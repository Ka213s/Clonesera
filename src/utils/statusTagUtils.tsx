// src/utils/statusTagUtils.tsx

import { Tag } from 'antd';

export const getStatusTag = (status: string) => {
  let color;
  switch (status) {
    case 'new':
      color = 'blue';
      break;
    case 'waiting_approve':
      color = 'orange';
      break;
    case 'approve':
      color = 'green';
      break;
    case 'reject':
      color = 'red';
      break;
    case 'active':
      color = 'green';
      break;
    case 'inactive':
      color = 'gray';
      break;
    default:
      color = 'blue';
      break;
  }
  return <Tag color={color}>{status.toUpperCase()}</Tag>;
};
