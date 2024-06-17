import React from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'In Progress', value: 400 },
  { name: 'Not Completed', value: 300 },
  { name: 'Completed', value: 300 },
];

const PieChartComponent: React.FC = () => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === 'In Progress' ? '#8884d8' : entry.name === 'Not Completed' ? '#FF8042' : '#0088FE'}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PieChartComponent;
