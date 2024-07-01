import React, { useState } from 'react';
import CategoryTabs from './CategoryTabs'; 
import Category from './Category'; 
import SubCategory from './SubCategory'; 

const CategoryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');

  const renderContent = () => {
    if (activeTab === '1') {
      return <Category />;
    } else if (activeTab === '2') {
      return <SubCategory />;
    }
    return null;
  };

  return (
    <div>
      <CategoryTabs activeKey={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default CategoryManagement;
