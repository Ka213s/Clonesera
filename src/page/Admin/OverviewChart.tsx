import React from 'react';
import { Bar } from 'react-chartjs-2';

const OverviewChart: React.FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Number of Projects',
        data: [5, 10, 5, 6, 9, 7, 5, 6, 7, 5, 6, 8],
        backgroundColor: 'blue',
      },
      {
        label: 'Revenue',
        data: [3, 6, 2, 7, 4, 5, 6, 7, 5, 6, 8, 7],
        backgroundColor: 'green',
      },
      {
        label: 'Active Projects',
        data: [2, 4, 1, 5, 3, 4, 5, 6, 4, 5, 6, 4],
        backgroundColor: 'red',
      },
    ],
  };

  return (
    <div className="flex-1 bg-white p-5 rounded shadow">
      <Bar data={data} />
    </div>
  );
};

export default OverviewChart;
