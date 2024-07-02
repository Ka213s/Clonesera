import React from 'react';
import { Tabs } from 'antd';
import { AppstoreOutlined, TagsOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface CategoryTabsProps {
  activeKey: string;
  onTabChange: (key: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeKey, onTabChange }) => {
  const tabs = [
    { key: '1', icon: <AppstoreOutlined />, label: 'Category' },
    { key: '2', icon: <TagsOutlined />, label: 'Sub Category' },
  ];

  return (
    <div className="p-4 mb-4 ">
      <Tabs activeKey={activeKey} onChange={onTabChange}>
        {tabs.map(tab => (
          <TabPane
            key={tab.key}
            tab={
              <div className="flex items-center ">
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
