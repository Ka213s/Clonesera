import React from 'react';

interface Student {
  name: string;
  id: string;
  class: string;
  fees: number;
  rank: string;
}

const students: Student[] = [
  { name: 'Jordan Nico', id: 'ID 12345678', class: 'Class VI B', fees: 52036, rank: 'First' },
  { name: 'Karen Hope', id: 'ID 12345678', class: 'Class VII A', fees: 52036, rank: 'First' },
  { name: 'Nadila Adja', id: 'ID 12345678', class: 'Class VI B', fees: 54036, rank: 'First' },
  // Add more students as needed
];

const UnpaidStudentIntuition: React.FC = () => {
  return (
    <div className="flex-1 bg-white p-5 rounded shadow">
      <h3 className="text-lg font-medium">Unpaid Student Intuition</h3>
      <table className="w-full mt-3 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Class</th>
            <th className="p-2 border">Fees</th>
            <th className="p-2 border">Rank</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="p-2 border">{student.name}</td>
              <td className="p-2 border">{student.id}</td>
              <td className="p-2 border">{student.class}</td>
              <td className="p-2 border">${student.fees}</td>
              <td className="p-2 border">{student.rank}</td>
              <td className="p-2 border"><button className="text-blue-500 hover:underline">Pay Now</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnpaidStudentIntuition;
