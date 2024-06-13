import React from 'react';

const Statistics: React.FC = () => (
  <div className="flex gap-5">
    <div className="flex-1 bg-white p-5 rounded shadow text-center">
      <h2 className="text-2xl text-gray-800">932</h2>
      <p className="text-gray-500">Students</p>
    </div>
    <div className="flex-1 bg-white p-5 rounded shadow text-center">
      <h2 className="text-2xl text-gray-800">754</h2>
      <p className="text-gray-500">Teachers</p>
    </div>
    <div className="flex-1 bg-white p-5 rounded shadow text-center">
      <h2 className="text-2xl text-gray-800">40</h2>
      <p className="text-gray-500">Events</p>
    </div>
    <div className="flex-1 bg-white p-5 rounded shadow text-center">
      <h2 className="text-2xl text-gray-800">32k</h2>
      <p className="text-gray-500">Foods</p>
    </div>
  </div>
);

export default Statistics;
