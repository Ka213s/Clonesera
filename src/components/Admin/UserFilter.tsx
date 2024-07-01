import React, { useState } from 'react';
import { Input, Button } from 'antd';

interface UserFilterProps {
  onFilter: (filters: any) => void;
  onClear: () => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilter, onClear }) => {
  const [searchID, setSearchID] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const handleFilter = () => {
    onFilter({
      searchID,
      searchName,
      searchEmail,
      searchRole,
      searchStatus,
    });
  };

  const handleClear = () => {
    setSearchID('');
    setSearchName('');
    setSearchEmail('');
    setSearchRole('');
    setSearchStatus('');
    onClear();
  };

  return (
    <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
      <Input
        placeholder="Search by ID"
        value={searchID}
        onChange={(e) => setSearchID(e.target.value)}
        style={{ width: 200 }}
      />
      <Input
        placeholder="Search by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        style={{ width: 200 }}
      />
      <Input
        placeholder="Search by Email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        style={{ width: 200 }}
      />
      <Input
        placeholder="Search by Role"
        value={searchRole}
        onChange={(e) => setSearchRole(e.target.value)}
        style={{ width: 200 }}
      />
      <Input
        placeholder="Search by Status (active/inactive)"
        value={searchStatus}
        onChange={(e) => setSearchStatus(e.target.value)}
        style={{ width: 200 }}
      />
      <Button type="primary" onClick={handleFilter}>
        Filter
      </Button>
      <Button onClick={handleClear}>
        Clear
      </Button>
    </div>
  );
};

export default UserFilter;
