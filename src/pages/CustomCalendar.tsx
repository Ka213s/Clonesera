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
    width: 400,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    background: token.colorBgContainer,
    padding: '16px',
    boxShadow: token.boxShadow,
    margin: '24px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headerStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    paddingBottom: '8px',
  };

  const dateStyle: React.CSSProperties = {
    color: token.colorTextSecondary,
    fontSize: '14px',
    marginBottom: '4px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: token.colorText,
  };

  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div style={dateStyle}>
          {value ? formatDate(value).split(',')[0] : 'Select a date'}
        </div>
        <div style={titleStyle}>
          {value ? formatDate(value).split(',').slice(1).join(', ') : 'Select a date'}
        </div>
      </div>
      <Calendar fullscreen={false} value={value} onPanelChange={onPanelChange} onSelect={onSelect} />
    </div>
  );
};

export default CustomCalendar;
