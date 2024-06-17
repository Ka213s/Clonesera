//   import React from "react";
//   import { FaBookOpen, FaShoppingCart, FaUpload, FaTags, FaBullhorn } from "react-icons/fa";

// const NavigationTabs: React.FC = () => {
//   return (
//     <div className="flex justify-around mb-4 p-4 rounded shadow">
//       <button className="bg-[#9997F5] text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
//         <FaBookOpen className="h-5 w-5" />
//         <span>My Courses</span>
//       </button>
//       <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
//         <FaShoppingCart className="h-5 w-5" />
//         <span>My Purchases</span>
//       </button>
//       <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
//         <FaUpload className="h-5 w-5" />
//         <span>Upcoming Courses</span>
//       </button>
//       <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
//         <FaTags className="h-5 w-5" />
//         <span>Discounts</span>
//       </button>
//       <button className="bg-white text-gray-700 px-4 py-2 rounded flex items-center space-x-2">
//         <FaBullhorn className="h-5 w-5" />
//         <span>Promotions</span>
//       </button>
//     </div>
//   );
// };

//   export default NavigationTabs;

import React, { useState } from 'react';
import { Tabs } from 'antd';
import { BookOutlined, ShoppingCartOutlined, NotificationOutlined, TagOutlined, UploadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const NavigationTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState("1");

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const tabStyle = (key: string) => ({
    backgroundColor: activeKey === key ? '#9997F5' : 'transparent',
    color: activeKey === key ? '#fff' : '#000',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  const tabs = [
    { key: '1', icon: <BookOutlined />, label: 'My Courses' },
    { key: '2', icon: <ShoppingCartOutlined />, label: 'My Purchases' },
    { key: '3', icon: <UploadOutlined />, label: 'Upcoming Courses' },
    { key: '4', icon: <TagOutlined />, label: 'Discounts' },
    { key: '5', icon: <NotificationOutlined />, label: 'Promotions' },
  ];

  return (
    <div className="flex justify-around bg-white p-4 mb-4 rounded shadow">
      {tabs.map(tab => (
        <div
          key={tab.key}
          style={tabStyle(tab.key)}
          onMouseEnter={() => handleTabChange(tab.key)}
          onMouseLeave={() => handleTabChange('')}
          onClick={() => setActiveKey(tab.key)}
        >
          {tab.icon}
          <span className="ml-2">{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default NavigationTabs;
