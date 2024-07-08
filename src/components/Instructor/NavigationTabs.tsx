import React from 'react';
import { Tabs } from 'antd';
import { BookOutlined } from '@ant-design/icons';

interface NavigationTabsProps {
  activeKey: string;
  onTabChange: (key: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeKey, onTabChange }) => {
  const tabs = [
    { key: '1', icon: <BookOutlined />, label: 'My Courses' },
    { key: '2', icon: <BookOutlined />, label: 'My Sections' },
    { key: '3', icon: <BookOutlined />, label: 'My Lectures' },
  ];

  const tabItems = tabs.map(tab => ({
    key: tab.key,
    label: (
      <div className="flex items-center">
        {tab.icon}
        <span className="ml-2">{tab.label}</span>
      </div>
    ),
  }));

  return (
    <div className="p-4 mb-4">
      <Tabs activeKey={activeKey} onChange={onTabChange} items={tabItems} />
    </div>
  );
};

export default NavigationTabs;
