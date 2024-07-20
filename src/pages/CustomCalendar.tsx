import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type CalendarValue = Date | [Date, Date] | null;

const CustomCalendar: React.FC = () => {
  const [value, setValue] = useState<CalendarValue>(new Date());

  const handleDateChange = (newValue: CalendarProps['value']) => {
    // Convert the value to CalendarValue type
    if (Array.isArray(newValue) && newValue.length === 2) {
      setValue(newValue as [Date, Date]);
    } else {
      setValue(newValue as CalendarValue);
    }
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-gray-500 text-sm">
            {value instanceof Date ? formatDate(value).split(',')[0] : 'Select a date'}
          </div>
          <div className="font-semibold text-xl text-gray-800">
            {value instanceof Date ? formatDate(value).split(',').slice(1).join(', ') : 'Select a date'}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405M19 7h-1M15 7h1M10 7h4m4 0h4m-4 0h-1m-1 0H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-3m3 0a2 2 0 100-4 2 2 0 000 4z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-gray-100 p-2 rounded-lg">
        <Calendar
          value={value}
          onChange={handleDateChange}
          className="react-calendar"
        />
      </div>
    </div>
  );
};

export default CustomCalendar;
