import React from 'react';

const StudentsOverview: React.FC = () => {
  const data = [
    { label: 'Good', percent: 80 },
    { label: 'Satisfied', percent: 70 },
    { label: 'Excellent', percent: 55 },
    { label: 'Average', percent: 70 },
    { label: 'Unsatisfied', percent: 15 },
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Students Overview</h2>
      {data.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{item.label}</span>
            <span className="text-blue-500 font-bold">{item.percent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-[#9997F5] h-2.5 rounded-full"
              style={{ width: `${item.percent}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentsOverview;
