import React from 'react';
import { Line } from 'react-chartjs-2';

const PerformanceChart: React.FC = () => {
  const data = {
    labels: ['Week 01', 'Week 02', 'Week 03', 'Week 04', 'Week 05'],
    datasets: [
      {
        label: 'This Week',
        data: [123, 156, 98, 123, 156],
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Last Week',
        data: [98, 123, 156, 123, 98],
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return (
    <div className="flex-1 bg-white p-5 rounded shadow">
      <Line data={data} />
    </div>
  );
};

export default PerformanceChart;
