import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Statistics from './Statistics';
import PerformanceChart from './PerformanceChart';
import OverviewChart from './OverviewChart';
import SchoolCalendar from './SchoolCalendar';
import TeacherDetails from './TeacherDetails';
import UnpaidStudentIntuition from './UnpaidStudentIntuition';

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="p-5 space-y-5">
        <Statistics />
        <div className="grid grid-cols-3 gap-5">
          <PerformanceChart />
          <OverviewChart />
          <SchoolCalendar />
        </div>
        <TeacherDetails />
        <UnpaidStudentIntuition />
      </div>
    </MainLayout>
  );
}

export default Dashboard;
