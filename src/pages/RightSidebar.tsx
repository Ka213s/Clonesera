import React from 'react';
import Statistic from './Statistic';
import CustomCalendar from './CustomCalendar';

const RightSidebar: React.FC = () => {
  return (
    <div className="bg-gray-200 p-6 space-y-8 h-full">
      {/* Statistics Section */}
      <div>
        <Statistic />
      </div>

      {/* Calendar Section */}
      <div>
        <CustomCalendar />
      </div>
    </div>
  );
};

export default RightSidebar;
