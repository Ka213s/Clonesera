// Session.tsx
import React from 'react';
import AddSession from './AddSession';
import DisplaySessions from './DisplaySessions';

const SessionComponent: React.FC = () => {


  return (
    <div>

      <AddSession />
      <DisplaySessions />
    </div>
  );
};

export default SessionComponent;
