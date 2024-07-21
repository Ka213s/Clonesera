import React, { useState } from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const CustomCalendar: React.FC = () => {
  const { token } = theme.useToken();
  const [value, setValue] = useState<Dayjs>(dayjs()); // Khởi tạo giá trị với ngày hiện tại

  const onPanelChange: CalendarProps<Dayjs>['onPanelChange'] = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const onSelect: CalendarProps<Dayjs>['onSelect'] = (value) => {
    setValue(value);
  };

  const formatDate = (date: Dayjs) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toDate().toLocaleDateString('en-US', options);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 380,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    background: token.colorBgContainer,
    padding: '16px',
    boxShadow: token.boxShadow,
    margin: '24px auto'
  };

  return (
    <div style={wrapperStyle} className="flex flex-col items-center">
      <div className="w-full flex flex-col items-center mb-6 border-b border-gray-200 pb-4">
        <div className="text-gray-500 text-sm mb-1">
          {value ? formatDate(value).split(',')[0] : 'Select a date'}
        </div>
        <div className="font-semibold text-xl text-gray-800">
          {value ? formatDate(value).split(',').slice(1).join(', ') : 'Select a date'}
        </div>
      </div>
      <Calendar fullscreen={false} value={value} onPanelChange={onPanelChange} onSelect={onSelect} />
    </div>
  );
};

export default CustomCalendar;
