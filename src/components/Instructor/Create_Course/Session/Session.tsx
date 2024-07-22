// Session.tsx
import React from 'react';
import AddSession from './CreateSession';
import DisplaySessions from './DisplaySessions';

const SessionComponent: React.FC = () => {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <AddSession />
      </div>
      <DisplaySessions />
    </div>
  );
};

export default SessionComponent;
