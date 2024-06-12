import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SchoolCalendar: React.FC = () => {
  return (
    <div className="flex-1 bg-white p-5 rounded shadow">
      <Calendar />
    </div>
  );
};

export default SchoolCalendar;
